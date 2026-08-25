# Owner Vision V2 — Autonomous Product Rebuild

**Status:** Owner-authorized and authoritative, as reconciled 2026-08-25  
**Effective date:** 2026-08-25  
**Supersedes:** conflicting package and routine-approval assumptions in the v1 documentation  
**Reconciled by:** `project/DECISIONS.md` `DEC-025`–`DEC-028` (2026-08-25) — the MVP launch scope below is wedding-only, not multi-occasion; the earlier "launches with... and is deliberately extensible to [other occasions]" wording described the *architecture's* extensibility, not approved MVP launch scope, and is corrected accordingly. Package names and the autonomous-execution mandate below remain authoritative.

## Product promise

Create the easiest way for a host to turn an idea into a beautiful, hosted, shareable digital invitation and guest experience. **The MVP is wedding-only** (`DEC-004`, reaffirmed `DEC-027`): weddings are the sole customer-reachable occasion at launch, including Hindu, Muslim, Christian, interfaith, civil, and non-religious paths selected explicitly by the customer. The underlying architecture and catalogue data model are deliberately designed to extend later to engagements, birthdays, religious celebrations, holidays, trips, hotel offers, corporate occasions, and other invitation-led experiences — but those remain future, backlog-gated expansion candidates (`project/BACKLOG.md`), not current MVP scope, and must not be selectable or linked anywhere a customer can reach.

The product replaces the cost and friction of printing and distributing physical cards with a guided digital flow:

1. discover the platform through compelling examples;
2. start a wedding invitation (the sole MVP occasion; `DEC-027`);
3. answer a short visual and factual questionnaire;
4. select a package;
5. generate a bounded AI-assisted concept;
6. edit and verify facts;
7. import or add guests;
8. pay through a verified checkout;
9. publish a memorable link;
10. share it through messaging and social platforms;
11. collect RSVPs and manage responses.

## Experience principles

- Weddings receive the deepest launch experience, including Hindu, Muslim, Christian, interfaith, civil, and non-religious paths selected explicitly by the customer.
- AI assists with copy, composition, palette, decorative media, and variants; it must not invent dates, names, venues, relationships, prices, or cultural facts.
- Every invitation is responsive, accessible, performant, and beautiful on a phone.
- Higher tiers increase creative richness and personalization, never security or privacy.
- Platinum is the signature experience: premium art direction, layered two-dimensional motion, optional ambient decoration, guest-name personalization, richer music treatment where licensing allows, and advanced bespoke requests.
- Motion must respect reduced-motion preferences. Music never autoplays with sound without a guest action.
- Guest names and private invitation tokens are confidential data.
- Users may preview before committing, but final publication, premium exports, and entitlements follow verified payment truth.

## Packages

The commercial ladder is Bronze, Silver, Gold, and Platinum, with owner-approved entitlements and base MUR prices recorded in `project/DECISIONS.md` `DEC-025` (799/1,499/2,999/5,999), and an explicit MUR 15/guest capacity add-on (`DEC-026`).

- **Bronze:** elegant essentials, one concept, core hosted invitation, standard sharing, RSVP basics.
- **Silver:** richer themes, more concepts and refinements, enhanced sections and guest capacity.
- **Gold:** premium motion, richer personalization, multilingual options, advanced guest tools.
- **Platinum:** highest-fidelity art direction, named guest experiences, bespoke premium elements, priority handling, and the broadest allowed customization.

Feature limits are configuration and entitlement data, not scattered UI conditionals. Add-ons must be explicit and never surprise-charge a customer.

## Sharing truth

The platform provides a memorable hosted URL, preview metadata, a QR code, and editable share-message suggestions such as “There is a little surprise for you — tap to open.” Third-party apps control how previews and link text render; the product must never promise that WhatsApp, Instagram, Facebook, VK, or another platform will replace a raw URL with arbitrary anchor text.

## Autonomous execution mandate

Routine implementation no longer waits for approval after every document or task. The development agent may research, design, implement, test, refactor, document, open pull requests, and continue through dependency-safe work.

The agent must still stop before:

- spending money or accepting paid provider terms;
- handling real production credentials or customer data;
- making legal, tax, refund, or regulatory commitments;
- activating a production provider, public deployment, payment acceptance, or customer launch;
- destructive or irreversible data operations;
- materially changing the owner's core product promise.

Where older documents conflict with this file, this file wins. Non-conflicting security, privacy, payment-truth, accessibility, auditability, and testing requirements remain binding.
