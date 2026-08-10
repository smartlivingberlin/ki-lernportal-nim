import { defineConfig } from "drizzle-kit";

/**
 * S51B-C1 migration tooling config.
 *
 * Intentionally omits live database credentials so `drizzle-kit generate`
 * works without a network or server connection. Direct-apply, introspect and
 * studio commands remain prohibited.
 */
export default defineConfig({
  dialect: "mysql",
  schema: "./src/pilot-schema.ts",
  out: "./drizzle",
  strict: true,
  verbose: true,
  breakpoints: true,
});
