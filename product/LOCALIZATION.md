# Localization

**File:** `product/LOCALIZATION.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.0  
**Approved date:** 2026-08-17  
**Depends on:** approved `docs/00_CLAUDE_RULES.md` through `docs/13_ROADMAP.md` and approved `product/PRICING_RULES.md`, `product/ENTITLEMENTS.md`, `product/AI_USAGE_RULES.md`, and `product/GUEST_RULES.md`

---

## 1. Purpose

This document defines how the platform handles interface language, invitation content language, locale selection, translation, dates, times, numbers, currencies, names, URLs, legal copy, accessibility, and language activation.

The platform launches operationally from Mauritius but is globally available. Localization must therefore support Mauritius correctly without treating the rest of the world as unsupported or forcing Mauritian assumptions on international customers.

---

## 2. Approved language direction

The owner has established this product direction:

1. English is the primary/default language.
2. French is the second language.
3. Mauritian Kreol is specifically required for Mauritian customers.
4. Russian is included in the product’s global language direction.
5. Global availability does not mean every language, currency, payment method, or tax treatment is active on day one.

Language support is activated by capability and quality, not by marketing intent alone.

---

## 3. Separate localization surfaces

The platform must distinguish:

### 3.1 Product interface language

Navigation, forms, buttons, errors, settings, checkout explanations, dashboard labels, help, accessibility text, and system notifications.

Interface language is never package-restricted.

### 3.2 Invitation content language

The host-created title, body, event wording, RSVP instructions, guest-facing custom messages, and translations published for an invitation.

Simultaneously published invitation languages are package entitlements:

- Essential: 1;
- Signature: 2;
- Premium: 3.

### 3.3 Transactional communication language

Payment confirmations, receipts, support messages, account/security messages, delivery messages, and RSVP confirmations.

### 3.4 Legal language

Terms, privacy notices, consent text, refund disclosures, tax/payment disclosures, data-rights notices, and legally significant confirmations.

Legal translations require separate review and cannot be assumed valid because ordinary interface text was translated.

---

## 4. Locale identifiers

Use standards-based locale identifiers internally and at application boundaries.

| Language | Canonical locale direction | Notes |
|---|---|---|
| English | `en` with regional variants such as `en-MU` where needed | default/fallback |
| French | `fr` with `fr-MU` where materially different | second language |
| Mauritian Kreol | `mfe` | do not label as generic Creole |
| Russian | `ru` | activates after its own gates |

Store language and region separately when business rules need both. Do not overload one locale string as proof of residence, nationality, tax location, billing country, timezone, or currency eligibility.

---

## 5. Activation stages

### 5.1 Initial production activation proposal

- English interface and invitation content: required at launch.
- French interface and invitation content: required at launch.
- Mauritian Kreol guest-facing invitation/RSVP content: required for Mauritius launch after native review; interface coverage may activate progressively only where clearly disclosed and never through misleading partial language selection.
- Russian interface and invitation content: required roadmap capability, activated after complete translation, native review, typography, support, legal, AI, and regression gates pass.

### 5.2 Meaning of “supported”

A language may be advertised as supported only when the promised surfaces are explicitly defined and production-ready.

The product must distinguish labels such as:

- “Interface available in…”;
- “Invitation content available in…”;
- “AI generation available in…”;
- “Support available in…”;
- “Legal documents available in…”.

One capability does not imply all others.

---

## 6. Default and fallback language

English is the canonical source and ultimate fallback for product-interface strings.

Fallback is deterministic:

1. exact requested locale, such as `fr-MU`;
2. base language, such as `fr`;
3. English canonical string;
4. safe error identifier if even the canonical string is unavailable.

The UI must not display raw translation keys in production. Missing translations create telemetry and release-quality failures.

Invitation content does not silently fall back to a different published language. If a requested invitation variant is unavailable, show a clear language selector/fallback approved by the host rather than mixing languages invisibly.

---

## 7. Locale selection

For an authenticated host, the selection order should be:

1. explicit saved interface preference;
2. explicit current-session choice;
3. supported browser-language preference;
4. English fallback.

For an accountless guest:

1. explicit choice stored safely for that browser/party;
2. party-preferred language if that published variant exists;
3. host-designated default invitation language;
4. English interface fallback around the invitation.

IP geolocation may offer a non-authoritative suggestion but must never silently determine language, country, currency, tax, nationality, or eligibility.

The language selector remains visible and keyboard-accessible wherever more than one relevant option is available.

---

## 8. Persistence and scope

- Host interface preference is account-level with session override.
- Event source language and published invitation languages are event/version-level.
- Party-preferred language is party-level and optional.
- Guest browser selection may override presentation for that guest but cannot create an unentitled invitation translation.
- Transactional communication records the language/template version actually sent.
- Changing interface language does not alter stored invitation content.
- Changing the event’s source language does not silently overwrite existing translations.

---

## 9. Invitation language slots

The package limit counts simultaneously published invitation content variants, not interface languages and not drafts.

- A language variant contains a complete coherent set of required invitation fields.
- A draft translation may be prepared before publication without exceeding the published-slot limit, subject to reasonable storage/abuse controls.
- Publishing a new variant beyond the limit requires replacing/deactivating an existing one or upgrading.
- Deactivating a variant does not delete its version history.
- Manually entered translations consume no AI unit.
- AI-generated translations follow `AI_USAGE_RULES.md`.

The active-language set is frozen into every publication snapshot.

---

## 10. Source content and translation state

Every translatable invitation field has:

- source locale;
- source text/version;
- target locale;
- translated text/version;
- origin: human, AI-assisted, imported, reviewed fallback, or system template;
- review state;
- stale/current state relative to the source;
- actor and timestamps.

Translation states are:

- `MISSING`;
- `DRAFT`;
- `NEEDS_REVIEW`;
- `APPROVED`;
- `STALE`;
- `PUBLISHED`;
- `ARCHIVED`.

Changing source content marks affected translations stale. It never silently republishes machine-updated text.

---

## 11. Translation workflow

For invitation content:

1. the host creates or confirms source content;
2. the host chooses an entitled activated target language;
3. the host enters a translation manually or requests AI assistance;
4. the platform preserves authoritative facts and validates structure;
5. the host reviews the full rendered variant;
6. the host explicitly approves it for publication;
7. the publication snapshot records exact versions.

The host remains able to edit all generated text manually. The system must not describe AI translation as certified, professional, legal, religiously authoritative, or error-free.

---

## 12. Mauritian Kreol (`mfe`)

Mauritian Kreol must be named clearly as **Mauritian Kreol** in English and with an approved self-name in localized UI. Do not use a generic “Creole” label that could mean another language.

Before activation:

- define and version a project style guide;
- use native Mauritian reviewers;
- standardize common invitation and RSVP terminology;
- test formal and informal registers;
- preserve names, venue details, dates, and cultural terms;
- verify fonts and diacritics;
- test mobile layouts and speech/assistive technology;
- provide an owner-editable reviewed fallback where AI confidence is inadequate.

The product must not imply that all Mauritian customers prefer Kreol. It is an option, not an identity inference.

---

## 13. Russian (`ru`)

Russian is a required planned language, not an abandoned or optional idea. It activates only when the relevant product surfaces meet production standards.

Requirements include:

- complete Cyrillic font coverage and fallback;
- native review of interface and invitation terminology;
- plural, gender, case, name, and formal-address handling;
- long-text and button-layout testing;
- date/time/number formatting tests;
- support and legal-surface scope clearly disclosed;
- AI-generation and moderation evaluation in Russian;
- payment, market, sanctions/compliance, and customer-support review where Russian-market operation is contemplated.

Russian language availability alone must not be interpreted as availability in every Russian-speaking country or as approval of a particular payment/market route.

---

## 14. French

French is a launch-required second language.

- Use reviewed neutral international French with Mauritius-specific wording only where appropriate.
- Avoid literal English calques and inconsistent formality.
- Define a consistent `vous`-based interface register unless research approves another choice.
- Preserve names and user-entered event terms.
- Verify apostrophes, non-breaking spaces, punctuation, accents, and longer text expansion.
- Do not assume all French users use Mauritius formats or MUR.

---

## 15. English

English is the canonical product-source language and fallback.

- Source strings must be clear, plain, concise, and free from culture-specific idioms where possible.
- Do not assemble sentences from fragments that cannot be translated grammatically.
- Do not use English text embedded in images.
- Regional spelling and terminology may use controlled variants, but the canonical source must remain consistent.
- English being primary does not make it authoritative for host-entered names or translated invitation content.

---

## 16. Names, honorifics, and forms of address

- Support Unicode names without requiring first-name/last-name decomposition.
- Provide a full display-name field and optional structured fields only where useful.
- Never infer gender, marital status, title, religion, caste, ethnicity, nationality, or language from a name.
- Do not automatically transliterate names.
- Hosts/guests may provide approved localized or transliterated display forms explicitly.
- Honorifics remain optional and locale-aware.
- Sorting/search normalization must not overwrite original display text.

---

## 17. Dates

Store authoritative instants/dates in typed machine formats, not localized display strings.

- Use ISO 8601-compatible storage/transport.
- Render dates with a locale-aware formatter.
- Mauritius-oriented display may use `DD/MM/YYYY`, but ambiguous numeric-only dates should be avoided in invitations where a month name is clearer.
- Do not assume `MM/DD/YYYY` for global customers.
- Preserve the event’s intended local calendar date independently of the viewer’s device timezone.
- Validate impossible dates and clarify date order on manual entry.

---

## 18. Time and timezone

- Store the event timezone using an IANA timezone identifier.
- Default Mauritius-created events may be suggested `Indian/Mauritius`, never silently forced.
- Store event local time plus timezone and derive UTC instants where applicable.
- Display the event time in the event timezone by default.
- If showing a viewer-converted time, label both clearly and do not replace the event’s official time.
- Support locale-appropriate 12/24-hour display without changing the underlying time.
- Handle daylight-saving transitions for global locations through timezone data, not fixed offsets.

---

## 19. Numbers and quantities

Numbers are stored in locale-neutral numeric types and displayed through locale-aware formatting.

- Do not parse business values from formatted display strings.
- Respect decimal/group separators.
- Guest counts remain integers and must not be reformatted ambiguously.
- Use localized plural rules rather than English singular/plural concatenation.
- Avoid hard-coded word order around numbers.

---

## 20. Currency

Currency and language are independent.

- MUR is the primary/base commercial currency.
- EUR/USD checkout activates only through approved market-specific price books and payment/accounting rules.
- Selecting French or Russian does not select EUR, USD, a country, or tax treatment.
- Currency displays always use the authoritative ISO 4217 code and amount from the server-side price snapshot.
- Use locale-aware formatting while retaining clarity, especially where symbols are ambiguous.
- Checkout, receipt, refund, and tax copy must use the transaction’s frozen currency and approved legal wording.

---

## 21. Addresses and telephone numbers

- Address fields must support international free-form/structured combinations without imposing Mauritius-only administrative divisions.
- Do not validate every global address against one national format.
- Preserve Unicode and multiline formatting safely.
- Map links use approved normalized coordinates/URLs without exposing private data unnecessarily.
- Telephone numbers support international country codes and use a well-maintained parsing strategy at implementation time.
- Do not infer interface language, nationality, residence, tax status, or invitation locale from an address/number alone.

---

## 22. URLs and routing

The interface may use locale-prefixed routes such as `/en`, `/fr`, `/mfe`, and `/ru` where the routing architecture supports stable localized URLs.

- A locale segment indicates presentation language only.
- Canonical/hreflang rules apply to public marketing pages when indexed.
- Private invitations remain `noindex` and token rules must not leak through canonical/alternate tags.
- Event slugs remain stable across language changes where practical.
- Never include guest names, contact data, currency, or inferred country in URLs.
- Unknown locale routes fall back safely without redirect loops.

---

## 23. Search and sorting

- Search supports Unicode and safe normalization.
- Accent-insensitive matching may be offered without modifying stored names.
- Locale-aware collation is used for display where supported.
- Exact identifiers/contact matching uses normalized dedicated fields, not display collation.
- Russian Cyrillic and Latin names are not automatically considered the same person.
- Mauritian Kreol/French variations must not trigger unsafe automatic guest merging.

---

## 24. Typography and layout

All selected fonts must cover the activated language scripts and required symbols.

- Provide tested Latin and Cyrillic fallbacks.
- Avoid text embedded in generated decorative imagery.
- Support at least 30–50% text expansion without clipping critical controls.
- Use flexible containers rather than fixed-width buttons.
- Verify line breaking, punctuation, diacritics, uppercase transformations, and mixed-language names.
- Never shrink essential text below accessibility limits merely to fit a design.

Right-to-left layout is not required for the current four-language scope, but the data and component architecture should avoid assumptions that make later RTL support impossible.

---

## 25. Accessibility

Localization must preserve:

- correct document/element language attributes;
- meaningful labels and error associations;
- keyboard navigation and focus order;
- screen-reader-readable dates, times, currency, and status;
- sufficient contrast and scalable text;
- non-colour status cues;
- plain-language instructions;
- accessible language selector names.

Alternative text and ARIA labels are translatable source-controlled strings. Decorative generated imagery uses appropriate empty alternative text where it conveys no essential information.

---

## 26. System messages and errors

- Error codes are stable and locale-neutral internally.
- User-facing messages are translated at the presentation boundary.
- Do not expose provider/stack/database details in any language.
- Avoid inserting unescaped user content into translation strings.
- Parameter names and grammatical structure must support reordering and plural/select rules.
- Safety, payment, privacy, and destructive-action warnings require reviewed translations before that surface is activated.

---

## 27. Emails and transactional templates

Every activated transactional template records:

- locale;
- template/version;
- subject and body variants;
- required legal/footer version;
- fallback behavior;
- provider rendering test evidence.

Security-critical emails fall back to reviewed English if a locale template is unavailable, with a clear language label; they must not fail to send solely because a non-critical translation is missing.

Payment receipts/invoices and legal communications use only reviewed language variants approved for the applicable market.

---

## 28. Legal and policy translations

- English is the canonical drafting language unless counsel specifies otherwise.
- A localized legal document must identify its version/effective date and whether another version controls in a conflict, subject to legal approval.
- Machine translation alone is insufficient for production legal text.
- Consent cannot be validly requested in a language/surface that omits material information.
- Checkout must not activate for a market until mandatory pricing, tax, refund, payment, and privacy disclosures are available in the required approved language(s).

Qualified counsel must approve language precedence and consumer-law requirements before launch.

---

## 29. Translation source management

- Interface strings live in version-controlled locale resources.
- English source keys are stable semantic identifiers, not entire mutable sentences where avoidable.
- Runtime edits to production translations require the same review/audit discipline as code/config changes.
- No untranslated user-facing strings are hard-coded outside the localization system except safe emergency fallbacks.
- Duplicate concepts use shared glossary terms.
- Removed keys are detected and cleaned deliberately.
- Translation resources contain no secrets or customer data.

---

## 30. Glossary and style guides

Maintain a versioned glossary for each language covering at minimum:

- invitation/event;
- host;
- guest/invitee/party;
- RSVP/attendance statuses;
- plus-one;
- publish/unpublish;
- preview/concept/refinement;
- package/upgrade/add-on;
- payment/refund/tax;
- privacy/security/account;
- date/time/deadline;
- Mauritian cultural/religious terminology where used.

Each language guide defines tone, formality, capitalization, punctuation, prohibited ambiguity, and fallback terms.

---

## 31. Human review

Human review is mandatory for:

- complete interface activation;
- Mauritian Kreol terminology and customer-facing copy;
- Russian activation;
- checkout/payment/refund/tax copy;
- privacy, consent, terms, rights, and security messages;
- cultural/religious motifs and wording;
- transactional communication templates;
- marketing claims.

Reviewers must be competent in the target language and product context. Community feedback may improve copy but does not replace accountable approval.

---

## 32. AI localization

AI may assist invitation content only under `AI_USAGE_RULES.md`.

- Interface and legal translations are curated/version-controlled, not generated live per request.
- AI output preserves structured factual fields.
- AI translation origin is recorded and requires host review before publication.
- Low-confidence `mfe` output may use reviewed fallback or require manual editing.
- Russian AI generation remains disabled until Russian-specific moderation and quality evaluations pass.
- Provider availability in a language does not prove product readiness.

---

## 33. Analytics and privacy

Locale analytics may record non-identifying language/region capability usage where consent/lawful basis permits.

Do not use language choice to infer or profile:

- ethnicity;
- religion;
- nationality/citizenship;
- political view;
- migration status;
- precise location;
- financial eligibility.

Avoid combining rare locale/event signals in ways that re-identify guests. Analytics must not capture invitation text, guest names, private URLs/tokens, or RSVP content.

---

## 34. Testing requirements

Tests must cover:

- locale selection, persistence, fallback, and invalid locale handling;
- interface versus invitation-language independence;
- exact 1/2/3 published invitation-slot enforcement;
- stale translation detection and explicit publication approval;
- English, French, `mfe`, and Russian Unicode/typography behavior;
- Cyrillic fonts, French punctuation, Kreol terminology, and mixed-script names;
- long text, small screens, zoom, keyboard, and screen readers;
- plural/select grammar and reordered variables;
- dates around timezone/day boundaries and daylight-saving regions;
- `DD/MM` versus `MM/DD` ambiguity;
- 12/24-hour display;
- number, decimal, grouping, MUR/EUR/USD formatting;
- currency/language/country independence;
- international addresses and telephone numbers;
- localized routes, SEO for public pages, and noindex/privacy for invitations;
- HTML/script injection through variables and translations;
- missing/obsolete/duplicate keys;
- emails, PDFs/receipts if used, and provider rendering;
- legal/safety/payment strings present before surface activation;
- AI factual preservation and unsupported-language rejection.

---

## 35. Language activation gates

A language/surface activates only when:

1. scope is explicitly defined;
2. translation coverage is complete for that scope;
3. glossary/style guide is approved;
4. native/contextual review passes;
5. typography and responsive layout pass;
6. accessibility tests pass;
7. date/time/number/currency behavior passes;
8. security, privacy, payment, and destructive warnings are reviewed;
9. transactional/legal templates required for the target market are approved;
10. AI quality/moderation gates pass if AI is advertised;
11. support capability and fallback are honestly disclosed;
12. monitoring and rollback exist.

A failed gate disables only the unready capability/language surface; it must not damage existing published invitations.

---

## 36. Explicitly excluded from MVP

- automatic activation of every browser language;
- claiming full Russian support before activation gates pass;
- live AI translation of interface/legal/payment text;
- language inferred solely from IP, name, phone, address, or nationality;
- currency/tax/payment eligibility inferred from interface language;
- automatic transliteration of names;
- silent mixed-language invitation fallback;
- unreviewed Mauritian Kreol or cultural terminology;
- right-to-left language activation;
- custom host-created interface translations;
- language-specific package pricing without an approved market price book;
- SEO indexing of private invitations or guest-personalized variants.

---

## 37. Approved owner decisions

### Decision 1 — Global scope

**Approved:** Keep the platform globally available while launching operations from Mauritius; treat languages, currencies, payments, taxes, and markets as separately activated capabilities.

### Decision 2 — Primary languages

**Approved:** Use English as the canonical primary/default language and French as the launch-required second language.

### Decision 3 — Mauritian Kreol

**Approved:** Require Mauritian Kreol (`mfe`) for Mauritius guest-facing invitation/RSVP content after native review, with interface scope activated only when complete and honestly labelled.

### Decision 4 — Russian

**Approved:** Keep Russian (`ru`) as a required global product language and activate its interface/invitation/AI/support/legal surfaces separately only after their specific quality and operational gates pass.

### Decision 5 — Interface entitlement

**Approved:** Make every activated interface language available to every user without package restriction.

### Decision 6 — Invitation slots

**Approved:** Count only simultaneously published invitation content variants against the approved Essential 1, Signature 2, Premium 3 limits; do not count interface languages or drafts.

### Decision 7 — Locale identifiers

**Approved:** Use standards-based `en`, `fr`, `mfe`, and `ru` identifiers with regional variants only where materially required; keep language separate from country and market facts.

### Decision 8 — Locale selection

**Approved:** Prefer explicit saved choice, then session choice, then supported browser preference, then English; use IP only for optional non-authoritative suggestions.

### Decision 9 — Invitation fallback

**Approved:** Never silently mix or replace invitation content languages; use the host’s published default and an explicit selector/fallback.

### Decision 10 — Translation workflow

**Approved:** Version source and target content, mark translations stale after source changes, and require explicit host review/approval before publication.

### Decision 11 — AI translation

**Approved:** Include entitled requested translations in the original concept, count later AI translation as a refinement, keep manual translation free, and never generate interface/legal translation live.

### Decision 12 — Names

**Approved:** Support Unicode full display names, optional honorifics/localized forms, no forced Western name structure, no automatic transliteration, and no identity inference.

### Decision 13 — Dates and time

**Approved:** Store typed ISO-compatible values plus IANA event timezone, display in the event timezone by default, suggest `Indian/Mauritius` only for Mauritius flows, and avoid ambiguous numeric dates.

### Decision 14 — Currency independence

**Approved:** Keep language independent of currency, tax, country, and payment eligibility; display only server-authoritative MUR/EUR/USD price snapshots through locale-aware formatting.

### Decision 15 — Routes

**Approved:** Use stable locale-aware routing where the chosen framework supports it, apply SEO alternates only to indexable public pages, and keep all private invitation variants noindex.

### Decision 16 — Typography

**Approved:** Require full activated-script font coverage, Latin/Cyrillic fallbacks, flexible layouts for text expansion, no essential text embedded in generated images, and no inaccessible shrinking.

### Decision 17 — Legal translations

**Approved:** Treat English as the canonical drafting language unless counsel decides otherwise; require qualified review and market-specific completeness before localized legal/checkout activation.

### Decision 18 — Translation management

**Approved:** Keep interface resources, glossaries, and style guides version-controlled; prohibit secrets/customer data and detect missing, hard-coded, obsolete, and duplicate strings.

### Decision 19 — Analytics

**Approved:** Collect only privacy-approved non-identifying locale usage and prohibit inference/profiling of ethnicity, religion, nationality, politics, migration status, or eligibility from language.

### Decision 20 — Activation gates

**Approved:** Advertise a language only for explicitly defined surfaces that pass coverage, native review, typography, accessibility, formatting, security/privacy/payment/legal, AI, support, monitoring, and rollback gates.

---

## 38. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.0.  
**Approved date:** 2026-08-17.  
**Owner decisions:** Decisions 1–20 approved as proposed.
