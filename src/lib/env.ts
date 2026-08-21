import "server-only";

/**
 * Next.js-facing entry point for the configuration boundary. The actual
 * parsing/validation logic lives in ./config, which deliberately does not
 * import "server-only" so it stays importable by the separately deployable
 * worker (see worker/src/config.ts) and by tests without needing a
 * bundler-specific module alias. Importing this file from Next.js server
 * code keeps the existing "server-only" guard against accidental Client
 * Component usage.
 */
export * from "./config";
