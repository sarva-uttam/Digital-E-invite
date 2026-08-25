/**
 * Migration-system integration tests (IMP-020). Requires a real disposable
 * PostgreSQL 18 database — see vitest.db.config.mts. Run with
 * `npm run test:db`.
 *
 * These tests verify the migration *tooling* (applying the full history to
 * an empty database, idempotent re-apply), not table-specific business
 * behavior — that belongs to each table's own task (e.g.
 * src/db/schema/operations.db.test.ts for IMP-022).
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { createDbClient } from "./client";
import type { DbClient } from "./client";
import { runMigrations } from "./migrate";
import { requireTestDatabaseUrl } from "./test-safety";

let client: DbClient;

beforeAll(() => {
  const testDatabaseUrl = requireTestDatabaseUrl();
  client = createDbClient(testDatabaseUrl);
});

afterAll(async () => {
  await client.close();
});

describe("PostgreSQL baseline", () => {
  it("reports major version 18, matching DEC-023", async () => {
    const result = await client.db.execute<{ server_version_num: string }>(
      sql`show server_version_num`,
    );
    const versionNum = Number.parseInt(
      result.rows[0]?.server_version_num ?? "0",
      10,
    );
    expect(Math.floor(versionNum / 10000)).toBe(18);
  });

  it("provides the native uuidv7() function required by docs/06_DATABASE_DESIGN.md §6.1", async () => {
    const result = await client.db.execute<{ id: string }>(
      sql`select uuidv7() as id`,
    );
    const id = result.rows[0]?.id;
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });
});

describe("migration application from an empty database", () => {
  it("applies the full migration history to an empty database, and reapplying is a safe no-op", async () => {
    const testDatabaseUrl = requireTestDatabaseUrl();

    // Reset to a genuinely empty database before applying anything. The
    // migration-history table lives in its own "drizzle" schema, separate
    // from "public" — dropping only "public" leaves history rows recording
    // migrations 0000/0001 as already applied even though the tables they
    // created were just destroyed, so the migrator would see "nothing to
    // do" and silently skip recreating them. Both schemas must reset
    // together for this test to actually prove a from-scratch apply works.
    await client.db.execute(sql`drop schema if exists public cascade`);
    await client.db.execute(sql`create schema public`);
    await client.db.execute(sql`drop schema if exists drizzle cascade`);

    await runMigrations(testDatabaseUrl);

    const historyTable = await client.db.execute<{ exists: boolean }>(sql`
      select exists (
        select 1 from information_schema.tables
        where table_schema = 'drizzle' and table_name = '__drizzle_migrations'
      ) as exists
    `);
    expect(historyTable.rows[0]?.exists).toBe(true);

    // Drizzle's sql`` tag interpolates a JS array as comma-separated
    // scalar params, not a Postgres array literal, so `= any(${array})`
    // fails with "op ANY/ALL (array) requires array on right side" — use
    // `in (...)` instead, which is exactly what that parameter shape is.
    const expectedTables = ["audit_events", "job_executions", "outbox_events"];
    const tables = await client.db.execute<{ table_name: string }>(sql`
      select table_name from information_schema.tables
      where table_schema = 'public' and table_name in (${sql.join(
        expectedTables.map((t) => sql`${t}`),
        sql`, `,
      )})
    `);
    expect(tables.rows.map((r) => r.table_name).sort()).toEqual(expectedTables);

    // Re-applying must not throw and must not duplicate history rows.
    const before = await client.db.execute<{ count: string }>(
      sql`select count(*)::text as count from drizzle.__drizzle_migrations`,
    );
    await runMigrations(testDatabaseUrl);
    const after = await client.db.execute<{ count: string }>(
      sql`select count(*)::text as count from drizzle.__drizzle_migrations`,
    );
    expect(after.rows[0]?.count).toBe(before.rows[0]?.count);
  });
});
