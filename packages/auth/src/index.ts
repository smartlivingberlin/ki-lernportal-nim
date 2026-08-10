/**
 * S52-A auth package surface: platform roles and session policy vocabulary.
 * No auth runtime is authorized in this slice.
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
