/**
 * Behavioral tests for the IMP-023 entitlement ledger against a real
 * disposable PostgreSQL 18 database. Run with `npm run test:db`.
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDbClient } from "../client";
import type { DbClient } from "../client";
import { requireTestDatabaseUrl } from "../test-safety";
import {
  InsufficientEntitlementError,
  adjustEntitlement,
  consumeEntitlement,
  grantEntitlements,
  reconstructBalanceFromLedger,
  releaseEntitlement,
  reserveEntitlement,
} from "./entitlements";
import { initialGrantsForPackage } from "../../lib/entitlements";

let client: DbClient;

beforeAll(() => {
  const testDatabaseUrl = requireTestDatabaseUrl();
  client = createDbClient(testDatabaseUrl);
});

afterAll(async () => {
  await client.close();
});

function newEventId(): string {
  return crypto.randomUUID();
}

describe("grantEntitlements", () => {
  it("grants the exact DEC-025 quantities for a package tier and is idempotent on replay", async () => {
    const eventId = newEventId();
    const grants = initialGrantsForPackage("gold"); // 3 concepts, 8 refinements, 300 capacity, 3 language slots

    const first = await grantEntitlements(client.db, {
      eventId,
      purchaseId: crypto.randomUUID(),
      grants,
      idempotencyKeyPrefix: `purchase-${eventId}`,
      reasonCode: "PACKAGE_PURCHASE",
    });
    expect(first.map((b) => [b.entitlementCode, b.granted]).sort()).toEqual(
      [
        ["ai_concept", 3],
        ["ai_refinement", 8],
        ["guest_capacity", 300],
        ["language_slot", 3],
      ].sort(),
    );

    // Replay with the same idempotency prefix (e.g. a retried webhook) must not double-grant.
    const replay = await grantEntitlements(client.db, {
      eventId,
      purchaseId: crypto.randomUUID(),
      grants,
      idempotencyKeyPrefix: `purchase-${eventId}`,
      reasonCode: "PACKAGE_PURCHASE",
    });
    expect(
      replay.find((b) => b.entitlementCode === "ai_concept")?.granted,
    ).toBe(3);
  });
});

describe("reserve / consume / release lifecycle", () => {
  it("reserves within capacity, consumes the reservation, and the projection matches the ledger", async () => {
    const eventId = newEventId();
    await grantEntitlements(client.db, {
      eventId,
      purchaseId: crypto.randomUUID(),
      grants: initialGrantsForPackage("bronze"), // 1 concept
      idempotencyKeyPrefix: `purchase-${eventId}`,
      reasonCode: "PACKAGE_PURCHASE",
    });

    const reserved = await reserveEntitlement(client.db, {
      eventId,
      entitlementCode: "ai_concept",
      quantity: 1,
      idempotencyKey: `reserve-${eventId}-1`,
      reasonCode: "GENERATION_REQUEST",
    });
    expect(reserved.reserved).toBe(1);

    const consumed = await consumeEntitlement(client.db, {
      eventId,
      entitlementCode: "ai_concept",
      quantity: 1,
      idempotencyKey: `consume-${eventId}-1`,
      reasonCode: "GENERATION_SUCCEEDED",
    });
    expect(consumed.reserved).toBe(0);
    expect(consumed.consumed).toBe(1);

    const reconstructed = await reconstructBalanceFromLedger(
      client.db,
      eventId,
      "ai_concept",
    );
    expect(reconstructed).toEqual({
      eventId,
      entitlementCode: "ai_concept",
      granted: 1,
      reserved: 0,
      consumed: 1,
      adjusted: 0,
    });
  });

  it("rejects a reservation exceeding available balance", async () => {
    const eventId = newEventId();
    await grantEntitlements(client.db, {
      eventId,
      purchaseId: crypto.randomUUID(),
      grants: initialGrantsForPackage("bronze"), // 1 concept
      idempotencyKeyPrefix: `purchase-${eventId}`,
      reasonCode: "PACKAGE_PURCHASE",
    });

    await expect(
      reserveEntitlement(client.db, {
        eventId,
        entitlementCode: "ai_concept",
        quantity: 2,
        idempotencyKey: `reserve-${eventId}-over`,
        reasonCode: "GENERATION_REQUEST",
      }),
    ).rejects.toThrow(InsufficientEntitlementError);
  });

  it("releases an unconsumed reservation back to available capacity", async () => {
    const eventId = newEventId();
    await grantEntitlements(client.db, {
      eventId,
      purchaseId: crypto.randomUUID(),
      grants: initialGrantsForPackage("bronze"),
      idempotencyKeyPrefix: `purchase-${eventId}`,
      reasonCode: "PACKAGE_PURCHASE",
    });
    await reserveEntitlement(client.db, {
      eventId,
      entitlementCode: "ai_concept",
      quantity: 1,
      idempotencyKey: `reserve-${eventId}-1`,
      reasonCode: "GENERATION_REQUEST",
    });

    const released = await releaseEntitlement(client.db, {
      eventId,
      entitlementCode: "ai_concept",
      quantity: 1,
      idempotencyKey: `release-${eventId}-1`,
      reasonCode: "GENERATION_FAILED",
    });
    expect(released.reserved).toBe(0);
    expect(released.consumed).toBe(0);

    // Released capacity is available again.
    const reReserved = await reserveEntitlement(client.db, {
      eventId,
      entitlementCode: "ai_concept",
      quantity: 1,
      idempotencyKey: `reserve-${eventId}-2`,
      reasonCode: "GENERATION_REQUEST",
    });
    expect(reReserved.reserved).toBe(1);
  });
});

describe("adjustEntitlement", () => {
  it("applies a positive goodwill adjustment and a negative correction", async () => {
    const eventId = newEventId();
    await grantEntitlements(client.db, {
      eventId,
      purchaseId: crypto.randomUUID(),
      grants: initialGrantsForPackage("bronze"),
      idempotencyKeyPrefix: `purchase-${eventId}`,
      reasonCode: "PACKAGE_PURCHASE",
    });

    const bumped = await adjustEntitlement(client.db, {
      eventId,
      entitlementCode: "ai_concept",
      delta: 2,
      idempotencyKey: `adjust-${eventId}-goodwill`,
      reasonCode: "SUPPORT_GOODWILL",
      reasonNote: "Platform failure during first generation attempt",
      createdByAccountId: crypto.randomUUID(),
    });
    expect(bumped.adjusted).toBe(2);

    const corrected = await adjustEntitlement(client.db, {
      eventId,
      entitlementCode: "ai_concept",
      delta: -1,
      idempotencyKey: `adjust-${eventId}-correction`,
      reasonCode: "SUPPORT_CORRECTION",
      reasonNote: "Reversing an over-generous goodwill grant",
      createdByAccountId: crypto.randomUUID(),
    });
    expect(corrected.adjusted).toBe(1);
  });
});

describe("atomic concurrency", () => {
  it("never oversells under concurrent reservation attempts", async () => {
    const eventId = newEventId();
    await grantEntitlements(client.db, {
      eventId,
      purchaseId: crypto.randomUUID(),
      grants: initialGrantsForPackage("bronze"), // 1 concept — deliberately scarce
      idempotencyKeyPrefix: `purchase-${eventId}`,
      reasonCode: "PACKAGE_PURCHASE",
    });

    // 10 concurrent attempts to reserve the single available concept.
    // Each uses its own DbClient (its own pool connection), matching how
    // separate concurrent requests would behave in production — a single
    // shared connection can only run one transaction at a time and would
    // trivially "prove" serialization for the wrong reason.
    const attempts = Array.from({ length: 10 }, (_, i) => i);
    const results = await Promise.allSettled(
      attempts.map(async (i) => {
        const attemptClient = createDbClient(requireTestDatabaseUrl());
        try {
          return await reserveEntitlement(attemptClient.db, {
            eventId,
            entitlementCode: "ai_concept",
            quantity: 1,
            idempotencyKey: `reserve-${eventId}-concurrent-${i}`,
            reasonCode: "GENERATION_REQUEST",
          });
        } finally {
          await attemptClient.close();
        }
      }),
    );

    const succeeded = results.filter((r) => r.status === "fulfilled");
    const failed = results.filter((r) => r.status === "rejected");
    expect(succeeded).toHaveLength(1);
    expect(failed).toHaveLength(9);
    for (const failure of failed) {
      if (failure.status === "rejected") {
        expect(failure.reason).toBeInstanceOf(InsufficientEntitlementError);
      }
    }

    const finalBalance = await reconstructBalanceFromLedger(
      client.db,
      eventId,
      "ai_concept",
    );
    expect(finalBalance.reserved).toBe(1);
  });
});
