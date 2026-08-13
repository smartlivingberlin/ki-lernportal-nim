/**
 * S51B-B connection-proof URL guards (typecheck-safe, no Node globals).
 * Runtime proof entry: connection-proof.ts (excluded from package typecheck).
 */
export function assertLocalDisposableConnectionUrl(
  url: string,
  expectedDatabase: string,
): void {
  if (!url.startsWith("mysql://")) {
    throw new Error("DATABASE_URL must be mysql://: expected true");
  }
  if (
    !url.includes("@127.0.0.1:") &&
    !url.includes("@localhost:")
  ) {
    throw new Error(
      "DATABASE_URL must target localhost only: expected true",
    );
  }
  if (
    /railway|production|\.rlwy\.|\.amazonaws\.|cloud/.test(
      url.toLowerCase(),
    )
  ) {
    throw new Error(
      "DATABASE_URL must not look like Railway/production: expected true",
    );
  }
  if (!expectedDatabase.startsWith("ki_nim_s51bb_")) {
    throw new Error(
      "expected database must use ki_nim_s51bb_ prefix: expected true",
    );
  }
  if (!url.includes(`/${expectedDatabase}`)) {
    throw new Error(
      "DATABASE_URL must include expected database: expected true",
    );
  }
}
