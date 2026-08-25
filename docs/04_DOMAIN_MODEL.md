# Domain Model

**File:** docs/04_DOMAIN_MODEL.md  
**Project:** AI Digital Invitation Platform  
**Status:** Approved  
**Version:** 1.1  
**Owner Decision:** Approved  
**Approval Date:** 16 August 2026  
**Document Type:** Canonical domain model and vocabulary  
**Depends On:** docs/00_CLAUDE_RULES.md; docs/01_PROJECT_VISION.md; docs/02_BUSINESS_MODEL.md; docs/03_MVP_PRD.md; project/DECISIONS.md (DEC-025)  
**Last Updated:** 25 August 2026 — commercial catalogue tier count reconciled to four tiers  

---

# 1. Purpose

This document defines the canonical business concepts, terminology, entities, relationships, ownership boundaries, lifecycle states, and invariants of the platform.

It is conceptual rather than a database, class, API, framework, or infrastructure design. Later technical documents must implement it without silently changing its meaning.

# 2. Modelling Principles

- Keep concepts with different meanings or lifecycles separate.
- Preserve commercial, entitlement, payment, generation, publication, RSVP, and audit history.
- Model ownership and authorization explicitly.
- Separate authoritative event facts from creative preferences and generated content.
- Separate current catalogue configuration from historically purchased rights.
- Expose only an approved public projection of private event data.
- Represent important lifecycles explicitly.
- Map provider-specific concepts to provider-independent canonical concepts.
- Do not combine concepts merely to reduce table count.

# 3. Canonical Vocabulary

**Account:** Authenticated identity authorized to use private functions.

**User:** Human operating through an account. Account remains the authoritative ownership identity.

**Profile:** Non-authentication information associated with an account.

**Organizer:** Account responsible for creating and managing an event.

**Host:** Organizer managing their own or family event.

**Event Planner:** Organizer professionally managing an event for a client. Planner status grants no administrative authority.

**Planner Client Reference:** Private planner-supplied client information. It is not an account or event owner.

**Event:** Private operational record for one occasion. Wedding is the only complete MVP type.

**Event Facts:** Authoritative names, date, time, time zone, venue, deadline, contacts, and instructions.

**Creative Brief:** Structured creative, cultural, language, mood, and design preferences.

**Package Definition:** Versioned commercial offer.

**Price Book:** Versioned market and currency-specific package prices.

**Entitlement Definition:** Versioned description of a package right or limit.

**Event Entitlement:** Right or limit granted to a specific event.

**Purchase Snapshot:** Immutable commercial terms captured when purchasing.

**Generation Request:** Controlled request for AI-assisted output.

**Generation Result:** Output or failure of a generation request.

**Generated Asset:** Generated image, text, configuration, or other approved artifact.

**Invitation:** Designed guest-facing product associated with an event.

**Invitation Version:** Saved invitation presentation and content version.

**Publication:** Record making a specific invitation version guest-accessible.

**Public Invitation:** Safe guest-facing projection of a publication.

**Public Identifier:** Stable, non-sequential, hard-to-guess publication identifier.

**Guest Party:** Primary invited attendance unit: individual, couple, household, family, or group.

**Party Member:** Optional named person associated with a Guest Party.

**RSVP Submission:** Guest Party response.

**RSVP Revision:** Later update preserving meaningful response history.

**Response-Management Token:** Private token allowing accountless RSVP updates.

**Payment Attempt:** One attempt to pay for a package or approved item.

**Payment Transaction:** Canonical money-movement and payment-state record.

**Refund:** Full or partial reversal of a successful payment.

**Audit Event:** Append-only record of a significant action or transition.

**Support Adjustment:** Authorized correction with reason, before-and-after values, and audit.

# 4. Conceptual Contexts

## Identity and Access

Accounts, profiles, organizer classification, roles, and authorization.

## Event Management

Events, ownership, facts, creative briefs, states, and planner-client references.

## Commercial Catalogue

Package definitions, price books, entitlement definitions, availability, and versioning.

## Event Entitlements

Granted, reserved, consumed, restored, and adjusted event rights.

## AI Generation

Generation requests, results, assets, usage, provider metadata, and failures.

## Invitation Composition

Selected concepts, copy, visual configuration, versions, and validation.

## Payments

Checkout, attempts, verification, transactions, refunds, disputes, and commercial auditability.

## Publication

Public identifiers, published versions, visibility, hosting, expiry, and unpublishing.

## Guest and RSVP Management

Guest Parties, optional members, submissions, revisions, tokens, and attendance summaries.

## Administration and Audit

Support, moderation, corrections, operational diagnosis, and audit events.

These conceptual boundaries do not require separate services.

# 5. Account and Profile

An Account has one Profile, owns zero or more Events, may initiate payments and generations, and may receive explicit administrative roles through a separate authorization relationship.

Potential account states:

- active;
- restricted;
- suspended;
- pending deletion;
- deleted or anonymized where legally permitted.

A Profile may contain display name, preferred locale, market, time-zone preference, organizer classification, optional business name, and communication preferences.

Invariants:

- Authentication identity and profile are distinct.
- Planner classification does not grant administrative power.
- Account deletion cannot silently destroy legally required payment or audit records.
- Restriction or deletion cannot expose private events.
- Active events cannot become ownerless.

# 6. Organizer and Planner Client

An organizer operates as a host, planner, or another approved classification.

Every MVP Event has exactly one owning Account.

A Planner Client Reference may contain a display name, internal reference, necessary contact information, and private notes. It is not an account, event owner, guest, public participant, or administrator.

Shared event ownership and collaborators are deferred.

# 7. Event

An Event is the main private operational aggregate.

Conceptual attributes include:

- internal identifier;
- owning account;
- organizer context;
- event type;
- event state;
- market or country context;
- event time zone;
- planner-client reference;
- creation and update timestamps.

MVP event type:

- wedding.

Other types remain hidden until approved.

High-level lifecycle:

- DRAFT;
- READY_FOR_GENERATION;
- GENERATING;
- GENERATION_FAILED;
- PREVIEW_AVAILABLE;
- AWAITING_PAYMENT;
- PAID;
- READY_TO_PUBLISH;
- PUBLISHED;
- EXPIRED;
- ARCHIVED;
- SUSPENDED;
- REMOVED.

Questionnaire completeness and fact verification may be readiness conditions rather than excessive states.

Invariants:

- One Event has exactly one owner.
- One Event has exactly one primary Invitation in MVP.
- Publication requires verified payment where payment is required.
- A published Event references a valid published Invitation Version.
- An Event cannot silently change type after incompatible paid or generated activity.
- Internal identifiers do not grant access.
- Events with payment, publication, or RSVP history use controlled archival or deletion, not immediate hard deletion.

# 8. Event Facts

Authoritative facts include:

- displayed names;
- date;
- time;
- time zone;
- venue name and location;
- RSVP deadline;
- approved contact information;
- dress code;
- factual instructions.

Facts must be reviewable and confirmable. Material changes after publication must be historically traceable.

Invariants:

- AI output is never the authority for event facts.
- Generated copy containing a date does not replace the structured date.
- Event-local date and time always retain time-zone meaning.
- Publishing requires review of the current essential facts.
- Post-publication corrections update the public projection without rewriting generation, payment, or audit history.

# 9. Creative Brief

The Creative Brief contains event type, user-provided cultural or religious context, atmosphere, colour mood, estimated guest count, requested elements, invitation language, and additional notes.

Invariants:

- Cultural context is explicitly supplied, never inferred.
- Prefer not to specify is valid.
- Estimated guest count is neither purchased capacity nor the number of guest records.
- Free text remains untrusted.
- Editing a brief does not automatically grant another generation.

# 10. Commercial Catalogue

A Package Definition is versioned and may contain internal code, customer-facing name, description, availability, market applicability, state, and Entitlement Definitions.

The commercial structure has exactly four tiers — Bronze, Silver, Gold, and Platinum — as approved final names (`project/DECISIONS.md` `DEC-025`).

A Price Book defines versioned market-specific package prices, currency, validity period, and applicable display or tax behaviour.

Price-book states:

- draft;
- active;
- superseded;
- retired.

Entitlement Definitions may describe concept allowance, refinement allowance, guest capacity, hosting duration, branding rights, quality, effects, language capability, or support.

Invariants:

- Packages and price books are versioned.
- Price changes create new versions.
- Historical purchases may reference retired versions.
- Display and charge currencies cannot be silently conflated.
- Unlimited AI is not a valid entitlement unless genuinely supported.

# 11. Purchase Snapshot and Event Entitlements

A Purchase Snapshot preserves:

- package identifier and version;
- price-book identifier and version;
- amount;
- currency;
- discount;
- applicable tax information;
- entitlement snapshot;
- event;
- purchasing account;
- purchase time.

An Event Entitlement is a right granted by verified purchase, upgrade, add-on, promotion, authorized support action, or migration.

Usage-based entitlements maintain:

- granted quantity;
- reserved quantity;
- consumed quantity;
- restored quantity;
- adjustments;
- effective balance;
- historical ledger entries.

Generation may reserve entitlement before provider execution to prevent concurrent double spending.

Invariants:

- Current package definitions are not purchased rights.
- Entitlements cannot be granted from a client redirect.
- Consumption cannot exceed the effective allowance.
- Failed generations follow explicit release, consumption, or restoration rules.
- Corrections require authority, reason, and audit.
- Historical ledger entries are append-only.
- A derived balance may be stored for performance.
- Guest capacity and AI usage are separate entitlements.

# 12. Generation Request

Generation types may include decorative image, invitation copy, translation, creative concept, and bounded vibe refinement.

Canonical states:

- CREATED;
- VALIDATING;
- QUEUED;
- PROCESSING;
- SUCCEEDED;
- FAILED_RETRYABLE;
- FAILED_FINAL;
- CANCELLED;
- REJECTED;
- TIMED_OUT.

A request belongs to one Event, is initiated by an authorized Account or system action, references an entitlement context, may reserve or consume entitlement, uses a provider abstraction, and produces zero or more results or assets.

Invariants:

- Requests use idempotency or equivalent duplicate protection.
- A repeated client request cannot automatically create a second paid generation.
- Success requires validated output.
- Failed output cannot become a selectable successful concept.
- Provider status maps to canonical status.
- Provider identifiers are not public authorization credentials.
- Structured Event Facts remain authoritative.
- Retries cannot double-consume entitlement or enable uncontrolled free generation.

Critical generation transitions should create structured domain events or equivalent outbox records.

# 13. Generated Results and Assets

Results record output type, validation, safety outcome, status, structured content, and error classification.

Assets may represent decorative images, copy, configurations, derived media, or previews.

Asset states:

- processing;
- ready;
- quarantined;
- rejected;
- failed;
- superseded;
- deleted under policy.

Invariants:

- Provider URLs are not assumed permanent.
- Assets inherit ownership through an Event.
- Quarantined or rejected assets cannot be published.
- Deleting a published asset requires safe replacement or unpublishing.
- Public delivery cannot expose storage credentials.

# 14. Invitation and Version

An Event has exactly one primary Invitation in MVP.

Invitation composition may reference authoritative facts, approved copy, generated assets, design configuration, language, effects, branding treatment, and RSVP configuration.

An Invitation Version preserves:

- invitation;
- version identity;
- selected source concept;
- design configuration;
- copy snapshot;
- referenced fact-set version;
- asset references;
- creation source;
- validation state;
- timestamp.

Version states:

- draft;
- previewable;
- ready to publish;
- published;
- superseded;
- invalidated.

Invariants:

- Invitation is not Event.
- Invitation Version is not Publication.
- Only a validated version may be published.
- Editable draft may differ from published version.
- Editing a draft does not silently modify the published version.
- Internal version history is preserved even though customer-facing restoration is deferred.

# 15. Publication

A Publication makes one Invitation Version guest-accessible.

It contains the Event, Invitation Version, public identifier, visibility mode, state, publication time, hosting start, hosting expiry, unpublishing time, and any suspension reason.

MVP visibility:

- anyone with the hard-to-guess link.

Access codes are P1. Individually tokenized guest invitation links are deferred.

States:

- UNPUBLISHED;
- ACTIVE;
- EXPIRED;
- UNPUBLISHED_BY_OWNER;
- SUSPENDED;
- REMOVED.

Invariants:

- One Event has at most one active primary Publication.
- One active Publication references exactly one Invitation Version.
- Publication requires verified payment and entitlement.
- Public identifiers are separate from internal Event and Invitation identifiers.
- Public identifiers are non-sequential and hard to guess.
- Hosting expiry is not data deletion.
- Unpublishing preserves payment, RSVP, entitlement, and audit history.
- Guest pages contain no third-party advertising.
- Platform attribution follows purchased entitlement.

# 16. Public Invitation Projection

The Public Invitation is a safe projection, not direct exposure of private records.

It may include display names, event date and time, venue details intended for display, approved copy, assets, instructions, RSVP form, and applicable attribution.

It excludes authentication data, private profile fields, payment details, internal notes, planner-client notes, the full guest list, prompts, provider credentials, administrative notes, audit records, and private entitlement data.

# 17. Guest Party and Party Members

Guest Party is the primary invitation and RSVP unit.

It may represent one person, a couple, household, family, or another invited group.

Conceptual attributes include Event, host-facing and guest-facing labels, optional contact information, maximum permitted attendees, RSVP status, internal notes, and creation source.

Party Members are optional named individuals.

Example: The Smith Family may be one Guest Party with a permitted size of four. It is not automatically four Guest records or four submissions.

Invariants:

- A Guest Party belongs to one Event.
- Contact information is optional.
- Maximum size cannot be negative.
- Permitted size and actual attending count are different.
- Internal notes are never public.
- Guest data cannot be used for unrelated advertising.
- Removing a party cannot silently corrupt totals.

# 18. RSVP Submission and Revision

Canonical guest-submitted responses:

- ATTENDING;
- NOT_ATTENDING.

Host-side tracking may additionally show PENDING or NO_RESPONSE, but those are not guest-submitted answers.

A submission contains Event, Guest Party, response, attendance count, respondent name, optional message, optional dietary details, timestamp, security metadata, and revision relationship.

Each Guest Party has one effective current RSVP while prior revisions remain historical.

A private Response-Management Token permits accountless updates.

Invariants:

- Guests do not require accounts.
- Closed RSVP is the default: a person must match a host-created Guest Party.
- Open RSVP may be introduced later as an explicit controlled option.
- Not attending means zero attendees.
- Attendance cannot exceed permitted size unless explicitly overridden by the host.
- Public invitation link alone cannot authorize editing a response.
- Management tokens require sufficient entropy, limited scope, safe storage, and revocation or replacement rules.
- Tokens should not be stored as recoverable plaintext when hashing satisfies the workflow.
- Duplicate handling is deterministic.
- Public endpoints never reveal the full guest list.

# 19. Payment Attempt and Transaction

A Payment Attempt represents one checkout attempt for a package, add-on, upgrade, hosting extension, or approved commercial item.

Repeated checkout attempts create distinct Payment Attempts under the relevant event purchase context.

Canonical states:

- CREATED;
- PENDING;
- SUCCEEDED;
- FAILED;
- CANCELLED;
- EXPIRED;
- REFUNDED;
- PARTIALLY_REFUNDED;
- DISPUTED;
- CHARGEBACK.

Conceptual attributes include Event, paying Account, Purchase Snapshot, expected amount and currency, canonical state, provider abstraction and references, idempotency identity, timestamps, and verification metadata.

Invariants:

- Client redirect cannot establish success.
- Trusted provider verification is required.
- Expected and verified amount and currency must match.
- Duplicate webhooks cannot duplicate entitlements.
- Historical state changes remain auditable.
- Provider states map into canonical states.
- The preferred model avoids storing sensitive card or bank credentials.

Critical financial transitions create structured domain events or equivalent outbox records.

# 20. Refund

A Refund is a full or partial reversal of a successful payment.

States may include requested, under review, submitted, pending, succeeded, failed, and cancelled.

It records Payment, amount, currency, reason, initiating source or operator, provider reference, state, and timestamps.

Invariants:

- Successful refunds cannot exceed captured amount.
- Completion requires independent verification.
- Refund does not automatically delete an Event.
- Entitlement consequences follow explicit approved rules.
- Refund actions are auditable.
- Final customer policy remains subject to official research.

# 21. Hosting Entitlement

Hosting duration is an Event Entitlement.

The hosting period begins at **first publication**, not payment.

A maximum activation window will be defined later so paid invitations cannot remain indefinitely unactivated.

Hosting records preserve source, duration, start, calculated expiry, extension history, and effective expiry.

Invariants:

- Expiry is not account deletion or guest-data deletion.
- Manual extensions require authority and audit.
- Expired Publication cannot remain active because of stale or cached state.
- Historical grants and extensions remain traceable.

# 22. Audit Event and Support Adjustment

Audit Events record actor, actor type, action, target, timestamp, required reason, safe before-and-after metadata, and correlation context.

Security, payment, refund, entitlement, and sensitive administrative audits are append-only.

Audit records never store secrets, and administrators cannot silently erase evidence of their own important actions.

Support Adjustments may restore generation allowance, extend hosting, correct capacity, unstick state, or record an external refund. Each requires authority, target, reason, before-and-after values, timestamp, and audit.

Support Adjustment cannot become a generic business-rule bypass.

# 23. Aggregate Boundaries

Recommended conceptual aggregate roots:

- Account;
- Event;
- Catalogue;
- Event Entitlement;
- Generation Request;
- Invitation;
- Publication;
- Guest Party;
- RSVP;
- Payment;
- Refund.

These boundaries do not mandate microservices or separate databases.

# 24. High-Level Relationships

- One Account has one Profile.
- One Account owns many Events.
- One Event has one current Event Facts set with traceable material history.
- One Event has one current Creative Brief.
- One Event may have one Planner Client Reference.
- One Event selects one Package Definition before generation.
- One Event may have multiple Payment Attempts.
- One successful purchase creates one Purchase Snapshot.
- One Event has multiple Event Entitlements and ledger entries.
- One Event has multiple Generation Requests.
- One Generation Request may create multiple Generated Assets.
- One Event has one primary Invitation.
- One Invitation has multiple Invitation Versions.
- One active Publication references one Invitation Version.
- One Event has at most one active primary Publication.
- One Event has many Guest Parties.
- One Guest Party may have optional Party Members.
- One Guest Party has one effective RSVP and multiple revisions.
- One successful Payment may have multiple Refund attempts within paid amount.
- Important transitions create Audit Events and, where critical, structured domain events or outbox records.

# 25. Mandatory Cross-Domain Invariants

1. Every Event has exactly one owner.
2. Identifiers alone do not grant private access.
3. Event Facts are authoritative over generated copy.
4. Package selection precedes concept generation.
5. Generation requires entitlement.
6. Retries cannot double-consume entitlement.
7. Verified payment precedes publication.
8. Client payment success is not authoritative.
9. One active Publication references one validated Invitation Version.
10. Public Invitations expose safe projections only.
11. Guests do not require accounts.
12. Public links do not authorize RSVP modification.
13. Attendance respects permitted Party size unless explicitly overridden.
14. Hosting expiry is distinct from deletion.
15. Catalogue changes do not rewrite purchase history.
16. Administrative corrections require reason and audit.
17. Provider states map to canonical states.
18. Internal identifiers are not public credentials.
19. Guest pages contain no third-party advertising.
20. Branding follows entitlements.
21. Planner status grants no administrative access.
22. Other event types remain hidden until approved.
23. Russian is deferred from MVP.
24. CSV import is not P0; CSV export is included.
25. Closed RSVP is the default.
26. Critical audit history is append-only.

# 26. Forbidden Conflations

- Account is not Profile.
- Host is not Administrator.
- Planner is not Administrator.
- Event is not Invitation.
- Event Facts are not Generated Copy.
- Creative guest estimate is not purchased Guest capacity.
- Guest Party is not individual attendee.
- Guest Party is not RSVP Submission.
- RSVP Submission is not RSVP Revision.
- Package Definition is not Purchase Snapshot.
- Entitlement Definition is not Event Entitlement.
- Payment Attempt is not successful payment.
- Client redirect is not payment verification.
- Invitation Version is not Publication.
- Public Identifier is not internal identifier.
- Hosting expiry is not data deletion.
- Provider generation state is not canonical state.
- Refund request is not successful refund.
- Unpublish is not delete.
- Archive is not delete.

# 27. Deletion, Archival, and Anonymization

Deletion is domain-specific. A single unrestricted cascade is unacceptable.

Records may be actively retained, archived, soft-deleted, anonymized, physically deleted, restricted for legal or financial retention, or removed publicly while retained privately.

Later documents must define retention categories, deletion authority, dependency handling, legal holds, backup expiry, audit preservation, and anonymization.

Events with successful payments, publications, or RSVP data require controlled archival or deletion workflows.

# 28. Time, Locale, Currency, and Identifiers

The domain distinguishes:

- event-local date and time;
- event time zone;
- system timestamp;
- user display locale;
- price-book market;
- display currency;
- charge currency;
- settlement currency;
- refund currency.

Viewing from another time zone cannot shift the intended event date.

Each major entity uses a stable internal identifier. Public resources use separate non-sequential identifiers.

Sensitive tokens require entropy, limited scope, safe storage, revocation or replacement, and must not embed personal information.

# 29. State-Transition Rules

Every important transition defines allowed source states, target state, actor, authorization, prerequisites, side effects, idempotency, audit requirement, and failure behaviour.

Invalid transitions fail explicitly.

Business state cannot be changed by arbitrary direct status edits that bypass transition rules.

# 30. Structured Domain Events

Financially or operationally critical transitions should produce domain events or equivalent transactional outbox records, even if the MVP is a modular monolith.

Examples:

- EventCreated;
- EventFactsConfirmed;
- PackageSelected;
- EntitlementGranted;
- EntitlementReserved;
- EntitlementConsumed;
- GenerationRequested;
- GenerationSucceeded;
- GenerationFailed;
- PaymentInitiated;
- PaymentVerified;
- PaymentFailed;
- InvitationPublished;
- InvitationUnpublished;
- HostingExpired;
- RsvpSubmitted;
- RsvpRevised;
- RefundSucceeded;
- EntitlementAdjusted;
- InvitationSuspended.

Minor edits do not require domain events merely for architectural purity.

# 31. Approved Owner Decisions

Approved on 16 August 2026:

1. Each MVP Event has exactly one owning Account.
2. A planner client remains a private reference, not an Account.
3. Each MVP Event has one primary Invitation.
4. Guest Party is the primary invitation and RSVP unit.
5. Party Members are optional.
6. RSVP updates preserve revision history.
7. Each Guest Party has one effective current RSVP.
8. Invitation versions are preserved internally.
9. One Event has at most one active primary Publication.
10. Hosting begins at first Publication, subject to a later maximum activation window.
11. Material Event Fact changes are historically traceable.
12. Entitlements use historical ledger entries; derived balances may be stored.
13. Repeated checkout attempts create distinct Payment Attempts.
14. Public Invitation identifiers are separate from internal identifiers.
15. Guest contact information is optional.
16. Unmatched public RSVP is disabled by default.
17. Hosts may explicitly override permitted attendance.
18. Paid, published, or RSVP-bearing Events use controlled archival or deletion.
19. Critical security, financial, entitlement, and administrative audits are append-only.
20. Critical transitions create structured domain events or equivalent outbox records.

# 32. Approval Record

**Owner Decision:** Approved  
**Approval Date:** 16 August 2026 (commercial catalogue reconciled 25 August 2026 per `DEC-025`)  
**Approved Version:** 1.1  
**Authority:** Approved source-of-truth document under the hierarchy established by docs/00_CLAUDE_RULES.md.
