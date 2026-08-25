CREATE TABLE "audit_events" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"actor_type" text NOT NULL,
	"actor_account_id" uuid,
	"action" text NOT NULL,
	"target_type" text NOT NULL,
	"target_id" uuid,
	"event_id" uuid,
	"reason_code" text,
	"reason_note" text,
	"before_snapshot_redacted" jsonb,
	"after_snapshot_redacted" jsonb,
	"request_correlation_id" text,
	"occurred_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_executions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"outbox_event_id" uuid,
	"job_type" text NOT NULL,
	"queue_job_id" text,
	"status" text NOT NULL,
	"attempt_number" integer NOT NULL,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"error_class" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outbox_events" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"aggregate_type" text NOT NULL,
	"aggregate_id" uuid NOT NULL,
	"event_type" text NOT NULL,
	"payload" jsonb NOT NULL,
	"payload_schema_version" integer NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"available_at" timestamp with time zone NOT NULL,
	"claimed_at" timestamp with time zone,
	"processed_at" timestamp with time zone,
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"last_error_safe" text,
	"deduplication_key" text NOT NULL,
	CONSTRAINT "outbox_events_deduplication_key_unique" UNIQUE("deduplication_key")
);
--> statement-breakpoint
ALTER TABLE "job_executions" ADD CONSTRAINT "job_executions_outbox_event_id_outbox_events_id_fk" FOREIGN KEY ("outbox_event_id") REFERENCES "public"."outbox_events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_events_event_occurred_idx" ON "audit_events" USING btree ("event_id","occurred_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "audit_events_actor_occurred_idx" ON "audit_events" USING btree ("actor_account_id","occurred_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "outbox_events_unprocessed_idx" ON "outbox_events" USING btree ("available_at") WHERE "outbox_events"."processed_at" is null;