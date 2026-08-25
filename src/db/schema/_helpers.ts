/**
 * Shared column-builder factories for domain schema modules.
 *
 * Each function returns fresh Drizzle column builders on every call.
 * Builders are stateful once bound to a `pgTable` call, so the same
 * builder instance must never be reused across tables — these are plain
 * factory functions (not shared constants) for that reason.
 *
 * PostgreSQL 18 provides the native `uuidv7()` function (verified against
 * current PostgreSQL 18.0 release notes at IMP-020 implementation time),
 * so internal identifiers use a database-generated default rather than an
 * application UUID library, per docs/06_DATABASE_DESIGN.md §6.1.
 */

import { sql } from "drizzle-orm";
import { timestamp, uuid } from "drizzle-orm/pg-core";

/** `id uuid primary key default uuidv7()` */
export function uuidPk() {
  return uuid("id")
    .primaryKey()
    .default(sql`uuidv7()`);
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
