/**
 * Entitlement accounting tables (IMP-020).
 * Source: docs/06_DATABASE_DESIGN.md §12.
 *
 * `entitlement_ledger_entries.generation_request_id` is declared without a
 * foreign key: §12.1 lists it as plain `uuid null` with no "references"
 * annotation (unlike `purchase_id` and `created_by_account_id` in the same
 * table, which are explicitly annotated), so no FK is added here. This also
 * avoids a forward module dependency from entitlements.ts to generation.ts.
 *
 * `entitlement_balances` (§12.2) has no "references" annotation on any
 * column, so it is implemented with no foreign keys — it is documented as a
 * "transactionally maintained projection ... fully reconstructable from the
 * ledger," and §17's fifteen enumerated database-enforced invariants do not
 * list an FK requirement for it.
 */

import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { accounts } from "./identity";
import { events } from "./events";
import { purchases } from "./catalogue";
import { uuidPk } from "./_helpers";

/** docs/06 §12.1 "Entry types". */
export const ENTITLEMENT_ENTRY_TYPES = [
  "GRANT",
  "RESERVE",
  "CONSUME",
  "RELEASE",
  "ADJUST",
  "REVOKE",
  "EXPIRE",
] as const;

export const entitlementLedgerEntries = pgTable(
  "entitlement_ledger_entries",
  {
    id: uuidPk(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id),
    purchaseId: uuid("purchase_id").references(() => purchases.id),
    entitlementCode: text("entitlement_code").notNull(),
    entryType: text("entry_type").notNull(),
    quantityDelta: integer("quantity_delta").notNull(),
    generationRequestId: uuid("generation_request_id"),
    idempotencyKey: text("idempotency_key").notNull(),
    reasonCode: text("reason_code").notNull(),
    reasonNote: text("reason_note"),
    createdByAccountId: uuid("created_by_account_id").references(
      () => accounts.id,
    ),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    unique("entitlement_ledger_entries_idempotency_key").on(
      table.eventId,
      table.entitlementCode,
      table.idempotencyKey,
    ),
    check(
      "entitlement_ledger_entries_entry_type_check",
      sql`${table.entryType} in (
        'GRANT', 'RESERVE', 'CONSUME', 'RELEASE', 'ADJUST', 'REVOKE', 'EXPIRE'
      )`,
    ),
    // §19: "entitlement_ledger_entries(event_id, entitlement_code, created_at)".
    index("entitlement_ledger_entries_event_code_created_at").on(
      table.eventId,
      table.entitlementCode,
      table.createdAt,
    ),
  ],
);

export const entitlementBalances = pgTable(
  "entitlement_balances",
  {
    eventId: uuid("event_id").notNull(),
    entitlementCode: text("entitlement_code").notNull(),
    granted: integer("granted").notNull(),
    reserved: integer("reserved").notNull(),
    consumed: integer("consumed").notNull(),
    adjusted: integer("adjusted").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    primaryKey({ columns: [table.eventId, table.entitlementCode] }),
    check("entitlement_balances_granted_check", sql`${table.granted} >= 0`),
    check("entitlement_balances_reserved_check", sql`${table.reserved} >= 0`),
    check("entitlement_balances_consumed_check", sql`${table.consumed} >= 0`),
  ],
);
