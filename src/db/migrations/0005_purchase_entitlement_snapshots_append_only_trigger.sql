-- IMP-050: enforce that purchase_entitlement_snapshots is append-only, at
-- the database level, using the same role-independent trigger pattern
-- IMP-022/IMP-023 established for audit_events and entitlement_ledger_entries.
--
-- docs/06_DATABASE_DESIGN.md §10.5: "Captures exactly what was sold even
-- if package definitions later change." Unlike `purchases` (which has a
-- legitimate mutable `status` lifecycle: CREATED -> PAYMENT_PENDING ->
-- PAID -> ...), a purchase's entitlement snapshot has no legitimate update
-- path at all — it is written once, at purchase-snapshot creation, and
-- must never change afterward. This is a small, stable database invariant
-- (§17), not a hidden business workflow.

CREATE FUNCTION purchase_entitlement_snapshots_forbid_update_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    RAISE EXCEPTION 'purchase_entitlement_snapshots is append-only: % is not permitted (row id %)',
        TG_OP,
        COALESCE(OLD.id::text, 'unknown')
        USING ERRCODE = 'insufficient_privilege';
END;
$$;
--> statement-breakpoint
CREATE TRIGGER purchase_entitlement_snapshots_append_only
    BEFORE UPDATE OR DELETE ON "purchase_entitlement_snapshots"
    FOR EACH ROW
    EXECUTE FUNCTION purchase_entitlement_snapshots_forbid_update_delete();
