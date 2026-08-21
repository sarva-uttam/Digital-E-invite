/**
 * Migration and base-schema integration tests (IMP-020). Requires a real
 * disposable PostgreSQL 18 database — see vitest.db.config.mts. Run with
 * `npm run test:db`.
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { createDbClient } from "./client";
import type { DbClient } from "./client";
import { runMigrations } from "./migrate";
import { requireTestDatabaseUrl } from "./test-safety";
import { toPublicConfig } from "../lib/config";
import type { ServerEnv } from "../lib/config";

const EXPECTED_TABLES = [
  "accounts",
  "profiles",
  "planner_client_references",
  "events",
  "event_facts",
  "creative_briefs",
  "package_definitions",
  "entitlement_definitions",
  "price_book_entries",
  "purchases",
  "purchase_entitlement_snapshots",
  "payment_attempts",
  "payment_events",
  "payment_transactions",
  "entitlement_ledger_entries",
  "entitlement_balances",
  "generation_requests",
  "generation_attempts",
  "generation_results",
  "generated_assets",
  "invitations",
  "invitation_versions",
  "publications",
  "guest_parties",
  "party_members",
  "rsvp_submissions",
  "response_management_tokens",
  "guest_imports",
  "guest_import_rows",
  "outbox_events",
  "job_executions",
  "audit_events",
] as const;

let client: DbClient;

beforeAll(() => {
  const testDatabaseUrl = requireTestDatabaseUrl();
  client = createDbClient(testDatabaseUrl);
});

afterAll(async () => {
  await client.close();
});

describe("PostgreSQL baseline", () => {
  it("reports major version 18", async () => {
    const result = await client.db.execute<{ server_version_num: string }>(
      sql`show server_version_num`,
    );
    const versionNum = Number.parseInt(
      result.rows[0]?.server_version_num ?? "0",
      10,
    );
    expect(Math.floor(versionNum / 10000)).toBe(18);
  });
});

describe("migration application from an empty database", () => {
  it("applies the complete migration history, and reapplying is a safe no-op", async () => {
    const testDatabaseUrl = requireTestDatabaseUrl();

    // Reset to a genuinely empty database before applying anything.
    await client.db.execute(sql`drop schema if exists public cascade`);
    await client.db.execute(sql`create schema public`);

    await runMigrations(testDatabaseUrl);

    const afterFirstApply = await client.db.execute<{ count: string }>(
      sql`select count(*)::text as count from drizzle.__drizzle_migrations`,
    );
    const appliedCount = Number.parseInt(
      afterFirstApply.rows[0]?.count ?? "0",
      10,
    );
    expect(appliedCount).toBeGreaterThanOrEqual(3);

    // Rerunning must not error and must not re-record already-applied
    // migrations (drizzle-kit migrate/migrate() skip by hash+timestamp).
    await runMigrations(testDatabaseUrl);
    const afterSecondApply = await client.db.execute<{ count: string }>(
      sql`select count(*)::text as count from drizzle.__drizzle_migrations`,
    );
    expect(afterSecondApply.rows[0]?.count).toBe(
      afterFirstApply.rows[0]?.count,
    );
  });

  it("creates every expected base-schema table", async () => {
    const result = await client.db.execute<{ table_name: string }>(
      sql`select table_name from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE'`,
    );
    const tableNames = new Set(result.rows.map((row) => row.table_name));
    for (const expected of EXPECTED_TABLES) {
      expect(tableNames.has(expected), `expected table "${expected}"`).toBe(
        true,
      );
    }
  });
});

describe("schema objects", () => {
  it("uses uuidv7() as the default for internal primary keys", async () => {
    const result = await client.db.execute<{ column_default: string }>(
      sql`select column_default from information_schema.columns
          where table_schema = 'public' and table_name = 'accounts' and column_name = 'id'`,
    );
    expect(result.rows[0]?.column_default).toContain("uuidv7()");
  });

  it("stores timestamped instants as timestamptz", async () => {
    const result = await client.db.execute<{ data_type: string }>(
      sql`select data_type from information_schema.columns
          where table_schema = 'public' and table_name = 'events' and column_name = 'created_at'`,
    );
    expect(result.rows[0]?.data_type).toBe("timestamp with time zone");
  });

  it("stores the event date as a plain date (no time component)", async () => {
    const result = await client.db.execute<{ data_type: string }>(
      sql`select data_type from information_schema.columns
          where table_schema = 'public' and table_name = 'event_facts' and column_name = 'event_date'`,
    );
    expect(result.rows[0]?.data_type).toBe("date");
  });

  it("declares the expected primary keys", async () => {
    const result = await client.db.execute<{
      table_name: string;
      column_name: string;
    }>(
      sql`select tc.table_name, kcu.column_name
          from information_schema.table_constraints tc
          join information_schema.key_column_usage kcu
            on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
          where tc.constraint_type = 'PRIMARY KEY' and tc.table_schema = 'public'
            and tc.table_name in ('accounts', 'profiles', 'entitlement_balances')
          order by tc.table_name, kcu.ordinal_position`,
    );
    const byTable = new Map<string, string[]>();
    for (const row of result.rows) {
      const cols = byTable.get(row.table_name) ?? [];
      cols.push(row.column_name);
      byTable.set(row.table_name, cols);
    }
    expect(byTable.get("accounts")).toEqual(["id"]);
    expect(byTable.get("profiles")).toEqual(["account_id"]);
    expect(byTable.get("entitlement_balances")).toEqual([
      "event_id",
      "entitlement_code",
    ]);
  });

  it("declares the expected foreign keys", async () => {
    const result = await client.db.execute<{ constraint_name: string }>(
      sql`select constraint_name from information_schema.table_constraints
          where constraint_type = 'FOREIGN KEY' and table_schema = 'public'
            and table_name = 'events' and constraint_name = 'events_owner_account_id_accounts_id_fk'`,
    );
    expect(result.rows.length).toBe(1);
  });

  it("declares the composite foreign key protecting current_version_id", async () => {
    const result = await client.db.execute<{ constraint_name: string }>(
      sql`select constraint_name from information_schema.table_constraints
          where constraint_type = 'FOREIGN KEY' and table_schema = 'public'
            and table_name = 'invitations'
            and constraint_name = 'invitations_current_version_same_invitation_fk'`,
    );
    expect(result.rows.length).toBe(1);
  });

  it("declares the expected unique constraints", async () => {
    const result = await client.db.execute<{ constraint_name: string }>(
      sql`select constraint_name from information_schema.table_constraints
          where constraint_type = 'UNIQUE' and table_schema = 'public'
            and table_name = 'accounts' and constraint_name = 'accounts_auth_subject_key'`,
    );
    expect(result.rows.length).toBe(1);
  });

  it("declares the expected check constraints", async () => {
    const result = await client.db.execute<{ constraint_name: string }>(
      sql`select constraint_name from information_schema.table_constraints
          where constraint_type = 'CHECK' and table_schema = 'public'
            and table_name = 'events' and constraint_name = 'events_status_check'`,
    );
    expect(result.rows.length).toBe(1);
  });

  it("declares the approved index strategy (spot check)", async () => {
    const result = await client.db.execute<{ indexname: string }>(
      sql`select indexname from pg_indexes
          where schemaname = 'public' and tablename = 'invitations' and indexname = 'invitations_public_slug_key'`,
    );
    expect(result.rows.length).toBe(1);

    const partialIndex = await client.db.execute<{ indexname: string }>(
      sql`select indexname from pg_indexes
          where schemaname = 'public' and tablename = 'publications'
            and indexname = 'publications_one_active_per_event'`,
    );
    expect(partialIndex.rows.length).toBe(1);
  });

  it("records the committed migrations in migration history", async () => {
    const result = await client.db.execute<{ count: string }>(
      sql`select count(*)::text as count from drizzle.__drizzle_migrations`,
    );
    expect(Number.parseInt(result.rows[0]?.count ?? "0", 10)).toBe(3);
  });
});

describe("runtime/public boundary", () => {
  it("never exposes database configuration through the public config allow-list", () => {
    const syntheticEnv = {
      appEnv: "development",
      logLevel: "info",
      appName: "Test",
      appUrl: undefined,
      publicAppUrl: undefined,
      defaultLocale: "en",
      defaultCurrency: "MUR",
      appTimezone: "Indian/Mauritius",
      allowedOrigins: [],
      trustedProxyCount: undefined,
      features: {
        payments: false,
        aiText: false,
        aiImage: false,
        emailDelivery: false,
        eurCheckout: false,
        usdCheckout: false,
        mauritianKreol: false,
        russian: false,
      },
      appSecrets: {
        appSecret: undefined,
        encryptionKey: undefined,
        tokenHashKey: undefined,
      },
      database: {
        url: undefined,
        directUrl: undefined,
        sslMode: undefined,
        poolMin: undefined,
        poolMax: undefined,
      },
      payment: {
        mode: "sandbox",
        baseCurrency: "MUR",
        supportedCurrencies: ["MUR"],
      },
      test: { testDatabaseUrl: undefined, e2eBaseUrl: undefined },
      providerConfig: {},
    } satisfies ServerEnv;

    const publicConfig = toPublicConfig(syntheticEnv);
    const keys = Object.keys(publicConfig);
    for (const key of keys) {
      expect(key.toLowerCase()).not.toContain("database");
      expect(key.toLowerCase()).not.toContain("db");
    }
  });
});
