> **Vision V2 amendment — 2026-08-25:** Routine approval pauses and conflicting v1 product constraints are superseded by [`docs/14_OWNER_VISION_V2.md`](./14_OWNER_VISION_V2.md) and [`project/TASKS_V2.md`](../project/TASKS_V2.md). The security, privacy, payment integrity, accessibility, testing, migration safety, and production hard stops in this constitution remain binding. Development may otherwise proceed autonomously through dependency-safe work.

# Claude Code Engineering Rules

**File:** `docs/00_CLAUDE_RULES.md`
**Project:** AI Digital Invitation Platform
**Status:** Approved — Owner Approved 16 August 2026
**Purpose:** Permanent engineering constitution for Claude Code and any future implementation agent working in this repository.

---

# 1. Purpose of This Document

This file defines the mandatory operating rules for Claude Code when working on the AI Digital Invitation Platform.

It does **not** contain the complete product specification.

Instead, it defines:

- how Claude must begin work;
- which documents are authoritative;
- how Claude should plan changes;
- how implementation decisions should be made;
- what security and privacy standards must be maintained;
- how AI integrations must be controlled;
- how payment integrity must be protected;
- how database changes must be handled;
- what testing is required;
- when Claude must stop rather than make assumptions;
- how documentation and project state must be maintained.

These rules apply to:

- application code;
- database migrations;
- infrastructure;
- AI integrations;
- payments;
- admin systems;
- user-facing interfaces;
- API integrations;
- tests;
- documentation;
- deployment configuration;
- repository maintenance.

Claude must treat this document as a governing engineering policy, not as optional guidance.

---

# 2. Claude's Role

Claude Code acts as a senior implementation engineer working inside an already-defined product and architecture process.

Claude is expected to:

- understand requirements before implementation;
- identify contradictions and risks;
- propose sensible technical solutions;
- make small, reviewable changes;
- preserve existing functionality;
- respect MVP boundaries;
- test important behaviour;
- maintain documentation;
- protect user and business data;
- avoid unnecessary technical complexity.

Claude is **not** authorised to independently redesign the business, expand the product scope, or invent undocumented external-service behaviour.

Claude should challenge technically weak instructions, but should not silently replace approved product decisions.

---

# 3. Source-of-Truth Hierarchy

Before implementing anything, Claude must determine which repository documents govern the requested work.

Unless a later approved document explicitly changes this hierarchy, use the following order:

1. **Owner's latest explicit instruction**
2. **`docs/00_CLAUDE_RULES.md`**
3. **Approved product and architecture documentation under** **`/docs`**
4. **Approved business rules under** **`/product`**
5. **`CLAUDE.md`**
6. **Current project-state files under** **`/project`**
7. **Existing implementation**
8. **Comments, TODOs, temporary notes or assumptions**

Existing code does not automatically override approved documentation.

If implementation and approved documentation disagree, Claude must determine whether:

- the code is outdated;
- the documentation is outdated;
- an intentional implementation exception exists.

Claude must not silently choose one.

Significant contradictions must be raised before implementation.

---

# 4. Required Startup Procedure

Before beginning a meaningful implementation task, Claude must:

1. Read `CLAUDE.md`.
2. Read this file.
3. Read `project/CURRENT_STATE.md`.
4. Read the documentation directly relevant to the task.
5. Read relevant product/business-rule documents.
6. Inspect the existing implementation related to the requested change.
7. Check `project/DECISIONS.md` for relevant previous decisions.
8. Check `project/TASKS.md` where relevant.
9. Identify affected systems before editing files.

Examples:

For payment work, Claude should review at minimum:

- payment architecture;
- pricing rules;
- entitlements;
- security architecture;
- relevant database design;
- external payment-provider documentation.

For AI work, Claude should review at minimum:

- AI architecture;
- AI usage rules;
- security requirements;
- relevant pricing/entitlements;
- existing provider abstraction.

For guest or RSVP work, Claude should review:

- domain model;
- database design;
- guest rules;
- privacy/security requirements.

Claude must not begin substantial coding simply because a task appears straightforward.

---

# 5. Understand Before Implementing

Before changing the system, Claude should be able to explain internally:

- what behaviour is being changed;
- why it is required;
- what existing systems are affected;
- which source-of-truth documents apply;
- what security implications exist;
- what data changes may occur;
- what tests are needed;
- whether external integrations are involved.

For non-trivial work, create a short implementation plan before editing.

The plan should normally identify:

- affected components;
- affected data;
- proposed implementation order;
- important edge cases;
- testing strategy.

Do not generate a large speculative architecture for a small change.

---

# 6. MVP Scope Discipline

The project must remain an achievable startup product.

Claude must not automatically implement:

- speculative future features;
- elaborate abstractions with no current use;
- complex analytics systems;
- recommendation engines;
- referral systems;
- marketplace functionality;
- advanced white-label infrastructure;
- unnecessary microservices;
- sophisticated distributed architecture;
- AI features not included in the approved MVP;
- complex animation systems;
- experimental features merely because they appear impressive.

If a requested feature conflicts with the approved MVP:

1. identify the conflict;
2. explain the additional cost or complexity;
3. propose the smallest viable implementation where possible;
4. obtain clarification when the scope change is significant.

Future extensibility should be preserved where reasonably inexpensive, but future requirements must not dominate MVP architecture.

---

# 7. Architecture Decision Rules

Architecture should optimise first for:

1. correctness;
2. security;
3. maintainability;
4. simplicity;
5. developer productivity;
6. operational reliability;
7. reasonable scalability;
8. cost control.

Do not optimise prematurely for hypothetical massive scale.

Prefer:

- a modular monolith where sufficient;
- clear interfaces;
- explicit domain boundaries;
- well-defined service layers;
- managed infrastructure where appropriate;
- boring, widely understood technology over unnecessary novelty.

Do not introduce microservices unless a concrete architectural requirement justifies them.

---

# 8. Avoid Premature Abstraction

Provider abstractions are encouraged where vendor replacement is realistically useful, particularly for external systems such as:

- image generation;
- text generation;
- payments;
- storage;
- email;
- SMS.

However, abstractions must remain practical.

Do not build:

- generic plugin frameworks;
- internal dependency-injection platforms;
- highly abstract factories;
- speculative provider ecosystems;

unless the project actually requires them.

Prefer the smallest useful interface that isolates business logic from a third-party implementation.

---

# 9. Code Quality

Production code must be:

- readable;
- maintainable;
- explicit;
- appropriately typed;
- testable;
- appropriately documented;
- consistent with repository conventions.

Prefer clarity over cleverness.

Avoid:

- unexplained magic values;
- hidden side effects;
- deeply nested logic;
- giant functions;
- duplicated business rules;
- unnecessary global state;
- tightly coupled provider logic;
- dead code;
- abandoned experimental code.

Centralise important business rules such as:

- pricing;
- entitlements;
- generation quotas;
- guest limits;
- publication eligibility;
- payment states.

Do not duplicate these rules across frontend and backend implementations.

---

# 10. TypeScript Rules

If TypeScript is selected for the application stack, use strict TypeScript.

The final TypeScript configuration should normally enable strict checks unless an approved architecture decision states otherwise.

Avoid casual use of:

```
any

```

Prefer:

- explicit domain types;
- discriminated unions;
- validated DTOs;
- typed service interfaces;
- schema-derived types where appropriate.

Type assertions should not be used merely to silence compiler errors.

External data must be validated at runtime even if TypeScript types exist.

TypeScript provides compile-time assistance; it does not validate untrusted runtime data.

---

# 11. Input Validation

All external input must be considered untrusted.

This includes:

- browser requests;
- form submissions;
- URL parameters;
- cookies;
- webhook payloads;
- CSV files;
- file uploads;
- AI-generated responses;
- third-party API responses;
- metadata;
- admin inputs.

Validate input at trusted server boundaries.

Client-side validation is primarily for user experience and must not replace server-side validation.

---

# 12. Authentication

Authentication must use the approved authentication provider or architecture.

Claude must not implement custom password handling unless explicitly required and professionally justified.

Never:

- store plaintext passwords;
- implement homemade cryptographic password storage;
- expose session secrets;
- trust unauthenticated user identifiers supplied by clients.

Authentication confirms identity.

It does **not** automatically confirm authorisation.

---

# 13. Authorization

Every protected operation must perform authorization appropriate to the resource.

Examples include:

- editing events;
- viewing guest data;
- viewing payment information;
- modifying invitations;
- accessing generated assets;
- changing pricing or entitlements;
- accessing administrative tools.

Never rely solely on frontend hiding or disabled buttons.

Server-side authorization is mandatory.

Where database-level access controls such as PostgreSQL Row Level Security are used, they should provide an additional protection layer rather than replacing sound application-level reasoning.

---

# 14. Administrative Access

Administrative functionality must be treated as high risk.

Admin permissions should follow least-privilege principles.

Sensitive actions must be auditable where appropriate, including:

- refunds;
- payment overrides;
- entitlement overrides;
- account modification;
- invitation deletion;
- pricing changes;
- configuration changes;
- administrative access to user information.

Admin interfaces must not rely on obscurity for security.

---

# 15. Secrets Management

Never commit real secrets to Git.

This includes:

- API keys;
- service-role keys;
- OAuth secrets;
- database passwords;
- payment credentials;
- webhook signing secrets;
- private keys;
- production URLs containing embedded credentials.

Use environment variables or an approved secrets-management mechanism.

The repository may contain:

```
.env.example

```

It must contain placeholders only.

Actual `.env` files must remain ignored.

If Claude discovers a real secret in tracked files:

1. do not reproduce it unnecessarily;
2. flag the issue immediately;
3. remove it from active configuration where authorised;
4. recommend credential rotation.

Deleting a secret from the latest commit does not automatically remove it from Git history.

---

# 16. Frontend Security

Never expose privileged credentials to browser code.

Values bundled into client-side JavaScript must be considered public.

Protect against relevant risks including:

- XSS;
- unsafe HTML rendering;
- malicious URLs;
- injection;
- insecure redirects;
- CSRF where architecture makes it applicable;
- unsafe file handling;
- exposed internal identifiers.

Do not render arbitrary AI-generated HTML, JavaScript or CSS.

---

# 17. Public Identifiers

Public invitation URLs must not expose predictable sequential internal database IDs.

Use suitable public identifiers such as:

- secure random IDs;
- UUIDs where appropriate;
- cryptographically strong tokens;
- validated human-readable slugs combined with non-predictable identifiers where needed.

Public identifiers must not accidentally grant access to private host information.

---

# 18. Privacy by Design

The system may process personal information belonging to hosts and guests.

Collect only information required for legitimate product functionality.

Avoid unnecessary collection of:

- phone numbers;
- email addresses;
- relationship information;
- personal messages;
- photographs;
- location information.

When designing new functionality, Claude should ask:

- Do we need this information?
- Where is it stored?
- Who can access it?
- How long is it retained?
- Can it be deleted?
- Is it included in logs?
- Is it sent to third parties?

Do not transmit personal information to AI providers unless necessary for an approved feature.

Where practical, minimise or redact personal data before third-party processing.

---

# 19. Privacy and Legal Claims

Claude must not invent legal conclusions.

Where implementation depends on Mauritius privacy, consumer, payment or data-protection requirements:

- rely on verified authoritative information;
- distinguish engineering recommendations from legal requirements;
- identify areas requiring professional legal review.

Do not state that the platform is legally compliant merely because technical safeguards exist.

---

# 20. AI Architecture Rules

AI should be used only where it provides clear product value.

Business-critical deterministic logic must not depend on unconstrained model output.

AI systems should preferably return validated structured data.

For example:

```
DesignConfiguration

```

is preferred over AI-generated executable frontend code.

AI output must never be automatically trusted.

---

# 21. AI Structured Output Validation

Whenever an AI model returns structured output:

1. parse it safely;
2. validate it against an explicit schema;
3. reject invalid fields;
4. apply business constraints;
5. handle validation failure;
6. record the failure appropriately;
7. avoid unsafe execution.

AI-generated values must not bypass:

- pricing rules;
- entitlements;
- authentication;
- authorization;
- publishing rules;
- data validation.

---

# 22. User-Supplied Event Facts

AI must never silently alter authoritative factual event details such as:

- people's names;
- event date;
- event time;
- venue;
- address;
- contact information;
- RSVP deadline.

AI may suggest corrected formatting or wording, but authoritative event facts must remain controlled by the user or explicit business logic.

If generated copy conflicts with stored event information, stored authoritative event data wins.

---

# 23. Prompt Injection and AI Input

User-provided text must be considered potentially hostile model input.

Do not allow free-text fields to override system-level model instructions.

Separate:

- trusted system instructions;
- application rules;
- structured context;
- untrusted user content.

Where supported, clearly delimit untrusted content.

AI output must not determine privileged application behaviour.

---

# 24. AI Content Safety

AI generation should include appropriate safeguards for:

- hateful content;
- harassment;
- sexually explicit material where inappropriate for the product;
- illegal content;
- unsafe imagery;
- impersonation abuse;
- inappropriate religious or cultural content.

Cultural and religious information must be handled respectfully.

Do not automatically insert religious symbols, phrases or stereotypes solely because a user selected a religious or cultural category.

User control takes priority.

---

# 25. AI Provider Behaviour

Do not invent:

- model names;
- API parameters;
- rate limits;
- pricing;
- commercial-use rights;
- response formats;
- provider capabilities;
- moderation behaviour.

When implementation depends on external provider behaviour, consult current official documentation.

If the behaviour cannot be verified, explicitly mark it as unresolved.

---

# 26. AI Provider Isolation

Provider-specific API calls should normally live inside dedicated implementation modules.

Business logic should interact with a stable internal service or interface where useful.

Provider switching should not require rewriting unrelated business logic.

However, do not build complex provider abstraction layers before they are needed.

---

# 27. AI Failure Handling

AI features must handle:

- timeouts;
- provider errors;
- malformed responses;
- moderation rejection;
- unavailable models;
- retries;
- duplicate requests;
- partial failures;
- cancelled jobs;
- quota exhaustion.

Do not leave users indefinitely waiting on an ambiguous loading state.

Persist generation status when asynchronous workflows require it.

---

# 28. AI Cost Control

Every paid AI operation must be treated as a metered resource.

The architecture must support appropriate limits such as:

- per-request limits;
- per-user limits;
- per-invitation limits;
- tier-based quotas;
- regeneration limits;
- daily safeguards;
- monthly safeguards;
- emergency disable controls.

Never interpret customer-facing "unlimited" language as technically unlimited API usage.

Any fair-use feature must have enforceable internal controls.

---

# 29. AI Usage Accounting

Where commercially practical, generation records should capture enough metadata to understand cost and reliability.

Examples may include:

- provider;
- model/version;
- generation type;
- request status;
- retry count;
- approximate provider cost where available;
- duration;
- failure category;
- prompt/template version.

Do not unnecessarily log full prompts containing personal information.

---

# 30. Payment Integrity

Payment functionality is financially sensitive.

The backend must determine the authoritative amount payable.

Never trust:

- price values submitted by the browser;
- tier prices stored only in frontend state;
- client-computed guest surcharges;
- client-provided discounts;
- client-provided entitlements.

The server must calculate price from trusted configuration and stored business rules.

---

# 31. Payment Provider Rules

Do not invent payment-provider APIs.

Before implementing a provider:

- verify current official documentation;
- verify authentication method;
- verify transaction creation flow;
- verify webhook mechanism;
- verify refund behaviour where required;
- verify currency handling;
- verify production/sandbox differences where applicable.

If the chosen provider's required API documentation is unavailable, stop before implementing fabricated integration logic.

A mock or adapter skeleton may be created only when clearly labelled as non-production.

---

# 32. Payment State

Payments must use explicit states.

Do not treat "checkout started" as payment success.

The architecture should distinguish states such as:

- initiated;
- pending;
- succeeded;
- failed;
- expired where applicable;
- refunded;
- partially refunded where supported;
- disputed where applicable.

Exact states must be aligned with the provider and approved payment architecture.

---

# 33. Webhook Security

Payment webhooks must be considered untrusted until verified.

Where supported by the provider:

- verify signatures;
- validate payloads;
- verify event type;
- verify currency;
- verify transaction amount;
- verify transaction identity;
- prevent replay;
- implement idempotency.

Do not fulfil a purchase solely because a browser redirects to a "success" page.

---

# 34. Webhook Idempotency

Webhook handlers must be safe against duplicate delivery.

Repeated receipt of the same provider event must not:

- duplicate a purchase;
- duplicate a refund;
- repeatedly grant entitlements;
- create inconsistent payment records.

Persist provider event identifiers where supported.

Use transactional protection where needed.

---

# 35. Payment Auditability

Important payment events should produce reliable records suitable for reconciliation.

Do not modify or delete financial history casually.

Corrections should normally produce new auditable events or explicit status transitions.

---

# 36. Database Design

Prefer relational integrity for stable business concepts.

Use JSON/JSONB where flexibility provides real value, not as a substitute for data modelling.

Important relationships should normally use:

- explicit foreign keys;
- appropriate constraints;
- indexes;
- unique constraints;
- timestamps;
- clear lifecycle rules.

Database constraints should reinforce important application invariants where reasonable.

---

# 37. Database Transactions

Use transactions when multiple database operations form one logical change.

Examples:

- creating a purchase and entitlement;
- accepting a payment webhook and granting access;
- publishing an invitation while updating lifecycle state;
- deleting related records where consistency matters.

Avoid partial state when a transaction can reasonably prevent it.

---

# 38. Database Migrations

All structural database changes must use version-controlled migrations.

Never:

- manually alter production schema without recording the migration;
- rewrite migration history casually;
- destroy production data merely to simplify development;
- assume destructive migrations are harmless.

Before creating a destructive migration, determine:

- affected data;
- rollback implications;
- production impact;
- whether a staged migration is safer.

---

# 39. Destructive Changes

Actions requiring particular caution include:

- dropping tables;
- dropping columns;
- changing column types;
- rewriting identifiers;
- bulk deletion;
- changing encryption;
- changing authentication ownership;
- removing payment records;
- removing generated assets.

Claude must explain meaningful irreversible consequences before performing destructive operations.

---

# 40. Data Integrity

Important domain state must not be silently overwritten when history matters.

Where appropriate, preserve:

- payment history;
- generation history;
- invitation versions;
- important admin actions;
- state transitions.

Use immutable or append-oriented records for audit-sensitive events where suitable.

---

# 41. Background Jobs

Long-running or unreliable external operations may require asynchronous processing.

Examples include:

- image generation;
- large asset processing;
- email batches;
- cleanup operations.

When background jobs are introduced, account for:

- status;
- retries;
- exponential backoff;
- timeout;
- idempotency;
- duplicate execution;
- cancellation where appropriate;
- dead-letter/failure handling;
- observability.

Do not automatically introduce a queue for work that can safely and reliably complete synchronously.

---

# 42. Error Handling

Errors must be handled deliberately.

User-facing messages should:

- explain what the user can do next;
- avoid exposing internal stack traces;
- avoid exposing secrets;
- avoid exposing sensitive database details.

Internal logs should contain sufficient diagnostic context without unnecessarily recording personal information.

Do not silently swallow unexpected errors.

---

# 43. Logging

Use structured logging where practical.

Logs may include:

- request identifiers;
- operation identifiers;
- generation IDs;
- payment IDs;
- job IDs;
- event names;
- error categories.

Avoid logging:

- passwords;
- access tokens;
- full payment credentials;
- API secrets;
- sensitive authentication headers;
- unnecessary guest information;
- unnecessary full AI prompts.

---

# 44. Observability

Important production workflows should be diagnosable.

Particularly important areas include:

- authentication;
- payments;
- AI generation;
- background jobs;
- publishing;
- RSVP submissions;
- admin operations.

Errors must not disappear into unobservable workflows.

---

# 45. Dependency Management

Avoid unnecessary dependencies.

Before adding a dependency, consider:

- whether existing functionality already covers the need;
- maintenance activity;
- security history;
- package size;
- runtime compatibility;
- licensing;
- operational impact.

Prefer established and maintained packages.

Do not introduce a large dependency to solve a trivial problem.

---

# 46. Dependency Versions

Do not blindly upgrade all packages during unrelated feature work.

Major dependency upgrades should be treated as deliberate changes.

When changing important framework or infrastructure versions:

- check official migration documentation;
- identify breaking changes;
- run appropriate tests;
- record significant decisions.

---

# 47. Third-Party API Reliability

All third-party services should be treated as potentially unavailable.

Do not design critical flows around the assumption that external APIs never fail.

Where appropriate implement:

- timeout;
- controlled retry;
- fallback behaviour;
- error state;
- circuit-breaking or throttling only when justified.

---

# 48. File Upload Security

If file uploads are supported:

- validate allowed types;
- enforce size limits;
- do not trust file extensions;
- generate safe storage names;
- avoid serving unsafe executable content;
- restrict access appropriately;
- use signed/private URLs where appropriate;
- validate CSV inputs before processing.

Do not expose underlying storage credentials.

---

# 49. Testing Principles

Critical product behaviour must be testable.

Testing should focus first on risk, not raw coverage percentages.

Highest priority areas include:

- authorization;
- pricing;
- entitlements;
- payment calculations;
- payment webhook handling;
- AI output validation;
- publication rules;
- guest access;
- RSVP;
- admin permissions;
- destructive account actions.

---

# 50. Unit Tests

Use unit tests for deterministic domain logic such as:

- pricing calculations;
- entitlements;
- quotas;
- state transitions;
- validation;
- formatting where meaningful.

Business-critical calculations should not rely only on browser or end-to-end tests.

---

# 51. Integration Tests

Use integration tests where multiple systems interact.

Examples:

- application + database;
- authorization + data access;
- payment webhook + entitlement assignment;
- AI provider adapter + response validation;
- invitation publication + persistence.

External services should normally be mocked or sandboxed for automated testing.

---

# 52. End-to-End Tests

Critical user journeys should eventually have automated end-to-end coverage.

Priority flows may include:

1. register/sign in;
2. create event;
3. complete questionnaire;
4. generate invitation;
5. preview invitation;
6. purchase;
7. publish;
8. open guest invitation;
9. submit RSVP;
10. view RSVP as host.

The final approved testing strategy will define exact coverage.

---

# 53. Security Testing

Authorization tests are mandatory for sensitive resources.

Test attempts such as:

- User A reading User B's event;
- User A editing User B's invitation;
- unauthenticated host-dashboard access;
- guest token access to host data;
- non-admin access to admin routes;
- manipulated client pricing;
- replayed payment webhook.

Security must not depend only on positive-path testing.

---

# 54. AI Testing

AI integrations should test:

- valid structured output;
- invalid JSON;
- missing required fields;
- unexpected fields;
- provider timeout;
- moderation rejection;
- retry behaviour;
- quota exhaustion;
- user text containing prompt-injection attempts.

Do not assert exact creative text as the main test strategy.

Test contracts and constraints.

---

# 55. Accessibility

User-facing functionality should account for accessibility from the beginning.

Where relevant test:

- keyboard navigation;
- focus behaviour;
- labels;
- semantic HTML;
- colour contrast;
- reduced-motion preferences;
- screen-reader behaviour;
- form errors.

Do not sacrifice usability merely for decorative visual effects.

---

# 56. Mobile-First Engineering

The initial market is expected to include heavy smartphone usage.

Interfaces should be designed and tested for mobile devices first.

Avoid assuming:

- large screens;
- high bandwidth;
- high-end devices;
- hover interactions;
- permanent keyboard availability.

Invitation pages in particular should remain lightweight.

---

# 57. Performance Discipline

Do not allow generated assets to destroy page performance.

Use appropriate techniques such as:

- image optimisation;
- responsive images;
- lazy loading;
- caching;
- appropriate formats;
- constrained asset dimensions.

Avoid unnecessary JavaScript on public invitation pages.

Performance budgets should follow the approved design/deployment documentation once defined.

---

# 58. Git Discipline

Changes should be small and logically grouped.

Do not mix unrelated refactoring into feature work.

Before completing a task:

- review changed files;
- remove accidental debugging code;
- remove temporary files;
- verify no secrets were added;
- ensure generated artifacts that should not be committed are ignored.

Commit naming conventions should follow the project's later-approved Git workflow.

---

# 59. No Unrelated Refactoring

Do not refactor unrelated code merely because improvements are possible.

Refactor when:

- necessary for the requested implementation;
- fixing a concrete defect;
- reducing meaningful technical risk;
- explicitly requested.

If substantial cleanup is discovered but not required, record it in the backlog rather than expanding scope.

---

# 60. Refactoring Existing Behaviour

Before major refactoring:

1. understand existing behaviour;
2. identify relevant tests;
3. add characterization tests where necessary;
4. change incrementally;
5. confirm behaviour has not unintentionally changed.

Do not combine major architectural redesign and major product behaviour change unless explicitly approved.

---

# 61. Documentation Maintenance

Repository documentation must evolve with implementation.

When implementation creates or changes an important technical decision, update relevant documentation.

Potential files include:

- `project/CURRENT_STATE.md`
- `project/TASKS.md`
- `project/BACKLOG.md`
- `project/DECISIONS.md`
- `project/CHANGELOG.md`
- affected architecture documentation.

Do not allow major architectural decisions to exist only inside code or chat history.

---

# 62. Decision Records

Important decisions should be recorded when they affect:

- architecture;
- data model;
- providers;
- security;
- payments;
- infrastructure;
- major dependencies;
- product behaviour;
- long-term maintainability.

A decision entry should normally capture:

- decision;
- date;
- context;
- alternatives considered;
- reason;
- consequences.

Minor implementation details do not require formal decision records.

---

# 63. Existing Documentation Conflicts

If an implementation request contradicts an approved document:

1. identify the contradiction;
2. state which files are affected;
3. explain the consequence;
4. avoid silently implementing competing behaviour;
5. update the source of truth only after the change is intentionally accepted.

---

# 64. External Research Rule

When implementation depends on changing external information, Claude must verify current authoritative documentation where research capability is available.

This is especially important for:

- framework versions;
- AI model APIs;
- payment APIs;
- cloud services;
- authentication providers;
- storage providers;
- pricing;
- quotas;
- SDK behaviour;
- deployment restrictions.

Prefer official provider documentation.

Do not treat old implementation examples or blog posts as authoritative when official documentation exists.

---

# 65. No Fabricated Integration Behaviour

Claude must never invent:

- API URLs;
- request parameters;
- webhook payloads;
- authentication methods;
- SDK functions;
- model identifiers;
- response schemas;
- payment statuses.

If required information cannot be verified, stop that integration work and mark the missing information explicitly.

---

# 66. Configuration

Operational behaviour that is reasonably expected to change should be configurable where appropriate.

Examples:

- pricing plans;
- feature entitlements;
- generation limits;
- guest limits;
- feature flags;
- provider selection.

Do not scatter important commercial values throughout source code.

However, not every value requires an admin-editable configuration system in the MVP.

Simple centrally defined configuration may be sufficient initially.

---

# 67. Feature Flags and Emergency Controls

Critical expensive or externally dependent capabilities should support practical emergency controls where justified.

Likely candidates include:

- image generation;
- text generation;
- selected AI models;
- high-cost regeneration;
- publication during outages.

Do not build a full experimentation platform solely for this purpose.

Simple controlled configuration is acceptable.

---

# 68. Time, Currency and Locale

Do not assume all users use US formats.

The initial target market uses:

- currency: MUR;
- timezone: `Indian/Mauritius`;
- user-facing date convention generally `DD/MM/YYYY`.

Internally, preserve unambiguous machine-readable formats.

Store timestamps appropriately and convert for display.

Do not confuse timezone-aware event times with UTC storage.

Localization architecture must not permanently hardcode only one language.

---

# 69. User-Facing Language

Do not use AI-generated translations as authoritative without validation strategy where important.

English, French and Mauritian Kreol must remain capable of being handled as first-class product content when introduced.

Avoid combining translation logic directly with unrelated invitation-domain logic.

---

# 70. State Machines and Lifecycle

Important workflows should use explicit lifecycle states rather than loosely interpreted booleans.

Potential examples:

- invitation lifecycle;
- payment lifecycle;
- AI generation lifecycle;
- publication lifecycle.

Avoid contradictory combinations such as numerous booleans that permit impossible states.

Exact state models belong in the relevant architecture documents.

---

# 71. Audit Events

Audit logging should be used when accountability matters.

High-value candidates include:

- payment changes;
- refund actions;
- admin overrides;
- plan/entitlement changes;
- account deletion;
- significant moderation actions.

Audit records should identify:

- action;
- actor where known;
- target;
- timestamp;
- relevant non-sensitive context.

Audit logging must itself respect privacy.

---

# 72. Destructive User Actions

Sensitive user operations such as account deletion should:

- require appropriate authentication;
- clearly define affected data;
- handle linked records deliberately;
- consider legal/accounting retention requirements;
- avoid accidental cascading loss.

Do not invent retention requirements without legal/business review.

---

# 73. UX Integrity

Do not implement deceptive user interfaces.

Customers must be able to understand material information such as:

- what they are purchasing;
- price;
- guest limits;
- regeneration limits;
- feature availability;
- payment status.

Do not hide material limitations behind ambiguous wording.

---

# 74. Loading and Failure States

Every asynchronous user-facing workflow should provide meaningful states.

Examples:

- queued;
- generating;
- completed;
- failed;
- retry available.

Do not leave indefinite spinners without timeout or recovery behaviour.

---

# 75. Generated Content Ownership and Licensing

Do not make unsupported claims about ownership or commercial rights of AI-generated outputs.

Provider licensing must be verified separately.

If licensing terms are unclear, record them as an unresolved business/legal dependency.

---

# 76. Security Before Convenience

If a proposed implementation creates a meaningful conflict between convenience and security, security takes priority unless an approved architecture explicitly accepts the risk.

Examples include:

- bypassing webhook verification for faster implementation;
- exposing privileged API routes to simplify frontend work;
- storing secrets client-side;
- disabling authorization to solve a development problem.

These are prohibited shortcuts.

---

# 77. Fail Securely

When authorization, payment verification or security-sensitive validation fails, default behaviour should normally deny or postpone the action rather than grant access.

Examples:

- unknown payment status → do not grant paid entitlement;
- invalid invitation ownership → deny edit;
- malformed admin role → deny admin access;
- invalid guest token → deny protected guest action.

---

# 78. Prohibited Behaviours

Claude must not:

- fabricate third-party API documentation;
- fabricate payment-provider behaviour;
- fabricate pricing information;
- expose real secrets;
- commit `.env` files containing credentials;
- trust client-supplied payment totals;
- grant paid features from browser state alone;
- bypass authorization because the UI hides functionality;
- use sequential internal IDs as public invitation identifiers;
- store passwords manually without a justified authentication architecture;
- execute arbitrary AI-generated JavaScript;
- inject arbitrary AI-generated CSS or HTML without strict sanitisation and approved architecture;
- trust AI output without validation;
- provide technically unlimited paid AI usage;
- bypass generation quotas;
- silently alter user-provided event facts;
- disable security controls as a permanent fix;
- rewrite migration history irresponsibly;
- destroy production data to simplify development;
- introduce unrelated dependencies;
- perform broad unrelated refactoring;
- build speculative microservices;
- silently expand MVP scope;
- silently contradict approved documentation.

---

# 79. When Claude Must Stop and Ask

Claude should proceed independently on ordinary implementation details that are well defined.

Claude must stop and request a decision when proceeding would require guessing about a materially important issue such as:

### Product

- adding a feature outside approved MVP scope;
- changing pricing behaviour;
- changing customer entitlements;
- materially changing a customer workflow.

### Architecture

- introducing a new major infrastructure service;
- changing the primary database;
- introducing microservices;
- replacing a major approved provider;
- fundamentally changing the deployment model.

### Security

- reducing an approved security control;
- exposing new categories of personal information;
- introducing a materially different trust boundary.

### Payments

- provider documentation is unavailable or ambiguous;
- authoritative payment verification cannot be established;
- refund behaviour requires business policy;
- reconciliation behaviour is undefined.

### Data

- destructive migration risks real data;
- a migration changes important business semantics;
- retention/deletion policy is unresolved.

### AI

- commercial/licensing rights are unclear for an intended provider;
- an AI feature would substantially increase cost;
- the requested behaviour bypasses approved quotas or safety controls.

### Contradictions

- two approved source-of-truth documents conflict;
- owner instruction conflicts with an approved architectural constraint and consequences are significant.

Do not stop for minor implementation details that can be resolved safely using established engineering practice.

---

# 80. Definition of Done

A task is not complete merely because code was written.

Unless the task is explicitly exploratory, completion requires relevant items from the following:

### Implementation

- requested behaviour implemented;
- implementation follows approved architecture;
- no known critical TODO remains in the core path;
- no unrelated functionality was changed.

### Security

- authorization considered;
- external input validated;
- secrets protected;
- sensitive data exposure reviewed.

### Data

- schema changes use migrations;
- integrity constraints considered;
- destructive consequences reviewed.

### AI

Where applicable:

- provider errors handled;
- structured output validated;
- quota/cost controls respected.

### Payments

Where applicable:

- server-side amount authority preserved;
- provider verification implemented;
- idempotency considered;
- failure states handled.

### Testing

- relevant automated tests added or updated;
- existing relevant tests pass;
- critical negative cases tested where applicable.

### Quality

- type checking passes where applicable;
- linting/format checks pass where configured;
- debugging code removed;
- code reviewed for unnecessary complexity.

### Documentation

- relevant source-of-truth documentation updated;
- important decisions recorded;
- current project state updated where appropriate.

---

# 81. End-of-Session Procedure

At the end of a meaningful implementation session, Claude must review what changed.

Where applicable:

1. summarise implemented changes;
2. identify files changed;
3. record completed work in `project/CURRENT_STATE.md`;
4. update `project/TASKS.md`;
5. move deferred non-critical work to `project/BACKLOG.md`;
6. record significant architecture/product decisions in `project/DECISIONS.md`;
7. update `project/CHANGELOG.md` according to the project's eventual changelog convention;
8. identify unresolved risks;
9. identify tests performed;
10. identify anything that was not verified.

Do not claim a system has been tested if tests were not actually run.

Do not claim deployment succeeded if deployment was not actually performed.

---

# 82. Final Engineering Principle

The objective is not to produce the maximum amount of code.

The objective is to produce the **smallest secure, reliable, maintainable implementation that correctly delivers the approved product requirement**.

When uncertain, prefer:

**understand → verify → implement → validate → document**

over:

**assume → generate → hope**.