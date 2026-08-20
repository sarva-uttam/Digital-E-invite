import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/health", () => {
  it("returns 200 with a safe, deterministic body", async () => {
    const response = GET();

    expect(response.status).toBe(200);

    const body = (await response.json()) as Record<string, unknown>;
    expect(body.status).toBe("ok");
    expect(body.service).toBe("ai-digital-invitation-platform");
    expect(typeof body.time).toBe("string");
    expect(() => new Date(body.time as string).toISOString()).not.toThrow();
  });

  it("does not expose secrets, environment variables, or provider detail", async () => {
    const response = GET();
    const body = (await response.json()) as Record<string, unknown>;
    const serialized = JSON.stringify(body).toLowerCase();

    for (const forbidden of [
      "secret",
      "password",
      "token",
      "key",
      "database_url",
      "provider",
    ]) {
      expect(serialized).not.toContain(forbidden);
    }
  });
});
