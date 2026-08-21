/**
 * Shared column-builder factories for the base schema (IMP-020).
 *
 * Each function returns fresh Drizzle column builders on every call.
 * Builders are stateful once bound to a `pgTable` call, so the same
 * builder instance must never be reused across tables — these are plain
 * factory functions (not shared constants) for that reason.
 *
 * PostgreSQL 18 provides the native `uuidv7()` function (verified against
 * current PostgreSQL 18 documentation at implementation time), so internal
 * identifiers use a database-generated default rather than an application
 * UUID library, per docs/06_DATABASE_DESIGN.md §6.1.
 */

import { sql } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";

/** `id uuid primary key default uuidv7()` */
export function uuidPk() {
  return uuid("id")
    .primaryKey()
    .default(sql`uuidv7()`);
}

/** A non-primary-key UUIDv7 column, e.g. for tables without a natural id yet. */
export function uuidv7Default() {
  return uuid("id").default(sql`uuidv7()`);
}

/** `created_at timestamptz not null` / `updated_at timestamptz not null` (database-generated). */
export function timestamps() {
  return {
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  };
}

/** `created_at timestamptz not null` only, for append-only/immutable rows with no update timestamp. */
export function createdAtOnly() {
  return {
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  };
}
