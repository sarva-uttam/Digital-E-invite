#!/usr/bin/env node
/**
 * Administrative/local migration runner (IMP-020).
 *
 * Applies every committed SQL migration in src/db/migrations to the
 * database identified by DATABASE_DIRECT_URL, per
 * docs/06_DATABASE_DESIGN.md §23. Safe to run repeatedly: already-applied
 * migrations are skipped by Drizzle's migration-history tracking table.
 *
 * Deliberately plain JavaScript (.mjs), not TypeScript: this is the one
 * place a migration is applied by directly invoking `node`, without a
 * bundler in front. Node's own ESM resolver (not TypeScript's
 * "moduleResolution": "bundler") governs this file's imports, which would
 * require every relative import it transitively touches to carry an
 * explicit ".ts" extension. src/db/*.ts intentionally keeps the
 * extensionless import style the rest of this codebase already uses for
 * Next.js/Vite-resolved code, so this script avoids importing that module
 * tree and instead calls the Drizzle migrator directly with the small
 * amount of duplicated setup that requires. Tests (vitest, Vite-resolved)
 * reuse src/db/migrate.ts's runMigrations() instead — see
 * src/db/migrations.db.test.ts.
 *
 * Never logs the connection string.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const connectionString = process.env.DATABASE_DIRECT_URL;

if (!connectionString) {
  console.error(
    "DATABASE_DIRECT_URL is required to apply migrations. Refusing to fall back to any other variable.",
  );
  process.exit(1);
}

const migrationsFolder = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "db",
  "migrations",
);

const pool = new Pool({ connectionString });

try {
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder });
  console.log(
    `Migrations applied successfully (source: ${path.relative(process.cwd(), migrationsFolder)}).`,
  );
} finally {
  await pool.end();
}
