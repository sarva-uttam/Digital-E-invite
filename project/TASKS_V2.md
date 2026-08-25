# Autonomous Delivery Plan V2

> **Retired 2026-08-25 (`project/DECISIONS.md` `DEC-028`):** This ledger is no longer authoritative. `project/TASKS.md` is the single authoritative execution ledger; see its "Retired-ledger mapping" note (under `IMP-006`) for how each item below maps onto the `IMP-*` numbering. This file is kept for historical traceability only.

**Status:** Retired — superseded by `project/TASKS.md` (`DEC-028`)  
**Effective date:** 2026-08-25 (retired same day)  
**Execution mode:** Continuous, dependency-aware, no routine approval pauses — this cadence is carried forward into `project/TASKS.md`, not lost

## Work rules

- Work in coherent, reviewable slices.
- Keep CI green and use feature branches and pull requests.
- Continue automatically from one completed slice to the next when dependencies are satisfied.
- Record assumptions and reversible product choices.
- Preserve hard stops defined in `docs/14_OWNER_VISION_V2.md`.
- Do not mark work verified without repository and test evidence.

## Delivery sequence

### V2-001 — Vision and execution reset
**State:** IN_PROGRESS  
Align repository authority, package model, event scope, sharing truth, and autonomous workflow.

### V2-002 — Marketing and discovery experience
**State:** IN_PROGRESS  
Build the responsive landing page, product explanation, occasion discovery, invitation preview, four-tier comparison, and clear creation CTA.

### V2-003 — Catalogue and entitlement foundation
**State:** IN_PROGRESS  
Represent supported occasion categories and Bronze/Silver/Gold/Platinum capabilities in typed, tested application data.

### V2-004 — Survey and event brief
**State:** NEXT  
Implement the guided occasion, cultural context, mood, palette, language, guest count, music, animation, special-element, and factual-detail flow with save/resume.

### V2-005 — Migration system and base schema
**State:** NEXT  
Create safe Drizzle migrations, disposable local/test PostgreSQL, repair guidance, and the v2-aligned base schema.

### V2-006 — Identity, ownership, and authorization
**State:** BLOCKED_EXTERNAL_DECISION  
Evaluate an authentication approach, then implement secure sessions, ownership, roles, and recovery. Provider activation remains a hard stop.

### V2-007 — Invitation composer and renderer
**State:** PLANNED  
Create deterministic themes, structured editing, responsive rendering, reduced-motion behavior, and factual verification.

### V2-008 — Guest personalization and RSVP
**State:** PLANNED  
Implement party tokens, CSV/manual guest intake, named invitation rendering, RSVP updates, exports, revocation, and privacy controls.

### V2-009 — AI generation adapters
**State:** BLOCKED_EXTERNAL_DECISION  
Benchmark text and image providers and implement provider-neutral contracts. Paid activation and production credentials remain hard stops.

### V2-010 — Checkout and publication
**State:** BLOCKED_EXTERNAL_DECISION  
Implement provider-controlled checkout, server verification, entitlements, publication, expiration, share metadata, QR codes, and reconciliation.

### V2-011 — Premium motion and audio
**State:** PLANNED  
Implement performant layered 2D motion, decorative sidelines, reduced-motion fallback, user-initiated audio, licensing records, and Platinum art direction.

### V2-012 — Production readiness
**State:** HARD_STOP  
Complete security, privacy, accessibility, recovery, operational, legal, tax, provider, and launch evidence. Production activation requires explicit owner authorization.
