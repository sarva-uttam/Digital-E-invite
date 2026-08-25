"use client";

import { useMemo, useState } from "react";
import {
  calculateAdditionalGuestCapacityPriceMur,
  guestCapacityAddOn,
  packageTiers,
} from "@/lib/catalog";

const formatMur = (amount: number) => `Rs ${amount.toLocaleString("en-US")}`;

export function GuestCapacityCalculator() {
  const [tierId, setTierId] =
    useState<(typeof packageTiers)[number]["id"]>("gold");
  const [additionalGuests, setAdditionalGuests] = useState(0);

  const tier = useMemo(
    () => packageTiers.find((candidate) => candidate.id === tierId)!,
    [tierId],
  );

  const addOnPrice = calculateAdditionalGuestCapacityPriceMur(additionalGuests);
  const totalGuests = tier.guestCapacity + additionalGuests;

  return (
    <div className="capacityCalculator">
      <div className="capacityRow">
        <label htmlFor="capacity-tier">Package</label>
        <select
          id="capacity-tier"
          value={tierId}
          onChange={(event) =>
            setTierId(event.target.value as (typeof packageTiers)[number]["id"])
          }
        >
          {packageTiers.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} — {option.guestCapacity} guests included
            </option>
          ))}
        </select>
      </div>

      <div className="capacityRow">
        <label htmlFor="capacity-extra">Additional guests</label>
        <div className="capacityStepper">
          <button
            type="button"
            aria-label="Remove 5 guests"
            onClick={() =>
              setAdditionalGuests((value) => Math.max(0, value - 5))
            }
          >
            −
          </button>
          <input
            id="capacity-extra"
            type="number"
            inputMode="numeric"
            min={0}
            step={5}
            value={additionalGuests}
            onChange={(event) => {
              const parsed = Number.parseInt(event.target.value, 10);
              setAdditionalGuests(
                Number.isFinite(parsed) ? Math.max(0, parsed) : 0,
              );
            }}
          />
          <button
            type="button"
            aria-label="Add 5 guests"
            onClick={() => setAdditionalGuests((value) => value + 5)}
          >
            +
          </button>
        </div>
      </div>

      <dl className="capacitySummary">
        <div>
          <dt>Included with {tier.name}</dt>
          <dd>{tier.guestCapacity} guests</dd>
        </div>
        <div>
          <dt>Total capacity</dt>
          <dd>{totalGuests} guests</dd>
        </div>
        <div>
          <dt>Additional-guest price</dt>
          <dd>
            {formatMur(addOnPrice)}
            <span className="capacityRate">
              {" "}
              ({formatMur(guestCapacityAddOn.pricePerGuestMur)}/guest)
            </span>
          </dd>
        </div>
      </dl>

      <p className="capacityNote">
        This shows the price of adding guest capacity — it isn&apos;t a checkout
        yet. Payment is not available until a payment provider is selected and
        activated.
      </p>
    </div>
  );
}
