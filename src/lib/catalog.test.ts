import { describe, expect, it } from "vitest";
import {
  calculateAdditionalGuestCapacityPriceMur,
  guestCapacityAddOn,
  occasionCategories,
  packageTiers,
  reachableOccasionCategories,
} from "./catalog";

describe("wedding-only, four-package product catalogue", () => {
  it("keeps weddings as the flagship and the only customer-reachable occasion", () => {
    expect(occasionCategories.find((occasion) => occasion.flagship)?.id).toBe(
      "wedding",
    );
    expect(occasionCategories.length).toBeGreaterThan(4);
    expect(reachableOccasionCategories).toEqual([
      { id: "wedding", label: "Wedding", flagship: true, reachable: true },
    ]);
    const nonWeddingOccasions = occasionCategories.filter(
      (occasion) => occasion.id !== "wedding",
    );
    expect(nonWeddingOccasions.every((occasion) => !occasion.reachable)).toBe(
      true,
    );
  });

  it("defines the approved four-tier ladder with owner-approved entitlements and prices", () => {
    expect(packageTiers.map((tier) => tier.id)).toEqual([
      "bronze",
      "silver",
      "gold",
      "platinum",
    ]);
    expect(packageTiers.map((tier) => tier.concepts)).toEqual([1, 2, 3, 5]);
    expect(packageTiers.map((tier) => tier.refinements)).toEqual([2, 4, 8, 12]);
    expect(packageTiers.map((tier) => tier.guestCapacity)).toEqual([
      75, 150, 300, 750,
    ]);
    expect(packageTiers.map((tier) => tier.hostingDays)).toEqual([
      90, 180, 365, 545,
    ]);
    expect(packageTiers.map((tier) => tier.languageSlots)).toEqual([
      1, 2, 3, 4,
    ]);
    expect(packageTiers.map((tier) => tier.priceMur)).toEqual([
      799, 1499, 2999, 5999,
    ]);
  });

  it("reserves named guest invitations for Platinum", () => {
    const namedGuestTiers = packageTiers.filter((tier) =>
      tier.features.some((feature) => feature.includes("Named guest")),
    );
    expect(namedGuestTiers.map((tier) => tier.id)).toEqual(["platinum"]);
  });

  it("prices additional guest capacity explicitly, never automatically", () => {
    expect(guestCapacityAddOn.pricePerGuestMur).toBe(15);
    expect(calculateAdditionalGuestCapacityPriceMur(0)).toBe(0);
    expect(calculateAdditionalGuestCapacityPriceMur(25)).toBe(375);
  });

  it("rejects invalid additional-guest quantities", () => {
    expect(() => calculateAdditionalGuestCapacityPriceMur(-1)).toThrow(
      RangeError,
    );
    expect(() => calculateAdditionalGuestCapacityPriceMur(1.5)).toThrow(
      RangeError,
    );
  });
});
