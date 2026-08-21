import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { parseServerEnv, toPublicConfig } from "./config";

describe("parseServerEnv", () => {
  it("1. applies safe defaults for a default development configuration", () => {
    const env = parseServerEnv({});

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
    const env = parseServerEnv({
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
      PAYMENT_MODE: "sandbox",
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
      mode: "sandbox",
      baseCurrency: "EUR",
      supportedCurrencies: ["EUR", "USD", "MUR"],
    });
  });

  it("3. fails safely on an invalid APP_ENV without leaking unrelated env content", () => {
    expect(() => parseServerEnv({ APP_ENV: "production-ish" })).toThrowError(
      /Invalid APP_ENV/,
    );
  });

  it("4. fails safely on an invalid LOG_LEVEL", () => {
    expect(() => parseServerEnv({ LOG_LEVEL: "verbose" })).toThrowError(
      /Invalid LOG_LEVEL/,
    );
  });

  describe("5. strict boolean parsing", () => {
    it("accepts exactly 'true' and 'false'", () => {
      expect(parseServerEnv({ ENABLE_AI_TEXT: "true" }).features.aiText).toBe(
        true,
      );
      expect(parseServerEnv({ ENABLE_AI_TEXT: "false" }).features.aiText).toBe(
        false,
      );
    });

    it.each(["1", "0", "yes", "no", "TRUE", "True", "on"])(
      "rejects ambiguous value %s",
      (value) => {
        expect(() => parseServerEnv({ ENABLE_AI_TEXT: value })).toThrowError(
          /Invalid ENABLE_AI_TEXT/,
        );
      },
    );
  });

  describe("6. invalid numeric values fail", () => {
    it("rejects a non-integer TRUSTED_PROXY_COUNT", () => {
      expect(() =>
        parseServerEnv({ TRUSTED_PROXY_COUNT: "not-a-number" }),
      ).toThrowError(/Invalid TRUSTED_PROXY_COUNT/);
    });

    it("rejects a negative TRUSTED_PROXY_COUNT", () => {
      expect(() => parseServerEnv({ TRUSTED_PROXY_COUNT: "-1" })).toThrowError(
        /Invalid TRUSTED_PROXY_COUNT/,
      );
    });

    it("rejects DATABASE_POOL_MIN greater than DATABASE_POOL_MAX", () => {
      expect(() =>
        parseServerEnv({ DATABASE_POOL_MIN: "10", DATABASE_POOL_MAX: "2" }),
      ).toThrowError(/DATABASE_POOL_MIN must not exceed DATABASE_POOL_MAX/);
    });
  });

  describe("7. malformed URLs fail", () => {
    it("rejects a malformed APP_URL", () => {
      expect(() => parseServerEnv({ APP_URL: "not a url" })).toThrowError(
        /Invalid APP_URL/,
      );
    });

    it("rejects a malformed PUBLIC_APP_URL", () => {
      expect(() =>
        parseServerEnv({ PUBLIC_APP_URL: "not a url" }),
      ).toThrowError(/Invalid PUBLIC_APP_URL/);
    });

    it.each(["ftp:", "file:", "javascript:", "data:"])(
      "rejects a non-web %s scheme for APP_URL",
      (scheme) => {
        expect(() =>
          parseServerEnv({ APP_URL: `${scheme}//example.test/resource` }),
        ).toThrowError(/Invalid APP_URL.*must use http: or https:/);
      },
    );

    it("rejects a non-web scheme for PUBLIC_APP_URL", () => {
      expect(() =>
        parseServerEnv({ PUBLIC_APP_URL: "ftp://example.test" }),
      ).toThrowError(/Invalid PUBLIC_APP_URL.*must use http: or https:/);
    });

    it("accepts http: for APP_URL (development/test localhost)", () => {
      const env = parseServerEnv({ APP_URL: "http://localhost:3000" });
      expect(env.appUrl?.toString()).toBe("http://localhost:3000/");
    });

    it("rejects APP_URL with embedded credentials without echoing them", () => {
      const CANARY = "canary-url-password-should-not-leak-7c1e";
      try {
        parseServerEnv({ APP_URL: `https://user:${CANARY}@example.test` });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toMatch(/Invalid APP_URL.*embedded credentials/);
        expect(message).not.toContain(CANARY);
      }
    });

    it("rejects PUBLIC_APP_URL with embedded credentials without echoing them", () => {
      const CANARY = "canary-public-url-password-should-not-leak-3d9a";
      try {
        parseServerEnv({
          PUBLIC_APP_URL: `https://user:${CANARY}@example.test`,
        });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toMatch(/Invalid PUBLIC_APP_URL.*embedded credentials/);
        expect(message).not.toContain(CANARY);
      }
    });

    it("rejects an APP_URL that is both credential-bearing and non-web-scheme without ever echoing the raw URL (protocol check fires first)", () => {
      const CANARY = "canary-ftp-scheme-password-should-not-leak-9b2d";
      const rawUrl = `ftp://user:${CANARY}@example.test`;
      try {
        parseServerEnv({ APP_URL: rawUrl });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toMatch(/Invalid APP_URL/);
        expect(message).not.toContain(CANARY);
        expect(message).not.toContain("user");
        expect(message).not.toContain(rawUrl);
      }
    });

    it("rejects a malformed, credential-bearing APP_URL without echoing it (constructor throws before any rule check)", () => {
      const CANARY = "canary-malformed-url-password-should-not-leak-5f1c";
      const rawUrl = `not a well formed url user:${CANARY}@example.test`;
      try {
        parseServerEnv({ APP_URL: rawUrl });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toMatch(/Invalid APP_URL/);
        expect(message).not.toContain(CANARY);
        expect(message).not.toContain("user");
        expect(message).not.toContain(rawUrl);
      }
    });

    it("rejects a PUBLIC_APP_URL that is both credential-bearing and non-web-scheme without ever echoing the raw URL", () => {
      const CANARY = "canary-ftp-public-password-should-not-leak-4e7a";
      const rawUrl = `ftp://user:${CANARY}@example.test`;
      try {
        parseServerEnv({ PUBLIC_APP_URL: rawUrl });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toMatch(/Invalid PUBLIC_APP_URL/);
        expect(message).not.toContain(CANARY);
        expect(message).not.toContain("user");
        expect(message).not.toContain(rawUrl);
      }
    });

    it("rejects a malformed, credential-bearing PUBLIC_APP_URL without echoing it", () => {
      const CANARY = "canary-malformed-public-password-should-not-leak-2a9d";
      const rawUrl = `not a well formed url user:${CANARY}@example.test`;
      try {
        parseServerEnv({ PUBLIC_APP_URL: rawUrl });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toMatch(/Invalid PUBLIC_APP_URL/);
        expect(message).not.toContain(CANARY);
        expect(message).not.toContain("user");
        expect(message).not.toContain(rawUrl);
      }
    });
  });

  describe("8. malformed list/origin configuration fails safely", () => {
    it("rejects an ALLOWED_ORIGINS entry that includes a path", () => {
      expect(() =>
        parseServerEnv({ ALLOWED_ORIGINS: "https://example.test/some-path" }),
      ).toThrowError(/must be an origin only/);
    });

    it("rejects an ALLOWED_ORIGINS entry that is not a URL", () => {
      expect(() =>
        parseServerEnv({ ALLOWED_ORIGINS: "example.test" }),
      ).toThrowError(/is not a well-formed origin/);
    });

    it("rejects a lowercase currency code in PAYMENT_SUPPORTED_CURRENCIES", () => {
      expect(() =>
        parseServerEnv({ PAYMENT_SUPPORTED_CURRENCIES: "usd" }),
      ).toThrowError(/Invalid PAYMENT_SUPPORTED_CURRENCIES/);
    });

    it("rejects a non-web scheme in an ALLOWED_ORIGINS entry", () => {
      expect(() =>
        parseServerEnv({ ALLOWED_ORIGINS: "ftp://example.test" }),
      ).toThrowError(/Invalid ALLOWED_ORIGINS.*must use http: or https:/);
    });

    it("rejects an ALLOWED_ORIGINS entry with embedded credentials without echoing them", () => {
      const CANARY = "canary-origin-password-should-not-leak-6a2f";
      try {
        parseServerEnv({
          ALLOWED_ORIGINS: `https://user:${CANARY}@example.test`,
        });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toMatch(
          /Invalid ALLOWED_ORIGINS.*embedded credentials/,
        );
        expect(message).not.toContain(CANARY);
      }
    });

    it("rejects an ALLOWED_ORIGINS entry that is both credential-bearing and non-web-scheme without ever echoing the raw entry", () => {
      const CANARY = "canary-origin-ftp-password-should-not-leak-8c3e";
      const rawEntry = `ftp://user:${CANARY}@example.test`;
      try {
        parseServerEnv({ ALLOWED_ORIGINS: rawEntry });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toMatch(/Invalid ALLOWED_ORIGINS/);
        expect(message).not.toContain(CANARY);
        expect(message).not.toContain("user");
        expect(message).not.toContain(rawEntry);
      }
    });

    it("rejects a malformed, credential-bearing ALLOWED_ORIGINS entry without echoing it", () => {
      const CANARY = "canary-origin-malformed-password-should-not-leak-1d6b";
      const rawEntry = `not a well formed origin user:${CANARY}@example.test`;
      try {
        parseServerEnv({ ALLOWED_ORIGINS: rawEntry });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        expect(message).toMatch(/Invalid ALLOWED_ORIGINS/);
        expect(message).not.toContain(CANARY);
        expect(message).not.toContain("user");
        expect(message).not.toContain(rawEntry);
      }
    });

    it("rejects a credential-bearing ALLOWED_ORIGINS entry that also has a path, without echoing it", () => {
      const CANARY = "canary-origin-path-password-should-not-leak-7f4a";
      const rawEntry = `https://user:${CANARY}@example.test/some-path`;
      try {
        parseServerEnv({ ALLOWED_ORIGINS: rawEntry });
        expect.unreachable("expected parseServerEnv to throw");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        // The credentials rule fires before the path rule; either way the
        // raw entry and the canary must never appear in the message.
        expect(message).toMatch(/Invalid ALLOWED_ORIGINS/);
        expect(message).not.toContain(CANARY);
        expect(message).not.toContain("user");
        expect(message).not.toContain(rawEntry);
      }
    });

    it("accepts an http: localhost origin", () => {
      const env = parseServerEnv({
        ALLOWED_ORIGINS: "http://localhost:3000",
      });
      expect(env.allowedOrigins).toEqual(["http://localhost:3000"]);
    });
  });

  it("9. disabled provider-dependent capabilities do not require provider credentials", () => {
    const env = parseServerEnv({
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
      expect(() => parseServerEnv({ ENABLE_PAYMENTS: "true" })).toThrowError(
        /ENABLE_PAYMENTS=true requires PUBLIC_APP_URL/,
      );
    });

    it("accepts ENABLE_PAYMENTS=true once PUBLIC_APP_URL is configured", () => {
      const env = parseServerEnv({
        ENABLE_PAYMENTS: "true",
        PUBLIC_APP_URL: "https://example.test",
      });
      expect(env.features.payments).toBe(true);
    });

    it("rejects ENABLE_EUR_CHECKOUT=true without ENABLE_PAYMENTS=true", () => {
      expect(() =>
        parseServerEnv({ ENABLE_EUR_CHECKOUT: "true" }),
      ).toThrowError(/ENABLE_EUR_CHECKOUT=true requires ENABLE_PAYMENTS=true/);
    });

    it("rejects ENABLE_USD_CHECKOUT=true without ENABLE_PAYMENTS=true", () => {
      expect(() =>
        parseServerEnv({ ENABLE_USD_CHECKOUT: "true" }),
      ).toThrowError(/ENABLE_USD_CHECKOUT=true requires ENABLE_PAYMENTS=true/);
    });

    it("rejects ENABLE_EUR_CHECKOUT=true without EUR in PAYMENT_SUPPORTED_CURRENCIES, once payments is enabled", () => {
      expect(() =>
        parseServerEnv({
          ENABLE_PAYMENTS: "true",
          PUBLIC_APP_URL: "https://example.test",
          ENABLE_EUR_CHECKOUT: "true",
        }),
      ).toThrowError(/ENABLE_EUR_CHECKOUT=true requires "EUR"/);
    });

    it("rejects ENABLE_USD_CHECKOUT=true without USD in PAYMENT_SUPPORTED_CURRENCIES, once payments is enabled", () => {
      expect(() =>
        parseServerEnv({
          ENABLE_PAYMENTS: "true",
          PUBLIC_APP_URL: "https://example.test",
          ENABLE_USD_CHECKOUT: "true",
        }),
      ).toThrowError(/ENABLE_USD_CHECKOUT=true requires "USD"/);
    });

    it("accepts ENABLE_EUR_CHECKOUT=true once payments is enabled and EUR is listed", () => {
      const env = parseServerEnv({
        ENABLE_PAYMENTS: "true",
        PUBLIC_APP_URL: "https://example.test",
        ENABLE_EUR_CHECKOUT: "true",
        PAYMENT_SUPPORTED_CURRENCIES: "MUR,EUR",
      });
      expect(env.features.eurCheckout).toBe(true);
    });

    it("accepts ENABLE_USD_CHECKOUT=true once payments is enabled and USD is listed", () => {
      const env = parseServerEnv({
        ENABLE_PAYMENTS: "true",
        PUBLIC_APP_URL: "https://example.test",
        ENABLE_USD_CHECKOUT: "true",
        PAYMENT_SUPPORTED_CURRENCIES: "MUR,USD",
      });
      expect(env.features.usdCheckout).toBe(true);
    });
  });

  describe("11. production/preview explicit requirements are enforced", () => {
    it("rejects APP_ENV=production without APP_URL, PUBLIC_APP_URL, or ALLOWED_ORIGINS", () => {
      expect(() => parseServerEnv({ APP_ENV: "production" })).toThrowError(
        /APP_URL is required when APP_ENV is "production"/,
      );
    });

    it("rejects APP_ENV=production with APP_URL but missing PUBLIC_APP_URL", () => {
      expect(() =>
        parseServerEnv({
          APP_ENV: "production",
          APP_URL: "https://example.test",
        }),
      ).toThrowError(/PUBLIC_APP_URL is required when APP_ENV is "production"/);
    });

    it("rejects APP_ENV=preview without ALLOWED_ORIGINS", () => {
      expect(() =>
        parseServerEnv({
          APP_ENV: "preview",
          APP_URL: "https://preview.example.test",
          PUBLIC_APP_URL: "https://preview.example.test",
        }),
      ).toThrowError(/ALLOWED_ORIGINS must list at least one origin/);
    });

    it("accepts APP_ENV=production once all explicit requirements are satisfied", () => {
      const env = parseServerEnv({
        APP_ENV: "production",
        APP_URL: "https://example.test",
        PUBLIC_APP_URL: "https://example.test",
        ALLOWED_ORIGINS: "https://example.test",
      });
      expect(env.appEnv).toBe("production");
    });

    it("does not require APP_URL/PUBLIC_APP_URL/ALLOWED_ORIGINS in development or test", () => {
      expect(() => parseServerEnv({ APP_ENV: "development" })).not.toThrow();
      expect(() => parseServerEnv({ APP_ENV: "test" })).not.toThrow();
    });
  });

  it("12. server secrets never appear in the public configuration", () => {
    const CANARY = "canary-secret-value-should-never-leak-9f3c2a";
    const env = parseServerEnv({
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
      parseServerEnv({
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
      parseServerEnv({
        DATABASE_URL: `not a valid connection string ${CANARY}`,
      });
      expect.unreachable("expected parseServerEnv to throw");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      expect(message).not.toContain(CANARY);
      expect(message).toMatch(/Invalid DATABASE_URL/);
    }
  });

  describe("15. blank values have the approved 'not configured' semantics", () => {
    it("treats a blank APP_URL as not configured rather than invalid", () => {
      const env = parseServerEnv({ APP_URL: "" });
      expect(env.appUrl).toBeUndefined();
    });

    it("treats a whitespace-only value as not configured", () => {
      const env = parseServerEnv({ AUTH_CLIENT_SECRET: "   " });
      expect(env.providerConfig.AUTH_CLIENT_SECRET).toBeUndefined();
    });

    it("omits blank provider config keys from providerConfig entirely", () => {
      const env = parseServerEnv({
        AUTH_PROVIDER: "",
        STORAGE_PROVIDER: "  ",
      });
      expect(Object.keys(env.providerConfig)).not.toContain("AUTH_PROVIDER");
      expect(Object.keys(env.providerConfig)).not.toContain("STORAGE_PROVIDER");
    });
  });

  it("16. defaults remain correct across repeated calls", () => {
    expect(parseServerEnv({})).toEqual(parseServerEnv({}));
  });

  it("keeps opaque provider config present but unvalidated when supplied", () => {
    const env = parseServerEnv({
      AUTH_PROVIDER: "some-future-provider",
      STORAGE_REGION: "eu-west-1",
    });
    expect(env.providerConfig.AUTH_PROVIDER).toBe("some-future-provider");
    expect(env.providerConfig.STORAGE_REGION).toBe("eu-west-1");
  });

  it("rejects an unrecognized DATABASE_SSL_MODE", () => {
    expect(() =>
      parseServerEnv({ DATABASE_SSL_MODE: "trust-me" }),
    ).toThrowError(/Invalid DATABASE_SSL_MODE/);
  });

  it("rejects an unrecognized IANA time zone", () => {
    expect(() =>
      parseServerEnv({ APP_TIMEZONE: "Not/A_Real_Zone" }),
    ).toThrowError(/Invalid APP_TIMEZONE/);
  });

  it("rejects a malformed DEFAULT_CURRENCY", () => {
    expect(() => parseServerEnv({ DEFAULT_CURRENCY: "eu" })).toThrowError(
      /Invalid DEFAULT_CURRENCY/,
    );
  });

  describe("18. PAYMENT_MODE environment safety", () => {
    it("rejects PAYMENT_MODE=live when APP_ENV is development", () => {
      expect(() =>
        parseServerEnv({ APP_ENV: "development", PAYMENT_MODE: "live" }),
      ).toThrowError(
        /PAYMENT_MODE.*only permitted when APP_ENV is "production"/,
      );
    });

    it("rejects PAYMENT_MODE=live when APP_ENV is test", () => {
      expect(() =>
        parseServerEnv({ APP_ENV: "test", PAYMENT_MODE: "live" }),
      ).toThrowError(
        /PAYMENT_MODE.*only permitted when APP_ENV is "production"/,
      );
    });

    it("rejects PAYMENT_MODE=live when APP_ENV is preview", () => {
      expect(() =>
        parseServerEnv({
          APP_ENV: "preview",
          PAYMENT_MODE: "live",
          APP_URL: "https://preview.example.test",
          PUBLIC_APP_URL: "https://preview.example.test",
          ALLOWED_ORIGINS: "https://preview.example.test",
        }),
      ).toThrowError(
        /PAYMENT_MODE.*only permitted when APP_ENV is "production"/,
      );
    });

    it("accepts PAYMENT_MODE=live only when APP_ENV is production", () => {
      const env = parseServerEnv({
        APP_ENV: "production",
        PAYMENT_MODE: "live",
        APP_URL: "https://example.test",
        PUBLIC_APP_URL: "https://example.test",
        ALLOWED_ORIGINS: "https://example.test",
      });
      expect(env.payment.mode).toBe("live");
    });

    it("still permits PAYMENT_MODE=sandbox (the default) in every environment, including production", () => {
      expect(() => parseServerEnv({ APP_ENV: "development" })).not.toThrow();
      const prodEnv = parseServerEnv({
        APP_ENV: "production",
        APP_URL: "https://example.test",
        PUBLIC_APP_URL: "https://example.test",
        ALLOWED_ORIGINS: "https://example.test",
      });
      expect(prodEnv.payment.mode).toBe("sandbox");
    });
  });
});

describe("toPublicConfig", () => {
  it("17. contains only the explicitly allow-listed public fields", () => {
    const env = parseServerEnv({
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
    const env = parseServerEnv({});
    expect(toPublicConfig(env).publicAppUrl).toBeUndefined();
  });
});

describe("19. module boundary: the shared parser is pure and requires an explicit source", () => {
  it("has exactly one required parameter (no default value baked in)", () => {
    // Function.prototype.length counts only parameters before the first
    // one with a default value. If parseServerEnv ever regains a
    // `= process.env` default, this drops to 0 and the test fails —
    // a concrete runtime signal that the pure-parser contract broke.
    expect(parseServerEnv.length).toBe(1);
  });

  it("does not compile without an explicit EnvSource argument", () => {
    function callWithoutSource(): void {
      // @ts-expect-error parseServerEnv must not compile without an
      // explicit EnvSource argument. If a default parameter is
      // reintroduced, this directive itself becomes a type error under
      // `npm run typecheck`.
      parseServerEnv();
    }
    // Referenced (satisfies no-unused-vars) but never invoked: calling it
    // would throw at runtime because the compiled JS has no real value to
    // read `source[key]` from.
    void callWithoutSource;
  });

  it("never reads process.env directly (static source check)", () => {
    const sourcePath = fileURLToPath(new URL("./config.ts", import.meta.url));
    const source = readFileSync(sourcePath, "utf8");
    expect(source).not.toMatch(/process\.env/);
  });

  it('does not import "server-only" (static source check)', () => {
    const sourcePath = fileURLToPath(new URL("./config.ts", import.meta.url));
    const source = readFileSync(sourcePath, "utf8");
    expect(source).not.toMatch(/^\s*import\s+["']server-only["']/m);
  });
});
