# Decision Register

**File:** `project/DECISIONS.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.1  
**Approved date:** 2026-08-17  
**Current MVP focus:** Weddings only

---

## 1. Purpose

This register preserves durable product, commercial, architectural, security and delivery decisions that materially constrain future work.

It exists so that Claude Code and human contributors can answer:

- what has been decided;
- why it was decided;
- which approved document is authoritative;
- what remains deliberately undecided;
- whether a later decision superseded an earlier one.

This is an index and decision history, not a replacement for the approved source documents. Detailed requirements remain in those documents.

---

## 2. Authority and precedence

1. Only owner-approved documents committed to the default GitHub branch are authoritative.
2. Drafts, chat messages, backlog entries, historical notes and uncommitted files are not implementation authority.
3. The approved source document named by a decision controls its detailed interpretation.
4. If this register conflicts with an approved source document, the approved source document wins and this register must be corrected.
5. A newer explicitly approved decision may supersede an older decision. Silent contradiction does not.
6. A decision marked `PROPOSED` must not be implemented as though accepted.
7. Vendor examples do not constitute vendor selection.

---

## 3. Decision states

- `PROPOSED` — awaiting owner approval;
- `ACCEPTED` — approved and currently authoritative;
- `SUPERSEDED` — replaced by a named later decision;
- `REJECTED` — considered and explicitly declined;
- `DEPRECATED` — previously accepted but no longer suitable; migration or removal may still be incomplete.

Accepted decisions must not be deleted. If their outcome changes, preserve the record and link the superseding decision.

---

## 4. Decision record contract

Each durable decision should contain:

- a stable ID;
- title;
- state;
- decision date;
- context;
- decision;
- consequences;
- authoritative sources;
- supersession link where applicable.

New IDs are appended and never renumbered.

---

## 5. Accepted foundational decisions

### DEC-001 — GitHub is the permanent source of truth

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** The development package must remain reviewable, durable and internally consistent.

**Decision:** The private GitHub repository and its approved files on the default branch are the permanent source of truth. The package is created sequentially: draft, owner challenge, review, explicit approval, repository write, commit and verification.

**Consequences:** Unapproved drafts must not be committed. Later documents must read and conform to earlier approved documents.

**Sources:** `docs/00_CLAUDE_RULES.md`; approved package workflow.

### DEC-002 — Implementation waits for package completion

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Premature implementation would turn unresolved assumptions into costly technical commitments.

**Decision:** Application implementation remains blocked until the planned Claude Code package is complete, approved and subjected to a final consistency audit.

**Consequences:** Documentation work may research feasibility, but it must not silently begin product implementation or lock vendors.

**Sources:** `docs/00_CLAUDE_RULES.md`; `project/CURRENT_STATE.md`; `project/TASKS.md`.

### DEC-003 — Launch in Mauritius without geographic restriction

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Mauritius is the first operating market, while the product vision is international.

**Decision:** Launch and validate operationally in Mauritius, but make the service globally accessible rather than technically restricting it to Mauritius.

**Consequences:** Global accessibility does not automatically authorize every country, currency, payment method, tax treatment, language or support promise.

**Sources:** `docs/01_PROJECT_VISION.md`; `docs/13_ROADMAP.md`; `product/LOCALIZATION.md`.

### DEC-004 — Weddings are the only MVP event type

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** A narrow first domain is required for coherent workflows, templates, language and quality.

**Decision:** The MVP supports weddings only. Other event categories remain deferred candidates and require promotion through the backlog gate.

**Consequences:** Generic event builders and broad event schemas must not dilute the wedding MVP.

**Sources:** `docs/01_PROJECT_VISION.md`; `docs/03_MVP_PRD.md`; `docs/04_DOMAIN_MODEL.md`; `project/BACKLOG.md`.

### DEC-005 — One-time event packages, not subscriptions

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Customers buy for a specific wedding rather than an ongoing software service.

**Decision:** Sell one-time, event-scoped Essential, Signature and Premium packages. Do not introduce subscriptions, stored-value wallets or recurring billing for the current product direction.

**Consequences:** Entitlements attach to an event purchase. Future recurring models require a new explicit decision.

**Sources:** `docs/02_BUSINESS_MODEL.md`; `product/PRICING_RULES.md`; `product/ENTITLEMENTS.md`; `project/BACKLOG.md`.

### DEC-006 — Every tier receives the complete core workflow

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Lower tiers must remain complete, usable products rather than crippled demos.

**Decision:** All paid packages include the complete core invitation workflow. Tiers differentiate through bounded scale, creative choice, AI allowances, language capacity, hosting duration and approved premium capabilities—not through security, privacy, accessibility or basic workflow removal.

**Consequences:** Commercial gates must be explicit and server enforced. Essential must remain capable of completing and publishing a wedding invitation.

**Sources:** `docs/02_BUSINESS_MODEL.md`; `docs/03_MVP_PRD.md`; `product/ENTITLEMENTS.md`.

### DEC-007 — Approved package dimensions

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Package differentiation needs concrete, enforceable bounds.

**Decision:** Essential, Signature and Premium respectively include:

- 1, 3 and 5 initial design concepts;
- 2, 6 and 12 refinement rounds;
- guest capacities of 100, 300 and 750;
- 1, 2 and 3 invitation-language slots;
- hosting periods of 30, 90 and 365 days from first publication.

First publication must occur within 180 days of purchase unless an approved exception applies.

**Consequences:** These limits require server-side entitlements and immutable purchase snapshots. Changes for future purchases must not rewrite historical purchases.

**Sources:** `docs/02_BUSINESS_MODEL.md`; `product/PRICING_RULES.md`; `product/ENTITLEMENTS.md`; `product/AI_USAGE_RULES.md`.

### DEC-008 — No automatic overages

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Surprise charges undermine trust and complicate payment authorization.

**Decision:** Do not bill automatic guest or AI overages. Additional capacity or usage must be purchased through an explicit, priced and confirmed add-on or capacity pack.

**Consequences:** The platform must stop or guide the host to an explicit purchase when a limit is reached. It must not silently accrue debt.

**Sources:** `product/PRICING_RULES.md`; `product/ENTITLEMENTS.md`; `product/AI_USAGE_RULES.md`; `project/BACKLOG.md`.

### DEC-009 — Final launch prices remain undecided

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Historical rupee figures were early hypotheses without completed cost, tax, provider or market validation.

**Decision:** No final launch price has been approved. Historical `Rs` or `MUR` figures are hypotheses only until owner approval follows commercial, cost, payment, tax and market review.

**Consequences:** Draft price figures must not be advertised, charged or encoded as production defaults.

**Sources:** `docs/02_BUSINESS_MODEL.md`; `product/PRICING_RULES.md`.

### DEC-010 — MUR base currency with controlled price books

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** The initial commercial base is Mauritius, while international checkout may later be useful.

**Decision:** MUR is the base and primary commercial currency. EUR and/or USD checkout may be activated only through approved market price books after provider/acquirer support and FX, settlement, refund, rounding, accounting and tax rules are confirmed.

**Consequences:** Global availability does not imply automatic multi-currency checkout. The authoritative amount and currency are calculated and frozen server-side.

**Sources:** `product/PRICING_RULES.md`; `docs/08_PAYMENT_ARCHITECTURE.md`.

### DEC-011 — Hosted payment and verified payment truth

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Payment data and client-controlled success signals create severe fraud and security risk.

**Decision:** Use provider-hosted or provider-controlled checkout. Never store, process or log raw card numbers, CVV/CVC, PINs, banking credentials or payment authentication secrets. Only verified provider events and server-side reconciliation may establish payment truth.

**Consequences:** Browser redirects, frontend state and client-supplied amounts are not proof of payment. Webhooks must be authenticated, idempotent and reconciled.

**Sources:** `docs/08_PAYMENT_ARCHITECTURE.md`; `docs/09_SECURITY_ARCHITECTURE.md`.

### DEC-012 — Payment methods require production verification

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Local method names, provider support and merchant eligibility can differ from assumptions or marketing material.

**Decision:** Prioritize verified support for Visa, Mastercard, MCB Juice and MauCAS QR, including compatible applications such as SBM Tag where the selected provider supports them. Consider blink and other local methods where commercially justified. Do not assume a standalone SBM Tag API or build separate direct wallet integrations unless necessary and officially supported.

**Consequences:** No payment method may be advertised before production availability, merchant eligibility and technical integration are confirmed.

**Sources:** `docs/08_PAYMENT_ARCHITECTURE.md`.

### DEC-013 — Tax treatment requires professional approval

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Customer taxes, business taxes, international sales and price-display duties cannot be safely inferred.

**Decision:** A qualified Mauritius accountant or tax professional must approve applicable VAT, invoicing, receipt, international customer, foreign-currency, refund, provider-fee and settlement treatment before production launch. Business-level income or corporate taxes must not automatically be added to customer checkout.

**Consequences:** Tax behavior remains configurable. Applicable customer-payable tax must be calculated from approved rules and clearly included or disclosed as legally required.

**Sources:** `docs/08_PAYMENT_ARCHITECTURE.md`; `product/PRICING_RULES.md`.

### DEC-014 — Provider-neutral architecture and controlled provider baselines

**State:** ACCEPTED — CLARIFIED  
**Decision date:** 2026-08-17  
**Clarification date:** 2026-08-17

**Context:** Early examples named frameworks and vendors before comparative architecture work was complete. Later owner-approved specialist documents established several technology and provisional provider baselines while preserving adapter boundaries, portability, and production confirmation gates.

**Decision:** Provider-neutral domain boundaries, narrow adapters, and portability remain mandatory. The following already-approved specialist decisions are authoritative within their scopes:

- Next.js 16 App Router, strict TypeScript, Node.js 24 LTS subject to exact-patch compatibility verification, PostgreSQL, a modular monolith, a separate Worker, durable jobs, object storage, and a transactional outbox/equivalent are approved architectural choices under `docs/05_SYSTEM_ARCHITECTURE.md`;
- OpenAI Responses API is the approved initial text adapter and Replicate official models are the approved initial image adapter under `docs/07_AI_ARCHITECTURE.md`; exact production model identifiers remain gated by implementation-time evaluation;
- Render Singapore, Amazon S3 Singapore, Render PostgreSQL/Key Value, and the related deployment topology are provisional approved baselines under `docs/12_DEPLOYMENT.md`, not unconditional production activation.

Authentication, payment/acquiring, email, analytics, and any provider not explicitly selected by its governing specialist document remain unresolved. Exact patches, AI model snapshots, accounts, plans, contracts, pricing, legal/privacy acceptance, regional/latency evidence, and production provider activation remain subject to their documented implementation or production gates.

**Consequences:** A provisional or initial baseline must not be described as a permanent provider commitment. Provider-specific SDKs remain confined to adapters. A provider/model/version may be enabled only after its required security, privacy, licensing, compatibility, cost, operational, and production-confirmation checks. Replacing a provider must not require rewriting domain rules.

**Sources:** `docs/00_CLAUDE_RULES.md`; `docs/05_SYSTEM_ARCHITECTURE.md`; `docs/07_AI_ARCHITECTURE.md`; `docs/12_DEPLOYMENT.md`.

### DEC-015 — Kubernetes is excluded from the MVP

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Container orchestration would add operational cost, complexity and attack surface without demonstrated MVP need.

**Decision:** Prefer a simple managed deployment model and exclude Kubernetes from the MVP. Reconsider only if measured scale, topology, reliability or organizational needs justify it.

**Consequences:** Deployment design must optimize for simplicity, recoverability and low operational burden.

**Sources:** `docs/12_DEPLOYMENT.md`; `project/BACKLOG.md` (`PLT-006`).

### DEC-016 — Accountless RSVP through private party tokens

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Guests need a low-friction RSVP path without being forced to create platform accounts.

**Decision:** Guest parties access the invitation and RSVP through unguessable, revocable private party tokens. Guests do not require customer accounts for the core RSVP flow.

**Consequences:** Tokens are bearer secrets and must not be logged, exposed in analytics or treated as public identifiers. Authorization is party-scoped and server enforced.

**Sources:** `docs/03_MVP_PRD.md`; `docs/04_DOMAIN_MODEL.md`; `docs/06_DATABASE_DESIGN.md`; `product/GUEST_RULES.md`.

### DEC-017 — Guest privacy over surveillance

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Read/open tracking is unreliable and creates disproportionate privacy risk for a private-event product.

**Decision:** Do not implement default invitation read/open tracking. Collect only guest data required for invitation access, RSVP and approved event operations.

**Consequences:** Analytics must avoid tracking that reveals private guest behavior without a separately justified and approved basis.

**Sources:** `product/GUEST_RULES.md`; `project/BACKLOG.md` (`GST-008`).

### DEC-018 — AI is bounded assistance, not autonomous authority

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Generative systems are probabilistic, costly and capable of factual, cultural, rights and safety failures.

**Decision:** AI may assist within typed, bounded product actions and approved entitlements. Hosts retain control and review. AI must not invent event facts, infer sensitive attributes, make identity/likeness content, execute arbitrary design code or perform unbounded autonomous changes.

**Consequences:** Inputs and outputs require validation, moderation where applicable, auditability, cost controls and explicit user confirmation before material publication changes.

**Sources:** `docs/07_AI_ARCHITECTURE.md`; `product/AI_USAGE_RULES.md`; `docs/09_SECURITY_ARCHITECTURE.md`.

### DEC-019 — No silent cross-provider AI failover

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Silent provider switching may change data handling, geography, rights, quality, price and disclosure obligations.

**Decision:** Do not silently send customer data to a different AI provider when the selected route fails. Any provider routing or failover must be explicitly designed, reviewed, disclosed where required and constrained by approved data-processing rules.

**Consequences:** A safe failure or retry is preferable to undisclosed cross-provider transfer.

**Sources:** `docs/07_AI_ARCHITECTURE.md`; `product/AI_USAGE_RULES.md`; `project/BACKLOG.md` (`AIX-007`).

### DEC-020 — Language strategy and activation gates

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Interface language, invitation-content language and market activation are separate concerns.

**Decision:** English is the primary language and French the second. Mauritian Kreol (`mfe`) is specifically intended for Mauritian customers. Russian is included in the planned language portfolio but requires its activation gate. Package language slots remain 1, 2 and 3 rather than promising every language in every invitation.

**Consequences:** Translation quality, native review, fonts, moderation, legal/payment copy and support readiness must be validated per language. Browser locale alone must not activate unsupported behavior.

**Sources:** `product/LOCALIZATION.md`; `product/ENTITLEMENTS.md`; `docs/10_DESIGN_SYSTEM.md`.

### DEC-021 — Security, privacy and accessibility are universal baselines

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Safety and accessibility cannot be premium upsells.

**Decision:** Apply the approved security, privacy, abuse-prevention and accessibility baseline to every tier and every supported locale.

**Consequences:** Tier logic must never weaken authorization, encryption, validation, privacy choices, auditability or accessible core flows. No known critical or high-severity payment-security vulnerability may remain unresolved at production launch.

**Sources:** `docs/09_SECURITY_ARCHITECTURE.md`; `docs/10_DESIGN_SYSTEM.md`; `docs/11_TESTING_STRATEGY.md`.

### DEC-022 — Durable event and entitlement history

**State:** ACCEPTED  
**Decision date:** 2026-08-17

**Context:** Prices, packages, policies and provider behavior can change after purchase.

**Decision:** Preserve immutable or append-only commercial and operational facts where history matters, including purchase snapshots, money amounts in minor units, entitlement grants/consumption, payment events, publication lifecycle, audit records and decision history.

**Consequences:** Current catalog configuration must not retroactively alter purchased rights. Corrections require traceable compensating records rather than destructive history edits.

**Sources:** `docs/04_DOMAIN_MODEL.md`; `docs/06_DATABASE_DESIGN.md`; `docs/08_PAYMENT_ARCHITECTURE.md`; `product/ENTITLEMENTS.md`.

---

## 6. Explicitly rejected directions

The following remain rejected unless a later accepted decision reopens them with new evidence and safeguards:

- subscriptions for the current product model;
- stored credits or account wallets;
- automatic usage or guest overage billing;
- cash or manual bank-transfer fulfillment for MVP;
- cryptocurrency payments;
- arbitrary customer CSS or executable design code;
- AI identity or likeness generation;
- silent cross-provider AI failover;
- default invitation read/open tracking;
- automatic person-name transliteration;
- Kubernetes for MVP;
- a guaranteed 24/7 support promise without funded operations.

Rejected feature details and reconsideration gates are maintained in `project/BACKLOG.md`.

---

## 7. Deliberately pending decisions

The following are not approved merely because they are required before implementation or launch:

1. final application framework and runtime versions;
2. final database, identity, storage and hosting providers;
3. final AI providers, models, regions, retention terms and production pricing;
4. final payment provider/acquirer and verified production payment methods;
5. final transactional email and observability providers;
6. final analytics implementation and consent configuration;
7. final package prices, add-on prices, discounts and refund rules;
8. approved tax, invoicing and international-sales treatment;
9. production domains, sender domains and support channels;
10. launch jurisdictions beyond operational validation in Mauritius;
11. go-live acceptance, security and operational readiness decisions.

Each material selection must use current official sources, document alternatives and trade-offs, and receive owner approval before becoming implementation authority.

---

## 8. Change and supersession procedure

To change an accepted decision:

1. identify the decision ID and the evidence that changed;
2. assess affected approved documents, data, security, privacy, legal, cost, operations and migrations;
3. draft a new decision with a new stable ID;
4. obtain explicit owner approval;
5. mark the earlier decision `SUPERSEDED` and link both records;
6. update every affected authoritative document in controlled sequence;
7. add implementation tasks only after documentation is consistent;
8. record the change in `project/CHANGELOG.md` when that file becomes authoritative.

Do not rewrite history to make a changed decision appear as though it was always the rule.

---

## 9. Approved owner decisions

### Decision 1 — Register scope

**Approved:** Keep this register limited to decisions that materially constrain product direction, architecture, security, commercial behavior, compliance or delivery. Leave detailed feature rules in their authoritative specifications.

### Decision 2 — Source-document precedence

**Approved:** If this register and an approved source document differ, treat the approved source document as authoritative and correct this register promptly.

### Decision 3 — Stable decision identifiers

**Approved:** Use append-only `DEC-NNN` identifiers. Never reuse or renumber an identifier, including after rejection or supersession.

### Decision 4 — Explicit supersession

**Approved:** Require every changed durable decision to be recorded under a new ID and explicitly link the earlier record as `SUPERSEDED`; prohibit silent replacement.

### Decision 5 — Pending vendor choices

**Approved:** Keep all named technical and commercial providers pending until a documented evaluation using current official sources is owner-approved.

### Decision 6 — Historical price interpretation

**Approved:** Treat every price mentioned before final pricing approval as a hypothesis, even when it includes a currency symbol or appears in earlier planning material.

### Decision 7 — Global availability boundary

**Approved:** Preserve global site availability while requiring separate approval for each activated market's checkout currency, payment, tax, legal, language and support behavior.

### Decision 8 — Rejected-direction reopening

**Approved:** Reopen a rejected direction only when the original rejection reason has materially changed, new evidence is recorded, safeguards are defined and the owner explicitly approves reconsideration.

### Decision 9 — Decision-to-task gate

**Approved:** Do not add implementation work from a durable decision until all affected approved documentation is internally consistent and the work is authorized in `project/TASKS.md`.

### Decision 10 — Final package audit

**Approved:** Before implementation begins, perform a complete cross-document decision audit and resolve every contradiction, orphaned proposal and premature vendor assumption.

---

## 10. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.1.  
**Approved date:** 2026-08-17.  
**Owner decisions:** Decisions 1–10 approved as proposed.
