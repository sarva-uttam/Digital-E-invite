# Changelog

**File:** `project/CHANGELOG.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.20  
**Approved date:** 2026-08-26  
**Current phase:** Application implementation — continuous, dependency-aware, task-ledger-controlled (`DEC-028`)  
**Application release status:** No application release exists

---

## 1. Purpose

This file provides a human-readable, chronological record of material changes to the approved project package and, after implementation begins, to released application versions.

It answers:

- what changed;
- when it changed;
- which project layer changed;
- whether the change affects documentation, decisions, implementation, data, operations or customers;
- which approved source or commit provides the authoritative detail;
- whether migration, action or compatibility work is required.

The changelog is an index of change, not a substitute for specifications, decision records, Git history, release notes, migration plans or incident records.

---

## 2. Current interpretation

At the date of this draft:

- the repository contains an approved documentation foundation;
- the Claude Code package is still being assembled sequentially;
- no production application has been implemented or released;
- no production technology vendor has been selected merely by appearing in an example;
- no final package price has been approved;
- no production payment method has been advertised or activated;
- no changelog entry may be interpreted as launch approval.

---

## 3. Authority

1. Git commit history is the authoritative record of exact repository changes.
2. Approved source documents are authoritative for requirements and rules.
3. `project/DECISIONS.md` is authoritative for durable decision state and supersession.
4. `project/CURRENT_STATE.md` is authoritative for the latest verified project state.
5. `project/TASKS.md` is authoritative for approved work authorization.
6. This changelog summarizes material changes and links them to those authorities.
7. If this summary conflicts with an approved source, decision or verified commit, the authoritative source wins and this file must be corrected.

---

## 4. Changelog tracks

Every entry must identify one track:

- `PACKAGE` — approved documentation, governance and Claude Code preparation;
- `APPLICATION` — implemented product behavior or code;
- `DATA` — schema, migration, retention or data-correction changes;
- `SECURITY` — security, privacy, abuse-prevention or access-control changes;
- `OPERATIONS` — deployment, infrastructure, monitoring, incident or support changes;
- `COMMERCIAL` — pricing, packages, entitlement, currency, tax, payment or refund changes;
- `CONTENT` — templates, localization, policy copy or customer-facing content changes.

Before implementation begins, entries will normally use the `PACKAGE` track. A documentation entry must never be presented as an application feature release.

---

## 5. Entry categories

Use only categories that materially help readers understand the change:

- `Added` — new approved capability, document or record;
- `Changed` — approved modification to existing behavior or rules;
- `Deprecated` — still present but scheduled for replacement or removal;
- `Removed` — approved removal;
- `Fixed` — correction of an error, inconsistency or defect;
- `Security` — security or privacy change requiring special visibility;
- `Migration` — action required to move data, configuration, providers or behavior;
- `Operations` — deployment, monitoring, support or recovery change;
- `Decision` — accepted, rejected, deprecated or superseded durable decision.

Do not add empty headings.

---

## 6. Version and date policy

### 6.1 Package versions

Until implementation is authorized, the changelog records documentation-package milestones rather than application releases.

- `Package 0.x` — incomplete development package;
- `Package 1.0` — complete owner-approved package that has passed its final consistency audit and is ready to govern implementation;
- later package versions — approved changes to the governing package.

Individual documents may reach version `1.0` while the overall package remains incomplete.

### 6.2 Application versions

Application versioning begins only after implementation is authorized. The application and documentation package may have different version numbers and must be labeled explicitly.

Use semantic versioning where it accurately communicates application compatibility:

- `MAJOR` — incompatible customer, API, data or operational behavior;
- `MINOR` — backward-compatible capability;
- `PATCH` — backward-compatible correction.

Pre-release labels may be used for internal, alpha, beta or release-candidate builds. A deployment identifier is not automatically a customer release version.

### 6.3 Dates

Use ISO 8601 calendar dates: `YYYY-MM-DD`.

An entry date represents the date the change became authoritative or was released—not the date an idea was first discussed.

---

## 7. Entry contract

Each material entry should include:

- track;
- package or application version;
- effective date;
- status (`DRAFT`, `APPROVED`, `RELEASED`, `ROLLED_BACK` or `SUPERSEDED`);
- concise change summary;
- affected documents, components or audiences;
- authoritative decision IDs where relevant;
- migration/action required, or `None`;
- commit, pull request or release link where available;
- compatibility, security or customer impact where material.

Never include secrets, private guest data, payment data, vulnerability exploitation details, personal information or confidential provider credentials.

---

## 8. 2026-08-17 — Claude Package v1.0 declaration

**Track:** PACKAGE  
**Package version:** 1.0  
**Status:** IMPLEMENTATION PREPARATION READY — APPLICATION IMPLEMENTATION AUTHORIZED, TASK-CONTROLLED  
**Application release:** None

### Completed

- Completed and owner-approved the full 28-file Claude Code documentation package.
- Completed the final cross-document audit; after the approved corrections were committed and verified, all Critical, High and Medium findings were closed and the audit passed.
- Committed the approved correction cycle in `fae0e60850ce12834f549a39c056a14ff92e6741`, `5b516c1593ae039a44dd03034185306e8285e83f`, and `222c5f7c5e2c935ca74a6ee2f4a81172808d2650`.
- Verified the corrected repository copies and confirmed that no unrelated file, application code or infrastructure was created.
- At the Package v1.0 declaration, `DOC-001` through `DOC-010` were `VERIFIED` and the read-only implementation-preparation task `IMP-001` was the only `READY` task.
- Formally declared Claude Package v1.0 with package status `Implementation Preparation Ready`.

### Implementation-preparation milestone — `IMP-001`

- Completed `IMP-001 — Inspect repository baseline` under explicitly bounded, read-only authorization; Claude Code reported `IMP-001 RESULT: PASS`.
- Verified `main` and `origin/main` at baseline commit `a81b217468cb8979d9933f7bc27740afca2d06c7`, with a clean working tree and no conflicting local artifacts, branches, tags, or stashes.
- Confirmed the repository remained documentation/configuration only, containing exactly the 28 approved package files and no application code, dependencies, infrastructure, database, migration, scaffolding, or provider configuration.
- Recorded `IMP-001` as `VERIFIED` and made only its directly dependent preparation task, `IMP-002`, `READY`.
- This milestone is not application implementation and creates no application release.

### Implementation-preparation research milestone — `IMP-002`

- Completed and independently reviewed the original and supplementary `IMP-002` research passes dated 2026-08-20; final result: `PASS — research requirements satisfied`.
- Used current official/primary sources wherever available and explicitly carried unresolved implementation-time, commercial, legal and privacy facts forward as `IMP-003` gates.
- Preserved existing approved architecture and provisional Render Singapore/S3 Singapore baselines; research recommendations remain recommendations only and no stack or provider was selected.
- Recorded `IMP-002` as `VERIFIED`; `IMP-003` remains `BLOCKED` pending explicit owner approval, and every later implementation task remains `BLOCKED`.
- No application implementation, provider configuration, production-readiness declaration, or application release occurred.

### Implementation-preparation decision milestone — `IMP-003`

- Owner approved the initial engineering stack through `IMP-003` and immutable `DEC-023`: Node.js 24.19.0 LTS, Next.js 16.3.1 App Router, TypeScript 6.0.3, npm/committed `package-lock.json`, Drizzle ORM 0.45.2, Drizzle Kit 0.31.10, PostgreSQL 18, and pg-boss 12.27.0.
- Superseded only the provisional Render Key Value/BullMQ queue direction; the initial baseline uses pg-boss/PostgreSQL and no separate Redis/Valkey service.
- Retained Render Singapore, Render PostgreSQL in Singapore, and Amazon S3 Singapore as provisional production baselines subject to all existing confirmation gates.
- Preserved WorkOS AuthKit, Sentry, Postmark, exact AI models, payment/acquiring, analytics and other specialist providers as unresolved under their existing tasks.
- Recorded `IMP-003` as `VERIFIED` and made only `IMP-004` `READY`; `IMP-004` was not performed.
- No application code, dependency installation, infrastructure, database, migration, provider configuration, production deployment or application release occurred.

### Implementation-authorization handoff

- Owner granted application implementation authorization on 2026-08-20 through immutable decision `DEC-024`.
- Authorization is task-controlled: only tasks eligible in `project/TASKS.md` may be performed, and dependencies and separate owner/provider/security/production gates remain binding.
- `IMP-004` remains the only `READY` task and was not performed by this handoff.
- Application source implementation has not started, and no application release exists.

### Still not authorized

- execution of any `BLOCKED` task;
- production deployment or customer launch;
- production provider activation or production credentials/data;
- unresolved provider selection outside its approved task and owner gate;
- final pricing publication;
- activation or advertisement of payment methods;
- production tax behavior;
- international checkout activation.

### No implementation performed by this handoff

- no application code or scaffolding;
- no dependency installation;
- no infrastructure or provider configuration;
- no database or migration creation.

### Engineering-baseline milestone — `IMP-004`

**Track:** APPLICATION  
**Application version:** 0.1.0 (unreleased)  
**Status:** VERIFIED — merged to `main`, not deployed  
**Application release:** None

- Implemented the minimal Next.js `16.3.1` App Router scaffold, strict TypeScript `6.0.3`, ESLint (`eslint-config-next`), Prettier, and Vitest, exactly matching the `DEC-023` approved stack; `package-lock.json` committed for reproducible `npm ci`.
- Added `GET /api/health`: a shallow, non-sensitive liveness endpoint returning `200` with `{status, service, time}` and no secrets, environment values, or dependency detail; covered by automated tests.
- Added a minimal server-only environment-validation baseline for non-secret baseline variables (`APP_ENV`, `LOG_LEVEL`, `DEFAULT_LOCALE`, `DEFAULT_CURRENCY`, `APP_TIMEZONE`) with safe defaults and fail-safe rejection of invalid values; provider/secret configuration remains out of scope pending `IMP-010`.
- Added a `worker/` structural placeholder establishing the web/worker boundary from `docs/05_SYSTEM_ARCHITECTURE.md`, with no job processing or business logic.
- Declared Drizzle ORM `0.45.2`, Drizzle Kit `0.31.10`, and pg-boss `12.27.0` as dependencies only; created no schema, migration, queue, or database connection.
- Verified from a clean `npm ci`: `format:check`, `lint`, `typecheck`, `test` (8/8 passing), and `build` all passed; smoke-tested the production build over HTTP.
- Final repository-side audit result: `PASS WITH NON-BLOCKING FOLLOW-UP`. The disclosed Node.js verification-host mismatch (`24.14.0` versus pinned `24.19.0`) is carried forward to exact-runtime CI verification under `IMP-005`.
- PR #1 merged by normal merge commit `1ae399202fb34ac7c760321c0b8831527c62b968`, preserving implementation commit `da9c8b7a1ddab0b0f5470fc9ed5aa5d29a99339f` in history; all 24 reviewed paths were verified on `main`.
- Recorded `IMP-004` as `VERIFIED` on `main` and changed only its direct dependent `IMP-005` to `READY`. `IMP-005` was not performed, and every later task remains `BLOCKED`.
- **Migration/action required:** None. **Compatibility/customer impact:** None — merged but not deployed, with no customer-visible change and `Application release: None`.

### CI quality-gate milestone — `IMP-005`

**Track:** OPERATIONS  
**Application version:** 0.1.0 (unreleased)  
**Status:** VERIFIED — merged; not deployed  
**Application release:** None

- Final audit verdict: `PASS WITH NON-BLOCKING FOLLOW-UP`.
- PR #2 passed GitHub-hosted `CI / quality-gate` run `32420895244` at implementation commit `839b176e6370d944a8a29bc83cab8c6ee4e3dac0` and was merged normally as `47cfb630ae85f639f2ec1106496a42c52fd7a4de`, preserving the implementation commit.
- The immediate push-to-`main` run `32421454608` also passed. Both runs verified exact Node.js `v24.19.0`, npm `11.17.0`, clean `npm ci`, format, lint, typecheck, 3/3 test files and 8/8 tests, build, `npm audit --audit-level=high`, and the narrow best-effort tracked-file secret scan.
- The dependency audit retains 4 non-blocking moderate-severity `esbuild`/`drizzle-kit` development-tooling findings. No approved dependency version was changed.
- Technical required-status-check enforcement remains unavailable for this private repository on its current plan. The interim policy remains that `CI / quality-gate` must succeed before merge; PR #2 complied.
- Recorded `IMP-005` as `VERIFIED`. Its sole dependent gate is satisfied, so `IMP-010` is `READY` but was not performed; `IMP-011` and later tasks remain blocked by their own dependencies.
- No product feature, provider configuration, database, migration, infrastructure, deployment, production resource, or customer launch occurred.
- **Migration/action required:** None. **Compatibility/customer impact:** None — merged but not deployed; `Application release: None`.

### Repository-visibility reconciliation

**Track:** SECURITY  
**Status:** VERIFIED — repository restored to private  
**Application release:** None

- During final `IMP-005` verification, GitHub was observed reporting the repository as public, contradicting the owner-controlled/private intent and existing project records.
- The owner restored the repository to private. Direct GitHub verification now reports `private: true`, `visibility: private` and default branch `main`; the connected owner account remains on GitHub Free.
- `main` remains unprotected. Required-status-check technical enforcement is not active for this private repository on the current plan, and no paid plan upgrade was authorized. Interim policy remains: no pull request may be merged into `main` unless `CI / quality-gate` succeeds.
- The current reviewed tree contains no known real secrets according to the existing CI checks. The narrow tracked-file secret scanner is best-effort: it does not prove the absence of secrets and does not establish that no historical/public access occurred.
- This record does not claim that restoring private visibility retroactively removes possible prior public access, and it does not claim that a data breach occurred.
- No application source, dependency, CI behavior, provider, database, migration, infrastructure, deployment, production credential, customer launch or application release changed through this correction.

### Configuration-boundary milestone — `IMP-010`

**Track:** APPLICATION  
**Application version:** 0.1.0 (unreleased)  
**Status:** VERIFIED — merged; not deployed  
**Application release:** None

- Final audit verdict: `PASS WITH NON-BLOCKING FOLLOW-UP`.
- Implemented through commits `f282fa3f3c883d306782b7f42d49d11bd079736a`, `f68768570e41efa636dcccca4650f609ee33d3b3`, and `8a64a6d18ecd88073510f933728b0cc7b0c5b26b`.
- PR #3 passed GitHub-hosted `CI / quality-gate` run `32505567479` and merged normally as `075f6df030484de914e6ef70a8ca412e18c83ec4`, preserving all three implementation commits.
- Immediate push-to-`main` run `32506567512` passed. Both runs verified Node.js `v24.19.0`, npm `11.17.0`, clean `npm ci`, format, lint, typecheck, 6/6 test files and 91/91 tests, build, `npm audit --audit-level=high`, and the best-effort tracked-file secret scan.
- The dependency audit retains the same 4 non-blocking moderate `esbuild`/`drizzle-kit` development-tooling findings; no dependency changed.
- Verified typed startup validation; pure shared parser and separate Next.js/worker runtime wrappers; explicit four-field public allow-list; environment-specific fail-closed invariants; and URL/origin/secret redaction coverage.
- Recorded `IMP-010` as `VERIFIED`. `IMP-020` became `READY` because its complete dependencies (`IMP-003`, `IMP-010`) are verified; it was not performed. `IMP-011`, `IMP-012`, `IMP-041`, and later tasks remain governed by unresolved dependencies and specialist gates.
- No provider selection/activation, database schema, migration, queue, infrastructure, deployment, production credential, product feature, or customer launch occurred.
- Technical required-status-check enforcement remains unavailable on the current private-repository plan; the successful CI-before-merge manual policy was followed.
- **Migration/action required:** None. **Compatibility/customer impact:** None — merged but not deployed; `Application release: None`.

### Vision V2 autonomous rebuild — PR #4 (2026-08-24)

**Track:** PACKAGE + APPLICATION  
**Application version:** 0.1.0 (unreleased)  
**Status:** MERGED — governance and catalogue reset; superseding reconciliation follows immediately below  
**Application release:** None

- Owner authorized "Vision V2": a product-direction reset toward a wedding-first, multi-occasion catalogue, a four-package Bronze/Silver/Gold/Platinum commercial ladder, and continuous autonomous implementation without routine approval pauses.
- PR #4 ("Vision V2: autonomous rebuild and invitation discovery experience") merged to `main` as `152a06061d252bf850f9d3d057fd30b4497652d2` on 2026-08-24T20:26:43Z, from branch `vision-v2-autonomous-rebuild`, 11 files changed (+1054/−558).
- Added `docs/14_OWNER_VISION_V2.md` and `project/TASKS_V2.md`; added V2 banners to `CLAUDE.md`, `docs/00_CLAUDE_RULES.md`, `project/CURRENT_STATE.md`, and `README.md`.
- Shipped real implementation, not only governance: `src/lib/catalog.ts` (8 typed occasion categories, 4 typed package tiers with placeholder `concepts` values and no price/capacity/hosting/language fields) and `src/lib/catalog.test.ts` asserting that structure; `src/app/page.tsx` rendering all 8 occasions as customer-facing cards; `src/app/layout.tsx` metadata describing the product as covering "weddings and life's meaningful moments."
- **This entry is recorded retroactively as part of the 2026-08-25 reconciliation below** — no changelog entry existed for PR #4 at merge time, which was itself a process gap (`docs/00_CLAUDE_RULES.md` §61/§81) closed by this record.
- No provider activation, database, migration, infrastructure, deployment, production credential, or customer launch occurred.

### Wedding-only, four-package reconciliation (2026-08-25)

**Track:** PACKAGE  
**Application version:** 0.1.0 (unreleased)  
**Status:** ACCEPTED — governance and product-rule documents reconciled; no deployment  
**Application release:** None

- Owner reviewed Vision V2 against the older approved three-package documentation package, identified contradictions (wedding-only vs. multi-occasion MVP scope; four packages vs. Essential/Signature/Premium; two live task ledgers), and issued new authoritative commercial decisions.
- Recorded `project/DECISIONS.md` `DEC-025` (four-package Bronze/Silver/Gold/Platinum entitlements and MUR prices: 799/1,499/2,999/5,999), `DEC-026` (MUR 15/guest capacity add-on), `DEC-027` (wedding-only MVP reaffirmed; the 8-category occasion catalogue in `src/lib/catalog.ts` retained in code but not customer-reachable), and `DEC-028` (`project/TASKS_V2.md` retired; `project/TASKS.md` is the single authoritative ledger, carrying forward the continuous/autonomous execution cadence).
- Superseded `DEC-005`, `DEC-007` in full and partially superseded `DEC-009` (four base prices only).
- Reconciled `README.md`, `project/CURRENT_STATE.md`, `docs/02_BUSINESS_MODEL.md`, `docs/03_MVP_PRD.md`, `docs/04_DOMAIN_MODEL.md`, `docs/06_DATABASE_DESIGN.md`, `docs/10_DESIGN_SYSTEM.md`, `product/PRICING_RULES.md`, `product/ENTITLEMENTS.md`, `product/AI_USAGE_RULES.md`, `product/GUEST_RULES.md`, `product/LOCALIZATION.md`, and `project/BACKLOG.md` (Section 7 extended) to the four-package structure and reaffirmed wedding-only scope, each preserving its superseded historical text per the append-only decision convention rather than silently rewriting it.
- Updated `src/lib/catalog.ts`, `src/lib/catalog.test.ts`, `src/app/page.tsx`, and `src/app/layout.tsx` so only the `wedding` occasion is customer-reachable, the four package tiers carry the approved entitlements/prices, and a guest-capacity add-on price calculator (not a real checkout) is available; the 7 non-wedding categories remain in the typed data model but are not rendered or linked.
- No production deployment, payment-provider activation, or customer launch occurred; `IMP-050`–`IMP-055` payment-integrity gates remain `BLOCKED` and unaffected.
- **Migration/action required:** None for existing verified engineering work (`IMP-004`, `IMP-005`, `IMP-010` untouched). **Compatibility/customer impact:** None — no application release exists.

### Migration-system milestone — `IMP-020` (2026-08-26)

**Track:** APPLICATION  
**Application version:** 0.1.0 (unreleased)  
**Status:** VERIFIED — merged as `1710eff1a1fa9528d018b98ad26fe4562bb97936`; not deployed  
**Application release:** None

- Established the migration system and tooling per `docs/06_DATABASE_DESIGN.md` §23: `drizzle.config.ts`, `src/db/client.ts`, `src/db/migrate.ts`, `scripts/db-migrate.mjs`, `docker-compose.yml` (disposable local PostgreSQL, pinned `postgres:18.6-alpine`), a PostgreSQL service container and four new steps in `.github/workflows/ci.yml` (migration-history check, schema-drift check, apply-to-disposable-database, database integration tests), and `src/db/test-safety.ts`/`vitest.db.config.mts` guarding the destructive test suite against ever targeting a non-disposable database.
- Scope is deliberately the tooling only: `src/db/schema/index.ts` is an empty barrel. Domain tables belong to their own dependent tasks (`IMP-021`, `IMP-022`, `IMP-023`, `IMP-050`, etc.), each already mapped to its own section of the database design document; this task does not anticipate their scope.
- Verified against current official PostgreSQL 18.0 release notes (not assumed) that PostgreSQL 18 provides a native `uuidv7()` function, satisfying `docs/06_DATABASE_DESIGN.md` §6.1's identifier strategy with no extension required.
- A pre-existing, unmerged, un-reviewed branch (`imp-020-migration-base-schema`, forked before Vision V2/PR #4 existed, no PR ever opened, no CI ever run against it) was discovered during this task. It was inspected for design quality — its migration-tooling patterns (native `uuidv7()` default, credential-free `generate`/`check`, disposable-database safety guard) independently reached the same conclusions adopted here — but it was **not merged**: it implements the full database across every domain in one unreviewed commit, which is out of this task's scope and predates the wedding-only/four-package reconciliation. It remains on the remote, untouched, for the owner's own disposal.
- **Local verification:** `format:check`/`lint`/`typecheck`/`test`/`build` pass (only the pre-existing, already-documented Windows `core.autocrlf`/`server-only` local-checkout artifacts present; staged git blobs confirmed LF); `drizzle-kit generate`/`check` pass against the empty schema (no DB connection required); `npm audit --audit-level=high` reports only the 4 pre-existing moderate findings; secret scan clean.
- **Not locally verified:** Docker Desktop's daemon is unavailable in this environment, so the live-database steps (`db:migrate`, `test:db`) could not run locally.
- **Live/CI verification — 2026-08-26:** the first CI run failed `Format check` for real on `src/db/migrations/meta/_journal.json` (drizzle-kit's generated JSON did not match this repo's Prettier style); fixed in `e52133b122123f8f9a8c79f47c71238075a5b915`. The corrected run ([`32904136112`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32904136112)) passed all steps, including the four new IMP-020 steps against a real disposable PostgreSQL 18 container — migration-history check, schema-drift check, applying migrations, and database integration tests (PostgreSQL major version 18 confirmed, `uuidv7()` confirmed callable, idempotent re-apply confirmed). PR #6 merged normally as `1710eff1a1fa9528d018b98ad26fe4562bb97936`; the push-to-`main` run ([`32904336343`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32904336343)) also passed.
- No provider activation, production database, production credential, or production/staging resource was created.
- **Migration/action required:** None yet — no domain table exists to migrate data into. **Compatibility/customer impact:** None — no application release exists.

### Append-only audit and outbox milestone — `IMP-022` (2026-08-26)

**Track:** APPLICATION  
**Application version:** 0.1.0 (unreleased)  
**Status:** IMPLEMENTED — pull request open; merge/CI evidence to follow

- Added the first real domain tables per `docs/06_DATABASE_DESIGN.md` §16: `outbox_events` (transactional outbox, unique `deduplication_key`), `job_executions` (execution history, FK to `outbox_events`), `audit_events` (append-only). Added the §19-specified indexes for both operational tables.
- `audit_events.actor_account_id`/`event_id` are deliberately plain `uuid` columns without a foreign-key constraint yet — the referenced `accounts`/`events` tables belong to `IMP-021`, which remains `BLOCKED` on the unresolved authentication decision (`IMP-013`); adding the constraint is `IMP-021`'s job once those tables exist. Disclosed, not silent.
- Append-only enforcement uses a raw-SQL `BEFORE UPDATE OR DELETE` trigger on `audit_events` rather than a separate database role (role separation is a deployment-topology decision this repository hasn't made yet) — role-independent enforcement of the same invariant.
- New behavioral tests (`src/db/schema/operations.db.test.ts`) against a real database: dedup-key rejection and `ON CONFLICT DO NOTHING` safe replay, job-execution FK behavior, and audit insert-succeeds/update-rejected/delete-rejected.
- **Not locally verified:** as with `IMP-020`, Docker Desktop's daemon is unavailable in this environment; GitHub Actions' PostgreSQL service container is the first live verification of these tests.
- No provider activation, production database, production credential, or production/staging resource was created.
- **Migration/action required:** None — this is the first migration introducing tables; nothing pre-existing to migrate. **Compatibility/customer impact:** None — no application release exists.

## 9. 2026-08-17 — Documentation foundation

**Track:** PACKAGE  
**Package version:** 0.x  
**Status:** APPROVED INCREMENT  
**Application release:** None  
**Migration/action required:** None; documentation only

### Added

#### Governance and vision

- Added and approved `docs/00_CLAUDE_RULES.md`, establishing the engineering constitution, sequential approval workflow, source-of-truth rules, evidence requirements and implementation boundaries.  
  Commit: `bf57002108d6fd758fb6eab1a4cc2c6c4c54c7b7`
- Added and approved `docs/01_PROJECT_VISION.md`, defining the customer problem, global vision, Mauritius launch context, wedding MVP and product principles.  
  Commit: `7835c9312a2edfa8d4796c66cead5114238f02a0`

#### Product and commercial definition

- Added and approved `docs/02_BUSINESS_MODEL.md`, establishing one-time event packages, tier principles and commercial guardrails.  
  Commit: `302057a97b6c9569426e80b1aaf202b693706657`
- Added and approved `docs/03_MVP_PRD.md`, defining the weddings-only MVP workflow, roles, functional requirements, exclusions and acceptance boundaries.  
  Commit: `732271994ace62cfdb452361b164335b106fc7c2`
- Added and approved `product/PRICING_RULES.md`, preserving MUR as the base currency, treating final prices as pending and defining controlled price-book behavior.  
  Commit: `4d5ffb4b2ab1175758112973399db14eafdfc469`
- Added and approved `product/ENTITLEMENTS.md`, defining event-scoped package snapshots, tier limits, hosting periods, language slots and explicit capacity expansion.  
  Commit: `cc90d355aca81a6f4265bf6bc5e6f723a95069c9`
- Added and approved `product/AI_USAGE_RULES.md`, defining bounded AI actions, allowances, validation, safety and cost controls.  
  Commit: `e6b369e7a6c4c7c1c85d58550b3f2f18db992a89`
- Added and approved `product/GUEST_RULES.md`, defining private party-token access, RSVP behavior, guest privacy and capacity enforcement.  
  Commit: `37270f77964152f01f78573a193dde2bdb6a3ea7`
- Added and approved `product/LOCALIZATION.md`, defining English, French, Mauritian Kreol and Russian planning and activation boundaries.  
  Commit: `3ad096dd72a02ba5b9d7fa3a977425ba911baa5a`

#### Domain and architecture

- Added and approved `docs/04_DOMAIN_MODEL.md`, defining core entities, invariants, lifecycle concepts and domain boundaries.  
  Commit: `f19ef4ac5327df8e20eca330f94bf5878d437def`
- Added and approved `docs/05_SYSTEM_ARCHITECTURE.md`, defining the approved modular-monolith/runtime framework direction, provider adapters, and unresolved provider boundaries.  
  Commit: `b0e6b518eed96e49e8a09e220d28d919076a2218`
- Added and approved `docs/06_DATABASE_DESIGN.md`, defining logical persistence, history, money, entitlement, audit and access-control requirements without selecting a database provider.  
  Commit: `1e2abdc26bcf5434540c2558b468bb0f46ca8897`
- Added and approved `docs/07_AI_ARCHITECTURE.md`, selecting initial OpenAI text and Replicate image adapter baselines while preserving bounded orchestration, evaluation gates, and no silent cross-provider failover.  
  Commit: `1cea899a2d82ffb18a70b90ab87ec4eeac9abb3f`
- Added and approved `docs/08_PAYMENT_ARCHITECTURE.md`, defining hosted checkout, verified payment truth, MUR base currency, controlled EUR/USD support, local-method verification and professional tax review.  
  Commit: `1630e31b1da3656150252b157d446fc7331705c0`
- Added and approved `docs/09_SECURITY_ARCHITECTURE.md`, defining defense in depth, authorization, secrets, audit, payment security, privacy and production security gates.  
  Commit: `a834cb933aa71574e52f61f1ac85e581456ec3b8`
- Added and approved `docs/10_DESIGN_SYSTEM.md`, defining mobile-first, accessible, localized and controlled design behavior.  
  Commit: `f651482f28804fe5cfcbedf0d9aea9c8dbbd1ab1`
- Added and approved `docs/11_TESTING_STRATEGY.md`, defining risk-based testing, release gates, security coverage and evidence requirements.  
  Commit: `de9e3fa07f5c8334198f9ac0f9b934c39f599032`
- Added and approved `docs/12_DEPLOYMENT.md`, defining safe managed deployment principles, environments, rollback, recovery and explicit exclusion of Kubernetes from MVP.  
  Commit: `24d0cc1008bf4bdf25abc0df670d3e2bf6ec9918`
- Added and approved `docs/13_ROADMAP.md`, defining controlled sequencing from documentation through validation, launch and evidence-gated growth.  
  Commit: `2972125c3022d262767b443aa0942d6f50e61eb5`

#### Project control

- Added and approved `project/CURRENT_STATE.md`, recording verified documentation progress, unresolved choices and the prohibition on premature implementation.  
  Commit: `262455a969a5148c4725c864fb912b40acdd8d21`
- Added and approved `project/TASKS.md`, defining authorized work, gates, dependencies and completion evidence.  
  Commit: `690b0a45e4d4243ce7060f6984f01a32f041e3be`
- Added and approved `project/BACKLOG.md`, recording 73 non-authoritative deferred candidates, rejected directions and promotion rules.  
  Commit: `a57dd22edd4a40e6564c8e08dd0fac2fc4808756`
- Added and approved `project/DECISIONS.md`, recording 22 accepted foundational decisions, rejected directions, pending decisions and explicit supersession rules.  
  Commit: `7c4337214b051ceedf8c7e675663c1d4af33e3cc`

### Decision

- Accepted GitHub as the permanent source of truth and sequential owner approval as the only path from draft to authoritative documentation (`DEC-001`).
- Kept implementation blocked until package completion and final consistency audit (`DEC-002`).
- Established Mauritius as the initial operating market without geographically restricting global access (`DEC-003`).
- Limited MVP scope to weddings (`DEC-004`).
- Established one-time Essential, Signature and Premium event packages instead of subscriptions (`DEC-005`).
- Required the complete core workflow and universal security, privacy and accessibility baseline in every tier (`DEC-006`, `DEC-021`).
- Approved bounded package dimensions and prohibited automatic overages (`DEC-007`, `DEC-008`).
- Kept final prices undecided and preserved provider abstraction while allowing specialist documents to approve initial/provisional baselines subject to exact-model, compatibility, legal/privacy, contract and production gates (`DEC-009`, clarified `DEC-014`).
- Established MUR as base currency with gated EUR/USD price books (`DEC-010`).
- Required hosted checkout, server-verified payment truth and production verification of every advertised payment method (`DEC-011`, `DEC-012`).
- Required qualified Mauritius accounting/tax approval before production launch (`DEC-013`).
- Excluded Kubernetes from MVP (`DEC-015`).
- Established accountless, private party-token RSVP and rejected default read/open tracking (`DEC-016`, `DEC-017`).
- Bounded AI assistance and prohibited silent cross-provider failover (`DEC-018`, `DEC-019`).
- Established language priorities and activation gates (`DEC-020`).
- Required durable commercial, entitlement, payment, audit and decision history (`DEC-022`).

### Security

- Established that the application must never store, process or log raw card numbers, CVV/CVC, PINs, banking credentials or payment authentication secrets.
- Required authenticated and idempotent payment webhooks, server-side amount/currency verification and reconciliation.
- Established private party tokens as bearer secrets that must not appear in logs or analytics.
- Required all security-sensitive limits and permissions to be enforced server-side.
- Prohibited launch with a known unresolved critical or high-severity payment-security vulnerability.

### Commercial

- Established package capacities of 100, 300 and 750 guests.
- Established concept allowances of 1, 3 and 5 and refinement allowances of 2, 6 and 12.
- Established 30, 90 and 365 days of hosting from first publication, with first publication normally required within 180 days of purchase.
- Established 1, 2 and 3 invitation-language slots.
- Preserved historical rupee price figures as unapproved hypotheses.
- Required explicit add-ons or capacity packs rather than automatic overage charges.

### Corrected assumptions

- Removed premature commitment to named framework, database, authentication, AI, payment and hosting vendors.
- Clarified that global availability does not automatically mean international checkout, tax readiness or support coverage.
- Clarified that SBM Tag must not be assumed to expose a standalone online-payment API.
- Clarified that external payment methods may not be advertised before production verification.
- Clarified that business-level income or corporate tax is not automatically a customer checkout charge.
- Clarified that Russian is planned but not automatically activated without readiness gates.

### Compatibility and customer impact

- No application compatibility impact: no application release exists.
- No customer migration: no production customer data exists under this package.
- No advertised price or payment-method change: neither has been approved for production.

---

## 10. Rollback and correction entries

If a released change is rolled back:

- preserve the original entry;
- add a new dated `ROLLED_BACK` entry;
- identify the affected release and reason at a safe disclosure level;
- link the rollback commit or deployment record;
- state remaining data, security or customer impact;
- record follow-up work in `project/TASKS.md`.

If this changelog contains an error, correct it transparently under `Fixed`. Do not rewrite the surrounding history to hide the mistake.

Security-sensitive corrections must reveal enough for accountability without publishing exploitable operational detail.

---

## 11. Relationship to customer release notes

This internal changelog may contain architectural, governance and operational information unsuitable or irrelevant for customers.

When application releases begin:

- derive concise customer release notes from approved changelog entries;
- describe customer-visible outcomes in plain language;
- separate fixes, improvements and required actions;
- disclose breaking changes and migrations prominently;
- do not expose security weaknesses, private data or confidential provider information;
- localize release notes only for activated and reviewed locales.

Customer release notes must never claim a capability that is merely documented, flagged off, unverified, staged or pending rollout.

---

## 12. Approved owner decisions

### Decision 1 — Separate package and application versions

**Approved:** Maintain distinct labels for documentation-package versions and application-release versions so document approval cannot be mistaken for a shipped product feature.

### Decision 2 — Package 1.0 gate

**Approved:** Reserve `Package 1.0` for the complete owner-approved repository package after the final cross-document consistency audit; individual version-1.0 documents do not make the package complete.

### Decision 3 — Material changes only

**Approved:** Record material approved changes, decisions, releases, migrations, security changes, rollbacks and corrections; leave routine wording, formatting and mechanical edits to Git history unless they change meaning.

### Decision 4 — Changelog authority boundary

**Approved:** Treat this changelog as a summary. Git history, approved specifications and the decision register remain authoritative when exact details differ.

### Decision 5 — No retroactive rewriting

**Approved:** Preserve historical entries. Correct errors or changed decisions with new dated entries and explicit supersession or rollback records rather than silently rewriting history.

### Decision 6 — Security disclosure boundary

**Approved:** Record security significance, affected scope and remediation status without publishing secrets, personal data or operational exploit instructions.

### Decision 7 — Migration visibility

**Approved:** Require every breaking data, API, configuration, provider or customer-behavior change to state the required migration, owner, readiness gate and rollback path.

### Decision 8 — Release truth

**Approved:** Add an application change under `RELEASED` only after deployment and verification in the intended environment; merged, staged, flagged-off or documented work is not automatically released.

### Decision 9 — Customer release notes

**Approved:** Derive customer-facing release notes from approved released entries, using plain language and activated locales, without exposing confidential or security-sensitive details.

### Decision 10 — Documentation foundation entry

**Approved:** Approve the 2026-08-17 entry as the initial package history while explicitly recording that it represents documentation progress only and that no application release exists.

---

## 13. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.17.  
**Approved date:** 2026-08-25.  
**Owner decisions:** Decisions 1–10 approved as proposed; the `IMP-004`, `IMP-005`, and `IMP-010` entries recorded under Decision 8 as `VERIFIED`, merged, and undeployed. `IMP-020` is `READY` by dependency reconciliation only and has not started. The Vision V2 rebuild (PR #4) and the wedding-only/four-package reconciliation (`DEC-025`–`DEC-028`) are recorded under Section 8.
