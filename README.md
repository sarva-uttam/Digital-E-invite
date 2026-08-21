# AI Digital Invitation Platform

An AI-assisted digital invitation platform for creating, personalizing, publishing, sharing and managing beautiful wedding invitations and RSVPs through one secure, mobile-first service.

**Claude Package version:** 1.0  
**Package status:** Implementation Preparation Ready  
**Repository status:** Private, owner-controlled repository; documentation package complete; final audit passed and corrections verified  
**Application status:** Engineering baseline and CI quality gates verified (`IMP-004`–`IMP-005`); configuration/environment boundaries implemented (`IMP-010`, pending GitHub-hosted run evidence); no product feature is implemented and no application release exists  
**Initial operating market:** Mauritius  
**Availability vision:** Global  
**MVP event type:** Weddings only  
**Document status:** Approved — Owner Approved  
**Version:** 1.10  
**Approved date:** 2026-08-21

---

## Overview

The platform is designed to help couples and wedding hosts move from an event brief to a polished digital invitation, then publish and share it, collect RSVPs and manage their guest list without assembling several disconnected tools.

AI is used as bounded creative assistance—not as an autonomous decision-maker. Hosts remain responsible for reviewing event facts, wording and design before publication.

Mauritius is the first operating and validation market, but the service is intended to be globally accessible. Global access does not automatically activate every currency, payment method, tax treatment, language or support commitment.

---

## Current repository purpose

This repository contains the owner-approved Claude Code development package that governs implementation, plus a minimal engineering baseline (`IMP-004`): a Next.js application scaffold, developer tooling and a non-sensitive health endpoint. No product feature is implemented and no application has been released.

During final `IMP-005` verification, GitHub was observed reporting this repository as public, contrary to the owner-controlled private-repository intent and project records. The owner restored it to private, and GitHub now confirms `private: true` and `visibility: private`. This correction does not assert that private visibility retroactively removes any possible prior public access, and no data breach is claimed.

The documentation package was created sequentially:

1. one document is drafted;
2. the owner challenges and reviews it;
3. the document is revised;
4. the owner explicitly approves it;
5. the approved version is committed to the private GitHub repository;
6. the commit is verified;
7. only then does work proceed to the next document.

Implementation is authorized only through tasks that are `READY` in `project/TASKS.md`; production deployment and customer launch remain separately unauthorized.

---

## Product direction

### Core host journey

The approved MVP direction covers:

1. host account access;
2. wedding-event creation;
3. structured design questionnaire;
4. event-fact entry and confirmation;
5. package selection;
6. bounded AI-assisted concept generation;
7. preview and permitted refinements;
8. guest and party management;
9. secure payment;
10. publication;
11. sharing through approved channels and private links;
12. accountless guest RSVP;
13. host RSVP and guest-management dashboard.

The detailed source of truth is `docs/03_MVP_PRD.md`.

### MVP boundaries

- Weddings are the only MVP event type.
- The MVP uses responsive web delivery rather than native mobile applications.
- The product is not a general-purpose website builder.
- Customers cannot inject arbitrary CSS or executable design code.
- AI music, AI video, identity/likeness generation and uncontrolled autonomous design are excluded.
- Subscriptions, stored-value wallets and automatic overage billing are rejected for the current direction.
- Kubernetes is excluded from the MVP.
- Backlog ideas are not approved scope.

---

## Commercial model

The approved direction uses three one-time, event-scoped packages:

| Package | Initial concepts | Refinements | Guest capacity | Invitation languages | Hosting from first publication |
|---|---:|---:|---:|---:|---:|
| Essential | 1 | 2 | 100 | 1 | 30 days |
| Signature | 3 | 6 | 300 | 2 | 90 days |
| Premium | 5 | 12 | 750 | 3 | 365 days |

Every package includes the complete core workflow and the same security, privacy and accessibility baseline.

Additional capacity or usage must use an explicit, confirmed add-on or capacity pack. The platform must not create surprise charges or automatic overages.

Final launch prices, discounts, add-on prices and refund rules remain undecided. Historical rupee figures are hypotheses and must not be treated as approved pricing.

See:

- `docs/02_BUSINESS_MODEL.md`;
- `product/PRICING_RULES.md`;
- `product/ENTITLEMENTS.md`;
- `product/AI_USAGE_RULES.md`.

---

## Markets, languages and currency

### Markets

Mauritius is the initial operating market. The site is intended to remain globally accessible, while checkout, tax, legal, language and support behavior is activated only when each market is ready and approved.

### Languages

- English is the primary language.
- French is the second language.
- Mauritian Kreol (`mfe`) is specifically intended for Mauritian customers.
- Russian belongs to the planned language portfolio but requires activation readiness.

Interface locale and invitation-content language are separate choices. Personal names must not be automatically transliterated.

### Currency

MUR is the base and primary commercial currency. EUR and/or USD checkout may be introduced only through approved price books after payment-provider, settlement, foreign-exchange, refund, rounding, accounting and tax rules are verified.

See `product/LOCALIZATION.md` and `docs/08_PAYMENT_ARCHITECTURE.md`.

---

## Payments and tax

The payment architecture requires provider-hosted or provider-controlled checkout. The platform must never store, process or log raw card numbers, CVV/CVC values, PINs, banking credentials or payment authentication secrets.

Browser redirects, frontend state and customer-provided payment values are not proof of payment. Entitlements are granted only after verified provider events and server-side reconciliation establish payment truth.

Candidate methods to verify include:

- Visa;
- Mastercard;
- MCB Juice;
- MauCAS QR payments, including compatible applications such as SBM Tag where supported;
- blink and other approved local methods where commercially justified.

No payment method may be advertised before production availability, merchant eligibility and technical integration are confirmed. The project does not assume that SBM Tag exposes a standalone online-payment API.

Production tax behavior requires confirmation by a qualified Mauritius accountant or tax professional. Business-level corporate or income tax must not automatically be added to a customer's checkout.

See `docs/08_PAYMENT_ARCHITECTURE.md` and `docs/09_SECURITY_ARCHITECTURE.md`.

---

## AI principles

AI features must remain:

- bounded to approved, typed product actions;
- subject to package entitlements and server-side metering;
- validated before use;
- reviewed by the host before material publication;
- protected against prompt injection and data leakage;
- versioned and auditable at the required level;
- governed by cost, abuse and safety controls.

AI must not invent event facts, infer sensitive personal or cultural attributes, generate identity/likeness content or silently send customer data to a different provider when a route fails.

No AI provider or model has been selected for production.

See `docs/07_AI_ARCHITECTURE.md` and `product/AI_USAGE_RULES.md`.

---

## Guest privacy

Guests use unguessable, revocable private party tokens for the core accountless invitation and RSVP flow.

Private party tokens are bearer secrets. They must not be logged, placed in analytics or exposed as public identifiers.

The platform must minimize guest data, enforce party- and event-scoped access, and avoid default invitation read/open tracking.

See `product/GUEST_RULES.md`.

---

## Technology status

The architecture remains intentionally provider-neutral.

The owner has approved an initial engineering stack (`DEC-023`, established through `IMP-003`) for the TypeScript modular monolith described in `docs/05_SYSTEM_ARCHITECTURE.md`:

- Node.js 24.19.0 LTS;
- Next.js 16.3.1 with the App Router;
- TypeScript 6.0.3 (strict);
- npm with a committed `package-lock.json`;
- Drizzle ORM 0.45.2 and Drizzle Kit 0.31.10 (not yet used for schema or migrations);
- PostgreSQL 18 as the authoritative datastore (no database is provisioned yet);
- pg-boss 12.27.0, backed by PostgreSQL, as the durable-job mechanism — this supersedes the earlier provisional Render Key Value/BullMQ direction; no separate Redis/Valkey service is part of the baseline.

This is an initial baseline decision, not final production activation. Final choices remain pending for:

- production database provisioning and plan;
- authentication and identity provider;
- object storage and media delivery provider;
- AI providers and models;
- payment provider and acquiring bank;
- transactional email provider;
- production hosting activation;
- observability and analytics providers.

Render Singapore, Render PostgreSQL and Amazon S3 Singapore remain provisional production baselines only, subject to their existing confirmation gates. Names such as Supabase, Clerk, JouJouPay, Cloudinary or Vercel that appear in historical ideas are examples, not approved selections.

Every remaining selection must be evaluated through current official sources, credible alternatives, security, privacy, cost, migration and operational trade-offs before owner approval.

---

## Getting started (engineering baseline)

These commands were run and verified while implementing `IMP-004`. They operate the empty scaffold only — no product feature exists yet.

```bash
# requires Node.js 24.19.0 (see .nvmrc) and npm
npm ci # reproducible clean install from package-lock.json
npm run dev # start the Next.js dev server
npm run build # production build
npm run start # run the production build locally
npm run lint # ESLint
npm run typecheck # strict TypeScript, no emit
npm run format:check # Prettier check (application/config files only)
npm run format # Prettier write
npm test # Vitest unit tests
```

`GET /api/health` returns a safe, deterministic `200 OK` for liveness checks and reveals no secrets, environment values or dependency detail.

No `.env` file is required to run these commands: unset baseline variables fall back to safe defaults, and provider/secret configuration is intentionally out of scope until `IMP-010`. Never put real credentials in `.env.example` or commit a populated `.env` file.

---

## Repository map

```text
.
├── CLAUDE.md
├── README.md
├── .gitignore
├── .env.example
├── .nvmrc
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── .prettierrc.json
├── vitest.config.mts
├── src/
│   ├── app/            # Next.js App Router (pages, layout, /api/health)
│   └── lib/            # server-only baseline (environment validation)
├── worker/
│   └── src/            # separately deployable worker (structural placeholder)
├── docs/
│   ├── 00_CLAUDE_RULES.md
│   ├── 01_PROJECT_VISION.md
│   ├── 02_BUSINESS_MODEL.md
│   ├── 03_MVP_PRD.md
│   ├── 04_DOMAIN_MODEL.md
│   ├── 05_SYSTEM_ARCHITECTURE.md
│   ├── 06_DATABASE_DESIGN.md
│   ├── 07_AI_ARCHITECTURE.md
│   ├── 08_PAYMENT_ARCHITECTURE.md
│   ├── 09_SECURITY_ARCHITECTURE.md
│   ├── 10_DESIGN_SYSTEM.md
│   ├── 11_TESTING_STRATEGY.md
│   ├── 12_DEPLOYMENT.md
│   └── 13_ROADMAP.md
├── product/
│   ├── PRICING_RULES.md
│   ├── ENTITLEMENTS.md
│   ├── AI_USAGE_RULES.md
│   ├── GUEST_RULES.md
│   └── LOCALIZATION.md
└── project/
    ├── CURRENT_STATE.md
    ├── TASKS.md
    ├── BACKLOG.md
    ├── DECISIONS.md
    └── CHANGELOG.md
```

The appearance of a planned root file in this map does not mean it has already been approved or committed.

---

## Document guide

### Start here

- `CLAUDE.md` — operational entry point for Claude Code;
- `docs/00_CLAUDE_RULES.md` — engineering constitution;
- `project/CURRENT_STATE.md` — verified current state;
- `project/TASKS.md` — authorized work;
- `project/DECISIONS.md` — durable decisions.

### Product definition

- `docs/01_PROJECT_VISION.md` — purpose, audience and principles;
- `docs/02_BUSINESS_MODEL.md` — commercial model;
- `docs/03_MVP_PRD.md` — MVP behavior and acceptance boundaries;
- `product/` — enforceable pricing, entitlement, AI, guest and localization rules.

### Technical design

- `docs/04_DOMAIN_MODEL.md` — entities and invariants;
- `docs/05_SYSTEM_ARCHITECTURE.md` — system boundaries;
- `docs/06_DATABASE_DESIGN.md` — logical persistence design;
- `docs/07_AI_ARCHITECTURE.md` — AI orchestration;
- `docs/08_PAYMENT_ARCHITECTURE.md` — payment truth and flows;
- `docs/09_SECURITY_ARCHITECTURE.md` — security and privacy;
- `docs/10_DESIGN_SYSTEM.md` — UI, accessibility and design rules;
- `docs/11_TESTING_STRATEGY.md` — testing and release evidence;
- `docs/12_DEPLOYMENT.md` — environments and operations;
- `docs/13_ROADMAP.md` — controlled delivery sequence.

### Project control

- `project/BACKLOG.md` — deferred candidates, not approved scope;
- `project/CHANGELOG.md` — material package and release history.

---

## Working with this repository

### Always

- do not select, install or configure a provider outside an approved decision (`project/DECISIONS.md`);
- do not publish prices or payment-method claims;
- do not treat backlog items as approved scope;
- do not commit a draft as authoritative;
- do not deploy to production or activate a production provider without separate explicit authorization.

### Task-controlled implementation phase

Application implementation is authorized only through eligible tasks in `project/TASKS.md`. For every task:

1. read `CLAUDE.md` and the mandatory source set;
2. select one task explicitly `READY` (or otherwise authorized) in `project/TASKS.md`;
3. read every specification constraining that task;
4. resolve blockers before writing code;
5. implement the smallest coherent change;
6. test and verify it proportionate to risk;
7. update project records truthfully;
8. report the evidence and stop before the next task.

A `BLOCKED` task is never authorized merely because implementation has begun elsewhere. See `CLAUDE.md` section 2 for the task-controlled gate.

---

## Security and quality baseline

Security, privacy, accessibility and data integrity apply to every package and locale.

The implementation must use defense in depth, server-side authorization, least privilege, secure secret management, rate limiting, audit logging, validated provider boundaries, safe failure behavior, payment reconciliation, tested recovery and risk-based release gates.

No architecture can promise that attack is impossible. The project objective is to prevent compromise wherever reasonably possible, minimize attack surfaces, detect suspicious behavior, contain failures and recover securely.

No known unresolved critical or high-severity payment-security vulnerability may remain at production launch.

---

## Contribution and access

This is currently a private owner-controlled repository.

Do not submit or implement changes outside an explicitly authorized task. Preserve unrelated work, never expose secrets, and follow the approval, decision, testing and change-record procedures defined by the package.

Public contribution rules, licensing and external support channels have not yet been approved.

---

## Current next steps

Claude Package v1.0 remains `Implementation Preparation Ready`. `DOC-001` through `DOC-010` and `IMP-001` through `IMP-005` are verified. PR #2 merged the CI quality gates after successful GitHub-hosted pull-request CI, and the immediate push-to-`main` CI run also passed. `IMP-010 — Implement configuration and environment boundaries` is implemented on branch `imp-010-config-boundaries` (a typed, framework-agnostic configuration boundary reused by both the web app and the future worker, real Next.js startup validation, and a narrow explicit public/server-only separation), hardened by two independent-review correction passes (the shared parser now requires an explicit source and can no longer read the real environment even if imported directly; application/origin URLs reject non-web schemes and embedded credentials without ever echoing the raw credential-bearing value, regardless of which validation rule fails first; and payment-mode/checkout-flag environment safety rules were added), and locally validated — but not yet `VERIFIED`, since no actual GitHub-hosted Actions run evidence has been obtained yet.

Current sequence:

1. the owner opens a pull request from `imp-010-config-boundaries` into `main` (or provides `gh`/GitHub API access) so the `CI` workflow's `quality-gate` run can execute and be recorded as evidence, completing `IMP-010`;
2. `IMP-011` and later tasks remain blocked until their own dependencies and owner/provider decisions are satisfied;
3. no product feature, database, migration, provider configuration, infrastructure, deployment, production resource, or application release exists;
4. production deployment, customer launch and production provider activation remain unauthorized.

GitHub `main` is the permanent source of truth. Claude Code must enter through `CLAUDE.md`, which preserves the task-controlled implementation gate.

---

## Approved owner decisions

### Decision 1 — Repository description

**Approved:** Describe the product as an AI-assisted digital wedding invitation and RSVP platform, while clearly stating that the current repository is a documentation package and no application release exists.

### Decision 2 — Audience

**Approved:** Write this README for the owner, future developers, Claude Code, technical reviewers and approved collaborators rather than as public marketing copy.

### Decision 3 — Product transparency

**Approved:** State the approved commercial, market, language, payment, AI and guest boundaries at summary level and route exact interpretation to the authoritative documents.

### Decision 4 — No installation instructions yet

**Approved:** Omit application installation, environment and run commands until the implementation stack is formally selected and an approved application skeleton exists.

### Decision 5 — No premature badges or claims

**Approved:** Do not add build, coverage, security, deployment, version, license, pricing or availability badges until each claim is backed by an approved and verifiable source.

### Decision 6 — No vendor endorsement

**Approved:** Identify historical provider names as non-binding examples and keep production selections pending until their official evaluation and approval.

### Decision 7 — Private repository contribution rule

**Approved:** Keep contributions owner-controlled and task-authorized until explicit governance, licensing and public contribution rules are approved.

### Decision 8 — Security wording

**Approved:** Avoid impossible “unhackable” claims; describe the approved defense-in-depth, attack-surface reduction, detection, containment and secure-recovery objective instead.

### Decision 9 — Repository map

**Approved:** Show the complete intended documentation structure while warning that a listed planned file is not automatically approved or committed.

### Decision 10 — Implementation onboarding gate

**Approved:** Add real setup and run instructions only after the stack decision, application skeleton and commands are implemented, tested and owner-approved.

---

## Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.10.  
**Approved date:** 2026-08-21.  
**Owner decisions:** Decisions 1–10 approved as proposed; Decision 10 fulfilled by the verified `IMP-004` engineering baseline; `IMP-005` is `VERIFIED` from successful GitHub-hosted pull-request and post-merge CI evidence; `IMP-010` is implemented, hardened by two independent-review correction passes, and locally validated, pending GitHub-hosted Actions run evidence.
