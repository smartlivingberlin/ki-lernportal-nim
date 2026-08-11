# S52-D – Auth-Web Implementation Scope

**Status:** D1 integriert; D2 `/anmelden` implementiert; Staging-Flag
freigegeben (manueller Railway-Set). Feature-Flag-**Default** bleibt `false`.
**Parent:** `docs/architecture/S52_C_IMPLEMENTATION_SCOPE.md`  
**Baseline-Hinweis:** nach Merge dieses Slices auf `main` aktualisieren.

## 1. Zweck

1. D1: Login/Logout-Routen — integriert (#142)
2. D2: `/anmelden` — implementiert (dieser Slice)
3. D2b: Staging `AUTH_RUNTIME=true` — Deploy-Entscheid dokumentiert
4. CI: `scripts/check-s52-d-auth-web-impl-scope.mjs`

## 2. Menschliche Freigabe (aktuell)

```text
S52_D_SCOPE_AUTHORIZED=YES
S52_D_IMPLEMENTATION_AUTHORIZED=YES
S52_D1_ROUTES_AUTHORIZED=YES
S52_D1_INTEGRATED_TO_MAIN=YES
S52_D2_LOGIN_UI_AUTHORIZED=YES
S52_D2_CODE_CHANGED=YES
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
AUTH_WEB_SURFACE=D2_LOGIN_UI_BEHIND_FLAG
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
LOGIN_UI_IMPLEMENTED=YES
REGISTRATION_UI=NO
APPS_WEB_AUTH_ROUTES=D1_LOGIN_LOGOUT_ONLY
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
DATABASE_CONNECTION_AUTHORIZED=NO
PRODUCTION_USERS=NO
RAILWAY_CHANGE=NO
```

## 3. D2 Dateiscope

```text
ADD    apps/web/src/app/anmelden/page.tsx
ADD    apps/web/src/components/auth/LoginForm.tsx
ADD    docs/architecture/S52_D2B_STAGING_AUTH_RUNTIME.md
MODIFY docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md
MODIFY docs/architecture/S52_D_IMPLEMENTATION_PLAN.md
MODIFY scripts/check-s52-d-auth-web-impl-scope.mjs
MODIFY scripts/check-s52-c-auth-web-scope.mjs
```

## 4. Verhalten

| Umgebung | `/anmelden` | API |
| --- | --- | --- |
| Default / Production Concept | Hinweis „nicht aktiv“ | `403 FEATURE_DISABLED` |
| Staging mit `AUTH_RUNTIME=true` | Formular | Login/Logout aktiv; ohne User → `401` |

Kein Home-Nav-Link „Anmelden“ (Smoke-Guardrail).

## 5. Staging-Flag

Siehe `docs/architecture/S52_D2B_STAGING_AUTH_RUNTIME.md`.
Railway-Variable setzt ein Mensch; dieses Repo enthält kein Secret.

## 6. Weiterhin gesperrt

```text
REGISTRATION_UI=NO
PACKAGES_DB_SESSION_STORE=NO
PRODUCTION_USERS=NO
AUTH_RUNTIME_FLAG_FLIP_PRODUCTION=NO
RAILWAY_CHANGE=NO
```

## 7. Abnahme

```text
S52_D2_LOGIN_UI_AUTHORIZED=YES
S52_D2_CODE_CHANGED=YES
LOGIN_UI_IMPLEMENTED=YES
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
S52_D2B_STAGING_FLAG_DECISION_DOCUMENTED=YES
```
