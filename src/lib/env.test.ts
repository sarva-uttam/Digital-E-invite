import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { loadServerEnv, toPublicConfig } from "./env";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

/**
 * Comprehensive parsing/validation behavior is covered by config.test.ts
 * against the framework-agnostic ./config module. This file only proves
 * that the Next.js-facing "server-only" barrel remains the protected
 * entry point and correctly defaults to the real process environment.
 */
describe("env (Next.js server-only entry point)", () => {
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

  it("defaults to the real process.env when called with no argument", () => {
    process.env.APP_NAME = "Canary Web App Name For Env Wrapper Test";
    const env = loadServerEnv();
    expect(env.appName).toBe("Canary Web App Name For Env Wrapper Test");
  });

  it('still guards this module with the "server-only" import', () => {
    const sourcePath = fileURLToPath(new URL("./env.ts", import.meta.url));
    const source = readFileSync(sourcePath, "utf8");
    expect(source).toMatch(/^import\s+["']server-only["'];/m);
  });
});
