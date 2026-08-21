/**
 * Database-enforced schema invariant tests (IMP-020). Requires a real
 * disposable PostgreSQL 18 database — see vitest.db.config.mts. Run with
 * `npm run test:db`.
 *
 * Proves PostgreSQL constraints reject invalid rows; it does not implement
 * or test any later-task application/domain behavior (authorization,
 * entitlement consumption, RSVP workflow, etc.).
 */

import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { createDbClient } from "./client";
import type { DbClient } from "./client";
import { requireTestDatabaseUrl } from "./test-safety";
import { accounts, events, invitations, invitationVersions } from "./schema";

let client: DbClient;

beforeAll(() => {
  client = createDbClient(requireTestDatabaseUrl());
});

afterAll(async () => {
  await client.close();
});

/** Synthetic-only cleanup: this suite creates no product/business data. */
afterEach(async () => {
  await client.db.execute(sql`delete from invitation_versions`);
  await client.db.execute(sql`delete from invitations`);
  await client.db.execute(sql`delete from events`);
  await client.db.execute(sql`delete from accounts`);
});

async function insertSyntheticAccount(): Promise<string> {
  const [account] = await client.db
    .insert(accounts)
    .values({
      authSubject: `test-subject-${crypto.randomUUID()}`,
      emailNormalized: `test-${crypto.randomUUID()}@example.invalid`,
      status: "ACTIVE",
    })
    .returning({ id: accounts.id });
  if (!account) throw new Error("failed to insert synthetic account");
  return account.id;
}

async function insertSyntheticEvent(ownerAccountId: string): Promise<string> {
  const [event] = await client.db
    .insert(events)
    .values({ ownerAccountId })
    .returning({ id: events.id });
  if (!event) throw new Error("failed to insert synthetic event");
  return event.id;
}

describe("uniqueness", () => {
  it("rejects a duplicate account auth_subject", async () => {
    const authSubject = `test-subject-${crypto.randomUUID()}`;
    await client.db.insert(accounts).values({
      authSubject,
      emailNormalized: `test-${crypto.randomUUID()}@example.invalid`,
      status: "ACTIVE",
    });

    await expect(
      client.db.insert(accounts).values({
        authSubject,
        emailNormalized: `test-${crypto.randomUUID()}@example.invalid`,
        status: "ACTIVE",
      }),
    ).rejects.toThrow(/duplicate key/i);
  });
});

describe("foreign key enforcement", () => {
  it("rejects an event referencing a non-existent owner account", async () => {
    await expect(
      client.db.insert(events).values({
        ownerAccountId: crypto.randomUUID(),
      }),
    ).rejects.toThrow(/foreign key/i);
  });
});

describe("check constraints", () => {
  it("rejects an events row with an unapproved status value", async () => {
    const accountId = await insertSyntheticAccount();
    await expect(
      client.db.insert(events).values({
        ownerAccountId: accountId,
        status: "NOT_A_REAL_STATUS",
      }),
    ).rejects.toThrow(/check constraint/i);
  });

  it("rejects an ATTENDING rsvp_submission with attendee_count = 0", async () => {
    const accountId = await insertSyntheticAccount();
    const eventId = await insertSyntheticEvent(accountId);
    const [party] = await client.db
      .execute<{ id: string }>(
        sql`insert into guest_parties (event_id, display_name, source) values (${eventId}, 'Test Party', 'MANUAL') returning id`,
      )
      .then((r) => r.rows);
    if (!party) throw new Error("failed to insert synthetic guest party");

    await expect(
      client.db.execute(
        sql`insert into rsvp_submissions
            (guest_party_id, revision_number, attendance_status, attendee_count, submitted_at, submission_source)
            values (${party.id}, 1, 'ATTENDING', 0, now(), 'GUEST')`,
      ),
    ).rejects.toThrow(/check constraint/i);

    await client.db.execute(
      sql`delete from guest_parties where id = ${party.id}`,
    );
  });
});

describe("uuidv7() defaults", () => {
  it("generates a version-7 UUID for a new account without an explicit id", async () => {
    const accountId = await insertSyntheticAccount();
    expect(accountId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });
});

describe("impossible structural combinations", () => {
  it("rejects current_version_id pointing at a version of a different invitation", async () => {
    const accountId = await insertSyntheticAccount();
    const eventOneId = await insertSyntheticEvent(accountId);
    const eventTwoId = await insertSyntheticEvent(accountId);

    const [invitationOne] = await client.db
      .insert(invitations)
      .values({
        eventId: eventOneId,
        publicSlug: `slug-one-${crypto.randomUUID()}`,
      })
      .returning({ id: invitations.id });
    const [invitationTwo] = await client.db
      .insert(invitations)
      .values({
        eventId: eventTwoId,
        publicSlug: `slug-two-${crypto.randomUUID()}`,
      })
      .returning({ id: invitations.id });
    if (!invitationOne || !invitationTwo) {
      throw new Error("failed to insert synthetic invitations");
    }

    const [versionOfInvitationTwo] = await client.db
      .insert(invitationVersions)
      .values({
        invitationId: invitationTwo.id,
        versionNumber: 1,
        designConfig: {},
        copyConfig: {},
        validationStatus: "PENDING",
        createdByAccountId: accountId,
      })
      .returning({ id: invitationVersions.id });
    if (!versionOfInvitationTwo) {
      throw new Error("failed to insert synthetic invitation version");
    }

    // invitationOne.current_version_id must belong to invitationOne, not
    // invitationTwo — the composite foreign key must reject this.
    await expect(
      client.db
        .update(invitations)
        .set({ currentVersionId: versionOfInvitationTwo.id })
        .where(sql`${invitations.id} = ${invitationOne.id}`),
    ).rejects.toThrow(/foreign key/i);
  });
});

describe("database role separation", () => {
  it("revokes UPDATE/DELETE on the append-only tables from app_runtime", async () => {
    const result = await client.db.execute<{
      table_name: string;
      privilege_type: string;
    }>(
      sql`select table_name, privilege_type from information_schema.role_table_grants
          where grantee = 'app_runtime' and table_schema = 'public'
            and table_name in ('audit_events', 'entitlement_ledger_entries', 'invitation_versions', 'rsvp_submissions', 'payment_transactions')
            and privilege_type in ('UPDATE', 'DELETE')`,
    );
    expect(result.rows).toEqual([]);
  });

  it("still grants SELECT and INSERT on those tables to app_runtime", async () => {
    const result = await client.db.execute<{ privilege_type: string }>(
      sql`select privilege_type from information_schema.role_table_grants
          where grantee = 'app_runtime' and table_schema = 'public'
            and table_name = 'audit_events' and privilege_type in ('SELECT', 'INSERT')`,
    );
    const privileges = result.rows.map((row) => row.privilege_type).sort();
    expect(privileges).toEqual(["INSERT", "SELECT"]);
  });

  it("grants ordinary CRUD on a mutable table to app_runtime", async () => {
    const result = await client.db.execute<{ privilege_type: string }>(
      sql`select privilege_type from information_schema.role_table_grants
          where grantee = 'app_runtime' and table_schema = 'public'
            and table_name = 'events' and privilege_type in ('SELECT', 'INSERT', 'UPDATE', 'DELETE')`,
    );
    const privileges = result.rows.map((row) => row.privilege_type).sort();
    expect(privileges).toEqual(["DELETE", "INSERT", "SELECT", "UPDATE"]);
  });
});
