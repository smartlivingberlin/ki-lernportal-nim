/**
 * S52 auth package surface: policy vocabulary (S52-A) and local auth runtime
 * foundation (S52-B). No login UI, route handlers, DB or Railway in this surface.
 */
export {
  PLATFORM_ROLES,
  PRIVILEGED_PLATFORM_ROLES,
  isPlatformRole,
  isPrivilegedPlatformRole,
  mayAutoGrantFirstUserAdmin,
  roleRequiresMfa,
} from "./platform-roles.ts";

export type {
  PlatformRole,
  PrivilegedPlatformRole,
} from "./platform-roles.ts";

export {
  SESSION_STATES,
  SESSION_TTL_CANDIDATES,
  TERMINAL_SESSION_STATES,
  canRenewSession,
  canUseSession,
  isSessionExpiredByTime,
  isSessionState,
  isTerminalSessionState,
  logoutRevokesServerSession,
  mustRevokeSessionsOnPasswordChange,
  mustRevokeSessionsOnSuccessfulRecovery,
  mustRotateOnPrivilegeEscalation,
  resolveSessionTtlSeconds,
} from "./session-policy.ts";

export type {
  SessionExpiryInput,
  SessionState,
  TerminalSessionState,
} from "./session-policy.ts";

export {
  PASSWORD_HASH_DEFAULTS,
  hashPassword,
  verifyPassword,
} from "./password-hashing.ts";

export type { PasswordHashParams } from "./password-hashing.ts";

export {
  generateSessionToken,
  hashSessionToken,
  sessionTokenHashesEqual,
} from "./session-token.ts";

export {
  SESSION_COOKIE_CONTRACT,
  SESSION_COOKIE_NAME,
  buildSessionCookieAttributes,
  parseSessionCookieHeader,
  serializeExpiredSessionCookie,
  serializeSessionCookie,
} from "./session-cookie.ts";

export type {
  SessionCookieAttributes,
  SessionCookieSameSite,
} from "./session-cookie.ts";

export type { SessionStore, StoredSession } from "./session-store.ts";

export { createMemorySessionStore } from "./memory-session-store.ts";

export { createSessionRuntime } from "./session-runtime.ts";

export type { SessionRuntime } from "./session-runtime.ts";
