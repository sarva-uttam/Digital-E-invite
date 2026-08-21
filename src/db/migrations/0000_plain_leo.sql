CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"auth_subject" text NOT NULL,
	"email_normalized" text NOT NULL,
	"status" text NOT NULL,
	"role" text DEFAULT 'USER' NOT NULL,
	"suspended_at" timestamp with time zone,
	"scheduled_deletion_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_auth_subject_key" UNIQUE("auth_subject"),
	CONSTRAINT "accounts_email_normalized_key" UNIQUE("email_normalized"),
	CONSTRAINT "accounts_status_check" CHECK ("accounts"."status" in ('ACTIVE', 'SUSPENDED', 'DELETION_PENDING', 'CLOSED')),
	CONSTRAINT "accounts_role_check" CHECK ("accounts"."role" in ('USER', 'SUPPORT', 'ADMIN'))
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"account_id" uuid PRIMARY KEY NOT NULL,
	"display_name" text,
	"organizer_type" text NOT NULL,
	"preferred_locale" text DEFAULT 'en' NOT NULL,
	"country_code" char(2),
	"timezone" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_organizer_type_check" CHECK ("profiles"."organizer_type" in ('INDIVIDUAL', 'EVENT_PLANNER', 'OTHER'))
);
--> statement-breakpoint
CREATE TABLE "creative_briefs" (
	"event_id" uuid PRIMARY KEY NOT NULL,
	"religious_cultural_context" text,
	"venue_vibe" text,
	"colour_mood" text,
	"estimated_guest_count" integer,
	"special_elements" text,
	"primary_locale" text DEFAULT 'en' NOT NULL,
	"secondary_locales" text[] DEFAULT '{}'::text[] NOT NULL,
	"additional_notes" text,
	"brief_schema_version" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "creative_briefs_estimated_guest_count_check" CHECK ("creative_briefs"."estimated_guest_count" is null or "creative_briefs"."estimated_guest_count" >= 0)
);
--> statement-breakpoint
CREATE TABLE "event_facts" (
	"event_id" uuid PRIMARY KEY NOT NULL,
	"host_names" text NOT NULL,
	"event_date" date NOT NULL,
	"start_local_time" time,
	"end_local_time" time,
	"timezone" text NOT NULL,
	"venue_name" text NOT NULL,
	"venue_address" text,
	"venue_map_url" text,
	"rsvp_deadline" date,
	"contact_name" text,
	"contact_phone" text,
	"contact_email" text,
	"dress_code" text,
	"additional_factual_details" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"owner_account_id" uuid NOT NULL,
	"event_type" text DEFAULT 'WEDDING' NOT NULL,
	"status" text DEFAULT 'DRAFT' NOT NULL,
	"selected_package_definition_id" uuid,
	"selected_price_book_entry_id" uuid,
	"archived_at" timestamp with time zone,
	"suspended_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "events_status_check" CHECK ("events"."status" in (
        'DRAFT', 'READY_FOR_GENERATION', 'GENERATING', 'GENERATION_FAILED',
        'PREVIEW_AVAILABLE', 'AWAITING_PAYMENT', 'PAID', 'READY_TO_PUBLISH',
        'PUBLISHED', 'EXPIRED', 'ARCHIVED', 'SUSPENDED', 'REMOVED'
      ))
);
--> statement-breakpoint
CREATE TABLE "planner_client_references" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"event_id" uuid NOT NULL,
	"client_reference" text,
	"private_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "planner_client_references_event_id_key" UNIQUE("event_id")
);
--> statement-breakpoint
CREATE TABLE "entitlement_definitions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"package_definition_id" uuid NOT NULL,
	"entitlement_code" text NOT NULL,
	"quantity" integer,
	"unit" text NOT NULL,
	"policy_value" jsonb,
	CONSTRAINT "entitlement_definitions_package_entitlement_key" UNIQUE("package_definition_id","entitlement_code"),
	CONSTRAINT "entitlement_definitions_quantity_check" CHECK ("entitlement_definitions"."quantity" is null or "entitlement_definitions"."quantity" >= 0)
);
--> statement-breakpoint
CREATE TABLE "package_definitions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"package_code" text NOT NULL,
	"version" integer NOT NULL,
	"status" text NOT NULL,
	"effective_from" timestamp with time zone NOT NULL,
	"effective_until" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "package_definitions_package_code_version_key" UNIQUE("package_code","version"),
	CONSTRAINT "package_definitions_effective_interval_check" CHECK ("package_definitions"."effective_until" is null or "package_definitions"."effective_until" > "package_definitions"."effective_from")
);
--> statement-breakpoint
CREATE TABLE "price_book_entries" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"package_definition_id" uuid NOT NULL,
	"market_code" text NOT NULL,
	"currency_code" char(3) NOT NULL,
	"amount_minor" bigint NOT NULL,
	"tax_policy_code" text,
	"effective_from" timestamp with time zone NOT NULL,
	"effective_until" timestamp with time zone,
	"status" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "price_book_entries_status_check" CHECK ("price_book_entries"."status" in ('DRAFT', 'ACTIVE', 'SUPERSEDED', 'RETIRED')),
	CONSTRAINT "price_book_entries_amount_minor_check" CHECK ("price_book_entries"."amount_minor" >= 0),
	CONSTRAINT "price_book_entries_effective_interval_check" CHECK ("price_book_entries"."effective_until" is null or "price_book_entries"."effective_until" > "price_book_entries"."effective_from")
);
--> statement-breakpoint
CREATE TABLE "purchase_entitlement_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"purchase_id" uuid NOT NULL,
	"entitlement_code" text NOT NULL,
	"quantity" integer,
	"unit" text NOT NULL,
	"policy_value" jsonb,
	CONSTRAINT "purchase_entitlement_snapshots_purchase_entitlement_key" UNIQUE("purchase_id","entitlement_code"),
	CONSTRAINT "purchase_entitlement_snapshots_quantity_check" CHECK ("purchase_entitlement_snapshots"."quantity" is null or "purchase_entitlement_snapshots"."quantity" >= 0)
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"event_id" uuid NOT NULL,
	"account_id" uuid NOT NULL,
	"package_definition_id" uuid NOT NULL,
	"price_book_entry_id" uuid NOT NULL,
	"package_code_snapshot" text NOT NULL,
	"package_version_snapshot" integer NOT NULL,
	"currency_code" char(3) NOT NULL,
	"subtotal_minor" bigint NOT NULL,
	"tax_minor" bigint DEFAULT 0 NOT NULL,
	"total_minor" bigint NOT NULL,
	"status" text NOT NULL,
	"checkout_expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "purchases_status_check" CHECK ("purchases"."status" in (
        'CREATED', 'PAYMENT_PENDING', 'PAID', 'CANCELLED', 'EXPIRED',
        'REFUNDED', 'PARTIALLY_REFUNDED', 'DISPUTED'
      )),
	CONSTRAINT "purchases_subtotal_minor_check" CHECK ("purchases"."subtotal_minor" >= 0),
	CONSTRAINT "purchases_tax_minor_check" CHECK ("purchases"."tax_minor" >= 0),
	CONSTRAINT "purchases_total_minor_check" CHECK ("purchases"."total_minor" >= 0)
);
--> statement-breakpoint
CREATE TABLE "payment_attempts" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"purchase_id" uuid NOT NULL,
	"provider_code" text NOT NULL,
	"provider_attempt_id" text,
	"idempotency_key" text NOT NULL,
	"status" text NOT NULL,
	"currency_code" char(3) NOT NULL,
	"expected_amount_minor" bigint NOT NULL,
	"failure_code" text,
	"failure_message_safe" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "payment_attempts_provider_idempotency_key_key" UNIQUE("provider_code","idempotency_key"),
	CONSTRAINT "payment_attempts_status_check" CHECK ("payment_attempts"."status" in (
        'CREATED', 'PENDING', 'SUCCEEDED', 'FAILED', 'CANCELLED', 'EXPIRED',
        'REFUNDED', 'PARTIALLY_REFUNDED', 'DISPUTED', 'CHARGEBACK'
      )),
	CONSTRAINT "payment_attempts_expected_amount_minor_check" CHECK ("payment_attempts"."expected_amount_minor" >= 0)
);
--> statement-breakpoint
CREATE TABLE "payment_events" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"provider_code" text NOT NULL,
	"provider_event_id" text NOT NULL,
	"event_type" text NOT NULL,
	"signature_verified" boolean NOT NULL,
	"received_at" timestamp with time zone NOT NULL,
	"processed_at" timestamp with time zone,
	"processing_status" text NOT NULL,
	"payload_redacted" jsonb,
	"payload_digest" text NOT NULL,
	"failure_reason" text,
	CONSTRAINT "payment_events_provider_event_key" UNIQUE("provider_code","provider_event_id")
);
--> statement-breakpoint
CREATE TABLE "payment_transactions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"purchase_id" uuid NOT NULL,
	"payment_attempt_id" uuid,
	"provider_code" text NOT NULL,
	"provider_transaction_id" text NOT NULL,
	"transaction_type" text NOT NULL,
	"currency_code" char(3) NOT NULL,
	"amount_minor" bigint NOT NULL,
	"verified_at" timestamp with time zone NOT NULL,
	"provider_occurred_at" timestamp with time zone,
	"metadata_redacted" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "payment_transactions_provider_transaction_type_key" UNIQUE("provider_code","provider_transaction_id","transaction_type"),
	CONSTRAINT "payment_transactions_type_check" CHECK ("payment_transactions"."transaction_type" in (
        'CAPTURE', 'REFUND', 'PARTIAL_REFUND', 'CHARGEBACK', 'REVERSAL'
      )),
	CONSTRAINT "payment_transactions_amount_minor_check" CHECK ("payment_transactions"."amount_minor" >= 0)
);
--> statement-breakpoint
CREATE TABLE "entitlement_balances" (
	"event_id" uuid NOT NULL,
	"entitlement_code" text NOT NULL,
	"granted" integer NOT NULL,
	"reserved" integer NOT NULL,
	"consumed" integer NOT NULL,
	"adjusted" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "entitlement_balances_event_id_entitlement_code_pk" PRIMARY KEY("event_id","entitlement_code"),
	CONSTRAINT "entitlement_balances_granted_check" CHECK ("entitlement_balances"."granted" >= 0),
	CONSTRAINT "entitlement_balances_reserved_check" CHECK ("entitlement_balances"."reserved" >= 0),
	CONSTRAINT "entitlement_balances_consumed_check" CHECK ("entitlement_balances"."consumed" >= 0)
);
--> statement-breakpoint
CREATE TABLE "entitlement_ledger_entries" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"event_id" uuid NOT NULL,
	"purchase_id" uuid,
	"entitlement_code" text NOT NULL,
	"entry_type" text NOT NULL,
	"quantity_delta" integer NOT NULL,
	"generation_request_id" uuid,
	"idempotency_key" text NOT NULL,
	"reason_code" text NOT NULL,
	"reason_note" text,
	"created_by_account_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "entitlement_ledger_entries_idempotency_key" UNIQUE("event_id","entitlement_code","idempotency_key"),
	CONSTRAINT "entitlement_ledger_entries_entry_type_check" CHECK ("entitlement_ledger_entries"."entry_type" in (
        'GRANT', 'RESERVE', 'CONSUME', 'RELEASE', 'ADJUST', 'REVOKE', 'EXPIRE'
      ))
);
--> statement-breakpoint
CREATE TABLE "generated_assets" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"generation_result_id" uuid NOT NULL,
	"storage_provider_code" text NOT NULL,
	"storage_object_key" text NOT NULL,
	"media_type" text NOT NULL,
	"byte_size" bigint NOT NULL,
	"width" integer,
	"height" integer,
	"content_digest" text NOT NULL,
	"moderation_status" text NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "generated_assets_provider_object_key_key" UNIQUE("storage_provider_code","storage_object_key"),
	CONSTRAINT "generated_assets_byte_size_check" CHECK ("generated_assets"."byte_size" >= 0),
	CONSTRAINT "generated_assets_width_check" CHECK ("generated_assets"."width" is null or "generated_assets"."width" >= 0),
	CONSTRAINT "generated_assets_height_check" CHECK ("generated_assets"."height" is null or "generated_assets"."height" >= 0)
);
--> statement-breakpoint
CREATE TABLE "generation_attempts" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"generation_request_id" uuid NOT NULL,
	"attempt_number" integer NOT NULL,
	"provider_code" text NOT NULL,
	"model_identifier" text NOT NULL,
	"provider_request_id" text,
	"status" text NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone,
	"error_class" text,
	"usage_input_units" bigint,
	"usage_output_units" bigint,
	"estimated_cost_minor" bigint,
	"cost_currency_code" char(3),
	"response_metadata_redacted" jsonb,
	CONSTRAINT "generation_attempts_request_attempt_number_key" UNIQUE("generation_request_id","attempt_number"),
	CONSTRAINT "generation_attempts_attempt_number_check" CHECK ("generation_attempts"."attempt_number" >= 1),
	CONSTRAINT "generation_attempts_usage_input_units_check" CHECK ("generation_attempts"."usage_input_units" is null or "generation_attempts"."usage_input_units" >= 0),
	CONSTRAINT "generation_attempts_usage_output_units_check" CHECK ("generation_attempts"."usage_output_units" is null or "generation_attempts"."usage_output_units" >= 0),
	CONSTRAINT "generation_attempts_estimated_cost_minor_check" CHECK ("generation_attempts"."estimated_cost_minor" is null or "generation_attempts"."estimated_cost_minor" >= 0)
);
--> statement-breakpoint
CREATE TABLE "generation_requests" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"event_id" uuid NOT NULL,
	"request_kind" text NOT NULL,
	"status" text NOT NULL,
	"idempotency_key" text NOT NULL,
	"brief_snapshot" jsonb NOT NULL,
	"event_facts_digest" text NOT NULL,
	"prompt_template_version" text NOT NULL,
	"requested_by_account_id" uuid NOT NULL,
	"queued_at" timestamp with time zone,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"final_failure_code" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "generation_requests_event_idempotency_key" UNIQUE("event_id","idempotency_key"),
	CONSTRAINT "generation_requests_status_check" CHECK ("generation_requests"."status" in (
        'CREATED', 'VALIDATING', 'QUEUED', 'PROCESSING', 'SUCCEEDED',
        'FAILED_RETRYABLE', 'FAILED_FINAL', 'CANCELLED', 'REJECTED', 'TIMED_OUT'
      ))
);
--> statement-breakpoint
CREATE TABLE "generation_results" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"generation_request_id" uuid NOT NULL,
	"result_number" integer NOT NULL,
	"result_type" text NOT NULL,
	"validated_content" jsonb NOT NULL,
	"validation_schema_version" integer NOT NULL,
	"moderation_status" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "generation_results_request_number_type_key" UNIQUE("generation_request_id","result_number","result_type"),
	CONSTRAINT "generation_results_result_number_check" CHECK ("generation_results"."result_number" >= 1)
);
--> statement-breakpoint
CREATE TABLE "invitation_versions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"invitation_id" uuid NOT NULL,
	"version_number" integer NOT NULL,
	"design_config" jsonb NOT NULL,
	"copy_config" jsonb NOT NULL,
	"source_generation_result_id" uuid,
	"validation_status" text NOT NULL,
	"validation_errors" jsonb,
	"created_by_account_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "invitation_versions_invitation_version_number_key" UNIQUE("invitation_id","version_number"),
	CONSTRAINT "invitation_versions_invitation_id_id_key" UNIQUE("invitation_id","id"),
	CONSTRAINT "invitation_versions_version_number_check" CHECK ("invitation_versions"."version_number" >= 1)
);
--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"event_id" uuid NOT NULL,
	"public_slug" text NOT NULL,
	"current_version_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "invitations_event_id_key" UNIQUE("event_id"),
	CONSTRAINT "invitations_public_slug_key" UNIQUE("public_slug")
);
--> statement-breakpoint
CREATE TABLE "publications" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"event_id" uuid NOT NULL,
	"invitation_version_id" uuid NOT NULL,
	"status" text NOT NULL,
	"published_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"ended_at" timestamp with time zone,
	"ended_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "publications_status_check" CHECK ("publications"."status" in (
        'UNPUBLISHED', 'ACTIVE', 'EXPIRED', 'UNPUBLISHED_BY_OWNER',
        'SUSPENDED', 'REMOVED'
      ))
);
--> statement-breakpoint
CREATE TABLE "guest_import_rows" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"guest_import_id" uuid NOT NULL,
	"row_number" integer NOT NULL,
	"candidate_data" jsonb NOT NULL,
	"validation_status" text NOT NULL,
	"validation_errors" jsonb,
	"guest_party_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guest_import_rows_import_row_number_key" UNIQUE("guest_import_id","row_number"),
	CONSTRAINT "guest_import_rows_row_number_check" CHECK ("guest_import_rows"."row_number" >= 1)
);
--> statement-breakpoint
CREATE TABLE "guest_imports" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"event_id" uuid NOT NULL,
	"uploaded_by_account_id" uuid NOT NULL,
	"source_file_digest" text NOT NULL,
	"status" text NOT NULL,
	"total_row_count" integer DEFAULT 0 NOT NULL,
	"valid_row_count" integer DEFAULT 0 NOT NULL,
	"rejected_row_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guest_imports_total_row_count_check" CHECK ("guest_imports"."total_row_count" >= 0),
	CONSTRAINT "guest_imports_valid_row_count_check" CHECK ("guest_imports"."valid_row_count" >= 0),
	CONSTRAINT "guest_imports_rejected_row_count_check" CHECK ("guest_imports"."rejected_row_count" >= 0)
);
--> statement-breakpoint
CREATE TABLE "guest_parties" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"event_id" uuid NOT NULL,
	"display_name" text NOT NULL,
	"contact_phone" text,
	"contact_email" text,
	"maximum_attendees" integer DEFAULT 1 NOT NULL,
	"source" text NOT NULL,
	"host_notes" text,
	"archived_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guest_parties_maximum_attendees_check" CHECK ("guest_parties"."maximum_attendees" >= 0)
);
--> statement-breakpoint
CREATE TABLE "party_members" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"guest_party_id" uuid NOT NULL,
	"display_name" text NOT NULL,
	"member_order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "party_members_guest_party_member_order_key" UNIQUE("guest_party_id","member_order"),
	CONSTRAINT "party_members_member_order_check" CHECK ("party_members"."member_order" >= 1)
);
--> statement-breakpoint
CREATE TABLE "response_management_tokens" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"guest_party_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"token_version" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"revoked_at" timestamp with time zone,
	"last_used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "response_management_tokens_token_hash_key" UNIQUE("token_hash"),
	CONSTRAINT "response_management_tokens_token_version_check" CHECK ("response_management_tokens"."token_version" >= 1)
);
--> statement-breakpoint
CREATE TABLE "rsvp_submissions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"guest_party_id" uuid NOT NULL,
	"revision_number" integer NOT NULL,
	"attendance_status" text NOT NULL,
	"attendee_count" integer NOT NULL,
	"guest_message" text,
	"submitted_at" timestamp with time zone NOT NULL,
	"supersedes_submission_id" uuid,
	"submission_source" text NOT NULL,
	"ip_digest" text,
	"user_agent_class" text,
	CONSTRAINT "rsvp_submissions_guest_party_revision_key" UNIQUE("guest_party_id","revision_number"),
	CONSTRAINT "rsvp_submissions_revision_number_check" CHECK ("rsvp_submissions"."revision_number" >= 1),
	CONSTRAINT "rsvp_submissions_attendance_status_check" CHECK ("rsvp_submissions"."attendance_status" in ('ATTENDING', 'NOT_ATTENDING')),
	CONSTRAINT "rsvp_submissions_attendance_count_consistency_check" CHECK (("rsvp_submissions"."attendance_status" = 'NOT_ATTENDING' and "rsvp_submissions"."attendee_count" = 0)
        or ("rsvp_submissions"."attendance_status" = 'ATTENDING' and "rsvp_submissions"."attendee_count" > 0))
);
--> statement-breakpoint
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
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "job_executions_attempt_number_check" CHECK ("job_executions"."attempt_number" >= 1)
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
	CONSTRAINT "outbox_events_deduplication_key_key" UNIQUE("deduplication_key"),
	CONSTRAINT "outbox_events_attempt_count_check" CHECK ("outbox_events"."attempt_count" >= 0)
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creative_briefs" ADD CONSTRAINT "creative_briefs_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_facts" ADD CONSTRAINT "event_facts_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_owner_account_id_accounts_id_fk" FOREIGN KEY ("owner_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "planner_client_references" ADD CONSTRAINT "planner_client_references_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entitlement_definitions" ADD CONSTRAINT "entitlement_definitions_package_definition_id_package_definitions_id_fk" FOREIGN KEY ("package_definition_id") REFERENCES "public"."package_definitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_book_entries" ADD CONSTRAINT "price_book_entries_package_definition_id_package_definitions_id_fk" FOREIGN KEY ("package_definition_id") REFERENCES "public"."package_definitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_entitlement_snapshots" ADD CONSTRAINT "purchase_entitlement_snapshots_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_package_definition_id_package_definitions_id_fk" FOREIGN KEY ("package_definition_id") REFERENCES "public"."package_definitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_price_book_entry_id_price_book_entries_id_fk" FOREIGN KEY ("price_book_entry_id") REFERENCES "public"."price_book_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_attempts" ADD CONSTRAINT "payment_attempts_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_payment_attempt_id_payment_attempts_id_fk" FOREIGN KEY ("payment_attempt_id") REFERENCES "public"."payment_attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entitlement_ledger_entries" ADD CONSTRAINT "entitlement_ledger_entries_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entitlement_ledger_entries" ADD CONSTRAINT "entitlement_ledger_entries_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "entitlement_ledger_entries" ADD CONSTRAINT "entitlement_ledger_entries_created_by_account_id_accounts_id_fk" FOREIGN KEY ("created_by_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generated_assets" ADD CONSTRAINT "generated_assets_generation_result_id_generation_results_id_fk" FOREIGN KEY ("generation_result_id") REFERENCES "public"."generation_results"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_attempts" ADD CONSTRAINT "generation_attempts_generation_request_id_generation_requests_id_fk" FOREIGN KEY ("generation_request_id") REFERENCES "public"."generation_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_requests" ADD CONSTRAINT "generation_requests_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_requests" ADD CONSTRAINT "generation_requests_requested_by_account_id_accounts_id_fk" FOREIGN KEY ("requested_by_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_results" ADD CONSTRAINT "generation_results_generation_request_id_generation_requests_id_fk" FOREIGN KEY ("generation_request_id") REFERENCES "public"."generation_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation_versions" ADD CONSTRAINT "invitation_versions_invitation_id_invitations_id_fk" FOREIGN KEY ("invitation_id") REFERENCES "public"."invitations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation_versions" ADD CONSTRAINT "invitation_versions_source_generation_result_id_generation_results_id_fk" FOREIGN KEY ("source_generation_result_id") REFERENCES "public"."generation_results"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation_versions" ADD CONSTRAINT "invitation_versions_created_by_account_id_accounts_id_fk" FOREIGN KEY ("created_by_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_current_version_id_invitation_versions_id_fk" FOREIGN KEY ("current_version_id") REFERENCES "public"."invitation_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publications" ADD CONSTRAINT "publications_invitation_version_id_invitation_versions_id_fk" FOREIGN KEY ("invitation_version_id") REFERENCES "public"."invitation_versions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest_import_rows" ADD CONSTRAINT "guest_import_rows_guest_import_id_guest_imports_id_fk" FOREIGN KEY ("guest_import_id") REFERENCES "public"."guest_imports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest_import_rows" ADD CONSTRAINT "guest_import_rows_guest_party_id_guest_parties_id_fk" FOREIGN KEY ("guest_party_id") REFERENCES "public"."guest_parties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest_imports" ADD CONSTRAINT "guest_imports_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest_imports" ADD CONSTRAINT "guest_imports_uploaded_by_account_id_accounts_id_fk" FOREIGN KEY ("uploaded_by_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "guest_parties" ADD CONSTRAINT "guest_parties_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "party_members" ADD CONSTRAINT "party_members_guest_party_id_guest_parties_id_fk" FOREIGN KEY ("guest_party_id") REFERENCES "public"."guest_parties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "response_management_tokens" ADD CONSTRAINT "response_management_tokens_guest_party_id_guest_parties_id_fk" FOREIGN KEY ("guest_party_id") REFERENCES "public"."guest_parties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rsvp_submissions" ADD CONSTRAINT "rsvp_submissions_guest_party_id_guest_parties_id_fk" FOREIGN KEY ("guest_party_id") REFERENCES "public"."guest_parties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rsvp_submissions" ADD CONSTRAINT "rsvp_submissions_supersedes_submission_id_rsvp_submissions_id_fk" FOREIGN KEY ("supersedes_submission_id") REFERENCES "public"."rsvp_submissions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_actor_account_id_accounts_id_fk" FOREIGN KEY ("actor_account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_executions" ADD CONSTRAINT "job_executions_outbox_event_id_outbox_events_id_fk" FOREIGN KEY ("outbox_event_id") REFERENCES "public"."outbox_events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "events_owner_updated_at_active" ON "events" USING btree ("owner_account_id","updated_at" DESC NULLS LAST) WHERE "events"."archived_at" is null;--> statement-breakpoint
CREATE INDEX "purchases_account_created_at" ON "purchases" USING btree ("account_id","created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE UNIQUE INDEX "payment_attempts_provider_attempt_id_key" ON "payment_attempts" USING btree ("provider_code","provider_attempt_id") WHERE "payment_attempts"."provider_attempt_id" is not null;--> statement-breakpoint
CREATE INDEX "payment_events_processing_status_received_at" ON "payment_events" USING btree ("processing_status","received_at");--> statement-breakpoint
CREATE INDEX "entitlement_ledger_entries_event_code_created_at" ON "entitlement_ledger_entries" USING btree ("event_id","entitlement_code","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "generation_attempts_provider_request_id_key" ON "generation_attempts" USING btree ("provider_code","provider_request_id") WHERE "generation_attempts"."provider_request_id" is not null;--> statement-breakpoint
CREATE INDEX "generation_requests_event_created_at" ON "generation_requests" USING btree ("event_id","created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "generation_requests_status_created_at" ON "generation_requests" USING btree ("status","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "publications_one_active_per_event" ON "publications" USING btree ("event_id") WHERE "publications"."status" = 'ACTIVE';--> statement-breakpoint
CREATE INDEX "guest_parties_event_display_name" ON "guest_parties" USING btree ("event_id","display_name");--> statement-breakpoint
CREATE UNIQUE INDEX "response_management_tokens_one_active_per_party" ON "response_management_tokens" USING btree ("guest_party_id") WHERE "response_management_tokens"."revoked_at" is null;--> statement-breakpoint
CREATE INDEX "rsvp_submissions_guest_party_revision_desc" ON "rsvp_submissions" USING btree ("guest_party_id","revision_number" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "audit_events_event_occurred_at" ON "audit_events" USING btree ("event_id","occurred_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "audit_events_actor_occurred_at" ON "audit_events" USING btree ("actor_account_id","occurred_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "outbox_events_unprocessed" ON "outbox_events" USING btree ("processed_at","available_at") WHERE "outbox_events"."processed_at" is null;