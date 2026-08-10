# S52-B – Auth-Runtime Foundation (Cookies, Hashing, Sessions)

**Status:** Scope-Lock mit lokaler Runtime-Implementierung in `packages/auth`.
Keine Login-UI, keine Route Handler in `apps/web`, keine DB-Verbindung, kein
Railway, keine Produktionsnutzer.
**Parent:** `docs/architecture/S52_A_IMPLEMENTATION_SCOPE.md`,
`docs/architecture/adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`  
**Baseline:** `8d01f606a1621a5b41d8e3c4020eddcaf97cafd7`  
**Arbeitsbranch:** `cursor/s52-b-auth-runtime-b554`

## 1. Zweck

S52-B liefert die erste Auth-Runtime-Schicht laut ADR-0003:

1. Passwort-Hashing mit Node.js `scrypt` (individuelle Salts, Timing-safe Verify);
2. opake Sitzungstokens; nur Token-Hash speicherbar;
3. Cookie-Attributvertrag (`HttpOnly`, `Secure`, `SameSite`, `Path`);
4. Session-Store-Interface + In-Memory-Fake für Tests;
5. Lifecycle: create, use/touch, rotate, revoke, logout, revoke-all-for-subject.

## 2. Menschliche Freigabe

```text
S52_B_SCOPE_AUTHORIZED=YES
S52_B_IMPLEMENTATION_AUTHORIZED=YES
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
LOGIN_UI=NO
ROUTE_HANDLERS=NO
DATABASE_CONNECTION=NO
PRODUCTION_USERS=NO
RAILWAY_CHANGE=NO
```

## 3. Exakter Dateiscope

```text
ADD    docs/architecture/S52_B_IMPLEMENTATION_SCOPE.md
MODIFY packages/auth/README.md
MODIFY packages/auth/src/index.ts
ADD    packages/auth/src/password-hashing.ts
ADD    packages/auth/src/password-hashing.test.ts
ADD    packages/auth/src/session-token.ts
ADD    packages/auth/src/session-token.test.ts
ADD    packages/auth/src/session-cookie.ts
ADD    packages/auth/src/session-cookie.test.ts
ADD    packages/auth/src/session-store.ts
ADD    packages/auth/src/memory-session-store.ts
ADD    packages/auth/src/session-runtime.ts
ADD    packages/auth/src/session-runtime.test.ts
MODIFY scripts/check-package-boundaries.mjs
MODIFY package.json
MODIFY .github/workflows/ci.yml
MODIFY AGENTS.md
MODIFY docs/00_PROJECT_STATUS.md
MODIFY docs/architecture/MVP_SCOPE.md
MODIFY docs/architecture/S52_A_IMPLEMENTATION_SCOPE.md
MODIFY docs/architecture/PACKAGE_DAG.md
```

Keine neue Runtime-npm-Dependency: nur Node.js `crypto`.
`@types/node` ist als einzige Auth-devDependency für den Typecheck erlaubt.

## 4. Verträge

### 4.1 Passwort-Hash

```text
algorithm=scrypt
encoding=nim-scrypt-v1$<N>$<r>$<p>$<salt_b64url>$<hash_b64url>
```

- Klartextpasswort niemals loggen oder zurückgeben
- Verify mit `timingSafeEqual`
- Keine reversible Verschlüsselung

### 4.2 Sitzungstoken

```text
raw_token = base64url(32 random bytes)
stored    = sha256(raw_token) hex
```

Rohes Token nur an den Cookie-Pfad; Store kennt nur den Hash.

### 4.3 Cookie

```text
name=nim_session
HttpOnly; Secure; SameSite=Lax; Path=/
Max-Age aus Session-TTL-Kandidaten (ADR-0003)
```

Kein `__Host-`-Zwang in diesem Slice (lokale HTTP-Tests); Attribute bleiben
streng. Cookie-Builder erzeugt nur Header-Fragmente, keine Next.js-Kopplung.

### 4.4 Session-Datensatz (Store)

```text
sessionId
subjectId
role
status
tokenHash
createdAtMs
lastSeenAtMs
```

Widerruf und Rotation erzeugen neue bzw. terminale Zustände laut S52-A Policy.

## 5. Ausgeschlossen

```text
LOGIN_UI=NO
REGISTRATION_UI=NO
APPS_WEB_ROUTE_HANDLERS=NO
PACKAGES_DB_IMPORT=NO
DATABASE_QUERY=NO
OAUTH_PROVIDER_SDK=NO
MFA_PROVIDER_SDK=NO
PASSKEY_SDK=NO
RECOVERY_RUNTIME=NO
PRODUCTION_USERS=NO
RAILWAY_CHANGE=NO
```

Feature Flag `auth_runtime` in der Web-Konzeptdemo bleibt `false` (OPS-A).

## 6. Abnahme

```text
S52_B_SCOPE_AUTHORIZED=YES
S52_B_IMPLEMENTATION_AUTHORIZED=YES
AUTH_RUNTIME_AUTHORIZED=YES
PASSWORD_HASHING_RUNTIME=YES
COOKIE_CONTRACT_RUNTIME=YES
OPAQUE_SESSION_RUNTIME=YES
MEMORY_SESSION_STORE=YES
DATABASE_CONNECTION_AUTHORIZED=NO
LOGIN_UI=NO
PRODUCTION_USERS=NO
```

CI: `pnpm test:s52-b-auth-runtime`
