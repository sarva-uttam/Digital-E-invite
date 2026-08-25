import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit configuration (IMP-020).
 *
 * `generate` and `check` (the only commands this repository's npm scripts
 * invoke through this file) do not require a database connection, so no
 * credential is read here. Applying migrations uses a separate,
 * explicit-connection module (src/db/migrate.ts, invoked by
 * scripts/db-migrate.mjs) that reads DATABASE_DIRECT_URL directly, per
 * docs/06_DATABASE_DESIGN.md §23 ("Migration deployment is separated from
 * ordinary web startup").
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  strict: true,
  verbose: true,
});
