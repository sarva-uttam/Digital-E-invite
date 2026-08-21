/**
 * Base schema barrel (IMP-020). Re-exports every table module so
 * drizzle.config.ts, application code, and tests have one import path.
 */

export * from "./identity";
export * from "./events";
export * from "./catalogue";
export * from "./payments";
export * from "./entitlements";
export * from "./generation";
export * from "./invitations";
export * from "./guests";
export * from "./operations";
