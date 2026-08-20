# Tasks

**File:** `project/TASKS.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.4  
**Approved date:** 2026-08-20  
**Current phase:** Implementation preparation — implementation not authorized  
**Implementation:** Not authorized; only the explicitly ready preparation task may proceed after handoff verification

---

## 1. Purpose

This file is the authoritative ordered work queue for the current project scope.

It translates the approved documentation into small, reviewable tasks with dependencies, acceptance evidence, and explicit gates. It is not a wish list; deferred ideas belong in `project/BACKLOG.md`.

Claude Code must work from the highest-priority unblocked task, complete and verify it, update this ledger and `CURRENT_STATE.md` when materially necessary, then stop for review before beginning a materially new task group.

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

These are the only tasks currently authorized to proceed.

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

Passing the documentation gate authorizes implementation preparation, not production deployment, customer launch, provider contracting, spending, or use of production credentials.

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
**State:** READY  
**Dependencies:** IMP-001  
**Outcome:** evaluate current framework/runtime/database/auth/storage/queue/hosting/observability candidates using official sources.

**Acceptance criteria:**

- dated official-source matrix covers maintained versions, security support, privacy, Mauritius/global availability, cost, limits, portability, local development, and operational burden;
- alternatives and rejection reasons documented;
- no selection relies on the original idea alone;
- unresolved commercial/legal facts marked blockers.

### IMP-003 — Approve initial implementation stack

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-002; owner approval  
**Outcome:** select the smallest viable initial stack and versions.

**Acceptance criteria:**

- decision record approved;
- exact versions/constraints pinned where appropriate;
- provider boundaries remain abstracted as specified;
- local, test, preview, and production environment approach documented;
- costs and migration/exit considerations recorded.

### IMP-004 — Establish repository engineering baseline

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-003  
**Outcome:** create the minimal application scaffold and developer tooling.

**Acceptance criteria:**

- strict TypeScript and formatting/lint/typecheck/test commands work;
- lockfile committed;
- environment validation exists;
- no real secrets committed;
- minimal health page/test passes;
- README/CLAUDE/tasks/current state updated accurately.

### IMP-005 — Establish CI quality gates

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-004  
**Outcome:** run repeatable checks on every proposed change.

**Acceptance criteria:**

- install/build/lint/typecheck/unit tests run from a clean environment;
- dependency/security/secret checks enabled where selected tooling supports them;
- failures block merge according to approved policy;
- branch/protection limitations documented if repository plan prevents enforcement.

---

## 9. Foundation and identity

### IMP-010 — Implement configuration and environment boundaries

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-005  
**Acceptance criteria:** typed startup validation; server/public separation; environment-specific credentials; safe errors; tests.

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
**State:** BLOCKED  
**Dependencies:** IMP-003, IMP-010  
**Acceptance criteria:** versioned forward migrations; documented rollback/repair; local/test database setup; schema matches approved database design.

### IMP-021 — Implement users, events, and event versions

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-020, IMP-013  
**Acceptance criteria:** ownership constraints; event lifecycle; immutable version/snapshot behavior; audit timestamps; authorization and concurrency tests.

### IMP-022 — Implement append-only audit and outbox foundations

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-020  
**Acceptance criteria:** append-only audit events; safe actor/reason metadata; transactional outbox or approved equivalent; replay/idempotency tests.

### IMP-023 — Implement entitlement ledger and projections

**Priority:** P0  
**State:** BLOCKED  
**Dependencies:** IMP-020, IMP-022  
**Acceptance criteria:** immutable grants/reservations/consumption/releases/reversals; 1/3/5, 2/6/12, 100/300/750, hosting/language rules; atomic concurrency tests.

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
**State:** BLOCKED  
**Dependencies:** IMP-020, approved launch price book (amounts may remain sandbox-only until approved)  
**Acceptance criteria:** immutable package/price/tax/currency snapshots; MUR primary; market activation; no client authority; historical prices preserved.

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
**Approved version:** 1.4.  
**Approved date:** 2026-08-20.  
**Owner decisions:** Decisions 1–10 approved as proposed.
