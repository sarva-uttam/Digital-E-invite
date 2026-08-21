/**
 * Worker-side entry point for the shared, framework-agnostic configuration
 * boundary (IMP-010). Uses a relative import rather than the "@/" Next.js
 * path alias so it resolves correctly regardless of how the worker is
 * eventually built and run. The shared module must never import
 * "server-only" (directly or transitively): the worker is a plain Node.js
 * process, outside any Next.js/webpack build, where that package's Client
 * Component throw guard would otherwise fire unconditionally.
 *
 * This module establishes the boundary only; pg-boss job processing and
 * worker business logic remain out of scope (see IMP-042).
 */
export {
  loadServerEnv,
  toPublicConfig,
  type ServerEnv,
  type PublicConfig,
  type EnvSource,
} from "../../src/lib/config";
