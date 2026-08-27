# Tasks

**File:** `project/TASKS.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.23  
**Approved date:** 2026-08-26  
**Current phase:** Application implementation — authorized, continuous, dependency-aware (`DEC-028`)  
**Application implementation authorization:** GRANTED — this is the single authoritative execution ledger (`project/TASKS_V2.md` retired); ordinary dependency-safe tasks may proceed continuously without a routine approval pause, subject to unchanged hard stops

---

## 1. Purpose

This file is the authoritative ordered work queue for the current project scope.

It translates the approved documentation into small, reviewable tasks with dependencies, acceptance evidence, and explicit gates. It is not a wish list; deferred ideas belong in `project/BACKLOG.md`.

Claude Code must work from the highest-priority unblocked task, complete and verify it, update this ledger and `CURRENT_STATE.md` when materially necessary, then continue to the next dependency-safe `READY` task without a routine approval pause (`DEC-028`) — stopping only at a named hard-stop condition (`CLAUDE.md`, `docs/00_CLAUDE_RULES.md`) or when no task is `READY`.

---

## 2. Task states

- `NOT_STARTED` — no work begun;
- `READY` — dependencies satisfied and approved to start;
- `IN_PROGRESS` — actively being worked;
- `BLOCKED` — named dependency unresolved;
- `IN_REVIEW` — implementation/evidence awaiting review;
- `IMPLEMENTED` — code/config exists but verification may remain;
- `VERIFIED` — acceptance evidence passes;
- `DEFERRED` — outside the current phase/MVP;
- `CANCELLED` — removed through an approved decision.

Only one ordinary implementation task should be `IN_PROGRESS` at a time unless independent parallel work is explicitly approved.

---

## 3. Priority levels

- `P0` — required for the current phase or blocks most downstream work;
- `P1` — required for MVP/launch but not the immediate critical path;
- `P2` — valuable hardening or operational work required before launch according to its gate;
- `P3` — deferred/post-MVP; normally belongs in the backlog.

Priority does not override dependencies, safety, or approval gates.

---

## 4. Task record contract

Every task must contain or link to:

- stable task ID;
- title and bounded outcome;
- state and priority;
- dependencies;
- governing documents/decisions;
- implementation notes where necessary;
- acceptance criteria;
- evidence/commit/PR/test/deployment references;
- blockers and owner decision where applicable.

A task is not verified because code compiles. Verification requires the acceptance evidence specified for that task.

---

## 5. Execution rules

1. Read `CLAUDE.md`, `project/CURRENT_STATE.md`, this file, and every governing approved document before implementation.
2. Never begin an implementation task while the documentation handoff gate is blocked.
3. Research current external facts from official primary sources before vendor, framework, version, price, legal, payment, AI, or hosting decisions.
4. Record durable technical/product decisions in `project/DECISIONS.md`.
5. Keep changes small, reviewable, tested, and reversible.
6. Do not weaken a specification merely to make a test pass.
7. Do not add deferred scope opportunistically.
8. Never store real secrets or personal/customer data in source control or fixtures.
9. Update task state only when repository evidence makes the new state true.
10. Stop and request owner direction when a choice materially changes cost, scope, customer promise, data handling, security, or launch risk.

---

## 6. Current documentation-package tasks

These completed tasks established the documentation-package handoff.

### DOC-001 — Approve and commit `project/TASKS.md`

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** approved `project/CURRENT_STATE.md`  
**Outcome:** establish the ordered execution ledger.

**Acceptance criteria:**

- owner reviews all proposed task sequencing and decisions;
- status/version/date and decisions are finalized;
- file is committed to `main`;
- repository file and commit SHA are verified;
- `project/BACKLOG.md` was subsequently approved, committed, and verified.

**Evidence:** owner approval and verified GitHub commit/file history for `project/TASKS.md`.

### DOC-002 — Create `project/BACKLOG.md`

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-001 verified  
**Outcome:** capture deferred/non-MVP ideas without allowing scope leakage.

**Acceptance criteria:**

- backlog categories and item contract defined;
- approved deferred features captured;
- promotion/removal rules defined;
- no item is represented as committed MVP scope;
- owner approval, commit, and verification complete.

### DOC-003 — Create `project/DECISIONS.md`

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-002 verified  
**Outcome:** create the durable architectural/product decision log.

**Acceptance criteria:**

- decision-record schema defined;
- approved foundational decisions summarized with source links;
- supersession and pending-decision rules defined;
- no invented decision dates/evidence;
- owner approval, commit, and verification complete.

### DOC-004 — Create `project/CHANGELOG.md`

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-003 verified  
**Outcome:** establish a human-readable package/product change history.

**Acceptance criteria:**

- changelog convention and categories defined;
- documentation-package baseline recorded accurately;
- future release/version rules defined;
- owner approval, commit, and verification complete.

### DOC-005 — Create root `CLAUDE.md`

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-004 verified  
**Outcome:** provide Claude Code with concise repository-specific operating instructions.

**Acceptance criteria:**

- precedence/read order defined;
- task workflow and stop conditions defined;
- commands are not fabricated before tooling selection;
- security, testing, migration, decision, and scope rules reference approved documents;
- owner approval, commit, and verification complete.

### DOC-006 — Update root `README.md`

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-005 verified  
**Outcome:** accurately describe the repository and its pre-implementation status.

**Acceptance criteria:**

- product purpose and status stated honestly;
- documentation map/read order included;
- no unsupported launch, price, provider, or security claims;
- future setup section clearly marked pending until implementation;
- owner approval, commit, and verification complete.

### DOC-007 — Create `.gitignore`

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-006 verified; implementation tooling direction sufficiently known  
**Outcome:** establish safe repository hygiene without hiding required source files.

**Acceptance criteria:**

- secrets/env files, local overrides, logs, coverage, build output, caches, OS/editor artifacts excluded;
- `.env.example`, migrations, lockfiles, and required fixtures remain trackable;
- no broad rule hides important project files;
- owner approval, commit, and verification complete.

### DOC-008 — Create `.env.example`

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-007 verified; provider variables documented generically  
**Outcome:** define a safe, secret-free environment-variable contract.

**Acceptance criteria:**

- placeholders contain no real credentials;
- variables grouped by responsibility/environment;
- required/optional/server-only/public exposure documented;
- provider-specific names are included only when selected or explicitly marked provisional;
- rotation/validation guidance included;
- owner approval, commit, and verification complete.

### DOC-009 — Final package consistency audit

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-001 through DOC-008 verified  
**Outcome:** certify the documentation package is internally consistent enough to start implementation.

**Acceptance criteria:**

- every required path exists;
- statuses, versions, dates, names, quantities, languages, currencies, scope, and dependencies agree;
- links/references resolve;
- drafts/placeholders/TODOs are intentional and identified;
- provider/version claims requiring fresh verification are labelled;
- security/legal/tax limitations remain explicit;
- `CURRENT_STATE.md`, `TASKS.md`, `DECISIONS.md`, and `CHANGELOG.md` reflect repository truth;
- owner explicitly approves the audit verdict and correction set; this does not authorize application implementation.

### DOC-010 — Mark documentation handoff complete

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-009 verified and owner approval  
**Outcome:** change the project from documentation assembly to implementation preparation.

**Acceptance criteria:**

- `CURRENT_STATE.md` updated/versioned;
- DOC-001–DOC-009 evidence recorded;
- `IMP-001`, the repository-baseline implementation-preparation task, becomes `READY`; application-building tasks remain `BLOCKED`;
- no production launch claim is made;
- changes committed and verified.

---

## 7. Implementation gate

All tasks from Section 8 onward are `BLOCKED` until DOC-010 is verified.

The documentation gate is complete. Owner decision `DEC-024` grants task-controlled application implementation authorization: only tasks that are `READY` under this ledger may be performed.

This gate does not authorize production deployment, customer launch, provider contracting, spending, use of production credentials, or execution of any `BLOCKED` task.

---

## 8. Implementation preparation

### IMP-001 — Inspect repository baseline

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** DOC-010  
**Outcome:** determine actual repository contents and preserve existing user work.

**Acceptance criteria:**

- repository tree, branch state, existing README/config, and uncommitted work inspected;
- no user changes overwritten;
- contradictions with `CURRENT_STATE.md` reported;
- baseline evidence recorded.

**Verification evidence — 2026-08-20:**

- Claude Code reported `IMP-001 RESULT: PASS` under bounded read-only authorization;
- inspected baseline commit: `a81b217468cb8979d9933f7bc27740afca2d06c7` on `main`, matching `origin/main`;
- working tree clean; no uncommitted, untracked, ignored-project-artifact, stash, branch, or tag conflicts found;
- repository contained exactly the 28 approved Claude Package v1.0 files and no application source, scaffolding, dependencies, database, migration, infrastructure, or provider configuration;
- repository state matched `project/CURRENT_STATE.md`, no baseline contradiction was found, and no existing user application work required preservation;
- inspection made no repository changes and did not perform `IMP-002`.

### IMP-002 — Research current technical candidates

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** IMP-001  
**Outcome:** evaluate current framework/runtime/database/auth/storage/queue/hosting/observability candidates using official sources.

**Acceptance criteria:**

- dated official-source matrix covers maintained versions, security support, privacy, Mauritius/global availability, cost, limits, portability, local development, and operational burden;
- alternatives and rejection reasons documented;
- no selection relies on the original idea alone;
- unresolved commercial/legal facts marked blockers.

**Verification evidence — 2026-08-20:**

- result: `PASS — research requirements satisfied` through the original research pass and supplementary verification pass, using current official/primary sources wherever available;
- unresolved implementation-time and commercial/legal facts were classified and carried forward as gates for `IMP-003`, not treated as unresolved `IMP-002` defects;
- approved architecture remains unchanged: modular monolith, TypeScript, Next.js App Router, Node.js, PostgreSQL, Drizzle ORM, separately deployable worker, durable background processing, transactional outbox/equivalent, provider-adapter boundaries, and no Kubernetes for MVP;
- existing Render Singapore and S3 Singapore hosting/storage directions remain provisional baselines, not final provider selections;
- research recommendations for future owner consideration under `IMP-003` only: TypeScript 6.x rather than TypeScript 7 for the initial baseline while current typescript-eslint support remains below 6.1; stable Drizzle ORM/Drizzle Kit rather than the 1.0 RC line; pg-boss as leading queue candidate with Graphile Worker fallback; Render Postgres as recommended continuation of the provisional database-hosting baseline; Sentry for observability; WorkOS AuthKit for authentication subject to privacy/data-residency review; and Postmark for transactional email;
- research gates carried forward: recheck and pin exact dependency versions at stack approval; validate the pg-boss Drizzle transactional adapter before critical reliance because of recent fixes; require a compatibility spike before any BullMQ + Render Valkey selection because no explicit cross-vendor guarantee exists; explicitly review WorkOS AuthKit US data-processing/storage-transfer implications; and resolve provider plans, pricing, contracts, production limits, and applicable Mauritius legal/privacy obligations at their approved gates;
- no recommendation in this evidence is a final stack/provider selection, and no provider was configured or activated.

### IMP-003 — Approve initial implementation stack

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** IMP-002; owner approval  
**Outcome:** select the smallest viable initial stack and versions.

**Acceptance criteria:**

- decision record approved;
- exact versions/constraints pinned where appropriate;
- provider boundaries remain abstracted as specified;
- local, test, preview, and production environment approach documented;
- costs and migration/exit considerations recorded.

**Verification evidence — 2026-08-20:**

- owner explicitly authorized and approved `IMP-003` as a repository decision/documentation action only;
- immutable decision `DEC-023` records the initial engineering stack: Node.js 24.19.0 LTS, Next.js 16.3.1 App Router, TypeScript 6.0.3, npm with committed `package-lock.json`, Drizzle ORM 0.45.2, Drizzle Kit 0.31.10, PostgreSQL 18, and pg-boss 12.27.0;
- the approved TypeScript modular-monolith, one-repository, web-plus-worker, PostgreSQL, transactional-outbox/equivalent, object-storage, provider-adapter, no-Kubernetes and no-microservices architecture remains authoritative;
- pg-boss supersedes only the provisional Render Key Value/BullMQ queue direction; its queue boundary remains replaceable and its Drizzle transaction adapter requires the approved bounded compatibility/integration test before critical reliance;
- Render Singapore, Render PostgreSQL in Singapore, and Amazon S3 Singapore remain provisional production baselines subject to all latency, privacy, legal, pricing, plan, HA/PITR/restore, security, operations, backup and production-approval gates;
- WorkOS AuthKit, Sentry, Postmark, exact AI model identifiers, payment/acquiring, analytics and other unresolved providers remain outside this decision and subject to their specialist tasks;
- local, CI/test, preview/staging and production separation, portability consequences and production-cost verification are recorded; no precise production bill is asserted;
- no dependency installation, scaffold, source code, infrastructure, database, migration, provider configuration, production deployment or application implementation occurred.

### IMP-004 — Establish repository engineering baseline

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** IMP-003  
**Outcome:** create the minimal application scaffold and developer tooling.

**Acceptance criteria:**

- strict TypeScript and formatting/lint/typecheck/test commands work;
- lockfile committed;
- environment validation exists;
- no real secrets committed;
- minimal health page/test passes;
- README/CLAUDE/tasks/current state updated accurately.

**Verification evidence — 2026-08-20:**

- implemented in commit `da9c8b7a1ddab0b0f5470fc9ed5aa5d29a99339f` on branch `imp-004-engineering-baseline` from verified `main` at `89ae65b4ac532403addbae0dab76bca975d1f934`;
- scaffolded the approved `DEC-023` stack exactly as pinned: Node.js engines `24.19.0` (`.nvmrc`), Next.js `16.3.1` App Router, TypeScript `6.0.3` strict, npm with committed `package-lock.json`, Drizzle ORM `0.45.2`/Drizzle Kit `0.31.10` and pg-boss `12.27.0` present as declared dependencies only — no schema, migration, queue, or database connection was created;
- added ESLint (`eslint-config-next` flat config), Prettier (scoped to application/config files; approved documentation under `docs/`, `product/`, `project/`, `CLAUDE.md`, `README.md`, `.env.example` is explicitly excluded from reformatting), and Vitest;
- added `GET /api/health`: a shallow, non-sensitive liveness check returning `200` with `{status, service, time}` and no secrets, environment values, or dependency detail, per `docs/12_DEPLOYMENT.md` section 3; covered by an automated test that also asserts no secret-shaped keys appear in the response;
- added a minimal server-only environment-validation baseline (`src/lib/env.ts`) covering only always-required, non-secret baseline variables (`APP_ENV`, `LOG_LEVEL`, `DEFAULT_LOCALE`, `DEFAULT_CURRENCY`, `APP_TIMEZONE`) with safe defaults and fail-safe rejection of invalid values; provider/secret configuration remains explicitly out of scope pending `IMP-010`; covered by automated tests, including a test that no secret-shaped key or value can appear in its output;
- added a `worker/` structural placeholder only (no pg-boss job processing, no business logic), establishing the web/worker boundary required by `docs/05_SYSTEM_ARCHITECTURE.md` without implementing later-task responsibilities;
- created no database, migration, production infrastructure, or provider configuration; `ENABLE_*` feature gates in `.env.example` remain untouched and default-disabled;
- verification loop run from a clean `npm ci` (reproducible install from the committed lockfile): `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test` (8/8 passed), `npm run build` all passed; additionally smoke-tested by running the production build (`npm run start`) and confirming `GET /` and `GET /api/health` respond correctly over HTTP;
- inspected the diff and `git status` for secrets, generated artifacts, and unrelated changes before committing; none found;
- known limitation: the local development machine's installed Node.js is `24.14.0`, not the exact approved `24.19.0`; `engines` in `package.json` and `.nvmrc` record the approved version, `npm ci`/`npm install` are not blocked (no `engine-strict`), and this is recorded as a deferred item, not a defect in the committed baseline;
- final repository-side audit result: `PASS WITH NON-BLOCKING FOLLOW-UP`; PR #1 merged to `main` by normal merge commit `1ae399202fb34ac7c760321c0b8831527c62b968`, preserving implementation commit `da9c8b7a1ddab0b0f5470fc9ed5aa5d29a99339f`;
- `IMP-005` was not performed. Its sole dependency, `IMP-004`, is now verified on `main`, so `IMP-005` is `READY`; every later implementation task remains `BLOCKED`.

### IMP-005 — Establish CI quality gates

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** IMP-004  
**Outcome:** run repeatable checks on every proposed change.

**Acceptance criteria:**

- install/build/lint/typecheck/unit tests run from a clean environment;
- dependency/security/secret checks enabled where selected tooling supports them;
- failures block merge according to approved policy;
- branch/protection limitations documented if repository plan prevents enforcement.

**Implementation evidence — 2026-08-21:**

- implemented on branch `imp-005-ci-quality-gates` from verified `main` at `ea0033212d007c487aea32828db5b24f684f8a21`;
- added `.github/workflows/ci.yml` — a single `CI` workflow with one `quality-gate` job on `ubuntu-latest`, triggered only by `pull_request` targeting `main` and `push` to `main` (no `pull_request_target`; the baseline requires no repository secret);
- workflow permissions are explicit least privilege (`contents: read` at workflow and job level); no write, deploy, release, or provider-configuration capability exists in the workflow;
- external actions are pinned to full-length immutable commit SHAs with a human-readable version comment, verified on 2026-08-21 directly against the GitHub REST API (`api.github.com/repos/actions/checkout/commits/v7.0.1` and `api.github.com/repos/actions/setup-node/commits/v7.0.0`, cross-checked against the `/tags` listing): `actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1` (`v7.0.1`) and `actions/setup-node@820762786026740c76f36085b0efc47a31fe5020` (`v7.0.0`); GitHub's official hardening guidance confirms full-SHA pinning is the only immutable way to reference an action;
- the job pins `node-version: 24.19.0` (the exact `DEC-023` baseline, verified present at `nodejs.org/dist/v24.19.0/`, released 2026-08-03) and adds an explicit runtime-verification step that fails the job unless `node --version` reports exactly `v24.19.0`; this closes the `IMP-004` follow-up recorded in `project/CHANGELOG.md`;
- the clean path runs, in order: `npm ci`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` — the repository's existing scripts, unmodified;
- dependency-security check: `npm audit` runs in full (non-blocking, reported for visibility), then the merge gate runs `npm audit --audit-level=high`, failing the job only on high/critical severity findings; the committed dependency graph currently has 4 pre-existing moderate-severity findings only (`esbuild` via `drizzle-kit`'s transitive `@esbuild-kit` dependency, `GHSA-67mh-4wv8-2f99`, dev-tooling only), so the merge gate passes without silently changing the `DEC-023`-approved `drizzle-kit` version; this finding is carried forward for awareness, not treated as an `IMP-005` defect;
- secret check: GitHub-native secret scanning was verified as unavailable for this private repository without a paid GitHub Secret Protection plan (Team/Enterprise), confirmed 2026-08-21 against GitHub's own documentation; no plan upgrade was made. `scripts/secret-scan.sh` was added instead — a narrow, locally reproducible, dependency-free scan of git-tracked files for a fixed set of known secret-shaped patterns (PEM private-key headers, AWS/Google/Stripe/Slack/GitHub token shapes). It documents its own limitation (best-effort, not a proof of absence) and never prints matched content into logs;
- local validation from a clean `npm ci` on this machine: `format:check`, `lint`, `typecheck`, `test` (8/8 passing), `build`, and `scripts/secret-scan.sh` all passed; `npm audit --audit-level=high` exits `0` (only the 4 known moderate findings present); the local machine's checked-out working tree shows spurious `format:check` differences on 15 pre-existing files due to this machine's `core.autocrlf=true` Git setting converting the working copy to CRLF — the committed blobs (`git show HEAD:<path>`) are confirmed LF, so this is a local-checkout artifact, not a repository defect, and no pre-existing file was modified;
- branch protection / required status checks: verified 2026-08-21 against current GitHub documentation that required status checks and branch-protection rules are not available for private repositories on GitHub Free — a paid plan (Pro or higher) is required. No plan upgrade or repository-setting change was made. Interim policy: no pull request may be merged into `main` unless the `CI` workflow's `quality-gate` check has succeeded; technical enforcement of this policy is not currently active and requires an eligible GitHub plan or a future repository-policy change;
- **Verification evidence — 2026-08-21:** final audit verdict `PASS WITH NON-BLOCKING FOLLOW-UP`; PR #2 passed GitHub-hosted `CI / quality-gate` run `32420895244` at implementation commit `839b176e6370d944a8a29bc83cab8c6ee4e3dac0`, then merged normally as `47cfb630ae85f639f2ec1106496a42c52fd7a4de`, preserving the implementation commit in history. The immediate `push` run on `main`, `32421454608`, also completed successfully.
- Both GitHub-hosted runs used exact Node.js `v24.19.0` and npm `11.17.0`; `npm ci`, format, lint, typecheck, unit tests (3/3 files, 8/8 tests), build, `npm audit --audit-level=high`, and the narrow best-effort tracked-file secret scan all passed.
- The dependency audit reports only the 4 recorded moderate-severity `esbuild`/`drizzle-kit` development-tooling findings; no approved dependency version was changed. The secret scan reported no known patterns and remains explicitly non-comprehensive.
- Technical branch-protection/required-status-check enforcement remains unavailable for this private repository on its current plan. Interim policy remains: no pull request may be merged into `main` unless `CI / quality-gate` succeeds; PR #2 complied.
- No product feature, provider configuration, database, migration, infrastructure, deployment, production resource, or application release was created. `IMP-010` was not performed.

### IMP-006 — Marketing/discovery homepage and typed catalogue foundation

**Priority:** P0  
**State:** IMPLEMENTED (reconciled)  
**Dependencies:** IMP-005  
**Origin:** Folded in from the retired `project/TASKS_V2.md` (`V2-002`, `V2-003`) per `DEC-028`.  
**Acceptance criteria:** responsive public discovery homepage; the four approved packages presented as typed, tested application data (not scattered UI constants); wedding-only customer-reachable scope (`DEC-027`); no non-wedding occasion selectable or linked; accessible, reduced-motion-safe, mobile-first.

**Implementation evidence — 2026-08-24, reconciled 2026-08-25:**

- Implemented via PR #4 (`vision-v2-autonomous-rebuild`, merged as `152a06061d252bf850f9d3d057fd30b4497652d2`): `src/lib/catalog.ts` (typed occasion and package data), `src/lib/catalog.test.ts`, `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`.
- As originally merged, this shipped 8 typed occasion categories rendered as customer-selectable cards (multi-occasion) and placeholder package `concepts` values with no approved entitlements/prices — both corrected by the 2026-08-25 reconciliation (`DEC-025`–`DEC-027`).
- Reconciled state: package data carries the `DEC-025` entitlements/prices and a `DEC-026` guest-capacity add-on calculator; only the `wedding` occasion is rendered/selectable; the remaining 7 occasion categories remain in the typed data model, unlinked and unrendered, per `DEC-027`.
- No provider, database, payment, or production activation is part of this task.

### Retired-ledger mapping (`DEC-028`)

The retired `project/TASKS_V2.md`'s remaining items map onto this ledger's existing tasks rather than creating new ones: `V2-001` → this reconciliation and `DEC-025`–`DEC-028`; `V2-002`/`V2-003` → `IMP-006` above; `V2-004` → `IMP-032`; `V2-005` → `IMP-020`; `V2-006` → `IMP-012`/`IMP-013`; `V2-007` → `IMP-033`/`IMP-034`; `V2-008` → `IMP-070`–`IMP-075`; `V2-009` → `IMP-040`–`IMP-045`; `V2-010` → `IMP-050`–`IMP-055`; `V2-011` → `IMP-034`/`IMP-063` (premium motion/sharing); `V2-012` → `IMP-100`–`IMP-107`. No `IMP-*` task's `BLOCKED`/`READY` state changes as a result of this mapping.

---

## 9. Foundation and identity

### IMP-010 — Implement configuration and environment boundaries

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** IMP-005  
**Acceptance criteria:** typed startup validation; server/public separation; environment-specific credentials; safe errors; tests.

**Verified evidence — 2026-08-21:**

- implemented through commits `f282fa3f3c883d306782b7f42d49d11bd079736a`, `f68768570e41efa636dcccca4650f609ee33d3b3`, and `8a64a6d18ecd88073510f933728b0cc7b0c5b26b`; merged through PR #3 by normal merge commit `075f6df030484de914e6ef70a8ca412e18c83ec4`;
- successful GitHub-hosted PR `CI / quality-gate` run `32505567479` and immediate push-to-`main` run `32506567512`;
- both runs verified Node.js `v24.19.0`, npm `11.17.0`, clean `npm ci`, format, lint, typecheck, 6/6 test files and 91/91 tests, build, `npm audit --audit-level=high`, and the best-effort tracked-file secret scan;
- dependency audit reported only the 4 pre-existing moderate `esbuild`/`drizzle-kit` development-tooling findings; no high or critical finding and no dependency change;
- typed startup validation, explicit pure-parser/runtime-wrapper boundaries, a four-field public allow-list, environment-specific invariants, fail-closed payment feature prerequisites, and URL/origin/secret redaction regression coverage were reviewed and verified;
- no provider was selected, configured, contacted, or activated; no database schema, migration, queue, infrastructure, deployment, production credential, product feature, or later task was implemented;
- repository remained private. Technical required-status-check enforcement remains unavailable on the current plan; the manual policy requiring `CI / quality-gate` success before merge remains binding.

### IMP-011 — Implement observability foundation

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-010; observability decision  
**Acceptance criteria:** structured redacted logs, request/job correlation, safe error reporting, health/readiness, no secrets/guest/payment payload leakage.

### IMP-012 — Implement authentication provider adapter

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-010; approved authentication decision  
**Acceptance criteria:** sign-up/sign-in/sign-out/recovery/session handling; verified provider callbacks; server-side user mapping; rate limits; security tests.

### IMP-013 — Implement roles and authorization

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-012  
**Acceptance criteria:** owner/admin/support boundaries; deny-by-default server checks; cross-user access tests; audited privileged actions.

---

## 10. Database and domain foundation

### IMP-020 — Create migration system and base schema

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** IMP-003, IMP-010  
**Acceptance criteria:** versioned forward migrations; documented rollback/repair; local/test database setup; schema matches approved database design.

**Scope note:** This task establishes the migration *system* and tooling per `docs/06_DATABASE_DESIGN.md` §23. The committed schema (`src/db/schema/index.ts`) is intentionally empty — domain tables are owned by their own dependent tasks (`IMP-021` users/events, `IMP-022` audit/outbox, `IMP-023` entitlements, `IMP-050` catalogue/pricing, etc.), each mapping to its own numbered section of the database design document. An empty-but-tooling-verified schema is a deliberate, disclosed scope boundary, not an oversight.

**Implementation evidence — 2026-08-26:**

- Added `drizzle.config.ts` (Drizzle Kit, PostgreSQL dialect, `strict`/`verbose`); `src/db/schema/index.ts` (empty barrel, documented as the extension point for later tasks); `src/db/client.ts` (connection factory, migration/test-only, no application route may import it); `src/db/migrate.ts` (reviewed forward-migration runner, `drizzle-orm/node-postgres/migrator`); `scripts/db-migrate.mjs` (administrative/local runner reading `DATABASE_DIRECT_URL` only, never falling back to another variable, never logging the connection string).
- Identifier strategy verified against current official PostgreSQL 18.0 release notes before implementation (not assumed): PostgreSQL 18 provides a native `uuidv7()` function (RFC 9562, sub-millisecond timestamp precision), so `docs/06_DATABASE_DESIGN.md` §6.1's "database-generated UUIDv7 when the selected PostgreSQL version supports the required generation function" is satisfiable with no extension; a test in `src/db/migrations.db.test.ts` asserts `uuidv7()` is callable and returns a version-7 UUID.
- Added `docker-compose.yml`: disposable local PostgreSQL, pinned to `postgres:18.6-alpine` (verified to exist on the official Docker Hub `postgres` image at implementation time), matching the `DEC-023` PostgreSQL 18 baseline; not a production/staging resource.
- Added `.github/workflows/ci.yml` PostgreSQL service container (same pinned image; synthetic, job-scoped, non-secret credentials) and four new CI steps: `db:check` (migration-history consistency), a schema-drift check (`drizzle-kit generate` must produce no uncommitted diff), `db:migrate` against the disposable CI database, and `test:db` (database integration tests) — implementing `docs/06_DATABASE_DESIGN.md` §23's "CI creates a clean database and applies the entire migration history" and "CI checks migration-history consistency and schema drift."
- Added `src/db/test-safety.ts`: every destructive test helper requires `TEST_DATABASE_URL` explicitly (never falls back to `DATABASE_URL`/`DATABASE_DIRECT_URL`) and refuses to run unless the target looks disposable (localhost/127.0.0.1/::1 host, or a database name containing "test") — enforced by construction, not by convention.
- Added `vitest.db.config.mts` + `src/db/vitest-global-setup.ts` (separate `npm run test:db` suite, `fileParallelism: false`, fails rather than silently skips when no disposable database is configured) and excluded `src/db/**/*.db.test.ts` from the ordinary `npm test` run in `vitest.config.mts`, so the unit-test suite never silently requires a live database.
- `src/db/migrations.db.test.ts` verifies: the connected database reports PostgreSQL major version 18; `uuidv7()` works; the full (currently empty) migration history applies to a freshly emptied schema and creates `drizzle.__drizzle_migrations`; and re-applying is an idempotent no-op (`docs/06_DATABASE_DESIGN.md` §23, "Applied migration history is immutable").
- `package.json`: added `pg@8.23.0`/`@types/pg@8.23.1` (both verified to exist on the npm registry at implementation time) and `db:generate`/`db:check`/`db:migrate`/`test:db` scripts; no `push`/schema-sync script was added, matching §23's "Production never uses automatic schema push/synchronization."
- **Rollback/repair, documented in `README.md`:** migration history is append-only and immutable; a bad migration is corrected by a new forward migration, never by editing/deleting an applied one. There is no destructive migration to roll back yet since the committed schema has no tables.
- **Local verification performed (2026-08-26):** `npm run format:check`/`lint`/`typecheck`/`test`/`build` all pass, with only the pre-existing, already-documented Windows `core.autocrlf`/`server-only` local-checkout artifacts present (verified staged git blobs are LF, matching the repository's committed convention, not CRLF); `npx drizzle-kit generate` and `npx drizzle-kit check` both succeed against the empty schema with no DB connection required; `npm audit --audit-level=high` reports only the 4 pre-existing moderate `esbuild`/`drizzle-kit` findings; the secret scan reports no known patterns.
- **Local verification NOT performed:** Docker Desktop's daemon is not running in this environment (CLI present, no backend), so `npm run test:db` and a live `npm run db:migrate` could not be exercised locally. Disclosed rather than assumed passing.
- **Live/CI verification — 2026-08-26:** PR #6 (`imp-020-migration-system`) initially failed `Format check` on `src/db/migrations/meta/_journal.json` (drizzle-kit's own generated JSON did not match this repo's Prettier style, not the local Windows CRLF artifact); fixed in commit `e52133b122123f8f9a8c79f47c71238075a5b915` and documented in `README.md` ("run `npm run format` after `db:generate`"). The corrected PR's GitHub-hosted `CI / quality-gate` run [`32904136112`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32904136112) passed all steps, including the four new IMP-020 steps against a real disposable PostgreSQL 18 service container: migration-history consistency check, schema-drift check, applying migrations, and database integration tests (which verified PostgreSQL major version 18, that `uuidv7()` is callable and returns a version-7 UUID, and that applying the migration history is idempotent). PR #6 merged normally as `1710eff1a1fa9528d018b98ad26fe4562bb97936`; the immediate push-to-`main` CI run [`32904336343`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32904336343) also passed. Local `main` fast-forwarded `4cc6a44..1710eff` and matches `origin/main`.
- No provider selection/activation, production database, production credential, or production/staging resource was created. `docker-compose.yml`'s Postgres instance and the CI service container are both disposable and non-production.

### IMP-021 — Implement users, events, and event versions

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-020, IMP-013  
**Acceptance criteria:** ownership constraints; event lifecycle; immutable version/snapshot behavior; audit timestamps; authorization and concurrency tests.

### IMP-022 — Implement append-only audit and outbox foundations

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** IMP-020  
**Acceptance criteria:** append-only audit events; safe actor/reason metadata; transactional outbox or approved equivalent; replay/idempotency tests.

**Implementation evidence — 2026-08-26:**

- Added `src/db/schema/operations.ts` implementing `docs/06_DATABASE_DESIGN.md` §16 exactly: `outbox_events` (§16.1, transactional outbox — domain change and outbox row inserted in the same transaction by the caller; unique `deduplication_key`), `job_executions` (§16.2, execution history, FK to `outbox_events`), `audit_events` (§16.3, append-only). Also added the §19-specified indexes: `outbox_events(available_at)` partial (unprocessed only), `audit_events(event_id, occurred_at desc)`, `audit_events(actor_account_id, occurred_at desc)`.
- **Deferred foreign keys (disclosed, not silent):** `audit_events.actor_account_id`/`event_id` are plain `uuid` columns without a DB-level foreign-key constraint. The design doc specifies them as references to `accounts(id)`/`events(id)`, but those tables belong to `IMP-021`, which is `BLOCKED` on the unresolved authentication decision (`IMP-013`). Adding the constraint is `IMP-021`'s responsibility once those tables exist (additive `ALTER TABLE`, consistent with §23's expand-and-contract policy). `target_id` has no FK even in the approved design (polymorphic target), so this does not weaken a pattern the schema otherwise treats as strict.
- **Append-only enforcement:** rather than inventing database role separation (a deployment-topology decision this repository has not made — §21, gated behind `docs/12_DEPLOYMENT.md`), added a raw-SQL migration (`0001_audit_events_append_only_trigger.sql`, per §4's allowance for reviewed raw SQL) with a `BEFORE UPDATE OR DELETE` trigger that raises on any attempt to modify or delete an `audit_events` row, regardless of role — role-independent enforcement of the same §16.3 invariant a role grant would provide, and exactly the "small, stable database invariant" §17 reserves triggers for.
- `src/db/schema/operations.db.test.ts`: behavioral tests against a real database — `outbox_events` unique-`deduplication_key` rejection and an `ON CONFLICT DO NOTHING` safe-replay path (constraint-level idempotency); `job_executions` FK behavior including a null `outbox_event_id`; `audit_events` insert succeeds, UPDATE and DELETE both rejected by the trigger.
- `src/db/migrations.db.test.ts` updated: the "applies migration history to an empty database" test now also asserts the three real tables exist after a from-scratch apply (previously asserted only the tooling worked against an empty schema).
- **Local verification:** `format`/`lint`/`typecheck`/`test`/`build` all pass (same pre-existing, already-documented Windows CRLF/`server-only` artifacts as `IMP-020`, no new ones); `drizzle-kit generate`/`check` report no drift after generating both migrations; `npm audit --audit-level=high` and the secret scan are unchanged/clean.
- **Not locally verified:** as with `IMP-020`, Docker Desktop's daemon is unavailable in this environment, so `operations.db.test.ts` and the updated `migrations.db.test.ts` assertions could not run locally.
- **Live/CI verification — 2026-08-26:** PR #7 (`imp-022-audit-outbox`) surfaced three real bugs the local environment couldn't catch, each fixed and re-verified live: (1) `migrations.db.test.ts`'s `table_name = any(${array})` failed with "op ANY/ALL (array) requires array on right side" — Drizzle's `sql` tag interpolates a JS array as scalar params, not an array literal; fixed with `in (${sql.join(...)})` in `1e7d105`. (2) The append-only trigger UPDATE/DELETE assertions checked `.rejects.toThrow(/append-only/)` against the wrong error layer — drizzle-orm wraps the raw PostgreSQL error (carrying the trigger's message) in `.cause`, not the top-level message; fixed with an `expectRejectionMatching()` helper that walks the `.cause` chain, also in `1e7d105`. Also tightened the dedup-key test, which had been incidentally matching the INSERT statement's own SQL text rather than the real constraint error. (3) `migrations.db.test.ts` dropped only the `public` schema before re-migrating, leaving the separate `drizzle` schema's migration-history rows intact — the migrator saw "already applied" and silently skipped recreating the tables; fixed by dropping `drizzle` alongside `public` in `c284d3d`. The corrected run ([`32908549386`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32908549386)) passed all steps, including all 10 database integration tests against a real PostgreSQL 18 container. PR #7 merged normally as `a2af4f11c9099caa85ac9a09174ecc6bce9ab131`; the push-to-`main` run ([`32908707050`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32908707050)) also passed. Local `main` fast-forwarded `1710eff..a2af4f1`.
- No provider selection/activation, production database, production credential, or production/staging resource was created.

### IMP-023 — Implement entitlement ledger and projections

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** IMP-020, IMP-022  
**Acceptance criteria:** immutable grants/reservations/consumption/releases/reversals; 1/2/3/5, 2/4/8/12, 75/150/300/750, hosting/language rules per `DEC-025`; atomic concurrency tests.

**Scope note:** Hosting duration (`hostingDays` in `DEC-025`) is not an entitlement-ledger code: it is a time window, not a consumable quantity, and belongs to the publication/hosting lifecycle (`docs/06_DATABASE_DESIGN.md` §17.14, owned by `IMP-062`). The ledger tracks the four genuinely consumable dimensions: AI concepts, AI refinements, guest capacity, and language slots.

**Implementation evidence — 2026-08-26:**

- Added `src/db/schema/entitlements.ts` implementing `docs/06_DATABASE_DESIGN.md` §12 exactly: `entitlement_ledger_entries` (§12.1, append-only, all 7 entry types, unique `(event_id, entitlement_code, idempotency_key)` for ledger-level idempotency) and `entitlement_balances` (§12.2, the transactionally maintained projection, composite primary key). Added the §19-specified index.
- **Deferred foreign keys**, same disclosed pattern as `IMP-022`'s `audit_events`: `event_id`, `purchase_id`, `created_by_account_id` are plain `uuid` columns without FK constraints yet — the referenced `events`/`purchases`/`accounts` tables belong to `IMP-021`/`IMP-050`, neither implemented. `generation_request_id` has no FK even in the approved design (§12.1 defines it as a bare nullable `uuid`), so this deferral doesn't weaken a pattern the schema otherwise treats strictly.
- **Append-only enforcement:** the same role-independent `BEFORE UPDATE OR DELETE` trigger pattern `IMP-022` established (`0003_entitlement_ledger_append_only_trigger.sql`), enforcing §12.1's "No ledger row is updated or deleted."
- Added `src/lib/entitlements.ts`: entitlement codes and `initialGrantsForPackage()`, deriving grant quantities from `src/lib/catalog.ts` — the single approved source of the `DEC-025` numbers — rather than a second, independently maintained copy (`docs/00_CLAUDE_RULES.md` §9).
- Added `src/db/repositories/entitlements.ts` implementing §12.3's atomic reservation rule: `grantEntitlements`, `reserveEntitlement`, `consumeEntitlement`, `releaseEntitlement`, `adjustEntitlement`, and `reconstructBalanceFromLedger` (rebuilds a balance purely from the ledger, independent of the projection, per §12.2's "must be fully reconstructable from the ledger"). Every write is one transaction that locks the balance row via `INSERT ... ON CONFLICT DO UPDATE` (Postgres takes the same row-level lock this pattern would with an explicit `SELECT ... FOR UPDATE`), checks availability/sufficiency, appends the ledger entry idempotently (`ON CONFLICT DO NOTHING` on the same key the schema's unique index enforces), and only then updates the balance — so a duplicate call with the same idempotency key is a safe no-op rather than a double-apply. Balance-update semantics per entry type are documented as an explicit internal convention at the top of the file, since the design doc names the columns and entry types but doesn't itself specify the arithmetic.
- `src/db/repositories/entitlements.db.test.ts`: grant idempotency-on-replay; reserve/consume/release lifecycle with the ledger-reconstructed balance verified against the projection; rejection of over-capacity reservation; positive and negative `adjustEntitlement` corrections; and the required **atomic concurrency test** — 10 concurrent reservation attempts (each its own database connection, not a shared one) against a single available unit, asserting exactly 1 succeeds and 9 fail with `InsufficientEntitlementError`, proving the row-lock actually serializes concurrent writers rather than merely looking correct under sequential testing.
- **Local verification:** `format`/`lint`/`typecheck`/`test`/`build` all pass (same pre-existing Windows CRLF/`server-only` artifacts as `IMP-020`/`IMP-022`, no new ones); `drizzle-kit generate`/`check` report no drift after generating both migrations; `npm audit --audit-level=high` and the secret scan are unchanged/clean.
- **Not locally verified:** as with `IMP-020`/`IMP-022`, Docker Desktop's daemon is unavailable in this environment, so none of the database integration tests — including the concurrency test, whose correctness depends on real Postgres row-locking behavior that cannot be meaningfully simulated — could run locally.
- **Live/CI verification — 2026-08-26:** PR #8 (`imp-023-entitlement-ledger`) passed `CI / quality-gate` on the first run ([`32910597945`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32910597945)), including all IMP-020-established database steps and the atomic concurrency test against a real PostgreSQL 18 container — 10 concurrent reservation attempts, exactly 1 succeeded, 9 correctly rejected. PR #8 merged normally as `0edb9d2e2b1c613ab74d6e415e84a42d240e485d`; the push-to-`main` run ([`32913465761`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32913465761)) also passed. Local `main` fast-forwarded `a2af4f1..0edb9d2`.
- No provider selection/activation, production database, production credential, or production/staging resource was created.

### IMP-024 — Implement retention and deletion foundations

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-020, privacy/legal review plan  
**Acceptance criteria:** retention-policy configuration; verified request workflow; holds/minimization; processor propagation hooks; audit evidence; no unsafe hard deletion.

---

## 11. Core host product

### IMP-030 — Implement authenticated dashboard shell

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-013, design tokens/components  
**Acceptance criteria:** responsive accessible navigation; event list/empty/loading/error states; localization hooks; authorization tests.

### IMP-031 — Implement wedding event creation

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-021, IMP-030  
**Acceptance criteria:** wedding-only MVP path; typed event facts; timezone/date validation; draft state; safe save/resume; tests.

### IMP-032 — Implement design questionnaire

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-031  
**Acceptance criteria:** approved questionnaire fields; explicit cultural/religious selection; neutral defaults; no sensitive inference; accessible validation.

### IMP-033 — Implement manual invitation editor

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-021, IMP-032  
**Acceptance criteria:** structured safe edits; approved themes/controls only; no arbitrary code; undo/version/save behavior; manual edits consume no AI.

### IMP-034 — Implement deterministic invitation renderer

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-033  
**Acceptance criteria:** responsive accessible rendering; factual text separate from decorative imagery; locale/font coverage; stable snapshot tests.

---

## 12. AI integration

### IMP-040 — Evaluate and approve text/image AI providers and models

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-003; current official-source research; privacy/security/cost evaluation  
**Acceptance criteria:** benchmark and decision evidence for quality, facts, culture, moderation, privacy, retention, rights, latency, cost, availability, and rollback.

### IMP-041 — Implement AI provider contracts/adapters

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-040, IMP-010  
**Acceptance criteria:** normalized text/image contracts; pinned model/version; timeouts; safe errors; no silent cross-provider failover; contract tests.

### IMP-042 — Implement AI job lifecycle

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-023, IMP-041, IMP-022  
**Acceptance criteria:** validation/reservation/queue/attempt/reconciliation states; idempotency; bounded retry/repair; ambiguous timeout handling; cost/audit evidence.

### IMP-043 — Implement structured concept generation

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-034, IMP-042  
**Acceptance criteria:** one coordinated concept; schema validation; exact fact preservation; moderation; persisted platform-controlled assets; 1/3/5 enforcement.

### IMP-044 — Implement refinement workflow

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-043  
**Acceptance criteria:** bounded instructions; 2/6/12 enforcement; image-replacement disclosure; manual editing free; retries count once; version selection/revert.

### IMP-045 — Implement unpaid preview controls

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-043, account/abuse controls  
**Acceptance criteria:** one preview/event; three active unpaid events/account; protected preview; successful preview counts toward purchase; failure release; publication blocked.

---

## 13. Catalogue, pricing, and payment

### IMP-050 — Implement versioned catalogue and price-book model

**Priority:** P0  
**State:** VERIFIED  
**Dependencies:** IMP-020, approved launch price book (amounts may remain sandbox-only until approved)  
**Acceptance criteria:** immutable package/price/tax/currency snapshots; MUR primary; market activation; no client authority; historical prices preserved.

**Implementation evidence — 2026-08-26:**

- Added `src/db/schema/catalogue.ts` implementing `docs/06_DATABASE_DESIGN.md` §10 exactly: `package_definitions` (§10.1), `entitlement_definitions` (§10.2, FK to `package_definitions`), `price_book_entries` (§10.3, FK to `package_definitions`, integer minor-unit `amountMinor`, never floating point), `purchases` (§10.4, FK to `package_definitions`/`price_book_entries`), `purchase_entitlement_snapshots` (§10.5, FK to `purchases`).
- **Deferred foreign keys**, same disclosed pattern as `IMP-022`/`IMP-023`: `purchases.eventId`/`accountId` are plain `uuid` columns without FK constraints — the referenced `events`/`accounts` tables belong to `IMP-021`, not yet implemented. Every other FK in this task's schema (to `package_definitions`, `price_book_entries`, `purchases`) is real and enforced from the start, since this task creates all three referenced tables itself.
- **Append-only enforcement** on `purchase_entitlement_snapshots` (same trigger pattern as `IMP-022`/`IMP-023`): unlike `purchases` (which has a legitimate mutable `status` lifecycle — `CREATED` → `PAYMENT_PENDING` → `PAID` → ...), a purchase's entitlement snapshot has no legitimate update path at all once written.
- `package_definitions.status`/`price_book_entries.status` use the closest approved analogue, `product/PRICING_RULES.md` §6's price-book state vocabulary (`DRAFT`/`SCHEDULED`/`ACTIVE`/`RETIRED`/`CANCELLED`) — the design doc names the columns but not this vocabulary explicitly; disclosed as an engineering choice, not a new commercial decision. `purchases.status` uses exactly the 8 states §10.4 specifies.
- Added `src/db/repositories/catalogue.ts`: `ensureCatalogueSeeded()` idempotently seeds all four `DEC-025` tiers (from `src/lib/catalog.ts`, the single approved source — not a second copy) as version-1 `ACTIVE` package definitions with 5 entitlement definitions each (the 4 ledger-trackable ones plus `hosting_days`, which `IMP-023` deliberately excluded from the runtime ledger as a time window rather than a consumable, but which is still part of what a package *defines*) and one `MU`/`MUR` price-book entry; `getActivePackageDefinition`/`getActivePriceBookEntry`; `createPriceBookEntry` (rejects overlapping active intervals per §10.3); `createPurchaseSnapshot`, whose signature has **no amount parameter at all** — every amount is looked up from the currently active price-book entry, structurally (not just conventionally) satisfying "no client authority."
- `src/db/repositories/catalogue.db.test.ts`: seed correctness and idempotency against the exact `catalog.ts` amounts; purchase-snapshot total derivation with no client-supplied amount; **historical-price preservation** — retiring the seeded price and activating a new one leaves an already-created purchase's snapshot amounts unchanged; overlapping-price-interval rejection; append-only trigger rejection of UPDATE/DELETE on `purchase_entitlement_snapshots`.
- **Local verification:** `format`/`lint`/`typecheck`/`test`/`build` all pass (same pre-existing Windows CRLF/`server-only` artifacts as prior IMP-020/022/023 evidence, no new ones); `drizzle-kit generate`/`check` report no drift after generating all three migrations (including the append-only trigger); `npm audit --audit-level=high` and the secret scan are unchanged/clean.
- **Not locally verified:** as with `IMP-020`/`IMP-022`/`IMP-023`, Docker Desktop's daemon is unavailable in this environment, so none of the database integration tests could run locally.
- **Live/CI verification — 2026-08-26:** PR #9 (`imp-050-catalogue-price-book`) passed `CI / quality-gate` on the first run ([`32915046338`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32915046338)), including all IMP-020-established database steps. PR #9 merged normally as `8e2bbb7903acdd137647b6b9c934bad060ffc09f`; the push-to-`main` run ([`32915766527`](https://github.com/monsieur-zordi/Digital-E-invite/actions/runs/32915766527)) also passed. Local `main` fast-forwarded `0edb9d2..8e2bbb7`.
- No provider selection/activation, production database, production credential, or production/staging resource was created. No production price was published or charged — these are approved catalog/sandbox values per `DEC-025`, and actual payment processing remains gated behind `IMP-051`–`IMP-055`.

### IMP-051 — Research and approve payment provider/acquirer

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** current official/provider/bank evidence; commercial/legal/accounting review  
**Acceptance criteria:** verified methods/currencies/settlement/refunds/webhooks/merchant eligibility/security/fees; explicit decision; no unsupported method advertising.

### IMP-052 — Implement payment provider adapter and hosted checkout

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-050, IMP-051  
**Acceptance criteria:** server-frozen amount/currency; hosted checkout; idempotency; no raw card/bank data; safe pending/cancel states; sandbox tests.

### IMP-053 — Implement authenticated payment webhooks and reconciliation

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-052, IMP-022  
**Acceptance criteria:** signature/timestamp/replay controls; normalized state machine; duplicate/out-of-order convergence; amount/currency verification; repair queue and audit.

### IMP-054 — Implement payment-to-entitlement grant

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-023, IMP-053  
**Acceptance criteria:** verified capture grants exactly once; purchase snapshot immutable; redirects/browser values never grant; race/failure recovery tests.

### IMP-055 — Implement upgrades, add-ons, refunds, and chargeback effects

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-054; approved commercial/refund rules  
**Acceptance criteria:** delta grants; event-specific capacity/hosting add-ons; no automatic overage; compensating entitlement entries; no financial history deletion.

---

## 14. Publication and hosting

### IMP-060 — Implement pre-publication validation

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-034, IMP-054  
**Acceptance criteria:** verified paid rights; complete facts/content; language/theme/capacity/security checks; owner confirmation; safe blocking errors.

### IMP-061 — Implement publication snapshots and public routing

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-060  
**Acceptance criteria:** immutable public snapshot; unguessable/stable route design; no draft leakage; cache invalidation; noindex/privacy as specified; rollback/unpublish.

### IMP-062 — Implement hosting lifecycle

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-061, IMP-023  
**Acceptance criteria:** 30/90/365 days from first successful publication; first-publication window; extension; expiry; no edit reset; scheduled-job idempotency.

### IMP-063 — Implement sharing and QR

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-061  
**Acceptance criteria:** copy/share-intent/QR; correct private/public URL distinction; no false delivery/read claims; mobile/accessibility tests.

---

## 15. Guest management and RSVP

### IMP-070 — Implement parties, members, and capacity

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-021, IMP-023  
**Acceptance criteria:** party consumes zero; every active person/place consumes one; plus-one/child conversion; decline does not free capacity; atomic limit enforcement.

### IMP-071 — Implement private party-token lifecycle

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-070, IMP-061  
**Acceptance criteria:** random scoped tokens; secure hashes; no personal data; leakage prevention; revocation/regeneration; neutral invalid response; security tests.

### IMP-072 — Implement accountless RSVP

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-071  
**Acceptance criteria:** member `PENDING/ATTENDING/NOT_ATTENDING`; derived partial party; deadline/lock; guest and host history; no unauthorized additions/cross-party access.

### IMP-073 — Implement CSV guest export

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-070  
**Acceptance criteria:** short-lived authenticated export; UTF-8-safe output; spreadsheet-formula neutralization; server-side authorization; no private token or unrelated-party disclosure.

### IMP-074 — Implement guest dashboard totals and filtering

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-072  
**Acceptance criteria:** person-not-party totals; pending/attending/declined/partial/unnamed/remaining; accessible filters; server-derived counts.

### IMP-075 — Implement CSV guest import

**Priority:** P2  
**State:** BLOCKED  
**Dependencies:** IMP-070  
**Acceptance criteria:** bounded UTF-8 preview/map/validate/confirm; duplicate warnings; capacity calculation; formula neutralization; temporary-file deletion; failure or deferral must not block the P0 MVP journey.

---

## 16. Localization implementation

### IMP-080 — Implement interface localization framework

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-003, IMP-030  
**Acceptance criteria:** versioned resources; explicit/browser/fallback selection; no raw keys; plural/select support; locale-aware routes if approved; missing-key tests.

### IMP-081 — Complete and review English/French launch interface

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-080; glossary/style guides; native/context review  
**Acceptance criteria:** complete defined surfaces; payment/security/legal strings reviewed; accessibility/layout tests; honest support scope.

### IMP-082 — Implement invitation content variants and slots

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-034, IMP-023, IMP-080  
**Acceptance criteria:** 1/2/3 published slots; drafts not counted; stale detection; explicit approval; source/target/version/origin metadata; no silent mixed fallback.

### IMP-083 — Activate Mauritian Kreol guest-facing scope

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-082; `mfe` glossary/style guide/native review/quality gates  
**Acceptance criteria:** reviewed invitation/RSVP terminology; typography/mobile/accessibility; AI/fallback policy; no identity inference.

### IMP-084 — Prepare Russian capability

**Priority:** P2  
**State:** BLOCKED  
**Dependencies:** IMP-080; Russian scope decision and all surface-specific gates  
**Acceptance criteria:** Cyrillic typography; native review; grammar/layout/formatting; legal/support/AI scope; market/payment/compliance independence. Activation may occur after Mauritius MVP if gates remain open.

---

## 17. Administration, privacy, and operations

### IMP-090 — Implement constrained support/admin console

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-013, IMP-022  
**Acceptance criteria:** least privilege; search minimization; reasoned audited actions; no raw token/secret exposure; second approval where required; authorization tests.

### IMP-091 — Implement privacy-rights workflow

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-024; qualified legal/privacy review  
**Acceptance criteria:** proportionate requester verification; shared-party handling; access/correction/deletion/restriction; holds/processors; deadlines/configuration; audit.

### IMP-092 — Implement scheduled retention/expiry/reconciliation jobs

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-024, IMP-042, IMP-053, IMP-062  
**Acceptance criteria:** idempotent schedules; retries/dead letters; locking; safe compensating actions; monitoring; test-clock coverage.

### IMP-093 — Implement backups and tested restoration

**Priority:** P0 before production  
**State:** BLOCKED  
**Dependencies:** production data/infrastructure selection  
**Acceptance criteria:** encrypted automated backups; retention/access; documented restore; timed restore exercise; RPO/RTO evidence; secret separation.

### IMP-094 — Complete incident-response and operational runbooks

**Priority:** P0 before production  
**State:** BLOCKED  
**Dependencies:** final architecture/providers/monitoring  
**Acceptance criteria:** payment/AI/auth/data/security incidents; contacts/escalation; containment/recovery/communication; tabletop evidence; rollback procedures.

---

## 18. Verification and launch readiness

### IMP-100 — Complete end-to-end MVP test suite

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** MVP implementation tasks complete  
**Acceptance criteria:** critical host, payment, publication, guest, RSVP, localization, refund, expiry, and recovery journeys; deterministic fixtures; CI evidence.

### IMP-101 — Complete security verification

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-100; production-like environment  
**Acceptance criteria:** threat-model review; ASVS-aligned controls; SAST/dependency/secret/DAST/infrastructure tests; payment/AI abuse cases; no unresolved critical/high launch vulnerability.

### IMP-102 — Complete accessibility verification

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-100  
**Acceptance criteria:** automated/manual keyboard/screen-reader/zoom/contrast/forms/errors/locales; critical defects closed; evidence recorded.

### IMP-103 — Complete performance and resilience verification

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-100  
**Acceptance criteria:** agreed budgets; public invitation load; RSVP bursts; queue/provider failure; database/load limits; graceful degradation; recovery evidence.

### IMP-104 — Complete legal, tax, privacy, pricing, and provider gates

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** qualified reviewers; contracts; final price book  
**Acceptance criteria:** recorded approvals/conditions; production disclosures; merchant/accounting configuration; market/currency/method/language truth; unresolved issues block launch.

### IMP-105 — Deploy and verify staging

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** implementation and CI gates; staging configuration  
**Acceptance criteria:** infrastructure/release evidence; migrations; smoke/E2E/security checks; synthetic/test data only; monitoring/backups/rollback verified.

### IMP-106 — Production readiness review

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-093 through IMP-105  
**Acceptance criteria:** checklist signed; owners/on-call/support identified; price book and capabilities approved; launch/rollback plan; all blockers resolved or launch explicitly denied.

### IMP-107 — Controlled Mauritius launch

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-106 and explicit owner authorization  
**Acceptance criteria:** limited approved audience/market; live monitoring; reconciliation; support; rollback threshold; no broader global market/payment claim than approved.

### IMP-108 — Post-launch review

**Priority:** P1  
**State:** BLOCKED  
**Dependencies:** IMP-107  
**Acceptance criteria:** incidents, conversion, costs, AI quality, payment reconciliation, support, accessibility, security, capacity, and localization reviewed; decisions/tasks/backlog/roadmap updated.

---

## 19. Definition of verified

A task becomes `VERIFIED` only when:

- every acceptance criterion passes;
- required automated/manual tests pass;
- review feedback is resolved;
- security/privacy implications are addressed;
- documentation and migrations/config are updated;
- evidence links/identifiers are recorded;
- no new contradiction or unapproved scope is introduced;
- the result is committed and, where applicable, deployed to the named environment.

If any requirement cannot be verified, the task remains `IN_REVIEW`, `IMPLEMENTED`, or `BLOCKED` with a specific reason.

---

## 20. Approved owner decisions

### Decision 1 — Current authorization

**Approved:** Authorize only DOC-001–DOC-010 during documentation assembly; keep all implementation tasks blocked until the final package audit and handoff are approved.

### Decision 2 — Work-in-progress limit

**Approved:** Keep one ordinary implementation task in progress at a time unless independent parallel work is explicitly approved.

### Decision 3 — Task granularity

**Approved:** Require small reviewable tasks with stable IDs, dependencies, acceptance criteria, and evidence; split any task that becomes too broad.

### Decision 4 — Research before selection

**Approved:** Make official-source candidate research and an approved decision record mandatory before locking frameworks, versions, vendors, payment providers, AI models, or infrastructure.

### Decision 5 — Implementation order

**Approved:** Use the dependency order: package completion → technical evaluation → engineering baseline → identity/database → host workflow → AI → pricing/payment → publication → guests → localization → operations → verification → controlled launch.

### Decision 6 — Payment sequencing

**Approved:** Build payment only after price-book/catalogue foundations and provider/acquirer approval; grant entitlements only from verified server-side payment evidence.

### Decision 7 — Production blockers

**Approved:** Treat security, legal/privacy/tax/accounting, final pricing, provider, localization, accessibility, backups, incident response, monitoring, and rollback gates as mandatory before launch.

### Decision 8 — Mauritius launch

**Approved:** Use a controlled Mauritius launch after production readiness, while preserving global product architecture and separately activating other markets/currencies/methods/languages.

### Decision 9 — Deferred scope

**Approved:** Keep non-MVP ideas in `BACKLOG.md`; require an approved scope/decision/task update before implementation.

### Decision 10 — Verification standard

**Approved:** Never mark a task verified solely because code exists or compiles; require acceptance, testing, review, documentation, security/privacy, and evidence completion.

---

## 21. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.23.  
**Approved date:** 2026-08-26.  
**Owner decisions:** Decisions 1–10 approved as proposed; `IMP-004`, `IMP-005`, `IMP-010`, `IMP-020`, `IMP-022`, `IMP-023`, `IMP-050`, and (reconciled) `IMP-006` are `VERIFIED`/`IMPLEMENTED` with evidence under Decision 10. `IMP-021` remains `BLOCKED` by `IMP-013`, itself blocked on the unresolved authentication decision — owner asked to continue with `IMP-021` once that decision is made; awaiting it. Specialist-decision gates remain binding. This ledger is the single authoritative execution ledger and carries the continuous/dependency-aware execution cadence forward (`DEC-028`); `project/TASKS_V2.md` is retired.
