import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { loadServerEnv, toPublicConfig } from "./config";

describe("worker config boundary", () => {
  it("loads the same typed configuration as the web app", () => {
    const env = loadServerEnv({ APP_ENV: "test", DEFAULT_CURRENCY: "EUR" });
    expect(env.appEnv).toBe("test");
    expect(env.defaultCurrency).toBe("EUR");
  });

  it("derives the same narrow public configuration shape", () => {
    const env = loadServerEnv({});
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
});
