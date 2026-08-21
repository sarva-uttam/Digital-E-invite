/**
 * Invitation and publication tables (IMP-020).
 * Source: docs/06_DATABASE_DESIGN.md §14.
 *
 * `invitations.current_version_id` is a nullable, mutually-referencing
 * pointer into `invitation_versions`, which itself references `invitations`
 * — a circular relationship. Drizzle resolves this because both the
 * column-level `.references()` callback and a table's `extraConfig`
 * callback are stored and invoked lazily (verified against the installed
 * drizzle-orm 0.45.2 `pgTable` implementation), not evaluated at
 * `pgTable(...)` call time, so a `const` declared later in this module can
 * still be referenced.
 *
 * §14.1 states the invariant explicitly: "`current_version_id` must refer
 * to a version belonging to the same invitation; this invariant is
 * enforced transactionally and, where practical, by a composite foreign
 * key." This schema implements that composite foreign key:
 * `invitations (id, current_version_id)` references
 * `invitation_versions (invitation_id, id)`, which requires the extra
 * `unique (invitation_id, id)` constraint on `invitation_versions` added
 * below (redundant with its own primary key, but required as the target of
 * a composite foreign key). Because `current_version_id` is nullable and
 * PostgreSQL's default `MATCH SIMPLE` foreign-key matching skips
 * enforcement whenever any referencing column is null, an invitation with
 * no current version yet (`current_version_id is null`) is unaffected.
 *
 * The composite foreign key itself is added as a reviewed custom SQL
 * migration (0001_invitations_current_version_composite_fk.sql), not in
 * this file's `extraConfig`: an `extraConfig` callback that reaches
 * `invitationVersions.invitationId` directly (a real property access, not
 * a lazily-invoked reference callback) reintroduces the two-way TypeScript
 * type-inference cycle that the lazy `.references()` callbacks below avoid.
 *
 * `invitation_versions.validation_status` has no enumerated value set in
 * docs/06 or docs/04 and is left as unconstrained `text not null`.
 * `publications.status` uses docs/04_DOMAIN_MODEL.md §15 "States".
 */

import { sql } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import {
  check,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { accounts } from "./identity";
import { events } from "./events";
import { generationResults } from "./generation";
import { timestamps, uuidPk } from "./_helpers";

/** docs/04_DOMAIN_MODEL.md §15 "States". */
export const PUBLICATION_STATUSES = [
  "UNPUBLISHED",
  "ACTIVE",
  "EXPIRED",
  "UNPUBLISHED_BY_OWNER",
  "SUSPENDED",
  "REMOVED",
] as const;

export const invitations = pgTable(
  "invitations",
  {
    id: uuidPk(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id),
    publicSlug: text("public_slug").notNull(),
    currentVersionId: uuid("current_version_id").references(
      (): AnyPgColumn => invitationVersions.id,
    ),
    ...timestamps(),
  },
  (table) => [
    unique("invitations_event_id_key").on(table.eventId),
    unique("invitations_public_slug_key").on(table.publicSlug),
  ],
);

export const invitationVersions = pgTable(
  "invitation_versions",
  {
    id: uuidPk(),
    invitationId: uuid("invitation_id")
      .notNull()
      .references((): AnyPgColumn => invitations.id),
    versionNumber: integer("version_number").notNull(),
    designConfig: jsonb("design_config").notNull(),
    copyConfig: jsonb("copy_config").notNull(),
    sourceGenerationResultId: uuid("source_generation_result_id").references(
      () => generationResults.id,
    ),
    validationStatus: text("validation_status").notNull(),
    validationErrors: jsonb("validation_errors"),
    createdByAccountId: uuid("created_by_account_id")
      .notNull()
      .references(() => accounts.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    unique("invitation_versions_invitation_version_number_key").on(
      table.invitationId,
      table.versionNumber,
    ),
    // Required as the target of invitations' composite foreign key above;
    // redundant with the primary key on `id` alone but PostgreSQL requires
    // a unique constraint covering exactly the referenced column set.
    unique("invitation_versions_invitation_id_id_key").on(
      table.invitationId,
      table.id,
    ),
    check(
      "invitation_versions_version_number_check",
      sql`${table.versionNumber} >= 1`,
    ),
  ],
);

export const publications = pgTable(
  "publications",
  {
    id: uuidPk(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id),
    invitationVersionId: uuid("invitation_version_id")
      .notNull()
      .references(() => invitationVersions.id),
    status: text("status").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    endedReason: text("ended_reason"),
    ...timestamps(),
  },
  (table) => [
    // §14.3: "A partial unique index allows only one active publication per
    // event."
    uniqueIndex("publications_one_active_per_event")
      .on(table.eventId)
      .where(sql`${table.status} = 'ACTIVE'`),
    check(
      "publications_status_check",
      sql`${table.status} in (
        'UNPUBLISHED', 'ACTIVE', 'EXPIRED', 'UNPUBLISHED_BY_OWNER',
        'SUSPENDED', 'REMOVED'
      )`,
    ),
  ],
);
