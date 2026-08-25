/**
 * Schema barrel (IMP-020).
 *
 * IMP-020's scope is the migration system and tooling itself, not the
 * application's domain tables — those are owned by their own dependent
 * tasks (e.g. IMP-021 users/events, IMP-022 audit/outbox, IMP-023
 * entitlements, IMP-050 catalogue/pricing), each mapping to its own
 * numbered section of docs/06_DATABASE_DESIGN.md. This file intentionally
 * starts empty: a zero-table schema is a valid, verifiable state that
 * proves the migration tooling itself (generate/check/apply/re-apply)
 * works end-to-end before any domain table is added on top of it.
 *
 * Later tasks add `export * from "./<domain>"` lines here as they
 * introduce their tables.
 */
export {};
