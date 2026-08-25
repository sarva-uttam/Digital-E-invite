// Occasion catalogue. The MVP is wedding-only (project/DECISIONS.md DEC-004, reaffirmed DEC-027):
// only `reachable: true` categories may be selectable or linked in customer-facing surfaces.
// The remaining categories are retained as a typed extensibility scaffold, not current MVP scope.
export const occasionCategories = [
  { id: "wedding", label: "Wedding", flagship: true, reachable: true },
  { id: "engagement", label: "Engagement", flagship: false, reachable: false },
  { id: "birthday", label: "Birthday", flagship: false, reachable: false },
  {
    id: "religious",
    label: "Religious celebration",
    flagship: false,
    reachable: false,
  },
  {
    id: "holiday",
    label: "Holiday gathering",
    flagship: false,
    reachable: false,
  },
  {
    id: "travel",
    label: "Trip or vacation",
    flagship: false,
    reachable: false,
  },
  {
    id: "hospitality",
    label: "Hotel or package offer",
    flagship: false,
    reachable: false,
  },
  {
    id: "corporate",
    label: "Corporate occasion",
    flagship: false,
    reachable: false,
  },
] as const;

// Only categories a customer may actually reach in the MVP (project/DECISIONS.md DEC-027).
export const reachableOccasionCategories = occasionCategories.filter(
  (occasion) => occasion.reachable,
);

// Package entitlements and prices are owner-approved (project/DECISIONS.md DEC-025).
export const packageTiers = [
  {
    id: "bronze",
    name: "Bronze",
    eyebrow: "Beautiful essentials",
    concepts: 1,
    refinements: 2,
    guestCapacity: 75,
    hostingDays: 90,
    languageSlots: 1,
    priceMur: 799,
    features: [
      "Hosted invitation",
      "Mobile-first design",
      "RSVP basics",
      "Share-ready link",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    eyebrow: "More room to personalize",
    concepts: 2,
    refinements: 4,
    guestCapacity: 150,
    hostingDays: 180,
    languageSlots: 2,
    priceMur: 1499,
    features: [
      "Everything in Bronze",
      "Richer themes",
      "More refinements",
      "Enhanced sections",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    eyebrow: "Most Popular — a premium celebration",
    concepts: 3,
    refinements: 8,
    guestCapacity: 300,
    hostingDays: 365,
    languageSlots: 3,
    priceMur: 2999,
    features: [
      "Everything in Silver",
      "Premium motion",
      "Multilingual options",
      "Advanced guest tools",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    eyebrow: "The unforgettable experience",
    concepts: 5,
    refinements: 12,
    guestCapacity: 750,
    hostingDays: 545,
    languageSlots: 4,
    priceMur: 5999,
    features: [
      "Everything in Gold",
      "Named guest invitations",
      "Signature art direction",
      "Bespoke premium elements",
    ],
  },
] as const;

// Additional guest-capacity add-on (project/DECISIONS.md DEC-026). Explicit, confirmed, never
// an automatic overage. This is a catalog/price calculation only — no checkout is wired up yet
// (payment-provider selection remains gated behind IMP-050 through IMP-055).
export const guestCapacityAddOn = {
  pricePerGuestMur: 15,
} as const;

export function calculateAdditionalGuestCapacityPriceMur(
  additionalGuests: number,
): number {
  if (!Number.isInteger(additionalGuests) || additionalGuests < 0) {
    throw new RangeError("additionalGuests must be a non-negative integer");
  }
  return additionalGuests * guestCapacityAddOn.pricePerGuestMur;
}

export type PackageTierId = (typeof packageTiers)[number]["id"];
export type OccasionId = (typeof occasionCategories)[number]["id"];
