export const occasionCategories = [
  { id: "wedding", label: "Wedding", flagship: true },
  { id: "engagement", label: "Engagement", flagship: false },
  { id: "birthday", label: "Birthday", flagship: false },
  { id: "religious", label: "Religious celebration", flagship: false },
  { id: "holiday", label: "Holiday gathering", flagship: false },
  { id: "travel", label: "Trip or vacation", flagship: false },
  { id: "hospitality", label: "Hotel or package offer", flagship: false },
  { id: "corporate", label: "Corporate occasion", flagship: false },
] as const;

export const packageTiers = [
  {
    id: "bronze",
    name: "Bronze",
    eyebrow: "Beautiful essentials",
    concepts: 1,
    features: ["Hosted invitation", "Mobile-first design", "RSVP basics", "Share-ready link"],
  },
  {
    id: "silver",
    name: "Silver",
    eyebrow: "More room to personalize",
    concepts: 2,
    features: ["Everything in Bronze", "Richer themes", "More refinements", "Enhanced sections"],
  },
  {
    id: "gold",
    name: "Gold",
    eyebrow: "A premium celebration",
    concepts: 4,
    features: ["Everything in Silver", "Premium motion", "Multilingual options", "Advanced guest tools"],
  },
  {
    id: "platinum",
    name: "Platinum",
    eyebrow: "The unforgettable experience",
    concepts: 6,
    features: ["Everything in Gold", "Named guest invitations", "Signature art direction", "Bespoke premium elements"],
  },
] as const;

export type PackageTierId = (typeof packageTiers)[number]["id"];
export type OccasionId = (typeof occasionCategories)[number]["id"];
