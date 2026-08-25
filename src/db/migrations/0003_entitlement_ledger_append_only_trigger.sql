-- IMP-023: enforce that entitlement_ledger_entries is append-only, at the
-- database level, using the same role-independent trigger pattern IMP-022
-- established for audit_events (0001_audit_events_append_only_trigger.sql).
--
-- docs/06_DATABASE_DESIGN.md §12.1: "No ledger row is updated or deleted.
-- Corrections use compensating entries." — this is a small, stable
-- database invariant (§17), not a hidden business workflow.

CREATE FUNCTION entitlement_ledger_entries_forbid_update_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    RAISE EXCEPTION 'entitlement_ledger_entries is append-only: % is not permitted (row id %)',
        TG_OP,
        COALESCE(OLD.id::text, 'unknown')
        USING ERRCODE = 'insufficient_privilege';
END;
$$;
--> statement-breakpoint
CREATE TRIGGER entitlement_ledger_entries_append_only
    BEFORE UPDATE OR DELETE ON "entitlement_ledger_entries"
    FOR EACH ROW
    EXECUTE FUNCTION entitlement_ledger_entries_forbid_update_delete();
