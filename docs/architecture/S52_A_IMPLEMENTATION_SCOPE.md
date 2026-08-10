# S52-A – Auth Session-/Rollen-Vokabular Scope-Lock

**Status:** Scope-Lock mit schmaler, infrastrukturfreier Implementierung in
`packages/auth`. Keine Auth-Runtime, keine Cookies, keine DB-Verbindung, kein
Login-UI, kein Railway.
**Parent:** `docs/architecture/adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`,
`docs/architecture/PLATFORM_CONTRACTS.md`, Issue #94  
**Baseline:** `068559ad72cb732ede61ffaa9a3742d9933d841c`  
**Arbeitsbranch:** `cursor/s52-a-auth-session-policy-b554`

## 1. Zweck

S52-A liefert:

- Plattformrollen laut PLATFORM_CONTRACTS;
- Sitzungszustände und reine Lifecycle-Prädikate laut ADR-0003;
- Kandidaten-TTL-Konstanten (noch keine produktive Freigabe);
- MFA-Pflicht-Prädikat für Admin/Owner;
- Verbot der First-User-Admin-Regel als reine Policy-Funktion.

## 2. Exakter Dateiscope

```text
ADD    docs/architecture/S52_A_IMPLEMENTATION_SCOPE.md
MODIFY packages/auth/README.md
MODIFY packages/auth/src/index.ts
ADD    packages/auth/src/platform-roles.ts
ADD    packages/auth/src/platform-roles.test.ts
ADD    packages/auth/src/session-policy.ts
ADD    packages/auth/src/session-policy.test.ts
MODIFY package.json
MODIFY .github/workflows/ci.yml
MODIFY AGENTS.md
MODIFY docs/00_PROJECT_STATUS.md
MODIFY docs/architecture/MVP_SCOPE.md
```

## 3. Erlaubt

- reine TypeScript-Allowlists, Typen und Prädikate in `packages/auth`
- Unit-Tests ohne Netzwerk/DB
- CI-Schritt `pnpm test:s52-a-auth-policy`

## 4. Verboten

```text
AUTH_RUNTIME_AUTHORIZED=NO
PASSWORD_HASHING_RUNTIME=NO
COOKIE_RUNTIME=NO
LOGIN_UI=NO
ROUTE_HANDLERS=NO
DATABASE_CONNECTION=NO
DATABASE_QUERY=NO
RAILWAY_CHANGE=NO
PRODUCTION_USERS=NO
MFA_PROVIDER_SDK=NO
OAUTH_PROVIDER_SDK=NO
```

Keine neue Dependency in `packages/auth/package.json` in diesem Slice.
Kein Import aus `packages/db`.

## 5. Abnahme

```text
S52_A_SCOPE_AUTHORIZED=YES
S52_A_IMPLEMENTATION_AUTHORIZED=YES
PLATFORM_ROLES_LOCKED=YES
SESSION_STATES_LOCKED=YES
AUTH_RUNTIME_AUTHORIZED=SEE_S52_B
FIRST_USER_AUTO_ADMIN_FORBIDDEN=YES
```

S52-B liefert die freigegebene lokale Auth-Runtime-Foundation:
`docs/architecture/S52_B_IMPLEMENTATION_SCOPE.md`.