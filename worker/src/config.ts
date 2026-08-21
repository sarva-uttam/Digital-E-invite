/**
 * Worker-side entry point for the shared, framework-agnostic configuration
 * boundary (IMP-010). Uses a relative import rather than the "@/" Next.js
 * path alias so it resolves correctly regardless of how the worker is
 * eventually built and run. The shared module must never import
 * "server-only" (directly or transitively) and must never read
 * `process.env` on its own: the worker is a plain Node.js process, outside
 * any Next.js/webpack build, where the "server-only" package's Client
 * Component throw guard would otherwise fire unconditionally.
 *
 * `loadWorkerEnv` is this module's own runtime-specific entry point: it
 * defaults to the real `process.env` and delegates to the shared pure
 * parser, mirroring how src/lib/env.ts does the same for the Next.js web
 * app.
 *
 * This module establishes the boundary only; pg-boss job processing and
 * worker business logic remain out of scope (see IMP-042).
 */
import { parseServerEnv, toPublicConfig } from "../../src/lib/config";
import type { EnvSource, PublicConfig, ServerEnv } from "../../src/lib/config";

export function loadWorkerEnv(source: EnvSource = process.env): ServerEnv {
  return parseServerEnv(source);
}

export { toPublicConfig };
export type { ServerEnv, PublicConfig, EnvSource };
