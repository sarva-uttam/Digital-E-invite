/**
 * Operational reliability tables (IMP-020): transactional outbox, job
 * execution history, and append-only audit events.
 * Source: docs/06_DATABASE_DESIGN.md §16.
 *
 * `job_executions.status`, `audit_events.actor_type`, and
 * `audit_events.target_type` have no enumerated value set in either
 * approved document and are left as unconstrained `text not null`.
 * `audit_events.target_id` has no "references" annotation in §16.3 (the
 * table is explicitly polymorphic — it can target any entity type), so no
 * foreign key is added.
 */

import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { accounts } from "./identity";
import { events } from "./events";
import { uuidPk } from "./_helpers";

export const outboxEvents = pgTable(
  "outbox_events",
  {
    id: uuidPk(),
    aggregateType: text("aggregate_type").notNull(),
    aggregateId: uuid("aggregate_id").notNull(),
    eventType: text("event_type").notNull(),
    payload: jsonb("payload").notNull(),
    payloadSchemaVersion: integer("payload_schema_version").notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
    availableAt: timestamp("available_at", { withTimezone: true }).notNull(),
    claimedAt: timestamp("claimed_at", { withTimezone: true }),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    attemptCount: integer("attempt_count").notNull().default(0),
    lastErrorSafe: text("last_error_safe"),
    deduplicationKey: text("deduplication_key").notNull(),
  },
  (table) => [
    unique("outbox_events_deduplication_key_key").on(table.deduplicationKey),
    check("outbox_events_attempt_count_check", sql`${table.attemptCount} >= 0`),
    // §19: "outbox_events(processed_at, available_at) with a partial index
    // for unprocessed rows".
    index("outbox_events_unprocessed")
      .on(table.processedAt, table.availableAt)
      .where(sql`${table.processedAt} is null`),
  ],
);

export const jobExecutions = pgTable(
  "job_executions",
  {
    id: uuidPk(),
    outboxEventId: uuid("outbox_event_id").references(() => outboxEvents.id),
    jobType: text("job_type").notNull(),
    queueJobId: text("queue_job_id"),
    status: text("status").notNull(),
    attemptNumber: integer("attempt_number").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    errorClass: text("error_class"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    check(
      "job_executions_attempt_number_check",
      sql`${table.attemptNumber} >= 1`,
    ),
  ],
);

export const auditEvents = pgTable(
  "audit_events",
  {
    id: uuidPk(),
    actorType: text("actor_type").notNull(),
    actorAccountId: uuid("actor_account_id").references(() => accounts.id),
    action: text("action").notNull(),
    targetType: text("target_type").notNull(),
    targetId: uuid("target_id"),
    eventId: uuid("event_id").references(() => events.id),
    reasonCode: text("reason_code"),
    reasonNote: text("reason_note"),
    beforeSnapshotRedacted: jsonb("before_snapshot_redacted"),
    afterSnapshotRedacted: jsonb("after_snapshot_redacted"),
    requestCorrelationId: text("request_correlation_id"),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    // §19: "audit_events(event_id, occurred_at desc)".
    index("audit_events_event_occurred_at").on(
      table.eventId,
      table.occurredAt.desc(),
    ),
    // §19: "audit_events(actor_account_id, occurred_at desc)".
    index("audit_events_actor_occurred_at").on(
      table.actorAccountId,
      table.occurredAt.desc(),
    ),
  ],
);
