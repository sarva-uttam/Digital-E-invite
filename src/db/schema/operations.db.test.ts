/**
 * Behavioral tests for the IMP-022 operational reliability tables against
 * a real disposable PostgreSQL 18 database. Run with `npm run test:db`.
 */

import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { createDbClient } from "../client";
import type { DbClient } from "../client";
import { requireTestDatabaseUrl } from "../test-safety";
import { auditEvents, jobExecutions, outboxEvents } from "./operations";

/** Narrows a possibly-undefined array element (tsconfig noUncheckedIndexedAccess), failing the test clearly if it's missing rather than throwing a generic TypeError later. */
function must<T>(value: T | undefined, what: string): T {
  if (value === undefined) {
    throw new Error(`Expected ${what} to be defined`);
  }
  return value;
}

let client: DbClient;

beforeAll(() => {
  const testDatabaseUrl = requireTestDatabaseUrl();
  client = createDbClient(testDatabaseUrl);
});

afterAll(async () => {
  await client.close();
});

afterEach(async () => {
  // audit_events cannot be cleaned up with DELETE (that is the point of
  // the append-only trigger under test) — assertions below use distinct
  // deduplication_key / actor_account_id values per test instead so rows
  // never collide across tests.
  await client.db.execute(sql`delete from job_executions`);
  await client.db.execute(sql`delete from outbox_events`);
});

describe("outbox_events — replay/idempotency", () => {
  it("rejects a second insert with the same deduplication_key (constraint-level idempotency)", async () => {
    const key = `test-dedup-${crypto.randomUUID()}`;
    const row = {
      aggregateType: "test_aggregate",
      aggregateId: crypto.randomUUID(),
      eventType: "test.event",
      payload: { hello: "world" },
      payloadSchemaVersion: 1,
      occurredAt: new Date(),
      availableAt: new Date(),
      deduplicationKey: key,
    };

    await client.db.insert(outboxEvents).values(row);

    await expect(client.db.insert(outboxEvents).values(row)).rejects.toThrow(
      /deduplication_key/,
    );
  });

  it("lets a replayed domain event no-op via ON CONFLICT DO NOTHING instead of erroring", async () => {
    const key = `test-dedup-conflict-${crypto.randomUUID()}`;
    const row = {
      aggregateType: "test_aggregate",
      aggregateId: crypto.randomUUID(),
      eventType: "test.event",
      payload: {},
      payloadSchemaVersion: 1,
      occurredAt: new Date(),
      availableAt: new Date(),
      deduplicationKey: key,
    };

    await client.db.insert(outboxEvents).values(row);
    // Simulates a domain action being safely retried after an ambiguous
    // failure: the same logical event is inserted again with the same
    // key. This must not throw and must not create a second row.
    await client.db
      .insert(outboxEvents)
      .values(row)
      .onConflictDoNothing({ target: outboxEvents.deduplicationKey });

    const rows = await client.db
      .select()
      .from(outboxEvents)
      .where(sql`${outboxEvents.deduplicationKey} = ${key}`);
    expect(rows).toHaveLength(1);
  });

  it("only the unprocessed partial index's predicate matches rows with processed_at is null", async () => {
    const key = `test-processed-${crypto.randomUUID()}`;
    await client.db.insert(outboxEvents).values({
      aggregateType: "test_aggregate",
      aggregateId: crypto.randomUUID(),
      eventType: "test.event",
      payload: {},
      payloadSchemaVersion: 1,
      occurredAt: new Date(),
      availableAt: new Date(),
      processedAt: new Date(),
      deduplicationKey: key,
    });

    const unprocessed = await client.db
      .select()
      .from(outboxEvents)
      .where(
        sql`${outboxEvents.deduplicationKey} = ${key} and ${outboxEvents.processedAt} is null`,
      );
    expect(unprocessed).toHaveLength(0);
  });
});

describe("job_executions", () => {
  it("references an outbox event and tolerates a null outbox_event_id", async () => {
    const [outboxRow] = await client.db
      .insert(outboxEvents)
      .values({
        aggregateType: "test_aggregate",
        aggregateId: crypto.randomUUID(),
        eventType: "test.event",
        payload: {},
        payloadSchemaVersion: 1,
        occurredAt: new Date(),
        availableAt: new Date(),
        deduplicationKey: `test-job-${crypto.randomUUID()}`,
      })
      .returning();

    await client.db.insert(jobExecutions).values([
      {
        outboxEventId: must(outboxRow, "inserted outbox row").id,
        jobType: "test.job",
        status: "SUCCEEDED",
        attemptNumber: 1,
      },
      {
        outboxEventId: null,
        jobType: "test.job.standalone",
        status: "SUCCEEDED",
        attemptNumber: 1,
      },
    ]);

    const rows = await client.db
      .select()
      .from(jobExecutions)
      .where(sql`${jobExecutions.jobType} like 'test.job%'`);
    expect(rows).toHaveLength(2);
  });
});

describe("audit_events — database-enforced append-only", () => {
  it("allows insert", async () => {
    const [row] = await client.db
      .insert(auditEvents)
      .values({
        actorType: "test_actor",
        action: "test.action",
        targetType: "test_target",
        occurredAt: new Date(),
      })
      .returning();
    expect(must(row, "inserted audit row").id).toBeDefined();
  });

  it("rejects UPDATE via the append-only trigger", async () => {
    const [row] = await client.db
      .insert(auditEvents)
      .values({
        actorType: "test_actor",
        action: "test.action.update",
        targetType: "test_target",
        occurredAt: new Date(),
      })
      .returning();

    await expect(
      client.db
        .update(auditEvents)
        .set({ reasonNote: "attempted correction" })
        .where(sql`${auditEvents.id} = ${must(row, "inserted audit row").id}`),
    ).rejects.toThrow(/append-only/);
  });

  it("rejects DELETE via the append-only trigger", async () => {
    const [row] = await client.db
      .insert(auditEvents)
      .values({
        actorType: "test_actor",
        action: "test.action.delete",
        targetType: "test_target",
        occurredAt: new Date(),
      })
      .returning();

    await expect(
      client.db
        .delete(auditEvents)
        .where(sql`${auditEvents.id} = ${must(row, "inserted audit row").id}`),
    ).rejects.toThrow(/append-only/);
  });
});
