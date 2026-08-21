/**
 * AI generation persistence tables (IMP-020).
 * Source: docs/06_DATABASE_DESIGN.md §13.
 *
 * IMP-020 creates generation *persistence* only — no generation behavior.
 *
 * `generation_requests.status` uses docs/04_DOMAIN_MODEL.md §12 "Canonical
 * states". `generation_requests.request_kind` is left unconstrained: §12
 * describes generation types with "may include ...", explicitly hedged
 * illustrative language rather than a closed enumerated list.
 * `generation_attempts.status`, `generation_results.result_type`, and both
 * tables' `moderation_status` columns have no enumerated value set in either
 * document and are left as unconstrained `text not null`.
 */

import { sql } from "drizzle-orm";
import {
  bigint,
  char,
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

/** docs/04_DOMAIN_MODEL.md §12 "Canonical states". */
export const GENERATION_REQUEST_STATUSES = [
  "CREATED",
  "VALIDATING",
  "QUEUED",
  "PROCESSING",
  "SUCCEEDED",
  "FAILED_RETRYABLE",
  "FAILED_FINAL",
  "CANCELLED",
  "REJECTED",
  "TIMED_OUT",
] as const;

export const generationRequests = pgTable(
  "generation_requests",
  {
    id: uuidPk(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id),
    requestKind: text("request_kind").notNull(),
    status: text("status").notNull(),
    idempotencyKey: text("idempotency_key").notNull(),
    briefSnapshot: jsonb("brief_snapshot").notNull(),
    eventFactsDigest: text("event_facts_digest").notNull(),
    promptTemplateVersion: text("prompt_template_version").notNull(),
    requestedByAccountId: uuid("requested_by_account_id")
      .notNull()
      .references(() => accounts.id),
    queuedAt: timestamp("queued_at", { withTimezone: true }),
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    finalFailureCode: text("final_failure_code"),
    ...timestamps(),
  },
  (table) => [
    unique("generation_requests_event_idempotency_key").on(
      table.eventId,
      table.idempotencyKey,
    ),
    check(
      "generation_requests_status_check",
      sql`${table.status} in (
        'CREATED', 'VALIDATING', 'QUEUED', 'PROCESSING', 'SUCCEEDED',
        'FAILED_RETRYABLE', 'FAILED_FINAL', 'CANCELLED', 'REJECTED', 'TIMED_OUT'
      )`,
    ),
    // §19: "generation_requests(event_id, created_at desc)".
    index("generation_requests_event_created_at").on(
      table.eventId,
      table.createdAt.desc(),
    ),
    // §19: "generation_requests(status, created_at) for recovery/operations".
    index("generation_requests_status_created_at").on(
      table.status,
      table.createdAt,
    ),
  ],
);

export const generationAttempts = pgTable(
  "generation_attempts",
  {
    id: uuidPk(),
    generationRequestId: uuid("generation_request_id")
      .notNull()
      .references(() => generationRequests.id),
    attemptNumber: integer("attempt_number").notNull(),
    providerCode: text("provider_code").notNull(),
    modelIdentifier: text("model_identifier").notNull(),
    providerRequestId: text("provider_request_id"),
    status: text("status").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    errorClass: text("error_class"),
    usageInputUnits: bigint("usage_input_units", { mode: "number" }),
    usageOutputUnits: bigint("usage_output_units", { mode: "number" }),
    estimatedCostMinor: bigint("estimated_cost_minor", { mode: "number" }),
    costCurrencyCode: char("cost_currency_code", { length: 3 }),
    responseMetadataRedacted: jsonb("response_metadata_redacted"),
  },
  (table) => [
    unique("generation_attempts_request_attempt_number_key").on(
      table.generationRequestId,
      table.attemptNumber,
    ),
    uniqueIndex("generation_attempts_provider_request_id_key")
      .on(table.providerCode, table.providerRequestId)
      .where(sql`${table.providerRequestId} is not null`),
    check(
      "generation_attempts_attempt_number_check",
      sql`${table.attemptNumber} >= 1`,
    ),
    check(
      "generation_attempts_usage_input_units_check",
      sql`${table.usageInputUnits} is null or ${table.usageInputUnits} >= 0`,
    ),
    check(
      "generation_attempts_usage_output_units_check",
      sql`${table.usageOutputUnits} is null or ${table.usageOutputUnits} >= 0`,
    ),
    check(
      "generation_attempts_estimated_cost_minor_check",
      sql`${table.estimatedCostMinor} is null or ${table.estimatedCostMinor} >= 0`,
    ),
  ],
);

export const generationResults = pgTable(
  "generation_results",
  {
    id: uuidPk(),
    generationRequestId: uuid("generation_request_id")
      .notNull()
      .references(() => generationRequests.id),
    resultNumber: integer("result_number").notNull(),
    resultType: text("result_type").notNull(),
    validatedContent: jsonb("validated_content").notNull(),
    validationSchemaVersion: integer("validation_schema_version").notNull(),
    moderationStatus: text("moderation_status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    unique("generation_results_request_number_type_key").on(
      table.generationRequestId,
      table.resultNumber,
      table.resultType,
    ),
    check(
      "generation_results_result_number_check",
      sql`${table.resultNumber} >= 1`,
    ),
  ],
);

export const generatedAssets = pgTable(
  "generated_assets",
  {
    id: uuidPk(),
    generationResultId: uuid("generation_result_id")
      .notNull()
      .references(() => generationResults.id),
    storageProviderCode: text("storage_provider_code").notNull(),
    storageObjectKey: text("storage_object_key").notNull(),
    mediaType: text("media_type").notNull(),
    byteSize: bigint("byte_size", { mode: "number" }).notNull(),
    width: integer("width"),
    height: integer("height"),
    contentDigest: text("content_digest").notNull(),
    moderationStatus: text("moderation_status").notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    ...timestamps(),
  },
  (table) => [
    unique("generated_assets_provider_object_key_key").on(
      table.storageProviderCode,
      table.storageObjectKey,
    ),
    check("generated_assets_byte_size_check", sql`${table.byteSize} >= 0`),
    check(
      "generated_assets_width_check",
      sql`${table.width} is null or ${table.width} >= 0`,
    ),
    check(
      "generated_assets_height_check",
      sql`${table.height} is null or ${table.height} >= 0`,
    ),
  ],
);
