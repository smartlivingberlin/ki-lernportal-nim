/**
 * Static / fake tests for S51B-B connection-proof URL guards.
 * Import must not open a network or database connection.
 */
import { assertLocalDisposableConnectionUrl } from "./connection-proof-guards.ts";

function expectThrow(label: string, fn: () => void): void {
  try {
    fn();
  } catch {
    return;
  }
  throw new Error(`${label}: expected throw`);
}

const validUrl =
  "mysql://root:s51bbLocalOnly@127.0.0.1:34001/ki_nim_s51bb_demo";

assertLocalDisposableConnectionUrl(validUrl, "ki_nim_s51bb_demo");

expectThrow("rejects railway host", () =>
  assertLocalDisposableConnectionUrl(
    "mysql://root:x@railway.proxy:3306/ki_nim_s51bb_demo",
    "ki_nim_s51bb_demo",
  ),
);

expectThrow("rejects production-like URL", () =>
  assertLocalDisposableConnectionUrl(
    "mysql://root:x@127.0.0.1:3306/production",
    "ki_nim_s51bb_demo",
  ),
);

expectThrow("rejects wrong database prefix", () =>
  assertLocalDisposableConnectionUrl(
    "mysql://root:x@127.0.0.1:3306/other_db",
    "other_db",
  ),
);

expectThrow("rejects non-mysql protocol", () =>
  assertLocalDisposableConnectionUrl(
    "postgres://root:x@127.0.0.1:5432/ki_nim_s51bb_demo",
    "ki_nim_s51bb_demo",
  ),
);

console.log("S51B_B_CONNECTION_PROOF_STATIC=PASS");
