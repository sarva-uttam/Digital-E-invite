CREATE TABLE "entitlement_definitions" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"package_definition_id" uuid NOT NULL,
	"entitlement_code" text NOT NULL,
	"quantity" integer,
	"unit" text NOT NULL,
	"policy_value" jsonb
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
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
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
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchase_entitlement_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"purchase_id" uuid NOT NULL,
	"entitlement_code" text NOT NULL,
	"quantity" integer,
	"unit" text NOT NULL,
	"policy_value" jsonb
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
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "entitlement_definitions" ADD CONSTRAINT "entitlement_definitions_package_definition_id_package_definitions_id_fk" FOREIGN KEY ("package_definition_id") REFERENCES "public"."package_definitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_book_entries" ADD CONSTRAINT "price_book_entries_package_definition_id_package_definitions_id_fk" FOREIGN KEY ("package_definition_id") REFERENCES "public"."package_definitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase_entitlement_snapshots" ADD CONSTRAINT "purchase_entitlement_snapshots_purchase_id_purchases_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_package_definition_id_package_definitions_id_fk" FOREIGN KEY ("package_definition_id") REFERENCES "public"."package_definitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_price_book_entry_id_price_book_entries_id_fk" FOREIGN KEY ("price_book_entry_id") REFERENCES "public"."price_book_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "entitlement_definitions_package_code_unique" ON "entitlement_definitions" USING btree ("package_definition_id","entitlement_code");--> statement-breakpoint
CREATE UNIQUE INDEX "package_definitions_code_version_unique" ON "package_definitions" USING btree ("package_code","version");--> statement-breakpoint
CREATE INDEX "price_book_entries_package_market_currency_idx" ON "price_book_entries" USING btree ("package_definition_id","market_code","currency_code");--> statement-breakpoint
CREATE UNIQUE INDEX "purchase_entitlement_snapshots_purchase_code_unique" ON "purchase_entitlement_snapshots" USING btree ("purchase_id","entitlement_code");--> statement-breakpoint
CREATE INDEX "purchases_event_idx" ON "purchases" USING btree ("event_id");