CREATE TABLE "entitlement_balances" (
	"event_id" uuid NOT NULL,
	"entitlement_code" text NOT NULL,
	"granted" integer DEFAULT 0 NOT NULL,
	"reserved" integer DEFAULT 0 NOT NULL,
	"consumed" integer DEFAULT 0 NOT NULL,
	"adjusted" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "entitlement_balances_event_id_entitlement_code_pk" PRIMARY KEY("event_id","entitlement_code")
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
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "entitlement_ledger_entries_event_code_created_idx" ON "entitlement_ledger_entries" USING btree ("event_id","entitlement_code","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "entitlement_ledger_entries_idempotency_unique" ON "entitlement_ledger_entries" USING btree ("event_id","entitlement_code","idempotency_key");