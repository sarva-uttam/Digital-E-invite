/**
 * Behavioral tests for the IMP-050 catalogue/price-book/purchase-snapshot
 * repository against a real disposable PostgreSQL 18 database. Run with
 * `npm run test:db`.
 */

import { eq, sql } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDbClient } from "../client";
import type { DbClient } from "../client";
import { requireTestDatabaseUrl } from "../test-safety";
import { packageTiers } from "../../lib/catalog";
import {
  entitlementDefinitions,
  packageDefinitions,
  priceBookEntries,
  purchaseEntitlementSnapshots,
  purchases,
} from "../schema/catalogue";
import {
  DEFAULT_CURRENCY_CODE,
  DEFAULT_MARKET_CODE,
  OverlappingPriceIntervalError,
  createPriceBookEntry,
  createPurchaseSnapshot,
  ensureCatalogueSeeded,
  getActivePackageDefinition,
  getActivePriceBookEntry,
} from "./catalogue";

let client: DbClient;

beforeAll(async () => {
  const testDatabaseUrl = requireTestDatabaseUrl();
  client = createDbClient(testDatabaseUrl);
  await ensureCatalogueSeeded(client.db);
});

afterAll(async () => {
  await client.close();
});

describe("ensureCatalogueSeeded", () => {
  it("seeds all four DEC-025 package tiers with the exact catalog.ts amounts and is idempotent", async () => {
    for (const tier of packageTiers) {
      const definition = await getActivePackageDefinition(client.db, tier.id);
      expect(definition.version).toBe(1);

      const entry = await getActivePriceBookEntry(
        client.db,
        definition.id,
        DEFAULT_MARKET_CODE,
        DEFAULT_CURRENCY_CODE,
      );
      expect(entry.amountMinor).toBe(tier.priceMur * 100);

      const entitlements = await client.db
        .select()
        .from(entitlementDefinitions)
        .where(eq(entitlementDefinitions.packageDefinitionId, definition.id));
      expect(entitlements.map((e) => e.entitlementCode).sort()).toEqual(
        [
          "ai_concept",
          "ai_refinement",
          "guest_capacity",
          "hosting_days",
          "language_slot",
        ].sort(),
      );
      expect(
        entitlements.find((e) => e.entitlementCode === "hosting_days")
          ?.quantity,
      ).toBe(tier.hostingDays);
    }

    // Re-running must not create a second version-1 row per tier.
    await ensureCatalogueSeeded(client.db);
    const platinumRows = await client.db
      .select()
      .from(packageDefinitions)
      .where(eq(packageDefinitions.packageCode, "platinum"));
    expect(platinumRows).toHaveLength(1);
  });
});

describe("createPurchaseSnapshot", () => {
  it("derives the total entirely server-side from the active price book, with no client-supplied amount", async () => {
    const eventId = crypto.randomUUID();
    const accountId = crypto.randomUUID();

    const purchase = await createPurchaseSnapshot(client.db, {
      eventId,
      accountId,
      packageCode: "gold",
    });

    const goldTier = packageTiers.find((t) => t.id === "gold");
    if (!goldTier) throw new Error("gold tier missing from catalog.ts");

    expect(purchase.packageCodeSnapshot).toBe("gold");
    expect(purchase.packageVersionSnapshot).toBe(1);
    expect(purchase.currencyCode).toBe("MUR");
    expect(purchase.subtotalMinor).toBe(goldTier.priceMur * 100);
    expect(purchase.taxMinor).toBe(0);
    expect(purchase.totalMinor).toBe(goldTier.priceMur * 100);
    expect(purchase.status).toBe("CREATED");

    const snapshots = await client.db
      .select()
      .from(purchaseEntitlementSnapshots)
      .where(eq(purchaseEntitlementSnapshots.purchaseId, purchase.id));
    expect(snapshots).toHaveLength(5);
    expect(
      snapshots.find((s) => s.entitlementCode === "ai_concept")?.quantity,
    ).toBe(goldTier.concepts);
  });

  it("preserves the historical price on an existing purchase even after the catalogue price changes", async () => {
    const eventId = crypto.randomUUID();
    const accountId = crypto.randomUUID();

    const original = await createPurchaseSnapshot(client.db, {
      eventId,
      accountId,
      packageCode: "silver",
    });
    const silverTier = packageTiers.find((t) => t.id === "silver");
    if (!silverTier) throw new Error("silver tier missing from catalog.ts");
    expect(original.subtotalMinor).toBe(silverTier.priceMur * 100);

    // Simulate a price change: retire the seeded entry and activate a
    // differently priced one for the same package/market/currency. A
    // repository-level "retire" helper doesn't exist yet (no task has
    // needed one); this direct update is test-only, standing in for that
    // future operation.
    const definition = await getActivePackageDefinition(client.db, "silver");
    await client.db
      .update(priceBookEntries)
      .set({ effectiveUntil: new Date(Date.now() - 1000) })
      .where(eq(priceBookEntries.packageDefinitionId, definition.id));
    await createPriceBookEntry(client.db, {
      packageDefinitionId: definition.id,
      marketCode: DEFAULT_MARKET_CODE,
      currencyCode: DEFAULT_CURRENCY_CODE,
      amountMinor: (silverTier.priceMur + 500) * 100,
      effectiveFrom: new Date(),
    });

    const newPurchase = await createPurchaseSnapshot(client.db, {
      eventId: crypto.randomUUID(),
      accountId: crypto.randomUUID(),
      packageCode: "silver",
    });
    expect(newPurchase.subtotalMinor).toBe((silverTier.priceMur + 500) * 100);

    // The original purchase's snapshot is untouched by the price change.
    const [reread] = await client.db
      .select()
      .from(purchases)
      .where(eq(purchases.id, original.id));
    expect(reread?.subtotalMinor).toBe(silverTier.priceMur * 100);
  });
});

describe("createPriceBookEntry — overlap prevention", () => {
  it("rejects a new active interval that overlaps an existing active one for the same package/market/currency", async () => {
    const definition = await getActivePackageDefinition(client.db, "bronze");

    await expect(
      createPriceBookEntry(client.db, {
        packageDefinitionId: definition.id,
        marketCode: DEFAULT_MARKET_CODE,
        currencyCode: DEFAULT_CURRENCY_CODE,
        amountMinor: 99900,
        effectiveFrom: new Date(),
      }),
    ).rejects.toThrow(OverlappingPriceIntervalError);
  });
});

describe("purchase_entitlement_snapshots — database-enforced append-only", () => {
  it("rejects UPDATE and DELETE via the append-only trigger", async () => {
    const purchase = await createPurchaseSnapshot(client.db, {
      eventId: crypto.randomUUID(),
      accountId: crypto.randomUUID(),
      packageCode: "bronze",
    });
    const [snapshot] = await client.db
      .select()
      .from(purchaseEntitlementSnapshots)
      .where(eq(purchaseEntitlementSnapshots.purchaseId, purchase.id))
      .limit(1);
    if (!snapshot) throw new Error("expected at least one snapshot row");

    await expect(
      client.db.execute(
        sql`update purchase_entitlement_snapshots set quantity = 999 where id = ${snapshot.id}`,
      ),
    ).rejects.toThrow();
    await expect(
      client.db.execute(
        sql`delete from purchase_entitlement_snapshots where id = ${snapshot.id}`,
      ),
    ).rejects.toThrow();
  });
});
