/**
 * Vitest globalSetup for the database integration suite (IMP-020). Runs
 * once, in a separate process, before any *.db.test.ts file. Fails the
 * whole run (does not silently skip) when TEST_DATABASE_URL is missing or
 * does not look disposable.
 *
 * Applies the committed migration history once so every test file starts
 * from a known-migrated baseline regardless of file execution order.
 */

import { requireTestDatabaseUrl } from "./test-safety";
import { runMigrations } from "./migrate";

export default async function setup(): Promise<void> {
  const testDatabaseUrl = requireTestDatabaseUrl();
  await runMigrations(testDatabaseUrl);
}
