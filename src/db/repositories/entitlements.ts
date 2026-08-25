/**
 * Entitlement ledger repository (IMP-023) — implements
 * docs/06_DATABASE_DESIGN.md §12.3's atomic reservation rule: lock the
 * relevant balance row, verify availability, append the ledger entry, and
 * update the balance projection, all in one transaction.
 *
 * Balance semantics (an internal implementation convention this module
 * defines and enforces consistently — the design doc names the four
 * balance columns and the seven entry types but does not itself specify
 * per-type arithmetic):
 *
 * - GRANT:   granted += delta
 * - RESERVE: reserved += delta   (requires available >= delta)
 * - CONSUME: reserved -= delta, consumed += delta   (requires reserved >= delta;
 *            converts an existing reservation into permanent consumption)
 * - RELEASE: reserved -= delta   (requires reserved >= delta; returns an
 *            unconsumed reservation to available capacity)
 * - ADJUST:  adjusted += delta   (delta may be negative; administrative correction)
 * - REVOKE:  granted -= delta    (requires granted - already-revoked >= delta)
 * - EXPIRE:  reserved -= delta   (requires reserved >= delta; same shape as
 *            RELEASE — a reservation that timed out rather than one a caller
 *            explicitly released)
 *
 * available = granted + adjusted - reserved - consumed
 *
 * Every operation is idempotent: `(eventId, entitlementCode, idempotencyKey)`
 * is unique at the database level (docs/06 §12.1). A duplicate call with the
 * same idempotency key is a safe no-op that returns the already-applied
 * balance rather than double-applying.
 *
 * `domain services must not expose ORM records as domain objects`
 * (docs/06 §4) — every exported function returns a plain `EntitlementBalance`
 * value, never a raw Drizzle row.
 */

import { and, eq, sql } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "../schema";
import {
  entitlementBalances,
  entitlementLedgerEntries,
} from "../schema/entitlements";
import type { EntitlementEntryType } from "../schema/entitlements";
import type {
  EntitlementCode,
  EntitlementGrantSet,
} from "../../lib/entitlements";

type Db = NodePgDatabase<typeof schema>;

export class InsufficientEntitlementError extends Error {
  constructor(
    public readonly entitlementCode: EntitlementCode,
    public readonly requested: number,
    public readonly available: number,
  ) {
    super(
      `Insufficient ${entitlementCode}: requested ${requested}, available ${available}`,
    );
    this.name = "InsufficientEntitlementError";
  }
}

export interface EntitlementBalance {
  eventId: string;
  entitlementCode: EntitlementCode;
  granted: number;
  reserved: number;
  consumed: number;
  adjusted: number;
}

function available(balance: EntitlementBalance): number {
  return (
    balance.granted + balance.adjusted - balance.reserved - balance.consumed
  );
}

interface AppendLedgerEntryInput {
  eventId: string;
  entitlementCode: EntitlementCode;
  entryType: EntitlementEntryType;
  quantity: number; // always a positive magnitude; sign/effect determined by entryType (see module docs).
  idempotencyKey: string;
  reasonCode: string;
  reasonNote?: string;
  purchaseId?: string;
  generationRequestId?: string;
  createdByAccountId?: string;
}

/**
 * The single primitive every named operation below delegates to. Not
 * exported: callers use grantEntitlements/reserveEntitlement/etc., which
 * pin a specific, validated entryType rather than allowing an arbitrary
 * one.
 */
async function appendLedgerEntry(
  db: Db,
  input: AppendLedgerEntryInput,
): Promise<EntitlementBalance> {
  // ADJUST is the one entry type whose quantity_delta is a genuine signed
  // correction (see the module-level balance-semantics doc above); every
  // other entry type carries a positive magnitude, with direction implied
  // by the entry type itself.
  if (!Number.isInteger(input.quantity) || input.quantity === 0) {
    throw new RangeError("quantity must be a non-zero integer");
  }
  if (input.entryType !== "ADJUST" && input.quantity < 0) {
    throw new RangeError(
      `quantity must be positive for entry type ${input.entryType}`,
    );
  }

  return db.transaction(async (tx) => {
    // Upsert-and-lock: creates the balance row at zero if this is the
    // event/code's first ledger entry, or locks the existing row — either
    // way we hold a row lock for the remainder of this transaction, so a
    // concurrent reservation against the same event+code blocks here
    // until this transaction commits or rolls back.
    const [balanceRow] = await tx
      .insert(entitlementBalances)
      .values({
        eventId: input.eventId,
        entitlementCode: input.entitlementCode,
      })
      .onConflictDoUpdate({
        target: [
          entitlementBalances.eventId,
          entitlementBalances.entitlementCode,
        ],
        set: { updatedAt: sql`entitlement_balances.updated_at` }, // no-op SET; forces the ON CONFLICT branch to still return/lock the row.
      })
      .returning();
    if (!balanceRow) {
      throw new Error("Failed to upsert-and-lock entitlement balance row");
    }
    const current: EntitlementBalance = balanceRow;

    const [inserted] = await tx
      .insert(entitlementLedgerEntries)
      .values({
        eventId: input.eventId,
        purchaseId: input.purchaseId,
        entitlementCode: input.entitlementCode,
        entryType: input.entryType,
        quantityDelta: input.quantity,
        generationRequestId: input.generationRequestId,
        idempotencyKey: input.idempotencyKey,
        reasonCode: input.reasonCode,
        reasonNote: input.reasonNote,
        createdByAccountId: input.createdByAccountId,
      })
      .onConflictDoNothing({
        target: [
          entitlementLedgerEntries.eventId,
          entitlementLedgerEntries.entitlementCode,
          entitlementLedgerEntries.idempotencyKey,
        ],
      })
      .returning({ id: entitlementLedgerEntries.id });

    if (!inserted) {
      // Idempotent replay: this exact (event, code, idempotencyKey) ledger
      // entry already exists from a prior attempt. The balance was already
      // updated then — do not apply it again.
      return current;
    }

    let update: Partial<
      Pick<EntitlementBalance, "granted" | "reserved" | "consumed" | "adjusted">
    >;
    switch (input.entryType) {
      case "GRANT":
        update = { granted: current.granted + input.quantity };
        break;
      case "RESERVE": {
        const remaining = available(current);
        if (remaining < input.quantity) {
          throw new InsufficientEntitlementError(
            input.entitlementCode,
            input.quantity,
            remaining,
          );
        }
        update = { reserved: current.reserved + input.quantity };
        break;
      }
      case "CONSUME":
        if (current.reserved < input.quantity) {
          throw new InsufficientEntitlementError(
            input.entitlementCode,
            input.quantity,
            current.reserved,
          );
        }
        update = {
          reserved: current.reserved - input.quantity,
          consumed: current.consumed + input.quantity,
        };
        break;
      case "RELEASE":
      case "EXPIRE":
        if (current.reserved < input.quantity) {
          throw new InsufficientEntitlementError(
            input.entitlementCode,
            input.quantity,
            current.reserved,
          );
        }
        update = { reserved: current.reserved - input.quantity };
        break;
      case "ADJUST":
        update = { adjusted: current.adjusted + input.quantity };
        break;
      case "REVOKE":
        if (current.granted < input.quantity) {
          throw new InsufficientEntitlementError(
            input.entitlementCode,
            input.quantity,
            current.granted,
          );
        }
        update = { granted: current.granted - input.quantity };
        break;
    }

    const [updated] = await tx
      .update(entitlementBalances)
      .set({ ...update, updatedAt: sql`now()` })
      .where(
        and(
          eq(entitlementBalances.eventId, input.eventId),
          eq(entitlementBalances.entitlementCode, input.entitlementCode),
        ),
      )
      .returning();
    if (!updated) {
      throw new Error("Failed to update entitlement balance row");
    }
    return updated;
  });
}

export interface GrantEntitlementsInput {
  eventId: string;
  purchaseId: string;
  grants: EntitlementGrantSet;
  idempotencyKeyPrefix: string;
  reasonCode: string;
  createdByAccountId?: string;
}

/** Grants every entitlement in `grants` (typically the full initial-purchase set from src/lib/entitlements.ts). Zero-quantity entries are skipped. */
export async function grantEntitlements(
  db: Db,
  input: GrantEntitlementsInput,
): Promise<EntitlementBalance[]> {
  const results: EntitlementBalance[] = [];
  for (const [code, quantity] of Object.entries(input.grants) as [
    EntitlementCode,
    number,
  ][]) {
    if (quantity <= 0) continue;
    results.push(
      await appendLedgerEntry(db, {
        eventId: input.eventId,
        purchaseId: input.purchaseId,
        entitlementCode: code,
        entryType: "GRANT",
        quantity,
        idempotencyKey: `${input.idempotencyKeyPrefix}:${code}`,
        reasonCode: input.reasonCode,
        createdByAccountId: input.createdByAccountId,
      }),
    );
  }
  return results;
}

export interface ReserveEntitlementInput {
  eventId: string;
  entitlementCode: EntitlementCode;
  quantity: number;
  idempotencyKey: string;
  reasonCode: string;
  generationRequestId?: string;
}

/** Throws InsufficientEntitlementError if the requested quantity exceeds the available balance. */
export function reserveEntitlement(
  db: Db,
  input: ReserveEntitlementInput,
): Promise<EntitlementBalance> {
  return appendLedgerEntry(db, { ...input, entryType: "RESERVE" });
}

export interface ConsumeEntitlementInput {
  eventId: string;
  entitlementCode: EntitlementCode;
  quantity: number;
  idempotencyKey: string;
  reasonCode: string;
  generationRequestId?: string;
}

/** Converts an existing reservation into permanent consumption. */
export function consumeEntitlement(
  db: Db,
  input: ConsumeEntitlementInput,
): Promise<EntitlementBalance> {
  return appendLedgerEntry(db, { ...input, entryType: "CONSUME" });
}

export interface ReleaseEntitlementInput {
  eventId: string;
  entitlementCode: EntitlementCode;
  quantity: number;
  idempotencyKey: string;
  reasonCode: string;
  generationRequestId?: string;
}

/** Returns an unconsumed reservation to available capacity (e.g. a failed or cancelled generation). */
export function releaseEntitlement(
  db: Db,
  input: ReleaseEntitlementInput,
): Promise<EntitlementBalance> {
  return appendLedgerEntry(db, { ...input, entryType: "RELEASE" });
}

export interface AdjustEntitlementInput {
  eventId: string;
  entitlementCode: EntitlementCode;
  /** Positive to grant extra allowance (e.g. goodwill), negative to reduce it. This is the one entry type whose ledger quantity_delta is a genuine signed value, not a magnitude — see the module-level balance-semantics doc. */
  delta: number;
  idempotencyKey: string;
  reasonCode: string;
  reasonNote: string;
  createdByAccountId: string;
}

/** Administrative correction. Requires a human-readable reasonNote and an actor, unlike the other operations. */
export function adjustEntitlement(
  db: Db,
  input: AdjustEntitlementInput,
): Promise<EntitlementBalance> {
  return appendLedgerEntry(db, {
    eventId: input.eventId,
    entitlementCode: input.entitlementCode,
    entryType: "ADJUST",
    quantity: input.delta,
    idempotencyKey: input.idempotencyKey,
    reasonCode: input.reasonCode,
    reasonNote: input.reasonNote,
    createdByAccountId: input.createdByAccountId,
  });
}

/**
 * Rebuilds a balance purely from the append-only ledger, independent of
 * the (optional, potentially drifted) entitlement_balances projection.
 * Used by reconciliation and by tests asserting the projection matches
 * the ledger (docs/06 §12.2: "must be fully reconstructable from the
 * ledger").
 */
export async function reconstructBalanceFromLedger(
  db: Db,
  eventId: string,
  entitlementCode: EntitlementCode,
): Promise<EntitlementBalance> {
  const rows = await db
    .select({
      entryType: entitlementLedgerEntries.entryType,
      quantityDelta: entitlementLedgerEntries.quantityDelta,
    })
    .from(entitlementLedgerEntries)
    .where(
      and(
        eq(entitlementLedgerEntries.eventId, eventId),
        eq(entitlementLedgerEntries.entitlementCode, entitlementCode),
      ),
    );

  const balance: EntitlementBalance = {
    eventId,
    entitlementCode,
    granted: 0,
    reserved: 0,
    consumed: 0,
    adjusted: 0,
  };

  for (const row of rows) {
    switch (row.entryType) {
      case "GRANT":
        balance.granted += row.quantityDelta;
        break;
      case "RESERVE":
        balance.reserved += row.quantityDelta;
        break;
      case "CONSUME":
        balance.reserved -= row.quantityDelta;
        balance.consumed += row.quantityDelta;
        break;
      case "RELEASE":
      case "EXPIRE":
        balance.reserved -= row.quantityDelta;
        break;
      case "ADJUST":
        balance.adjusted += row.quantityDelta;
        break;
      case "REVOKE":
        balance.granted -= row.quantityDelta;
        break;
    }
  }

  return balance;
}
