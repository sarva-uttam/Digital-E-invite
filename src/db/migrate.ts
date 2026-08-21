/**
 * Reviewed forward-migration runner (IMP-020).
 *
 * Applies the committed SQL migrations in src/db/migrations using Drizzle's
 * node-postgres migrator, which tracks applied migrations in a
 * "__drizzle_migrations" history table and is safe to invoke repeatedly —
 * already-applied migrations are skipped (see docs/06_DATABASE_DESIGN.md
 * §23 "Applied migration history is immutable" and the IMP-020 rollback/
 * repair policy in README.md).
 *
 * This module never logs a connection string. It is the single place both
 * scripts/db-migrate.ts (administrative/local use, DATABASE_DIRECT_URL) and
 * the database integration test suite (TEST_DATABASE_URL) apply migrations
 * from, so both paths are provably identical.
 */

import { fileURLToPath } from "node:url";
import path from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { createDbClient } from "./client";

const MIGRATIONS_FOLDER = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "migrations",
);

export interface RunMigrationsResult {
  migrationsFolder: string;
}

/**
 * Applies every committed migration to the database identified by
 * `connectionString`. The caller supplies the connection string explicitly
 * — this function never reads process.env — so every caller must state
 * plainly which database it intends to migrate.
 */
export async function runMigrations(
  connectionString: string,
): Promise<RunMigrationsResult> {
  const client = createDbClient(connectionString);
  try {
    await migrate(client.db, { migrationsFolder: MIGRATIONS_FOLDER });
    return { migrationsFolder: MIGRATIONS_FOLDER };
  } finally {
    await client.close();
  }
}
