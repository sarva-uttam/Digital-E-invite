/**
 * Schema barrel. Re-exports every domain module so drizzle.config.ts,
 * application code, and tests have one import path. Each dependent task
 * (IMP-021 users/events, IMP-023 entitlements, IMP-050 catalogue/pricing,
 * etc.) adds its own module and export line here, mapped to its own
 * numbered section of docs/06_DATABASE_DESIGN.md.
 */
export * from "./operations";
