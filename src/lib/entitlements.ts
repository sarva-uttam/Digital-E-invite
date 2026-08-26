/**
 * Entitlement rules (IMP-023) derived from the single approved source of
 * package numbers, `src/lib/catalog.ts` (project/DECISIONS.md DEC-025) —
 * per docs/00_CLAUDE_RULES.md §9, business rules such as entitlements must
 * not be duplicated across frontend and backend implementations.
 *
 * Hosting duration (`hostingDays`) is intentionally not an entitlement
 * code here: it is a time window (start/end), not a consumable quantity,
 * and belongs to the publication/hosting lifecycle (docs/06_DATABASE_DESIGN.md
 * §17.14, owned by IMP-062), not the quantity ledger this module derives
 * grants for.
 */

import { packageTiers, type PackageTierId } from "./catalog";

export const ENTITLEMENT_CODES = [
  "ai_concept",
  "ai_refinement",
  "guest_capacity",
  "language_slot",
] as const;
export type EntitlementCode = (typeof ENTITLEMENT_CODES)[number];

export type EntitlementGrantSet = Record<EntitlementCode, number>;

/**
 * The initial GRANT quantities a purchase of `tierId` produces, derived
 * from the approved catalog — never a second, independently maintained
 * copy of these numbers.
 */
export function initialGrantsForPackage(
  tierId: PackageTierId,
): EntitlementGrantSet {
  const tier = packageTiers.find((candidate) => candidate.id === tierId);
  if (!tier) {
    throw new RangeError(`Unknown package tier id: ${tierId}`);
  }
  return {
    ai_concept: tier.concepts,
    ai_refinement: tier.refinements,
    guest_capacity: tier.guestCapacity,
    language_slot: tier.languageSlots,
  };
}
