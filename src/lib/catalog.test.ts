import { describe, expect, it } from "vitest";
import { occasionCategories, packageTiers } from "./catalog";

describe("v2 product catalogue", () => {
  it("keeps weddings as the flagship while supporting an extensible catalogue", () => {
    expect(occasionCategories.find((occasion) => occasion.flagship)?.id).toBe(
      "wedding",
    );
    expect(occasionCategories.length).toBeGreaterThan(4);
  });

  it("defines the authorised four-tier ladder in increasing concept order", () => {
    expect(packageTiers.map((tier) => tier.id)).toEqual([
      "bronze",
      "silver",
      "gold",
      "platinum",
    ]);
    expect(packageTiers.map((tier) => tier.concepts)).toEqual([1, 2, 4, 6]);
  });

  it("reserves named guest invitations for Platinum", () => {
    const namedGuestTiers = packageTiers.filter((tier) =>
      tier.features.some((feature) => feature.includes("Named guest")),
    );
    expect(namedGuestTiers.map((tier) => tier.id)).toEqual(["platinum"]);
  });
});
