import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "worker/src/**/*.test.ts"],
    // Database integration tests (IMP-020) require a real disposable
    // PostgreSQL instance and run only through `npm run test:db`
    // (vitest.db.config.mts) — never silently as part of the ordinary unit
    // test suite, and never silently skipped when no database is present.
    exclude: [...configDefaults.exclude, "src/db/**/*.db.test.ts"],
    passWithNoTests: false,
  },
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
      // Next.js resolves "server-only" to a no-op via the "react-server"
      // export condition on the server. Vitest runs plain Node resolution,
      // which would otherwise hit the package's client-side throw guard.
      "server-only": new URL(
        "./node_modules/server-only/empty.js",
        import.meta.url,
      ).pathname,
    },
  },
});
