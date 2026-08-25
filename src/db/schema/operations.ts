/**
 * Operational reliability tables (IMP-022): transactional outbox, job
 * execution history, and the append-only audit log — docs/06_DATABASE_DESIGN.md
 * §16.
 *
 * Deferred foreign keys: `auditEvents.actorAccountId` and
 * `auditEvents.eventId` are plain `uuid` columns without a database-level
 * foreign-key constraint. The design doc (§16.3) specifies them as
 * references to `accounts(id)` and `events(id)`, but those tables belong
 * to IMP-021, which remains BLOCKED on the unresolved authentication
 * decision (IMP-013). Adding the FK constraint is IMP-021's responsibility
 * once those tables exist (`ALTER TABLE audit_events ADD CONSTRAINT ...`)
 * — this is an additive, non-breaking follow-up, consistent with this
 * repository's expand-and-contract migration policy (§23). `target_id`
 * has no foreign key by design even in the approved schema (audit events
 * target polymorphic entities), so this deferral does not weaken a
 * pattern the design otherwise treats as strict.
 */

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAtOnly, uuidPk } from "./_helpers";

/** §16.1 — transactional outbox. The domain change and its outbox row are inserted in the same transaction. */
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
    deduplicationKey: text("deduplication_key").notNull().unique(),
  },
  (table) => [
    // §19 — partial index for the unprocessed-work query workers poll.
    index("outbox_events_unprocessed_idx")
      .on(table.availableAt)
      .where(sql`${table.processedAt} is null`),
  ],
);

/** §16.2 — execution history. Not the permanent queue provider contract; provider payloads are not authoritative. */
export const jobExecutions = pgTable("job_executions", {
  id: uuidPk(),
  outboxEventId: uuid("outbox_event_id").references(() => outboxEvents.id),
  jobType: text("job_type").notNull(),
  queueJobId: text("queue_job_id"),
  status: text("status").notNull(),
  attemptNumber: integer("attempt_number").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  errorClass: text("error_class"),
  ...createdAtOnly(),
});

/**
 * §16.3 — append-only record of security-sensitive and business-critical
 * actions. Database-enforced append-only via a trigger (see the
 * accompanying migration's raw SQL) rather than a separate runtime
 * database role: role separation is deployment-topology-dependent
 * (§21) and out of this task's scope, but "no UPDATE/DELETE" is exactly
 * the kind of small, stable invariant §17 reserves triggers for.
 */
export const auditEvents = pgTable(
  "audit_events",
  {
    id: uuidPk(),
    actorType: text("actor_type").notNull(),
    actorAccountId: uuid("actor_account_id"), // FK to accounts(id) deferred to IMP-021 — see file header.
    action: text("action").notNull(),
    targetType: text("target_type").notNull(),
    targetId: uuid("target_id"),
    eventId: uuid("event_id"), // FK to events(id) deferred to IMP-021 — see file header.
    reasonCode: text("reason_code"),
    reasonNote: text("reason_note"),
    beforeSnapshotRedacted: jsonb("before_snapshot_redacted"),
    afterSnapshotRedacted: jsonb("after_snapshot_redacted"),
    requestCorrelationId: text("request_correlation_id"),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    // §19 — audit lookup by target event and by actor, most recent first.
    index("audit_events_event_occurred_idx").on(
      table.eventId,
      table.occurredAt.desc(),
    ),
    index("audit_events_actor_occurred_idx").on(
      table.actorAccountId,
      table.occurredAt.desc(),
    ),
  ],
);
