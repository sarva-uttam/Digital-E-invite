/**
 * Framework-agnostic application configuration boundary (IMP-010).
 *
 * This module intentionally does NOT import "server-only" AND does not
 * read the real process environment implicitly: `parseServerEnv` requires
 * an explicit `EnvSource` argument with no default. This keeps the module
 * pure so it can be imported safely by both the Next.js web app and the
 * separately deployable worker, without triggering the "server-only"
 * package's Client Component throw guard outside a Next.js/webpack build
 * — but, critically, an accidental direct import of this module from
 * application code still cannot read the real server environment,
 * because there is nothing here that reaches for it on its own.
 *
 * The real runtime environment is read only at the two runtime-specific
 * entry points, each of which supplies it by default and delegates to
 * `parseServerEnv`:
 *
 * - src/lib/env.ts — the Next.js-facing entry point (`import "server-only"`
 *   guarded); Next.js application code must import configuration from
 *   there, never from this module directly.
 * - worker/src/config.ts — the worker-facing entry point (`loadWorkerEnv`),
 *   a plain Node.js boundary with no `server-only` guard.
 *
 * Scope (IMP-010): validates the provider-neutral configuration contract
 * already defined in .env.example. It selects, contacts, and initializes
 * no provider SDK. Provider-specific fields (authentication, storage, AI,
 * payment, email, cache/queue, observability) are treated as opaque,
 * optional, server-only strings; their exact shape is validated by the
 * task that selects and integrates each provider.
 */

export type EnvSource = Readonly<Record<string, string | undefined>>;

export const APP_ENVIRONMENTS = [
  "development",
  "test",
  "preview",
  "production",
] as const;
export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number];

export const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;
export type LogLevel = (typeof LOG_LEVELS)[number];

export const PAYMENT_MODES = ["sandbox", "live"] as const;
export type PaymentMode = (typeof PAYMENT_MODES)[number];

export const DATABASE_SSL_MODES = [
  "disable",
  "allow",
  "prefer",
  "require",
  "verify-ca",
  "verify-full",
] as const;
export type DatabaseSslMode = (typeof DATABASE_SSL_MODES)[number];

export interface FeatureFlags {
  payments: boolean;
  aiText: boolean;
  aiImage: boolean;
  emailDelivery: boolean;
  eurCheckout: boolean;
  usdCheckout: boolean;
  mauritianKreol: boolean;
  russian: boolean;
}

export interface AppSecrets {
  appSecret: string | undefined;
  encryptionKey: string | undefined;
  tokenHashKey: string | undefined;
}

export interface DatabaseConfig {
  url: URL | undefined;
  directUrl: URL | undefined;
  sslMode: DatabaseSslMode | undefined;
  poolMin: number | undefined;
  poolMax: number | undefined;
}

export interface PaymentConfig {
  mode: PaymentMode;
  baseCurrency: string;
  supportedCurrencies: readonly string[];
}

export interface TestEnvConfig {
  testDatabaseUrl: URL | undefined;
  e2eBaseUrl: URL | undefined;
}

/**
 * Provider-specific / operational configuration names from .env.example
 * that IMP-010 deliberately does not deep-validate: their exact shape
 * depends on the provider selected under its own gated task
 * (authentication: IMP-012; storage/AI/payment/email: their specialist
 * tasks). Each value is trimmed; a blank value is treated as "not
 * configured" and the key is omitted from the resulting object entirely.
 */
const OPAQUE_SERVER_CONFIG_KEYS = [
  "AUTH_PROVIDER",
  "AUTH_ISSUER_URL",
  "AUTH_CLIENT_ID",
  "AUTH_CLIENT_SECRET",
  "AUTH_AUDIENCE",
  "SESSION_COOKIE_NAME",
  "SESSION_TTL_SECONDS",
  "STORAGE_PROVIDER",
  "STORAGE_ENDPOINT",
  "STORAGE_REGION",
  "STORAGE_BUCKET",
  "STORAGE_ACCESS_KEY_ID",
  "STORAGE_SECRET_ACCESS_KEY",
  "STORAGE_PUBLIC_BASE_URL",
  "AI_TEXT_PROVIDER",
  "AI_TEXT_MODEL",
  "AI_TEXT_API_BASE_URL",
  "AI_TEXT_API_KEY",
  "AI_TEXT_TIMEOUT_MS",
  "AI_IMAGE_PROVIDER",
  "AI_IMAGE_MODEL",
  "AI_IMAGE_API_BASE_URL",
  "AI_IMAGE_API_KEY",
  "AI_IMAGE_TIMEOUT_MS",
  "PAYMENT_PROVIDER",
  "PAYMENT_API_BASE_URL",
  "PAYMENT_MERCHANT_ID",
  "PAYMENT_SECRET_KEY",
  "PAYMENT_WEBHOOK_SECRET",
  "EMAIL_PROVIDER",
  "EMAIL_API_BASE_URL",
  "EMAIL_API_KEY",
  "EMAIL_FROM_ADDRESS",
  "EMAIL_FROM_NAME",
  "EMAIL_REPLY_TO_ADDRESS",
  "CACHE_URL",
  "QUEUE_URL",
  "SCHEDULER_SECRET",
  "ERROR_REPORTING_DSN",
  "OTEL_SERVICE_NAME",
  "OTEL_EXPORTER_OTLP_ENDPOINT",
  "OTEL_EXPORTER_OTLP_HEADERS",
] as const;

type OpaqueServerConfigKey = (typeof OPAQUE_SERVER_CONFIG_KEYS)[number];

/** Opaque, provider-specific, server-only. Never exposed by {@link toPublicConfig}. */
export type OpaqueServerConfig = Readonly<
  Partial<Record<OpaqueServerConfigKey, string>>
>;

export interface ServerEnv {
  appEnv: AppEnvironment;
  logLevel: LogLevel;
  appName: string;
  appUrl: URL | undefined;
  publicAppUrl: URL | undefined;
  defaultLocale: string;
  defaultCurrency: string;
  appTimezone: string;
  allowedOrigins: readonly string[];
  trustedProxyCount: number | undefined;
  features: FeatureFlags;
  appSecrets: AppSecrets;
  database: DatabaseConfig;
  payment: PaymentConfig;
  test: TestEnvConfig;
  providerConfig: OpaqueServerConfig;
}

/** The narrow, explicitly allow-listed shape safe to expose outside the server. */
export interface PublicConfig {
  defaultLocale: string;
  defaultCurrency: string;
  appTimezone: string;
  publicAppUrl: string | undefined;
}

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

function raw(source: EnvSource, key: string): string | undefined {
  const value = source[key];
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

function readNonEmpty(
  source: EnvSource,
  key: string,
  fallback: string,
): string {
  return raw(source, key) ?? fallback;
}

function readEnum<const T extends readonly string[]>(
  source: EnvSource,
  key: string,
  allowed: T,
  fallback: T[number],
): T[number] {
  const value = raw(source, key);
  if (value === undefined) return fallback;
  if (!allowed.includes(value)) {
    throw new ConfigError(
      `Invalid ${key}: "${value}". Expected one of: ${allowed.join(", ")}.`,
    );
  }
  return value;
}

function readOptionalEnum<const T extends readonly string[]>(
  source: EnvSource,
  key: string,
  allowed: T,
): T[number] | undefined {
  const value = raw(source, key);
  if (value === undefined) return undefined;
  if (!allowed.includes(value)) {
    throw new ConfigError(
      `Invalid ${key}: "${value}". Expected one of: ${allowed.join(", ")}.`,
    );
  }
  return value;
}

function readStrictBoolean(
  source: EnvSource,
  key: string,
  fallback: boolean,
): boolean {
  const value = raw(source, key);
  if (value === undefined) return fallback;
  if (value === "true") return true;
  if (value === "false") return false;
  throw new ConfigError(
    `Invalid ${key}: "${value}". Expected exactly "true" or "false".`,
  );
}

function readOptionalNonNegativeInt(
  source: EnvSource,
  key: string,
): number | undefined {
  const value = raw(source, key);
  if (value === undefined) return undefined;
  if (!/^\d+$/.test(value)) {
    throw new ConfigError(
      `Invalid ${key}: "${value}". Expected a non-negative integer.`,
    );
  }
  return Number.parseInt(value, 10);
}

function readOptionalUrl(
  source: EnvSource,
  key: string,
  options: { secret?: boolean } = {},
): URL | undefined {
  const value = raw(source, key);
  if (value === undefined) return undefined;
  try {
    return new URL(value);
  } catch {
    throw new ConfigError(
      options.secret === true
        ? `Invalid ${key}: value is not a well-formed URL.`
        : `Invalid ${key}: "${value}" is not a well-formed URL.`,
    );
  }
}

/**
 * Stricter variant for application-facing web URLs (APP_URL,
 * PUBLIC_APP_URL): only `http:`/`https:` are accepted (rejects `ftp:`,
 * `file:`, `javascript:`, `data:`, and any other scheme), and embedded
 * `user:pass@` credentials are rejected. `http:` remains permitted in
 * every environment (including production) because no approved
 * architecture document requires this parser to enforce HTTPS — Render's
 * managed TLS/HTTP-to-HTTPS redirect is an infrastructure-level behavior
 * (docs/12_DEPLOYMENT.md §15), not a documented application-config
 * invariant; development/test rely on plain `http://localhost`.
 */
function readOptionalWebUrl(source: EnvSource, key: string): URL | undefined {
  const value = raw(source, key);
  if (value === undefined) return undefined;
  // Invariant: no branch below ever includes the raw supplied value in a
  // thrown message. A URL that fails one rule (e.g. a non-http(s) scheme)
  // may still carry embedded credentials that a later rule would have
  // caught, so the safe approach is to never echo the value at all,
  // rather than rely on check ordering.
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new ConfigError(`Invalid ${key}: value is not a well-formed URL.`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new ConfigError(`Invalid ${key}: URL must use http: or https:.`);
  }
  if (parsed.username !== "" || parsed.password !== "") {
    throw new ConfigError(
      `Invalid ${key}: URL must not include embedded credentials.`,
    );
  }
  return parsed;
}

function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat(undefined, { timeZone });
    return true;
  } catch {
    return false;
  }
}

function readTimezone(
  source: EnvSource,
  key: string,
  fallback: string,
): string {
  const value = raw(source, key) ?? fallback;
  if (!isValidTimeZone(value)) {
    throw new ConfigError(
      `Invalid ${key}: "${value}" is not a known IANA time zone.`,
    );
  }
  return value;
}

const CURRENCY_CODE_PATTERN = /^[A-Z]{3}$/;

function readCurrencyCode(
  source: EnvSource,
  key: string,
  fallback: string,
): string {
  const value = raw(source, key) ?? fallback;
  if (!CURRENCY_CODE_PATTERN.test(value)) {
    throw new ConfigError(
      `Invalid ${key}: "${value}". Expected a 3-letter uppercase currency code.`,
    );
  }
  return value;
}

function readCurrencyList(
  source: EnvSource,
  key: string,
  fallback: readonly string[],
): readonly string[] {
  const value = raw(source, key);
  if (value === undefined) return fallback;
  const codes = value.split(",").map((entry) => entry.trim());
  for (const code of codes) {
    if (!CURRENCY_CODE_PATTERN.test(code)) {
      throw new ConfigError(
        `Invalid ${key}: "${value}". Expected a comma-separated list of 3-letter uppercase currency codes.`,
      );
    }
  }
  return codes;
}

function readOrigins(source: EnvSource, key: string): readonly string[] {
  const value = raw(source, key);
  if (value === undefined) return [];
  const entries = value.split(",").map((entry) => entry.trim());
  const origins: string[] = [];
  for (const entry of entries) {
    // Invariant: no branch below ever includes the raw entry in a thrown
    // message. An entry that fails one rule (e.g. a non-http(s) scheme,
    // or a path/query/fragment) may still carry embedded credentials that
    // a later rule would have caught, so the safe approach is to never
    // echo the entry at all, rather than rely on check ordering.
    if (entry === "") {
      throw new ConfigError(`Invalid ${key}: contains an empty origin entry.`);
    }
    let parsed: URL;
    try {
      parsed = new URL(entry);
    } catch {
      throw new ConfigError(
        `Invalid ${key}: contains an entry that is not a well-formed origin.`,
      );
    }
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new ConfigError(
        `Invalid ${key}: every origin entry must use http: or https:.`,
      );
    }
    if (parsed.username !== "" || parsed.password !== "") {
      throw new ConfigError(
        `Invalid ${key}: origin entries must not include embedded credentials.`,
      );
    }
    if (parsed.pathname !== "/" || parsed.search !== "" || parsed.hash !== "") {
      throw new ConfigError(
        `Invalid ${key}: every origin entry must be an origin only (scheme://host[:port]), with no path, query, or fragment.`,
      );
    }
    origins.push(parsed.origin);
  }
  return origins;
}

function readSecret(
  source: EnvSource,
  key: string,
  options: { minLength: number },
): string | undefined {
  const value = raw(source, key);
  if (value === undefined) return undefined;
  if (value.length < options.minLength) {
    // Deliberately does not echo the supplied value. This is a minimal
    // shape check only (catches obviously too-short/placeholder values);
    // it does not verify entropy, uniqueness across environments, or
    // rotation status.
    throw new ConfigError(
      `Invalid ${key}: value is shorter than the minimum required length (${options.minLength} characters).`,
    );
  }
  return value;
}

function readOpaqueConfig(source: EnvSource): OpaqueServerConfig {
  const result: Partial<Record<OpaqueServerConfigKey, string>> = {};
  for (const key of OPAQUE_SERVER_CONFIG_KEYS) {
    const value = raw(source, key);
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Parses and validates the application's configuration contract from an
 * explicit environment source. Deliberately has no default parameter: the
 * caller must supply the source, so this pure function can never silently
 * read the real process environment. `src/lib/env.ts` (Next.js) and
 * `worker/src/config.ts` (worker) are the only entry points that supply
 * the real environment by default.
 *
 * Fails safely (throws `ConfigError`) on invalid values without ever
 * echoing a secret-classified value, or a value containing embedded URL
 * credentials, in the thrown message.
 */
export function parseServerEnv(source: EnvSource): ServerEnv {
  const appEnv = readEnum(source, "APP_ENV", APP_ENVIRONMENTS, "development");
  const logLevel = readEnum(source, "LOG_LEVEL", LOG_LEVELS, "info");
  const appName = readNonEmpty(
    source,
    "APP_NAME",
    "AI Digital Invitation Platform",
  );
  const appUrl = readOptionalWebUrl(source, "APP_URL");
  const publicAppUrl = readOptionalWebUrl(source, "PUBLIC_APP_URL");
  const defaultLocale = readNonEmpty(source, "DEFAULT_LOCALE", "en");
  const defaultCurrency = readCurrencyCode(source, "DEFAULT_CURRENCY", "MUR");
  const appTimezone = readTimezone(source, "APP_TIMEZONE", "Indian/Mauritius");
  const allowedOrigins = readOrigins(source, "ALLOWED_ORIGINS");
  const trustedProxyCount = readOptionalNonNegativeInt(
    source,
    "TRUSTED_PROXY_COUNT",
  );

  const features: FeatureFlags = {
    payments: readStrictBoolean(source, "ENABLE_PAYMENTS", false),
    aiText: readStrictBoolean(source, "ENABLE_AI_TEXT", false),
    aiImage: readStrictBoolean(source, "ENABLE_AI_IMAGE", false),
    emailDelivery: readStrictBoolean(source, "ENABLE_EMAIL_DELIVERY", false),
    eurCheckout: readStrictBoolean(source, "ENABLE_EUR_CHECKOUT", false),
    usdCheckout: readStrictBoolean(source, "ENABLE_USD_CHECKOUT", false),
    mauritianKreol: readStrictBoolean(source, "ENABLE_MAURITIAN_KREOL", false),
    russian: readStrictBoolean(source, "ENABLE_RUSSIAN", false),
  };

  const appSecrets: AppSecrets = {
    appSecret: readSecret(source, "APP_SECRET", { minLength: 16 }),
    encryptionKey: readSecret(source, "ENCRYPTION_KEY", { minLength: 16 }),
    tokenHashKey: readSecret(source, "TOKEN_HASH_KEY", { minLength: 16 }),
  };

  const database: DatabaseConfig = {
    url: readOptionalUrl(source, "DATABASE_URL", { secret: true }),
    directUrl: readOptionalUrl(source, "DATABASE_DIRECT_URL", {
      secret: true,
    }),
    sslMode: readOptionalEnum(source, "DATABASE_SSL_MODE", DATABASE_SSL_MODES),
    poolMin: readOptionalNonNegativeInt(source, "DATABASE_POOL_MIN"),
    poolMax: readOptionalNonNegativeInt(source, "DATABASE_POOL_MAX"),
  };
  if (
    database.poolMin !== undefined &&
    database.poolMax !== undefined &&
    database.poolMin > database.poolMax
  ) {
    throw new ConfigError(
      "Invalid DATABASE_POOL_MIN/DATABASE_POOL_MAX: DATABASE_POOL_MIN must not exceed DATABASE_POOL_MAX.",
    );
  }

  const payment: PaymentConfig = {
    mode: readEnum(source, "PAYMENT_MODE", PAYMENT_MODES, "sandbox"),
    baseCurrency: readCurrencyCode(source, "PAYMENT_BASE_CURRENCY", "MUR"),
    supportedCurrencies: readCurrencyList(
      source,
      "PAYMENT_SUPPORTED_CURRENCIES",
      ["MUR"],
    ),
  };
  // Environment-safety invariant, not a payment integration: .env.example
  // requires sandbox credentials outside production, so "live" mode must
  // never run in development/test/preview regardless of who set it.
  if (payment.mode === "live" && appEnv !== "production") {
    throw new ConfigError(
      `Invalid PAYMENT_MODE: "live" is only permitted when APP_ENV is "production" (current APP_ENV: "${appEnv}").`,
    );
  }

  const test: TestEnvConfig = {
    testDatabaseUrl: readOptionalUrl(source, "TEST_DATABASE_URL", {
      secret: true,
    }),
    e2eBaseUrl: readOptionalUrl(source, "E2E_BASE_URL"),
  };

  const providerConfig = readOpaqueConfig(source);

  // Production/preview strictness: docs/09_SECURITY_ARCHITECTURE.md
  // requires explicit CORS/CSRF origin validation, and
  // docs/12_DEPLOYMENT.md requires an explicit canonical/public URL before
  // production traffic is served. Development/test/CI keep safe defaults
  // so the baseline boots with no provider credentials.
  if (appEnv === "production" || appEnv === "preview") {
    if (appUrl === undefined) {
      throw new ConfigError(`APP_URL is required when APP_ENV is "${appEnv}".`);
    }
    if (publicAppUrl === undefined) {
      throw new ConfigError(
        `PUBLIC_APP_URL is required when APP_ENV is "${appEnv}".`,
      );
    }
    if (allowedOrigins.length === 0) {
      throw new ConfigError(
        `ALLOWED_ORIGINS must list at least one origin when APP_ENV is "${appEnv}".`,
      );
    }
  }

  // Feature-gated generic requirements: enabling a capability must not
  // silently boot without the generic (provider-neutral) configuration it
  // needs. This selects and contacts no provider.
  if (features.payments && publicAppUrl === undefined) {
    throw new ConfigError(
      "ENABLE_PAYMENTS=true requires PUBLIC_APP_URL to be configured (checkout return/cancel URLs).",
    );
  }
  // A currency-specific checkout flag is contradictory configuration
  // without payments enabled at all; fail closed rather than allow an
  // unreachable/inconsistent combination to boot silently.
  if (features.eurCheckout && !features.payments) {
    throw new ConfigError(
      "ENABLE_EUR_CHECKOUT=true requires ENABLE_PAYMENTS=true.",
    );
  }
  if (features.eurCheckout && !payment.supportedCurrencies.includes("EUR")) {
    throw new ConfigError(
      'ENABLE_EUR_CHECKOUT=true requires "EUR" to be listed in PAYMENT_SUPPORTED_CURRENCIES.',
    );
  }
  if (features.usdCheckout && !features.payments) {
    throw new ConfigError(
      "ENABLE_USD_CHECKOUT=true requires ENABLE_PAYMENTS=true.",
    );
  }
  if (features.usdCheckout && !payment.supportedCurrencies.includes("USD")) {
    throw new ConfigError(
      'ENABLE_USD_CHECKOUT=true requires "USD" to be listed in PAYMENT_SUPPORTED_CURRENCIES.',
    );
  }

  return {
    appEnv,
    logLevel,
    appName,
    appUrl,
    publicAppUrl,
    defaultLocale,
    defaultCurrency,
    appTimezone,
    allowedOrigins,
    trustedProxyCount,
    features,
    appSecrets,
    database,
    payment,
    test,
    providerConfig,
  };
}

/**
 * Derives the narrow, explicitly allow-listed configuration shape that is
 * safe to expose outside the server. Never spreads `ServerEnv` or the raw
 * environment; every field is named individually so a future secret added
 * to `ServerEnv` cannot silently become public.
 */
export function toPublicConfig(env: ServerEnv): PublicConfig {
  return {
    defaultLocale: env.defaultLocale,
    defaultCurrency: env.defaultCurrency,
    appTimezone: env.appTimezone,
    publicAppUrl: env.publicAppUrl?.toString(),
  };
}
