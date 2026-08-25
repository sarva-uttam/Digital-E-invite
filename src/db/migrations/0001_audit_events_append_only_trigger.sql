-- IMP-022: enforce that audit_events is append-only at the database level.
--
-- docs/06_DATABASE_DESIGN.md §16.3 requires that the application database
-- role used by normal services receive no UPDATE/DELETE privilege on this
-- table. Separate database roles are a deployment-topology concern (§21)
-- that depends on a hosting/provider decision this repository has not yet
-- made (see docs/12_DEPLOYMENT.md gates), so this migration enforces the
-- same invariant a role grant would, but role-independently: no role,
-- including a future administrative one used for ordinary application
-- traffic, can UPDATE or DELETE a row here without superuser-level
-- intervention to disable the trigger first. Corrections must be new
-- audit_events rows, never edits to an existing one — matching this
-- repository's append-only, immutable-audit-history invariant (§17.13).
--
-- This is a small, stable database invariant, not a hidden business
-- workflow, which is exactly what §17 reserves triggers for.

CREATE FUNCTION audit_events_forbid_update_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    RAISE EXCEPTION 'audit_events is append-only: % is not permitted (row id %)',
        TG_OP,
        COALESCE(OLD.id::text, 'unknown')
        USING ERRCODE = 'insufficient_privilege';
END;
$$;
--> statement-breakpoint
CREATE TRIGGER audit_events_append_only
    BEFORE UPDATE OR DELETE ON "audit_events"
    FOR EACH ROW
    EXECUTE FUNCTION audit_events_forbid_update_delete();
