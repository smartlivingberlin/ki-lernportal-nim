/**
 * S52-B – session store port. Persistence adapters (DB) are out of scope.
 */

import type { PlatformRole } from "./platform-roles.ts";
import type { SessionState } from "./session-policy.ts";

export type StoredSession = Readonly<{
  sessionId: string;
  subjectId: string;
  role: PlatformRole;
  status: SessionState;
  tokenHash: string;
  createdAtMs: number;
  lastSeenAtMs: number;
}>;

export type SessionStore = {
  insert(session: StoredSession): Promise<void>;
  findById(sessionId: string): Promise<StoredSession | null>;
  findByTokenHash(tokenHash: string): Promise<StoredSession | null>;
  update(session: StoredSession): Promise<void>;
  listBySubjectId(subjectId: string): Promise<readonly StoredSession[]>;
};
