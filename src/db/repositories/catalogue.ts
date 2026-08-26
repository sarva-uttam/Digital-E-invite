/**
 * Catalogue and purchase-snapshot repository (IMP-050) —
 * docs/06_DATABASE_DESIGN.md §10.
 *
 * `createPurchaseSnapshot` never accepts a client-supplied amount — its
 * signature has no such parameter at all, structurally enforcing
 * `docs/00_CLAUDE_RULES.md` §30 ("Never trust... price values submitted
 * by the browser") rather than merely documenting the rule. All amounts
 * are looked up from the currently active `price_book_entries` row.
 *
 * `domain services must not expose ORM records as domain objects`
 * (docs/06 §4) — every exported function returns a plain typed value.
 */

import { and, eq, gt, isNull, lte, or } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema";
import {
  entitlementDefinitions,
  packageDefinitions,
  priceBookEntries,
  purchaseEntitlementSnapshots,
  purchases,
} from "../schema/catalogue";
import type { CatalogueStatus } from "../schema/catalogue";
import { packageTiers, type PackageTierId } from "../../lib/catalog";

type Db = NodePgDatabase<typeof schema>;

/** MUR is the base and primary commercial currency (project/DECISIONS.md DEC-010); Mauritius is the initial and only approved market. */
export const DEFAULT_MARKET_CODE = "MU";
export const DEFAULT_CURRENCY_CODE = "MUR";

/**
 * The catalogue entitlement codes seeded per package — the four
 * ledger-trackable quantities from src/lib/entitlements.ts plus
 * hosting_days, which is part of what a package *defines* even though it
 * is not a ledger-tracked consumable (src/lib/entitlements.ts's own
 * module doc explains why; the hosting window itself belongs to IMP-062).
 */
function catalogueEntitlementsForTier(
  tier: (typeof packageTiers)[number],
): { code: string; quantity: number; unit: string }[] {
  return [
    { code: "ai_concept", quantity: tier.concepts, unit: "count" },
    { code: "ai_refinement", quantity: tier.refinements, unit: "count" },
    { code: "guest_capacity", quantity: tier.guestCapacity, unit: "count" },
    { code: "language_slot", quantity: tier.languageSlots, unit: "count" },
    { code: "hosting_days", quantity: tier.hostingDays, unit: "days" },
  ];
}

export interface PackageDefinitionRecord {
  id: string;
  packageCode: PackageTierId;
  version: number;
  status: CatalogueStatus;
}

/**
 * Idempotently ensures every approved package tier (src/lib/catalog.ts,
 * DEC-025) has an ACTIVE version-1 package_definition, its full set of
 * entitlement_definitions, and an ACTIVE price_book_entry in the default
 * market/currency. Safe to call repeatedly — does nothing once seeded.
 * Not called automatically on application startup (docs/06 §23's
 * "migration deployment is separated from ordinary web startup" spirit);
 * callers (tests, an explicit seed script) invoke it deliberately.
 */
export async function ensureCatalogueSeeded(db: Db): Promise<void> {
  await db.transaction(async (tx) => {
    for (const tier of packageTiers) {
      const [existing] = await tx
        .select({ id: packageDefinitions.id })
        .from(packageDefinitions)
        .where(
          and(
            eq(packageDefinitions.packageCode, tier.id),
            eq(packageDefinitions.version, 1),
          ),
        );
      if (existing) continue;

      const [definition] = await tx
        .insert(packageDefinitions)
        .values({
          packageCode: tier.id,
          version: 1,
          status: "ACTIVE",
          effectiveFrom: new Date(),
        })
        .returning();
      if (!definition) {
        throw new Error(`Failed to seed package_definitions for ${tier.id}`);
      }

      await tx.insert(entitlementDefinitions).values(
        catalogueEntitlementsForTier(tier).map((entry) => ({
          packageDefinitionId: definition.id,
          entitlementCode: entry.code,
          quantity: entry.quantity,
          unit: entry.unit,
        })),
      );

      await tx.insert(priceBookEntries).values({
        packageDefinitionId: definition.id,
        marketCode: DEFAULT_MARKET_CODE,
        currencyCode: DEFAULT_CURRENCY_CODE,
        amountMinor: tier.priceMur * 100, // MUR has 2 minor-unit decimal places (cents); DEC-025 prices are whole rupees.
        effectiveFrom: new Date(),
        status: "ACTIVE",
      });
    }
  });
}

export async function getActivePackageDefinition(
  db: Db,
  packageCode: PackageTierId,
): Promise<PackageDefinitionRecord> {
  const [row] = await db
    .select()
    .from(packageDefinitions)
    .where(
      and(
        eq(packageDefinitions.packageCode, packageCode),
        eq(packageDefinitions.status, "ACTIVE"),
      ),
    )
    .orderBy(packageDefinitions.version)
    .limit(1);
  if (!row) {
    throw new RangeError(`No ACTIVE package_definition for ${packageCode}`);
  }
  return row;
}

export interface PriceBookEntryRecord {
  id: string;
  packageDefinitionId: string;
  marketCode: string;
  currencyCode: string;
  amountMinor: number;
}

export async function getActivePriceBookEntry(
  db: Db,
  packageDefinitionId: string,
  marketCode: string,
  currencyCode: string,
): Promise<PriceBookEntryRecord> {
  const now = new Date();
  const [row] = await db
    .select()
    .from(priceBookEntries)
    .where(
      and(
        eq(priceBookEntries.packageDefinitionId, packageDefinitionId),
        eq(priceBookEntries.marketCode, marketCode),
        eq(priceBookEntries.currencyCode, currencyCode),
        eq(priceBookEntries.status, "ACTIVE"),
        lte(priceBookEntries.effectiveFrom, now),
        or(
          isNull(priceBookEntries.effectiveUntil),
          gt(priceBookEntries.effectiveUntil, now),
        ),
      ),
    );
  if (!row) {
    throw new RangeError(
      `No ACTIVE price_book_entry for package ${packageDefinitionId} in ${marketCode}/${currencyCode}`,
    );
  }
  return row;
}

export class OverlappingPriceIntervalError extends Error {
  constructor(
    packageDefinitionId: string,
    marketCode: string,
    currencyCode: string,
  ) {
    super(
      `An active price interval already exists for package ${packageDefinitionId} in ${marketCode}/${currencyCode} (docs/06 §10.3: overlapping active price intervals for the same package, market, and currency are prohibited)`,
    );
    this.name = "OverlappingPriceIntervalError";
  }
}

export interface CreatePriceBookEntryInput {
  packageDefinitionId: string;
  marketCode: string;
  currencyCode: string;
  amountMinor: number;
  effectiveFrom: Date;
  effectiveUntil?: Date;
  taxPolicyCode?: string;
}

/** §10.3: rejects a new entry whose active interval would overlap an existing active one for the same package/market/currency. */
export async function createPriceBookEntry(
  db: Db,
  input: CreatePriceBookEntryInput,
): Promise<PriceBookEntryRecord> {
  return db.transaction(async (tx) => {
    const existingActive = await tx
      .select({
        id: priceBookEntries.id,
        effectiveFrom: priceBookEntries.effectiveFrom,
        effectiveUntil: priceBookEntries.effectiveUntil,
      })
      .from(priceBookEntries)
      .where(
        and(
          eq(priceBookEntries.packageDefinitionId, input.packageDefinitionId),
          eq(priceBookEntries.marketCode, input.marketCode),
          eq(priceBookEntries.currencyCode, input.currencyCode),
          eq(priceBookEntries.status, "ACTIVE"),
        ),
      );

    const newStart = input.effectiveFrom.getTime();
    const newEnd = input.effectiveUntil?.getTime() ?? Number.POSITIVE_INFINITY;
    for (const row of existingActive) {
      const existingStart = row.effectiveFrom.getTime();
      const existingEnd =
        row.effectiveUntil?.getTime() ?? Number.POSITIVE_INFINITY;
      const overlaps = newStart < existingEnd && existingStart < newEnd;
      if (overlaps) {
        throw new OverlappingPriceIntervalError(
          input.packageDefinitionId,
          input.marketCode,
          input.currencyCode,
        );
      }
    }

    const [created] = await tx
      .insert(priceBookEntries)
      .values({
        packageDefinitionId: input.packageDefinitionId,
        marketCode: input.marketCode,
        currencyCode: input.currencyCode,
        amountMinor: input.amountMinor,
        taxPolicyCode: input.taxPolicyCode,
        effectiveFrom: input.effectiveFrom,
        effectiveUntil: input.effectiveUntil,
        status: "ACTIVE",
      })
      .returning();
    if (!created) {
      throw new Error("Failed to create price_book_entry");
    }
    return created;
  });
}

export interface PurchaseSnapshotRecord {
  id: string;
  eventId: string;
  accountId: string;
  packageCodeSnapshot: PackageTierId;
  packageVersionSnapshot: number;
  currencyCode: string;
  subtotalMinor: number;
  taxMinor: number;
  totalMinor: number;
  status: string;
}

export interface CreatePurchaseSnapshotInput {
  eventId: string;
  accountId: string;
  packageCode: PackageTierId;
  marketCode?: string;
  currencyCode?: string;
}

/**
 * §10.4/§10.5: freezes the currently active package definition and price
 * into an immutable purchase snapshot, and copies every entitlement
 * definition into purchase_entitlement_snapshots — "captures exactly what
 * was sold even if package definitions later change" (§10.5). Tax is
 * fixed at zero: no approved tax rule exists yet
 * (product/PRICING_RULES.md §17), so this deliberately does not invent one.
 */
export async function createPurchaseSnapshot(
  db: Db,
  input: CreatePurchaseSnapshotInput,
): Promise<PurchaseSnapshotRecord> {
  const marketCode = input.marketCode ?? DEFAULT_MARKET_CODE;
  const currencyCode = input.currencyCode ?? DEFAULT_CURRENCY_CODE;

  return db.transaction(async (tx) => {
    const packageDefinition = await getActivePackageDefinition(
      tx,
      input.packageCode,
    );
    const priceBookEntry = await getActivePriceBookEntry(
      tx,
      packageDefinition.id,
      marketCode,
      currencyCode,
    );

    const subtotalMinor = priceBookEntry.amountMinor;
    const taxMinor = 0;
    const totalMinor = subtotalMinor + taxMinor;

    const [purchase] = await tx
      .insert(purchases)
      .values({
        eventId: input.eventId,
        accountId: input.accountId,
        packageDefinitionId: packageDefinition.id,
        priceBookEntryId: priceBookEntry.id,
        packageCodeSnapshot: packageDefinition.packageCode,
        packageVersionSnapshot: packageDefinition.version,
        currencyCode,
        subtotalMinor,
        taxMinor,
        totalMinor,
        status: "CREATED",
      })
      .returning();
    if (!purchase) {
      throw new Error("Failed to create purchase snapshot");
    }

    const definitions = await tx
      .select()
      .from(entitlementDefinitions)
      .where(
        eq(entitlementDefinitions.packageDefinitionId, packageDefinition.id),
      );

    if (definitions.length > 0) {
      await tx.insert(purchaseEntitlementSnapshots).values(
        definitions.map((definition) => ({
          purchaseId: purchase.id,
          entitlementCode: definition.entitlementCode,
          quantity: definition.quantity,
          unit: definition.unit,
          policyValue: definition.policyValue,
        })),
      );
    }

    return purchase;
  });
}
