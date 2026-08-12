/**
 * S52-B – in-memory session store for unit tests and local fakes.
 * Not for production persistence.
 */

import type { SessionStore, StoredSession } from "./session-store.ts";

export function createMemorySessionStore(): SessionStore {
  const byId = new Map<string, StoredSession>();
  const byHash = new Map<string, string>();

  return {
    async insert(session) {
      if (byId.has(session.sessionId)) {
        throw new Error("Session id already exists.");
      }
      if (byHash.has(session.tokenHash)) {
        throw new Error("Session token hash already exists.");
      }
      byId.set(session.sessionId, session);
      byHash.set(session.tokenHash, session.sessionId);
    },

    async findById(sessionId) {
      return byId.get(sessionId) ?? null;
    },

    async findByTokenHash(tokenHash) {
      const id = byHash.get(tokenHash);
      if (!id) {
        return null;
      }
      return byId.get(id) ?? null;
    },

    async update(session) {
      const previous = byId.get(session.sessionId);
      if (!previous) {
        throw new Error("Session not found.");
      }
      if (previous.tokenHash !== session.tokenHash) {
        byHash.delete(previous.tokenHash);
        if (byHash.has(session.tokenHash)) {
          throw new Error("Session token hash already exists.");
        }
        byHash.set(session.tokenHash, session.sessionId);
      }
      byId.set(session.sessionId, session);
    },

    async listBySubjectId(subjectId) {
      return [...byId.values()].filter((s) => s.subjectId === subjectId);
    },
  };
}
