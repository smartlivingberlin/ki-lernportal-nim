/**
 * S52-B – opaque session token helpers.
 * Only the token hash is storeable; raw tokens stay out of persistence/logs.
 */

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

const TOKEN_BYTES = 32;

function toBase64Url(buffer: Buffer): string {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function generateSessionToken(): string {
  return toBase64Url(randomBytes(TOKEN_BYTES));
}

export function hashSessionToken(rawToken: string): string {
  if (typeof rawToken !== "string" || rawToken.length === 0) {
    throw new Error("Session token must be a non-empty string.");
  }
  return createHash("sha256").update(rawToken, "utf8").digest("hex");
}

export function sessionTokenHashesEqual(
  leftHash: string,
  rightHash: string,
): boolean {
  if (
    typeof leftHash !== "string" ||
    typeof rightHash !== "string" ||
    leftHash.length === 0 ||
    leftHash.length !== rightHash.length
  ) {
    return false;
  }

  try {
    return timingSafeEqual(
      Buffer.from(leftHash, "utf8"),
      Buffer.from(rightHash, "utf8"),
    );
  } catch {
    return false;
  }
}
