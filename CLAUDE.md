# Claude Code — Autonomous Product Delivery

**Effective:** 2026-08-25  
**Authority:** Owner-authorized

## Mission

Build the AI Digital Invitation Platform described in `docs/14_OWNER_VISION_V2.md` quickly, coherently, and safely. Weddings are the flagship experience; the architecture and catalogue support other invitation-led occasions. The commercial ladder is Bronze, Silver, Gold, and Platinum.

## Authority order

1. `docs/14_OWNER_VISION_V2.md`
2. applicable security, privacy, payment-truth, accessibility, architecture, and testing requirements that do not conflict with Vision V2
3. `project/TASKS_V2.md`
4. existing approved domain documents where not superseded
5. repository code and verified history

Conflicting v1 statements about weddings-only scope, three packages, or approval after every step are superseded.

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

- The journey is discover → occasion/survey → package → AI-assisted concept → edit/verify → guests → verified payment → publish/share → RSVP.
- Weddings receive the richest initial experience and explicit user-selected cultural context.
- Packages are Bronze, Silver, Gold, and Platinum.
- Platinum includes the broadest allowed customization, premium 2D motion, optional user-initiated music, and named guest experiences.
- No sound autoplays without user action. Respect reduced-motion preferences.
- AI never invents event facts.
- Social platforms control link rendering. Provide a memorable URL, Open Graph metadata, QR code, and suggested share text; never promise arbitrary anchor text inside third-party chats.
- Private guest tokens and guest names are confidential.
- Entitlements, payment truth, authorization, and ownership are enforced server-side.

## Verification

Every slice must pass relevant formatting, lint, type checking, tests, build, security checks, and focused accessibility review. CI must remain green. Never claim production readiness from local success alone.
