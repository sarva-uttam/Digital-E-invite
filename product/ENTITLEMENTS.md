# Entitlements

**File:** `product/ENTITLEMENTS.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.1  
**Approved date:** 2026-08-17 (catalogue reconciled 2026-08-25 to the four-tier Bronze/Silver/Gold/Platinum structure per `project/DECISIONS.md` `DEC-025`, `DEC-026`)  
**Depends on:** approved `docs/00_CLAUDE_RULES.md` through `docs/13_ROADMAP.md`, `product/PRICING_RULES.md`, and `project/DECISIONS.md` (DEC-025, DEC-026)  
**Closely related:** `product/AI_USAGE_RULES.md`, `product/GUEST_RULES.md`, `product/LOCALIZATION.md`

---

## 1. Purpose

This document defines what an owner may do with an event before and after verified payment, how package rights are granted and consumed, and how upgrades, add-ons, refunds, expiry, retries, and administrative adjustments affect those rights.

Entitlements are enforceable server-side commercial rights. They are not UI labels, payment-provider metadata, or assumptions inferred from a package name.

---

## 2. Core principles

1. Entitlements belong to one event, not to a reusable account wallet.
2. Verified server-side payment grants paid entitlements exactly once.
3. Preview access before payment is limited, revocable, and distinct from paid entitlement.
4. Every tier delivers a complete invitation, publishing, sharing, guest-management, and RSVP outcome.
5. Security, privacy, accessibility, factual accuracy, payment integrity, and ordinary support safety are never premium-only.
6. Consumption, grant, reversal, expiry, and adjustment history is append-only and auditable.
7. The database—not the browser, queue, payment redirect, or AI provider—is authoritative.
8. Limits are disclosed before purchase and enforced consistently.
9. Failure that produces no usable outcome must not silently consume entitlement.
10. No package advertises unlimited AI or permanent hosting.

---

## 3. Entitlement terminology

- **Entitlement definition:** versioned rule describing a commercial right or limit.
- **Grant:** append-only issuance of entitlement to an event.
- **Consumption:** append-only use of a consumable unit.
- **Reservation:** temporary hold while asynchronous work is attempted.
- **Release:** return of an unused/failed reservation.
- **Adjustment:** audited administrative addition or subtraction with reason.
- **Reversal:** explicit counter-entry caused by refund, chargeback, correction, or invalid grant.
- **Balance:** derived available amount from valid grants minus consumption/reservations/reversals/expiry.
- **Boolean entitlement:** capability that is enabled or disabled.
- **Quantity entitlement:** count or capacity ceiling.
- **Duration entitlement:** time-bounded right, such as public hosting.
- **Catalogue version:** immutable package-to-entitlement mapping.
- **Preview access:** unpaid permission to create a controlled preview; it is not a paid grant.

---

## 4. Entitlement scopes

Every definition states its scope:

- **Event:** usable only by one event; default for all MVP commercial rights.
- **Invitation:** applies to the one invitation aggregate within the event.
- **Publication:** applies to the public hosting interval.
- **Generation:** applies to one AI request/reservation lifecycle.

MVP has no transferable account balance, pooled planner credits, organization wallet, guest-owned entitlement, or cross-event carryover.

---

## 5. Package catalogue

The following is the owner-approved entitlement catalogue (`DEC-025`), subject to the cost/quality gates in `product/PRICING_RULES.md`.

| Capability | Bronze | Silver | Gold | Platinum |
|---|---:|---:|---:|---:|
| Complete wedding invitation workflow | Yes | Yes | Yes | Yes |
| Initial AI concept allowance | 1 | 2 | 3 | 5 |
| AI refinement allowance | 2 | 4 | 8 | 12 |
| Included invitee capacity | 75 | 150 | 300 | 750 |
| Public hosting from first publication | 90 days | 180 days | 365 days | 545 days |
| Simultaneously published invitation languages | 1 | 2 | 3 | 4 |
| Core reviewed themes | Yes | Yes | Yes | Yes |
| Expanded reviewed themes/motifs | No | Yes | Yes | Yes |
| Premium reviewed themes/motifs and premium motion | No | No | Yes | Yes |
| Named-guest personalization and bespoke premium elements | No | No | No | Yes |
| Owner-selected cultural/religious motifs | Core set | Expanded set | Expanded set | Expanded set |
| Platform attribution | Subtle attribution | Removed | Removed | Removed |
| Manual content edits before/after payment | Yes | Yes | Yes | Yes |
| Controlled palette/type/layout settings | Yes | Yes | Yes | Yes |
| Accountless RSVP | Yes | Yes | Yes | Yes |
| Guest-party management | Yes | Yes | Yes | Yes |
| CSV import/export | Yes | Yes | Yes | Yes |
| QR code/direct share link | Yes | Yes | Yes | Yes |
| Standard responsive asset delivery | Yes | Yes | Yes | Yes |
| Priority support queue | No | Yes | Yes | Yes |
| Price (MUR) | 799 | 1,499 | 2,999 | 5,999 |

Additional guest capacity beyond the included amount is available on every tier as an explicit MUR 15/guest add-on (`DEC-026`); see Section 13.3.

### 5.1 Catalogue interpretation

- One **AI concept** is one coordinated concept result under `AI_USAGE_RULES.md`, normally including validated structured copy/configuration plus at most one accepted decorative image generation when the selected workflow requires it.
- One **AI refinement** is one accepted bounded refinement request as defined in `AI_USAGE_RULES.md`; manual edits do not consume it.
- **Invitee capacity** is counted exactly as defined in `GUEST_RULES.md`, not by RSVP submission or attendee count.
- A language slot means one simultaneously published owner-approved invitation content variant. Product-interface language is never restricted by package.
- Theme/motif access uses allow-listed versioned assets/configurations only; no tier allows arbitrary code or unsafe upload behavior.
- “Priority support queue” means prioritized handling during published support hours; it is not a guaranteed response time or 24/7 service.
- All tiers receive the same security, privacy, accessibility, payment verification, backup, and factual-data safeguards.

### 5.2 Validation rule

The catalogue may be activated in production only when its prices, AI cost, support cost, guest/storage/bandwidth load, payment fees, hosting duration, and contribution margin pass the approved validation gate. If validation fails, create a new proposed catalogue version; do not silently weaken an accepted purchase.

---

## 6. Rights available without payment

An authenticated owner may, within anti-abuse limits:

- create and edit a wedding event draft;
- answer the guided questionnaire;
- choose a proposed package;
- enter factual invitation information;
- use manual design controls available to the selected preview experience;
- request one controlled preview concept for the event;
- view a protected/watermarked/non-public preview;
- revise factual data manually;
- view package, capacity, hosting, language, branding, AI, price, tax, and refund disclosures;
- prepare guest data locally/in a draft state where approved, without publishing or messaging guests.

Unpaid access does not permit:

- public publication;
- permanent/public share URL or live QR destination;
- entitlement-backed additional AI concepts/refinements beyond preview policy;
- removal of preview watermark/preview controls;
- outbound guest invitations or production email delivery;
- paid theme/export/add-on use;
- representation that payment succeeded.

---

## 7. Preview-access policy

### 7.1 Proposed allowance

- One preview concept per event.
- The preview concept counts toward the total concept allowance if that event later purchases a package.
- Maximum three active unpaid preview events per account at a time.
- Additional account/device/network velocity limits may apply for abuse protection.
- No entitlement can be transferred by deleting/recreating an event or account.

### 7.2 Preview restrictions

- account required before generation/save;
- selected package recorded but not treated as purchased;
- protected non-public preview;
- watermark or equivalent preview treatment where appropriate;
- reduced/standard preview asset quality sufficient to evaluate the design;
- no public indexing, guest RSVP, production sharing, or paid branding removal;
- provider and internal cost caps;
- moderation and all security rules remain active.

### 7.3 Preview failure

A validated platform/provider failure releases the preview reservation and permits a retry under `AI_USAGE_RULES.md`. Subjective dislike of a usable result does not create unlimited free generations; the owner may edit manually, use any approved correction flow, or purchase a package with remaining allowance.

---

## 8. Entitlement lifecycle

### 8.1 States

An entitlement record/grant may be:

- `PENDING` — awaiting verified fulfillment transaction;
- `ACTIVE` — usable;
- `RESERVED` — unit temporarily held for work;
- `CONSUMED` — unit used by a completed qualifying action;
- `EXPIRED` — time/right ended;
- `REVERSED` — counteracted by an explicit ledger entry;
- `SUSPENDED` — temporarily unavailable due to security, dispute, or policy review;
- `EXHAUSTED` — derived state where no consumable balance remains.

These states do not replace the append-only ledger. A current projection may be rebuilt from authoritative movements.

### 8.2 Grant trigger

The payment-verification database transaction:

1. verifies the provider transaction and immutable purchase snapshot;
2. locks the purchase/attempt;
3. confirms the event has not already received the grant;
4. appends package and add-on grants from the snapshot;
5. accounts for qualifying preview usage already consumed;
6. records audit/outbox events;
7. commits exactly once.

The browser return cannot grant entitlement. A queue retry cannot duplicate it.

---

## 9. Catalogue and grant versioning

Every purchase snapshot stores:

- package stable ID and customer-facing name at purchase;
- package/catalogue version;
- entitlement definition versions;
- granted quantity/boolean/duration parameters;
- applicable add-ons;
- hosting-start rule;
- preview usage treatment;
- upgrade/refund adjustment rules version;
- price-book and commercial terms references.

A later catalogue change affects new purchases only unless an explicit, owner-approved, customer-favourable migration grants additional rights. Never reduce or reinterpret an existing paid grant silently.

Marketing copy is rendered from the same approved catalogue data or checked against it; duplicated contradictory limits are prohibited.

---

## 10. AI concept entitlement

- The package total includes the qualifying preview concept already used for that event.
- Bronze therefore has no additional initial concept after purchase if its preview concept succeeded, but retains its refinement allowance.
- Silver has one remaining initial concept after one successful preview concept.
- Gold has two remaining initial concepts after one successful preview concept.
- Platinum has four remaining initial concepts after one successful preview concept.
- If no preview concept was successfully consumed, the full paid allowance is available.
- One request reserves one unit before provider work.
- A qualifying successful normalized result consumes one unit.
- A definitive provider/platform failure before a usable accepted result releases the reservation.
- Ambiguous/timeout status remains reserved until reconciled; it is not immediately retried as a new free unit.
- Policy-rejected or abusive requests follow `AI_USAGE_RULES.md` and may consume or release according to fault/cost rules disclosed there.

Concepts are event-specific and expire with the package/active creation lifecycle defined below; they never become cash or cross-event credit.

---

## 11. AI refinement entitlement

- Manual text/date/venue/guest edits never consume AI refinement.
- One explicit accepted AI refinement request reserves one unit.
- Structured updates may affect approved copy/design tokens only.
- A refinement requiring a new image may also require a separate image-generation allowance/rule under `AI_USAGE_RULES.md`; the UI must disclose this before confirmation.
- A rejected schema or provider/platform failure without usable result releases the unit after reconciliation.
- Repeated requests caused by unchanged user input, duplicate clicks, or queue delivery are idempotent and consume once.
- Refinements cannot create arbitrary code, unsupported languages, unreviewed cultural inference, or paid capacity.

---

## 12. Manual editing

All packages permit unlimited reasonable manual editing of owner-controlled factual text and allowed configuration while the event data remains retained and accessible.

“Unlimited manual editing” does not mean:

- unlimited invitation versions retained forever;
- arbitrary file storage;
- arbitrary HTML/CSS/JavaScript;
- bypass of validation, theme, language-slot, or publication rules;
- unlimited support labor;
- edits after legal/security suspension.

The system may archive/prune non-active draft version artifacts under a disclosed retention policy while preserving immutable purchased/published versions and audit history.

---

## 13. Invitee-capacity entitlement

### 13.1 Capacity unit

The proposed commercial unit is **invitees**, not guest parties, RSVP submissions, plus-one placeholders, or actual attendees. Exact counting and edge cases belong in `GUEST_RULES.md`.

### 13.2 Enforcement

- Capacity is checked server-side before adding/importing an invitee.
- Concurrent additions cannot exceed the granted total.
- Existing guest parties and RSVP history are never deleted solely because the limit is reached or an entitlement is later suspended.
- At the limit, owners can still view, correct, remove where legally/product-appropriate, export, and manage existing guests.
- New invitees require a package upgrade or approved capacity add-on.
- No automatic overage charge.
- Capacity is event-specific and does not refresh monthly.

### 13.3 Capacity add-on

A verified per-guest capacity purchase appends a quantity grant equal to the confirmed additional-guest count, at MUR 15 per additional guest (`DEC-026`), in whole-guest increments. The add-on is explicit and confirmed before charge — never an automatic overage. Refund/reversal never deletes guest data automatically; it may block new additions and create support review when current usage exceeds remaining capacity.

---

## 14. Language entitlement

- Bronze: one simultaneously published invitation content language.
- Silver: up to two.
- Gold: up to three.
- Platinum: up to four.
- Eligible MVP invitation languages are English, French, and Mauritian Kreol (`mfe`) when each is implementation-ready and human-reviewed.
- Russian does not become an MVP entitlement until Russian support is separately activated (`DEC-020`). Platinum's fourth language slot does not by itself activate Russian or any other not-yet-gated language.
- Product interface, checkout safety text, privacy notices, and accessibility are not intentionally degraded because of package tier.
- Owner-entered names, venues, addresses, and factual details remain owner-controlled.
- AI translation/refinement use follows `AI_USAGE_RULES.md`; manually supplied reviewed variants do not consume AI merely because another language slot is used.

Changing which language occupies a slot is allowed before publication and through controlled versioning. Historical/published versions preserve what they rendered.

---

## 15. Theme and motif entitlement

- Every tier includes neutral, complete, accessible core themes.
- Bronze may use the core reviewed collection and core owner-selected motif options.
- Silver adds the expanded reviewed collection.
- Gold adds premium reviewed designs and premium motion in addition to the expanded collection.
- Platinum adds named-guest personalization and bespoke premium elements on top of Gold.
- Theme labels and membership are versioned.
- Existing paid/published use is not broken when a theme is retired; unsafe themes may be disabled through an audited security/policy process with a safe replacement path.
- No tier permits cultural/religious inference from identity, name, locale, or venue.
- No tier permits arbitrary executable code, external assets, autoplay, advanced 3D/parallax/particles, or user-uploaded fonts in MVP.

Theme access does not override factual visibility, WCAG 2.2 AA target, responsive behavior, performance, or reduced motion.

---

## 16. Branding entitlement

- Bronze public invitations include restrained platform attribution.
- Silver, Gold, and Platinum may remove platform attribution.
- Attribution must not distract from the event, reveal private data, contain third-party ads, or impair accessibility.
- Preview mode may show preview/watermark treatment regardless of selected package until verified payment.
- No tier includes customer white-label/reseller branding in MVP.
- Removing attribution does not remove legally required merchant, privacy, cookie, safety, or support disclosures.

---

## 17. Hosting entitlement

### 17.1 Start and end

- Hosting begins at the first successful publication timestamp.
- Payment alone does not start hosting.
- Ordinary edits, unpublish/republish, or new invitation versions do not reset the start.
- End time is calculated from the package duration using an approved calendar/instant rule and stored explicitly.
- Bronze: 90 days.
- Silver: 180 days.
- Gold: 365 days.
- Platinum: 545 days.

### 17.2 Before first publication

The paid-unpublished period must not remain indefinite. Proposed rule: the owner must first publish within **180 days of verified purchase** unless support grants an audited extension. After that, publication entitlement is suspended for review; data retention/refund rights follow approved terms.

### 17.3 Expiry

At hosting expiry:

- public invitation and RSVP mutation close gracefully;
- no new guest-facing delivery is promised;
- owner sees expiry and available approved extension options;
- content is not immediately deleted;
- host archive access and personal-data retention follow approved retention rules;
- an extension may reactivate public hosting if the event/data remains eligible.

### 17.4 Hosting extension

A verified extension adds a fixed duration according to the purchased add-on:

- if active, extend from current end time;
- if expired but eligible, extend from the later of verified extension time or the approved reactivation instant;
- never reset unrelated entitlements;
- no automatic renewal;
- no lifetime hosting.

---

## 18. Publication entitlement

Every paid package includes one public invitation for its event.

Publication requires:

- verified successful purchase and active non-reversed package grant;
- selected immutable invitation version;
- valid required event facts;
- hosting window available/not exhausted;
- no security, abuse, legal, dispute, or policy suspension;
- public projection/accessibility/safety checks;
- accepted applicable terms.

The owner may unpublish and republish during the active hosting interval. This does not create a second invitation or refresh time/usage. One event has one invitation aggregate with immutable versions.

---

## 19. Guest management, RSVP, CSV, QR, and sharing

All paid tiers include:

- guest parties;
- accountless RSVP;
- RSVP revision under authorized rules;
- CSV import and export;
- QR code;
- direct share URL;
- owner-assisted WhatsApp/social/email sharing entry points.

These capabilities remain subject to invitee capacity, security, privacy, rate, retention, and hosting status. “Sharing included” does not mean the platform pays for unlimited bulk messaging, guarantees delivery by third-party apps, or performs unapproved automated social posting.

---

## 20. Asset quality and storage

Every tier receives responsive, optimized invitation assets sufficient for a professional web invitation and standard social sharing. Avoid fixed “720p/1080p/4K” claims that do not map cleanly to responsive web output.

Package differentiation may use approved generation/rendering quality presets after real provider cost and device testing. Until then:

- factual information is semantic text at every tier;
- all tiers use responsive images and safe formats;
- no tier serves unnecessary 4K assets to mobile guests;
- original/generated asset retention is bounded by event/data policy;
- storage limits are enforced operationally and cannot delete the active published asset without safe replacement.

---

## 21. Support entitlement

- Bronze: self-service guidance plus standard payment/technical support path.
- Silver, Gold, and Platinum: priority queue during stated support hours.
- Security, privacy requests, incorrect payment, accessibility blockers, and platform incidents are triaged by severity rather than package.
- No tier promises 24/7 support, guaranteed resolution, dedicated account manager, design concierge, or custom creative labor in MVP.
- Support cannot bypass authorization, payment verification, audit, refund, or entitlement controls.

---

## 22. Upgrade behavior

An upgrade:

1. uses a verified compatible upgrade purchase snapshot;
2. appends the target/delta grants exactly once;
3. preserves the original purchase and ledger;
4. preserves all prior consumption/reservations;
5. calculates available balance from the upgraded total minus prior qualifying use;
6. increases capacity/duration/features only by the approved rule;
7. never decreases a right during an upward upgrade.

Examples:

- Bronze with one consumed concept upgrading to Silver receives a total concept allowance of two, leaving one.
- Bronze with 60 invitees upgrading to Silver moves to a total capacity of 150, leaving 90 available.
- Hosting before first publication changes to the target package duration.
- Hosting after first publication extends only according to the explicit upgrade rule stored in the catalogue; proposed default is to recalculate the end as `first_published_at + target duration`, never shorten an existing later extension.
- Language/theme/branding changes become available after verified grant and a new invitation version/publish action where needed.

Downgrades are not self-service and do not create automatic refunds.

---

## 23. Add-on behavior

MVP-compatible add-on grants may include:

- invitee-capacity quantity;
- hosting-extension duration;
- bounded AI concept/refinement quantity if approved after cost/safety validation.

Each add-on is:

- event-scoped;
- compatible only with stated package/catalogue versions;
- granted only after verified payment;
- non-transferable;
- separately auditable;
- subject to explicit maximum and expiry;
- adjusted explicitly on refund.

An add-on cannot enable a non-wedding event, subscription, white label, arbitrary theme code, prohibited AI, or another event.

---

## 24. Reservations, failure, and concurrency

For consumables:

1. start a transaction;
2. lock or atomically evaluate the event/entitlement balance;
3. reject when unavailable/suspended/expired;
4. append one reservation linked to an idempotency key;
5. commit before external work;
6. run the external/worker action;
7. reconcile to consumption or release exactly once.

Rules:

- concurrent requests cannot overspend;
- duplicate clicks/jobs reuse the same reservation;
- a timeout is ambiguous until provider/job reconciliation;
- an abandoned reservation expires only through a safe recovery job that checks external state;
- a failed database commit creates no external call where orchestration can prevent it;
- administrative overrides never mutate a prior consumption row.

---

## 25. Refund effects

### Full refund before publication

Proposed default after provider confirmation:

- append reversal of unused paid grants;
- release valid unused reservations where safe;
- prevent publication;
- preserve payment/refund/audit history;
- preserve the owner’s draft temporarily under retention/support policy;
- do not erase preview usage history.

### Full refund after publication

- do not automatically delete content or guest data;
- apply the approved refund/support policy;
- suspend or set a controlled public end when authorized;
- preserve immutable financial, publication, RSVP, and audit evidence under retention rules;
- communicate impact to the owner.

### Partial refund

- append the exact entitlement adjustment named in the refund decision;
- never infer entitlement loss from refund percentage alone;
- never silently delete invitees/RSVPs if adjusted capacity is below current use;
- block new consumption/addition and route the over-cap state to support.

Mandatory legal rights override product defaults.

---

## 26. Chargebacks, disputes, fraud, and policy suspension

- A dispute does not erase the capture or grant history.
- Mark affected rights under review and apply proportionate suspension through audited rules.
- Preserve public guest safety and event facts where continued access is legally/operationally appropriate; do not use automatic destructive retaliation.
- Prevent new paid consumption/publication when credible fraud or payment invalidity requires containment.
- Reconcile the final provider outcome and append explicit reversals/restorations.
- Account takeover, stolen payment, coupon abuse, or cross-event resale may trigger suspension independent of balance.
- Owners receive a safe explanation and appeal/support route where appropriate.

---

## 27. Expiration of non-hosting entitlements

Proposed rules:

- Package AI concept/refinement allowances remain usable until the earlier of: event/archive deletion, full reversal, policy suspension, or **30 days after hosting expiry**.
- Before first publication, unused paid AI allowances remain usable within the proposed 180-day publication-start window.
- Invitee capacity is a ceiling throughout retained event management; it does not expire monthly.
- Theme/language/branding rights remain usable for versions during the retained active/extension lifecycle.
- Export/access after public expiry follows data-retention and account-access rules, not permanent entitlement.

Expiration is recorded and explained; no hidden monthly reset or rollover exists.

---

## 28. Administrative adjustments

Authorized support/operations may append an adjustment for:

- verified platform/provider failure not automatically repaired;
- incorrect grant/consumption caused by a system defect;
- approved goodwill remedy;
- migration/correction;
- refund/dispute result;
- controlled pilot support.

Every adjustment requires event, entitlement, quantity/duration, direction, reason code, human explanation, evidence/reference, actor, approver where required, timestamp, and correlation ID.

No negative adjustment may silently remove already collected guest/RSVP data or rewrite a published version. Production adjustments must not be performed through direct SQL as an ordinary workflow.

---

## 29. Customer-visible balance

The owner should see:

- current package and version/customer-facing purchase date;
- concepts/refinements used, reserved, and remaining;
- invitees used and capacity;
- active invitation languages and slot limit;
- hosting start/end/status;
- theme/branding access;
- add-ons/upgrades;
- pending payment or entitlement verification;
- relevant expiry/suspension reason and next action;
- a support link for discrepancies.

Do not expose provider internals, fraud signals, other owners, or sensitive audit detail. A stale client-side balance never authorizes consumption.

---

## 30. Enforcement boundaries

Every protected action performs a server-side check close to the domain transaction:

- route/UI hiding is not enforcement;
- queue workers re-check authorization and entitlement relevant to execution;
- webhooks cannot name arbitrary grants outside the purchase snapshot;
- provider metadata is not an entitlement definition;
- database constraints/locks protect uniqueness and non-negative use;
- public rendering checks publication/hosting/suspension state;
- CSV imports reserve/evaluate capacity atomically before commit;
- AI calls require a valid reservation before provider cost;
- admin tools use the same ledger services and extra authorization.

Fail closed with a stable non-sensitive error and recovery path.

---

## 31. Data model expectations

The approved database architecture should represent:

- entitlement definitions/versions;
- package catalogue versions and mappings;
- purchase-snapshot grant specifications;
- append-only grant, reservation, consumption, release, reversal, expiry, and adjustment entries;
- stable idempotency/source reference;
- event/owner scope;
- quantity/duration/boolean parameters;
- effective/expiry timestamps;
- current projection/balance rebuildable from ledger;
- actor/system/provider references without raw sensitive payloads;
- audit/outbox events.

Do not store one mutable `remaining_credits` field as the only truth.

---

## 32. Observability and reconciliation

Monitor:

- grant success/failure/duplicate prevention;
- purchase paid without grant;
- grant without verified purchase;
- negative/impossible derived balance;
- reservations older than expected;
- release/consumption mismatch;
- exhausted-limit errors by entitlement/package;
- preview generation cost and unpaid-account abuse;
- capacity threshold/over-cap state;
- hosting approaching expiry/expired/extended;
- upgrades/add-ons/refund adjustments;
- admin adjustments by reason/actor;
- entitlement-related support volume;
- variable cost and contribution margin by package version.

Reconciliation jobs are idempotent and create review items rather than silently inventing grants.

---

## 33. Test requirements

At minimum test:

- exact catalogue mapping for all four packages;
- preview concept counting into paid totals;
- no duplicate payment grant;
- concurrent reservation/consumption;
- failure, timeout, retry, duplicate job, and reservation recovery;
- manual edits not consuming AI;
- invitee count/capacity/import concurrency;
- language-slot enforcement without restricting interface language;
- theme/branding access;
- first-publication hosting start and no reset on republish;
- 180-day first-publication window;
- hosting extension active/expired calculations;
- upgrade examples and no balance reset;
- refund/chargeback/partial-adjustment behavior;
- catalogue changes preserving old purchases;
- expired/suspended/reversed rights;
- cross-owner/cross-event attempts;
- unauthorized admin adjustment;
- projection rebuild from ledger;
- customer-visible balances and accessible limit messages.

Critical entitlement invariants require 100% explicit test coverage regardless of line-coverage percentage.

---

## 34. Change control

A catalogue or entitlement change requires:

- owner-approved reason and evidence;
- new immutable definition/catalogue version;
- pricing, unit economics, payment snapshot, refund, tax, and marketing review;
- AI/guest/localization/design implications;
- database/migration and historical-compatibility plan;
- tests and staging evidence;
- customer/support communication where an active offer changes;
- decision/changelog entry.

Existing paid rights cannot be reduced retroactively except where law, security, fraud, or content policy requires a proportionate audited action.

---

## 35. Explicit MVP exclusions

- cross-event or account wallet;
- transferable/resellable entitlements;
- planner pooled credits;
- subscriptions or monthly resets;
- unlimited/fair-use AI marketed as unlimited;
- unlimited guest capacity;
- lifetime hosting;
- automatic overage charges;
- arbitrary theme/code entitlement;
- white label;
- per-guest AI messages;
- custom design concierge labor;
- guaranteed 24/7 support;
- Russian invitation/interface entitlement before activation;
- non-wedding event rights;
- a mutable balance without append-only evidence;
- client-side or payment-redirect entitlement grants.

---

## 36. Approved owner decisions

### Decision 1 — Entitlement scope

**Approved:** Scope all MVP package and add-on entitlements to one event; provide no transferable account wallet, planner pool, or cross-event rollover.

### Decision 2 — Complete core workflow

**Approved:** Include invitation creation, manual editing, verified publication, sharing, guest parties, accountless RSVP, CSV, and QR in every paid tier; never make security, privacy, accessibility, or factual integrity premium-only.

### Decision 3 — Initial concept allowances

**Superseded 2026-08-25 by `DEC-025`:** Set total initial AI concept allowances to Bronze 1, Silver 2, Gold 3, and Platinum 5, with the successful pre-payment preview concept counting toward that total.

### Decision 4 — Refinement allowances

**Superseded 2026-08-25 by `DEC-025`:** Set AI refinement allowances to Bronze 2, Silver 4, Gold 8, and Platinum 12; manual edits consume none. Exact request counting and failure rules are finalized in `AI_USAGE_RULES.md`.

### Decision 5 — Invitee capacity

**Superseded 2026-08-25 by `DEC-025`/`DEC-026`:** Set included invitee capacity to Bronze 75, Silver 150, Gold 300, and Platinum 750, with capacity counted under `GUEST_RULES.md`, no deletion at the limit, and no automatic (unconfirmed) overage billing — additional capacity is available as an explicit MUR 15/guest add-on.

### Decision 6 — Hosting duration

**Superseded 2026-08-25 by `DEC-025`:** Include 90, 180, 365, and 545 days of public hosting for Bronze, Silver, Gold, and Platinum respectively, beginning at first successful publication and never resetting through ordinary edits/republishing.

### Decision 7 — First-publication window

**Approved:** Require first publication within 180 days of verified purchase unless support grants an audited extension; payment itself does not begin public hosting. *(Unchanged by `DEC-025`, which explicitly carries this rule forward.)*

### Decision 8 — Language slots

**Superseded 2026-08-25 by `DEC-025`:** Allow 1, 2, 3, and 4 simultaneous invitation content languages for Bronze, Silver, Gold, and Platinum respectively, drawn from activated English, French, and Mauritian Kreol; never restrict the product interface by package.

### Decision 9 — Themes and motifs

**Superseded 2026-08-25:** Give every tier complete neutral/core reviewed themes; Silver adds an expanded collection; Gold adds premium designs and premium motion; Platinum adds named-guest personalization and bespoke premium elements. All motifs remain owner-selected, allow-listed, accessible, and non-inferred.

### Decision 10 — Branding

**Superseded 2026-08-25:** Use restrained platform attribution on Bronze and remove it on Silver/Gold/Platinum, while retaining legally/security-required disclosures and excluding customer white label from MVP.

### Decision 11 — Support

**Superseded 2026-08-25:** Provide standard support access to Bronze and a priority queue to Silver/Gold/Platinum during stated hours, without promising 24/7 service or letting package tier override incident severity.

### Decision 12 — Preview access

**Approved:** Permit one controlled preview concept per event, maximum three active unpaid preview events per account, with protected preview treatment and abuse limits; count successful preview usage into the purchased package total.

### Decision 13 — Upgrade preservation

**Approved:** On upward upgrade, preserve all consumption/history and grant only the target total/delta; never reset quotas or provide automatic downgrade refunds.

### Decision 14 — Add-ons

**Approved:** Allow event-specific capacity packs, fixed hosting extensions, and only later-approved bounded AI packs; require verified payment, compatibility, maximums, and append-only grants.

### Decision 15 — Failure accounting

**Approved:** Reserve consumables before asynchronous work, consume only a qualifying usable result, release definitive platform/provider failures after reconciliation, and never double-consume retries/duplicate delivery.

### Decision 16 — Refund effects

**Approved:** Reverse unused rights after confirmed eligible refunds without deleting financial/audit history or guest data; apply explicit entitlement adjustments for partial refunds and controlled treatment after publication.

### Decision 17 — Post-expiry AI window

**Approved:** Let unused AI allowances remain available until 30 days after hosting expiry, subject to retention, refund, suspension, and the 180-day pre-publication rule; provide no monthly reset or rollover.

### Decision 18 — Administrative adjustments

**Approved:** Permit only append-only, reasoned, evidenced, authorized adjustments with approval where required; prohibit ordinary direct database edits and retroactive silent reduction of paid rights.

### Decision 19 — Asset-quality claims

**Approved:** Promise professional responsive web/social assets in every tier and defer rigid 720p/1080p/4K marketing differences until provider cost and device tests justify versioned quality presets.

### Decision 20 — Catalogue activation

**Approved:** Activate this entitlement catalogue in production only when compatible price books and the approved quality, cost, provider, tax/refund, and contribution-margin gates pass; otherwise create a new version rather than weakening accepted grants.

---

## 37. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.1.  
**Approved date:** 2026-08-17 (Decisions 3–6 and 8–11 superseded 2026-08-25 by `DEC-025`/`DEC-026`).  
**Owner decisions:** Decisions 1–20 approved as proposed; see supersession notes above.
