> **Current authority update — 2026-08-25:** The MVP is reconciled as **wedding-only** with a **four-package Bronze/Silver/Gold/Platinum** commercial ladder and owner-approved entitlements/prices (`project/DECISIONS.md` `DEC-025`–`DEC-028`). Continuous, dependency-aware implementation remains authorized without routine approval pauses. `project/TASKS_V2.md` is retired; `project/TASKS.md` is the single authoritative ledger. Production launch, paid provider activation, real credentials/customer data, legal commitments, and destructive operations remain hard stops.

# Current State

**File:** `project/CURRENT_STATE.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.18  
**Snapshot date:** 2026-08-26  
**Repository:** `monsieur-zordi/Digital-E-invite`  
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

As of **2026-08-21**, the project is in the **task-controlled application implementation phase**.

The product, domain, architecture, security, testing, deployment, roadmap, pricing, entitlement, AI-usage, guest, and localization rules are documented and approved.

`IMP-004`, `IMP-005`, and `IMP-010` are implemented, merged, and verified on `main`. PR #3 merged the configuration/environment boundaries by normal merge commit `075f6df030484de914e6ef70a8ca412e18c83ec4`; GitHub-hosted PR run `32505567479` and immediate push-to-`main` run `32506567512` passed. No product feature, database schema, migration, provider activation, infrastructure deployment, payment/AI integration, production application, application release, or customer launch exists.

---

## 3. Current phase

**Phase:** Application implementation — authorized and task-controlled  
**Phase state:** Owner authorization granted; task-ledger dependencies and gates remain binding  
**Implementation state:** `IMP-004`, `IMP-005`, and `IMP-010` are verified and merged; no product feature or downstream task has started  
**Production state:** No production application exists; production deployment is unauthorized  
**Customer availability:** Not launched  
**Next action:** `IMP-020 — Create migration system and base schema` is `IMPLEMENTED` (migration tooling only; schema intentionally empty pending `IMP-021`+) with a pull request open; `IMP-021`/`IMP-022`/`IMP-050` become the next candidates once it merges, though `IMP-021` remains additionally `BLOCKED` by `IMP-013` (unresolved authentication decision).

All 28 planned Claude Code package files exist on `main` and are owner-approved. Claude Package v1.0 is formally declared with status `Implementation Preparation Ready`. Documentation-package assembly is complete, the final cross-document audit passed after its approved corrections were committed and verified, and `DOC-001` through `DOC-010` are verified. Owner decision `DEC-024` grants task-controlled application implementation authorization; only `READY` tasks may be performed.

Claude Code must use `project/TASKS.md` as the execution gate and must not infer authorization for any `BLOCKED` task from the completeness of this package or the general implementation authorization.

**Repository visibility and branch enforcement:** GitHub reports `private: true`, `visibility: private`, default branch `main`, on the connected owner's GitHub Free plan. `main` is not protected, and technical required-status-check enforcement is not active. No paid plan upgrade was authorized. Interim policy remains: no pull request may be merged into `main` unless `CI / quality-gate` succeeds.

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

Render Singapore, Render PostgreSQL in Singapore, and Amazon S3 Singapore remain provisional production baselines. Authentication, observability, transactional email, exact AI models, payment/acquiring, analytics and other unresolved specialist providers remain unselected and gated.

Application implementation is authorized by owner decision `DEC-024` only through eligible tasks in `project/TASKS.md`. `IMP-004`, `IMP-005`, and `IMP-010` are `VERIFIED` and merged. PR #3 preserved all three IMP-010 implementation commits through normal merge commit `075f6df030484de914e6ef70a8ca412e18c83ec4`; GitHub-hosted PR run `32505567479` and post-merge `main` run `32506567512` succeeded. `IMP-020` is `READY` by dependency reconciliation only and has not started. No product feature, database schema, migration, provider configuration, infrastructure deployment, or application release exists.

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

The current approved entitlement catalogue uses four package names (`DEC-025`, superseding the earlier Essential/Signature/Premium three-tier model):

- Bronze;
- Silver;
- Gold;
- Platinum.

Approved event-specific allowances and base MUR prices include:

| Entitlement | Bronze | Silver | Gold | Platinum |
|---|---:|---:|---:|---:|
| Total AI concepts | 1 | 2 | 3 | 5 |
| AI refinements | 2 | 4 | 8 | 12 |
| Active invited-person capacity | 75 | 150 | 300 | 750 |
| Public hosting | 90 days | 180 days | 365 days | 545 days |
| Simultaneously published invitation languages | 1 | 2 | 3 | 4 |
| Price (MUR) | 799 | 1,499 | 2,999 | 5,999 |

These allowances and the four base MUR prices are approved (`DEC-025`). Additional guest capacity is available as an explicit MUR 15/guest add-on (`DEC-026`); the checkout mechanism itself remains gated behind payment-provider selection. EUR/USD price books, discounts, and refund rules remain undecided.

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

Implemented and verified on `main` through PR #1 (`IMP-004`):

- minimal application codebase/scaffold (Next.js `16.3.1` App Router, `src/app`, `src/lib`, `worker/src`);
- package manager and locked dependencies (npm, committed `package-lock.json`, reproducible `npm ci`);
- exact web framework/runtime versions per `DEC-023` (Next.js `16.3.1`, TypeScript `6.0.3` strict, Node.js engines `24.19.0`);
- developer tooling: ESLint, Prettier, Vitest, deterministic npm scripts (`dev`, `build`, `start`, `lint`, `typecheck`, `format`, `format:check`, `test`);
- one non-sensitive route (`GET /api/health`) and automated tests (8/8 passing);
- a minimal server-only environment-validation baseline for non-secret baseline variables only.

Implemented and verified on `main` through PR #2 (`IMP-005`):

- `.github/workflows/ci.yml` — a single `CI`/`quality-gate` workflow triggered on `pull_request` to `main` and `push` to `main`, least-privilege `contents: read` permissions, SHA-pinned `actions/checkout`/`actions/setup-node`, exact Node.js `v24.19.0` runtime verification, and the clean-environment `npm ci` → `format:check` → `lint` → `typecheck` → `test` → `build` sequence;
- an `npm audit --audit-level=high` merge gate (4 pre-existing moderate-severity `esbuild`/`drizzle-kit` dev-tooling findings do not block it);
- `scripts/secret-scan.sh` — a narrow, dependency-free, best-effort scan of tracked files for known secret-shaped patterns, used because GitHub-native secret scanning is unavailable on this private repository's plan.

Implemented and verified on `main` through PR #3 (`IMP-010`):

- `src/lib/config.ts` — framework-agnostic typed configuration boundary. Its parser, `parseServerEnv(source)`, takes no default and reads no real environment on its own (enforced by a static source-text test, an arity test, and a `@ts-expect-error` compile-time test), so an accidental direct import cannot read server secrets. `src/lib/env.ts` (Next.js, `server-only`-guarded) and `worker/src/config.ts` (relative import, no `server-only`) each expose their own `process.env`-defaulting wrapper (`loadServerEnv`/`loadWorkerEnv`) that delegates to it;
- `src/instrumentation.ts` — the current official Next.js startup hook (`register()`), scoped to the Node.js runtime, importing from `./lib/env` (not `./lib/config` directly) so real configuration loading always goes through the protected boundary; validates configuration once per server instance and fails startup on invalid configuration (verified live: invalid `APP_ENV` and invalid `PAYMENT_MODE` each make every request return `500` until corrected, with the `src_lib_env_ts_*` compiled chunk confirming the protected import path);
- typed, validated fields: `APP_NAME`, `APP_URL`/`PUBLIC_APP_URL` (http/https only, no embedded credentials), `APP_TIMEZONE` (real IANA zone), `DEFAULT_CURRENCY`/`PAYMENT_BASE_CURRENCY`/`PAYMENT_SUPPORTED_CURRENCIES`, `ALLOWED_ORIGINS` (http/https only, no embedded credentials), `TRUSTED_PROXY_COUNT`, `PAYMENT_MODE` (rejects `live` unless `APP_ENV=production`), `DATABASE_URL`/`DATABASE_DIRECT_URL`/`DATABASE_SSL_MODE`/`DATABASE_POOL_MIN`/`MAX`, the 8 `ENABLE_*` feature flags, `APP_SECRET`/`ENCRYPTION_KEY`/`TOKEN_HASH_KEY`, `TEST_DATABASE_URL`/`E2E_BASE_URL`; production/preview require `APP_URL`/`PUBLIC_APP_URL`/`ALLOWED_ORIGINS`; `ENABLE_PAYMENTS`/`ENABLE_EUR_CHECKOUT`/`ENABLE_USD_CHECKOUT` fail closed without their generic (non-provider) prerequisite, and `ENABLE_EUR_CHECKOUT`/`ENABLE_USD_CHECKOUT` additionally require `ENABLE_PAYMENTS=true`;
- provider-specific fields (auth/storage/AI/payment-provider/email/cache/queue/observability) remain an opaque, server-only, blank-normalized bag — no provider selected, contacted, or initialized;
- `toPublicConfig()` — a 4-field explicit allow-list (`defaultLocale`, `defaultCurrency`, `appTimezone`, `publicAppUrl`); no `NEXT_PUBLIC_*` variable was introduced; `GET /api/health` is unchanged;
- test count grew from 8 to 91 across 6 files (56 at first implementation, +28 from the first independent-review correction, +7 from a second correction that removed a residual gap where a credential-bearing `APP_URL`/`PUBLIC_APP_URL`/`ALLOWED_ORIGINS` value could still be echoed in its error if it failed the scheme check, or the URL constructor itself, before reaching the credentials check), including canary-secret non-disclosure, embedded-credential non-disclosure, and public-config allow-list tests.

Verification evidence: PR #3 merged normally as `075f6df030484de914e6ef70a8ca412e18c83ec4`; GitHub-hosted PR run `32505567479` and push-to-`main` run `32506567512` passed with Node.js `v24.19.0`, npm `11.17.0`, clean install, format, lint, typecheck, 6/6 test files, 91/91 tests, build, the high/critical dependency-audit gate, and the best-effort tracked-file secret scan.

Still not created or selected for production:

- exact database/authentication/storage/queue/hosting/observability vendor activation;
- database schema and migrations;
- API/server actions beyond the health check;
- worker job processing (pg-boss wiring);
- UI components/pages beyond the placeholder homepage;
- runtime environments beyond local development;
- DNS/domain/certificates;
- production secrets;
- monitoring dashboards/alerts;
- backups/restore evidence;
- release artifacts.

Approved architecture documents define evaluation criteria and boundaries. Claude Code must verify current official documentation and versions before locking further implementation choices.

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
- the current reviewed repository tree contains no known real secrets according to the existing checks; the narrow tracked-file scanner is best-effort, does not prove the absence of secrets, and does not prove that no historical/public exposure occurred;
- no penetration test has occurred;
- CI dependency auditing is active; no SAST, DAST, or infrastructure scan has yet occurred;
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

### 19.2 Implementation-task gates

- `IMP-020` is `IMPLEMENTED`, pull request open, pending merge/CI evidence;
- `IMP-021` will remain `BLOCKED` by `IMP-013` even after `IMP-020` merges;
- `IMP-011` remains `BLOCKED` by the unresolved observability decision;
- `IMP-012` remains `BLOCKED` by the unresolved authentication decision;
- `IMP-041` remains `BLOCKED` by `IMP-040`;
- the pg-boss/Drizzle/PostgreSQL transaction compatibility test remains required before critical ORM-adapter reliance;
- unresolved specialist providers, provider plans, pricing, contracts, production limits, and applicable legal/privacy obligations remain subject to their approved gates.

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

1. Preserve `IMP-010` verification evidence and the repository's private state.
2. Merge the open `IMP-020` pull request once its CI passes, then record final merge/CI evidence in `project/TASKS.md`.
3. Keep `IMP-011`, `IMP-012`, `IMP-021`, `IMP-041`, and all other blocked tasks blocked until every recorded dependency and specialist decision is satisfied.
4. Preserve the approved exact versions and environment separation; do not configure unresolved providers or production resources.
5. Maintain the manual policy that `CI / quality-gate` must pass before merge while technical enforcement is unavailable.

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
**Approved version:** 1.18.  
**Snapshot date:** 2026-08-26.  
**Owner decisions:** Decisions 1–10 approved as proposed; `IMP-004`, `IMP-005`, and `IMP-010` are recorded `VERIFIED` under Decisions 5/6/9. `IMP-020` is `IMPLEMENTED` (migration system/tooling; schema intentionally empty pending `IMP-021`+), pull request open. Package model reconciled to wedding-only, four-tier Bronze/Silver/Gold/Platinum per `DEC-025`–`DEC-028`.
