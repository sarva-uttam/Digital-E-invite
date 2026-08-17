# Pricing Rules

**File:** `product/PRICING_RULES.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.0  
**Approved date:** 2026-08-17  
**Depends on:** approved `docs/00_CLAUDE_RULES.md` through `docs/13_ROADMAP.md`  
**Closely related:** `product/ENTITLEMENTS.md`, `product/AI_USAGE_RULES.md`, `product/GUEST_RULES.md`, `product/LOCALIZATION.md`

---

## 1. Purpose

This document defines the commercial rules used to create, display, version, discount, upgrade, charge, refund, and report prices for one-time wedding invitation packages.

It deliberately does **not** approve final launch amounts. The historical Rs 800, Rs 2,500, and Rs 5,000 figures remain hypotheses until validated. Package allowances are finalized in the entitlement documents after pricing economics and provider costs are known.

---

## 2. Binding commercial model

- The MVP sells one-time packages attached to one event.
- Every paid package must produce a complete usable wedding invitation.
- There are no recurring consumer subscriptions in MVP.
- Guests never pay to view an invitation or submit an RSVP.
- Guest pages contain no third-party advertising.
- Planners initially buy the same per-event packages; subscriptions, volume contracts, and prepaid credit programmes are deferred.
- Preview may occur before payment under approved controls.
- Verified successful payment and valid entitlement are required before publication.
- Hosting is time-bounded and begins at first successful publication, not payment.
- Prices, discounts, taxes, currency, upgrades, and totals are server-authoritative.

---

## 3. Terminology

- **Package:** a customer-facing commercial bundle.
- **Package version:** immutable definition of included commercial capabilities and entitlement references.
- **Price book:** a versioned set of prices for a market/currency and validity window.
- **Price entry:** amount and commercial rules for one package/add-on in one price book.
- **Quote:** temporary server-calculated presentation before purchase creation.
- **Purchase snapshot:** immutable commercial record frozen before checkout.
- **Add-on:** separately priced, compatible extension to one event.
- **Upgrade:** movement from a purchased package to a higher eligible package for the same event.
- **Discount:** explicit price reduction governed by a discount rule.
- **Customer-payable tax:** tax legally added to or included in the customer transaction under approved rules.
- **Net event revenue:** recognized customer revenue after approved discounts/refunds and relevant customer-payable tax/accounting treatment.
- **Contribution margin:** net event revenue minus event-level variable costs.

---

## 4. Package structure

Use three customer-facing tiers:

1. **Essential** — complete entry package;
2. **Signature** — recommended middle package;
3. **Premium** — highest-value package.

These names replace Silver, Gold, and Platinum as the proposed working names. Branding review may rename them before launch without changing historical package identifiers.

### 4.1 Positioning rules

- Essential cannot be a crippled teaser; it must complete the core create-preview-pay-publish-share-RSVP outcome.
- Signature is recommended only when its extra value is genuine and clearly disclosed.
- Premium adds meaningful controlled value, not artificial restrictions or unsafe effects.
- Differences may include concepts, refinements, output quality, approved languages, theme options, guest capacity, branding treatment, hosting duration, support, and compatible add-ons.
- No package promises arbitrary code, unlimited AI, permanent hosting, guaranteed artistic perfection, guaranteed delivery by third parties, or 24/7 support unless actually provided.

### 4.2 Source of allowances

This document prices commercial items. Exact consumable allowances and enforcement live in:

- `product/ENTITLEMENTS.md` for durable package rights;
- `product/AI_USAGE_RULES.md` for AI concepts/refinements/regenerations;
- `product/GUEST_RULES.md` for capacity units and over-limit behavior;
- `product/LOCALIZATION.md` for active language scope.

The checkout comparison is generated from approved versioned definitions, not duplicated marketing constants.

---

## 5. Launch-price status

### 5.1 Historical hypotheses

The original concept proposed:

- Silver / Essential hypothesis: **Rs 800**;
- Gold / Signature hypothesis: **Rs 2,500**;
- Platinum / Premium hypothesis: **Rs 5,000**.

These amounts are reference hypotheses only. They must not appear as active production prices, structured metadata, ads, checkout values, receipts, or promises until the owner approves a validated price book.

### 5.2 Validation inputs

Final launch prices require:

- willingness-to-pay interviews or controlled offer tests;
- comparison with credible alternatives and professional design services;
- demonstrated invitation quality and customer value;
- AI text/image cost per successful event and retry/regeneration patterns;
- payment/acquiring fees and non-returned refund costs;
- hosting, storage, bandwidth, email, auth, monitoring, support, moderation, and fraud cost;
- tax/VAT and invoice treatment confirmed by a Mauritius professional;
- refund/chargeback assumptions;
- guest capacity and hosting duration;
- planner versus direct-customer behavior;
- target contribution margin and contingency;
- MUR purchasing context and international market evidence.

### 5.3 Activation rule

Until an owner-approved price book is activated, production checkout is disabled. Development and staging use clearly marked synthetic/test price books that cannot be used with production merchant credentials.

---

## 6. Price books

Each price book has:

- stable internal ID;
- human-readable version;
- status: `DRAFT`, `SCHEDULED`, `ACTIVE`, `RETIRED`, or `CANCELLED`;
- market/country scope;
- presentment currency;
- settlement/accounting metadata where required;
- validity start and optional end;
- tax mode and approved tax-rule reference;
- package/add-on price entries;
- owner approver and approval timestamp;
- change reason;
- immutable activation audit.

Only one unambiguous active entry may match a product, market, currency, customer eligibility, and time. Ambiguity fails closed and prevents checkout.

Activating a new price book never edits an existing purchase snapshot or historical receipt.

---

## 7. Money representation

- Store money as integer minor units plus ISO 4217 currency code.
- Never use binary floating point for authoritative monetary calculations.
- MUR is the base and primary Mauritius commercial currency.
- Display formatting is locale-aware, but formatting never changes the stored amount.
- Rounding occurs only at documented boundaries using the approved currency/tax rule.
- Every intermediate tax, discount, upgrade-credit, and total calculation is reproducible.
- A zero amount is explicit; a missing amount is not treated as zero.

The browser may submit a package/price-book identifier, but it cannot submit an authoritative amount, currency, tax, discount, exchange rate, or total.

---

## 8. Mauritius and international pricing

### 8.1 Mauritius

Mauritian customers normally see and pay an approved MUR price book.

### 8.2 International access

Global availability does not automatically enable global checkout. EUR and/or USD may be activated only when:

- the selected provider/acquirer confirms merchant and currency support;
- settlement currency and fees are known;
- an approved market-specific price book exists;
- exchange-rate source/update/rounding/FX-margin rules are approved where conversion is used;
- tax, invoice, refund, chargeback, sanctions, and accounting treatment are approved;
- support and language claims match actual capability.

### 8.3 No automatic conversion pricing

International price books are deliberate commercial prices, not live MUR conversion displayed with arbitrary rounding. A price may be informed by exchange rates, purchasing power, competition, fees, taxes, refunds, and support cost.

IP geolocation alone never selects an authoritative currency. Explicit customer country/currency choice, billing/provider facts, and approved eligibility rules may contribute.

If no approved checkout currency exists, the interface states that purchase is not yet available rather than simulating a charge.

---

## 9. Display rules

Before checkout, show clearly:

- package name and event scope;
- presentment currency and total package amount;
- whether customer-payable tax is included or added, according to approved law/accounting rules;
- all mandatory fees;
- important AI allowances;
- guest-capacity unit and included capacity;
- hosting duration and when it begins;
- branding treatment;
- active language capability;
- key exclusions;
- refund/cancellation summary with link to full terms;
- renewal status: **one-time purchase; no automatic subscription renewal**;
- any discount, original eligible price, discount amount, and final total;
- any upgrade credit or add-on separately;
- payment methods only after production verification.

Do not use drip pricing, hidden mandatory fees, preselected paid add-ons, misleading “free,” false scarcity, fake countdowns, permanent sale claims, fabricated comparison prices, or confusing tax wording.

The recommended package may be visually emphasized, but Essential remains fully legible and selectable.

---

## 10. Quote calculation

The server calculates a quote from:

1. authenticated owner/event where required;
2. approved market and currency eligibility;
3. active package/add-on version;
4. active price-book entry;
5. compatible guest/hosting/add-on choices;
6. eligible discount rules;
7. approved customer-payable tax rules;
8. deterministic rounding;
9. quote expiry.

The response includes a stable quote ID or signed server reference, itemized components, validity, and display metadata. Recalculating after expiry may produce a different price, but an existing paid purchase never changes.

---

## 11. Purchase snapshot

Before provider checkout, freeze:

- event and owner/account reference;
- package and package version;
- price-book ID/version;
- line items and quantities;
- base amount;
- discount IDs and amounts;
- approved tax-rule reference, tax mode, rate/basis, and amount where applicable;
- total payable amount and currency;
- market/customer-country facts used;
- exchange-rate reference where applicable;
- entitlement grant specification/version;
- guest-capacity and hosting terms;
- refund-policy/terms version accepted;
- snapshot creation and expiry time.

The payment provider receives values derived from this snapshot. Provider verification must match amount and currency before fulfillment.

---

## 12. Discounts and promotions

Every discount has:

- stable code/ID and customer-facing label;
- purpose and owner approval;
- fixed amount or percentage with maximum reduction where relevant;
- eligible package/add-on, price book, market, and currency;
- validity window;
- per-account, per-event, per-code, and total redemption limits;
- minimum purchase condition if any;
- stacking/exclusion rule;
- eligibility evidence;
- budget/cost owner;
- audit and reporting.

Default rule: one discount per purchase and no stacking, unless a combination is explicitly approved and tested.

Discounts cannot reduce a charge below zero, create cash balance, be redeemed by guests, or bypass entitlement rules. A percentage discount applies to eligible pre-tax line items according to the approved tax rule; rounding is deterministic.

Referral, planner, affiliate, employee, recovery, and manual goodwill discounts are inactive until their programmes and abuse controls are separately approved.

---

## 13. Guest-capacity pricing

The business-model principle is a useful included capacity plus clear paid expansion. The old per-guest hypothesis is not approved.

Proposed MVP rule:

- packages include a defined **invitee capacity**, whose counting rules live in `product/GUEST_RULES.md`;
- additional capacity is sold in simple predeclared packs rather than metered surprise billing;
- the server warns at configurable thresholds;
- reaching a limit never deletes guest or RSVP data;
- owners may view/manage existing records but cannot add/import/send beyond the enforceable capacity until they upgrade or add capacity;
- capacity purchases are event-specific and non-transferable;
- no automatic post-use charge occurs.

Exact included quantities and pack sizes/prices remain unset until the entitlement and pricing validation phase.

---

## 14. Hosting extension pricing

Each package includes a defined public-hosting duration. Hosting starts at first successful publication.

Proposed extension rules:

- offer fixed-duration extension add-ons before or after expiry while retained data remains eligible;
- disclose new end date before payment;
- an extension does not reset AI, guest, design, or other entitlements unless explicitly stated;
- no automatic renewal;
- no permanent/lifetime hosting claim;
- extension pricing and eligibility come from the active compatible price book;
- expiry and data deletion/retention remain separate.

Exact durations, grace periods, extension units, and prices are set in related approved product rules.

---

## 15. Package upgrades

### 15.1 Eligibility

An event may upgrade to a higher active compatible package. Downgrades are not self-service in MVP. Upgrades do not create a second event or erase consumed usage/history.

### 15.2 Proposed upgrade price

Use an explicit upgrade price entry or, when the price book permits, a server-calculated difference:

```text
upgrade subtotal = target package price − eligible package credit
```

Rules:

- the credit is based on the qualifying amount actually paid for the current base package, excluding taxes, refunds, unrelated add-ons, non-transferable discounts, and fees according to approved policy;
- credit never exceeds the target eligible subtotal;
- previously consumed entitlements remain consumed;
- the upgrade grants only the approved delta/additional entitlements;
- taxes are recalculated under the applicable approved rule;
- historical transactions remain unchanged;
- one idempotent verified upgrade payment produces one entitlement adjustment;
- if price-book generations are incompatible, require an explicit upgrade SKU rather than guessing a difference.

The checkout shows current package, target package, credit, new benefits, unchanged/consumed limits, tax, and final amount.

### 15.3 No automatic downgrade refund

Choosing not to use included features or requesting a lower tier does not automatically create a refund or cash credit. Mandatory legal rights and exceptional support remedies still apply.

---

## 16. Add-ons

Potential MVP-compatible add-ons are limited to:

- guest-capacity packs;
- hosting extensions;
- additional bounded AI usage only if approved in `AI_USAGE_RULES.md` and economically safe;
- another explicitly approved event-specific capability.

An add-on must define compatibility, quantity/unit, price-book entry, entitlement effect, expiry, refund behavior, tax treatment, and maximum. Add-ons are never preselected and cannot recreate a hidden subscription.

Complex custom design services, marketplace purchases, planner credits, white label, music, 3D effects, and non-wedding modules remain outside MVP.

---

## 17. Taxes

The system must not invent tax treatment.

- Customer-payable VAT/sales tax is calculated only from an approved professional rule configuration.
- If consumer prices must legally be tax-inclusive, displayed prices already include the applicable tax.
- If tax-exclusive display is permitted and chosen, tax and final total are clear before payment.
- Corporate/income tax or other business obligations are not added to checkout merely because the business pays them.
- Tax mode/rate/basis and invoice/receipt rules are versioned.
- Refund tax adjustments follow approved accounting rules.
- International checkout stays disabled until applicable treatment is approved.

Until a qualified Mauritius accountant/tax professional approves production rules, tax remains zero or explicitly unconfigured and production checkout remains blocked where that uncertainty matters. “Tax excluded” must not be used as a shortcut around legal display obligations.

---

## 18. Refund policy framework

The public refund terms must be reviewed by qualified Mauritius legal/accounting professionals and reconciled with provider/acquirer rules before launch. Statutory rights always override a more restrictive product policy.

### 18.1 Refund categories

| Category | Proposed treatment | Required verification |
|---|---|---|
| Duplicate confirmed charge | refund duplicate amount | reconcile both provider transactions |
| Unauthorized/fraud claim | follow provider/legal dispute process; refund/chargeback as determined | identity, provider case, evidence preservation |
| Platform charged but cannot deliver core paid service | full or appropriate refund | confirmed capture and platform failure |
| Payment succeeded but entitlement not granted | repair promptly; refund if delivery cannot be restored | ledger/reconciliation evidence |
| Owner changes mind before publication | case review under approved consumer terms and consumption state | publication, AI/add-on consumption, legal rights |
| Owner changes mind after publication | no automatic refund; legal/support review | publication/hosting/usage history |
| AI output disliked | no automatic refund where disclosed allowance/service operated; regenerate/support under entitlements | quality defect versus subjective preference |
| AI/provider technical failure | restore entitlement/retry first; refund if core delivery cannot be completed | usage ledger/provider failure |
| Content-policy rejection | case review; do not reward abuse; comply with mandatory rights | policy reason and consumption/cost |
| Event cancelled/postponed | no automatic cash refund; consider hosting/date support under approved policy | lifecycle and legal review |
| Partial refund | only if provider supports and policy defines explicit entitlement adjustment | refundable balance and adjustment rule |

### 18.2 Refund controls

- Refunds are support/admin actions in MVP.
- Never delete the original capture.
- Verify refundable amount/currency server-side.
- Use an idempotency key before the provider call.
- Reconcile uncertain calls before retrying.
- Record reason, evidence, initiator, approval, provider reference, amount, currency, state, and entitlement/publication consequence.
- Provider fees not returned are a business accounting cost, not a hidden deduction from a customer refund unless law/terms explicitly permit and disclose it.
- Refunds go to the provider-supported original route unless an approved exception process exists.

### 18.3 Entitlement/publication effects

- Before publication: a full refund normally revokes unused paid entitlements and prevents publication.
- After publication: do not automatically destroy customer content or guest access; apply the approved policy and any transition notice.
- Partial refund: apply a specific approved entitlement adjustment, never an inferred percentage.
- Chargeback/dispute: flag the event for review; any suspension is proportionate, audited, and does not erase evidence.

---

## 19. Cancellations and expired checkout

- A customer may leave or cancel provider checkout without charge by the platform where no capture occurred.
- Failed/cancelled/expired attempts grant nothing.
- An abandoned attempt remains pending until provider truth or expiry resolves it.
- A new checkout attempt uses the same still-valid purchase snapshot or a newly accepted snapshot under current rules.
- The system never changes a prior failed/expired attempt into a different amount.
- The event itself may remain a draft after checkout cancellation.

---

## 20. Price changes

- New prices activate through a new versioned price book.
- Schedule changes with a clear effective instant and timezone.
- Existing paid purchases remain unchanged.
- Unpaid drafts do not lock a price indefinitely.
- A valid unexpired purchase snapshot may retain its frozen terms for its stated checkout window.
- After expiry, recalculate and ask the customer to accept the new total before checkout.
- Do not use personalized price discrimination based on sensitive traits, culture/religion, guest data, urgency inferred from wedding date, device, or opaque profiling.
- Controlled market/currency price books and transparent promotions are permitted.

---

## 21. Credits, wallets, and manual payments

The MVP does not provide:

- stored-value wallet;
- general customer credit balance;
- gift balance;
- cash payment;
- manual bank-transfer approval;
- installment/BNPL product;
- cryptocurrency;
- peer-to-peer or marketplace split payment;
- saved-card programme managed by the platform.

Refunds are financial reversals, not wallet credits. A narrowly scoped promotional discount is not stored value.

---

## 22. Receipts and invoices

After verified payment, provide a durable customer record containing only approved safe fields:

- legal merchant/business identity;
- receipt/invoice number as required;
- transaction and purchase reference;
- issue/payment date;
- customer details only where required/collected lawfully;
- package/add-on line items;
- currency, subtotal, discount, tax, and total;
- payment status and safe method descriptor where allowed;
- refund/adjustment references;
- support/contact and applicable terms reference.

Never expose full card/bank/authentication data. Receipt/invoice numbering, tax fields, language, retention, and correction rules require professional approval.

---

## 23. Planner pricing

Planners use ordinary per-event packages at launch.

- No automatic planner discount.
- No subscription or prepaid bulk credits.
- No informal off-system negotiated price that bypasses the ledger.
- A controlled promotional code may be approved for a planner experiment.
- Track segment, volume, support burden, client-payment behavior, refund rate, and margin.
- Introduce professional price books/terms only after repeat demand and operational needs are demonstrated.

---

## 24. Administrative controls

Only an authorized role may:

- create/edit a draft price book;
- schedule/activate/retire a price book;
- create/approve a discount;
- initiate/approve a refund according to separation rules;
- make an entitlement adjustment;
- enable a market/currency/payment method;
- issue a documented goodwill remedy.

Production price activation should require a second-person or owner approval where practical. Runtime application roles cannot modify historical purchases, captures, refunds, or ledger entries.

Every privileged action records actor, reason, before/after references, timestamp, environment, and correlation ID. Direct database edits are not a pricing workflow.

---

## 25. Abuse and integrity controls

Prevent and monitor:

- client-side price/discount/currency manipulation;
- coupon guessing, leakage, stacking, and account cycling;
- self-referral and fake planner status;
- replayed checkout or upgrade requests;
- reuse of one paid entitlement across events;
- race conditions consuming the same capacity/credit;
- switching purchase/event ownership;
- refund after transfer of benefits without review;
- repeated chargeback abuse;
- administrative price/refund misuse;
- enumeration of unpublished price books.

Risk controls cannot secretly change the advertised price after acceptance. If checkout cannot proceed, show a clear non-disclosing explanation and support path.

---

## 26. Unit economics

For each package, add-on, market, currency, and customer segment, measure:

```text
gross sales
− discounts
− customer refunds/credits under accounting policy
= net event revenue basis
− event-level variable costs
= contribution margin
```

Variable cost includes where applicable:

- AI text/image requests, retries, moderation, and failed outputs;
- payment/acquirer/FX and non-returned refund/chargeback fees;
- event-attributable storage, image processing, bandwidth, email, and hosting;
- event-attributable support and manual review;
- fraud/abuse loss;
- taxes absorbed by the business under approved accounting treatment.

Track median and high-percentile cost, not only averages. One expensive tail of repeated AI or support use can invalidate a package.

Proposed commercial gate: target at least **60% contribution margin** under the forecast normal case and remain positive under an approved stress case before broad launch. This is an internal planning target, not a customer claim, and awaits owner approval.

---

## 27. Pricing experiments

Pricing experiments are allowed only when:

- the hypothesis, eligible audience, variants, duration/sample guardrail, success metric, and stop rule are documented;
- no sensitive-trait targeting or deceptive urgency is used;
- customers see one clear accepted price before payment;
- purchase snapshots and experiment assignment are auditable;
- tax/terms remain correct;
- support can explain the offer;
- the experiment cannot change a paid historical purchase.

For an early pilot, prefer explicit offer cohorts or interviews over complex automated A/B infrastructure.

---

## 28. Metrics

Monitor:

- package views, selections, checkout starts, verified purchases, and conversion;
- package mix and average order value;
- discount use and incremental versus cannibalized sales;
- upgrade/add-on adoption;
- failed, abandoned, duplicate, refunded, disputed, and mismatched payments;
- net revenue and contribution margin by package/market/currency/segment;
- AI, guest, hosting, storage, communication, payment, refund, and support cost per event;
- time from payment to publication;
- pilot willingness-to-pay feedback;
- customer confusion/support contacts about price, allowance, tax, hosting, or refund.

Metrics contain no raw payment credentials and minimize personal/guest data.

---

## 29. Test requirements

At minimum test:

- every active price entry and market/currency match;
- integer-money and rounding boundaries;
- inclusive/exclusive/zero/unconfigured tax modes;
- quote and purchase expiry;
- discount eligibility, maximums, limits, stacking, concurrency, and timezone boundaries;
- historical immutability after price changes;
- upgrade credit and entitlement delta across compatible/incompatible versions;
- add-on compatibility and maximums;
- duplicate checkout/webhook/refund idempotency;
- amount/currency/provider mismatch;
- guest capacity reached without data deletion;
- hosting start/extension/expiry;
- receipt/invoice calculation;
- unauthorized administrative actions;
- English/French/Mauritian Kreol display and long text;
- mobile accessibility and truthful checkout states.

Money/state-machine rules use table-driven and property-based tests where useful.

---

## 30. Change control

A material pricing change requires:

- owner-approved business reason and evidence;
- new price-book/package/discount/refund-policy version where applicable;
- entitlement and compatibility review;
- tax/accounting/legal review where affected;
- payment-provider method/currency review;
- margin and cost analysis;
- checkout, receipt, refund, localization, support, and analytics updates;
- tests and staging evidence;
- activation/rollback plan;
- decision and changelog entry.

Changing UI text without updating the authoritative commercial version is prohibited.

---

## 31. Explicit MVP exclusions

- recurring subscriptions;
- final launch prices without validation and owner approval;
- real-time FX conversion as the price itself;
- unapproved EUR/USD checkout;
- hidden taxes or mandatory fees;
- metered surprise billing or automatic overage charges;
- permanent/lifetime hosting;
- unlimited AI;
- automatic planner discounts or enterprise contracts;
- stored credits/wallets/gift balances;
- split payment, installment, cash, manual bank transfer, or crypto;
- customer self-service partial refunds;
- package downgrade refunds;
- referral/affiliate programme;
- personalized pricing from sensitive or opaque profiling;
- non-wedding package pricing;
- paid guest access or guest-page advertising.

---

## 32. Current-source notes

Current official sources consulted on 2026-08-17 include:

- Mauritius Ministry of Commerce and Consumer Protection, Consumer Affairs Unit: <https://commerce.govmu.org/Pages/Departments/CAU.aspx>
- Mauritius Revenue Authority: <https://www.mra.mu/>
- Bank of Mauritius MauCAS information: <https://www.bom.mu/maucasqrcode/speech_gov_qrcode>

The available public sources do not justify inventing a definitive online-service refund, VAT, tax-inclusive display, invoice, or international digital-services rule for this business. Qualified Mauritius legal and accounting/tax review remains a production blocker. Current provider/acquirer pricing, supported methods, settlement, refunds, chargebacks, and merchant eligibility must also be verified before prices are approved.

---

## 33. Approved owner decisions

### Decision 1 — Package names

**Approved:** Use Essential, Signature, and Premium as the working customer-facing tier names, subject to final branding review; retain stable internal IDs independent of names.

### Decision 2 — Final launch prices

**Approved:** Keep Rs 800, Rs 2,500, and Rs 5,000 as historical hypotheses only. Approve actual launch amounts through a new versioned MUR price book after value, cost, provider, tax, refund, and margin validation.

### Decision 3 — Checkout activation

**Approved:** Keep production checkout disabled until an owner-approved price book, tax/accounting treatment, refund terms, and production payment provider/methods are ready.

### Decision 4 — Pricing structure

**Approved:** Use three complete one-time event packages, with Signature as the honestly recommended middle tier and no recurring consumer subscription.

### Decision 5 — Money and history

**Approved:** Store integer minor units plus ISO currency; use immutable versioned price books and purchase snapshots so later changes never rewrite historical purchases.

### Decision 6 — MUR and international price books

**Approved:** Use MUR as the primary Mauritius price book. Enable EUR/USD only through deliberate market-specific price books after provider, FX, settlement, tax, refund, sanctions, and accounting approval—not automatic MUR conversion.

### Decision 7 — Price transparency

**Approved:** Show total currency/amount, customer-payable tax treatment, important allowances, invitee capacity, hosting duration/start, branding, exclusions, refund summary, and one-time/no-renewal status before checkout; prohibit hidden fees and dark patterns.

### Decision 8 — Discounts

**Approved:** Default to one non-stackable, versioned, auditable discount per purchase. Keep planner, referral, affiliate, and broad promotional programmes inactive until separately approved.

### Decision 9 — Guest-capacity sales

**Approved:** Replace unapproved per-extra-guest metering with clear invitee-capacity packs. Never auto-charge overage or delete existing guest/RSVP data at the limit.

### Decision 10 — Hosting extensions

**Approved:** Offer only fixed-duration, explicitly purchased event hosting extensions with no automatic renewal or lifetime claim; exact units/prices follow entitlement and pricing validation.

### Decision 11 — Package upgrades

**Approved:** Allow same-event upward upgrades using an explicit SKU or compatible price-book difference/eligible-credit calculation. Preserve consumed usage/history, grant only the entitlement delta, and provide no automatic downgrade refund.

### Decision 12 — Add-ons

**Approved:** Limit MVP add-ons to approved guest-capacity packs, hosting extensions, and possibly bounded AI packs after economics/safety approval; never preselect them.

### Decision 13 — Taxes

**Approved:** Configure customer-payable tax only from qualified Mauritius accounting/tax advice, display it as legally required, and never pass business-level income/corporate tax to checkout merely because the business owes it.

### Decision 14 — Refund framework

**Approved:** Use the category-based framework in Section 18, require legal/provider review before public launch, honor mandatory rights, make refunds admin/support actions, and never delete original financial records.

### Decision 15 — Change-of-mind and subjective AI quality

**Approved:** Provide no automatic refund after publication or merely because an owner subjectively dislikes an AI output where the disclosed service operated; review pre-publication requests, genuine defects, platform failure, and mandatory rights case by case.

### Decision 16 — Planner pricing

**Approved:** Charge planners standard per-event packages initially; defer subscriptions, negotiated volume terms, prepaid credits, and automatic discounts until repeat demand and margin evidence exist.

### Decision 17 — Contribution-margin gate

**Approved:** Use an internal initial target of at least 60% event-level contribution margin in the forecast normal case and positive contribution under an approved stress case before broad launch; recalibrate with pilot evidence.

### Decision 18 — Pricing experiments

**Approved:** Permit controlled, non-deceptive, auditable pricing validation, preferring explicit pilot cohorts/interviews before complex A/B infrastructure and never altering an accepted paid price.

### Decision 19 — Administrative approval

**Approved:** Restrict price-book activation, discounts, refunds, market/currency enablement, and entitlement adjustments to authorized audited roles, with owner or second-person production approval where practical.

### Decision 20 — Excluded payment models

**Approved:** Exclude subscriptions, stored wallets/credits, cash, manual bank transfer, installments/BNPL, crypto, split payments, saved-card programmes, and automatic overage billing from MVP.

---

## 34. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.0.  
**Approved date:** 2026-08-17.  
**Owner decisions:** Decisions 1–20 approved as proposed.
