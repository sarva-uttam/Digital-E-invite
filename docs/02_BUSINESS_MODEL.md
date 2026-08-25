# Business Model

**File:** docs/02_BUSINESS_MODEL.md  
**Project:** AI Digital Invitation Platform  
**Status:** Approved  
**Version:** 1.1  
**Owner Decision:** Approved  
**Approval Date:** 16 August 2026  
**Document Type:** Business model and commercial strategy  
**Depends On:** docs/00_CLAUDE_RULES.md; docs/01_PROJECT_VISION.md; project/DECISIONS.md (DEC-025–DEC-028)  
**Last Updated:** 25 August 2026 — package architecture and pricing reconciled to `DEC-025`  

---

# 1. Purpose

This document defines how the platform creates, delivers, and captures value; structures commercial offers; controls variable costs; serves hosts and event planners; launches from Mauritius while remaining globally available; and validates commercial viability.

It does not finalize exact MVP functionality, package prices, entitlement quantities, providers, tax treatment, legal terms, supported payment countries, or final market price books. Detailed rules will later be maintained in product/PRICING_RULES.md, product/ENTITLEMENTS.md, product/AI_USAGE_RULES.md, and product/GUEST_RULES.md.

# 2. Binding Strategic Context

This model inherits these approved decisions:

- launch first in the Republic of Mauritius while remaining globally available;
- weddings as the primary launch category;
- direct hosts and event planners as primary customers;
- hosted invitation pages and RSVP collection as defining value;
- English primary, French secondary, Mauritian Kreol for Mauritian clients, and Russian in the long-term language vision;
- mobile-first, culturally respectful, privacy-conscious, provider-independent operation;
- AI as an enabling capability, not the sole value proposition;
- no evolution into a general-purpose design editor.

# 3. Approved Core Revenue Model

The initial model is a paid, self-service platform using **one-time event packages** with controlled AI usage, hosted invitation access, RSVP tools, guest allowances, and a small set of optional upgrades.

Ordinary hosts will not be required to maintain a recurring subscription. Most use the product for a time-limited event, so one event, one selected package, one payment, and defined inclusions are clearer and fairer.

Subscriptions may be considered later only for planners, agencies, businesses, or organizations that receive genuine recurring operational value.

# 4. Customer Segments

## 4.1 Direct Wedding Customers

Couples and families organizing weddings are the primary launch segment. Their needs may include cultural fit, multilingual wording, professional presentation, guest management, RSVP collection, and mobile sharing.

## 4.2 Individual Hosts

Hosts of birthdays, engagements, anniversaries, baby showers, graduations, religious ceremonies, and private celebrations are a long-term business-model direction, not current MVP scope. The MVP is wedding-only (`project/DECISIONS.md` `DEC-004`, reaffirmed `DEC-027`); these other host segments remain deferred candidates in `project/BACKLOG.md` and require an approved scope decision before any implementation.

## 4.3 Event Planners

Event planners are primary customers. Initially they will use per-event packages. Real repeat-use behaviour must be observed before introducing planner subscriptions, volume discounts, team workspaces, white-label features, or agency infrastructure.

## 4.4 Small Organizations

Community groups, religious organizations, schools, associations, and small businesses may use the platform without requiring enterprise event software.

## 4.5 Guests

Guests are non-paying but essential participants. They should receive an easy, trustworthy, mobile-friendly invitation and RSVP experience. Guest pages will not carry third-party advertising, and guest data will not be monetized through unrelated advertising.

# 5. Customer Value Exchange

Hosts pay for guided creation, reduced design effort, AI-assisted concepts and wording, controlled personalization, publishing, sharing, RSVP collection, guest organization, reliability, and professional presentation.

Planners pay for faster production, repeatable event workflows, predictable per-event pricing, client-ready results, and reduced tool fragmentation.

Guests provide limited response information in exchange for convenient access, clear event information, and simple RSVP submission. The platform must minimize guest data collection.

# 6. Revenue Sources

## 6.1 Event Packages

One-time event-package sales are the primary launch revenue source. A package may control invitation concepts, regenerations, AI refinements, visual quality, effects, language capabilities, branding treatment, guest capacity, hosting duration, support, and eligible customization.

## 6.2 Package Upgrades

Customers may upgrade an event. Upgrade calculations must be transparent, auditable, server-authoritative, and designed to prevent duplicate charging, lost entitlements, or quota abuse.

## 6.3 Limited Add-Ons

A small, understandable set of add-ons is approved in principle. Candidates include additional guest capacity, generation or refinement packs, hosting extensions, invitation variants, premium exports, branding removal where not included, and future premium support.

The base package must remain complete and useful. Add-ons must not disguise an intentionally unusable base product.

## 6.4 Planner Revenue

Planners initially purchase per-event packages. Prepaid credits, professional subscriptions, and volume terms are deferred until repeat demand and sustainable margins are demonstrated.

# 7. Package Architecture

A four-tier customer-facing structure is approved (`project/DECISIONS.md` `DEC-025`, superseding the earlier three-tier structure and the Essential/Signature/Premium naming direction):

1. Bronze — a complete, affordable entry option;
2. Silver — the mainstream option for smaller/medium weddings;
3. Gold — the clearly recommended, "Most Popular" middle option with premium motion and multilingual capability;
4. Platinum — the luxury/premium option.

Bronze, Silver, Gold, and Platinum are the approved final tier names.

Every tier must deliver a usable invitation. Higher tiers add concepts, refinements, quality, languages, effects, guest capacity, hosting duration, branding control, variants, and support, per the approved entitlement table in `DEC-025`.

# 8. Usage Claims

The platform will not advertise unlimited AI generation.

Approved wording may use a specific numerical allowance, extended allowance, generous allowance, or a documented fair-use policy. Any fair-use model must define expected use, abuse indicators, enforcement, customer notice, and review procedures.

Hidden limits must never be marketed as unlimited.

# 9. Approved Package Prices

The approved base MUR prices (`DEC-025`) are:

- Bronze: Rs 799;
- Silver: Rs 1,499;
- Gold: Rs 2,999;
- Platinum: Rs 5,999.

These are approved **catalog/price-book values**, not a production-payment activation — payment-provider selection, tax review, and the payment-integrity gates in `docs/08_PAYMENT_ARCHITECTURE.md` remain separately required before any customer can be charged. EUR/USD price books, discounts, and refund rules remain undecided. Any figure not in this list (including the superseded Rs 800/2,500/5,000 three-tier hypotheses) must not be treated as approved.

Additional guest capacity beyond a package's base capacity is priced at MUR 15 per additional guest, purchased as an explicit, confirmed add-on rather than an automatic overage (`DEC-026`).

# 10. Pricing Principles

Pricing is value-based and cost-aware. Customers pay for the complete outcome rather than raw AI usage.

Before payment, users must see the currency, package price, important limits, guest allowance, hosting duration, branding treatment, major AI allowances, applicable taxes where known, renewal status, and total amount.

Pricing, discounts, currency, taxes, entitlements, and upgrades must be server-authoritative. The client interface is never the source of truth.

Each transaction must preserve its price-book version, package version, currency, amount, discount, applicable tax information, entitlements, and timestamp. Later changes must not rewrite historical purchases.

# 11. Regional and Global Pricing

Mauritian customers should normally see Mauritian rupee pricing where supported.

International pricing will use deliberate market-specific price books rather than direct conversion from MUR. Price books may account for purchasing power, competition, taxes, fees, currency volatility, support costs, refunds, and local expectations.

Global visitors may purchase wherever payments, legal obligations, sanctions rules, language support, and operational capacity permit.

No final currency or market list may be approved until current official payment-provider capabilities and merchant eligibility are verified.

# 12. Currency Integrity

The business must distinguish display, charge, settlement, accounting, and refund currencies. Conversion behaviour must be disclosed where relevant.

Payment amount and currency must be independently verified by the server, consistent with Document 00.

# 13. Guest-Capacity Model

Each package will include a useful guest allowance with clear paid capacity upgrades.

The platform should warn hosts near limits, avoid surprise charges, preserve collected responses, never delete guest data solely because a limit is reached, and safely prevent additional usage when an enforceable limit is exceeded.

product/GUEST_RULES.md must distinguish guest records, households, invitees, plus-ones, RSVP submissions, and attendees.

# 14. Hosting Duration

Each package will include a defined hosting period rather than permanent hosting.

Later rules must define when the period starts, public behaviour after expiry, host archive access, extension pricing, retention, and deletion. Public hosting expiry and personal-data deletion are separate concepts.

Potential states include draft, paid-unpublished, published-active, expired, archived, extended, cancelled, and policy-removed.

# 15. Payment Position

A controlled, protected preview before payment is approved in principle, subject to server-side limits, abuse controls, and watermarking where appropriate.

Successful verified payment is normally required before final publication and full paid entitlements.

Deposits and split payments are deferred unless a future use case justifies the complexity.

# 16. Discounts and Promotions

Discounts may support launches, referrals, planner experiments, seasonal campaigns, and customer recovery.

Every discount must have an identifier, eligibility rule, validity window, price-book or currency scope, usage limit, stacking rule, audit record, and approval authority.

The platform will not use misleading permanent discounts or false countdowns. Planner discounts are not automatic at launch; volume and margin must be validated first.

# 17. Refund Direction

The final refund policy remains undecided until current official legal requirements and payment-provider rules are researched.

It must distinguish duplicate payment, technical failure, unauthorized payment, change of mind, partial consumption, publication failure, content-policy rejection, platform-caused loss, and fraud.

The system must support auditable refund states even before final public wording is approved.

# 18. Unit Economics

Each event is a commercial unit.

**Contribution margin = Net event revenue − event-level variable costs**

**Contribution margin percentage = Contribution margin ÷ net event revenue × 100**

Revenue may include packages, upgrades, capacity, usage packs, hosting extensions, and approved add-ons.

Variable costs may include AI text and image generation, processing, storage, bandwidth, communications, payment fees, conversion, refunds, chargebacks, support, moderation, fraud control, and absorbed taxes.

The platform should measure cost per concept, paid event, published invitation, and RSVP; payment and refund cost; support cost; and contribution margin by package, market, currency, and customer segment.

# 19. Cost Controls

Approved controls include:

- generation, regeneration, and refinement quotas;
- server-side rate limits;
- protected previews;
- quality and resolution limits where appropriate;
- duplicate-request prevention;
- provider timeout and retry limits;
- abuse detection;
- guest-capacity limits;
- hosting-duration limits;
- storage limits;
- administrative cost reporting.

A user-interface restriction without server enforcement is not a valid cost control.

# 20. Customer Acquisition

Mauritius launch channels may include Instagram, TikTok, Facebook, WhatsApp sharing, wedding content, referrals, local search, and partnerships with planners, photographers, decorators, venues, and vendors.

Published invitations may generate tasteful product-led awareness. Platform attribution must follow package entitlements and never expose private event information.

International acquisition should remain selective until payment success, language quality, support demand, compliance, conversion, refunds, and regional unit economics are understood.

# 21. Referrals

A future referral system may reward hosts, customers, planners, or approved partners through controlled credit, discounts, usage, or hosting benefits.

It must prevent self-referral, fake accounts, coupon leakage, duplicate attribution, reward fraud, and privacy violations. Referrals are not automatically part of the MVP.

# 22. Event-Planner Strategy

The business should validate planner event volume, per-event willingness to pay, client-approval needs, white-label demand, billing preferences, team needs, turnaround expectations, support requirements, ownership expectations, and whether the planner or client pays.

Approved sequence:

1. support planners with per-event packages;
2. observe repeat usage;
3. validate workflow problems;
4. introduce professional terms only when justified;
5. consider subscriptions only where recurring value exists.

# 23. Support and Operations

The platform should favour self-service while maintaining realistic payment and technical support paths.

Operational responsibilities may include customer support, reconciliation, refunds, moderation, fraud review, AI incidents, provider monitoring, localization review, quality control, disputes, privacy requests, accounting, compliance, and recovery oversight.

Support promises must match actual capacity and be included in package economics. The service will not advertise round-the-clock support unless it can reliably provide it.

# 24. Legal, Tax, and Compliance Research

Before live payments, official requirements must be checked for business registration, Mauritius tax and VAT, international digital services, invoicing, consumer protection, refunds, privacy, international transfers, merchant eligibility, currencies, sanctions, accounting, and record retention.

This document makes no legal or tax conclusion. Official sources and qualified advice must be used where needed.

# 25. Key Metrics

## Acquisition

Qualified visitors, channel, acquisition cost, leads, paying-customer cost, planner leads, and referral rate.

## Funnel

Event starts, questionnaire completion, concept generation, preview, checkout, payment, publication, first share, and first RSVP.

## Revenue

Gross sales, net revenue, average order value, package mix, upgrades, add-ons, market, currency, and planner revenue.

## Costs

AI cost, payment fees, hosting, support, refunds, chargebacks, and contribution margin.

## Product Value

Time to first concept, time to publication, paid-event publication rate, invitation-view success, RSVP completion, satisfaction, regeneration use, and support rate.

For occasional hosts, repeat purchases and referrals are more useful than conventional monthly retention. Planner and organization repeat purchases should be measured separately.

# 26. Required Commercial Validation

Before exact pricing is approved, test willingness to pay for hosted pages and RSVP tools; comprehension of three tiers; the three historical price hypotheses; guest allowances; branding sensitivity; hosting duration; generation limits; planner credits and subscriptions; local and international pricing; payment preferences; language value; preview conversion; and customer understanding of the complete service.

Experiments and evidence must be recorded rather than treated as informal impressions.

# 27. Principal Risks

Risks include low willingness to pay, AI cost volatility, weak output quality, payment limitations, cultural errors, seasonal demand, excessive support, refunds and chargebacks, global compliance, planner-driven scope expansion, and overcomplicated pricing.

Responses include early validation, provider abstraction, server-side limits, unit-economics monitoring, protected previews, factual user control, deliberate market rollout, official provider research, transparent terms, and planner research before professional-suite expansion.

# 28. MVP Commercial Boundaries

The commercial MVP should include:

- a small four-tier package set;
- one-time event purchases;
- clear versioned entitlements;
- server-authoritative pricing;
- verified payment;
- controlled AI usage;
- one primary checkout flow;
- auditable payment and refund states;
- guest allowances;
- hosting durations;
- administrative support controls;
- basic commercial analytics.

It should normally exclude complicated subscriptions, enterprise contracts, affiliate networks, marketplaces, revenue sharing, multi-level referrals, dynamic pricing, many currencies, premature tax automation, uncontrolled usage, advanced planner billing, and reseller infrastructure.

# 29. Deferred Opportunities

Deferred possibilities include planner subscriptions, event-credit bundles, white-label plans, business accounts, reusable brand kits, human design or translation review, custom domains, vendor partnerships, template marketplaces, corporate plans, printing partnerships, and related event services.

None is approved for the MVP merely by appearing here.

# 30. Approved Commercial Decisions

The owner approved these decisions on 16 August 2026:

1. One-time event packages are the main launch revenue model.
2. Ordinary hosts will not require recurring subscriptions.
3. The platform will use three customer-facing tiers.
4. Silver, Gold, and Platinum are working labels only; value-oriented final names are preferred.
5. Rs 800, Rs 2,500, and Rs 5,000 remain unapproved hypotheses.
6. A protected limited preview before payment is approved in principle.
7. Verified payment is normally required before final publication.
8. Packages include guest allowances with paid capacity upgrades.
9. Packages include defined hosting durations rather than permanent hosting.
10. Planners initially purchase per-event packages.
11. Planner subscriptions are deferred until repeat behaviour is validated.

**Superseded on 2026-08-25:** Decisions 3–5 above (three-tier structure, Silver/Gold/Platinum-as-working-labels-only, and the Rs 800/2,500/5,000 hypotheses) are superseded by `project/DECISIONS.md` `DEC-025`: the approved structure is now four tiers — Bronze, Silver, Gold, Platinum — as final names, with approved base MUR prices of 799/1,499/2,999/5,999. This historical record is preserved unedited above per the repository's append-only decision convention; `DEC-025` is authoritative going forward.
12. International pricing uses market-specific price books rather than direct MUR conversion.
13. Guest-facing pages will not contain third-party advertising.
14. The platform will avoid unlimited AI-generation claims.
15. A small, understandable set of add-ons may be offered.
16. Planner discounts are not automatic at launch.
17. Global customers may purchase where payment and legal requirements are supported.
18. The final refund policy awaits official legal and payment-provider research.

# 31. Decision Framework

A commercial proposal must create clear value, fit the invitation journey, be understandable before payment, be enforceable, have measurable cost, preserve sustainable margins, respect privacy and culture, fit supported markets, avoid unjustified operational burden, and remain consistent with Documents 00 and 01.

# 32. Approval Record

**Owner Decision:** Approved  
**Approval Date:** 16 August 2026 (package architecture and pricing reconciled 25 August 2026 per `DEC-025`)  
**Approved Version:** 1.1  
**Authority:** Approved source-of-truth document under the hierarchy established by docs/00_CLAUDE_RULES.md.
