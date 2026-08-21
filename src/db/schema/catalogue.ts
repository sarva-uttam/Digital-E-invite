/**
 * Catalogue, pricing, and purchase-snapshot tables (IMP-020).
 * Source: docs/06_DATABASE_DESIGN.md §10.
 *
 * `price_book_entries.status` is not enumerated in docs/06 §10.3; the value
 * set is docs/04_DOMAIN_MODEL.md §10 "Price-book states" (draft, active,
 * superseded, retired), normalized to the uppercase convention docs/06 uses
 * for every other enumerated status in this schema.
 *
 * `package_definitions.status` has no enumerated value set in either
 * document, so it is left as unconstrained `text not null` — adding a
 * specific list would invent a business rule.
 *
 * §10.3 states "Overlapping active price intervals for the same package,
 * market, and currency are prohibited," but that overlap rule is not one of
 * the fifteen invariants §17 lists as database-enforced; enforcing it would
 * require a GIST exclusion constraint (and the `btree_gist` extension) not
 * called for by the approved design. Only the explicitly listed invariant
 * ("valid effective-date intervals," §17 item 15) is implemented here as a
 * CHECK; non-overlap is deferred to the domain transaction layer per §17's
 * own general rule for invariants that cannot be expressed safely as
 * ordinary constraints.
 */

import { sql } from "drizzle-orm";
import {
  bigint,
  char,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { accounts } from "./identity";
import { events } from "./events";
import { uuidPk } from "./_helpers";

/** docs/04_DOMAIN_MODEL.md §10 "Price-book states", normalized to uppercase. */
export const PRICE_BOOK_ENTRY_STATUSES = [
  "DRAFT",
  "ACTIVE",
  "SUPERSEDED",
  "RETIRED",
] as const;

/** docs/06 §10.4 "Allowed statuses". */
export const PURCHASE_STATUSES = [
  "CREATED",
  "PAYMENT_PENDING",
  "PAID",
  "CANCELLED",
  "EXPIRED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
  "DISPUTED",
] as const;

export const packageDefinitions = pgTable(
  "package_definitions",
  {
    id: uuidPk(),
    packageCode: text("package_code").notNull(),
    version: integer("version").notNull(),
    status: text("status").notNull(),
    effectiveFrom: timestamp("effective_from", {
      withTimezone: true,
    }).notNull(),
    effectiveUntil: timestamp("effective_until", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    unique("package_definitions_package_code_version_key").on(
      table.packageCode,
      table.version,
    ),
    check(
      "package_definitions_effective_interval_check",
      sql`${table.effectiveUntil} is null or ${table.effectiveUntil} > ${table.effectiveFrom}`,
    ),
  ],
);

export const entitlementDefinitions = pgTable(
  "entitlement_definitions",
  {
    id: uuidPk(),
    packageDefinitionId: uuid("package_definition_id")
      .notNull()
      .references(() => packageDefinitions.id),
    entitlementCode: text("entitlement_code").notNull(),
    quantity: integer("quantity"),
    unit: text("unit").notNull(),
    policyValue: jsonb("policy_value"),
  },
  (table) => [
    unique("entitlement_definitions_package_entitlement_key").on(
      table.packageDefinitionId,
      table.entitlementCode,
    ),
    check(
      "entitlement_definitions_quantity_check",
      sql`${table.quantity} is null or ${table.quantity} >= 0`,
    ),
  ],
);

export const priceBookEntries = pgTable(
  "price_book_entries",
  {
    id: uuidPk(),
    packageDefinitionId: uuid("package_definition_id")
      .notNull()
      .references(() => packageDefinitions.id),
    marketCode: text("market_code").notNull(),
    currencyCode: char("currency_code", { length: 3 }).notNull(),
    amountMinor: bigint("amount_minor", { mode: "number" }).notNull(),
    taxPolicyCode: text("tax_policy_code"),
    effectiveFrom: timestamp("effective_from", {
      withTimezone: true,
    }).notNull(),
    effectiveUntil: timestamp("effective_until", { withTimezone: true }),
    status: text("status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    check(
      "price_book_entries_status_check",
      sql`${table.status} in ('DRAFT', 'ACTIVE', 'SUPERSEDED', 'RETIRED')`,
    ),
    check(
      "price_book_entries_amount_minor_check",
      sql`${table.amountMinor} >= 0`,
    ),
    check(
      "price_book_entries_effective_interval_check",
      sql`${table.effectiveUntil} is null or ${table.effectiveUntil} > ${table.effectiveFrom}`,
    ),
  ],
);

export const purchases = pgTable(
  "purchases",
  {
    id: uuidPk(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id),
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id),
    packageDefinitionId: uuid("package_definition_id")
      .notNull()
      .references(() => packageDefinitions.id),
    priceBookEntryId: uuid("price_book_entry_id")
      .notNull()
      .references(() => priceBookEntries.id),
    packageCodeSnapshot: text("package_code_snapshot").notNull(),
    packageVersionSnapshot: integer("package_version_snapshot").notNull(),
    currencyCode: char("currency_code", { length: 3 }).notNull(),
    subtotalMinor: bigint("subtotal_minor", { mode: "number" }).notNull(),
    taxMinor: bigint("tax_minor", { mode: "number" }).notNull().default(0),
    totalMinor: bigint("total_minor", { mode: "number" }).notNull(),
    status: text("status").notNull(),
    checkoutExpiresAt: timestamp("checkout_expires_at", {
      withTimezone: true,
    }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    check(
      "purchases_status_check",
      sql`${table.status} in (
        'CREATED', 'PAYMENT_PENDING', 'PAID', 'CANCELLED', 'EXPIRED',
        'REFUNDED', 'PARTIALLY_REFUNDED', 'DISPUTED'
      )`,
    ),
    check("purchases_subtotal_minor_check", sql`${table.subtotalMinor} >= 0`),
    check("purchases_tax_minor_check", sql`${table.taxMinor} >= 0`),
    check("purchases_total_minor_check", sql`${table.totalMinor} >= 0`),
    // §19: "purchases(account_id, created_at desc)".
    index("purchases_account_created_at").on(
      table.accountId,
      table.createdAt.desc(),
    ),
  ],
);

export const purchaseEntitlementSnapshots = pgTable(
  "purchase_entitlement_snapshots",
  {
    id: uuidPk(),
    purchaseId: uuid("purchase_id")
      .notNull()
      .references(() => purchases.id),
    entitlementCode: text("entitlement_code").notNull(),
    quantity: integer("quantity"),
    unit: text("unit").notNull(),
    policyValue: jsonb("policy_value"),
  },
  (table) => [
    unique("purchase_entitlement_snapshots_purchase_entitlement_key").on(
      table.purchaseId,
      table.entitlementCode,
    ),
    check(
      "purchase_entitlement_snapshots_quantity_check",
      sql`${table.quantity} is null or ${table.quantity} >= 0`,
    ),
  ],
);
