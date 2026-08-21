/**
 * Guest and RSVP tables (IMP-020).
 * Source: docs/06_DATABASE_DESIGN.md §15.
 *
 * `guest_imports` / `guest_import_rows` (§15.5) are described only in prose
 * ("records event, uploader, file digest, status, row counts, and
 * timestamps" / "records row number, normalized candidate data, validation
 * outcome, and the resulting guest party ID"), not as an explicit
 * column-by-column list like every other table in this document. The
 * columns below are a direct, minimal translation of exactly those named
 * fields using this schema's established conventions (uuid ids,
 * snake_case, timestamptz, FK to the named parent) — nothing beyond what
 * §15.5 names is added.
 *
 * `guest_parties.source`, `rsvp_submissions.submission_source`, and the
 * derived import-tracking status columns have no enumerated value set in
 * either approved document and are left as unconstrained `text not null`.
 * `rsvp_submissions.attendance_status` uses the exact two values §15.3
 * states explicitly.
 */

import { sql } from "drizzle-orm";
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import {
  check,
  index,
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
import { timestamps, uuidPk } from "./_helpers";

export const guestParties = pgTable(
  "guest_parties",
  {
    id: uuidPk(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id),
    displayName: text("display_name").notNull(),
    contactPhone: text("contact_phone"),
    contactEmail: text("contact_email"),
    maximumAttendees: integer("maximum_attendees").notNull().default(1),
    source: text("source").notNull(),
    hostNotes: text("host_notes"),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    ...timestamps(),
  },
  (table) => [
    check(
      "guest_parties_maximum_attendees_check",
      sql`${table.maximumAttendees} >= 0`,
    ),
    // §19: "guest_parties(event_id, display_name)".
    index("guest_parties_event_display_name").on(
      table.eventId,
      table.displayName,
    ),
  ],
);

export const partyMembers = pgTable(
  "party_members",
  {
    id: uuidPk(),
    guestPartyId: uuid("guest_party_id")
      .notNull()
      .references(() => guestParties.id),
    displayName: text("display_name").notNull(),
    memberOrder: integer("member_order").notNull(),
    ...timestamps(),
  },
  (table) => [
    unique("party_members_guest_party_member_order_key").on(
      table.guestPartyId,
      table.memberOrder,
    ),
    check("party_members_member_order_check", sql`${table.memberOrder} >= 1`),
  ],
);

export const rsvpSubmissions = pgTable(
  "rsvp_submissions",
  {
    id: uuidPk(),
    guestPartyId: uuid("guest_party_id")
      .notNull()
      .references(() => guestParties.id),
    revisionNumber: integer("revision_number").notNull(),
    attendanceStatus: text("attendance_status").notNull(),
    attendeeCount: integer("attendee_count").notNull(),
    guestMessage: text("guest_message"),
    submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
    supersedesSubmissionId: uuid("supersedes_submission_id").references(
      (): AnyPgColumn => rsvpSubmissions.id,
    ),
    submissionSource: text("submission_source").notNull(),
    ipDigest: text("ip_digest"),
    userAgentClass: text("user_agent_class"),
  },
  (table) => [
    unique("rsvp_submissions_guest_party_revision_key").on(
      table.guestPartyId,
      table.revisionNumber,
    ),
    check(
      "rsvp_submissions_revision_number_check",
      sql`${table.revisionNumber} >= 1`,
    ),
    check(
      "rsvp_submissions_attendance_status_check",
      sql`${table.attendanceStatus} in ('ATTENDING', 'NOT_ATTENDING')`,
    ),
    // §15.3: "NOT_ATTENDING requires attendee_count = 0. ATTENDING requires
    // a positive count not exceeding the party maximum." The party-maximum
    // half of this rule spans a different table and cannot be a same-row
    // CHECK constraint; it is enforced by the domain transaction per §17.
    check(
      "rsvp_submissions_attendance_count_consistency_check",
      sql`(${table.attendanceStatus} = 'NOT_ATTENDING' and ${table.attendeeCount} = 0)
        or (${table.attendanceStatus} = 'ATTENDING' and ${table.attendeeCount} > 0)`,
    ),
    // §19: "rsvp_submissions(guest_party_id, revision_number desc)".
    index("rsvp_submissions_guest_party_revision_desc").on(
      table.guestPartyId,
      table.revisionNumber.desc(),
    ),
  ],
);

export const responseManagementTokens = pgTable(
  "response_management_tokens",
  {
    id: uuidPk(),
    guestPartyId: uuid("guest_party_id")
      .notNull()
      .references(() => guestParties.id),
    tokenHash: text("token_hash").notNull(),
    tokenVersion: integer("token_version").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    unique("response_management_tokens_token_hash_key").on(table.tokenHash),
    // §15.4: "only one active token is allowed per party through a partial
    // unique index." "Active" is defined as not-yet-revoked; expiry is
    // time-based and therefore checked at query/application time, not
    // through an index predicate (PostgreSQL index predicates must be
    // immutable and cannot reference now()).
    uniqueIndex("response_management_tokens_one_active_per_party")
      .on(table.guestPartyId)
      .where(sql`${table.revokedAt} is null`),
    check(
      "response_management_tokens_token_version_check",
      sql`${table.tokenVersion} >= 1`,
    ),
  ],
);

export const guestImports = pgTable(
  "guest_imports",
  {
    id: uuidPk(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id),
    uploadedByAccountId: uuid("uploaded_by_account_id")
      .notNull()
      .references(() => accounts.id),
    sourceFileDigest: text("source_file_digest").notNull(),
    status: text("status").notNull(),
    totalRowCount: integer("total_row_count").notNull().default(0),
    validRowCount: integer("valid_row_count").notNull().default(0),
    rejectedRowCount: integer("rejected_row_count").notNull().default(0),
    ...timestamps(),
  },
  (table) => [
    check(
      "guest_imports_total_row_count_check",
      sql`${table.totalRowCount} >= 0`,
    ),
    check(
      "guest_imports_valid_row_count_check",
      sql`${table.validRowCount} >= 0`,
    ),
    check(
      "guest_imports_rejected_row_count_check",
      sql`${table.rejectedRowCount} >= 0`,
    ),
  ],
);

export const guestImportRows = pgTable(
  "guest_import_rows",
  {
    id: uuidPk(),
    guestImportId: uuid("guest_import_id")
      .notNull()
      .references(() => guestImports.id),
    rowNumber: integer("row_number").notNull(),
    candidateData: jsonb("candidate_data").notNull(),
    validationStatus: text("validation_status").notNull(),
    validationErrors: jsonb("validation_errors"),
    guestPartyId: uuid("guest_party_id").references(() => guestParties.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    unique("guest_import_rows_import_row_number_key").on(
      table.guestImportId,
      table.rowNumber,
    ),
    check("guest_import_rows_row_number_check", sql`${table.rowNumber} >= 1`),
  ],
);
