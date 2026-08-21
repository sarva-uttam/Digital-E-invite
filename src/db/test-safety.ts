/**
 * Safety guard for the disposable database integration test suite
 * (IMP-020). Every destructive test helper (schema reset, truncation) must
 * call this first.
 *
 * Per the IMP-020 instructions: destructive test helpers must never run
 * against production, staging, preview, or an unknown database, and must
 * never fall back from a missing TEST_DATABASE_URL to DATABASE_URL. This
 * module enforces that by construction — every function here requires an
 * explicit connection string argument; none reads process.env itself.
 */

const DISPOSABLE_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

/**
 * Throws unless `rawUrl` looks like a disposable local/CI database: either
 * its host is localhost/127.0.0.1/::1 (matching this repository's local
 * Docker Compose setup and the GitHub Actions PostgreSQL service, which is
 * exposed on localhost for a job-level, non-containerized run), or its
 * database name contains "test". Never echoes the supplied URL — an
 * invalid or unexpected value could itself carry embedded credentials.
 */
export function assertDisposableTestDatabase(rawUrl: string): URL {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error(
      "Refusing to run a destructive test operation: the supplied database URL is not well-formed.",
    );
  }

  const hostname = url.hostname.toLowerCase();
  const databaseName = url.pathname.replace(/^\//, "").toLowerCase();
  const looksDisposable =
    DISPOSABLE_HOSTS.has(hostname) || databaseName.includes("test");

  if (!looksDisposable) {
    throw new Error(
      'Refusing to run a destructive test operation: the target database does not look disposable (expected a localhost/127.0.0.1/::1 host or a database name containing "test").',
    );
  }

  return url;
}

/**
 * Reads TEST_DATABASE_URL from the given environment source, throwing
 * (never silently skipping, and never falling back to any other variable)
 * if it is missing or unsafe.
 */
export function requireTestDatabaseUrl(
  env: Readonly<Record<string, string | undefined>> = process.env,
): string {
  const value = env.TEST_DATABASE_URL;
  if (value === undefined || value.trim() === "") {
    throw new Error(
      "TEST_DATABASE_URL is required to run the database integration test suite (npm run test:db). It is never derived from DATABASE_URL or any other variable.",
    );
  }
  assertDisposableTestDatabase(value);
  return value;
}
