/**
 * Event tables (IMP-020).
 * Source: docs/06_DATABASE_DESIGN.md §8.3 (planner_client_references, kept
 * here for import-cycle reasons — see identity.ts) and §9 (events,
 * event_facts, creative_briefs).
 *
 * `events.status` values are not enumerated in docs/06 §9.1; the exact
 * value set is docs/04_DOMAIN_MODEL.md §7's "High-level lifecycle" list,
 * applied here as the CHECK constraint per CLAUDE.md's routing to read the
 * domain model for domain rules.
 *
 * `events.selected_package_definition_id` and
 * `events.selected_price_book_entry_id` are declared without a foreign key:
 * docs/06 §9.1 lists both as plain `uuid null` with no "references"
 * annotation (unlike every enforced FK column elsewhere in the document,
 * which is explicitly annotated), so no FK is added here to avoid inventing
 * a constraint the approved design does not state.
 */

import { sql } from "drizzle-orm";
import {
  check,
  date,
  index,
  integer,
  pgTable,
  text,
  time,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { accounts } from "./identity";
import { timestamps, uuidPk } from "./_helpers";

/** docs/04_DOMAIN_MODEL.md §7 "High-level lifecycle". */
export const EVENT_STATUSES = [
  "DRAFT",
  "READY_FOR_GENERATION",
  "GENERATING",
  "GENERATION_FAILED",
  "PREVIEW_AVAILABLE",
  "AWAITING_PAYMENT",
  "PAID",
  "READY_TO_PUBLISH",
  "PUBLISHED",
  "EXPIRED",
  "ARCHIVED",
  "SUSPENDED",
  "REMOVED",
] as const;

export const events = pgTable(
  "events",
  {
    id: uuidPk(),
    ownerAccountId: uuid("owner_account_id")
      .notNull()
      .references(() => accounts.id),
    eventType: text("event_type").notNull().default("WEDDING"),
    status: text("status").notNull().default("DRAFT"),
    selectedPackageDefinitionId: uuid("selected_package_definition_id"),
    selectedPriceBookEntryId: uuid("selected_price_book_entry_id"),
    archivedAt: timestamp("archived_at", { withTimezone: true }),
    suspendedAt: timestamp("suspended_at", { withTimezone: true }),
    ...timestamps(),
  },
  (table) => [
    check(
      "events_status_check",
      sql`${table.status} in (
        'DRAFT', 'READY_FOR_GENERATION', 'GENERATING', 'GENERATION_FAILED',
        'PREVIEW_AVAILABLE', 'AWAITING_PAYMENT', 'PAID', 'READY_TO_PUBLISH',
        'PUBLISHED', 'EXPIRED', 'ARCHIVED', 'SUSPENDED', 'REMOVED'
      )`,
    ),
    // §19: "events(owner_account_id, updated_at desc) for the dashboard"
    // plus "partial active-event index excluding archived rows".
    index("events_owner_updated_at_active")
      .on(table.ownerAccountId, table.updatedAt.desc())
      .where(sql`${table.archivedAt} is null`),
  ],
);

export const eventFacts = pgTable(
  "event_facts",
  {
    eventId: uuid("event_id")
      .primaryKey()
      .references(() => events.id),
    hostNames: text("host_names").notNull(),
    eventDate: date("event_date").notNull(),
    startLocalTime: time("start_local_time"),
    endLocalTime: time("end_local_time"),
    timezone: text("timezone").notNull(),
    venueName: text("venue_name").notNull(),
    venueAddress: text("venue_address"),
    venueMapUrl: text("venue_map_url"),
    rsvpDeadline: date("rsvp_deadline"),
    contactName: text("contact_name"),
    contactPhone: text("contact_phone"),
    contactEmail: text("contact_email"),
    dressCode: text("dress_code"),
    additionalFactualDetails: text("additional_factual_details"),
    ...timestamps(),
  },
  () => [],
);

export const creativeBriefs = pgTable(
  "creative_briefs",
  {
    eventId: uuid("event_id")
      .primaryKey()
      .references(() => events.id),
    religiousCulturalContext: text("religious_cultural_context"),
    venueVibe: text("venue_vibe"),
    colourMood: text("colour_mood"),
    estimatedGuestCount: integer("estimated_guest_count"),
    specialElements: text("special_elements"),
    primaryLocale: text("primary_locale").notNull().default("en"),
    secondaryLocales: text("secondary_locales")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    additionalNotes: text("additional_notes"),
    briefSchemaVersion: integer("brief_schema_version").notNull(),
    ...timestamps(),
  },
  (table) => [
    check(
      "creative_briefs_estimated_guest_count_check",
      sql`${table.estimatedGuestCount} is null or ${table.estimatedGuestCount} >= 0`,
    ),
  ],
);

/** docs/06 §8.3. Kept here (not identity.ts) — see file header. */
export const plannerClientReferences = pgTable(
  "planner_client_references",
  {
    id: uuidPk(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id),
    clientReference: text("client_reference"),
    privateNotes: text("private_notes"),
    ...timestamps(),
  },
  (table) => [
    unique("planner_client_references_event_id_key").on(table.eventId),
  ],
);
