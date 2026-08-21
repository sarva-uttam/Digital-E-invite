import { describe, expect, it } from "vitest";
import { loadServerEnv, toPublicConfig } from "./env";

/**
 * Comprehensive parsing/validation behavior is covered by config.test.ts
 * against the framework-agnostic ./config module. This file only proves
 * that the Next.js-facing "server-only" barrel re-exports the same
 * boundary correctly.
 */
describe("env (Next.js server-only re-export)", () => {
  it("re-exports loadServerEnv with correct default behavior", () => {
    const env = loadServerEnv({});
    expect(env.appEnv).toBe("development");
    expect(env.defaultCurrency).toBe("MUR");
  });

  it("re-exports toPublicConfig with the same narrow allow-listed shape", () => {
    const env = loadServerEnv({});
    expect(toPublicConfig(env)).toEqual({
      defaultLocale: "en",
      defaultCurrency: "MUR",
      appTimezone: "Indian/Mauritius",
      publicAppUrl: undefined,
    });
  });

  it("keeps secret-bearing configuration out of the public shape (see config.test.ts for the full canary suite)", () => {
    const env = loadServerEnv({
      APP_ENV: "development",
      APP_SECRET: "should-not-appear-anywhere-in-public-output-1234",
    });

    const serialized = JSON.stringify(toPublicConfig(env));
    expect(serialized).not.toContain("should-not-appear");
  });
});
