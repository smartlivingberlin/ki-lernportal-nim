/**
 * S52-B – opaque revocable session runtime (store-backed, no DB/network).
 */

import { randomUUID } from "node:crypto";

import type { PlatformRole } from "./platform-roles.ts";
import {
  canUseSession,
  resolveSessionTtlSeconds,
  type SessionState,
} from "./session-policy.ts";
import {
  serializeExpiredSessionCookie,
  serializeSessionCookie,
} from "./session-cookie.ts";
import {
  generateSessionToken,
  hashSessionToken,
} from "./session-token.ts";
import type { SessionStore, StoredSession } from "./session-store.ts";

export type SessionRuntime = Readonly<{
  createSession(input: {
    subjectId: string;
    role: PlatformRole;
    nowMs?: number;
  }): Promise<{
    session: StoredSession;
    rawToken: string;
    setCookie: string;
  }>;
  resolveSession(input: {
    rawToken: string;
    nowMs?: number;
  }): Promise<StoredSession | null>;
  touchSession(input: {
    sessionId: string;
    nowMs?: number;
  }): Promise<StoredSession | null>;
  rotateSession(input: {
    sessionId: string;
    nowMs?: number;
  }): Promise<{
    session: StoredSession;
    rawToken: string;
    setCookie: string;
  } | null>;
  revokeSession(input: {
    sessionId: string;
    reason?: "revoked" | "compromised" | "terminated";
    nowMs?: number;
  }): Promise<StoredSession | null>;
  revokeAllForSubject(input: {
    subjectId: string;
    reason?: "revoked" | "compromised" | "terminated";
    nowMs?: number;
  }): Promise<number>;
  logout(input: {
    sessionId: string;
    nowMs?: number;
  }): Promise<{ session: StoredSession | null; setCookie: string }>;
}>;

function isUsableStatus(status: SessionState): boolean {
  return status === "active" || status === "rotated" || status === "created";
}

function withStatus(
  session: StoredSession,
  status: SessionState,
  nowMs: number,
): StoredSession {
  return {
    ...session,
    status,
    lastSeenAtMs: nowMs,
  };
}

export function createSessionRuntime(store: SessionStore): SessionRuntime {
  async function materializeUsable(
    session: StoredSession,
    nowMs: number,
  ): Promise<StoredSession | null> {
    if (!isUsableStatus(session.status)) {
      return null;
    }

    const usable = canUseSession({
      status: session.status === "created" ? "active" : session.status,
      expiry: {
        nowMs,
        lastSeenAtMs: session.lastSeenAtMs,
        createdAtMs: session.createdAtMs,
        role: session.role,
      },
    });

    if (!usable) {
      const expired = withStatus(session, "expired", nowMs);
      await store.update(expired);
      return null;
    }

    if (session.status === "created") {
      const activated = withStatus(session, "active", nowMs);
      await store.update(activated);
      return activated;
    }

    return session;
  }

  return {
    async createSession(input) {
      const nowMs = input.nowMs ?? Date.now();
      const rawToken = generateSessionToken();
      const tokenHash = hashSessionToken(rawToken);
      const ttl = resolveSessionTtlSeconds(input.role);
      const session: StoredSession = {
        sessionId: randomUUID(),
        subjectId: input.subjectId,
        role: input.role,
        status: "active",
        tokenHash,
        createdAtMs: nowMs,
        lastSeenAtMs: nowMs,
      };
      await store.insert(session);
      return {
        session,
        rawToken,
        setCookie: serializeSessionCookie(rawToken, ttl.absoluteMaxSeconds),
      };
    },

    async resolveSession(input) {
      const nowMs = input.nowMs ?? Date.now();
      let tokenHash: string;
      try {
        tokenHash = hashSessionToken(input.rawToken);
      } catch {
        return null;
      }
      const found = await store.findByTokenHash(tokenHash);
      if (!found) {
        return null;
      }
      return materializeUsable(found, nowMs);
    },

    async touchSession(input) {
      const nowMs = input.nowMs ?? Date.now();
      const found = await store.findById(input.sessionId);
      if (!found) {
        return null;
      }
      const usable = await materializeUsable(found, nowMs);
      if (!usable) {
        return null;
      }
      const touched = { ...usable, lastSeenAtMs: nowMs };
      await store.update(touched);
      return touched;
    },

    async rotateSession(input) {
      const nowMs = input.nowMs ?? Date.now();
      const found = await store.findById(input.sessionId);
      if (!found) {
        return null;
      }
      const usable = await materializeUsable(found, nowMs);
      if (!usable) {
        return null;
      }

      const rawToken = generateSessionToken();
      const tokenHash = hashSessionToken(rawToken);
      const rotated: StoredSession = {
        ...usable,
        status: "rotated",
        tokenHash,
        lastSeenAtMs: nowMs,
      };
      await store.update(rotated);
      const ttl = resolveSessionTtlSeconds(rotated.role);
      return {
        session: rotated,
        rawToken,
        setCookie: serializeSessionCookie(rawToken, ttl.absoluteMaxSeconds),
      };
    },

    async revokeSession(input) {
      const nowMs = input.nowMs ?? Date.now();
      const found = await store.findById(input.sessionId);
      if (!found) {
        return null;
      }
      if (!isUsableStatus(found.status)) {
        return found;
      }
      const revoked = withStatus(
        found,
        input.reason ?? "revoked",
        nowMs,
      );
      await store.update(revoked);
      return revoked;
    },

    async revokeAllForSubject(input) {
      const nowMs = input.nowMs ?? Date.now();
      const sessions = await store.listBySubjectId(input.subjectId);
      let count = 0;
      for (const session of sessions) {
        if (!isUsableStatus(session.status)) {
          continue;
        }
        await store.update(
          withStatus(session, input.reason ?? "revoked", nowMs),
        );
        count += 1;
      }
      return count;
    },

    async logout(input) {
      const nowMs = input.nowMs ?? Date.now();
      const found = await store.findById(input.sessionId);
      let revoked: StoredSession | null = null;
      if (found) {
        if (isUsableStatus(found.status)) {
          revoked = withStatus(found, "terminated", nowMs);
          await store.update(revoked);
        } else {
          revoked = found;
        }
      }
      return {
        session: revoked,
        setCookie: serializeExpiredSessionCookie(),
      };
    },
  };
}
