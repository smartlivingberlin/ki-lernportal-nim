/**
 * S52-A – opaque session lifecycle policy vocabulary from ADR-0003.
 *
 * Candidate TTL values are documented defaults only — not a production
 * approval. No cookies, hashing, persistence or network I/O.
 */

import {
  type PlatformRole,
  isPrivilegedPlatformRole,
} from "./platform-roles.ts";

export const SESSION_STATES = [
  "created",
  "active",
  "rotated",
  "expired",
  "revoked",
  "compromised",
  "terminated",
] as const;

export type SessionState = (typeof SESSION_STATES)[number];

export const TERMINAL_SESSION_STATES = [
  "expired",
  "revoked",
  "compromised",
  "terminated",
] as const;

export type TerminalSessionState =
  (typeof TERMINAL_SESSION_STATES)[number];

/** Candidate defaults from ADR-0003 — not a productive freigabe. */
export const SESSION_TTL_CANDIDATES = Object.freeze({
  learnerIdleMaxSeconds: 7 * 24 * 60 * 60,
  learnerAbsoluteMaxSeconds: 30 * 24 * 60 * 60,
  privilegedIdleMaxSeconds: 8 * 60 * 60,
  privilegedAbsoluteMaxSeconds: 24 * 60 * 60,
  SESSION_TTL_VALUES_APPROVED: false,
});

function isControlledValue<TValue extends string>(
  values: readonly TValue[],
  candidate: unknown,
): candidate is TValue {
  return (
    typeof candidate === "string" &&
    values.includes(candidate as TValue)
  );
}

export function isSessionState(
  candidate: unknown,
): candidate is SessionState {
  return isControlledValue(SESSION_STATES, candidate);
}

export function isTerminalSessionState(
  status: SessionState,
): boolean {
  return isControlledValue(TERMINAL_SESSION_STATES, status);
}

export function canRenewSession(status: SessionState): boolean {
  return status === "active" || status === "rotated";
}

export function mustRotateOnPrivilegeEscalation(): true {
  return true;
}

export function mustRevokeSessionsOnPasswordChange(): true {
  return true;
}

export function mustRevokeSessionsOnSuccessfulRecovery(): true {
  return true;
}

export function logoutRevokesServerSession(): true {
  return true;
}

export interface SessionExpiryInput {
  readonly nowMs: number;
  readonly lastSeenAtMs: number;
  readonly createdAtMs: number;
  readonly role: PlatformRole;
}

export function resolveSessionTtlSeconds(role: PlatformRole): {
  readonly idleMaxSeconds: number;
  readonly absoluteMaxSeconds: number;
} {
  if (isPrivilegedPlatformRole(role)) {
    return {
      idleMaxSeconds: SESSION_TTL_CANDIDATES.privilegedIdleMaxSeconds,
      absoluteMaxSeconds:
        SESSION_TTL_CANDIDATES.privilegedAbsoluteMaxSeconds,
    };
  }

  return {
    idleMaxSeconds: SESSION_TTL_CANDIDATES.learnerIdleMaxSeconds,
    absoluteMaxSeconds: SESSION_TTL_CANDIDATES.learnerAbsoluteMaxSeconds,
  };
}

export function isSessionExpiredByTime(
  input: SessionExpiryInput,
): boolean {
  const ttl = resolveSessionTtlSeconds(input.role);
  const idleExceeded =
    input.nowMs - input.lastSeenAtMs > ttl.idleMaxSeconds * 1000;
  const absoluteExceeded =
    input.nowMs - input.createdAtMs > ttl.absoluteMaxSeconds * 1000;
  return idleExceeded || absoluteExceeded;
}

export function canUseSession(input: {
  readonly status: SessionState;
  readonly expiry: SessionExpiryInput;
}): boolean {
  if (!canRenewSession(input.status)) {
    return false;
  }
  return !isSessionExpiredByTime(input.expiry);
}
