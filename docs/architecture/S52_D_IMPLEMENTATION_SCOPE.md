# S52-D – Auth-Web Implementation Scope

**Status:** S52-D1 Route-Verträge freigegeben und implementiert.
Login-UI bleibt `NO`. Feature-Flag-Default bleibt `false`.
**Parent:** `docs/architecture/S52_C_IMPLEMENTATION_SCOPE.md`,
`docs/architecture/S52_B_IMPLEMENTATION_SCOPE.md`,
`docs/architecture/adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`  
**Arbeitsbranch:** `cursor/s52-d1-auth-routes-b554`

## 1. Zweck

S52-D steuert die Auth-Web-Implementierung in kleinen Schnitten:

1. D1: `POST /api/auth/login` und `POST /api/auth/logout` hinter `auth_runtime`;
2. hält `auth_runtime` Default `false` und `LOGIN_UI=NO`;
3. verlangt negative Tests (Flag aus → kein Cookie);
4. CI-Vertrag: `scripts/check-s52-d-auth-web-impl-scope.mjs`.

## 2. Menschliche Freigabe (aktuell)

```text
S52_D_SCOPE_AUTHORIZED=YES
S52_D_IMPLEMENTATION_AUTHORIZED=YES
S52_D1_ROUTES_AUTHORIZED=YES
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
AUTH_WEB_SURFACE=D1_ROUTES_BEHIND_FLAG
LOGIN_UI=NO
REGISTRATION_UI=NO
APPS_WEB_AUTH_ROUTES=D1_LOGIN_LOGOUT_ONLY
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
AUTH_RUNTIME_FLAG_FLIP=NO
DATABASE_CONNECTION_AUTHORIZED=NO
PRODUCTION_USERS=NO
RAILWAY_CHANGE=NO
```

## 3. D1 Dateiscope

```text
ADD    packages/auth/src/auth-http.ts
ADD    packages/auth/src/auth-http.test.ts
ADD    apps/web/src/server/auth-http-adapter.ts
ADD    apps/web/src/app/api/auth/login/route.ts
ADD    apps/web/src/app/api/auth/logout/route.ts
MODIFY packages/auth/src/index.ts
MODIFY packages/auth/README.md
MODIFY apps/web/package.json
MODIFY apps/web/next.config.ts
MODIFY docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md
MODIFY docs/architecture/S52_D_IMPLEMENTATION_PLAN.md
MODIFY scripts/check-s52-d-auth-web-impl-scope.mjs
MODIFY scripts/check-s52-c-auth-web-scope.mjs
```

## 4. Verhalten D1

| Zustand | Login/Logout |
| --- | --- |
| `auth_runtime=false` (Default) | `403 FEATURE_DISABLED`, **kein** `Set-Cookie` |
| `AUTH_RUNTIME=true` (expliziter Opt-in) | Login/Logout über Memory-Store + `packages/auth` Runtime |
| Keine Seed-Nutzer in der Konzeptdemo | Login mit Credentials → `401` (kein Production-User) |

## 5. Weiterhin gesperrt

```text
LOGIN_UI=NO
REGISTRATION_UI=NO
PACKAGES_DB_SESSION_STORE=NO
DATABASE_QUERY=NO
OAUTH_PROVIDER_SDK=NO
MFA_PROVIDER_SDK=NO
PASSKEY_SDK=NO
RECOVERY_RUNTIME=NO
PRODUCTION_USERS=NO
RAILWAY_CHANGE=NO
AUTH_RUNTIME_FLAG_FLIP=NO
```

## 6. Abnahme D1

```text
S52_D_IMPLEMENTATION_AUTHORIZED=YES
S52_D1_ROUTES_AUTHORIZED=YES
S52_D1_STATIC_CHECK=YES
AUTH_WEB_SURFACE=D1_ROUTES_BEHIND_FLAG
LOGIN_UI=NO
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
DATABASE_CONNECTION_AUTHORIZED=NO
```

CI: `pnpm test:s52-d-auth-web-impl-scope`, `pnpm test:s52-d1-auth-http`

## 7. Implementierungsplan

`docs/architecture/S52_D_IMPLEMENTATION_PLAN.md` (D2+ weiterhin eigene Freigabe).
