# Claude Code — Autonomous Product Delivery

**Effective:** 2026-08-25 (reconciled)  
**Authority:** Owner-authorized

## Mission

Build the AI Digital Invitation Platform's **wedding-only MVP** quickly, coherently, and safely. Weddings are not just the flagship experience — they are the entire current MVP scope; the underlying architecture and catalogue data model are deliberately extensible to other invitation-led occasions, but those occasions are future expansion candidates and must not be customer-reachable in the MVP (`project/DECISIONS.md` `DEC-004`, reaffirmed `DEC-027`). The commercial ladder is Bronze, Silver, Gold, and Platinum, with owner-approved entitlements and prices (`DEC-025`, `DEC-026`).

## Authority order

1. `project/DECISIONS.md` (most recent accepted decision on any given point; see `DEC-025`–`DEC-028` for the current commercial/scope/ledger reconciliation)
2. `docs/14_OWNER_VISION_V2.md`, read together with `DEC-027` (wedding-only MVP scope) rather than its original multi-occasion launch framing
3. applicable security, privacy, payment-truth, accessibility, architecture, and testing requirements that do not conflict with the above
4. `project/TASKS.md` (the single authoritative execution ledger — `project/TASKS_V2.md` is retired, `DEC-028`)
5. existing approved domain documents where not superseded
6. repository code and verified history

Conflicting v1 statements about three packages or approval after every ordinary step are superseded (four packages; continuous execution). The v1 wedding-only MVP boundary is **reaffirmed**, not superseded — Vision V2's multi-occasion MVP-launch language is what has been corrected.

## Autonomous workflow

Do not pause for routine approval between documents, tasks, commits, or dependency-safe implementation slices. Inspect, research, decide reversibly, implement, test, document, open a pull request, and continue when CI and dependencies allow.

Keep changes coherent and reviewable. Maintain truthful task state and tests. Prefer typed configuration and data models to scattered conditionals. Do not weaken security, privacy, accessibility, factual accuracy, or payment verification for speed.

## Hard stops

Stop and request owner action before:

- purchasing a service or accepting paid commercial terms;
- using real production credentials or customer data;
- making legal, tax, regulatory, refund, or public pricing commitments;
- activating production infrastructure, payments, public launch, or customer availability;
- destructive/irreversible data operations;
- materially replacing the owner's core product promise.

Provider evaluation and adapter implementation may proceed with official research and synthetic test configuration; paid activation remains stopped.

## Product truths

- The journey is discover → survey (wedding-only) → package → AI-assisted concept → edit/verify → guests → verified payment → publish/share → RSVP.
- The MVP is wedding-only. Non-wedding occasion categories exist as a typed data scaffold in `src/lib/catalog.ts` but must not be selectable or linked anywhere a customer can reach (`DEC-027`).
- Packages are Bronze, Silver, Gold, and Platinum, with owner-approved entitlements and MUR prices (`DEC-025`). Additional guest capacity is an explicit MUR 15/guest add-on (`DEC-026`), never an automatic overage.
- Platinum includes the broadest allowed customization, premium 2D motion, optional user-initiated music, and named guest experiences.
- No sound autoplays without user action. Respect reduced-motion preferences.
- AI never invents event facts.
- Social platforms control link rendering. Provide a memorable URL, Open Graph metadata, QR code, and suggested share text; never promise arbitrary anchor text inside third-party chats.
- Private guest tokens and guest names are confidential.
- Entitlements, payment truth, authorization, and ownership are enforced server-side.

## Verification

Every slice must pass relevant formatting, lint, type checking, tests, build, security checks, and focused accessibility review. CI must remain green. Never claim production readiness from local success alone.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
