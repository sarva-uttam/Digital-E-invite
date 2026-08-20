import "server-only";

const APP_ENVIRONMENTS = [
  "development",
  "test",
  "preview",
  "production",
] as const;
const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;

export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number];
export type LogLevel = (typeof LOG_LEVELS)[number];

export interface ServerEnv {
  appEnv: AppEnvironment;
  logLevel: LogLevel;
  defaultLocale: string;
  defaultCurrency: string;
  appTimezone: string;
}

export type EnvSource = Readonly<Record<string, string | undefined>>;

/**
 * Minimal IMP-004 baseline: validates the small set of non-secret,
 * always-required application variables and fails safely on invalid
 * values. Provider/secret configuration (database, auth, payments, AI,
 * email, storage) is intentionally out of scope until IMP-010.
 */
export function loadServerEnv(source: EnvSource = process.env): ServerEnv {
  const appEnv = readEnum(source, "APP_ENV", APP_ENVIRONMENTS, "development");
  const logLevel = readEnum(source, "LOG_LEVEL", LOG_LEVELS, "info");
  const defaultLocale = readNonEmpty(source, "DEFAULT_LOCALE", "en");
  const defaultCurrency = readNonEmpty(source, "DEFAULT_CURRENCY", "MUR");
  const appTimezone = readNonEmpty(source, "APP_TIMEZONE", "Indian/Mauritius");

  return { appEnv, logLevel, defaultLocale, defaultCurrency, appTimezone };
}

function readNonEmpty(
  source: EnvSource,
  key: string,
  fallback: string,
): string {
  const value = source[key];
  if (value === undefined || value.trim() === "") {
    return fallback;
  }
  return value;
}

function readEnum<const T extends readonly string[]>(
  source: EnvSource,
  key: string,
  allowed: T,
  fallback: T[number],
): T[number] {
  const value = source[key];
  if (value === undefined || value.trim() === "") {
    return fallback;
  }
  if (!allowed.includes(value)) {
    throw new Error(
      `Invalid ${key}: "${value}". Expected one of: ${allowed.join(", ")}.`,
    );
  }
  return value;
}
