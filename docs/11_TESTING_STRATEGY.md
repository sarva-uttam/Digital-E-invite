# Testing Strategy

**File:** `docs/11_TESTING_STRATEGY.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.0  
**Approved date:** 2026-08-17  
**Depends on:** `docs/00_CLAUDE_RULES.md` through `docs/10_DESIGN_SYSTEM.md`

---

## 1. Purpose

This document defines how the MVP earns release confidence. Testing must show that the platform protects event owners and guests, preserves data integrity, charges correctly, uses AI within approved limits, remains accessible on mobile devices, and recovers safely from failures.

Testing is not a final phase. Acceptance criteria, automated checks, observability, and recovery evidence are developed with each feature.

---

## 2. Quality objectives

The test programme prioritizes:

1. no unauthorized access across accounts, events, guest parties, or administrative functions;
2. no publication without a verified successful payment and valid entitlement;
3. no double charge, double grant, or duplicate RSVP side effect;
4. accurate public invitation facts and privacy-preserving RSVP behavior;
5. durable event, payment, AI-usage, invitation-version, and audit records;
6. usable WCAG 2.2 Level AA flows on representative mobile and desktop configurations;
7. bounded AI behavior, cost, retries, and asset handling;
8. observable failures and tested recovery procedures;
9. safe deployment and database migration;
10. acceptable performance on realistic Mauritius and international network conditions.

No single test layer or coverage percentage proves these objectives.

---

## 3. Governing principles

### 3.1 Test behavior and contracts

Tests should assert public behavior, domain invariants, persisted outcomes, and user-visible effects. Component tests query and operate the interface as users do rather than binding to component internals.

### 3.2 Risk determines depth

Payments, authorization, accountless RSVP, publication, entitlement use, AI usage, immutable invitation versions, and destructive administrative actions receive deeper and more independent testing than low-risk presentation details.

### 3.3 Prefer deterministic evidence

Control clocks, random identifiers, queues, exchange-rate fixtures, provider responses, and network behavior. Every test owns its data and can run independently. A retry may diagnose instability but must not redefine a failing test as healthy.

### 3.4 Use real boundaries selectively

Pure logic uses fast isolated tests. Database behavior is verified against real PostgreSQL. External services use faithful fakes for most tests plus provider sandbox or contract tests for the narrow integration boundary.

### 3.5 Production is not a test environment

Use synthetic identities, events, guests, payments, and assets. Production personal data, credentials, payment details, invitation tokens, or logs must never be copied into routine test environments.

### 3.6 Test failure behavior

Every critical workflow covers success, rejection, timeout, duplicate, stale, malformed, unauthorized, out-of-order, partial-failure, and recovery cases where applicable.

---

## 4. Test portfolio

| Layer | Purpose | Typical scope | Default execution |
|---|---|---|---|
| Static checks | Catch structural defects | TypeScript, lint, formatting, schemas, dependency policy | every pull request |
| Unit | Prove pure rules and state transitions | pricing, entitlements, permissions, validation, reducers | local and every pull request |
| Component | Prove accessible UI behavior | forms, dialogs, status states, design-system components | every pull request |
| Integration | Prove modules with real infrastructure | repositories, transactions, queues, object storage adapters | every pull request or main |
| Contract | Prove provider boundary assumptions | auth, payment, AI, email, storage payloads | main, scheduled, pre-release |
| End-to-end | Prove critical user journeys | browser through application and worker | main and pre-release |
| Non-functional | Prove quality attributes | security, accessibility, performance, resilience, recovery | tiered and pre-release |
| Exploratory | Find unanticipated defects | real devices, edge cases, language/cultural review | each release candidate |

The suite should have many focused unit/integration tests and a deliberately small, reliable set of end-to-end journeys. End-to-end tests do not replace lower-level invariant tests.

---

## 5. Proposed tooling

Subject to an implementation-time compatibility and licensing check:

- **Vitest** for TypeScript unit, service, and selected integration tests;
- **Testing Library** for DOM/component behavior, emphasizing accessible roles, labels, and user-visible outcomes;
- **Playwright Test** for browser end-to-end, responsive, cross-browser, and selected accessibility journeys;
- a real disposable **PostgreSQL** database for repository, constraint, transaction, concurrency, migration, and restore tests;
- **axe-core** integrated into representative browser states for automated accessibility checks;
- provider-specific SDK test utilities, signed fixtures, and sandboxes when officially supported;
- approved SAST, software-composition analysis, secret scanning, container/image scanning, and dynamic security tools;
- load-generation and observability tools selected during implementation based on the deployed architecture.

Exact package versions must be checked, pinned in the lockfile, and upgraded deliberately. No floating `latest` dependency is permitted in reproducible CI.

Vitest supports V8 and Istanbul coverage. Playwright supports Chromium, Firefox, WebKit, mobile emulation, retries, and diagnostic traces. These capabilities do not by themselves establish product correctness.

---

## 6. Test structure and naming

Tests live close to the code when ownership is clear, with cross-application suites in dedicated test packages. Proposed categories:

```text
*.unit.test.ts
*.component.test.tsx
*.integration.test.ts
*.contract.test.ts
*.e2e.spec.ts
*.security.test.ts
*.a11y.spec.ts
```

Each test name states the condition and observable outcome. Critical tests link to the requirement, domain invariant, threat, or decision they prove. Test-only helpers must not leak into production bundles.

---

## 7. Static verification

Every pull request must run:

- strict TypeScript compilation;
- linting and formatting verification;
- package-boundary and import-direction checks;
- database schema and generated migration validation;
- API/event/schema compatibility checks;
- secret scanning;
- dependency vulnerability and licence-policy checks;
- prohibited pattern checks for raw payment data, unsafe logging, arbitrary theme code, and unapproved external URLs;
- build verification for web and worker applications.

Warnings that represent release policy violations fail the check. Suppressions require a documented reason, owner, expiry, and review.

---

## 8. Unit and domain tests

Unit tests cover at least:

- event lifecycle transitions;
- package pricing and entitlement grants/consumption;
- MUR base pricing and approved EUR/USD presentment rules;
- server-side amount, currency, tax, and rounding calculation;
- payment and refund state transitions;
- publication eligibility;
- invitation version immutability and selection;
- guest-party capacity, membership, and RSVP revision rules;
- public projection and field redaction;
- AI usage reservation, debit, refund, retry, and exhaustion rules;
- prompt/input validation and structured-output parsing;
- locale fallback, date/time, number, and currency formatting;
- expiration, unpublish, and grace-period rules;
- authorization policy functions;
- token hashing/verification and non-disclosing error behavior;
- audit-event construction and sensitive-field redaction.

Property-based or table-driven tests should be used where combinations are large, especially money, capacity, authorization, state machines, and idempotency keys.

---

## 9. Component and design-system tests

Components are exercised through their accessible roles, names, labels, text, and keyboard behavior. Required states include:

- default, hover where relevant, focus, active, disabled, and read-only;
- loading, empty, validation error, service error, success, pending, expired, and unauthorized;
- long names, venues, prices, translations, and error messages;
- duplicate submission protection;
- asynchronous status announcements;
- focus placement and restoration for dialogs and route changes;
- reduced motion;
- 200% zoom and responsive reflow;
- English, French, and Mauritian Kreol; Russian only when activated.

Snapshots may assist review of stable structured output but must not become broad, unreviewed substitutes for behavioral assertions. Invitation themes require representative visual-regression baselines after their rendering environment is stabilized.

---

## 10. Database and persistence tests

Database integration tests use the same supported PostgreSQL major version and extensions as production. They verify:

- migrations from every supported deployed schema state;
- primary, foreign-key, unique, check, and exclusion constraints;
- transaction boundaries and rollback;
- concurrent entitlement consumption;
- duplicate webhook/event insertion;
- RSVP revision serialization and latest-state projection;
- immutable invitation versions and append-only ledgers/audits;
- ownership scoping in every repository query;
- deletion, retention, anonymization, and expiration jobs;
- queue claim, retry, timeout, and dead-letter behavior;
- timestamp/timezone correctness;
- index-backed performance for expected access paths;
- backup creation, restoration into an isolated database, integrity checks, and sampled application reads.

Mocks cannot replace tests of SQL constraints, locking, isolation, or migrations.

---

## 11. Critical end-to-end journeys

The maintained end-to-end suite covers:

1. create an account, authenticate, and establish a secure session;
2. create a wedding event and enter required factual details;
3. choose a package and confirm entitlements without consuming payment-only rights prematurely;
4. create an AI concept, observe queued/running/succeeded status, and preserve usage accounting;
5. edit content and create immutable invitation versions;
6. preview the exact candidate version before payment;
7. enter provider-controlled checkout, return in a verifying state, receive verified server confirmation, and publish;
8. import valid guest parties by CSV and report invalid rows safely;
9. generate QR/public links and open a published invitation without an account;
10. submit and revise an accountless RSVP through the authorized guest-party flow;
11. view owner RSVP summaries without cross-event disclosure;
12. unpublish or expire an event and observe the correct public response;
13. recover cleanly from AI, email, payment, and worker failure;
14. reject cross-owner access and guessed public/management identifiers.

At least one release-candidate run uses the selected auth/payment/AI/email/storage sandboxes where safe and supported; destructive or chargeable live-provider tests require explicit controls and budgets.

---

## 12. Payment testing

Payment tests are mandatory release gates. They cover:

- price, currency, tax, rounding, and package calculated server-side;
- provider checkout parameters matching the frozen order;
- valid and invalid webhook signatures;
- duplicate delivery and replay;
- out-of-order events;
- delayed webhook after browser return;
- forged browser success and altered client values;
- amount, currency, merchant, order, and environment mismatch;
- failed, cancelled, expired, pending, authorized, captured, refunded, and disputed states where supported;
- simultaneous delivery/concurrency;
- idempotent payment recording and entitlement grant;
- partial and full refund behavior where supported;
- retry and dead-letter handling;
- reconciliation against provider settlement/export data;
- redaction of card, authentication, banking, and provider-secret material;
- production configuration tests for only verified Visa, Mastercard, MCB Juice, MauCAS/SBM Tag, blink, and other approved methods.

No test uses raw card numbers beyond provider-published sandbox test values inside the provider-controlled surface. Production smoke tests must not create uncontrolled charges.

---

## 13. AI testing

AI tests separate deterministic platform obligations from probabilistic output quality.

### Deterministic controls

Test:

- input size/type validation and sanitization;
- prompt-template version selection;
- structured response schema validation;
- model/provider allow-list and pinned identifier;
- timeout, cancellation, retry, and terminal-state behavior;
- idempotency and duplicate worker delivery;
- usage reservation, debit, refund, and exhaustion;
- output and asset provenance;
- moderation and blocked-content handling;
- image download limits, MIME verification, dimensions, decompression limits, metadata handling, storage, and malware controls;
- prompt-injection attempts in owner text, uploaded filenames/metadata, and provider output;
- absence of silent cross-provider failover;
- sensitive-data and secret redaction in logs/traces.

### Quality evaluation

Maintain a versioned, synthetic evaluation set representing English, French, and Mauritian Kreol wedding inputs, cultural neutrality, long/short content, missing optional fields, and difficult layouts. Score factual fidelity, schema validity, readability, cultural safety, visual usefulness, and policy compliance. Human review remains required for subjective invitation quality.

Provider contract tests run on a small controlled schedule and on provider/model changes. Recorded fixtures must be sanitized, versioned, and periodically refreshed; they do not prove that the current provider is available.

---

## 14. Security testing

Security verification maps to the approved threat model, OWASP ASVS 5.0 Level 2 controls, and applicable versioned OWASP Web Security Testing Guide scenarios.

At minimum test:

- authentication, logout, session rotation, expiration, revocation, and MFA for admin/support;
- authorization matrix across anonymous guest, event owner, planner context if introduced, support, and administrator;
- horizontal and vertical access attempts for every identifier-bearing route/action;
- CSRF, XSS, injection, SSRF, open redirect, path traversal, unsafe file upload, mass assignment, and insecure deserialization risks as applicable;
- public invitation slug enumeration and noindex behavior;
- accountless RSVP token entropy, hashing, expiry/revocation, rate limits, replay, and non-disclosing responses;
- webhook authentication and replay resistance;
- rate limiting, abuse, bot, and resource-exhaustion controls;
- security headers, cookies, CORS, content security policy, and transport configuration;
- log/audit integrity and sensitive-data redaction;
- secret rotation and failure under missing/mis-scoped credentials;
- dependency, build artifact, container, and infrastructure scanning;
- backup access and recovery authorization.

Before launch, an independent penetration test or equivalent qualified assessment must cover authenticated, public, RSVP, upload, AI, payment, and administrative surfaces. No known critical or high-severity payment/security vulnerability may remain unresolved at launch. Exceptions for lower severities require owner acceptance, compensating controls, and expiry.

---

## 15. Accessibility and usability testing

The target is WCAG 2.2 Level AA for the product, published invitations, and RSVP.

Automated axe-core checks run on representative states in real browsers, but automation is only one input. Manual release testing includes:

- complete keyboard-only journeys and visible focus;
- screen-reader testing on at least one representative desktop and one mobile combination;
- 200% zoom, text resizing, reflow, and orientation changes;
- contrast and non-colour status cues;
- labels, instructions, errors, live status, and focus recovery;
- target size, pointer alternatives, and no drag-only behavior;
- reduced motion;
- password-manager/paste-compatible authentication;
- invitation artwork with semantic factual text and accessible RSVP controls;
- comprehension/usability checks for payment verification, entitlement use, closed RSVP, and errors.

Conformance is assessed against WCAG success criteria, not inferred from an automated tool result. Accessibility defects are prioritized by user impact; blocking completion of a critical flow is release-blocking.

---

## 16. Localization, culture, and content testing

For English, French, and Mauritian Kreol:

- verify translated routes and fallback behavior;
- test 30–40% text expansion and long unbroken content;
- test accents/diacritics, apostrophes, punctuation, pluralization, and character encoding;
- verify locale-aware dates, times, numbers, MUR/EUR/USD, and timezone display;
- preserve owner-entered names, addresses, and venue text;
- ensure emails, CSV exports/imports, QR destinations, metadata, and public pages use consistent language;
- review important Mauritian Kreol terminology with a competent human reviewer;
- verify motifs are owner-selected and never inferred from names, locale, identity, or venue.

Russian tests become mandatory only when Russian interface support is approved and activated. Global accessibility does not imply every country, currency, tax regime, or language is supported.

---

## 17. Performance and capacity testing

Performance tests use representative low/mid-range mobile devices or calibrated emulation, mobile networks, realistic invitation assets, and production-like caching.

Measure:

- public invitation and RSVP Core Web Vitals;
- time until factual content and RSVP controls are usable;
- dashboard/editor interaction and preview refresh;
- image/font payload, responsive selection, and layout shift;
- API latency by critical route;
- queue delay and AI-job throughput;
- CSV import size/processing behavior;
- concurrent RSVP and payment webhook handling;
- database query plans and connection pressure;
- graceful behavior at configured rate and resource limits.

Numeric budgets must be established from the deployment architecture and validated during implementation. A release cannot waive severe mobile usability or capacity regressions merely because decorative assets are attractive.

MVP testing is bounded to forecast launch volume plus an agreed safety margin; internet-scale stress claims are excluded.

---

## 18. Resilience, recovery, and observability

Fault-injection or controlled failure tests cover:

- database, cache/queue, storage, email, AI, payment, and authentication-provider outage;
- worker crash after external success but before local acknowledgement;
- repeated, delayed, and poisoned jobs;
- network timeout and ambiguous external result;
- deployment during in-flight work;
- storage object missing/corrupt;
- backup restoration and application verification;
- alert delivery and escalation for critical symptoms.

Tests assert not only the response but also metrics, structured logs, traces, audit entries, dead-letter records, reconciliation flags, and user-safe messages. Synthetic production monitoring may exercise non-destructive public and authenticated smoke flows without exposing guest data or generating uncontrolled provider cost.

---

## 19. Test data and environments

### Test data

- Synthetic data only by default.
- Clearly fictional people, venues, phone numbers, email domains, and payment references.
- No production database snapshots in development or CI.
- Sanitized provider fixtures contain no reusable secrets or personal/payment data.
- Seed generation is deterministic and versioned.
- Tests clean up or uniquely namespace their records.

### Environments

- **Local/ephemeral:** isolated services, real disposable PostgreSQL, provider fakes.
- **CI:** reproducible containers/services with no production credentials.
- **Staging:** production-like configuration and provider sandboxes, separated secrets and data.
- **Production:** post-deploy read-only/non-destructive smoke and synthetic monitoring only.

Environment indicators must be unmistakable. Sandbox and production webhook credentials, endpoints, signing secrets, and merchant identifiers cannot be interchangeable.

---

## 20. CI execution tiers

### Pull request gate

- static checks and build;
- changed-area unit/component tests;
- complete critical domain/authorization tests;
- database migration validation and selected integration tests;
- secret/dependency scanning;
- compact Chromium smoke journey and automated accessibility checks where runtime permits.

### Main branch gate

- full unit, component, integration, and contract-fake suites;
- full migration-from-baseline test;
- critical Playwright journeys;
- Chromium, Firefox, and WebKit coverage for the agreed browser matrix;
- representative mobile projects;
- coverage and test-result publication.

### Release-candidate gate

- clean production-like staging deployment;
- selected live sandbox provider contracts;
- full critical E2E suite;
- manual accessibility, usability, localization, cultural, and responsive review;
- security scans and penetration-test status;
- performance budgets;
- backup/restore evidence;
- alerting, reconciliation, rollback, and incident-readiness checks.

### Scheduled checks

- dependency/security scans;
- provider contract canaries;
- full browser matrix;
- restore drill;
- reconciliation and retention jobs;
- AI evaluation suite;
- longer-running resilience and capacity tests.

---

## 21. Coverage policy

Coverage is a diagnostic and minimum hygiene signal, not a quality target in isolation.

Proposed initial gates:

- changed production code must not reduce repository coverage without an approved reason;
- at least **80% line and branch coverage** for domain/application modules overall;
- **100% of enumerated critical invariants and state transitions** must have explicit tests, regardless of percentage;
- generated code, type-only declarations, migrations, and trivial adapters may have documented exclusions;
- UI coverage is judged primarily by behavior/state coverage rather than chasing line percentage.

Thresholds should be calibrated after the first implementation slice. Lowering a gate requires a recorded decision; increasing it is encouraged when it improves meaningful confidence.

---

## 22. Flaky-test policy

A test that passes only after retry is reported as flaky and creates work; it is not silently accepted.

- Critical-path flakes block release until fixed or the affected feature is explicitly withheld.
- Quarantine is temporary, visible, owned, linked to an issue, and time-limited.
- Quarantined tests do not count toward required release evidence.
- Fix root causes such as shared state, uncontrolled time/randomness, ambiguous waits, external dependency, and resource contention.
- Playwright traces are retained for failures/first retries according to CI storage policy, with sensitive-data controls.
- Global retries remain low and are never used to mask deterministic defects.

---

## 23. Defect severity and release gates

### Severity

- **Critical:** compromise, raw payment/credential exposure, unauthorized material access, incorrect charge/entitlement, unrecoverable corruption, or widespread outage.
- **High:** critical journey blocked, serious privacy/accessibility failure, payment reconciliation failure, or likely major data loss.
- **Medium:** material degradation with a safe workaround and limited impact.
- **Low:** minor defect without meaningful task, security, privacy, accessibility, or accounting impact.

### Release rule

Production launch requires:

- all required CI and release-candidate gates passing;
- no unresolved known Critical or High defect;
- no unresolved Critical or High security/payment vulnerability;
- successful migration, rollback/forward-fix, backup restore, and smoke evidence;
- selected provider production-readiness evidence;
- manual accessibility and critical-device sign-off;
- monitoring, reconciliation, support, and incident runbooks ready;
- explicit owner approval.

Medium/Low exceptions require a recorded owner, impact, workaround, target date, and acceptance. A failing check cannot be bypassed without an auditable decision.

---

## 24. Change-specific requirements

Every change includes tests appropriate to its risk:

- bug fixes add a regression test that fails before the fix where practical;
- domain-rule changes update decision tables and invariants;
- schema changes prove upgrade and rollback/forward-fix behavior;
- provider SDK/API/model changes refresh and run contract tests;
- invitation theme changes run factual-content, responsive, accessibility, and visual review;
- payment changes run the complete affected payment matrix and reconciliation cases;
- authorization changes run the full affected role/resource matrix;
- localization changes test every active locale and fallback;
- observability changes prove the expected signal without sensitive data.

Test-only changes receive normal review because weakening an assertion can conceal a production regression.

---

## 25. Manual exploratory testing

Each release candidate receives a chartered exploratory session across:

- a representative iPhone/Safari path;
- a representative Android/Chrome path;
- desktop keyboard and screen-reader paths;
- slow/interrupted networks and repeated taps;
- long and unusual but valid wedding content;
- English, French, and Mauritian Kreol;
- invitation preview versus published parity;
- accountless RSVP and privacy boundaries;
- payment return/verifying/failure recovery;
- owner support and administrative actions.

Findings are recorded with environment, data, steps, evidence, impact, and disposition.

---

## 26. Ownership and traceability

- The implementer authors automated tests with the feature.
- The reviewer verifies that tests would fail for the relevant defect and cover boundary cases.
- Security-sensitive work receives security review.
- Product/design reviews visible behavior, language, responsive layout, and accessibility.
- Operations owns recovery drill evidence with engineering participation.
- The owner approves release exceptions and final production launch.

Maintain a lightweight traceability map from critical PRD acceptance criteria, architecture invariants, security controls, and owner decisions to automated or manual evidence. Avoid a bureaucratic matrix for low-risk details.

---

## 27. Metrics

Track trends rather than optimizing isolated numbers:

- escaped defects by severity and affected control;
- change failure rate and rollback rate;
- critical-suite pass rate and duration;
- flaky tests and quarantine age;
- mean time to diagnose using logs/traces;
- coverage of critical invariants;
- accessibility findings by impact;
- dependency/security findings and remediation age;
- provider contract failures;
- restore drill success and achieved recovery time/data point;
- payment reconciliation discrepancies;
- AI evaluation, schema-failure, and cost-limit results.

Metrics must not reward excessive low-value tests or suppression of legitimate defects.

---

## 28. Explicit MVP exclusions

- formal certification that exceeds the approved compliance scope;
- exhaustive testing of every device/browser ever released;
- Russian interface test coverage before Russian is activated;
- non-wedding event suites;
- native mobile application testing;
- public API consumer compatibility testing;
- microservice/Kubernetes testing;
- unlimited-scale or denial-of-service stress against production;
- direct wallet integrations that are not selected and officially supported;
- pixel-perfect baselines for every dynamic AI image;
- using production guests or payment data as test fixtures.

---

## 29. Current-source notes

Official/current sources reviewed on 2026-08-17:

- Vitest features and coverage: <https://vitest.dev/guide/features>
- Testing Library guiding principles: <https://testing-library.com/docs/guiding-principles/>
- Playwright browsers: <https://playwright.dev/docs/browsers>
- Playwright retries: <https://playwright.dev/docs/test-retries>
- Playwright trace viewer: <https://playwright.dev/docs/trace-viewer-intro>
- W3C Understanding WCAG 2.2: <https://www.w3.org/WAI/WCAG22/Understanding/>
- W3C guidance on WCAG test rules: <https://www.w3.org/WAI/WCAG22/Understanding/understanding-act-rules.html>
- Deque axe-core: <https://github.com/dequelabs/axe-core>
- OWASP Web Security Testing Guide: <https://owasp.org/www-project-web-security-testing-guide/>
- PostgreSQL documentation: <https://www.postgresql.org/docs/>

Tool versions, browser binaries, provider sandbox behavior, vulnerability feeds, and supported PostgreSQL versions must be rechecked when implementation begins and before production launch.

---

## 30. Approved owner decisions

### Decision 1 — Test stack

**Approved:** Use Vitest for TypeScript unit/service tests, Testing Library for component behavior, Playwright for browser E2E/cross-browser testing, real disposable PostgreSQL for persistence tests, and axe-core as an automated accessibility aid. Pin exact compatible versions during implementation.

### Decision 2 — Risk priority

**Approved:** Treat authorization, payment, publication, entitlement, accountless RSVP, public projection, immutable versions, AI usage, and recovery as the critical test tier.

### Decision 3 — Browser and device matrix

**Approved:** Gate critical journeys on current Chromium, Firefox, and WebKit engines plus representative mobile Chrome and Mobile Safari profiles; perform release-candidate checks on at least one real iPhone and one real Android device.

### Decision 4 — Database fidelity

**Approved:** Require real disposable PostgreSQL matching the production major version for database integration, migration, concurrency, and recovery tests; do not substitute an in-memory database.

### Decision 5 — Provider strategy

**Approved:** Use deterministic provider fakes for routine CI and small official sandbox contract suites on main, scheduled runs, provider changes, and release candidates. Live chargeable production tests require explicit safeguards.

### Decision 6 — Coverage gates

**Approved:** Begin with 80% line and branch coverage for domain/application modules, non-regression for changed production code, and explicit tests for 100% of enumerated critical invariants; recalibrate after the first implementation slice.

### Decision 7 — Accessibility evidence

**Approved:** Require axe-core checks plus manual keyboard, screen-reader, zoom/reflow, contrast, target-size, reduced-motion, and real-device testing; automated success alone never establishes WCAG 2.2 AA conformance.

### Decision 8 — Security verification

**Approved:** Map security tests to the threat model, OWASP ASVS 5.0 Level 2, and versioned WSTG scenarios; require an independent penetration test or qualified equivalent before production launch.

### Decision 9 — Release defect rule

**Approved:** Permit no unresolved known Critical or High defect or payment/security vulnerability at launch. Medium/Low exceptions require documented owner acceptance, mitigation, owner, and due date.

### Decision 10 — Flaky tests

**Approved:** Treat retry-passing tests as flakes, block releases for critical-path flakes, and allow only visible time-limited quarantine that does not count as release evidence.

### Decision 11 — Test data

**Approved:** Use synthetic test data by default and prohibit routine production-data copies in local, CI, or staging environments. Any exceptional sanitized dataset requires explicit privacy/security approval.

### Decision 12 — Release-candidate validation

**Approved:** Require production-like staging, selected provider sandbox tests, full critical E2E, manual accessibility/localization/device review, security status, performance budgets, restore evidence, reconciliation, and incident readiness before owner launch approval.

### Decision 13 — AI evaluation

**Approved:** Maintain a versioned synthetic multilingual evaluation set and separate deterministic platform-control tests from human-reviewed output-quality evaluation; rerun it for prompt, model, provider, or policy changes.

### Decision 14 — Performance scope

**Approved:** Establish numeric budgets during implementation using production-like measurements, prioritize factual invitation content and RSVP usability, and capacity-test forecast launch load plus an agreed safety margin.

### Decision 15 — Production testing

**Approved:** Limit production checks to controlled, non-destructive smoke and synthetic monitoring. Never use real guest data or create uncontrolled payment/AI cost in production tests.

---

## 31. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.0.  
**Approved date:** 2026-08-17.  
**Owner decisions:** Decisions 1–15 approved as proposed.
