# System Architecture

**File:** docs/05_SYSTEM_ARCHITECTURE.md  
**Project:** AI Digital Invitation Platform  
**Status:** Approved  
**Version:** 1.0  
**Owner Decision:** Approved  
**Approval Date:** 16 August 2026  
**Document Type:** System architecture and technical direction  
**Depends On:** docs/00_CLAUDE_RULES.md; docs/01_PROJECT_VISION.md; docs/02_BUSINESS_MODEL.md; docs/03_MVP_PRD.md; docs/04_DOMAIN_MODEL.md  
**Last Updated:** 16 August 2026  

---

# 1. Purpose

This document defines the MVP architectural style, deployable components, runtime and framework direction, module organization, synchronous and asynchronous processing, provider boundaries, transaction strategy, request paths, reliability, observability, and scaling direction.

It does not select the database host, authentication provider, AI providers, payment provider, storage provider, email provider, analytics provider, queue provider, observability provider, or final deployment provider. Dedicated documents own those decisions.

# 2. Approved Architecture

The MVP is a **TypeScript modular monolith** in one repository, consisting of:

- a Next.js web application;
- a separately deployable asynchronous worker;
- PostgreSQL as the authoritative transactional database;
- object storage for generated media;
- a durable queue or workflow mechanism;
- provider adapters for authentication, AI, payments, storage, email, analytics, and observability;
- a transactional outbox or equivalent reliable event-delivery mechanism.

The web and worker share domain and application code but have distinct runtime entry points and deployment lifecycles.

# 3. Why a Modular Monolith

The product has one MVP, one repository, a tightly connected domain, strong transactional relationships, and no evidence of independent service-scaling or team-ownership requirements.

Microservices would prematurely add distributed transactions, network failure modes, service authorization, tracing, deployments, duplicated configuration, operational cost, and harder local development.

An unstructured monolith is also unacceptable. Modules require explicit boundaries, intentional internal APIs, provider isolation, testability, and dependency rules.

Service extraction may occur later only for demonstrated independent scaling, availability, regulatory, security, ownership, or deployment needs.

# 4. Official Technology Research

Current official documentation checked on 16 August 2026:

- Next.js App Router documentation identifies version 16.3.1.
- Next.js requires Node.js 20.9 or newer.
- Node.js 24 is the latest LTS line.
- TypeScript 6.0 is current.
- PostgreSQL 18 is the current supported major version.

References:

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/getting-started/installation
- https://nodejs.org/en/about/previous-releases
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html
- https://www.typescriptlang.org/docs/handbook/2/basic-types.html
- https://www.postgresql.org/docs/current/
- https://www.postgresql.org/docs/current/datatype-json.html

Exact patch versions must be rechecked and pinned at implementation start. Production manifests must not use unbounded “latest” dependencies.

# 5. Technology Baseline

## TypeScript

TypeScript is used across web, server-side logic, shared domain code, and worker code.

Required direction:

- strict compiler mode;
- strict null handling;
- no casual any;
- runtime validation at external boundaries;
- deterministic type generation where applicable.

## Node.js

Node.js 24 LTS is the implementation baseline, subject to exact patch and hosting compatibility verification.

## Next.js

Next.js 16 App Router is the approved starting web framework.

It supports the public website, authenticated dashboard, server-rendered invitation pages, route handlers, webhooks, and responsive React UI.

Business logic must not live primarily inside React components, route handlers, middleware, or Server Actions. Framework entry points call application services.

## PostgreSQL

PostgreSQL is the authoritative transactional database.

It provides relational constraints, transactions, exact numeric types, indexing, and bounded JSONB support.

The provider and exact supported major version remain subject to the database-design and hosting evaluation.

## Media Storage

Generated and uploaded media use platform-controlled object storage, not the application filesystem, database binary columns, or temporary AI-provider URLs.

## Background Processing

Long-running or retryable work uses a durable job mechanism. The provider remains undecided.

# 6. Deployable Components

## Web Application

Responsibilities:

- marketing and package pages;
- authentication integration;
- host and planner dashboard;
- event creation;
- questionnaire;
- package selection;
- preview;
- checkout initiation;
- publication;
- public invitation rendering;
- RSVP submission and revision;
- administration;
- provider webhooks;
- health and readiness endpoints.

The web process should remain stateless where practical.

## Worker

Responsibilities:

- AI generation;
- provider polling;
- retries;
- media processing;
- exports;
- email;
- hosting expiry;
- outbox delivery;
- asynchronous domain-event handlers;
- cleanup and maintenance.

## Managed Dependencies

Conceptual dependencies include PostgreSQL, durable queue, object storage, authentication, AI, payments, transactional email, monitoring, and analytics. They are not custom microservices.

# 7. Repository Structure

Recommended shape:

    apps/
      web/
      worker/

    packages/
      domain/
      application/
      infrastructure/
      validation/
      ui/
      config/
      observability/
      testing/

    docs/
    product/
    project/

Workspace separation is approved. The package manager and workspace orchestration tool remain implementation decisions.

# 8. Package Responsibilities

## Domain

Contains entities, value objects, rules, transitions, domain errors, events, and invariants.

It must not import Next.js, database clients, provider SDKs, storage SDKs, or UI components.

## Application

Contains use cases, commands, queries, authorization orchestration, transaction coordination, ports, DTO mapping, and application idempotency.

Examples include CreateEvent, ConfirmEventFacts, SelectPackage, RequestGeneration, VerifyPayment, PublishInvitation, SubmitRsvp, ReviseRsvp, and AdjustEntitlement.

## Infrastructure

Contains database, authentication, AI, payment, queue, storage, email, analytics, monitoring, and cache adapters.

## Validation

Contains external-boundary schemas for forms, HTTP payloads, webhooks, provider responses, AI output, and environment configuration.

## UI

Contains presentation primitives and design-system components. It has no payment or domain authority.

# 9. Dependency Direction

Intended direction:

    UI / HTTP / Worker entrypoints
                  ↓
            Application layer
                  ↓
              Domain layer

    Infrastructure adapters
                  ↑
      Application ports/interfaces

Rules:

- Domain imports no infrastructure.
- Application depends on Domain.
- Infrastructure implements inward-defined interfaces.
- Web and Worker compose the system.
- Route handlers call use cases.
- UI does not query PostgreSQL directly.
- Provider SDKs stay inside adapters.
- Circular package dependencies are prohibited.

# 10. Internal Modules

Recommended modules:

1. Identity and Access
2. Event Management
3. Commercial Catalogue
4. Entitlements
5. AI Generation
6. Invitation Composition
7. Payments
8. Publication
9. Guest Management
10. RSVP
11. Administration
12. Audit
13. Notifications
14. Analytics

Each module exposes an intentional internal API. Modules must not modify one another’s records through ad hoc direct writes.

Cross-module coordination occurs through application use cases or approved domain-event handlers.

# 11. Request Paths

## Authenticated Request

Browser → Next.js entry point → authentication → schema validation → application use case → authorization → transaction → repository or adapter → response DTO → UI.

## Public Invitation

Guest → public identifier lookup → publication-state check → expiry check → safe Public Invitation projection → server-rendered page.

Private Account, Event, Payment, prompt, audit, and Guest-list records are never serialized directly.

## RSVP

Guest → rate and abuse controls → payload validation → publication eligibility → Guest Party match → attendance validation → transactional submission or revision → response-management token → safe confirmation.

## Payment Webhook

Provider → raw webhook endpoint → signature verification → deduplication → amount and currency verification → transactional payment transition → entitlement grant → outbox event → response.

## AI Generation

Authenticated user → use case → ownership and entitlement validation → entitlement reservation → Generation Request → durable job → Worker → provider adapter → output validation and moderation → object storage → state transition → entitlement consumption or restoration → user-visible state.

# 12. Synchronous and Asynchronous Work

Synchronous work includes short operations such as dashboard reads, questionnaire saves, fact confirmation, package selection, checkout initiation, publication after prerequisites, and RSVP submission.

Asynchronous work includes AI generation, media processing, provider polling, exports, email, retries, expiry processing, cleanup, and non-critical analytics.

A browser request must not remain open for minutes waiting for an AI provider.

# 13. Transactions

Transactions protect operations such as:

- entitlement reservation plus Generation Request creation;
- verified payment plus entitlement grants;
- RSVP revision plus current-effective response;
- publication plus active-version selection;
- Support Adjustments;
- refund recording and entitlement consequences.

External network calls should normally not occur inside long database transactions.

Recommended pattern:

1. validate and reserve local state;
2. commit;
3. perform external work asynchronously;
4. record the result in a new transaction.

# 14. Transactional Outbox

Critical domain changes and outbox entries commit together.

Examples:

- PaymentVerified;
- EntitlementGranted;
- GenerationRequested;
- GenerationSucceeded;
- InvitationPublished;
- HostingExpired;
- RsvpSubmitted;
- RefundSucceeded.

A Worker delivers events idempotently. This prevents successful database commits from losing required downstream work.

Minor edits need not produce outbox events.

# 15. Idempotency

Idempotency is mandatory for payment webhooks, checkout creation where supported, entitlement grants, generation requests, Worker jobs, callbacks, RSVP revisions, publication, refunds, and retryable Support Adjustments.

Keys require defined scope, ownership, safe expiration, stored result or conflict behaviour, and protection from cross-user reuse.

# 16. Provider Ports

Narrow interfaces are required for:

- authentication;
- image generation;
- text generation;
- translation;
- structured refinement;
- payment;
- storage;
- email;
- analytics;
- observability;
- queue or workflow execution.

One universal AI interface must not hide incompatible image, text, translation, and refinement behaviour.

Provider-specific response shapes and states are translated at adapter boundaries.

# 17. Authentication Boundary

The final provider remains undecided.

Regardless of provider:

- the platform owns Account and Profile concepts;
- external identity IDs are provider references;
- the application enforces authorization;
- provider metadata alone cannot grant access;
- administrative roles are explicit and auditable;
- server-side ownership checks are mandatory.

# 18. Database Access

Database access occurs through module-owned repositories, approved query services, and transactional application services.

Avoid:

- UI database clients;
- callbacks writing arbitrary tables;
- cross-module ad hoc updates;
- rules existing only in triggers;
- one unrestricted generic repository.

Database constraints reinforce invariants, while domain and application logic remain understandable.

The ORM or query-builder choice belongs in docs/06_DATABASE_DESIGN.md.

# 19. Relational and JSON Data

Relational fields model stable business facts.

JSONB may represent bounded design configuration, validated provider metadata, structured generation payloads, configuration snapshots, and safe audit metadata.

JSON must not replace modelling of ownership, payment amounts, currencies, event dates, canonical states, foreign keys, entitlement balances, or attendance.

# 20. Media Pipeline

Provider or upload → validation → safety checks → normalization → object storage → metadata persistence → safe delivery URL.

Requirements:

- no permanent reliance on temporary provider URLs;
- clear event ownership;
- private sources separated from public derivatives;
- file type and size validation;
- quarantine support;
- safe deletion and replacement;
- no public storage credentials.

# 21. Public Invitation Rendering

Public invitations use server-controlled rendering and a safe Public Invitation projection.

Benefits include reliable link previews, meaningful initial content, controlled expiry checks, and reduced private-data exposure.

The page must not fetch a private Event object and merely hide fields in client-side code.

# 22. Caching

Caching is conservative.

Possible candidates:

- active catalogue;
- public invitation projections;
- static marketing content;
- safe localization resources.

Avoid casually caching payment state, entitlement balance, admin authorization, sensitive guest data, unpublished invitations, or mutable RSVP state.

Every cache requires keys, scope, invalidation, expiry, stale-data tolerance, and privacy classification.

Publication, unpublishing, expiry, and material fact changes invalidate public caches.

# 23. API Strategy

No general public API is included in MVP.

HTTP endpoints exist only for browser requests, webhooks, public invitation access, RSVP, and health checks.

Server Actions are permitted only as thin authenticated entry points following the same authentication, authorization, validation, application-service, audit, and error rules.

Business logic remains callable outside Next.js.

# 24. Error Model

Error categories include validation, unauthenticated, unauthorized, not found, conflict, invalid transition, exhausted entitlement, rate limited, provider unavailable, payment verification failure, generation failure, unsafe content, and internal failure.

Public errors never reveal stack traces, secrets, raw provider payloads, database details, or private identifiers.

Safe correlation identifiers support diagnosis.

# 25. Observability

Required capabilities:

- structured logs;
- request, job, and provider correlation;
- error reporting;
- provider latency;
- generation results;
- webhook processing;
- queue age and retries;
- payment anomalies;
- publication and RSVP failures;
- health and readiness checks.

Logs exclude secrets, full payment payloads, RSVP-management tokens, unnecessary guest data, credentials, and sensitive prompts.

The provider remains undecided.

# 26. Configuration and Secrets

Configuration is validated at startup.

Rules:

- secrets never enter client bundles;
- missing critical values fail startup clearly;
- production secrets are absent from Git;
- environments are explicit;
- provider configuration is adapter-scoped;
- feature flags cannot bypass security, authorization, entitlement, or payment rules.

# 27. Environments

Required environments:

- local development;
- automated test;
- preview or review;
- staging;
- production.

Staging should sufficiently represent migrations, queues, webhooks, AI adapters, payment test mode, storage, email, and monitoring.

Non-production must not charge real customers or use production data accidentally.

# 28. Testing Support

The architecture supports domain unit tests, application-use-case tests, repository integration tests, provider-contract tests, webhook replay, Worker tests, browser end-to-end tests, migration tests, authorization tests, and retry tests.

Provider adapters are replaceable by deterministic test fakes.

# 29. Scaling Direction

Initial scaling uses stateless horizontal web scaling, independently scalable Workers, durable queues, PostgreSQL indexing, connection pooling, CDN media delivery, safe public-projection caching, provider rate limits, and workload-specific concurrency.

Do not introduce microservices, sharding, multi-region active-active writes, Kubernetes, complex event streaming, or data warehouses without demonstrated need.

# 30. Degradation

Capabilities degrade independently:

- AI outage does not take down published invitations;
- analytics outage does not stop transactions;
- email outage queues retries while dashboards remain authoritative;
- payment outage does not remove existing paid invitations;
- media-generation failure does not remove stored assets;
- Worker delay displays queued status rather than false failure.

Public invitation delivery must not depend on live AI availability.

# 31. Security Boundaries

Primary trust boundaries:

- browser to web;
- guest to public endpoints;
- application to PostgreSQL;
- web or Worker to providers;
- provider to webhook;
- Worker to queue;
- application to storage;
- administrator to admin functions.

Each requires applicable authentication, authorization, validation, rate controls, safe errors, and auditability.

Kubernetes is excluded because orchestration complexity does not itself make the application secure. Security comes from correct authorization, isolation, validation, secrets handling, patching, monitoring, network controls, backups, and incident response, which are required regardless of deployment platform.

# 32. Deployment Portability

The system avoids unnecessary coupling to proprietary database APIs, identity objects, job semantics, storage URL formats, analytics clients, and AI response structures.

Portability does not mean supporting every provider simultaneously. It means keeping meaningful provider boundaries replaceable.

# 33. Decision Records

Material decisions must be recorded in project/DECISIONS.md or dedicated records with context, options, decision, consequences, date, status, and superseding decision.

# 34. Approved Architecture Decisions

Approved on 16 August 2026:

1. MVP uses a modular monolith.
2. Web and Worker are separately deployable processes.
3. TypeScript is used across web, server, domain, and Worker.
4. Node.js 24 LTS is the baseline, with patch revalidation.
5. Next.js 16 App Router is the starting framework.
6. PostgreSQL is the authoritative database.
7. Repository uses workspace separation for apps and packages.
8. Microservices are rejected for MVP.
9. Domain remains framework, database, and provider independent.
10. Long-running work uses durable asynchronous jobs.
11. Critical transitions use a transactional outbox or equivalent.
12. Public invitations use server-controlled rendering and safe projections.
13. General public API remains excluded.
14. Server Actions are thin application-service entry points only.
15. Generated media is copied into platform-controlled object storage.
16. External service providers remain undecided pending dedicated evaluation.
17. Caching remains conservative.
18. Kubernetes and similar orchestration are excluded from MVP.
19. Unnecessary hosting-provider lock-in is avoided.
20. Exact dependency versions are officially rechecked and pinned at implementation start.

# 35. Acceptance Criteria

Architecture is acceptable when:

- Domain is framework-independent;
- web and Worker share approved logic;
- providers are adapter-bound;
- payment and entitlement updates are transactional;
- AI work is asynchronous;
- critical events are not silently lost;
- public data is a safe projection;
- module dependencies are intentional;
- providers are replaceable in tests;
- deployment does not require microservices or Kubernetes;
- provider outages do not destroy core data;
- final providers can be selected without rewriting the domain.

# 36. Approval Record

**Owner Decision:** Approved  
**Approval Date:** 16 August 2026  
**Approved Version:** 1.0  
**Authority:** Approved source-of-truth document under the hierarchy established by docs/00_CLAUDE_RULES.md.
