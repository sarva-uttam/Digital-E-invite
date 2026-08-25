# MVP Product Requirements Document

**File:** docs/03_MVP_PRD.md  
**Project:** AI Digital Invitation Platform  
**Status:** Approved  
**Version:** 1.1  
**Owner Decision:** Approved  
**Approval Date:** 16 August 2026  
**Document Type:** Minimum Viable Product requirements  
**Depends On:** docs/00_CLAUDE_RULES.md; docs/01_PROJECT_VISION.md; docs/02_BUSINESS_MODEL.md; project/DECISIONS.md (DEC-025)  
**Last Updated:** 25 August 2026 — package tier count reconciled to four tiers per `DEC-025`  

---

# 1. Purpose

This document defines the first commercially usable product: its users, journeys, functional requirements, business rules, administrative requirements, security expectations, failure handling, acceptance criteria, exclusions, and release conditions.

It defines what the MVP must accomplish without selecting a technology stack. Architecture and providers belong in later approved documents.

# 2. MVP Definition

The MVP is a secure, mobile-first service through which a host or event planner can create a wedding event, provide structured preferences and verified event facts, receive controlled AI-assisted concepts, select and refine an invitation, complete payment, publish a hosted invitation, share it, collect RSVPs, and manage basic guest responses.

It must be a complete working customer journey rather than disconnected screens or simulated functionality.

# 3. Objectives

The MVP must test whether customers will complete the questionnaire, trust the service with event information, value AI-assisted concepts, pay, publish, share, collect responses, and recommend or reuse the service. It must also show whether the business can deliver this journey reliably and at sustainable cost.

# 4. Binding Decisions

The MVP inherits:

- Mauritius-first launch with supported global access;
- weddings as the only fully supported initial event type;
- direct hosts and planners as primary users;
- hosted invitation pages and RSVP collection as core value;
- English-first interface;
- French and Mauritian Kreol invitation-copy support;
- Russian deferred beyond the MVP;
- one-time event packages and four tiers (Bronze/Silver/Gold/Platinum, `DEC-025`);
- package selection before concept generation;
- controlled preview before payment;
- verified payment before final publication;
- guest allowances and defined hosting durations;
- no third-party guest-page advertising;
- controlled, non-unlimited AI usage;
- no general-purpose design editor;
- no provider selection in this PRD.

# 5. Release Philosophy

Priority order:

1. complete end-to-end journey;
2. factual event accuracy;
3. secure payment;
4. usable mobile experience;
5. clear entitlements;
6. guest privacy;
7. recoverable failures;
8. administrative visibility;
9. controlled variable cost;
10. understandable choices.

A smaller complete product is preferred over a larger incomplete product.

# 6. User Roles

## Visitor

May view marketing and package information, register, view a valid published invitation, submit an RSVP, and access public legal information. A visitor cannot access private dashboards or unpublished events.

## Host

May create and manage owned events, facts, creative preferences, concepts, refinements, payment, publication, guests, responses, and relevant records.

## Event Planner

Uses the same basic per-event workflow as a host and may mark the event as created for a client. The MVP does not require agency teams, client accounts, client portals, white-label dashboards, volume billing, or planner subscriptions.

## Guest

May view a published invitation and submit or securely update an RSVP without creating an account.

## Administrator

An explicitly authorized internal operator may inspect operational status, assist users, review payments and generation failures, correct entitlements with a reason, disable abusive content, support refunds, and view audit information. Access must be least-privilege and auditable.

# 7. Primary Journey

1. Visitor registers or signs in.
2. User starts a wedding event.
3. User completes the creative questionnaire.
4. User enters structured event facts.
5. User reviews and selects a package.
6. Platform generates the entitled concept set.
7. User previews and selects a concept.
8. User performs controlled refinements.
9. User verifies essential facts.
10. User receives a protected preview.
11. User completes checkout.
12. Platform independently verifies payment.
13. User confirms publication.
14. Platform publishes a stable invitation URL.
15. User copies or shares the link and QR code.
16. Guests view the invitation and RSVP.
17. Host or planner manages and exports responses.

# 8. Authentication and Ownership

The MVP must provide registration, sign-in, sign-out, secure recovery, secure sessions, and an account-deletion process subject to applicable retention obligations.

Users must not access another user’s events, guests, invitations, generations, entitlements, or payments without an approved relationship.

Users must authenticate before saving an event or generating AI concepts. Planner designation does not grant elevated system permission.

# 9. Event Creation

An authenticated user can create a wedding event and mark it as their own or for a planner client. Progress must save so the user can leave and resume.

Other event categories remain hidden until their complete flows are approved.

The event lifecycle must distinguish at minimum:

- draft;
- questionnaire incomplete;
- ready for generation;
- generating;
- generation failed;
- preview available;
- awaiting payment;
- paid;
- ready to publish;
- published;
- expired;
- archived;
- suspended or removed.

Exact states and transitions belong in later domain documentation.

# 10. Creative Questionnaire

The questionnaire must collect:

- event type;
- optional religious or cultural context;
- venue or atmosphere;
- colour mood;
- approximate guest count;
- requested special elements;
- invitation-language preference;
- additional notes.

Potential cultural-context choices may include Hindu, Muslim, Christian, interfaith, non-religious, other, and prefer not to specify.

The product must not infer religion. Sacred or culturally sensitive elements must not be added without explicit direction and approved safety rules.

Free text is untrusted, validated, and length-limited. Users can review answers before generation.

# 11. Structured Event Facts

The MVP must separately collect authoritative facts:

- names appearing on the invitation;
- event date;
- event time;
- explicit time zone;
- venue name and location;
- approved contact information;
- RSVP deadline;
- optional dress code;
- optional event instructions.

Mauritius may be the default time-zone context for Mauritian events but cannot be assumed globally.

Users review essential facts before generation and again before publication.

AI must not silently alter names, dates, times, venues, deadlines, contacts, or factual instructions.

# 12. Packages and Entitlements

The MVP supports four versioned customer-facing tiers: Bronze, Silver, Gold, Platinum (`DEC-025`).

Users must see meaningful differences such as concept allowance, refinement allowance, guest allowance, hosting duration, branding, language support, features, price, and currency once approved.

No package may claim unlimited AI generation.

Price and entitlement information is server-authoritative. Completed purchases preserve historical package versions and purchased entitlements.

The architecture must support future upgrades, but the customer-facing upgrade workflow is P1 and may be deferred from the initial release.

# 13. AI Concept Generation

Generation requires authentication, event ownership, a selected package, validated inputs, and sufficient entitlement.

Decorative image generation and invitation text should be separable to preserve factual accuracy. Decorative images should normally avoid essential rendered text; authoritative text is rendered by the application.

Each generation must record appropriate event, user, entitlement, provider-abstraction, model or version, status, prompt reference, timestamps, result, failure, and usage or cost metadata.

Structured AI output must be schema-validated. Generated material is subject to safety and cultural controls.

Failures must provide a useful state, handle quota fairly, avoid duplicate consumption, use controlled retries, and be diagnosable.

Unpaid previews may be watermarked, reduced quality, access-limited, or otherwise protected.

Server-side quotas, rate limits, timeouts, retries, and duplicate-request protection are mandatory.

# 14. Invitation Copy

The platform may draft editable copy in a supported invitation language using verified facts and selected tone.

Supported tones may include formal, warm, modern, traditional, elegant, and concise.

English is the complete interface language for MVP. French and Mauritian Kreol may be used for invitation-copy generation. Mauritian Kreol is specifically a Mauritius localization. Russian is deferred.

Machine translation remains reviewable and cannot be represented as guaranteed professional translation.

AI copy must not invent facts or insert arbitrary executable HTML, CSS, or scripts.

# 15. Selection and Controlled Refinement

Users can compare entitled concepts and select one active direction.

The product provides bounded adjustments rather than an unrestricted canvas. Possible controls include approved colour direction, copy, alignment, font pairing, imagery direction, tone, effects, spacing, layout variants, and language.

A natural-language refinement control may interpret requests such as “more elegant,” but it must return validated bounded configuration changes, not arbitrary code.

AI refinements consume entitlements according to later rules.

The system records the selected concept, significant refinements, and published version. Full customer-facing historical reversion is deferred.

# 16. Preview

Users can preview the mobile and desktop invitation before publication.

Unpublished invitations are not publicly discoverable. Partner or client preview links are P2 and not required for launch.

The user must confirm essential event facts before checkout or publication.

# 17. Payment

The MVP provides checkout for the selected package.

Amount, currency, discount, taxes, package, and entitlements are server-calculated or independently verified.

Payment states must include created, pending, successful, failed, cancelled, expired, refunded, and other provider-supported states such as partial refund, dispute, or chargeback.

Client redirects cannot establish payment success. Provider notifications must be authenticated and idempotent. Duplicate notifications and retries must not create duplicate charges or entitlements.

A failed or abandoned payment does not publish the invitation or grant paid entitlements. An eligible payment can be resumed or retried without losing the event.

The user receives an appropriate payment or receipt reference.

The provider is selected only after current official research.

# 18. Publication

Verified payment and explicit user confirmation are required before final publication.

Published invitations use stable, non-sequential, hard-to-guess public identifiers.

The P0 visibility model is **anyone with the hard-to-guess link**. An optional access code is P1, not P0. Individually tokenized guest links are deferred.

Hosts can correct supported event facts after publication and can unpublish where authorized. Administrators can disable invitations under approved procedures.

Published pages respect package hosting duration, contain no third-party advertising, and may contain tasteful platform attribution according to entitlement.

The system supports hosting expiry from the first release. Extension purchases may initially be handled manually by support. Hosting expiry and data deletion remain separate.

# 19. Sharing

Hosts can:

- copy the invitation URL;
- use a WhatsApp-friendly share action;
- use supported device or browser sharing;
- obtain a QR code;
- edit suggested sharing text.

Sharing must never expose private dashboards or unpublished information.

# 20. Guest Management

Hosts can manually create, edit, search, filter, and remove basic guest records, subject to retention requirements.

Minimum data may include display name, contact where needed, household or party grouping, permitted party size, RSVP status, attendance count, optional dietary or message information, and internal host notes.

CSV guest import is P2 and excluded from P0.

CSV export of guest and RSVP data is included.

Guest capacity must follow approved entitlements. Guest records, households, invitees, plus-ones, submissions, and attendees are distinct concepts and will be defined in product/GUEST_RULES.md.

# 21. RSVP

Guests can RSVP without an account.

The form supports attending, not attending, permitted party size or attendance count, identification, and an optional message. Additional questions such as dietary needs are optional and must be justified.

The form respects the RSVP deadline according to later guest rules.

Guests receive an on-screen confirmation.

A guest may securely update a prior response using a private response-management token without creating an account.

Duplicate responses must be handled predictably. Public RSVP endpoints require validation, rate limiting, and abuse protection.

Guests receive a concise privacy notice.

Individual host email notifications for every response are deferred. Dashboard summaries and new-response visibility are required.

# 22. Host Dashboard

The dashboard shows events and their states.

Each event overview displays:

- event state;
- package;
- generation progress;
- payment status;
- publication status;
- invitation URL;
- hosting expiry;
- guest allowance and usage;
- RSVP totals;
- remaining applicable AI entitlements;
- required next actions.

Hosts can preview, publish, update supported information, share, unpublish, manage guests, export responses, and inspect relevant payment status.

# 23. Administration

Authorized administrators can locate users and events, inspect payment and generation states, view entitlement usage, investigate failures, disable invitations, correct entitlements with a mandatory reason, support approved refund operations, and review audits.

Sensitive payment data must be minimized.

Important administrative actions are auditable. A hidden universal admin mode is not acceptable.

# 24. Localization

The complete MVP interface launches in English.

French and Mauritian Kreol invitation-copy support are included, subject to quality validation and host review. Full French and Mauritian Kreol interface localization is deferred. Russian interface and invitation support are deferred beyond MVP.

Dates, times, zones, addresses, and currencies must not assume every event is Mauritian.

# 25. Responsive Design and Accessibility

The complete host, planner, and guest journeys must work on practical mobile sizes and supported desktop browsers.

At minimum:

- keyboard-accessible controls;
- labelled forms;
- visible focus;
- sufficient contrast;
- errors not conveyed by colour alone;
- appropriate text alternatives;
- reduced-motion respect where applicable;
- practical mobile performance.

Exact accessibility and performance standards belong in later design and deployment documents.

# 26. Privacy and Security

The MVP collects only data necessary for invitations, RSVP, payment, security, support, and legal duties.

Private account information does not appear publicly unless intentionally selected for invitation display. Guest information receives a privacy notice and is not reused for unrelated advertising.

Personal information is not sent to AI providers unless necessary for an approved feature and protected by later architecture.

Unpublished events and guest lists remain private.

The MVP must include secure authentication, authorization, ownership enforcement, administrative roles, server validation, output encoding, rate limits, safe secrets, webhook verification, idempotency, non-guessable identifiers, secure media handling, audit logging, safe errors, dependency controls, backups, and recovery planning.

# 27. Reliability and Failure Handling

User progress survives normal refreshes and recoverable failures.

Generation, payment, publication, and RSVP failures must produce understandable states.

Critical operations are idempotent where appropriate. Retries cannot create duplicate charges, entitlements, publications, submissions, or unfair quota consumption.

External-provider failures must not corrupt events.

Operators require structured diagnostic information without secret exposure.

# 28. Analytics

Privacy-conscious events should measure event creation, questionnaire completion, generation, selection, refinement, checkout, payment, publication, sharing, invitation views, RSVP completion, package performance, market performance, failure rates, and entitlement usage.

Analytics must not expose private invitation or guest content unnecessarily. The provider remains undecided.

# 29. Customer Support

The MVP must provide a visible support route, enough context to report payment or technical issues, administrative lookup tools, honest expectations, and procedures for generation, payment, publication, and RSVP failures.

Live chat and 24-hour support are not required.

# 30. Included in P0

- public marketing and package pages;
- authentication and recovery;
- host and planner account context;
- wedding-event creation;
- structured questionnaire and event facts;
- draft persistence;
- four versioned packages (Bronze/Silver/Gold/Platinum);
- controlled AI concepts and copy;
- concept selection and bounded refinement;
- protected preview;
- checkout and verified payment;
- publication and hard-to-guess URL;
- link, WhatsApp-friendly sharing, and QR code;
- manual guest management;
- accountless RSVP and secure response update;
- host RSVP dashboard;
- CSV export;
- hosting expiry;
- secure administration and audits;
- essential analytics;
- privacy and legal pages;
- failure and recovery states.

# 31. Deferred or Excluded

Excluded unless later approved:

- native mobile apps;
- unrestricted design canvas;
- arbitrary HTML or CSS;
- template or vendor marketplaces;
- printing fulfilment;
- tickets, seating, meal inventory, and registries;
- public event discovery and social feeds;
- guest accounts;
- planner teams, subscriptions, client portals, and white-label dashboards;
- custom domains;
- referral and affiliate programmes;
- advanced CRM or marketing automation;
- SMS or automated WhatsApp campaigns;
- AI music, advanced 3D, unrestricted video, and per-guest AI messages;
- public APIs;
- complex integrations;
- all event categories;
- complete multilingual interface localization;
- unlimited AI usage;
- CSV guest import in P0;
- private collaborator preview in P0;
- customer-facing version restoration in P0;
- access codes in P0;
- customer-facing package upgrades in P0.

# 32. Priorities

## P0 — Launch Required

Authentication, event creation, questionnaire, facts, packages, concepts, copy, refinement, preview, payment, publication, sharing, QR, RSVP, guest dashboard, CSV export, administration, security, privacy, monitoring, and recovery.

## P1 — Strongly Desired

Optional invitation access code, customer-facing package upgrades, enhanced deadline handling, refined desktop dashboard, hosting-extension workflow, and improved commercial analytics.

## P2 — Deferred

CSV import, private collaborator preview, historical restoration, individual RSVP email notifications, advanced planner conveniences, other event categories, and broader interface localization.

P1 and P2 must not delay a stable P0 release.

# 33. Release Readiness

Before launch:

- critical journeys pass browser and mobile testing;
- payment verification and webhook replay are tested;
- cross-account access attempts fail;
- unpublished invitations remain private;
- public identifiers are unpredictable;
- RSVP abuse controls function;
- AI failure recovery works;
- generated facts match structured inputs;
- accessibility checks are complete;
- backups and recovery procedures exist;
- monitoring and error reporting operate;
- privacy and commercial policies are published;
- administrative actions are auditable;
- exact prices and entitlements are approved;
- payment-provider capabilities are verified from official sources.

# 34. Success Criteria

A real customer can register, create a wedding, complete the questionnaire, enter and verify facts, understand packages, generate concepts, select and refine one, preview, pay, publish, share, receive an RSVP, manage responses, export basic guest information, and obtain support when a critical step fails.

Administrators can diagnose critical problems without direct database manipulation as their normal workflow.

Commercial validity requires evidence of willingness to pay and sustainable unit economics.

# 35. Required External Research

Before implementation decisions, current official research is required for payment merchant eligibility, countries, currencies, settlement, fees, refunds, Mauritius data protection, international transfers, consumer rules, AI-provider data handling and limits, hosting regions, transactional email, tax, and invoicing.

No provider is approved by this document.

# 36. Completion Rule

A requirement is not complete merely because its normal interface works.

Completion includes authorization, validation, loading and empty states, error handling, safe retry behaviour, auditability where required, entitlement enforcement, mobile usability, accessibility, tests, monitoring, documentation, and safe failure.

# 37. Approved Owner Decisions

The owner approved these decisions on 16 August 2026:

1. Weddings are the only fully supported MVP event type.
2. Planners use the same basic per-event workflow as hosts with planner designation and client reference.
3. Guests RSVP without accounts.
4. The MVP interface is complete in English; French and Mauritian Kreol support invitation copy; Russian is deferred.
5. Users select a package before concept generation.
6. Users receive a protected preview and pay before final publication.
7. Published invitations are accessible to anyone with a hard-to-guess link.
8. Authentication is required before saving events or generating concepts.
9. CSV guest import is P2.
10. CSV guest and RSVP export is included.
11. QR-code generation is included.
12. Guests may securely update responses using private tokens.
13. Individual RSVP email notifications are deferred.
14. Private partner or client preview links are P2.
15. Full customer-facing version reversion is deferred.
16. Upgrade-ready architecture is required; customer upgrade flow is P1 or deferred.
17. Other event categories remain hidden until complete.
18. Entry-tier platform attribution is permitted; higher-tier removal follows entitlements.
19. Optional invitation access codes are P1, not P0.
20. Hosting expiry is supported from launch; extensions may initially be handled manually.

# 38. Approval Record

**Owner Decision:** Approved  
**Approval Date:** 16 August 2026 (package tier count reconciled 25 August 2026 per `DEC-025`)  
**Approved Version:** 1.1  
**Authority:** Approved source-of-truth document under the hierarchy established by docs/00_CLAUDE_RULES.md.
