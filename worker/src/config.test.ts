import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { loadWorkerEnv, toPublicConfig } from "./config";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("worker config boundary", () => {
  it("loads the same typed configuration as the web app given an explicit source", () => {
    const env = loadWorkerEnv({ APP_ENV: "test", DEFAULT_CURRENCY: "EUR" });
    expect(env.appEnv).toBe("test");
    expect(env.defaultCurrency).toBe("EUR");
  });

  it("defaults to the real process.env, like the Next.js wrapper does", () => {
    process.env.APP_NAME = "Canary Worker App Name";
    const env = loadWorkerEnv();
    expect(env.appName).toBe("Canary Worker App Name");
  });

  it("derives the same narrow public configuration shape", () => {
    const env = loadWorkerEnv({});
    expect(toPublicConfig(env)).toEqual({
      defaultLocale: "en",
      defaultCurrency: "MUR",
      appTimezone: "Indian/Mauritius",
      publicAppUrl: undefined,
    });
  });

  it("does not depend on the server-only package, so it is safe to run in a plain Node.js process", () => {
    const sharedConfigSourcePath = fileURLToPath(
      new URL("../../src/lib/config.ts", import.meta.url),
    );
    const source = readFileSync(sharedConfigSourcePath, "utf8");
    expect(source).not.toMatch(/^\s*import\s+["']server-only["']/m);

    const thisModuleSourcePath = fileURLToPath(
      new URL("./config.ts", import.meta.url),
    );
    expect(readFileSync(thisModuleSourcePath, "utf8")).not.toMatch(
      /^\s*import\s+["']server-only["']/m,
    );
  });

  it("the shared parser it delegates to never references process.env directly", () => {
    const sharedConfigSourcePath = fileURLToPath(
      new URL("../../src/lib/config.ts", import.meta.url),
    );
    const source = readFileSync(sharedConfigSourcePath, "utf8");
    expect(source).not.toMatch(/process\.env/);
  });
});
