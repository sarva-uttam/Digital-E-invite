import "server-only";

import { parseServerEnv } from "./config";
import type { EnvSource, ServerEnv } from "./config";

/**
 * Next.js-facing entry point for the configuration boundary. The actual
 * parsing/validation logic lives in ./config, which deliberately does not
 * import "server-only" and does not read `process.env` on its own, so it
 * stays importable by the separately deployable worker (see
 * worker/src/config.ts) and by tests without needing a bundler-specific
 * module alias.
 *
 * Application code must import configuration from this file, not from
 * ./config directly: importing ./config alone would bypass the
 * "server-only" guard against accidental Client Component usage. This
 * file keeps that guard and is the only place in the Next.js app that
 * defaults to the real `process.env`.
 */
export * from "./config";

export function loadServerEnv(source: EnvSource = process.env): ServerEnv {
  return parseServerEnv(source);
}
