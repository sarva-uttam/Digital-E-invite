-- Custom migration (IMP-020): base-level database role separation.
--
-- docs/06_DATABASE_DESIGN.md §21: "The application uses distinct database
-- roles for migrations, runtime reads/writes... Production runtime
-- credentials cannot alter schemas." §16.3: "The application database role
-- used by normal services receives no UPDATE or DELETE privilege on this
-- table [audit_events]." §17 invariant 13: "immutable ledger, financial
-- transaction, version, RSVP-history, and audit rows."
--
-- This migration creates a NOLOGIN privilege-group role, app_runtime, with
-- full CRUD on every table except no UPDATE/DELETE on the five append-only/
-- immutable tables named across those sections:
--   - audit_events               (audit)
--   - entitlement_ledger_entries (ledger)
--   - invitation_versions        (version)
--   - rsvp_submissions           (RSVP-history)
--   - payment_transactions       (financial transaction)
--
-- app_runtime is NOLOGIN — it is a privilege group, not a credential, so no
-- secret is ever committed here. The migration/admin connection that runs
-- this file keeps full schema-altering privilege; ordinary application
-- runtime access does not need it.
--
-- This is deliberately bounded to what a committed, portable migration can
-- state: it does not create a login role, does not set a password, and
-- does not grant app_runtime to any specific login. Per docs/06 §21's
-- "ordinary PostgreSQL features first" policy and this task's own
-- boundary ("do not build production IAM/credential infrastructure"),
-- provisioning the actual runtime login credential and granting it
-- membership in app_runtime (`GRANT app_runtime TO <login-role>;`) is
-- deployment/provider-specific work performed outside this migration —
-- see README.md's "Database roles" section. This migration only proves the
-- privilege boundary can exist and is verified by a database integration
-- test that inspects information_schema.role_table_grants directly,
-- without needing a login role to exist locally or in CI.
--
-- New tables added by later migrations must extend the GRANT below
-- explicitly; there is no default-privilege rule here that would apply
-- automatically to future tables (see README.md).
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_runtime') THEN
    CREATE ROLE "app_runtime" NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO "app_runtime";

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "app_runtime";

REVOKE UPDATE, DELETE ON TABLE
  "audit_events",
  "entitlement_ledger_entries",
  "invitation_versions",
  "rsvp_submissions",
  "payment_transactions"
FROM "app_runtime";
