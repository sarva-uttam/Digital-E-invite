# Claude Code Project Instructions

**Project:** AI Digital Invitation Platform  
**File:** `CLAUDE.md`  
**Status:** Approved — Owner Approved  
**Version:** 1.2  
**Approved date:** 2026-08-20  
**Current phase:** Application implementation — authorized and task-controlled  
**Application implementation authorization:** GRANTED — task-controlled

---

## 1. Role of this file

This file is Claude Code's operational entry point for this repository.

It explains:

- which files are authoritative;
- which documents must be read before work begins;
- how to select and execute authorized tasks;
- what must never be assumed;
- when research or owner approval is required;
- how to verify and report work;
- when to stop rather than improvise.

This file does not replace the approved specifications. It routes Claude Code to them and enforces their workflow.

---

## 2. Task-controlled implementation gate

Application implementation is authorized to begin only through tasks that are explicitly eligible in `project/TASKS.md`.

Before implementation, confirm that:

1. the task is `READY` or otherwise explicitly authorized under the task ledger;
2. every dependency and owner-decision gate is satisfied;
3. the task's governing specifications and accepted decisions are current and internally consistent;
4. the work remains inside the task's scope and acceptance criteria;
5. unresolved provider, security, privacy, payment, AI, legal and production gates remain respected.

`BLOCKED` tasks are not authorized. General implementation authorization does not make all tasks eligible, allow Claude Code to bypass dependencies, or permit Claude Code to self-approve an owner decision.

Production deployment, customer launch, production provider activation, production credentials and production data remain separately gated and are not authorized by this implementation handoff.

Never interpret a roadmap item, backlog entry, draft, example, provider name or test scenario as authorization to build.

---

## 3. Source of truth

The approved files committed to the default branch of the private GitHub repository are the permanent source of truth.

Authority order:

1. `docs/00_CLAUDE_RULES.md` — engineering constitution and highest project-level instruction;
2. the approved domain-specific document governing the exact question;
3. `project/DECISIONS.md` — durable accepted, rejected and superseded decisions;
4. `project/CURRENT_STATE.md` — latest verified state;
5. `project/TASKS.md` — authorized work queue;
6. `project/CHANGELOG.md` — material change summary;
7. `project/BACKLOG.md` — non-authoritative future candidates only;
8. Git history — exact repository-change evidence.

This `CLAUDE.md` routes execution but cannot silently override `docs/00_CLAUDE_RULES.md` or a more specific approved source.

If two approved sources conflict:

- stop the affected work;
- identify the exact conflicting statements and files;
- determine whether `project/DECISIONS.md` explicitly resolves the conflict;
- if not, propose the smallest documentation correction;
- wait for owner approval before implementation.

Do not choose whichever statement is easier to implement.

---

## 4. Approval states

Treat a file as authoritative only when its header and approval record state that it is owner-approved and it is committed to the default branch.

- `Draft` or `Pending Owner Review` — not authoritative;
- `Approved — Owner Approved` — authoritative after commit verification;
- a shorter `Status: Approved` is also authoritative when the same committed document's explicit metadata and approval record unambiguously record owner approval, approval date, approved version, and source-of-truth authority;
- proposals inside a draft — not decisions;
- approved owner decisions — authoritative within the document's scope;
- backlog items — not approved scope even when well specified;
- historical hypotheses — not current requirements.

Do not commit a draft as an approved file. Do not mark a file approved without explicit owner approval.

---

## 5. Mandatory reading order

Before any implementation task, read the following in order:

1. `CLAUDE.md`;
2. `docs/00_CLAUDE_RULES.md`;
3. `project/CURRENT_STATE.md`;
4. `project/TASKS.md`;
5. `project/DECISIONS.md`;
6. the task's primary specification documents;
7. every linked product rule and architecture document that constrains the task;
8. `project/CHANGELOG.md` for recent material changes;
9. relevant existing code, tests, migrations and configuration after implementation exists.

Read `project/BACKLOG.md` only to prevent accidental scope leakage or to evaluate a specifically authorized promotion. Never implement directly from it.

### 5.1 Task-specific routing

For product scope and user behavior, read:

- `docs/01_PROJECT_VISION.md`;
- `docs/02_BUSINESS_MODEL.md`;
- `docs/03_MVP_PRD.md`;
- the relevant file under `product/`.

For domain or data work, read:

- `docs/04_DOMAIN_MODEL.md`;
- `docs/06_DATABASE_DESIGN.md`;
- relevant entitlement, guest, payment and security rules.

For system boundaries or provider selection, read:

- `docs/05_SYSTEM_ARCHITECTURE.md`;
- the relevant specialist architecture document;
- `docs/12_DEPLOYMENT.md`;
- `project/DECISIONS.md`.

For AI work, also read:

- `docs/07_AI_ARCHITECTURE.md`;
- `product/AI_USAGE_RULES.md`;
- `docs/09_SECURITY_ARCHITECTURE.md`;
- `docs/11_TESTING_STRATEGY.md`.

For payments or commercial behavior, also read:

- `docs/08_PAYMENT_ARCHITECTURE.md`;
- `product/PRICING_RULES.md`;
- `product/ENTITLEMENTS.md`;
- `docs/09_SECURITY_ARCHITECTURE.md`.

For guest flows, also read:

- `product/GUEST_RULES.md`;
- `docs/09_SECURITY_ARCHITECTURE.md`;
- `docs/10_DESIGN_SYSTEM.md`;
- `product/LOCALIZATION.md`.

For UI or localization, also read:

- `docs/10_DESIGN_SYSTEM.md`;
- `product/LOCALIZATION.md`;
- relevant entitlement and guest rules.

For testing, deployment or release work, read:

- `docs/11_TESTING_STRATEGY.md`;
- `docs/12_DEPLOYMENT.md`;
- `docs/13_ROADMAP.md`;
- `project/CHANGELOG.md`.

---

## 6. Fixed product facts

Unless superseded through an approved decision:

- the MVP event type is weddings only;
- Mauritius is the initial operating market, but the product is globally accessible;
- global accessibility does not automatically enable every market, payment method, currency, tax treatment, language or support promise;
- the commercial model uses one-time, event-scoped Essential, Signature and Premium packages;
- subscriptions, stored-value wallets and automatic overages are rejected for the current direction;
- every tier receives the complete core workflow and the same security, privacy and accessibility baseline;
- package guest capacities are 100, 300 and 750;
- initial design-concept allowances are 1, 3 and 5;
- refinement allowances are 2, 6 and 12;
- invitation-language slots are 1, 2 and 3;
- hosting periods are 30, 90 and 365 days from first publication;
- first publication normally must occur within 180 days of purchase;
- MUR is the base commercial currency;
- final launch prices remain unapproved;
- EUR and USD checkout require approved price books and market/payment/tax readiness;
- English is primary, French second, Mauritian Kreol is specifically intended for Mauritius, and Russian requires activation readiness;
- guests use private party-token access for the core accountless RSVP flow;
- default invitation read/open tracking is rejected;
- AI is bounded assistance, not autonomous authority;
- silent cross-provider AI failover is prohibited;
- provider-hosted or provider-controlled checkout is required;
- Kubernetes is excluded from MVP;
- the initial engineering stack is approved by `DEC-023`; provisional production platforms and unresolved specialist/commercial providers remain gated.

Do not abbreviate or reinterpret these facts in ways that weaken their source documents.

---

## 7. Deliberately undecided matters

Do not select, install, configure or encode a production dependency for any of the following without an approved task and decision:

- framework, runtime or database version changes beyond the approved `DEC-023` baseline;
- final production database-provider activation and plan;
- authentication/identity provider;
- object/media storage provider;
- AI providers, models, regions and retention terms;
- payment provider or acquiring bank;
- email provider;
- hosting provider;
- observability and analytics providers;
- final production payment methods;
- final prices, discounts, add-ons and refund rules;
- production tax behavior;
- production domains and support channels;
- activated international markets.

Names such as Next.js, Supabase, Clerk, Replicate, JouJouPay, Cloudinary, Vercel or Sentry may appear in historical material or examples. They are not approved selections.

---

## 8. External-fact research rule

Research current official sources before making or recommending any decision that depends on changeable external facts, including:

- framework, runtime and library versions;
- provider capabilities, regions, terms, retention, security and pricing;
- AI model availability and API behavior;
- payment methods, acquiring-bank support and merchant eligibility;
- MCB Juice, MauCAS, SBM Tag, blink or other local payment support;
- hosting, deployment and managed-service constraints;
- Mauritius data-protection, consumer, tax, invoicing and payment obligations;
- accessibility or security standards that may have changed.

Research rules:

1. prefer current official documentation, law, regulator, provider or standards sources;
2. record access date and source link in the decision or research artifact;
3. distinguish verified facts from inference;
4. compare credible alternatives when making a selection;
5. identify cost, security, privacy, migration, lock-in and operational trade-offs;
6. do not convert research into implementation authority without owner approval;
7. revalidate critical provider facts before production launch.

If official evidence is unavailable or ambiguous, say so and keep the decision pending.

---

## 9. Task authorization protocol

Before changing code or configuration, confirm all of the following:

- the task exists in `project/TASKS.md`;
- its state authorizes execution;
- dependencies and owner decisions are satisfied;
- the relevant specifications are approved;
- no unresolved conflict affects it;
- acceptance criteria and evidence are clear;
- security, privacy, accessibility and localization implications have been considered;
- the intended files and scope are understood;
- required external facts are current;
- rollback or recovery is defined when the change is risky.

If any item fails, stop and report the blocker. Do not expand scope to work around it.

Execute one coherent authorized task at a time. Do not opportunistically implement adjacent backlog items or refactor unrelated areas.

---

## 10. Implementation workflow

For each authorized implementation task:

1. restate the task, scope and acceptance criteria;
2. inspect the current repository state and relevant tests;
3. list affected specifications and decision IDs;
4. state assumptions and blockers;
5. make the smallest coherent change that satisfies the task;
6. preserve established boundaries and naming;
7. add or update required tests;
8. run the relevant validation suite;
9. perform security, privacy, accessibility and localization checks proportionate to risk;
10. inspect the final diff for unrelated changes, secrets and generated artifacts;
11. update project records required by the task;
12. report exactly what changed, what was verified and what remains unresolved.

Do not claim success merely because code compiles or a happy-path test passes.

---

## 11. Engineering invariants

### 11.1 Security and privacy

- enforce authentication, authorization, ownership and entitlements server-side;
- deny by default;
- validate all untrusted input;
- encode output appropriately for its context;
- use least privilege;
- never commit secrets or credentials;
- never log bearer tokens, payment secrets, raw personal data or sensitive AI prompts unnecessarily;
- treat private party tokens as bearer secrets;
- separate public identifiers from internal identifiers and secrets;
- apply rate limits and abuse controls to public and expensive operations;
- maintain auditability for privileged and financially significant actions;
- do not weaken safety controls for lower tiers.

### 11.2 Payments

- never store, process or log raw card numbers, CVV/CVC, PINs, banking credentials or payment authentication secrets;
- use provider-hosted or provider-controlled checkout;
- calculate and freeze authoritative price and currency server-side;
- never trust client values or redirect pages as proof of payment;
- authenticate, deduplicate and idempotently process webhooks;
- reconcile provider events with internal payment state;
- grant entitlements only from verified payment truth;
- verify production support before advertising any payment method;
- keep tax rules configurable and professionally approved.

### 11.3 Money and entitlements

- store money in integer minor units with an explicit ISO currency code;
- never use floating-point arithmetic for authoritative money calculations;
- snapshot purchased package, price and entitlement facts;
- do not retroactively mutate purchased rights through catalog changes;
- use explicit, auditable entitlement grants and consumption;
- never create surprise charges or automatic overages.

### 11.4 Guests

- preserve accountless RSVP for the core flow;
- scope guest access to the authorized party and event;
- do not expose private invitation data through enumeration, analytics or logs;
- minimize guest data and retention;
- do not add default read/open surveillance;
- treat health, allergy, religious or similar sensitive information with heightened controls if ever authorized.

### 11.5 AI

- expose bounded typed actions rather than arbitrary autonomous authority;
- validate structured inputs and outputs;
- protect system instructions and tools from prompt injection;
- do not let AI invent names, dates, venues, prices or other event facts;
- do not infer sensitive personal or cultural attributes;
- require host review before material AI output is published;
- meter usage server-side against immutable entitlement facts;
- version prompts, model routes and relevant policies;
- do not silently transfer data to another provider;
- fail safely when provider, validation, moderation or budget controls fail.

### 11.6 Accessibility and localization

- design mobile-first without making desktop secondary or broken;
- preserve keyboard access, focus visibility, semantic structure and screen-reader meaning;
- meet the approved contrast and reduced-motion requirements;
- never encode meaning through color or animation alone;
- keep UI locale separate from invitation-content language;
- support Unicode, diacritics and Cyrillic safely;
- use reviewed translations for legal, security, payment and irreversible-action copy;
- do not transliterate personal names automatically.

### 11.7 Data and history

- preserve immutable or append-only history where specifications require it;
- use traceable compensating records instead of destructive financial/history edits;
- make migrations reversible or provide a tested recovery path;
- protect tenant and event isolation at every access layer;
- define retention and deletion behavior explicitly;
- do not create production data models from a provider-specific convenience alone.

---

## 12. Quality and testing

Follow `docs/11_TESTING_STRATEGY.md`.

At minimum, each task must supply evidence proportionate to its risk:

- unit tests for domain rules and calculations;
- integration tests for persistence, authorization and provider adapters;
- contract tests for external provider boundaries;
- end-to-end tests for critical customer, guest, payment and administrative flows;
- negative tests for unauthorized, invalid, duplicated and replayed actions;
- accessibility checks for core flows;
- localization checks for supported scripts, formatting and overflow;
- security tests for relevant threat cases;
- migration and rollback tests for data changes;
- observability verification for critical failures.

Do not delete, skip or weaken tests merely to make a change pass. A flaky or obsolete test requires diagnosis and an explicit correction.

No production launch may proceed with unresolved release-blocking failures defined by the approved testing and security documents.

---

## 13. Dependency and configuration rules

- add only dependencies required by an authorized task;
- prefer maintained, well-scoped packages over unnecessary frameworks or custom complexity;
- verify versions, licenses, advisories and compatibility from official sources;
- pin or constrain versions according to the approved dependency policy once selected;
- commit lockfiles when the selected ecosystem requires them;
- do not add Kubernetes or comparable orchestration to the MVP;
- do not place secrets in source, examples, tests, logs or client bundles;
- update `.env.example` with names and safe descriptions only—never real values;
- validate required configuration at startup;
- separate development, test, staging and production configuration;
- fail closed for missing security-critical configuration.

---

## 14. Git and change discipline

- preserve user changes and unrelated work;
- inspect before editing;
- keep commits focused and descriptive;
- never commit unapproved documentation as authoritative;
- never rewrite shared history unless explicitly authorized;
- never use destructive cleanup to hide unrelated changes;
- do not commit generated secrets, local environments, build output, logs, coverage artifacts or editor state;
- update `project/CHANGELOG.md` only for material changes under its approved rules;
- update `project/DECISIONS.md` only through its explicit decision and supersession procedure;
- update `project/CURRENT_STATE.md` when verified state materially changes;
- update `project/TASKS.md` with truthful status and evidence.

Before a handoff, inspect the diff and repository status. Report any unrelated existing changes without modifying them.

---

## 15. Documentation discipline

When a task changes behavior, update every affected authoritative document in the same controlled workstream or stop if owner approval is required.

Documentation must:

- distinguish current truth, accepted decisions, proposals and future ideas;
- avoid invented provider, legal, tax, price or performance claims;
- use stable terminology from the domain model;
- link durable decisions by ID where relevant;
- state migration and customer impact for breaking changes;
- preserve historical decisions through explicit supersession;
- avoid exposing secrets or exploit instructions;
- remain understandable to both Claude Code and human reviewers.

Do not update documentation after the fact merely to justify an implementation that contradicted it.

---

## 16. Stop conditions

Stop and ask for direction when:

- the task is not `READY` or otherwise explicitly authorized under `project/TASKS.md`;
- an approved source conflicts with another approved source;
- the requested work exceeds the authorized task;
- a material owner decision is missing;
- current official evidence is unavailable or contradictory;
- a vendor choice would be silently locked in;
- a legal, tax, payment or privacy conclusion requires professional confirmation;
- production credentials, permissions or protected workflows are missing;
- destructive or irreversible action is not explicitly authorized;
- the safe migration or rollback path is unclear;
- tests reveal a critical security, payment, authorization or data-integrity failure;
- the requested result would weaken an approved invariant;
- a backlog item is being treated as approved scope.

When stopping, provide:

1. the exact blocker;
2. the affected task and files;
3. the risk of guessing;
4. the smallest decision or evidence needed to continue;
5. safe options where meaningful.

---

## 17. Handoff format

For every completed implementation task, report:

- outcome;
- authorized task ID;
- files changed;
- decisions and specifications applied;
- tests and checks run, with results;
- security, privacy, accessibility and localization checks performed;
- migrations or configuration changes;
- known limitations or remaining risks;
- documentation/project-record updates;
- rollback instructions when applicable;
- recommended next authorized task, without starting it.

Never report a feature as released unless it has been deployed and verified in the intended environment.

---

## 18. Approved owner decisions

### Decision 1 — Operational entry point

**Approved:** Use root `CLAUDE.md` as Claude Code's mandatory operational entry point while keeping `docs/00_CLAUDE_RULES.md` the highest project-level engineering constitution.

### Decision 2 — Implementation authorization gate

**Approved:** Keep implementation prohibited until the package is complete, the final consistency audit passes, project state/tasks record readiness and the owner explicitly authorizes implementation. After those conditions are satisfied, permit implementation only through eligible tasks in `project/TASKS.md`; production remains separately gated.

### Decision 3 — Mandatory read set

**Approved:** Require Claude Code to read the constitution, current state, authorized tasks, decisions and task-specific specifications before changing code or configuration.

### Decision 4 — One authorized task at a time

**Approved:** Execute one coherent authorized task at a time and prohibit opportunistic backlog work, unrelated refactoring and silent scope expansion.

### Decision 5 — Conflict behavior

**Approved:** When approved sources conflict and no accepted decision resolves them, stop affected work and request the smallest owner-approved documentation correction instead of guessing.

### Decision 6 — Provider selection gate

**Approved:** Prohibit selection, installation or production configuration of undecided providers until a documented current-official-source evaluation and owner-approved task authorize it.

### Decision 7 — Universal engineering invariants

**Approved:** Treat security, privacy, payment truth, entitlement integrity, guest isolation, bounded AI, accessibility, localization and durable history requirements as non-negotiable implementation invariants.

### Decision 8 — Evidence-based completion

**Approved:** Require task completion reports to include tests and verification evidence; code compilation or a happy-path demonstration alone is insufficient.

### Decision 9 — Stop rather than improvise

**Approved:** Require Claude Code to stop when authority, evidence, safety, scope, migration or rollback is unclear and to present the smallest decision needed to continue.

### Decision 10 — No false release claims

**Approved:** Prohibit describing documented, merged, staged, feature-flagged or unverified work as released; release claims require deployment and verification in the intended environment.

---

## 19. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.2.  
**Approved date:** 2026-08-20.  
**Owner decisions:** Decisions 1–10 approved as proposed.
