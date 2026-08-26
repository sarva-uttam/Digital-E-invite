/**
 * Catalogue, pricing, and purchase snapshots (IMP-050) —
 * docs/06_DATABASE_DESIGN.md §10.
 *
 * Deferred foreign keys, same pattern as IMP-022/IMP-023: `purchases.eventId`
 * and `purchases.accountId` are plain `uuid` columns without a database-level
 * foreign-key constraint. The design doc references `events(id)` and
 * `accounts(id)`, but those tables belong to `IMP-021`, not yet implemented.
 * Adding the constraints is `IMP-021`'s responsibility once that table
 * exists (additive `ALTER TABLE`, per §23's expand-and-contract policy).
 * Every other foreign key below (`package_definitions`, `price_book_entries`,
 * `purchases` itself) references a table this same task creates, so those
 * are real, enforced constraints from the start.
 *
 * Status vocabularies not explicitly enumerated in §10 (`package_definitions.status`,
 * `price_book_entries.status`) follow the closest approved analogue,
 * `product/PRICING_RULES.md` §6's price-book states, for consistency —
 * a disclosed engineering choice, not a new commercial decision.
 */

import {
  bigint,
  char,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { timestamps, uuidPk } from "./_helpers";
import type { PackageTierId } from "../../lib/catalog";

export const CATALOGUE_STATUSES = [
  "DRAFT",
  "SCHEDULED",
  "ACTIVE",
  "RETIRED",
  "CANCELLED",
] as const;
export type CatalogueStatus = (typeof CATALOGUE_STATUSES)[number];

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
export type PurchaseStatus = (typeof PURCHASE_STATUSES)[number];

/** §10.1 */
export const packageDefinitions = pgTable(
  "package_definitions",
  {
    id: uuidPk(),
    packageCode: text("package_code").notNull().$type<PackageTierId>(),
    version: integer("version").notNull(),
    status: text("status").notNull().$type<CatalogueStatus>(),
    effectiveFrom: timestamp("effective_from", {
      withTimezone: true,
    }).notNull(),
    effectiveUntil: timestamp("effective_until", { withTimezone: true }),
    ...timestamps(),
  },
  (table) => [
    uniqueIndex("package_definitions_code_version_unique").on(
      table.packageCode,
      table.version,
    ),
  ],
);

/** §10.2 */
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
    uniqueIndex("entitlement_definitions_package_code_unique").on(
      table.packageDefinitionId,
      table.entitlementCode,
    ),
  ],
);

/** §10.3 */
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
    status: text("status").notNull().$type<CatalogueStatus>(),
    ...timestamps(),
  },
  (table) => [
    index("price_book_entries_package_market_currency_idx").on(
      table.packageDefinitionId,
      table.marketCode,
      table.currencyCode,
    ),
  ],
);

/** §10.4 — immutable commercial snapshot created server-side before checkout. */
export const purchases = pgTable(
  "purchases",
  {
    id: uuidPk(),
    eventId: uuid("event_id").notNull(), // FK to events(id) deferred to IMP-021 — see file header.
    accountId: uuid("account_id").notNull(), // FK to accounts(id) deferred to IMP-021 — see file header.
    packageDefinitionId: uuid("package_definition_id")
      .notNull()
      .references(() => packageDefinitions.id),
    priceBookEntryId: uuid("price_book_entry_id")
      .notNull()
      .references(() => priceBookEntries.id),
    packageCodeSnapshot: text("package_code_snapshot")
      .notNull()
      .$type<PackageTierId>(),
    packageVersionSnapshot: integer("package_version_snapshot").notNull(),
    currencyCode: char("currency_code", { length: 3 }).notNull(),
    subtotalMinor: bigint("subtotal_minor", { mode: "number" }).notNull(),
    taxMinor: bigint("tax_minor", { mode: "number" }).notNull().default(0),
    totalMinor: bigint("total_minor", { mode: "number" }).notNull(),
    status: text("status").notNull().$type<PurchaseStatus>(),
    checkoutExpiresAt: timestamp("checkout_expires_at", { withTimezone: true }),
    ...timestamps(),
  },
  (table) => [index("purchases_event_idx").on(table.eventId)],
);

/** §10.5 — captures exactly what was sold even if package_definitions later change. */
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
    uniqueIndex("purchase_entitlement_snapshots_purchase_code_unique").on(
      table.purchaseId,
      table.entitlementCode,
    ),
  ],
);
