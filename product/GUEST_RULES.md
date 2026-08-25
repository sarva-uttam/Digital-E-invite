# Guest Rules

**File:** `product/GUEST_RULES.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.1  
**Approved date:** 2026-08-17 (capacity table reconciled 2026-08-25 to the four-tier structure per `DEC-025`/`DEC-026`)  
**Depends on:** approved `docs/00_CLAUDE_RULES.md` through `docs/13_ROADMAP.md`, `product/PRICING_RULES.md`, `product/ENTITLEMENTS.md`, `product/AI_USAGE_RULES.md`, and `project/DECISIONS.md` (DEC-025, DEC-026)  
**Closely related:** `product/LOCALIZATION.md`

---

## 1. Purpose

This document defines how invitees, invitation parties, plus-ones, children, contact details, invitation links, RSVP responses, imports, exports, capacity, privacy, and lifecycle operations behave.

Its purpose is to make guest handling predictable, secure, understandable to hosts and invitees, and consistent with the approved package entitlements.

---

## 2. Core principles

1. A guest does not need an account to view an invitation or submit an RSVP.
2. Public knowledge of an invitation URL must not reveal the host’s guest list.
3. Capacity is enforced server-side using explicit person records, not browser counters.
4. A household or invitation party may share one access link while each invited person counts individually.
5. Host-owned guest data is private by default and used only for the event workflow and approved operations.
6. RSVP changes are auditable and never silently overwrite history.
7. Deletion, imports, duplicates, refunds, expiry, and upgrades must not corrupt capacity accounting.
8. Security, privacy, accessibility, and ordinary RSVP functionality do not vary by package.

---

## 3. Terminology

### 3.1 Host

The authenticated owner or authorized collaborator managing an event. MVP collaborator roles remain limited to what the approved architecture permits.

### 3.2 Invitation party

An **invitation party** is the delivery and RSVP unit that receives one private access link. It may represent:

- one individual;
- a couple;
- a household/family;
- a named group invited together.

The party is not itself a person and does not consume capacity.

### 3.3 Guest member

A **guest member** is one invited person within a party. Every active guest member consumes one included-capacity place, including named adults, named children, unnamed permitted plus-ones, and reserved child places.

### 3.4 Party contact

The party contact is the person/contact channel used for delivery or coordination. A party may have no digital contact when the host shares the link manually.

### 3.5 Plus-one place

A plus-one place is an owner-authorized unnamed person slot attached to a party. It consumes capacity immediately when created, even before the invitee supplies a name or attendance response.

### 3.6 RSVP

An RSVP is the latest effective response for a party/member plus its append-only change history.

---

## 4. Package capacity

| Package | Included active guest-member capacity |
|---|---:|
| Bronze | 75 persons |
| Silver | 150 persons |
| Gold | 300 persons |
| Platinum | 750 persons |

Capacity is event-specific and not transferable between events (`project/DECISIONS.md` `DEC-025`). Additional capacity beyond the included amount is available on every tier as an explicit, confirmed MUR 15/guest add-on (`DEC-026`) — never an automatic or silent overage charge. An **active invited person** is one individual guest currently counted toward capacity; a family of four counts as four people even when they share one private party link (`DEC-025`).

The following each consume one place while active:

- a named invited adult;
- a named invited child;
- an unnamed authorized plus-one place;
- an unnamed child place deliberately reserved by the host.

The following consume no place:

- the invitation-party container;
- a party contact who is not invited and has no guest-member record;
- an internal host note;
- a declined response beyond the active record itself;
- a rejected/invalid import row that was never inserted;
- a soft-deleted member after the approved capacity-release rule takes effect.

---

## 5. Capacity source of truth

The authoritative count is the number of active capacity-consuming guest-member records plus active unnamed places for the event.

- Browser totals are informational only.
- A CSV row does not establish capacity until validated and committed.
- RSVP attendance does not determine invitation capacity.
- Declining does not automatically free a place.
- Removing a person through the explicit host action may free capacity while preserving audit history.
- Capacity checks and writes must be atomic under concurrency.
- At the limit, existing guests and responses remain accessible; only net-new capacity-consuming actions are blocked.

---

## 6. Why declined guests do not automatically free capacity

Invitation capacity measures people the host has chosen to manage and invite, not only confirmed attendance.

Automatically freeing a place on decline would allow unlimited sequential invitations, confuse audit/history, and let a later response reversal exceed the package limit.

The host may explicitly remove a declined guest to free the place. Removal revokes that member’s active invitation rights but preserves the minimum audit record required for integrity and lawful operations.

---

## 7. Creating an invitation party

A host may create a party manually by providing:

- party display label;
- one or more guest members;
- optional email and/or telephone/WhatsApp contact;
- optional language preference;
- optional private host notes;
- optional authorized plus-one or child places;
- invitation delivery state.

At least one capacity-consuming member/place is required before a party can be invited. Empty draft parties may exist temporarily but cannot receive an active access link and should expire or be cleaned up safely.

The server validates capacity, field lengths, normalization, duplicates, and authorization before committing the party.

---

## 8. Names and display

- Guest names are stored as entered by the host or guest, with safe normalization for matching/search.
- The system must not assume Western first-name/last-name structure.
- Display names may contain Unicode and culturally appropriate punctuation within safe limits.
- The invitation page shows only the names belonging to the authenticated invitation party where personalization is enabled.
- Guest names never appear in public page metadata, social previews, sitemap entries, analytics URLs, or search indexing.
- The host can correct names without consuming AI allowance.

---

## 9. Plus-ones and children

The host controls whether a party may add a plus-one or child details.

- No guest may add people beyond the places granted to the party.
- Each granted unnamed place consumes event capacity at grant time.
- A guest naming a granted plus-one converts the placeholder into a named member without increasing capacity.
- A guest cannot transfer a granted place to another party.
- Child attendance can be recorded without collecting an unnecessary email or telephone number.
- Age, date of birth, or sensitive child information is not collected for MVP.
- If event-specific age categories are later needed, they require privacy review and a versioned rule.

---

## 10. Invitation access links

Each active party receives a cryptographically random, unguessable access token represented through a private invitation URL.

- Store only a secure hash of the token where technically practical.
- Tokens must have sufficient entropy and must not contain guest names, emails, phone numbers, sequential IDs, package data, or event secrets.
- Tokens are scoped to one event and one party.
- The public event slug alone never grants access to another party’s personalization or RSVP form.
- Tokens must not be logged in analytics, referrer data, error messages, support screenshots, or ordinary audit payloads.
- Invitation pages use appropriate `noindex` and cache/privacy controls.
- Sensitive token-bearing URLs must avoid third-party scripts that could receive the full URL.

Possession of a valid link authorizes the holder to view and respond only for that party. It does not create a general account or expose other parties.

---

## 11. Link sharing and household use

One party link may intentionally be shared among members of that household/party. The product must explain that anyone with the link may view or change that party’s RSVP unless an additional verification feature is enabled later.

For MVP:

- no mandatory guest account;
- no mandatory email/SMS one-time password;
- no assumption that one device equals one person;
- party members can submit one coordinated response;
- the latest effective response is displayed with confirmation.

For higher-risk events, optional verification may be added later, but it must not be promised until delivery channels, cost, accessibility, recovery, and privacy are approved.

---

## 12. Link revocation and regeneration

The host may regenerate a party link when it is lost, shared incorrectly, or suspected compromised.

- Regeneration revokes the prior token immediately for future use.
- Existing party, member, RSVP, delivery, and audit records remain.
- A revoked link returns a neutral invalid/expired response without revealing whether the guest exists.
- Regeneration is rate-limited and audited.
- Support must not reveal a token; it may guide an authorized host to regenerate it.

Removing the party or event also revokes active access according to the lifecycle rules.

---

## 13. RSVP statuses

MVP member attendance statuses are:

- `PENDING` — no effective answer;
- `ATTENDING`;
- `NOT_ATTENDING`.

Party-level display totals are derived from member responses.

The system may show `PARTIAL` when members within the same party have different statuses, but `PARTIAL` is derived and not stored as a replacement for member answers.

“Maybe” is excluded from MVP to keep planning totals clear. The host may contact uncertain guests and guests may change their response before the deadline or host lock.

---

## 14. RSVP submission

An RSVP submission may include:

- attendance per authorized member/place;
- supplied name for an authorized unnamed place;
- optional short guest message;
- explicit response-language selection;
- required privacy/processing notice acknowledgement where legally necessary.

It must not allow the guest to edit authoritative event information, add unauthorized members, see host notes, change package rights, or access other parties.

On submission, the server:

1. validates the token and event/party state;
2. validates member/place scope and deadline/lock state;
3. rate-limits and applies abuse controls;
4. writes the new effective response transactionally;
5. appends response-history entries;
6. returns a safe confirmation and current party response.

---

## 15. Response changes and deadlines

Guests may change their responses while:

- the invitation is published and hosted;
- the party link is active;
- the RSVP deadline has not passed; and
- the host has not explicitly locked responses.

**Proposed default:** if the host provides no RSVP deadline, responses remain editable until hosting expiry or manual lock.

After deadline/lock:

- guests see the current recorded response;
- self-service changes are blocked;
- the host may update the response with an audited source/reason;
- the page offers host-approved contact guidance where configured.

Changing a deadline does not erase response history.

---

## 16. Host-entered responses

The host may record or correct an RSVP received by telephone, WhatsApp, in person, or another channel.

The record must distinguish:

- guest-submitted response;
- host-entered response;
- authorized administrative correction.

Host updates require an optional source and a reason when overriding an existing guest response. The guest link subsequently displays the latest effective state.

No tier restricts this ordinary guest-management function.

---

## 17. Guest messages and special requests

MVP may support one optional short free-text message per party response.

- The field is length-limited, treated as untrusted, escaped, and never rendered as HTML.
- The UI must warn guests not to submit medical, financial, identity-document, or other highly sensitive information.
- Structured meal choices, allergies, accessibility needs, song requests, travel details, gifts, and accommodation workflows are deferred unless separately approved.
- Hosts must not use the generic message field as a disguised mandatory sensitive-data form.

If dietary/allergy collection is introduced, it requires a dedicated purpose, minimization, access, retention, and safety design; it must not imply medical suitability guarantees.

---

## 18. Contact information

Email and telephone/WhatsApp fields are optional unless a selected delivery action requires them.

- Store normalized values for matching/delivery and preserve a safe display form.
- International telephone numbers must support country codes; do not assume Mauritius-only numbers.
- Never infer country, language, religion, or nationality solely from a number/domain.
- Contact details are private to authorized event management and approved delivery processors.
- Contact data is not sold, used for unrelated marketing, or added to platform marketing lists without separate valid consent.
- A guest can RSVP through a valid shared link without providing new contact information.

---

## 19. Delivery and sharing

MVP guarantees generation of a private link and supports host-led sharing through device/app share actions, copy link, and QR where approved.

Direct platform-sent email, SMS, or WhatsApp messages activate only after provider, consent/lawful-basis, template, opt-out, cost, delivery, abuse, and security review.

- Opening a share intent is not proof of delivery.
- A copied link is not recorded as delivered unless the host marks it or an approved provider confirms delivery.
- Read/open tracking is excluded by default because it is unreliable and privacy-sensitive.
- WhatsApp availability must not be described as an official API integration when the product only opens a share action.
- QR codes encode the same party token rules and must be handled as private credentials.

---

## 20. Delivery states

Normalized delivery states are:

- `NOT_SENT`;
- `SHARED_BY_HOST`;
- `QUEUED` (only for platform delivery);
- `SENT`;
- `DELIVERED` (only with verified provider evidence);
- `FAILED`;
- `BOUNCED`;
- `REVOKED`.

The UI must distinguish host-reported sharing from provider-confirmed delivery. No state may claim that the human recipient read the invitation unless a separately approved mechanism genuinely supports that statement.

---

## 21. CSV import

CSV import is available to every paid tier within capacity.

The import flow must:

1. provide a downloadable UTF-8 template;
2. accept only approved file type and bounded size/row count;
3. scan/validate before persistence;
4. map explicit columns rather than guess silently;
5. show a preview with valid, warning, duplicate, and rejected rows;
6. calculate net-new capacity before confirmation;
7. require host confirmation;
8. commit atomically or produce a clear partial-import result under an approved transaction design;
9. return an exportable error report without exposing secrets;
10. delete temporary source files promptly under the retention rule.

No formula or macro execution is allowed. Cells beginning with spreadsheet formula characters must be neutralized in later exports.

---

## 22. Proposed CSV fields

The MVP template should support:

- `party_label`;
- `member_name`;
- `email`;
- `phone`;
- `preferred_language`;
- `plus_one_places`;
- `child_places`;
- `host_note`.

One row represents one named member. Rows sharing a validated `party_label` plus explicit grouping key may be grouped during preview. Because labels can collide, the importer must show the proposed grouping and require confirmation.

Blank rows, unknown columns, invalid counts, excessive lengths, and unsupported locales produce explicit warnings/errors rather than silent data loss.

---

## 23. Duplicate handling

Potential duplicates are warnings, not automatic deletions.

Matching signals may include normalized email, normalized phone, exact/near name within the same proposed party, and repeated import identifiers. Names alone are not sufficiently reliable for automatic merging.

The host may:

- keep both;
- merge after reviewing the consequences;
- skip the incoming record;
- update selected fields of the existing record.

Merging must preserve response and audit history, choose one active link/party deliberately, and never reduce/increase capacity incorrectly.

---

## 24. Export

Authorized hosts may export their event’s guest data as UTF-8 CSV.

- Export respects current authorization and event scope.
- It includes only documented guest/RSVP fields, not token hashes, internal security/fraud data, provider payloads, or unrelated audit records.
- Spreadsheet-formula injection is neutralized.
- The export is generated through an authenticated, short-lived download and is not stored at a public URL.
- Export actions are audited.
- The UI warns that downloaded files become the host’s responsibility to protect.

---

## 25. Removal, archive, and restoration

The host may remove a member or party through an explicit action.

- Removal revokes active invitation access for the removed scope.
- Removed members stop consuming capacity once the transaction completes.
- Historical response/delivery/audit records are retained or minimized according to the approved retention/legal rules.
- Removal is not the same as a guest data-erasure request.
- Restoration is allowed only if capacity remains and the retention window still contains the record.
- Restoration never silently reactivates a previously compromised token; regenerate where necessary.

Bulk removal requires confirmation and a clear affected-person count.

---

## 26. Event expiry and publication state

- Draft/unpaid events may store guests but cannot activate public party links before verified payment/publication rights.
- Unpublishing temporarily prevents public access without deleting guests or responses.
- Republish within active hosting restores valid non-revoked links.
- Hosting expiry makes invitation/RSVP access unavailable while preserving data for the approved retention/export period.
- Hosting extension restores eligible access without resetting tokens, responses, or capacity unless security requires regeneration.
- Refund, chargeback, suspension, or deletion effects follow approved entitlement/security rules.

---

## 27. Privacy notice and lawful handling

Before production, qualified Mauritius privacy/legal review must confirm the roles, lawful bases, notices, rights handling, retention, processors, and international transfers under applicable law.

At minimum:

- the host sees a clear responsibility notice before importing/adding guests;
- the guest invitation displays a concise privacy notice and access to full terms;
- purpose is limited to invitation delivery, RSVP, event coordination, security, support, and lawful operations;
- platform marketing requires separate valid consent and is never bundled with RSVP;
- guest data is not publicly searchable or sold;
- processors receive only necessary data under approved contracts;
- rights requests use verified workflows that prevent one link-holder from deleting another person’s data improperly.

---

## 28. Guest rights requests

Because guests may be accountless and party links may be shared, identity/authority must be verified proportionately before access, correction, deletion, restriction, or objection requests are fulfilled.

The workflow must:

- avoid demanding excessive identity documents;
- distinguish the requester from other members of a shared party;
- involve the host where legally appropriate;
- preserve financial, security, dispute, and audit records where lawfully required;
- propagate approved actions to processors;
- document decisions and response timing;
- provide an escalation route.

Exact statutory deadlines and exceptions must be confirmed from current official Mauritius sources and counsel before launch.

---

## 29. Retention

Guest operational data is retained only for a documented period needed for the event, export/recovery, disputes, security, and legal obligations.

**Proposed product default:**

- full guest-management access during active hosting;
- host export/recovery access for 30 days after hosting expiry;
- automatic deletion or irreversible minimization of ordinary guest contact/RSVP data after that window, unless hosting is extended or a documented legal/security hold applies;
- temporary CSV source files deleted within 24 hours after a completed/failed import;
- token values never retained in plaintext where secure hashing is practical;
- backups age out under the approved backup schedule rather than being selectively edited unsafely.

The final schedule requires legal/privacy approval and must be reflected in customer notices.

---

## 30. Security and abuse protection

Controls include:

- unguessable scoped tokens and constant-time hash comparison where applicable;
- rate limits for token lookup, RSVP writes, regeneration, imports, and exports;
- neutral invalid/expired responses;
- CSRF protections appropriate to the token/session design;
- input validation, output escaping, and no arbitrary HTML;
- authorization on every host action;
- audit logs and suspicious-access monitoring;
- prevention of token leakage through logs, analytics, referrers, caches, and third-party scripts;
- encrypted transport and managed encryption at rest;
- secure file validation and spreadsheet-injection defenses;
- incident-driven token revocation and recovery.

No architecture can guarantee zero attacks; production must prevent, detect, contain, recover, and continuously improve.

---

## 31. Accessibility and localization

- RSVP works by keyboard and assistive technology.
- Status is not conveyed by colour alone.
- Forms use clear labels, errors, focus management, and sufficient contrast.
- Dates/times display with timezone clarity and locale-aware formatting.
- Guest-facing UI follows the active interface locales in `LOCALIZATION.md` and is not package-restricted.
- Party-preferred language may choose an available invitation variant but cannot activate an unsupported or non-entitled content slot.
- Names and free text support Unicode safely.

---

## 32. Host dashboard totals

The dashboard must distinguish:

- active invited persons;
- capacity remaining;
- pending persons;
- attending persons;
- not-attending persons;
- parties with partial responses;
- unnamed reserved places;
- removed/archived persons (separate historical view);
- delivery states where available.

Totals derive from member records, not party count. A declined member still appears in the active invited-person count until explicitly removed.

---

## 33. Notifications

MVP may show in-app dashboard updates without promising real-time push delivery.

Host email/SMS/WhatsApp notifications for every RSVP are deferred until:

- the communication provider and cost are approved;
- notification preferences and batching exist;
- abuse and deliverability controls pass;
- privacy and message-content minimization are reviewed.

Guest confirmation appears on-screen. Optional confirmation messages activate only through approved delivery channels.

---

## 34. Audit requirements

Audit significant actions using safe identifiers and reason codes:

- party/member creation, update, removal, restoration, and merge;
- capacity grant/release;
- token issuance, revocation, and regeneration without recording raw token;
- RSVP submission/override and effective-state change;
- deadline/lock changes;
- imports, exports, delivery attempts, and failures;
- privacy request decisions;
- administrative access and correction.

Do not include full guest lists, raw tokens, sensitive message content, or contact details in general application logs.

---

## 35. Testing requirements

Tests must cover:

- exact 75/150/300/750 person enforcement plus MUR 15/guest add-on capacity purchases;
- party containers consuming zero and every member/place consuming one;
- atomic concurrent additions at the limit;
- declined guests not automatically freeing capacity;
- explicit removal/recovery and upgrade capacity;
- plus-one/child placeholder conversion without double counting;
- token entropy, hashing, scoping, revocation, leakage prevention, and neutral errors;
- accountless RSVP and shared-party link behavior;
- unauthorized member additions and cross-party access rejection;
- member-level statuses and derived partial party status;
- deadline, lock, unpublish, expiry, extension, refund, and suspension states;
- host overrides and complete history;
- CSV validation, grouping, duplicates, formulas, Unicode, limits, and temp deletion;
- secure exports and spreadsheet neutralization;
- privacy/deletion request authorization for shared parties;
- retention/minimization jobs and legal holds;
- accessibility and English/French/`mfe` rendering;
- rate limits and abuse monitoring.

---

## 36. Explicitly excluded from MVP

- guest accounts as a requirement;
- public guest directories or social graphs;
- open self-registration onto an event;
- unlimited plus-ones;
- automatic capacity overages or charges;
- “maybe” attendance status;
- seating charts/table planning;
- meal, allergy, medical, accessibility, travel, hotel, gift, or transport workflows;
- ticketing, check-in, badges, or identity verification;
- per-guest AI messages;
- read/open surveillance;
- mandatory email/SMS OTP;
- contact marketing without separate valid consent;
- user-uploaded attachments through RSVP;
- public CSV/export links;
- claims of official WhatsApp delivery without a verified integration.

---

## 37. Approved owner decisions

### Decision 1 — Capacity unit

**Approved:** Count every active invited person/place individually; invitation-party containers consume zero capacity.

### Decision 2 — Party model

**Approved:** Use one private party link for an individual, couple, household, family, or named group while retaining member-level attendance.

### Decision 3 — Plus-ones and children

**Approved:** Require host authorization for each unnamed plus-one/child place and consume capacity when the place is granted, not when later named or accepted.

### Decision 4 — Declined capacity

**Approved:** Do not automatically free capacity when someone declines; free it only through explicit removal so reversals and sequential invitations cannot exceed the package.

### Decision 5 — At-limit behavior

**Approved:** Block only net-new capacity-consuming actions at the limit; never block access to existing guests, RSVPs, correction, removal, or export.

### Decision 6 — Guest authentication

**Approved:** Require no guest account or OTP for MVP; authorize a party through a cryptographically random scoped link and clearly explain shared-link authority.

### Decision 7 — Token handling

**Approved:** Use unguessable tokens, store secure hashes where practical, exclude personal data from URLs, prevent leakage, and support immediate audited regeneration/revocation.

### Decision 8 — RSVP statuses

**Approved:** Store member-level `PENDING`, `ATTENDING`, and `NOT_ATTENDING`; derive party `PARTIAL`; exclude “maybe” from MVP.

### Decision 9 — RSVP editing

**Approved:** Allow self-service changes until the configured deadline or host lock; without a deadline, allow changes until hosting expiry/manual lock.

### Decision 10 — Host overrides

**Approved:** Allow audited host entry/correction of responses received elsewhere, distinguish the source, and require a reason when overriding an existing guest response.

### Decision 11 — Guest message

**Approved:** Allow one optional bounded plain-text party message with warnings against sensitive information; defer structured dietary/medical and other special-request workflows.

### Decision 12 — Contact requirements

**Approved:** Keep email and telephone/WhatsApp optional unless a selected delivery action requires them; allow RSVP through a valid link without collecting new contact data.

### Decision 13 — Delivery scope

**Approved:** Guarantee private-link, copy/share-intent, and approved QR sharing for MVP; activate direct platform email/SMS/WhatsApp only after separate provider, legal, cost, consent, and abuse review.

### Decision 14 — Open tracking

**Approved:** Exclude read/open tracking by default and never treat a share intent or sent state as proof that the human recipient read the invitation.

### Decision 15 — CSV import

**Approved:** Provide every paid tier a bounded UTF-8 preview-and-confirm CSV import with explicit mapping, validation, grouping, duplicate warnings, capacity calculation, and temporary-file deletion.

### Decision 16 — Duplicate handling

**Approved:** Never auto-merge based on name alone; show possible duplicates and require the host to keep, merge, skip, or selectively update them.

### Decision 17 — Export

**Approved:** Provide authenticated short-lived UTF-8 CSV exports with documented fields, formula neutralization, no tokens/security data, audit logging, and a host-protection warning.

### Decision 18 — Retention

**Approved:** Provide full access during hosting and 30 days of post-expiry export/recovery, then delete/minimize ordinary guest contact and RSVP data unless extension or documented hold applies; finalize after legal review.

### Decision 19 — Privacy use

**Approved:** Restrict guest data to invitation, RSVP, event coordination, security, support, and lawful operations; prohibit sale or unrelated marketing without separate valid consent.

### Decision 20 — Deferred guest features

**Approved:** Defer seating, meals/allergies, travel, accommodation, gifts, ticketing/check-in, identity verification, per-guest AI, attachments, and mandatory guest accounts/OTP from MVP.

---

## 38. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.1.  
**Approved date:** 2026-08-17 (capacity table reconciled 2026-08-25 per `DEC-025`/`DEC-026`).  
**Owner decisions:** Decisions 1–20 approved as proposed.
