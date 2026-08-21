import { describe, expect, it } from "vitest";
import { loadServerEnv, toPublicConfig } from "./config";

describe("loadServerEnv", () => {
  it("1. applies safe defaults for a default development configuration", () => {
    const env = loadServerEnv({});

    expect(env.appEnv).toBe("development");
    expect(env.logLevel).toBe("info");
    expect(env.appName).toBe("AI Digital Invitation Platform");
    expect(env.appUrl).toBeUndefined();
    expect(env.publicAppUrl).toBeUndefined();
    expect(env.defaultLocale).toBe("en");
    expect(env.defaultCurrency).toBe("MUR");
    expect(env.appTimezone).toBe("Indian/Mauritius");
    expect(env.allowedOrigins).toEqual([]);
    expect(env.trustedProxyCount).toBeUndefined();
    expect(env.features).toEqual({
      payments: false,
      aiText: false,
      aiImage: false,
      emailDelivery: false,
      eurCheckout: false,
      usdCheckout: false,
      mauritianKreol: false,
      russian: false,
    });
    expect(env.appSecrets).toEqual({
      appSecret: undefined,
      encryptionKey: undefined,
      tokenHashKey: undefined,
    });
    expect(env.payment).toEqual({
      mode: "sandbox",
      baseCurrency: "MUR",
      supportedCurrencies: ["MUR"],
    });
    expect(env.providerConfig).toEqual({});
  });

  it("2. parses a valid explicit configuration to the expected typed representation", () => {
    const env = loadServerEnv({
      APP_ENV: "test",
      LOG_LEVEL: "debug",
      APP_NAME: "Test App",
      APP_URL: "https://app.example.test",
      PUBLIC_APP_URL: "https://example.test",
      DEFAULT_LOCALE: "fr",
      DEFAULT_CURRENCY: "EUR",
      APP_TIMEZONE: "Europe/Paris",
      ALLOWED_ORIGINS: "https://example.test,https://admin.example.test:8443",
      TRUSTED_PROXY_COUNT: "2",
      PAYMENT_MODE: "live",
      PAYMENT_BASE_CURRENCY: "EUR",
      PAYMENT_SUPPORTED_CURRENCIES: "EUR,USD,MUR",
    });

    expect(env.appEnv).toBe("test");
    expect(env.logLevel).toBe("debug");
    expect(env.appName).toBe("Test App");
    expect(env.appUrl?.toString()).toBe("https://app.example.test/");
    expect(env.publicAppUrl?.toString()).toBe("https://example.test/");
    expect(env.defaultLocale).toBe("fr");
    expect(env.defaultCurrency).toBe("EUR");
    expect(env.appTimezone).toBe("Europe/Paris");
    expect(env.allowedOrigins).toEqual([
      "https://example.test",
      "https://admin.example.test:8443",
    ]);
    expect(env.trustedProxyCount).toBe(2);
    expect(env.payment).toEqual({
      mode: "live",
      baseCurrency: "EUR",
      supportedCurrencies: ["EUR", "USD", "MUR"],
    });
  });

  it("3. fails safely on an invalid APP_ENV without leaking unrelated env content", () => {
    expect(() => loadServerEnv({ APP_ENV: "production-ish" })).toThrowError(
      /Invalid APP_ENV/,
    );
  });

  it("4. fails safely on an invalid LOG_LEVEL", () => {
    expect(() => loadServerEnv({ LOG_LEVEL: "verbose" })).toThrowError(
      /Invalid LOG_LEVEL/,
    );
  });

  describe("5. strict boolean parsing", () => {
    it("accepts exactly 'true' and 'false'", () => {
      expect(loadServerEnv({ ENABLE_AI_TEXT: "true" }).features.aiText).toBe(
        true,
      );
      expect(loadServerEnv({ ENABLE_AI_TEXT: "false" }).features.aiText).toBe(
        false,
      );
    });

    it.each(["1", "0", "yes", "no", "TRUE", "True", "on"])(
      "rejects ambiguous value %s",
      (value) => {
        expect(() => loadServerEnv({ ENABLE_AI_TEXT: value })).toThrowError(
          /Invalid ENABLE_AI_TEXT/,
        );
      },
    );
  });

  describe("6. invalid numeric values fail", () => {
    it("rejects a non-integer TRUSTED_PROXY_COUNT", () => {
      expect(() =>
        loadServerEnv({ TRUSTED_PROXY_COUNT: "not-a-number" }),
      ).toThrowError(/Invalid TRUSTED_PROXY_COUNT/);
    });

    it("rejects a negative TRUSTED_PROXY_COUNT", () => {
      expect(() => loadServerEnv({ TRUSTED_PROXY_COUNT: "-1" })).toThrowError(
        /Invalid TRUSTED_PROXY_COUNT/,
      );
    });

    it("rejects DATABASE_POOL_MIN greater than DATABASE_POOL_MAX", () => {
      expect(() =>
        loadServerEnv({ DATABASE_POOL_MIN: "10", DATABASE_POOL_MAX: "2" }),
      ).toThrowError(/DATABASE_POOL_MIN must not exceed DATABASE_POOL_MAX/);
    });
  });

  describe("7. malformed URLs fail", () => {
    it("rejects a malformed APP_URL", () => {
      expect(() => loadServerEnv({ APP_URL: "not a url" })).toThrowError(
        /Invalid APP_URL/,
      );
    });

    it("rejects a malformed PUBLIC_APP_URL", () => {
      expect(() => loadServerEnv({ PUBLIC_APP_URL: "not a url" })).toThrowError(
        /Invalid PUBLIC_APP_URL/,
      );
    });
  });

  describe("8. malformed list/origin configuration fails safely", () => {
    it("rejects an ALLOWED_ORIGINS entry that includes a path", () => {
      expect(() =>
        loadServerEnv({ ALLOWED_ORIGINS: "https://example.test/some-path" }),
      ).toThrowError(/must be an origin only/);
    });

    it("rejects an ALLOWED_ORIGINS entry that is not a URL", () => {
      expect(() =>
        loadServerEnv({ ALLOWED_ORIGINS: "example.test" }),
      ).toThrowError(/is not a well-formed origin/);
    });

    it("rejects a lowercase currency code in PAYMENT_SUPPORTED_CURRENCIES", () => {
      expect(() =>
        loadServerEnv({ PAYMENT_SUPPORTED_CURRENCIES: "usd" }),
      ).toThrowError(/Invalid PAYMENT_SUPPORTED_CURRENCIES/);
    });
  });

  it("9. disabled provider-dependent capabilities do not require provider credentials", () => {
    const env = loadServerEnv({
      ENABLE_AI_TEXT: "false",
      ENABLE_AI_IMAGE: "false",
      ENABLE_EMAIL_DELIVERY: "false",
      ENABLE_PAYMENTS: "false",
      // All provider-specific credentials intentionally blank/absent.
    });

    expect(env.features.aiText).toBe(false);
    expect(env.features.aiImage).toBe(false);
    expect(env.features.emailDelivery).toBe(false);
    expect(env.features.payments).toBe(false);
    expect(env.providerConfig).toEqual({});
  });

  describe("10. enabling a capability without its required generic configuration fails closed", () => {
    it("rejects ENABLE_PAYMENTS=true without PUBLIC_APP_URL", () => {
      expect(() => loadServerEnv({ ENABLE_PAYMENTS: "true" })).toThrowError(
        /ENABLE_PAYMENTS=true requires PUBLIC_APP_URL/,
      );
    });

    it("accepts ENABLE_PAYMENTS=true once PUBLIC_APP_URL is configured", () => {
      const env = loadServerEnv({
        ENABLE_PAYMENTS: "true",
        PUBLIC_APP_URL: "https://example.test",
      });
      expect(env.features.payments).toBe(true);
    });

    it("rejects ENABLE_EUR_CHECKOUT=true without EUR in PAYMENT_SUPPORTED_CURRENCIES", () => {
      expect(() => loadServerEnv({ ENABLE_EUR_CHECKOUT: "true" })).toThrowError(
        /ENABLE_EUR_CHECKOUT=true requires "EUR"/,
      );
    });

    it("rejects ENABLE_USD_CHECKOUT=true without USD in PAYMENT_SUPPORTED_CURRENCIES", () => {
      expect(() => loadServerEnv({ ENABLE_USD_CHECKOUT: "true" })).toThrowError(
        /ENABLE_USD_CHECKOUT=true requires "USD"/,
      );
    });

    it("accepts ENABLE_EUR_CHECKOUT=true once EUR is listed", () => {
      const env = loadServerEnv({
        ENABLE_EUR_CHECKOUT: "true",
        PAYMENT_SUPPORTED_CURRENCIES: "MUR,EUR",
      });
      expect(env.features.eurCheckout).toBe(true);
    });
  });

  describe("11. production/preview explicit requirements are enforced", () => {
    it("rejects APP_ENV=production without APP_URL, PUBLIC_APP_URL, or ALLOWED_ORIGINS", () => {
      expect(() => loadServerEnv({ APP_ENV: "production" })).toThrowError(
        /APP_URL is required when APP_ENV is "production"/,
      );
    });

    it("rejects APP_ENV=production with APP_URL but missing PUBLIC_APP_URL", () => {
      expect(() =>
        loadServerEnv({
          APP_ENV: "production",
          APP_URL: "https://example.test",
        }),
      ).toThrowError(/PUBLIC_APP_URL is required when APP_ENV is "production"/);
    });

    it("rejects APP_ENV=preview without ALLOWED_ORIGINS", () => {
      expect(() =>
        loadServerEnv({
          APP_ENV: "preview",
          APP_URL: "https://preview.example.test",
          PUBLIC_APP_URL: "https://preview.example.test",
        }),
      ).toThrowError(/ALLOWED_ORIGINS must list at least one origin/);
    });

    it("accepts APP_ENV=production once all explicit requirements are satisfied", () => {
      const env = loadServerEnv({
        APP_ENV: "production",
        APP_URL: "https://example.test",
        PUBLIC_APP_URL: "https://example.test",
        ALLOWED_ORIGINS: "https://example.test",
      });
      expect(env.appEnv).toBe("production");
    });

    it("does not require APP_URL/PUBLIC_APP_URL/ALLOWED_ORIGINS in development or test", () => {
      expect(() => loadServerEnv({ APP_ENV: "development" })).not.toThrow();
      expect(() => loadServerEnv({ APP_ENV: "test" })).not.toThrow();
    });
  });

  it("12. server secrets never appear in the public configuration", () => {
    const CANARY = "canary-secret-value-should-never-leak-9f3c2a";
    const env = loadServerEnv({
      APP_SECRET: `${CANARY}-app-secret-padding`,
      ENCRYPTION_KEY: `${CANARY}-encryption-key-padding`,
      TOKEN_HASH_KEY: `${CANARY}-token-hash-key-padding`,
      DATABASE_URL: `postgres://user:${CANARY}@db.example.test:5432/app`,
      AUTH_CLIENT_SECRET: CANARY,
      PAYMENT_SECRET_KEY: CANARY,
      AI_TEXT_API_KEY: CANARY,
    });

    const publicConfig = toPublicConfig(env);
    const serialized = JSON.stringify(publicConfig);
    expect(serialized).not.toContain(CANARY);
    expect(publicConfig).not.toHaveProperty("appSecrets");
    expect(publicConfig).not.toHaveProperty("database");
    expect(publicConfig).not.toHaveProperty("providerConfig");
  });

  it("13. unknown, unrelated process environment variables do not cause false failures", () => {
    expect(() =>
      loadServerEnv({
        PATH: "/usr/bin:/bin",
        HOME: "/home/runner",
        CI: "true",
        GITHUB_ACTIONS: "true",
        RANDOM_UNRELATED_VARIABLE: "anything at all",
        npm_package_version: "0.1.0",
      }),
    ).not.toThrow();
  });

  it("14. configuration errors do not include supplied secret values", () => {
    const CANARY = "super-secret-password-should-not-leak-4b7e";
    try {
      loadServerEnv({
        DATABASE_URL: `not a valid connection string ${CANARY}`,
      });
      expect.unreachable("expected loadServerEnv to throw");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      expect(message).not.toContain(CANARY);
      expect(message).toMatch(/Invalid DATABASE_URL/);
    }
  });

  describe("15. blank values have the approved 'not configured' semantics", () => {
    it("treats a blank APP_URL as not configured rather than invalid", () => {
      const env = loadServerEnv({ APP_URL: "" });
      expect(env.appUrl).toBeUndefined();
    });

    it("treats a whitespace-only value as not configured", () => {
      const env = loadServerEnv({ AUTH_CLIENT_SECRET: "   " });
      expect(env.providerConfig.AUTH_CLIENT_SECRET).toBeUndefined();
    });

    it("omits blank provider config keys from providerConfig entirely", () => {
      const env = loadServerEnv({
        AUTH_PROVIDER: "",
        STORAGE_PROVIDER: "  ",
      });
      expect(Object.keys(env.providerConfig)).not.toContain("AUTH_PROVIDER");
      expect(Object.keys(env.providerConfig)).not.toContain("STORAGE_PROVIDER");
    });
  });

  it("16. defaults remain correct across repeated calls", () => {
    expect(loadServerEnv({})).toEqual(loadServerEnv({}));
  });

  it("keeps opaque provider config present but unvalidated when supplied", () => {
    const env = loadServerEnv({
      AUTH_PROVIDER: "some-future-provider",
      STORAGE_REGION: "eu-west-1",
    });
    expect(env.providerConfig.AUTH_PROVIDER).toBe("some-future-provider");
    expect(env.providerConfig.STORAGE_REGION).toBe("eu-west-1");
  });

  it("rejects an unrecognized DATABASE_SSL_MODE", () => {
    expect(() => loadServerEnv({ DATABASE_SSL_MODE: "trust-me" })).toThrowError(
      /Invalid DATABASE_SSL_MODE/,
    );
  });

  it("rejects an unrecognized IANA time zone", () => {
    expect(() =>
      loadServerEnv({ APP_TIMEZONE: "Not/A_Real_Zone" }),
    ).toThrowError(/Invalid APP_TIMEZONE/);
  });

  it("rejects a malformed DEFAULT_CURRENCY", () => {
    expect(() => loadServerEnv({ DEFAULT_CURRENCY: "eu" })).toThrowError(
      /Invalid DEFAULT_CURRENCY/,
    );
  });
});

describe("toPublicConfig", () => {
  it("17. contains only the explicitly allow-listed public fields", () => {
    const env = loadServerEnv({
      DEFAULT_LOCALE: "fr",
      DEFAULT_CURRENCY: "EUR",
      APP_TIMEZONE: "Europe/Paris",
      PUBLIC_APP_URL: "https://example.test",
    });

    const publicConfig = toPublicConfig(env);

    expect(Object.keys(publicConfig).sort()).toEqual(
      [
        "appTimezone",
        "defaultCurrency",
        "defaultLocale",
        "publicAppUrl",
      ].sort(),
    );
    expect(publicConfig).toEqual({
      defaultLocale: "fr",
      defaultCurrency: "EUR",
      appTimezone: "Europe/Paris",
      publicAppUrl: "https://example.test/",
    });
  });

  it("represents an unconfigured PUBLIC_APP_URL as undefined, not a placeholder", () => {
    const env = loadServerEnv({});
    expect(toPublicConfig(env).publicAppUrl).toBeUndefined();
  });
});
