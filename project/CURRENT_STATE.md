# Current State

**File:** `project/CURRENT_STATE.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.6  
**Snapshot date:** 2026-08-20  
**Repository:** `Moniseur-zordi/Digital-E-invite`  
**Branch:** `main`  
**Claude Package version:** 1.0  
**Package status:** Implementation Preparation Ready

---

## 1. Purpose

This file is the concise, continuously maintained snapshot of where the project actually stands.

It tells the owner, Claude Code, and future contributors:

- which phase is active;
- what is approved and committed;
- what has not started;
- which decisions are still intentionally open;
- what blocks implementation or production;
- which document/action comes next.

This is a status document, not a substitute for the approved specifications. If this file conflicts with an approved source document, the approved source document wins and this snapshot must be corrected.

---

## 2. Snapshot summary

As of **2026-08-17**, the project is in the **Claude Code development-package preparation phase**.

The product, domain, architecture, security, testing, deployment, roadmap, pricing, entitlement, AI-usage, guest, and localization rules have been documented and approved.

Application implementation has **not** started. There is no approved production application, infrastructure deployment, database instance, payment integration, AI-provider integration, or customer launch.

The documentation package and handoff declaration are complete. The next eligible work is the explicitly authorized implementation-preparation sequence; application implementation remains prohibited.

---

## 3. Current phase

**Phase:** Implementation preparation — implementation not authorized  
**Phase state:** Implementation-preparation ready; application implementation not authorized  
**Implementation state:** Not started; authorization not granted  
**Production state:** No production application exists  
**Customer availability:** Not launched  
**Next action:** Await owner instruction before performing `IMP-004 — Establish repository engineering baseline`.

All 28 planned Claude Code package files exist on `main` and are owner-approved. Claude Package v1.0 is formally declared with status `Implementation Preparation Ready`. Documentation-package assembly is complete, the final cross-document audit passed after its approved corrections were committed and verified, and `DOC-001` through `DOC-010` are verified. No implementation-preparation task should be performed without the owner's next instruction.

Claude Code must not infer authorization to scaffold or implement the application from the completeness of this package.

---

## 4. Permanent source of truth

The private GitHub repository is the permanent source of truth.

The working process remains:

1. draft one document;
2. owner reviews/challenges it;
3. assistant reviews the final wording;
4. owner explicitly approves it;
5. approved metadata and decisions are recorded;
6. the file is committed to `main`;
7. the repository copy is verified;
8. only then does work begin on the next file.

Local/chat drafts are not authoritative until approved, committed, and verified.

---

## 5. Approved documentation inventory

All 28 planned package files are approved, committed to `main`, and verified.

### 5.1 Core documentation — 14 files

- `docs/00_CLAUDE_RULES.md`
- `docs/01_PROJECT_VISION.md`
- `docs/02_BUSINESS_MODEL.md`
- `docs/03_MVP_PRD.md`
- `docs/04_DOMAIN_MODEL.md`
- `docs/05_SYSTEM_ARCHITECTURE.md`
- `docs/06_DATABASE_DESIGN.md`
- `docs/07_AI_ARCHITECTURE.md`
- `docs/08_PAYMENT_ARCHITECTURE.md`
- `docs/09_SECURITY_ARCHITECTURE.md`
- `docs/10_DESIGN_SYSTEM.md`
- `docs/11_TESTING_STRATEGY.md`
- `docs/12_DEPLOYMENT.md`
- `docs/13_ROADMAP.md`

### 5.2 Product rules — 5 files

- `product/PRICING_RULES.md`
- `product/ENTITLEMENTS.md`
- `product/AI_USAGE_RULES.md`
- `product/GUEST_RULES.md`
- `product/LOCALIZATION.md`

### 5.3 Project-control documents — 5 files

- `project/CURRENT_STATE.md`
- `project/TASKS.md`
- `project/BACKLOG.md`
- `project/DECISIONS.md`
- `project/CHANGELOG.md`

### 5.4 Root package files — 4 files

- `CLAUDE.md`
- `README.md`
- `.gitignore`
- `.env.example`

---

## 6. Remaining package files

No planned package file remains to be created.

The final audit corrections and handoff reconciliation were committed and verified in `fae0e60850ce12834f549a39c056a14ff92e6741`, `5b516c1593ae039a44dd03034185306e8285e83f`, and `222c5f7c5e2c935ca74a6ee2f4a81172808d2650`. `DOC-001` through `DOC-010` are verified.

The bounded read-only repository-baseline inspection `IMP-001` completed with `PASS` against commit `a81b217468cb8979d9933f7bc27740afca2d06c7` and is `VERIFIED`. The repository remains documentation/configuration only: it contains the 28 approved Claude Package v1.0 files and no application source, scaffolding, dependencies, database, migration, infrastructure, or provider configuration. No existing user application work requires preservation beyond the approved package.

The two-pass technical-candidate research for `IMP-002` completed on 2026-08-20 using current official/primary sources wherever available and is `VERIFIED`. Its reviewed result is `PASS — research requirements satisfied`. Remaining implementation-time, commercial, legal and privacy uncertainties are explicitly carried forward as selection gates rather than guessed.

Owner-approved `IMP-003` is `VERIFIED`. The initial engineering baseline is Node.js 24.19.0 LTS, Next.js 16.3.1 App Router, TypeScript 6.0.3, npm with a committed `package-lock.json`, Drizzle ORM 0.45.2, Drizzle Kit 0.31.10, PostgreSQL 18, and pg-boss 12.27.0. pg-boss supersedes the provisional Render Key Value/BullMQ queue direction; no separate Redis/Valkey service is part of the initial baseline.

Render Singapore, Render PostgreSQL in Singapore, and Amazon S3 Singapore remain provisional production baselines. Authentication, observability, transactional email, exact AI models, payment/acquiring, analytics and other unresolved specialist providers remain unselected and gated. `IMP-004 — Establish repository engineering baseline` is now the only `READY` task; readiness is not execution or application-implementation authorization.

No application implementation is authorized by this handoff state.

---

## 7. Approved product position

The approved product direction is an AI-assisted digital invitation platform that:

- launches operationally from Mauritius while remaining globally available;
- focuses the MVP on weddings;
- supports a complete host workflow from event setup through publication, sharing, guest management, and RSVP;
- uses one-time event packages rather than subscriptions;
- uses MUR as the primary/base commercial currency;
- preserves deliberate EUR/USD support through approved market-specific price books;
- supports accountless guest RSVP through private party links;
- supports English first, French second, Mauritian Kreol for Mauritius, and Russian as a required later-activated global language;
- keeps safety, security, privacy, accessibility, and factual integrity available across every package.

This summary is descriptive. Exact rules remain in the approved documents.

---

## 8. Approved package working model

The current approved entitlement catalogue uses working package names:

- Essential;
- Signature;
- Premium.

Approved event-specific allowances include:

| Entitlement | Essential | Signature | Premium |
|---|---:|---:|---:|
| Total AI concepts | 1 | 3 | 5 |
| AI refinements | 2 | 6 | 12 |
| Active invited-person capacity | 100 | 300 | 750 |
| Public hosting | 30 days | 90 days | 365 days |
| Simultaneously published invitation languages | 1 | 2 | 3 |

These allowances are approved. Final launch prices are not.

---

## 9. Pricing state

- Historical MUR figures are hypotheses only and are not approved launch prices.
- Production checkout must remain disabled until an owner-approved price book exists.
- Pricing validation must account for provider costs, taxes, refunds, payment fees, support, hosting, storage, abuse, and margin gates.
- The current working target is at least 60% normal-case contribution margin and positive stress-case contribution.
- EUR/USD checkout requires separately approved market, settlement, FX, tax, refund, compliance, and accounting treatment.
- No subscription, automatic overage billing, reusable wallet, or uncontrolled discounting is approved for MVP.

---

## 10. Payment state

Payment architecture is documented, but no provider/acquirer is finally contracted or production-enabled in this snapshot.

Candidate methods for Mauritius include:

- Visa;
- Mastercard;
- MCB Juice;
- provider-supported MauCAS QR flows, potentially including compatible apps such as SBM Tag;
- other verified local methods such as blink where commercially justified.

No method may be advertised until production availability, merchant eligibility, settlement, refund, webhook, and technical integration are verified through current official sources and provider/acquirer evidence.

The application must use provider-hosted/provider-controlled checkout and must never store raw card numbers, CVV/CVC, PINs, banking credentials, or authentication secrets.

---

## 11. AI state

AI architecture and usage rules are approved, but production providers/models remain subject to implementation-time verification and gates.

The architecture currently proposes:

- a provider-neutral text-generation adapter;
- a provider-neutral image-generation adapter;
- pinned approved models;
- structured validated output;
- decorative image generation with essential factual text rendered by the application;
- bounded retries without duplicate customer consumption;
- no silent cross-provider failover;
- versioned prompts, schemas, moderation rules, and evaluation evidence.

No production AI capability is active. Provider terms, pricing, privacy, retention, commercial rights, security, quality, cultural handling, and cost must be reverified before implementation/activation.

---

## 12. Guest-management state

Approved guest rules include:

- capacity counted per active invited person/place;
- party containers consuming no capacity;
- one private accountless link per invitation party;
- member-level `PENDING`, `ATTENDING`, and `NOT_ATTENDING` responses;
- no automatic capacity release on decline;
- host-authorized plus-one/child places;
- bounded CSV import and secure CSV export;
- no open/read surveillance by default;
- direct platform delivery activated only after provider/legal/cost review;
- post-hosting export/recovery and retention rules subject to final legal approval.

No guest records or production links currently exist.

---

## 13. Localization state

Approved direction:

- English is the canonical primary/default language;
- French is the launch-required second language;
- Mauritian Kreol (`mfe`) is required for Mauritius guest-facing invitation/RSVP content after native review;
- Russian (`ru`) is a required global product language activated only after its surface-specific quality and operational gates pass;
- interface language is never package-restricted;
- invitation content language slots are package-restricted;
- language does not determine currency, tax, country, nationality, or payment eligibility.

Translation resources, glossaries, native reviews, and localized legal copy have not yet been produced.

---

## 14. Technical implementation state

The following have not been created or selected for production:

- application codebase/scaffold;
- package manager and locked dependencies;
- exact web framework/version;
- exact database/authentication/storage/queue/hosting/observability vendors;
- database migrations;
- API/server actions;
- background workers;
- UI components/pages;
- tests and fixtures;
- CI/CD pipelines;
- runtime environments;
- DNS/domain/certificates;
- production secrets;
- monitoring dashboards/alerts;
- backups/restore evidence;
- release artifacts.

Approved architecture documents define evaluation criteria and boundaries. Claude Code must verify current official documentation and versions before locking implementation choices.

---

## 15. External verification still required

The following must use current official sources before final selection or launch:

- payment providers, acquiring bank, methods, currencies, settlement, refunds, chargebacks, and merchant eligibility;
- AI APIs/models, pricing, retention/training use, subprocessors, commercial terms, moderation, and regional availability;
- authentication, database, storage, queue, hosting, observability, email, and other vendor capabilities/pricing;
- maintained framework/runtime/library versions and security support;
- Mauritius privacy/data-protection duties and international-transfer requirements;
- Mauritius VAT/tax, invoice, receipt, international-customer, FX, settlement, and refund accounting;
- consumer terms and refund/cancellation requirements;
- domain, email authentication, accessibility, and security standards at implementation time.

Research findings must be dated, cited, and recorded in the appropriate decision/task documents.

---

## 16. Professional reviews still required

Production launch remains blocked pending appropriate qualified review of:

- Mauritius tax/accounting treatment;
- privacy/data-protection compliance and international transfers;
- customer terms, refund policy, consumer obligations, and legal notices;
- localized legal/payment disclosures;
- payment-provider/acquirer commercial and compliance obligations;
- security and penetration testing appropriate to the final architecture.

Documentation may define safe defaults, but it does not replace professional advice.

---

## 17. Security state

Security architecture is approved as a design baseline. No implementation security claim has yet been demonstrated.

Current facts:

- no production system exists to attack or certify;
- no production secrets should exist in the repository;
- no penetration test has occurred;
- no dependency scan, SAST, DAST, or infrastructure scan has occurred because implementation has not started;
- no backup/restore or incident-response drill has occurred;
- no payment or AI sandbox integration has been tested.

Production launch requires evidence that the approved controls are implemented and tested. The project must never claim to be impossible to hack.

---

## 18. Known non-MVP scope

The approved package excludes or defers major features including:

- subscriptions and stored-value wallets;
- native mobile applications;
- broad non-wedding event support;
- arbitrary design/code generation;
- AI music/video and user likeness generation;
- per-guest AI messages;
- white label;
- marketplace/referral programmes;
- advanced analytics;
- seating, meals/allergies, travel, accommodation, gifts, ticketing, and check-in;
- mandatory guest accounts/OTP;
- Kubernetes and similarly heavy orchestration for MVP;
- silent cross-provider failover;
- unsupported payment methods/currencies/markets/languages.

Deferred features belong in `project/BACKLOG.md`, not in MVP tasks unless an approved decision changes scope.

---

## 19. Current blockers

### 19.1 Documentation handoff blockers

None. The planned package, final audit, correction commit, and handoff records are complete and verified.

### 19.2 Implementation-start blockers

- `IMP-003` is verified, but `IMP-004` engineering-baseline work is ready and has not been performed;
- the pg-boss/Drizzle/PostgreSQL transaction compatibility test remains required before critical ORM-adapter reliance;
- unresolved specialist providers, provider plans, pricing, contracts, production limits, and applicable legal/privacy obligations remain subject to their approved gates;
- Claude Code Plan Mode readiness review has not occurred;
- the owner has not explicitly authorized application implementation.

### 19.3 Production-launch blockers

- final prices and market price books;
- professional legal, privacy, tax, and accounting review;
- production provider/acquirer contracts and verification;
- completed implementation and test evidence;
- security review and unresolved critical/high vulnerability closure;
- operational monitoring, backups, incident response, support, and rollback readiness;
- localization/AI/payment capability gates.

---

## 20. Immediate next actions

1. Wait for the owner's next instruction.
2. When explicitly instructed, perform only `IMP-004 — Establish repository engineering baseline`.
3. Preserve the approved exact versions and environment separation; do not configure unresolved providers or production resources.
4. Satisfy compatibility and specialist-provider gates in their existing task order.
5. Obtain separate explicit owner authorization before any application implementation begins.

---

## 21. Maintenance rules

This file must be updated when any of the following changes materially:

- active phase or next action;
- approved/committed documentation inventory;
- implementation/deployment status;
- provider/vendor selection state;
- blockers or launch gates;
- MVP boundaries;
- authoritative package/pricing/entitlement summary;
- professional review state;
- production availability.

Updates must:

- use a new snapshot date/version;
- reflect repository truth, not intention;
- link to decisions/tasks where detail belongs;
- avoid copying full specifications;
- never mark a draft, test, provider claim, or planned feature as complete;
- be committed with the change that makes the snapshot true where practical.

---

## 22. Status vocabulary

Use these states consistently:

- `NOT_STARTED` — no implementation work begun;
- `DRAFT` — written but not owner-approved/authoritative;
- `APPROVED` — owner-approved and committed;
- `IN_PROGRESS` — actively being implemented/reviewed;
- `BLOCKED` — cannot proceed until a named dependency resolves;
- `IMPLEMENTED` — code/config exists but production evidence may remain;
- `VERIFIED` — acceptance/security/operational evidence passes;
- `DEPLOYED` — present in the named environment;
- `LAUNCHED` — deliberately available to intended customers;
- `DEFERRED` — outside the current phase/MVP;
- `CANCELLED` — explicitly abandoned through an approved decision.

Do not use “done” where a more precise state is needed.

---

## 23. Evidence standard

A status claim should point to appropriate evidence, such as:

- approved file and commit SHA;
- merged implementation commit/PR;
- test/CI result;
- deployed environment/release identifier;
- provider contract/configuration evidence;
- migration/version identifier;
- professional review/approval record;
- incident/restore/rollback exercise;
- owner decision entry.

Secrets, private customer data, raw payment data, and sensitive legal/security material must not be copied into this file.

---

## 24. Approved owner decisions

### Decision 1 — Current phase

**Approved:** Record the project as documentation-package assembly, with implementation, deployment, and customer launch all not started.

### Decision 2 — Source of truth

**Approved:** Continue treating only owner-approved, GitHub-committed, verified files as authoritative; local/chat drafts remain non-authoritative.

### Decision 3 — Next file order

**Approved:** Continue with `project/TASKS.md`, then `BACKLOG.md`, `DECISIONS.md`, `CHANGELOG.md`, `CLAUDE.md`, `README.md`, `.gitignore`, and `.env.example`.

### Decision 4 — Implementation start

**Approved:** Do not start application implementation until the complete documentation package and final consistency audit are approved.

### Decision 5 — Status precision

**Approved:** Use the controlled status vocabulary in Section 22 and require evidence before claims such as verified, deployed, or launched.

### Decision 6 — Living snapshot

**Approved:** Update this file whenever phase, inventory, implementation state, provider selection, blockers, MVP boundaries, or launch readiness materially changes.

### Decision 7 — Technical selections

**Approved:** Keep final framework/vendor/version selections open until current official-source evaluations occur during implementation preparation.

### Decision 8 — Launch blockers

**Approved:** Preserve the professional, provider, pricing, testing, security, operations, and localization gates in this snapshot as production blockers until evidence resolves them.

### Decision 9 — No premature claims

**Approved:** Do not describe documented controls as implemented security, tested integrations, approved prices, or production capability before corresponding evidence exists.

### Decision 10 — Deferred scope

**Approved:** Route non-MVP ideas to `project/BACKLOG.md`; do not promote them into `TASKS.md` without a versioned approved scope decision.

---

## 25. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.6.  
**Snapshot date:** 2026-08-20.  
**Owner decisions:** Decisions 1–10 approved as proposed.
