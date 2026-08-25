import { defineConfig } from "vitest/config";

/**
 * Database integration test configuration (IMP-020). Run with
 * `npm run test:db`. Requires a real disposable PostgreSQL 18 instance
 * reachable via TEST_DATABASE_URL — this suite fails, it does not skip,
 * when that variable is missing or unsafe (see src/db/test-safety.ts and
 * src/db/vitest-global-setup.ts).
 *
 * `fileParallelism: false` runs test files one at a time: the migration
 * test file resets and re-migrates the schema from empty as part of its
 * assertions, which must not race against other files reading/writing the
 * same disposable database.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/db/**/*.db.test.ts"],
    passWithNoTests: false,
    fileParallelism: false,
    testTimeout: 30_000,
    hookTimeout: 30_000,
    globalSetup: ["./src/db/vitest-global-setup.ts"],
  },
});
