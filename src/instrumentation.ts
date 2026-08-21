/**
 * Next.js startup instrumentation (IMP-010).
 *
 * `register()` is called once when a new Next.js server instance is
 * initiated and must complete before the server accepts requests:
 * https://nextjs.org/docs/app/guides/instrumentation
 *
 * Scope: validates the application's typed configuration boundary and
 * fails startup on invalid configuration. It performs no observability,
 * telemetry, or provider initialization — that belongs to IMP-011 and
 * later provider-specific tasks.
 *
 * Next.js calls `register` in every runtime (Node.js and Edge). Node.js
 * configuration validation is scoped to the Node.js runtime only, per the
 * official guidance on importing runtime-specific code.
 *
 * Imports from "./lib/env" (the "server-only"-guarded entry point), not
 * "./lib/config" (the pure, framework-agnostic parser), so real
 * configuration loading always goes through the protected boundary.
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { loadServerEnv } = await import("./lib/env");
    loadServerEnv();
  }
}
