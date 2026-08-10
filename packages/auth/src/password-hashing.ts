/**
 * S52-B – password hashing via Node.js scrypt.
 * No reversible encryption, no plaintext logging, no external SDKs.
 */

import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";

const SCHEME = "nim-scrypt-v1";
const KEY_LENGTH = 64;
const DEFAULT_N = 16384;
const DEFAULT_R = 8;
const DEFAULT_P = 1;
const SALT_BYTES = 16;
const MAX_MEM = 64 * 1024 * 1024;

function scryptAsync(
  password: string,
  salt: Buffer,
  keyLength: number,
  params: PasswordHashParams,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(
      password,
      salt,
      keyLength,
      {
        N: params.N,
        r: params.r,
        p: params.p,
        maxmem: MAX_MEM,
      },
      (error, derivedKey) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(derivedKey);
      },
    );
  });
}

export type PasswordHashParams = Readonly<{
  N: number;
  r: number;
  p: number;
}>;

export const PASSWORD_HASH_DEFAULTS: PasswordHashParams = Object.freeze({
  N: DEFAULT_N,
  r: DEFAULT_R,
  p: DEFAULT_P,
});

function toBase64Url(buffer: Buffer): string {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): Buffer {
  const padded =
    value + "=".repeat((4 - (value.length % 4 || 4)) % 4);
  const b64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(b64, "base64");
}

function assertPassword(password: string): void {
  if (typeof password !== "string" || password.length === 0) {
    throw new Error("Password must be a non-empty string.");
  }
  if (password.length > 1024) {
    throw new Error("Password exceeds maximum allowed length.");
  }
}

/**
 * Hash a password. Returns an encoded string; never returns the plaintext.
 */
export async function hashPassword(
  password: string,
  params: PasswordHashParams = PASSWORD_HASH_DEFAULTS,
): Promise<string> {
  assertPassword(password);
  const salt = randomBytes(SALT_BYTES);
  const derived = await scryptAsync(password, salt, KEY_LENGTH, params);

  return [
    SCHEME,
    String(params.N),
    String(params.r),
    String(params.p),
    toBase64Url(salt),
    toBase64Url(derived),
  ].join("$");
}

function parseEncodedHash(encoded: string): {
  params: PasswordHashParams;
  salt: Buffer;
  hash: Buffer;
} | null {
  const parts = encoded.split("$");
  if (parts.length !== 6 || parts[0] !== SCHEME) {
    return null;
  }

  const N = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);
  if (
    !Number.isInteger(N) ||
    !Number.isInteger(r) ||
    !Number.isInteger(p) ||
    N < 2 ||
    r < 1 ||
    p < 1
  ) {
    return null;
  }

  try {
    const salt = fromBase64Url(parts[4]!);
    const hash = fromBase64Url(parts[5]!);
    if (salt.length === 0 || hash.length === 0) {
      return null;
    }
    return { params: { N, r, p }, salt, hash };
  } catch {
    return null;
  }
}

/**
 * Verify password against encoded hash using timing-safe comparison.
 * Returns false for malformed encodings without throwing.
 */
export async function verifyPassword(
  password: string,
  encodedHash: string,
): Promise<boolean> {
  if (typeof encodedHash !== "string" || encodedHash.length === 0) {
    return false;
  }

  try {
    assertPassword(password);
  } catch {
    return false;
  }

  const parsed = parseEncodedHash(encodedHash);
  if (!parsed) {
    return false;
  }

  const derived = await scryptAsync(
    password,
    parsed.salt,
    parsed.hash.length,
    parsed.params,
  );

  if (derived.length !== parsed.hash.length) {
    return false;
  }

  return timingSafeEqual(derived, parsed.hash);
}
