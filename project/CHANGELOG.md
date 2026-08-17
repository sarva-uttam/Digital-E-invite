# Changelog

**File:** `project/CHANGELOG.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.1  
**Approved date:** 2026-08-17  
**Current phase:** Implementation preparation — implementation not authorized  
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

## 8. Unreleased

**Track:** PACKAGE  
**Package version:** 0.x  
**Status:** AUDIT CORRECTIONS IN PROGRESS  
**Application release:** None

### Completed

- Completed and owner-approved the full 28-file Claude Code documentation package, including `CLAUDE.md`, `README.md`, `.gitignore`, and `.env.example`.
- Completed the read-only final cross-document audit with verdict `CONDITIONAL PASS — CORRECTIONS REQUIRED`.
- Owner approved the minimal seven-file audit-reconciliation scope.

### In progress

- Reconcile `CURRENT_STATE.md`, `TASKS.md`, `README.md`, `DECISIONS.md`, this changelog, `CLAUDE.md`, and `docs/13_ROADMAP.md`.
- Verify the correction commit and then reconcile the documentation handoff gate.
- Keep package version at `0.x` until every correction and handoff record is verified.

### Not authorized

- application implementation or scaffolding;
- dependency installation;
- production deployment or customer launch;
- provider onboarding or new provider selection;
- final pricing publication;
- activation or advertisement of payment methods;
- production tax behavior;
- international checkout activation.

---

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
**Approved version:** 1.1.  
**Approved date:** 2026-08-17.  
**Owner decisions:** Decisions 1–10 approved as proposed.
