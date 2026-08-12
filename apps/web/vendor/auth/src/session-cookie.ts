/**
 * S52-B – session cookie attribute contract (pure header builders).
 * No Next.js / browser coupling in this slice.
 */

export const SESSION_COOKIE_NAME = "nim_session";

export type SessionCookieSameSite = "Lax" | "Strict" | "None";

export type SessionCookieAttributes = Readonly<{
  httpOnly: true;
  secure: true;
  path: "/";
  sameSite: SessionCookieSameSite;
  maxAgeSeconds: number;
}>;

export const SESSION_COOKIE_CONTRACT: Omit<
  SessionCookieAttributes,
  "maxAgeSeconds"
> = Object.freeze({
  httpOnly: true,
  secure: true,
  path: "/",
  sameSite: "Lax",
});

export function buildSessionCookieAttributes(
  maxAgeSeconds: number,
): SessionCookieAttributes {
  if (
    !Number.isInteger(maxAgeSeconds) ||
    maxAgeSeconds < 0 ||
    maxAgeSeconds > 60 * 60 * 24 * 400
  ) {
    throw new Error("Invalid session cookie Max-Age.");
  }

  return {
    ...SESSION_COOKIE_CONTRACT,
    maxAgeSeconds,
  };
}

/**
 * Build a Set-Cookie header value. Does not embed secrets beyond the token.
 */
export function serializeSessionCookie(
  rawToken: string,
  maxAgeSeconds: number,
): string {
  if (typeof rawToken !== "string" || rawToken.length === 0) {
    throw new Error("Session cookie value must be a non-empty string.");
  }
  if (/[\s;,]/.test(rawToken)) {
    throw new Error("Session cookie value contains forbidden characters.");
  }

  const attrs = buildSessionCookieAttributes(maxAgeSeconds);
  return [
    `${SESSION_COOKIE_NAME}=${rawToken}`,
    `Path=${attrs.path}`,
    `Max-Age=${attrs.maxAgeSeconds}`,
    "HttpOnly",
    "Secure",
    `SameSite=${attrs.sameSite}`,
  ].join("; ");
}

export function serializeExpiredSessionCookie(): string {
  return [
    `${SESSION_COOKIE_NAME}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

/**
 * Extract raw session token from a Cookie request header.
 * Returns null when absent or malformed; never throws on normal input.
 */
export function parseSessionCookieHeader(
  cookieHeader: string | null | undefined,
): string | null {
  if (typeof cookieHeader !== "string" || cookieHeader.length === 0) {
    return null;
  }

  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq <= 0) {
      continue;
    }
    const name = trimmed.slice(0, eq).trim();
    if (name !== SESSION_COOKIE_NAME) {
      continue;
    }
    const value = trimmed.slice(eq + 1).trim();
    return value.length > 0 ? value : null;
  }

  return null;
}
