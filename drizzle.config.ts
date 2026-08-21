import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit configuration (IMP-020).
 *
 * `generate` and `check` (the only commands this repository's npm scripts
 * invoke through this file) do not require a database connection, so no
 * credential is read here. Applying migrations uses a separate,
 * explicit-connection script (scripts/db-migrate.ts) that reads
 * DATABASE_DIRECT_URL directly, per docs/06_DATABASE_DESIGN.md §15/§23 and
 * the IMP-020 instruction to avoid requiring database credentials merely to
 * generate migration SQL.
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  strict: true,
  verbose: true,
});
