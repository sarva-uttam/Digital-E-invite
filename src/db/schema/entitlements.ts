/**
 * Entitlement accounting (IMP-023) — docs/06_DATABASE_DESIGN.md §12.
 *
 * Deferred foreign keys, same pattern and rationale as IMP-022's
 * audit_events (src/db/schema/operations.ts): `eventId`, `purchaseId`, and
 * `createdByAccountId` are plain `uuid` columns without a database-level
 * foreign-key constraint. The design doc references `events(id)`,
 * `purchases(id)`, and `accounts(id)`, but those tables belong to
 * `IMP-021` and `IMP-050`, both not yet implemented. Adding the
 * constraints is their responsibility once those tables exist (additive
 * `ALTER TABLE`, per §23's expand-and-contract policy).
 * `generation_request_id` has no foreign key even in the approved design
 * (docs/06 §12.1 defines it as a bare nullable `uuid`), so this deferral
 * does not weaken a pattern the schema otherwise treats as strict.
 */

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { uuidPk } from "./_helpers";
import type { EntitlementCode } from "../../lib/entitlements";

/** Entry types per §12.1. */
export const ENTITLEMENT_ENTRY_TYPES = [
  "GRANT",
  "RESERVE",
  "CONSUME",
  "RELEASE",
  "ADJUST",
  "REVOKE",
  "EXPIRE",
] as const;
export type EntitlementEntryType = (typeof ENTITLEMENT_ENTRY_TYPES)[number];

/**
 * §12.1 — append-only, authoritative ledger. No row is ever updated or
 * deleted (enforced by a database trigger, same mechanism as
 * audit_events); corrections are new compensating entries.
 */
export const entitlementLedgerEntries = pgTable(
  "entitlement_ledger_entries",
  {
    id: uuidPk(),
    eventId: uuid("event_id").notNull(), // FK to events(id) deferred to IMP-021 — see file header.
    purchaseId: uuid("purchase_id"), // FK to purchases(id) deferred to IMP-050 — see file header.
    entitlementCode: text("entitlement_code")
      .notNull()
      .$type<EntitlementCode>(),
    entryType: text("entry_type").notNull().$type<EntitlementEntryType>(),
    quantityDelta: integer("quantity_delta").notNull(),
    generationRequestId: uuid("generation_request_id"), // no FK in the approved design either (§12.1).
    idempotencyKey: text("idempotency_key").notNull(),
    reasonCode: text("reason_code").notNull(),
    reasonNote: text("reason_note"),
    createdByAccountId: uuid("created_by_account_id"), // FK to accounts(id) deferred to IMP-021 — see file header.
    occurredAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    index("entitlement_ledger_entries_event_code_created_idx").on(
      table.eventId,
      table.entitlementCode,
      table.occurredAt,
    ),
    // §12.1 "unique (event_id, entitlement_code, idempotency_key)" —
    // enforces idempotent retries at the ledger level, not merely at the
    // application/balance-check level.
    uniqueIndex("entitlement_ledger_entries_idempotency_unique").on(
      table.eventId,
      table.entitlementCode,
      table.idempotencyKey,
    ),
  ],
);

/**
 * §12.2 — optional transactionally maintained projection for efficient
 * reads. Must be fully reconstructable from the ledger; see
 * reconstructBalanceFromLedger in src/db/repositories/entitlements.ts.
 */
export const entitlementBalances = pgTable(
  "entitlement_balances",
  {
    eventId: uuid("event_id").notNull(), // FK to events(id) deferred to IMP-021, matching the ledger above.
    entitlementCode: text("entitlement_code")
      .notNull()
      .$type<EntitlementCode>(),
    granted: integer("granted").notNull().default(0),
    reserved: integer("reserved").notNull().default(0),
    consumed: integer("consumed").notNull().default(0),
    adjusted: integer("adjusted").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [primaryKey({ columns: [table.eventId, table.entitlementCode] })],
);
