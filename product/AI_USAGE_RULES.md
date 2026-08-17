# AI Usage Rules

**File:** `product/AI_USAGE_RULES.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.0  
**Approved date:** 2026-08-17  
**Depends on:** approved `docs/00_CLAUDE_RULES.md` through `docs/13_ROADMAP.md`, `product/PRICING_RULES.md`, and `product/ENTITLEMENTS.md`  
**Closely related:** `product/GUEST_RULES.md`, `product/LOCALIZATION.md`

---

## 1. Purpose

This document defines which customer actions count as AI usage, when an entitlement is reserved, consumed, released, restored, or blocked, and how the platform controls safety, quality, privacy, retries, cost, and multilingual output.

It converts the approved AI architecture and entitlement catalogue into deterministic product rules. The database is authoritative; browser counters and provider reports are not.

---

## 2. Objectives

The AI workflow must:

1. deliver useful invitation concepts without inventing event facts;
2. make consumption understandable before confirmation;
3. prevent duplicate charging for retries or internal repairs;
4. distinguish manual editing from AI-assisted work;
5. prevent unbounded cost and abuse;
6. protect personal and culturally sensitive information;
7. produce editable, validated, moderated outputs;
8. preserve a complete audit trail without logging secrets or unnecessary personal data;
9. remain provider-neutral at the product boundary;
10. fail safely when providers or validations are unavailable.

---

## 3. Approved package allowances inherited here

| Allowance | Essential | Signature | Premium |
|---|---:|---:|---:|
| Total initial AI concepts per event | 1 | 3 | 5 |
| AI refinements per event | 2 | 6 | 12 |

These figures are approved entitlement totals, not monthly quotas.

- A successful pre-payment preview concept counts toward the purchased concept total.
- Allowances belong to one event and cannot be pooled, transferred, or rolled into another event.
- Manual edits consume no AI allowance.
- Multiple internal attempts belonging to one logical request count at most once.
- Unused allowance expires under the approved entitlement lifecycle, normally 30 days after hosting expiry and subject to the first-publication, refund, deletion, suspension, and retention rules.

---

## 4. Defined usage units

### 4.1 AI concept

One **AI concept** is one owner-requested, coordinated creative result for an event. It normally includes:

- validated structured invitation copy/configuration;
- one coherent visual direction;
- at most one accepted decorative artwork/background generation where the workflow requires it;
- translations only for entitled, activated language slots requested within that same concept;
- deterministic platform rendering into preview assets.

A concept is one logical request even when the platform makes bounded internal text, image, validation, or repair attempts.

Changing the questionnaire and asking for another creative direction is a new concept. Selecting among already-generated concepts is not.

### 4.2 AI refinement

One **AI refinement** is one explicit owner-confirmed request for AI to revise an existing saved concept within supported controls.

One refinement may include multiple related instructions submitted together, such as “make the wording warmer, shorten the introduction, and use a calmer colour mood,” provided they form one bounded request.

Separate submissions are separate logical requests. Combining unrelated requests to evade limits may be rejected or split with disclosure before confirmation.

### 4.3 Image regeneration

An image regeneration replaces or materially reworks generated artwork. It is not a free manual edit.

For MVP, an owner-confirmed image regeneration made as part of a refinement consumes **one refinement unit**, not both a refinement and a hidden second unit. The UI must disclose that the request will replace artwork before confirmation.

Internal image repair caused by invalid dimensions, corrupt output, moderation uncertainty, or provider failure remains part of the original logical request and does not consume another unit.

### 4.4 Translation

Translation generated as part of the original concept for entitled active language slots is included in that concept.

Adding or regenerating an AI translation later consumes one refinement, unless the change is a platform correction for a verified defect. Manually supplied or manually edited translation consumes no AI allowance.

### 4.5 Manual edit

A manual edit changes structured fields or approved design controls without invoking a generative provider. Examples include:

- correcting names, dates, times, addresses, links, or contact details;
- directly editing title, body, footer, or translated copy;
- choosing an existing theme, font, palette, spacing, alignment, or animation option;
- cropping or positioning an already-approved asset within safe limits;
- enabling or disabling an existing language version;
- reverting to a stored version.

Manual edits consume no AI unit.

---

## 5. Preview usage

The approved preview policy permits:

- one controlled preview concept per event;
- no more than three active unpaid preview events per account;
- protected or watermarked preview presentation;
- no public publication before verified payment;
- account, rate, moderation, and abuse controls.

A preview reservation is created before expensive provider work. It is consumed only when a qualifying usable preview result is persisted.

If the owner later purchases:

- Essential has no additional initial concept after a successful preview, but retains two refinements;
- Signature has two remaining concepts after a successful preview;
- Premium has four remaining concepts after a successful preview.

Deleting an unpaid event does not restore another preview where abuse or velocity limits would be bypassed. Preview eligibility is a controlled access right, not a reusable credit.

---

## 6. Logical request lifecycle

Every concept or refinement uses a server-created logical request with a unique idempotency key.

States are normalized independently of provider terminology:

`VALIDATING → RESERVED → QUEUED → RUNNING → VALIDATING_OUTPUT → SUCCEEDED`

Terminal alternatives include:

- `REJECTED_INPUT`;
- `BLOCKED_SAFETY`;
- `FAILED_RELEASED`;
- `FAILED_REVIEW_REQUIRED`;
- `CANCELLED_RELEASED`;
- `CANCELLED_BILLED_REVIEW`;
- `SUPERSEDED`.

Only the server may transition authoritative states. Duplicate jobs, callbacks, polls, or browser submissions converge on the same logical request.

---

## 7. Reservation and consumption

The server must:

1. authenticate and authorize the owner;
2. verify event state and applicable entitlement;
3. validate and moderate inputs where possible;
4. atomically reserve one applicable unit;
5. create the logical request and job;
6. call only an approved provider/model through its adapter;
7. validate, moderate, and persist the output;
8. atomically consume or release the reservation;
9. append audit and usage-ledger entries;
10. return a safe, current status to the client.

The allowance is consumed when the result is received, structurally valid, factually constrained, moderation-approved, persisted, and usable in the product. A provider’s `success` flag alone is insufficient.

---

## 8. What consumes one unit

One unit is consumed when:

- an owner-requested concept produces a qualifying usable saved result;
- an owner-requested refinement produces a qualifying usable saved revision;
- the owner asks for a different creative direction after a usable result;
- the owner asks to regenerate acceptable artwork because of preference rather than defect;
- the owner submits a later AI translation/rewrite request;
- the owner abandons or rejects a usable result solely because of subjective preference.

The platform must not promise that every valid generation will match subjective taste. Remaining concepts, refinements, manual edits, or support routes address preference changes.

---

## 9. What does not consume another unit

No additional unit is consumed for:

- manual edits;
- selecting, previewing, saving, publishing, or reverting an existing result;
- internal schema repair within the same logical request;
- a bounded same-provider retry for a retryable technical failure;
- duplicate delivery, callback, queue message, or browser resubmission using the same idempotency key;
- deterministic rendering, responsive asset variants, or platform-controlled formatting;
- a verified platform defect correction;
- a definitively failed request released under Section 10;
- moderation performed by the platform;
- support inspection without a new generation.

---

## 10. Release and restoration rules

A reserved unit is released when no qualifying usable result exists and the final reconciled cause is:

- provider outage, capacity error, or rate limit after bounded retries;
- network or platform failure;
- invalid/corrupt provider output that bounded repair cannot fix;
- failed platform validation or asset ingestion;
- a false-positive platform safety block confirmed through review;
- cancellation before billable provider work begins;
- an internal duplicate that never becomes the authoritative result.

A timeout is ambiguous, not automatically free. The request enters reconciliation until the system confirms whether the provider completed or billed the work and whether a usable output exists.

Restoration uses an append-only compensating ledger entry. Existing consumption history is never silently rewritten or deleted.

---

## 11. Safety-block accounting

Input rejected before billable generation consumes no unit.

If a provider or platform blocks the request only after meaningful billable work:

- the customer unit is still released by default for MVP;
- provider cost is recorded as an operational/moderation cost;
- repeated or deliberate prohibited attempts may suspend AI access rather than consume paid units;
- abuse actions require stable reason codes and audit evidence.

This customer-protective default may be changed only through a new approved policy version with clear disclosure; it cannot be applied retroactively.

---

## 12. Cancellation

- Cancellation before provider dispatch releases the reservation.
- Cancellation after dispatch is best-effort.
- If a usable result completes despite cancellation, the unit may be consumed and the result retained, provided the UI warned that processing had begun.
- If final provider outcome is unknown, hold the reservation for reconciliation rather than granting repeated free attempts.
- Stuck reservations must trigger automated review and a documented maximum reconciliation period.

**Proposed default:** automatically escalate reservations unresolved for 30 minutes; release or finalize them within 24 hours unless a documented provider incident requires an audited extension.

---

## 13. Input rules

The owner may provide only data necessary for invitation creation. Inputs must be schema-bound, length-limited, normalized, and treated as untrusted.

The platform must:

- separate factual event fields from creative instructions;
- never treat user text as system/developer instruction;
- neutralize prompt-injection attempts and unsupported markup/code;
- reject executable code, arbitrary URLs, hidden instructions, and unsupported file inputs;
- minimize personal and guest data sent to providers;
- avoid sending full guest lists, RSVP answers, payment information, credentials, or private support notes;
- prevent prompts from selecting arbitrary models, endpoints, tools, or system settings.

MVP does not require user photo uploads or identity-image generation. Those features remain excluded unless separately approved with consent, biometric/privacy, moderation, storage, and deletion rules.

---

## 14. Factual integrity

Names, dates, times, venues, addresses, URLs, contact details, dress codes, RSVP deadlines, religious/cultural selections, and other event facts come from authoritative owner-controlled structured fields.

AI may style or arrange facts but must not:

- invent a missing fact;
- silently change spelling, date, time, amount, address, or URL;
- infer a venue, relationship, religion, ethnicity, caste, nationality, gender, sexuality, or title;
- translate proper names unless the owner supplies/approves a form;
- add claims about accessibility, parking, accommodation, gifts, food, alcohol, transport, or ceremony rules without source data.

Output with factual mismatch fails validation and is repaired or released under the same logical request.

The owner must review and explicitly approve the final content before first publication. Approval does not excuse a detectable platform-introduced factual mismatch.

---

## 15. Cultural and religious treatment

AI may use cultural or religious context only when the owner explicitly selects or writes it.

- Neutral treatment is the default.
- Motifs come from an allow-listed reviewed catalogue or an approved constrained prompt vocabulary.
- The system must not infer sensitive identity from names, language, location, venue, or imagery.
- Sacred text, symbols, transliterations, ritual descriptions, and honorifics require reviewed handling and must remain editable.
- Stereotypes, caricatures, disrespectful combinations, or claims of religious correctness are prohibited.
- “Fusion” concepts require explicit owner selection and must remain within reviewed combinations.

No package tier weakens these protections.

---

## 16. Content safety

Prohibited generation includes:

- sexual content involving minors or ambiguous-age persons;
- exploitative or non-consensual sexual content;
- hateful, extremist, or dehumanizing content;
- targeted harassment or credible threats;
- instructions facilitating serious wrongdoing;
- impersonation, deceptive identity use, or unauthorized likeness generation;
- graphic violence unrelated to a legitimate invitation context;
- malware, credential theft, prompt extraction, or security bypass;
- unlawful intellectual-property copying requests;
- content prohibited by applicable law or approved provider terms.

The platform may block, safely redirect, or send uncertain cases to authorized review. Moderation categories remain provider-neutral and versioned.

---

## 17. Copyright, brands, and likenesses

The owner must not request “an exact copy” of a living artist’s work, protected invitation design, trademarked character, logo, celebrity likeness, or another person’s identity without appropriate rights.

The platform should support descriptive visual attributes rather than imitation of named living artists. Provider capability does not establish permission.

Generated assets retain provider/model/version and policy metadata required for provenance and dispute review. Public ownership or exclusivity claims must not exceed the selected provider’s verified commercial terms.

---

## 18. Text output contract

Text generation returns a versioned structured object, never trusted arbitrary HTML or code.

The schema should include only approved fields such as:

- title;
- subtitle;
- invitation body;
- footer/additional note;
- structured design suggestions;
- requested activated translations;
- safe warnings or validation metadata.

Every output is checked for:

- schema validity and length;
- exact factual-field preservation;
- supported locale and script;
- prohibited markup/links;
- moderation status;
- empty, truncated, repetitive, or placeholder text;
- unsupported claims;
- rendering limits and accessibility.

One bounded schema-repair attempt is part of the original request. Additional operational attempts require policy-controlled approval but never become hidden customer consumption.

---

## 19. Image output contract

AI imagery is decorative artwork/background content. Names, dates, venue text, RSVP details, and essential accessibility information are rendered deterministically by the application.

Generated imagery must:

- contain no relied-upon factual text;
- use explicit approved dimensions/aspect ratios;
- pass safety and technical validation;
- avoid unrequested faces or identifiable persons;
- preserve adequate composition space and contrast for application-rendered text;
- be copied into platform-controlled storage before use;
- never be published from a temporary provider URL;
- carry the logical request, provider/model, prompt-template, and moderation references.

Rigid 720p/1080p/4K package promises remain prohibited until approved quality presets are validated.

---

## 20. Multilingual AI use

- English is the source/default AI governance language.
- French is the second activated output language.
- Mauritian Kreol uses locale code `mfe` and activates only after native/human quality review passes.
- Russian remains a planned global language but is not an MVP AI entitlement until separately activated and documented in `LOCALIZATION.md`.

The invitation language-slot limits remain Essential 1, Signature 2, and Premium 3 simultaneous published variants from activated languages.

AI must not translate authoritative factual fields without validation. Low-confidence or culturally sensitive text must be flagged as editable and, where necessary, require human review or use reviewed fallback copy.

Interface localization is separate from AI generation and is never consumed as an AI unit.

---

## 21. Refinement boundaries

Supported refinements may change:

- tone, warmth, formality, brevity, or storytelling style;
- approved copy fields;
- palette, layout mood, motif, typography category, or animation preset;
- existing translations;
- decorative image direction where explicitly confirmed.

Refinements may not:

- modify payment, package, entitlement, guest-capacity, publication, or hosting facts;
- execute arbitrary code or CSS;
- change authoritative event facts without a separate manual confirmation;
- access other events, users, guests, or unpublished data;
- activate an unsupported language, theme, provider, or model;
- bypass safety, cultural, validation, or accessibility rules.

If an instruction requires both ordinary copy changes and new artwork, one confirmed refinement covers the coordinated request for MVP. The platform must show that artwork replacement is included before execution.

---

## 22. Versions, selection, and rollback

- Every successful concept/refinement creates an immutable generation result and a new editable event-design version.
- The owner chooses which saved version becomes the working version.
- Switching among saved results is free.
- Reverting never restores a consumed AI unit.
- Publishing creates an immutable publication snapshot separate from later edits.
- A failed or blocked request never replaces the current working version.
- Superseded assets follow approved retention and deletion rules; they are not silently exposed publicly.

---

## 23. Provider and model governance

Production uses only providers/models approved through `docs/07_AI_ARCHITECTURE.md` and the security/privacy review.

- Product rules use provider-neutral contracts.
- Exact model identifiers and versions are pinned and recorded.
- No silent cross-provider failover is allowed.
- Same-provider bounded retry may occur under the approved retry policy.
- Model upgrades require evaluation, cost, licensing, privacy, security, cultural, and rollback evidence.
- Community or unreviewed models are disabled by default.
- Provider/model availability does not change already-granted numerical entitlements.

If safe generation is unavailable, the platform pauses that generation type and preserves existing invitations and allowances.

---

## 24. Privacy and data minimization

Before any provider is enabled, document its processing locations, retention, training/use commitments, subprocessors, deletion controls, security, contractual safeguards, and international-transfer basis.

Send only the minimum necessary fields. Never send:

- raw payment or banking data;
- credentials, tokens, secrets, session data, or security events;
- full guest lists or RSVP responses;
- unrelated owner profile/support information;
- unpublished data from another event;
- provider secrets or internal system prompts.

Prompt and output logging must use minimized structured snapshots, identifiers, hashes, or encrypted restricted storage according to the approved retention schedule.

---

## 25. Rate, abuse, and cost controls

Separate controls apply per account, event, IP/risk signal, logical request type, provider, and environment.

Controls include:

- one active generation per event by default;
- bounded account concurrency;
- preview velocity and active-event limits;
- daily provider budgets and hard circuit breakers;
- maximum prompt/input/output lengths;
- maximum provider attempts and job duration;
- anomaly detection for repeated blocks, cancellations, or account creation;
- no client-controlled model, token, dimension, or quality escalation;
- authorized emergency disablement by generation type/provider/model.

Rate limiting cannot consume entitlement without a dispatched qualifying request. Security limits are not weakened by package tier.

---

## 26. Refunds, upgrades, suspension, and deletion

- Upgrades preserve history and consumption and grant only the target entitlement delta.
- Refund effects use explicit append-only entitlement adjustments.
- A refund does not erase provider cost, usage, audit, or financial history.
- Chargeback, fraud, policy, or security suspension may block new AI use while preserving evidence and lawful customer-data rights.
- Event/account deletion follows verified deletion and retention workflows; it does not transfer unused units.
- Administrative restoration or goodwill grants require authorization, reason, evidence, and ledger entries.

---

## 27. Customer-facing disclosure

Before confirmation, the UI must clearly show:

- whether the action uses a concept or refinement;
- the applicable remaining/reserved total;
- whether new artwork will be generated/replaced;
- that a usable subjective result normally consumes the unit;
- that manual editing and selecting existing versions are free;
- current processing/cancellation status;
- safe failure or block reason and whether the reservation was released.

Do not expose raw prompts, provider security labels, fraud signals, system instructions, or sensitive operational details.

---

## 28. Support and administrative handling

Support may inspect safe metadata, request reconciliation, restore a unit through a compensating entry, or escalate moderation/quality defects.

Support must not:

- directly edit counters in the database;
- promise unlimited retries;
- bypass moderation or provider restrictions;
- expose internal prompts or other customers’ data;
- fabricate a provider failure to grant entitlement;
- delete the original usage record.

Production adjustments require the authorization level approved in the entitlement and security documents.

---

## 29. Audit record

For every logical request record at minimum:

- event/account identifiers;
- request and idempotency identifiers;
- request type and entitlement unit;
- reservation, consumption, release, and restoration ledger references;
- input snapshot/version references;
- provider/model/version and provider request identifier;
- prompt-template, schema, moderation-policy, and locale versions;
- attempt count, timestamps, latency, and normalized outcome;
- validation/moderation reason codes;
- persisted result/asset/version references;
- cost/usage metadata where returned;
- actor/admin adjustment references.

Never log secrets, raw credentials, full payment data, unnecessary guest data, or unrestricted provider payloads.

---

## 30. Monitoring and reconciliation

Monitor:

- success, validation failure, moderation block, retry, timeout, and release rates;
- reservation age and stuck jobs;
- concepts/refinements consumed by tier;
- provider cost per usable result and event;
- preview conversion and abuse;
- language-specific quality failures;
- factual mismatch and support-restoration rates;
- queue and provider latency percentiles;
- duplicate/idempotency conflict rate;
- budget threshold and circuit-breaker events.

Reconcile internal requests and costs against provider records. Differences create incidents or review tasks; they do not authorize silent counter edits.

---

## 31. Testing requirements

Tests must cover:

- exact 1/3/5 concept and 2/6/12 refinement enforcement;
- preview conversion into every package;
- atomic reservations under concurrency;
- duplicate request/job/webhook idempotency;
- retries and schema repair counting once;
- timeout and late-provider-success reconciliation;
- safety block before and after dispatch;
- cancellation timing;
- manual edits consuming zero;
- image-regeneration disclosure and counting;
- upgrade deltas, refunds, suspensions, expiry, and admin restoration;
- factual-field mutation detection;
- prompt injection and arbitrary URL/code rejection;
- English, French, and reviewed `mfe` schemas and rendering;
- unsupported Russian generation rejection until activation;
- cultural non-inference and motif allow-listing;
- provider/model pinning and cross-provider failover prevention;
- logs/telemetry containing no prohibited sensitive data;
- budget and rate-limit circuit breakers.

---

## 32. Production activation gates

AI generation remains disabled in production until:

1. provider/model contracts and commercial-use terms are verified;
2. privacy, security, processing-location, retention, and transfer reviews pass;
3. text/image quality and cultural benchmarks pass;
4. factual-preservation and moderation evaluations pass;
5. cost per usable result supports the approved pricing margin gates;
6. reservation, idempotency, retry, reconciliation, and ledger tests pass;
7. monitoring, budgets, incident runbooks, and emergency disablement work;
8. customer disclosures and support procedures are approved;
9. each advertised language passes its own quality gate;
10. rollback and existing-invitation continuity are verified.

---

## 33. Explicitly excluded from MVP

- unlimited or “fair-use unlimited” AI generation;
- monthly AI credits or a transferable account wallet;
- per-guest AI messages;
- autonomous publication;
- AI-generated factual event data;
- arbitrary chat capable of changing system state;
- arbitrary HTML, CSS, JavaScript, tool calls, or URLs from AI;
- user likeness/identity generation;
- AI music or video generation;
- silent cross-provider failover;
- Russian AI generation before activation;
- unreviewed cultural inference;
- exact-copy or exclusivity guarantees;
- premium-only relaxation of safety, privacy, or accessibility.

---

## 34. Approved owner decisions

### Decision 1 — Concept definition

**Approved:** Count one coordinated initial creative result—validated copy/configuration plus at most one required decorative artwork generation and entitled requested translations—as one concept logical request.

### Decision 2 — Refinement definition

**Approved:** Count one owner-confirmed bounded revision submission as one refinement, even when it contains several related instructions; separate submissions count separately.

### Decision 3 — Image regeneration accounting

**Approved:** Count an owner-requested artwork regeneration as one refinement, not a hidden additional unit, and disclose artwork replacement before confirmation.

### Decision 4 — Translation accounting

**Approved:** Include requested entitled translations in the initial concept; count later AI translation/regeneration as one refinement; keep manual translations free of AI consumption.

### Decision 5 — Preview conversion

**Approved:** Preserve the approved rule that a successful preview counts toward the purchased 1/3/5 total, leaving 0/2/4 initial concepts after purchase for Essential/Signature/Premium.

### Decision 6 — Usable-result threshold

**Approved:** Consume only after output is received, structurally valid, factually constrained, moderation-approved, persisted, and usable; provider success alone does not qualify.

### Decision 7 — Subjective rejection

**Approved:** Consume a unit when a qualifying usable result is rejected only for preference; use remaining allowance, manual edits, or support rather than unlimited free regeneration.

### Decision 8 — Internal attempts

**Approved:** Treat bounded retries, schema repair, duplicate callbacks/jobs, validation repair, and technical asset repair as part of the original logical request with no additional customer consumption.

### Decision 9 — Safety blocks

**Approved:** Release the customer unit for all blocked MVP requests, including blocks after billable work; treat repeated deliberate prohibited attempts through suspension/abuse controls rather than forfeiting paid units.

### Decision 10 — Timeout reconciliation

**Approved:** Hold ambiguous timeouts for reconciliation, escalate after 30 minutes, and normally finalize or release within 24 hours, with audited extensions only during documented provider incidents.

### Decision 11 — Cancellation

**Approved:** Release before provider dispatch; after dispatch make cancellation best-effort and consume only if a qualifying usable result completes, subject to clear processing disclosure.

### Decision 12 — Factual authority

**Approved:** Make owner-controlled structured event fields authoritative and require repair/release for detectable AI mutations; never allow AI to invent or silently correct missing facts.

### Decision 13 — Cultural context

**Approved:** Use only explicitly selected/written cultural or religious context, reviewed motifs, neutral defaults, and no inference from names, language, venue, location, or imagery.

### Decision 14 — Image scope

**Approved:** Restrict MVP image AI to decorative artwork/backgrounds; render essential names, dates, venue, and RSVP information deterministically in the application.

### Decision 15 — Language scope

**Approved:** Govern AI in English first, French second, activate Mauritian Kreol (`mfe`) only after human quality gates, and defer Russian AI generation until separately activated.

### Decision 16 — Provider behavior

**Approved:** Pin approved provider/model versions, permit bounded same-provider retry, prohibit silent cross-provider failover, and pause safely without removing existing invitations.

### Decision 17 — Data minimization

**Approved:** Send only necessary event/design data to AI providers and prohibit guest lists/RSVPs, payment data, credentials, unrelated profile/support data, and other-event data.

### Decision 18 — Concurrency and cost control

**Approved:** Default to one active AI request per event, enforce account/provider/budget limits, and allow emergency disablement without altering granted entitlements or published invitations.

### Decision 19 — Administrative restoration

**Approved:** Permit support/admin restoration only through authorized, reasoned, evidenced compensating ledger entries; prohibit direct counter edits and deletion of original usage history.

### Decision 20 — Activation gates

**Approved:** Keep each AI capability/language disabled until provider, privacy, security, licensing, quality, cultural, cost, moderation, factual-integrity, testing, monitoring, support, and rollback gates pass.

---

## 35. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.0.  
**Approved date:** 2026-08-17.  
**Owner decisions:** Decisions 1–20 approved as proposed.
