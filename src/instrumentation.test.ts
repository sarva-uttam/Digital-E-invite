import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { register } from "./instrumentation";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("register (Next.js startup validation)", () => {
  it("validates configuration and completes when running in the Node.js runtime", async () => {
    process.env.NEXT_RUNTIME = "nodejs";
    process.env.APP_ENV = "development";

    await expect(register()).resolves.toBeUndefined();
  });

  it("fails startup when configuration is invalid in the Node.js runtime", async () => {
    process.env.NEXT_RUNTIME = "nodejs";
    process.env.APP_ENV = "not-a-real-environment";

    await expect(register()).rejects.toThrow(/Invalid APP_ENV/);
  });

  it("does not attempt configuration validation outside the Node.js runtime", async () => {
    process.env.NEXT_RUNTIME = "edge";
    process.env.APP_ENV = "not-a-real-environment";

    await expect(register()).resolves.toBeUndefined();
  });

  it("loads configuration through the protected ./lib/env entry point, not ./lib/config directly", () => {
    const sourcePath = fileURLToPath(
      new URL("./instrumentation.ts", import.meta.url),
    );
    const source = readFileSync(sourcePath, "utf8");
    expect(source).toMatch(/import\(["']\.\/lib\/env["']\)/);
    expect(source).not.toMatch(/import\(["']\.\/lib\/config["']\)/);
  });
});
