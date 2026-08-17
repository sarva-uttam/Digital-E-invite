# Backlog

**File:** `project/BACKLOG.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.0  
**Approved date:** 2026-08-17  
**Current MVP focus:** Weddings only  
**Authority:** No backlog item is approved scope merely because it appears here

---

## 1. Purpose

This file captures valuable ideas that are outside the current authorized task queue.

Its purpose is to prevent two failures:

1. losing potentially useful future ideas; and
2. allowing attractive ideas to leak into the MVP without evidence, prioritization, design, cost, security, legal review, and owner approval.

Items in this file are possibilities, not promises, requirements, launch commitments, prices, deadlines, or authorization to implement.

---

## 2. Relationship to other project files

- `docs/03_MVP_PRD.md` defines approved MVP scope.
- `docs/13_ROADMAP.md` defines approved sequencing and future direction.
- `project/TASKS.md` contains authorized work.
- `project/DECISIONS.md` records durable approved decisions.
- `project/CURRENT_STATE.md` reports what is actually true.
- This file contains deferred candidates only.

If an item conflicts with an approved document, the approved document wins.

---

## 3. Backlog states

- `CAPTURED` — idea recorded with no validation;
- `RESEARCH_NEEDED` — requires user/market/technical/legal/cost research;
- `VALIDATED` — evidence supports further consideration, but scope is not approved;
- `PROPOSED` — prepared for an owner scope/decision review;
- `PROMOTED` — approved and moved into `TASKS.md` with dependencies/acceptance criteria;
- `DEFERRED` — deliberately postponed to a later phase;
- `REJECTED` — deliberately not pursued, with reason/evidence;
- `SUPERSEDED` — replaced by another backlog item or approved decision.

`PROMOTED` does not mean implemented. Implementation status belongs in `TASKS.md` and `CURRENT_STATE.md`.

---

## 4. Horizon labels

- `POST_MVP_EARLY` — candidate after a stable Mauritius wedding MVP;
- `GROWTH` — candidate after product/market and operational validation;
- `LATER` — strategically possible but no near-term expectation;
- `HOLD` — do not evaluate until a named risk/dependency changes.

Horizons are not dates.

---

## 5. Backlog item contract

Each item uses:

- stable ID;
- title;
- state;
- horizon;
- problem/opportunity;
- reason deferred;
- prerequisites/evidence required;
- principal risks;
- source documents or superseding links where relevant.

New ideas must be added without renumbering existing IDs.

---

## 6. Promotion gate

A backlog item can move to `TASKS.md` only when:

1. the customer problem and target segment are clear;
2. evidence supports value/priority;
3. MVP and existing customer impact are assessed;
4. product behavior and acceptance criteria are drafted;
5. security, privacy, abuse, accessibility, localization, legal, and operational risks are assessed;
6. technical dependencies and migration impact are understood;
7. provider and ongoing cost/margin impact are evaluated;
8. the owner explicitly approves the scope change;
9. a decision record is created where durable trade-offs exist;
10. `TASKS.md`, roadmap/current state, and affected specifications are updated before implementation.

No code spike, vendor feature, customer request, or competitor feature bypasses this gate.

---

## 7. Event-type expansion

### EVT-001 — Engagement invitations

**State:** DEFERRED  
**Horizon:** POST_MVP_EARLY  
**Opportunity:** Reuse much of the wedding workflow for engagement events.

**Deferred because:** MVP learning should first validate the wedding model, questionnaire, templates, pricing, and support burden.

**Prerequisites:** customer demand; event-specific facts/questionnaire; themes/copy; entitlement/pricing review; regression tests.

### EVT-002 — Anniversary invitations

**State:** DEFERRED  
**Horizon:** POST_MVP_EARLY

**Prerequisites:** demand evidence; wording/themes; event schema differences; pricing and lifecycle review.

### EVT-003 — Birthday invitations

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** wider child/minor context, lower willingness to pay, different sharing/guest expectations, much larger template scope.

### EVT-004 — Baby shower invitations

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** sensitive family/pregnancy context, different design/copy needs, lower-price expectations.

### EVT-005 — Religious ceremony invitations

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** event-specific sacred terminology, cultural accuracy, reviewer coverage, non-inference, broader moderation requirements.

### EVT-006 — Graduation invitations

**State:** DEFERRED  
**Horizon:** GROWTH

**Prerequisites:** validated demand, facts/questionnaire, institutional trademark/branding guidance, templates and pricing.

### EVT-007 — Corporate event invitations

**State:** DEFERRED  
**Horizon:** LATER

**Risks:** organization accounts, teams, procurement, invoices, branding, permissions, compliance, higher service expectations.

### EVT-008 — General private-party invitations

**State:** HOLD  
**Horizon:** LATER

**Reason:** An “other” event type would create uncontrolled content/schema/template scope and weaken product clarity.

---

## 8. Collaboration and professional accounts

### COL-001 — Event collaborators

**State:** RESEARCH_NEEDED  
**Horizon:** POST_MVP_EARLY  
**Opportunity:** Allow couples or family members to manage the same event.

**Risks:** invitation/role lifecycle, conflicting edits, privacy, audit, removal, payment/refund authority, account recovery.

### COL-002 — Planner/professional workspace

**State:** DEFERRED  
**Horizon:** GROWTH  
**Opportunity:** Agencies and wedding planners manage multiple client events.

**Risks:** cross-client isolation, delegated billing, white label pressure, pooled entitlements, staff roles, contracts, support burden.

### COL-003 — Approval workflow between collaborators

**State:** DEFERRED  
**Horizon:** GROWTH

**Prerequisites:** COL-001; role matrix; immutable approvals; conflict/version behavior.

### COL-004 — Organization accounts and SSO

**State:** HOLD  
**Horizon:** LATER

**Reason:** Enterprise identity and contractual scope are disproportionate to the consumer wedding MVP.

---

## 9. Design and creative capabilities

### DES-001 — Advanced animations and effects

**State:** DEFERRED  
**Horizon:** POST_MVP_EARLY

**Includes:** expanded transitions, particles, parallax, and motion presets.

**Risks:** accessibility/reduced-motion, device performance, rendering consistency, maintenance, misleading tier quality claims.

### DES-002 — Three-dimensional invitation effects

**State:** HOLD  
**Horizon:** LATER

**Reason:** high complexity/performance/accessibility cost with uncertain customer value.

### DES-003 — User-uploaded photos

**State:** RESEARCH_NEEDED  
**Horizon:** GROWTH

**Risks:** consent, minors, likeness/biometric context, moderation, malware/files, EXIF, storage/deletion, cropping, copyright.

### DES-004 — Custom font upload

**State:** HOLD  
**Horizon:** LATER

**Risks:** licensing, malware/file validation, script coverage, layout/accessibility, performance.

### DES-005 — Arbitrary custom CSS/design code

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** creates XSS, privacy, accessibility, support, upgrade, and rendering risks incompatible with the controlled product model.

### DES-006 — Template marketplace

**State:** HOLD  
**Horizon:** LATER

**Risks:** creator onboarding, rights, moderation, payouts, taxes, disputes, quality, arbitrary assets/code.

### DES-007 — Customer white label/custom domain

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** DNS/certificates, phishing/abuse, support, legal attribution, email/reputation, pricing, planner-market coupling.

### DES-008 — Exact 4K/print-resolution packages

**State:** RESEARCH_NEEDED  
**Horizon:** GROWTH

**Reason:** current product promises responsive web/social assets, not unvalidated 720p/1080p/4K tier claims.

---

## 10. AI expansion

### AIX-001 — Additional bounded AI packs

**State:** RESEARCH_NEEDED  
**Horizon:** POST_MVP_EARLY

**Prerequisites:** real consumption/cost/quality/refund data; price/margin validation; abuse controls; entitlement ledger support.

### AIX-002 — Per-guest AI messages

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** guest-data disclosure, hallucination, cultural mistakes, variable cost, spam, review burden, capacity scaling.

### AIX-003 — AI music generation

**State:** HOLD  
**Horizon:** LATER

**Risks:** cost, rights, autoplay/accessibility, bandwidth, moderation, invitation value uncertainty.

### AIX-004 — AI video invitations

**State:** HOLD  
**Horizon:** LATER

**Risks:** very high cost/latency/storage, rights, moderation, device/network experience, support.

### AIX-005 — Identity/likeness generation

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** consent, impersonation, biometric/likeness, minor, deepfake, privacy, moderation, and rights risks exceed MVP value.

### AIX-006 — Automated cultural fusion

**State:** DEFERRED  
**Horizon:** GROWTH

**Prerequisites:** explicit owner selection, reviewed combinations, native/cultural experts, safety evaluation, no sensitive inference.

### AIX-007 — Automatic cross-provider AI failover

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** undisclosed data transfer, inconsistent output, licensing, privacy, consent, and cost risks. Any future reconsideration requires explicit provider routing and disclosure design.

### AIX-008 — Conversational free-form design agent

**State:** DEFERRED  
**Horizon:** LATER

**Risks:** arbitrary changes/tools/code, entitlement ambiguity, prompt injection, facts, cost, audit, accessibility.

---

## 11. Guest and event operations

### GST-001 — Seating/table planning

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** complex UX/constraints, collaborator conflict, export/printing, sensitive relationship information.

### GST-002 — Meal selection

**State:** RESEARCH_NEEDED  
**Horizon:** POST_MVP_EARLY

**Risks:** dietary/allergy data, supplier handoff, false safety assumptions, retention, localization.

### GST-003 — Allergy/medical-access needs

**State:** HOLD  
**Horizon:** LATER

**Reason:** sensitive/health-related data needs explicit purpose, minimization, legal/privacy design, access controls, retention, and clear non-medical responsibility.

### GST-004 — Travel and accommodation coordination

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** complex structured data, third parties, changing information, global addresses/timezones, support.

### GST-005 — Gift registry and contribution links

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** external links/fraud, payment/regulatory confusion, affiliate disclosure, cultural expectations.

### GST-006 — Ticketing and check-in QR

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** identity verification, offline operation, duplicate/fraud handling, event-day reliability, devices/staff roles.

### GST-007 — Guest accounts and OTP verification

**State:** RESEARCH_NEEDED  
**Horizon:** GROWTH

**Reason:** could support higher-risk events but adds delivery cost, accessibility, recovery, privacy, and conversion friction.

### GST-008 — Read/open tracking

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** unreliable and privacy-sensitive; ordinary product value does not justify surveillance.

### GST-009 — Guest-uploaded attachments

**State:** HOLD  
**Horizon:** LATER

**Risks:** malware, moderation, storage, privacy, rights, retention, abuse.

### GST-010 — Public guest comments/social wall

**State:** HOLD  
**Horizon:** LATER

**Risks:** moderation, harassment, privacy, spam, public exposure, takedowns.

---

## 12. Delivery and communication

### COM-001 — Direct transactional email invitations

**State:** RESEARCH_NEEDED  
**Horizon:** POST_MVP_EARLY

**Prerequisites:** provider selection, domain authentication, templates/locales, lawful basis/consent, bounce/abuse/rate controls, costs, observability.

### COM-002 — Official WhatsApp Business delivery

**State:** RESEARCH_NEEDED  
**Horizon:** GROWTH

**Risks:** provider/Meta eligibility, templates/consent, pricing, policy changes, phone data, opt-out, deliverability/support.

### COM-003 — SMS delivery

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** global cost, country regulations, sender IDs, abuse, number quality, opt-out.

### COM-004 — Host RSVP notifications

**State:** RESEARCH_NEEDED  
**Horizon:** POST_MVP_EARLY

**Prerequisites:** preferences, batching/digests, provider, privacy-minimized content, cost, rate controls.

### COM-005 — Automated guest reminders

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** consent, spam, timing/timezones, opt-out, cost, incorrect pending state, provider policy.

### COM-006 — Calendar-file integration

**State:** RESEARCH_NEEDED  
**Horizon:** POST_MVP_EARLY

**Risks:** timezone/update/cancellation behavior, compatibility, private-link exposure, factual accuracy.

---

## 13. Commercial expansion

### BUS-001 — Subscriptions

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** conflicts with the approved one-time event-package model and adds recurring billing/cancellation complexity without current need.

### BUS-002 — Stored credits/account wallet

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** conflicts with event-scoped entitlements and creates accounting, expiry, refund, liability, and abuse complexity.

### BUS-003 — Automatic per-guest overage billing

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** surprise billing risk; approved model uses explicit capacity packs and no automatic overage.

### BUS-004 — Referral programme

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** fraud, attribution, payout/tax/accounting, privacy, promotion disclosures, margin.

### BUS-005 — Affiliate/partner programme

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** partner compliance, tracking/privacy, commissions, contracts, reputation.

### BUS-006 — Installments or buy-now-pay-later

**State:** HOLD  
**Horizon:** LATER

**Risks:** provider/regulatory eligibility, refunds/chargebacks, entitlement timing, customer harm, accounting.

### BUS-007 — Cash/manual bank-transfer payment

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** reconciliation, fraud, fulfillment delay, refund, support, and audit burden for MVP.

### BUS-008 — Cryptocurrency payment

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** volatility, compliance, tax/accounting, refunds, custody/provider, customer-risk complexity.

### BUS-009 — Additional market price books

**State:** RESEARCH_NEEDED  
**Horizon:** GROWTH

**Prerequisites:** market demand, payment/settlement, tax/legal, pricing/margin, currency/refund/support/localization approval.

### BUS-010 — Dynamic/A-B pricing

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** fairness/transparency, sample size, analytics/consent, implementation complexity. Prefer explicit pilots first.

---

## 14. Localization and market expansion

### LOC-001 — Full Mauritian Kreol interface

**State:** RESEARCH_NEEDED  
**Horizon:** POST_MVP_EARLY

**Prerequisites:** complete scope, glossary/style guide, native review, legal/security/payment string treatment, support, regression tests.

### LOC-002 — Full Russian activation

**State:** DEFERRED  
**Horizon:** GROWTH

**Prerequisites:** Cyrillic UI/content, native review, AI/moderation, support/legal scope, market/payment/compliance independence, activation gates.

### LOC-003 — Additional languages

**State:** HOLD  
**Horizon:** LATER

**Reason:** select only from measured demand and operational ability; do not activate every browser language automatically.

### LOC-004 — Right-to-left languages

**State:** HOLD  
**Horizon:** LATER

**Risks:** layout/component redesign, typography, content/AI/moderation/support/legal readiness.

### LOC-005 — Automatic name transliteration

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** identity/factual error risk; use explicit host/guest-provided forms instead.

---

## 15. Analytics and growth tooling

### ANA-001 — Advanced host analytics

**State:** DEFERRED  
**Horizon:** GROWTH

**Includes:** response trends, delivery funnels, invitation interaction summaries.

**Risks:** surveillance, consent, token leakage, re-identification, metric misinterpretation.

### ANA-002 — Marketing attribution

**State:** RESEARCH_NEEDED  
**Horizon:** GROWTH

**Risks:** cookies/consent, private invitation separation, cross-site tracking, data minimization.

### ANA-003 — Product experimentation platform

**State:** DEFERRED  
**Horizon:** GROWTH

**Prerequisites:** sufficient traffic, ethical/transparent experiment policy, privacy, stable metrics, rollback.

### ANA-004 — Public social proof gallery

**State:** HOLD  
**Horizon:** LATER

**Risks:** consent, private event exposure, likeness/copyright, withdrawal, moderation.

---

## 16. Platform and developer expansion

### PLT-001 — Native mobile applications

**State:** DEFERRED  
**Horizon:** LATER

**Reason:** responsive web validates the product with lower cost; native apps add two release/security/support surfaces.

### PLT-002 — Public API

**State:** HOLD  
**Horizon:** LATER

**Risks:** authentication/scopes, abuse/rates, versioning, data leakage, support, contracts.

### PLT-003 — Webhooks for customers/planners

**State:** HOLD  
**Horizon:** LATER

**Risks:** signing/replay, sensitive guest data, delivery/retries, configuration, support.

### PLT-004 — Third-party integrations

**State:** DEFERRED  
**Horizon:** GROWTH

**Candidates:** calendars, CRM/planner tools, spreadsheets, venue tools.

**Prerequisites:** measured workflow demand; least-privilege OAuth/data design; provider reviews; disconnect/deletion handling.

### PLT-005 — Offline event-day mode

**State:** HOLD  
**Horizon:** LATER

**Reason:** relevant mainly if ticketing/check-in is approved; introduces sync/conflict/device security.

### PLT-006 — Kubernetes/container orchestration platform

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** unnecessary MVP complexity/cost/attack surface. Reconsider only if measured scale, topology, reliability, or organizational needs exceed simpler managed deployment.

---

## 17. Operations and support expansion

### OPS-001 — 24/7 guaranteed support

**State:** REJECTED  
**Horizon:** HOLD

**Reason:** cannot be responsibly promised without staffing, coverage, escalation, cost, and service-level operations.

### OPS-002 — Formal paid service-level agreements

**State:** HOLD  
**Horizon:** LATER

**Prerequisites:** business/enterprise segment, redundancy, monitoring/on-call, incident reporting, legal contract, compensation model.

### OPS-003 — Dedicated customer success/concierge design

**State:** DEFERRED  
**Horizon:** GROWTH

**Risks:** service-business labor, margins, scope control, staff access to private events, quality consistency.

### OPS-004 — Multi-region active-active deployment

**State:** HOLD  
**Horizon:** LATER

**Reason:** high data consistency, cost, privacy/residency, and operational complexity; require measured need.

---

## 18. Explicit rejection rules

Rejected items remain visible to prevent repeated accidental reintroduction.

A rejected item may be reconsidered only when:

- the original rejection reason materially changes;
- new evidence is documented;
- security/legal/cost/scope implications are re-evaluated;
- the owner explicitly approves reopening it;
- its state changes through a decision record rather than silent editing.

---

## 19. Backlog review cadence

Review the backlog:

- after the controlled Mauritius launch;
- after the first meaningful customer-feedback cohort;
- when pricing/cost/support data becomes reliable;
- before each roadmap/version planning cycle;
- when a repeated customer problem appears;
- when a provider/law/security change materially affects feasibility.

Do not review merely to fill a release. Stable simplicity is a valid outcome.

---

## 20. Approved owner decisions

### Decision 1 — Backlog authority

**Approved:** Treat every backlog item as non-authoritative deferred scope until it passes the promotion gate and appears in approved `TASKS.md`/`DECISIONS.md` updates.

### Decision 2 — Stable IDs

**Approved:** Use category-prefixed stable IDs and never renumber historical items; mark items rejected, promoted, or superseded instead of deleting their history.

### Decision 3 — Event expansion

**Approved:** Consider engagements/anniversaries first after wedding validation; keep broad “other event,” corporate, and complex ceremony expansion gated by evidence and domain design.

### Decision 4 — Collaboration

**Approved:** Research couple/family collaborators before planner/organization workspaces; do not introduce pooled entitlements or cross-client access casually.

### Decision 5 — AI/design boundaries

**Approved:** Keep AI music/video, identity generation, arbitrary CSS/code, silent failover, and uncontrolled design agents outside MVP; require strong evidence and new safeguards for reconsideration.

### Decision 6 — Guest-feature boundaries

**Approved:** Keep seating, meals/allergies, travel, gifts, ticketing/check-in, guest accounts/OTP, attachments, and public social features deferred; permanently reject default read/open tracking.

### Decision 7 — Commercial boundaries

**Approved:** Preserve one-time event packages; reject subscriptions, stored wallets, automatic overages, cash/manual transfer, and crypto for the current product direction.

### Decision 8 — Communication expansion

**Approved:** Evaluate direct email first; keep official WhatsApp/SMS/reminders gated by provider, consent/legal, cost, abuse, deliverability, localization, and support evidence.

### Decision 9 — Platform simplicity

**Approved:** Prefer responsive web and simple managed deployment; defer native apps, public APIs, webhooks, multi-region active-active, and Kubernetes until measured need justifies them.

### Decision 10 — Review cadence

**Approved:** Review backlog after launch/customer evidence and during deliberate roadmap cycles, not as permission to add features continuously.

---

## 21. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.0.  
**Approved date:** 2026-08-17.  
**Owner decisions:** Decisions 1–10 approved as proposed.
