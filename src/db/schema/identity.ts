/**
 * Identity and ownership tables (IMP-020).
 * Source: docs/06_DATABASE_DESIGN.md §8.1-8.2.
 *
 * `planner_client_references` (§8.3) is implemented in ./events.ts instead:
 * its only foreign key is `events(id)`, so keeping it there avoids a
 * circular module import between identity and events. This is a file-layout
 * choice only — table name, columns, and constraints match §8.3 exactly.
 */

import { sql } from "drizzle-orm";
import {
  char,
  check,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { timestamps, uuidPk } from "./_helpers";

/** docs/06 §8.1 "Allowed statuses". */
export const ACCOUNT_STATUSES = [
  "ACTIVE",
  "SUSPENDED",
  "DELETION_PENDING",
  "CLOSED",
] as const;

/** docs/06 §8.1 "Allowed roles for MVP". */
export const ACCOUNT_ROLES = ["USER", "SUPPORT", "ADMIN"] as const;

/** docs/06 §8.2 "Allowed organizer types". */
export const ORGANIZER_TYPES = [
  "INDIVIDUAL",
  "EVENT_PLANNER",
  "OTHER",
] as const;

export const accounts = pgTable(
  "accounts",
  {
    id: uuidPk(),
    authSubject: text("auth_subject").notNull(),
    emailNormalized: text("email_normalized").notNull(),
    status: text("status").notNull(),
    role: text("role").notNull().default("USER"),
    suspendedAt: timestamp("suspended_at", { withTimezone: true }),
    scheduledDeletionAt: timestamp("scheduled_deletion_at", {
      withTimezone: true,
    }),
    ...timestamps(),
  },
  (table) => [
    unique("accounts_auth_subject_key").on(table.authSubject),
    unique("accounts_email_normalized_key").on(table.emailNormalized),
    check(
      "accounts_status_check",
      sql`${table.status} in ('ACTIVE', 'SUSPENDED', 'DELETION_PENDING', 'CLOSED')`,
    ),
    check(
      "accounts_role_check",
      sql`${table.role} in ('USER', 'SUPPORT', 'ADMIN')`,
    ),
  ],
);

export const profiles = pgTable(
  "profiles",
  {
    accountId: uuid("account_id")
      .primaryKey()
      .references(() => accounts.id),
    displayName: text("display_name"),
    organizerType: text("organizer_type").notNull(),
    preferredLocale: text("preferred_locale").notNull().default("en"),
    countryCode: char("country_code", { length: 2 }),
    timezone: text("timezone"),
    ...timestamps(),
  },
  (table) => [
    check(
      "profiles_organizer_type_check",
      sql`${table.organizerType} in ('INDIVIDUAL', 'EVENT_PLANNER', 'OTHER')`,
    ),
  ],
);
