/**
 * S52-D1 – Auth HTTP route contracts (login/logout) for apps/web adapters.
 * No Next.js imports. Flag-off must never set cookies.
 */

import type { PlatformRole } from "./platform-roles.ts";
import { verifyPassword } from "./password-hashing.ts";
import {
  parseSessionCookieHeader,
  serializeExpiredSessionCookie,
} from "./session-cookie.ts";
import type { SessionRuntime } from "./session-runtime.ts";

export type AuthHttpErrorCode =
  | "FEATURE_DISABLED"
  | "VALIDATION_FAILED"
  | "AUTH_REQUIRED"
  | "ACCESS_DENIED"
  | "INTERNAL_ERROR";

export type AuthHttpResult = Readonly<{
  status: number;
  body: Readonly<Record<string, unknown>>;
  setCookie: string | null;
}>;

export type AuthCredentialRecord = Readonly<{
  subjectId: string;
  email: string;
  role: PlatformRole;
  passwordHash: string;
}>;

export type AuthCredentialStore = Readonly<{
  findByEmail(
    email: string,
  ): Promise<AuthCredentialRecord | null>;
}>;

export type AuthHttpHandlers = Readonly<{
  login(input: {
    body: unknown;
    nowMs?: number;
  }): Promise<AuthHttpResult>;
  logout(input: {
    cookieHeader: string | null | undefined;
    nowMs?: number;
  }): Promise<AuthHttpResult>;
}>;

function errorResult(
  status: number,
  code: AuthHttpErrorCode,
  message: string,
): AuthHttpResult {
  return {
    status,
    body: {
      error: {
        code,
        message,
      },
    },
    setCookie: null,
  };
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const email = value.trim().toLowerCase();
  if (email.length < 3 || email.length > 320 || !email.includes("@")) {
    return null;
  }
  return email;
}

function readPassword(value: unknown): string | null {
  if (typeof value !== "string" || value.length === 0 || value.length > 1024) {
    return null;
  }
  return value;
}

export function createMemoryCredentialStore(
  records: readonly AuthCredentialRecord[] = [],
): AuthCredentialStore {
  const byEmail = new Map(
    records.map((record) => [record.email.toLowerCase(), record] as const),
  );

  return {
    async findByEmail(email) {
      return byEmail.get(email.toLowerCase()) ?? null;
    },
  };
}

export function createAuthHttpHandlers(deps: {
  runtime: SessionRuntime;
  credentials: AuthCredentialStore;
  isAuthRuntimeEnabled: () => boolean;
}): AuthHttpHandlers {
  return {
    async login(input) {
      if (!deps.isAuthRuntimeEnabled()) {
        return errorResult(
          403,
          "FEATURE_DISABLED",
          "Auth runtime is disabled.",
        );
      }

      const body =
        input.body && typeof input.body === "object"
          ? (input.body as Record<string, unknown>)
          : null;
      const email = normalizeEmail(body?.email);
      const password = readPassword(body?.password);

      if (!email || !password) {
        return errorResult(
          400,
          "VALIDATION_FAILED",
          "Email and password are required.",
        );
      }

      const record = await deps.credentials.findByEmail(email);
      if (!record) {
        return errorResult(
          401,
          "AUTH_REQUIRED",
          "Invalid credentials.",
        );
      }

      let passwordOk = false;
      try {
        passwordOk = await verifyPassword(password, record.passwordHash);
      } catch {
        return errorResult(
          401,
          "AUTH_REQUIRED",
          "Invalid credentials.",
        );
      }

      if (!passwordOk) {
        return errorResult(
          401,
          "AUTH_REQUIRED",
          "Invalid credentials.",
        );
      }

      const created = await deps.runtime.createSession({
        subjectId: record.subjectId,
        role: record.role,
        nowMs: input.nowMs,
      });

      return {
        status: 200,
        body: {
          ok: true,
          subjectId: record.subjectId,
          role: record.role,
        },
        setCookie: created.setCookie,
      };
    },

    async logout(input) {
      if (!deps.isAuthRuntimeEnabled()) {
        return errorResult(
          403,
          "FEATURE_DISABLED",
          "Auth runtime is disabled.",
        );
      }

      const rawToken = parseSessionCookieHeader(input.cookieHeader);
      if (rawToken) {
        const session = await deps.runtime.resolveSession({
          rawToken,
          nowMs: input.nowMs,
        });
        if (session) {
          await deps.runtime.logout({
            sessionId: session.sessionId,
            nowMs: input.nowMs,
          });
        }
      }

      return {
        status: 200,
        body: { ok: true },
        setCookie: serializeExpiredSessionCookie(),
      };
    },
  };
}
