import { describe, expect, it } from "vitest";
import { loadServerEnv } from "./env";

describe("loadServerEnv", () => {
  it("applies safe defaults when nothing is configured", () => {
    const env = loadServerEnv({});

    expect(env).toEqual({
      appEnv: "development",
      logLevel: "info",
      defaultLocale: "en",
      defaultCurrency: "MUR",
      appTimezone: "Indian/Mauritius",
    });
  });

  it("accepts explicit valid values", () => {
    const env = loadServerEnv({
      APP_ENV: "test",
      LOG_LEVEL: "debug",
      DEFAULT_LOCALE: "fr",
      DEFAULT_CURRENCY: "EUR",
      APP_TIMEZONE: "Europe/Paris",
    });

    expect(env).toEqual({
      appEnv: "test",
      logLevel: "debug",
      defaultLocale: "fr",
      defaultCurrency: "EUR",
      appTimezone: "Europe/Paris",
    });
  });

  it("fails safely on an invalid APP_ENV without leaking unrelated env content", () => {
    expect(() => loadServerEnv({ APP_ENV: "production-ish" })).toThrowError(
      /Invalid APP_ENV/,
    );
  });

  it("fails safely on an invalid LOG_LEVEL", () => {
    expect(() => loadServerEnv({ LOG_LEVEL: "verbose" })).toThrowError(
      /Invalid LOG_LEVEL/,
    );
  });

  it("never includes secret-shaped keys in its return value", () => {
    const env = loadServerEnv({
      APP_ENV: "development",
      APP_SECRET: "should-not-appear",
      DATABASE_URL: "postgres://should-not-appear",
    });

    const serialized = JSON.stringify(env);
    expect(serialized).not.toContain("should-not-appear");
    expect(env).not.toHaveProperty("appSecret");
    expect(env).not.toHaveProperty("databaseUrl");
  });
});
