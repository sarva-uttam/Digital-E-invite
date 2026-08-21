/**
 * Payment tables (IMP-020).
 * Source: docs/06_DATABASE_DESIGN.md §11.
 *
 * `payment_attempts.status` is not enumerated in docs/06 §11.1; the value
 * set is docs/04_DOMAIN_MODEL.md §19 "Canonical states" for Payment
 * Attempt. `payment_transactions.transaction_type` uses the exact list
 * given in docs/06 §11.3 prose ("Transaction types include...").
 * `payment_events.processing_status` has no enumerated value set in either
 * document and is left as unconstrained `text not null`.
 *
 * `payment_transactions` has only `created_at` (no `updated_at`), matching
 * §11.3's literal column list and the append-only/immutable invariant in
 * §17 item 13 ("immutable ... financial transaction ... rows").
 */

import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  char,
  check,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { purchases } from "./catalogue";
import { timestamps, uuidPk } from "./_helpers";

/** docs/04_DOMAIN_MODEL.md §19 "Canonical states" for Payment Attempt. */
export const PAYMENT_ATTEMPT_STATUSES = [
  "CREATED",
  "PENDING",
  "SUCCEEDED",
  "FAILED",
  "CANCELLED",
  "EXPIRED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
  "DISPUTED",
  "CHARGEBACK",
] as const;

/** docs/06 §11.3 "Transaction types include...". */
export const PAYMENT_TRANSACTION_TYPES = [
  "CAPTURE",
  "REFUND",
  "PARTIAL_REFUND",
  "CHARGEBACK",
  "REVERSAL",
] as const;

export const paymentAttempts = pgTable(
  "payment_attempts",
  {
    id: uuidPk(),
    purchaseId: uuid("purchase_id")
      .notNull()
      .references(() => purchases.id),
    providerCode: text("provider_code").notNull(),
    providerAttemptId: text("provider_attempt_id"),
    idempotencyKey: text("idempotency_key").notNull(),
    status: text("status").notNull(),
    currencyCode: char("currency_code", { length: 3 }).notNull(),
    expectedAmountMinor: bigint("expected_amount_minor", {
      mode: "number",
    }).notNull(),
    failureCode: text("failure_code"),
    failureMessageSafe: text("failure_message_safe"),
    ...timestamps(),
  },
  (table) => [
    uniqueIndex("payment_attempts_provider_attempt_id_key")
      .on(table.providerCode, table.providerAttemptId)
      .where(sql`${table.providerAttemptId} is not null`),
    unique("payment_attempts_provider_idempotency_key_key").on(
      table.providerCode,
      table.idempotencyKey,
    ),
    check(
      "payment_attempts_status_check",
      sql`${table.status} in (
        'CREATED', 'PENDING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED',
        'REFUNDED', 'PARTIALLY_REFUNDED', 'DISPUTED', 'CHARGEBACK'
      )`,
    ),
    check(
      "payment_attempts_expected_amount_minor_check",
      sql`${table.expectedAmountMinor} >= 0`,
    ),
  ],
);

export const paymentEvents = pgTable(
  "payment_events",
  {
    id: uuidPk(),
    providerCode: text("provider_code").notNull(),
    providerEventId: text("provider_event_id").notNull(),
    eventType: text("event_type").notNull(),
    signatureVerified: boolean("signature_verified").notNull(),
    receivedAt: timestamp("received_at", { withTimezone: true }).notNull(),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    processingStatus: text("processing_status").notNull(),
    payloadRedacted: jsonb("payload_redacted"),
    payloadDigest: text("payload_digest").notNull(),
    failureReason: text("failure_reason"),
  },
  (table) => [
    unique("payment_events_provider_event_key").on(
      table.providerCode,
      table.providerEventId,
    ),
    // §19: "payment_events(processing_status, received_at)".
    index("payment_events_processing_status_received_at").on(
      table.processingStatus,
      table.receivedAt,
    ),
  ],
);

export const paymentTransactions = pgTable(
  "payment_transactions",
  {
    id: uuidPk(),
    purchaseId: uuid("purchase_id")
      .notNull()
      .references(() => purchases.id),
    paymentAttemptId: uuid("payment_attempt_id").references(
      () => paymentAttempts.id,
    ),
    providerCode: text("provider_code").notNull(),
    providerTransactionId: text("provider_transaction_id").notNull(),
    transactionType: text("transaction_type").notNull(),
    currencyCode: char("currency_code", { length: 3 }).notNull(),
    amountMinor: bigint("amount_minor", { mode: "number" }).notNull(),
    verifiedAt: timestamp("verified_at", { withTimezone: true }).notNull(),
    providerOccurredAt: timestamp("provider_occurred_at", {
      withTimezone: true,
    }),
    metadataRedacted: jsonb("metadata_redacted"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    unique("payment_transactions_provider_transaction_type_key").on(
      table.providerCode,
      table.providerTransactionId,
      table.transactionType,
    ),
    check(
      "payment_transactions_type_check",
      sql`${table.transactionType} in (
        'CAPTURE', 'REFUND', 'PARTIAL_REFUND', 'CHARGEBACK', 'REVERSAL'
      )`,
    ),
    check(
      "payment_transactions_amount_minor_check",
      sql`${table.amountMinor} >= 0`,
    ),
  ],
);
