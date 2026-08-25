# Design System

**File:** `docs/10_DESIGN_SYSTEM.md`  
**Project:** AI Digital Invitation Platform  
**Status:** Approved — Owner Approved  
**Version:** 1.1  
**Approved date:** 2026-08-17 (package-count reference reconciled 2026-08-25 per `DEC-025`)  
**Depends on:** `docs/00_CLAUDE_RULES.md` through `docs/09_SECURITY_ARCHITECTURE.md`; `project/DECISIONS.md` (DEC-025)

---

## 1. Purpose

This document defines the visual, interaction, responsive, accessibility, and component rules for the MVP.

It governs two related but distinct systems:

1. **Product interface:** the account, event builder, checkout, guest-management, RSVP-management, and administration experience.
2. **Invitation renderer:** the controlled theme system used to produce customer-facing invitations.

The product interface must remain stable, clear, and accessible. Invitation themes may be expressive, but only through validated tokens and components—not arbitrary AI-generated code.

---

## 2. Experience principles

### 2.1 Elegant, not intimidating

The platform should feel premium enough for weddings without becoming visually heavy or difficult to use. Decorative richness belongs mainly in invitations; task interfaces remain calm and focused.

### 2.2 Mobile first

Mauritian owners, planners, and guests are expected to use phones heavily. Every critical flow is designed for a narrow viewport and touch before desktop enhancement.

### 2.3 Clear before clever

Names, dates, venues, prices, payment state, entitlements, RSVP status, validation errors, and next actions must be immediately understandable. Decorative language never obscures facts.

### 2.4 Culturally flexible

The system supports owner-chosen cultural and religious expression without assigning one “Mauritian wedding look.” Neutral elegance is always available.

### 2.5 Accessible by default

Accessibility is part of component acceptance, not a final audit patch.

### 2.6 Reversible and reassuring

Editing, previewing, regenerating, paying, publishing, and unpublishing must communicate consequences. Destructive or chargeable actions require clear confirmation.

---

## 3. Accessibility baseline

Target **WCAG 2.2 Level AA** for the product interface, public invitations, and accountless RSVP flows.

Required practices include:

- semantic HTML and landmarks;
- logical heading hierarchy;
- complete keyboard operation;
- visible focus indicators;
- meaningful accessible names;
- labels and instructions that remain available after input;
- error identification and recovery guidance;
- contrast that meets WCAG requirements;
- no information conveyed by colour alone;
- zoom/reflow without loss of content or functionality;
- support for screen readers and browser text resizing;
- captions/transcripts for any future meaningful media;
- reduced-motion behavior;
- target sizes meeting WCAG 2.2 minimums, with a product target of at least 44×44 CSS pixels for primary touch controls where practical;
- accessible authentication compatible with password managers and paste;
- no drag-only interaction;
- no keyboard or focus traps.

Automated checks support but do not replace keyboard, screen-reader, zoom, high-contrast, reduced-motion, and human usability testing.

---

## 4. Product visual direction

The proposed product aesthetic is:

- refined;
- warm;
- modern;
- trustworthy;
- celebratory without being childish;
- globally understandable with subtle Mauritian hospitality.

The dashboard should not visually imitate a wedding invitation. It uses a restrained neutral foundation and one warm accent family. Customer invitation content remains the visual focus.

### 4.1 Proposed product palette

Final colours must be verified in real components for contrast.

| Token | Proposed role | Reference value |
|---|---|---|
| `color.canvas` | application background | `#FAF8F5` |
| `color.surface` | cards and panels | `#FFFFFF` |
| `color.surface.subtle` | secondary sections | `#F3EFEA` |
| `color.text` | primary text | `#211D1A` |
| `color.text.muted` | secondary text | `#625B55` |
| `color.border` | default border | `#D8D0C8` |
| `color.brand` | primary action | `#7A3145` |
| `color.brand.hover` | primary hover | `#612536` |
| `color.brand.soft` | selected/soft accent | `#F2E4E8` |
| `color.focus` | focus ring | `#155EEF` |
| `color.success` | confirmed/success | `#18794E` |
| `color.warning` | caution/pending | `#9A6700` |
| `color.danger` | destructive/error | `#B42318` |
| `color.info` | informational | `#175CD3` |

Reference values are starting tokens, not permission to place any foreground on any background. Each pairing must pass the contrast test for its text/non-text use.

### 4.2 Dark mode

Dark mode is not required for MVP. The token system must avoid blocking a later dark theme, but the team must not create an incomplete dark mode that fails invitation preview, payment, or accessibility requirements.

---

## 5. Typography

Use a small, licensed, performance-conscious font set.

### Product interface

Use a highly readable sans-serif variable font with broad Latin/diacritic coverage and reliable system fallbacks. Proposed family: **Inter** or an implementation-time equivalent after licensing and rendering checks.

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
```

### Invitation themes

Themes may pair a readable body face with one controlled display face. Every approved font must:

- have appropriate web-use licensing;
- cover required characters for English, French, and Mauritian Kreol;
- define robust fallbacks;
- be self-hosted or loaded through an approved privacy/performance route;
- avoid unreadable decorative use for factual details and RSVP controls.

Russian/Cyrillic coverage is required only when Russian support becomes active.

### Type scale

Product typography uses a compact responsive scale:

| Token | Mobile | Desktop | Typical use |
|---|---:|---:|---|
| `text.xs` | 12px | 12px | metadata only |
| `text.sm` | 14px | 14px | supporting text |
| `text.md` | 16px | 16px | default body/input |
| `text.lg` | 18px | 18px | emphasized body |
| `text.xl` | 22px | 24px | section heading |
| `text.2xl` | 28px | 32px | page title |
| `text.3xl` | 36px | 44px | marketing/hero only |

Body line height is normally 1.5–1.65. Long uppercase text, justified paragraphs, and very light font weights are prohibited for essential content.

---

## 6. Spacing and sizing

Use a 4px base unit.

```text
space.0 = 0
space.1 = 4px
space.2 = 8px
space.3 = 12px
space.4 = 16px
space.5 = 20px
space.6 = 24px
space.8 = 32px
space.10 = 40px
space.12 = 48px
space.16 = 64px
```

Rules:

- Default mobile page gutter: 16px.
- Comfortable mobile/desktop section gaps: 24–32px.
- Desktop page gutter: 24–40px depending on width.
- Form controls: at least 44px tall; 48px preferred for primary mobile flows.
- Primary touch actions: aim for at least 44×44 CSS pixels.
- Dense administrative tables may be more compact on desktop but require an accessible mobile alternative.

---

## 7. Shape, elevation, and iconography

### Radius

- `radius.sm`: 6px
- `radius.md`: 10px
- `radius.lg`: 16px
- `radius.pill`: 999px for status chips only

Cards and modals should not become a landscape of nested rounded containers. Use spacing and headings before adding another card.

### Elevation

Use borders and subtle surface contrast for most structure. Shadows are reserved for overlays, menus, and genuinely elevated preview surfaces.

### Icons

- Use one coherent open-source icon set with a reviewed license.
- Icons support labels; they do not replace labels for unfamiliar actions.
- Decorative icons are hidden from assistive technology.
- Interactive icon-only buttons require accessible names, tooltips where useful, and adequate targets.
- Cultural/religious symbols are theme assets selected by the owner, not general product-interface icons.

---

## 8. Responsive layout

Design content-first rather than for named devices.

Proposed layout ranges:

- compact: below 640px;
- medium: 640–1023px;
- wide: 1024px and above;
- maximum dashboard content width: approximately 1280px;
- reading/form width: normally 640–760px.

Breakpoints are implementation tokens and may be adjusted after testing. Components respond to available space rather than relying only on page-level breakpoints.

### Mobile rules

- Single primary column for creation, checkout, and RSVP.
- Sticky bottom action may be used only when it does not obscure content, keyboard, consent, or errors.
- Avoid horizontal scrolling except intentional media/carousels with accessible controls.
- Replace wide tables with cards, stacked rows, or controlled horizontal regions.
- Date/time, currency, and phone inputs must work with mobile keyboards without losing labels.

### Desktop rules

- Use split layout for editor plus preview where space allows.
- Keep the primary task visually dominant.
- Do not stretch text/forms across the full viewport.
- Preserve keyboard order consistent with visual order.

---

## 9. Product information architecture

Primary authenticated navigation:

- Dashboard
- Events
- Account/Settings
- Help/Support

Within an event, use a guided progress model:

1. Event details
2. Style brief
3. Package
4. Generate
5. Customize
6. Guests
7. Preview and payment
8. Publish and share
9. RSVP management

The exact ability to revisit steps is governed by domain state, not a purely linear wizard. Completed steps remain editable when safe. Payment and entitlement consequences are shown before regeneration or package-dependent actions.

---

## 10. Core component inventory

### Foundations

- container and responsive stack;
- text and heading primitives;
- icon and visually hidden text;
- divider, surface, and section;
- focus ring;
- skeleton and progress indicator.

### Actions

- button: primary, secondary, tertiary, destructive;
- link and external link;
- icon button;
- menu and action menu;
- segmented control only for small mutually exclusive sets.

### Inputs

- text, email, phone, number, date, time, textarea;
- select, combobox, radio group, checkbox, switch;
- colour/palette selector using labels and values, not colour alone;
- file/CSV input with validation summary;
- locale selector;
- address/venue fields;
- form field, hint, error, and character count.

### Feedback

- inline error and validation summary;
- alert/banner;
- toast for non-critical confirmation only;
- status badge;
- progress/status timeline;
- empty state;
- confirmation dialog;
- loading and retry state.

### Product-specific

- event card;
- package comparison card;
- entitlement/usage meter;
- concept gallery and selection card;
- invitation preview frame;
- Vibe Tuner panel;
- guest-party row/card;
- RSVP summary;
- payment-status panel;
- publication/share panel;
- QR presentation/download;
- audit/support action panel for staff.

No component is complete until keyboard, focus, screen-reader naming, error, loading, empty, disabled, narrow-layout, and high-zoom states are defined.

---

## 11. Buttons and actions

- One primary action per local task region.
- Use verbs that describe the result: “Generate concepts,” “Continue to payment,” “Publish invitation.”
- Do not label important actions only “OK,” “Submit,” or “Yes.”
- Destructive actions use a danger style plus explicit wording.
- Disabled buttons must not be the only explanation; show what requirement is missing.
- Loading actions preserve width, show progress, and prevent duplicate submission without hiding recovery.
- Chargeable or entitlement-consuming actions disclose the cost before confirmation.
- External payment navigation is clearly communicated.

---

## 12. Forms and validation

- Every input has a persistent visible label.
- Required/optional status is clear and consistent.
- Instructions precede the control they affect.
- Validate on blur/submission where useful; do not aggressively show errors before meaningful input.
- On submit, focus a validation summary linked to each invalid field.
- Preserve valid user input after errors.
- Error messages state the problem and how to fix it.
- Do not rely on placeholder text as a label or required instruction.
- Accept legitimate names and international characters; avoid restrictive name regexes.
- Date format is localized for display, but date controls preserve unambiguous stored values.
- Phone input supports international format and does not assume `+230` globally.
- Textareas display safe limits before the limit is reached.

Event facts and creative preferences are visually separated so users understand that AI cannot rewrite factual fields.

---

## 13. Status and feedback language

Status must pair colour with icon/text.

| Meaning | Example language |
|---|---|
| Neutral | Draft |
| In progress | Generating concepts… |
| Pending external action | Payment verification pending |
| Success | Payment verified |
| Warning | RSVP closes in 2 days |
| Error | We could not generate this concept |
| Restricted | Publishing is unavailable until payment is verified |

Never use a success appearance for a browser payment redirect before server verification. Never expose provider error payloads. Offer a safe next action when one exists.

---

## 14. Loading, empty, and failure states

- Prefer local skeletons/progress indicators over blank pages.
- Do not simulate precise percentage progress when the provider gives none.
- Long AI operations are asynchronous and survive navigation/reload.
- Preserve prior valid invitation versions during generation failure.
- Empty states explain the purpose and provide one next action.
- Failure states distinguish retryable, user-fixable, pending verification, and support-required outcomes.
- Offline/poor network behavior must avoid duplicate RSVP, payment, or generation actions.

---

## 15. Motion

Motion should support orientation and celebration without blocking access.

- Respect `prefers-reduced-motion`.
- Reduced-motion mode removes parallax, particles, large zooms, and non-essential transitions.
- Essential state changes remain understandable without animation.
- Avoid flashes, rapid pulsing, and motion likely to cause vestibular discomfort.
- Product transitions generally use 120–250ms durations.
- Loading animation does not imply success.
- Invitation animation begins only after meaningful content is available and must not delay RSVP access.

Advanced 3D/parallax/particle effects remain outside MVP unless later approved and made accessible.

---

## 16. Invitation theme architecture

The invitation renderer accepts a versioned, validated theme configuration.

```ts
type InvitationThemeV1 = {
  schemaVersion: 1;
  templateId: string;
  paletteId: string;
  typographyId: string;
  spacingDensity: "compact" | "comfortable" | "airy";
  surfaceStyle: "flat" | "soft" | "framed";
  imagePlacement: "hero" | "background" | "split";
  textAlignment: "start" | "center";
  motionPreset: "none" | "fade" | "fade-slide";
  motifIds: string[];
};
```

Values are allow-listed. AI may propose only valid IDs/token changes. The renderer never executes arbitrary HTML, CSS, JavaScript, SVG scripts, remote embeds, or unapproved font/asset URLs.

### 16.1 Template structure

Each template provides controlled slots for:

- decorative artwork/background;
- event title/host names;
- date and time;
- venue and map action;
- invitation message;
- dress code/additional facts;
- RSVP deadline;
- RSVP action/form;
- optional owner-approved cultural motifs;
- platform branding where required by entitlement.

Factual values always come from `event_facts`, not AI-rendered text embedded in an image.

---

## 17. Invitation accessibility

Every published invitation must:

- retain readable semantic text independent of the background image;
- maintain text contrast through an overlay/surface when artwork is unpredictable;
- include descriptive alternative text when an image conveys meaning;
- use empty alt text for purely decorative imagery;
- expose date, time, venue, and RSVP information as text;
- remain usable at 200% zoom and narrow widths;
- preserve keyboard and screen-reader RSVP access;
- provide reduced-motion behavior;
- avoid autoplay audio/video;
- not rely on colour, animation, or image text for facts;
- keep primary RSVP controls reachable without waiting for decorative animation.

The preview includes an accessibility warning when a selected palette/artwork pairing cannot guarantee contrast. The server blocks publication for known critical accessibility failures in controlled components.

---

## 18. Theme and cultural-expression policy

Culture and religion are owner-selected inputs, not inferred identities.

Themes may include reviewed optional motif collections for approved contexts, but:

- neutral themes are always available;
- a motif is never forced by locale, country, surname, or venue;
- sacred symbols are labeled accurately and not mixed casually;
- motifs remain decorative and do not replace factual content;
- visual review includes cultural appropriateness and small-screen legibility;
- the system avoids ranking one tradition as more “premium” than another;
- “fusion” requires explicit owner selection and careful review.

The initial theme library supports weddings only, even if the token architecture can expand later.

---

## 19. AI concept gallery

- Show concept status and generation progress without exposing provider details.
- Each concept includes a large preview, concise accessible name, and explicit selection action.
- Selection is not triggered merely by opening or swiping.
- Compare views remain usable by keyboard and on mobile.
- Regenerate clearly displays remaining entitlement and confirmation.
- Failed concepts do not occupy a selectable state.
- Watermark/branding status is visible before purchase where applicable.
- Owners can inspect factual text separately from decorative artwork.

---

## 20. Vibe Tuner interface

The Vibe Tuner is presented as guided refinement, not unrestricted chat.

- Offer example requests such as “warmer colours” or “make the wording more formal.”
- Display remaining allowed adjustments.
- Preview proposed changes before applying where practical.
- Explain when a request requires new image generation and entitlement consumption.
- Preserve undo through immutable invitation versions.
- Reject requests outside allow-listed design/copy capabilities with a useful explanation.
- Do not display or execute generated code.

---

## 21. Package comparison and entitlements

- Compare the four approved packages (Bronze, Silver, Gold, Platinum — `project/DECISIONS.md` `DEC-025`) using an accessible table on wide screens and equivalent stacked cards on mobile.
- Use exact, approved entitlement language.
- Do not use “unlimited” for metered AI.
- Distinguish included concepts, regenerations, hosting duration, guest capacity, branding, quality, and languages.
- Do not hide material limitations in tooltips.
- Mark the selected package without using colour alone.
- Prices and taxes follow Document 08; final server-calculated totals appear before leaving for checkout.

Price anchoring, “most popular,” scarcity, or countdown language requires truthful evidence and owner approval. Dark patterns are prohibited.

---

## 22. Checkout and payment UX

- Show package snapshot, currency, subtotal, applicable customer tax, and total before checkout.
- MUR is primary for Mauritius; EUR/USD appear only when approved and supported.
- State that checkout is handled by the selected provider.
- Do not display a payment method until production eligibility is verified.
- Browser return shows “verifying” until the server confirms payment.
- Never ask users to retry blindly after an uncertain provider timeout.
- Provide authenticated receipt/history access.
- Failed/cancelled states preserve the event and offer safe retry.

Security trust marks and PCI claims must be accurate and authorized; do not fabricate badges.

---

## 23. Guest management UX

- Model guest parties as the main unit.
- Support clear party capacity and optional member names.
- Make CSV import a staged review: upload, validate, preview issues, confirm import.
- Do not expose guest contacts in unnecessary list columns.
- Search and filters remain keyboard accessible.
- Bulk/destructive actions disclose scope and allow confirmation.
- Show latest RSVP with access to revision history where appropriate.
- Export communicates that the downloaded CSV contains personal data.

---

## 24. RSVP experience

The accountless guest flow should be exceptionally simple:

1. Read invitation details.
2. Choose attending or not attending.
3. If attending, confirm party count within allowed capacity.
4. Optionally add a short message.
5. Review and submit.
6. Receive a clear confirmation and management link where enabled.

Rules:

- No account wall.
- No marketing consent bundled with RSVP.
- No disclosure of other guests.
- Do not reveal whether a guessed person exists.
- Explain closed/expired RSVP state respectfully.
- Avoid requiring email/phone unless needed for the host's configured flow.
- Management links are explained as private and should not be forwarded.

---

## 25. Localization and internationalization

The interface is designed for translation from the first implementation.

- English is the primary interface language.
- French is second.
- Mauritian Kreol (`mfe`) is provided for Mauritian customer flows according to the approved localization scope.
- Russian is a long-term language and not an MVP interface promise unless later approved.
- Do not concatenate translated fragments.
- Allow text expansion of at least approximately 30–40% in flexible components.
- Use locale-aware dates, numbers, and currencies while storing canonical values.
- Do not place text inside product-interface images.
- Keep names, venue names, and addresses user-controlled rather than automatically translated.
- Language selection is visible and does not depend solely on browser/IP detection.
- Fallback is explicit and deterministic.

Final translation governance belongs in `product/LOCALIZATION.md`.

---

## 26. Content style

Product copy is:

- concise and human;
- calm during errors;
- explicit about money and entitlement use;
- respectful across cultures;
- free of blame and technical provider jargon;
- consistent in terminology.

Preferred terminology:

- “event owner” or “you,” not “tenant”;
- “guest party,” not “record”;
- “concept,” not “AI inference”;
- “invitation version,” not “revision object”;
- “payment verification,” not “webhook processing”;
- “publish,” not “deploy.”

Avoid manipulative urgency, false scarcity, excessive exclamation marks, and claims of guaranteed perfection.

---

## 27. Design tokens and implementation

Tokens are the source of truth for product UI values:

- colour;
- typography;
- spacing;
- radius;
- border;
- elevation;
- motion;
- z-index layers;
- breakpoints/container widths.

Use semantic tokens such as `color.action.primary`, not component-specific raw values such as `burgundy500` in application code. Theme tokens for invitations are a separate namespace and cannot override product/security controls.

Components live in a shared UI package within the approved monorepo. Documentation/examples may use an implementation-local component workshop if justified, but adopting Storybook or another tool is not mandatory until component volume warrants it.

Do not add a large third-party component library by default. Evaluate accessibility, bundle impact, theming, maintenance, and licensing before selecting primitives.

---

## 28. Performance design budgets

Design choices must support fast mobile invitation access.

- Optimize and responsively serve images.
- Avoid loading original 4K assets on small screens when unnecessary.
- Subset/self-host fonts where licensing permits; limit families and weights.
- Prevent layout shift with reserved dimensions.
- Lazy-load below-the-fold decorative assets.
- Keep RSVP controls and factual text available before non-essential decoration.
- Avoid heavy animation libraries for simple transitions.
- Do not load owner dashboard code on public invitation pages.
- Measure Core Web Vitals on representative low/mid-range mobile devices and networks.

Exact budgets are finalized during implementation/testing, but visual quality cannot justify blocking the RSVP flow.

---

## 29. Design QA and acceptance

Each feature is tested at minimum for:

- compact mobile, medium, and wide layouts;
- touch, keyboard, and mouse operation;
- visible focus and logical focus order;
- screen-reader naming and announcements;
- 200% zoom and text resizing;
- light mode contrast;
- reduced motion;
- English, French, and Mauritian Kreol text expansion;
- long names, venues, and error messages;
- loading, empty, success, error, pending, expired, and unauthorized states;
- slow network and duplicate action prevention;
- no sensitive data in public or screenshot-prone surfaces.

Invitation themes also require:

- artwork/text contrast validation;
- factual-field visibility;
- cultural review where motifs are used;
- mobile share-preview/OG validation;
- print/QR legibility where exported;
- accessibility of the RSVP section.

---

## 30. Explicit MVP exclusions

- dark mode as a launch requirement;
- arbitrary drag-and-drop page builder;
- arbitrary custom HTML/CSS/JavaScript;
- user-uploaded fonts;
- marketplace/community themes;
- advanced 3D, parallax, and particle systems;
- autoplay music or video;
- complex collaborative editing;
- Russian interface localization;
- themes for non-wedding events;
- native mobile applications;
- advertising or tracking-heavy guest pages.

---

## 31. Current-source notes

Official/current sources reviewed:

- W3C Web Content Accessibility Guidelines 2.2: <https://www.w3.org/TR/WCAG22/>
- W3C accessibility guidance on target size and touch interaction: <https://www.w3.org/WAI/WCAG21/Understanding/target-size>
- W3C Web Accessibility Initiative: <https://www.w3.org/WAI/>

Accessibility conformance requires testing the implemented product, not merely citing the standard.

---

## 32. Approved owner decisions

### Decision 1 — Product aesthetic

**Approved:** Use a refined, warm, modern, trustworthy product interface with restrained neutrals and a burgundy-style accent, keeping decorative richness inside invitations rather than dashboard workflows.

### Decision 2 — Accessibility target

**Approved:** Target WCAG 2.2 Level AA across product, invitation, and RSVP experiences, including keyboard, screen-reader, zoom, contrast, target-size, and reduced-motion testing.

### Decision 3 — Product and invitation separation

**Approved:** Maintain one stable product design system and a separate allow-listed invitation theme system. Invitation themes cannot override product/security controls.

### Decision 4 — Mobile-first layout

**Approved:** Design every critical flow for narrow touch screens first, then enhance editor/preview and management layouts for larger screens.

### Decision 5 — Typography

**Approved:** Use a readable sans-serif such as Inter for product UI, subject to implementation-time licensing/rendering verification, and permit only reviewed licensed font pairings in invitation themes.

### Decision 6 — Dark mode

**Approved:** Defer dark mode from MVP while retaining semantic tokens that permit it later.

### Decision 7 — Theme safety

**Approved:** Allow AI and owners to select only versioned theme tokens, templates, palettes, typography, motifs, and motion presets—never arbitrary executable code or external assets.

### Decision 8 — Text rendering

**Approved:** Keep all factual invitation information as semantic application-rendered text rather than text embedded in AI images.

### Decision 9 — Motion

**Approved:** Keep motion optional and restrained, honor reduced-motion preferences, prohibit autoplay media, and defer 3D/parallax/particles.

### Decision 10 — Cultural expression

**Approved:** Provide neutral themes and optional reviewed motif collections selected explicitly by the owner; never infer a cultural/religious theme from identity, locale, name, or venue.

### Decision 11 — Localization

**Approved:** Design product components for English, French, and Mauritian Kreol expansion/fallback from the start; defer Russian interface localization from MVP.

### Decision 12 — Component strategy

**Approved:** Build a focused shared component package using accessible primitives. Do not adopt a large UI library or Storybook by default unless implementation evaluation shows clear value.

### Decision 13 — Checkout truthfulness

**Approved:** Show verified payment methods, currency, customer-payable tax, and total clearly; display “verifying” after return until server confirmation and never fabricate trust badges.

### Decision 14 — RSVP simplicity

**Approved:** Keep RSVP accountless, mobile-first, free of bundled marketing consent, and completable through a short accessible sequence.

### Decision 15 — Performance

**Approved:** Prioritize factual content and RSVP interaction ahead of decorative assets, serve responsive imagery/fonts, and prevent invitation effects from degrading mobile usability.

---

## 33. Approval record

**Status:** Approved — Owner Approved.  
**Approved version:** 1.1.  
**Approved date:** 2026-08-17 (package-count reference reconciled 2026-08-25 per `DEC-025`).  
**Owner decisions:** Decisions 1–15 approved as proposed.
