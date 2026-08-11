# S52-D – Auth-Web Implementation Scope

**Status:** D1 integriert (`#142`). D2 Login-UI und Staging-Flag **freigegeben**,
noch nicht implementiert. Feature-Flag-**Default** bleibt `false`.
**Parent:** `docs/architecture/S52_C_IMPLEMENTATION_SCOPE.md`,
`docs/architecture/S52_B_IMPLEMENTATION_SCOPE.md`,
`docs/architecture/adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`  
**Baseline `main`:** `d91514f1f08ad343cbd0d6e1e63e81833676ffd5` (#142)

## 1. Zweck

S52-D steuert die Auth-Web-Implementierung in kleinen Schnitten:

1. D1: `POST /api/auth/login` und `POST /api/auth/logout` hinter `auth_runtime` — **integriert**;
2. D2: minimale Login-UI `/anmelden` hinter Flag — **freigegeben, Code ausstehend**;
3. Staging darf `AUTH_RUNTIME=true` setzen — **freigegeben**; Production-Default bleibt `false`;
4. CI-Vertrag: `scripts/check-s52-d-auth-web-impl-scope.mjs`.

## 2. Menschliche Freigabe (aktuell)

```text
S52_D_SCOPE_AUTHORIZED=YES
S52_D_IMPLEMENTATION_AUTHORIZED=YES
S52_D1_ROUTES_AUTHORIZED=YES
S52_D1_INTEGRATED_TO_MAIN=YES
S52_D1_MERGE_COMMIT=d91514f1f08ad343cbd0d6e1e63e81833676ffd5
S52_D2_LOGIN_UI_AUTHORIZED=YES
S52_D2_CODE_CHANGED=NO
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
AUTH_WEB_SURFACE=D1_ROUTES_BEHIND_FLAG
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
LOGIN_UI_IMPLEMENTED=NO
REGISTRATION_UI=NO
APPS_WEB_AUTH_ROUTES=D1_LOGIN_LOGOUT_ONLY
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
DATABASE_CONNECTION_AUTHORIZED=NO
PRODUCTION_USERS=NO
RAILWAY_CHANGE=NO
```

## 3. D1 (integriert)

Siehe Merge `#142` / `d91514f`. Verhalten unverändert:

| Zustand | Login/Logout |
| --- | --- |
| `auth_runtime=false` (Default) | `403 FEATURE_DISABLED`, **kein** `Set-Cookie` |
| `AUTH_RUNTIME=true` (Staging-Opt-in) | Login/Logout über Memory-Store + `packages/auth` |
| Keine Seed-Nutzer in der Konzeptdemo | Login → `401` ohne Credentials |

## 4. D2 Freigabe (noch kein Code)

Erlaubt in einem **eigenen** Implementierungs-PR:

- Seite `/anmelden` (schlicht, deutsch): E-Mail, Passwort, Anmelden, Abbrechen
- Nur sichtbar/nutzbar wenn `auth_runtime` aktiv (Staging-Flag)
- Cookie nur serverseitig laut S52-B
- Kein Registrieren, kein OAuth/MFA

```text
S52_D2_LOGIN_UI_AUTHORIZED=YES
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
LOGIN_UI_IMPLEMENTED=NO
REGISTRATION_UI=NO
```

## 5. Staging-Flag Freigabe

```text
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
```

- **Staging** (`ki-lernportal-nim-staging`): `AUTH_RUNTIME=true` erlaubt
- **Production / Concept-Demo**: Default bleibt `false`; kein stiller Flag-Flip
- Railway-Servicevariablen nur nach explizitem Deploy-Schritt (dieser Slice ändert Railway nicht)

## 6. Weiterhin gesperrt

```text
LOGIN_UI_IMPLEMENTED=NO
REGISTRATION_UI=NO
PACKAGES_DB_SESSION_STORE=NO
DATABASE_QUERY=NO
OAUTH_PROVIDER_SDK=NO
MFA_PROVIDER_SDK=NO
PASSKEY_SDK=NO
RECOVERY_RUNTIME=NO
PRODUCTION_USERS=NO
RAILWAY_CHANGE=NO
AUTH_RUNTIME_FLAG_FLIP_PRODUCTION=NO
```

## 7. Abnahme dieses Docs-Slices

```text
BASELINE_MAIN_SHA=d91514f1f08ad343cbd0d6e1e63e81833676ffd5
PR142_MERGED=YES
S52_D1_INTEGRATED_TO_MAIN=YES
S52_D2_LOGIN_UI_AUTHORIZED=YES
S52_D2_CODE_CHANGED=NO
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
DATABASE_CONNECTION_AUTHORIZED=NO
RAILWAY_CHANGE=NO
```

CI: `pnpm test:s52-d-auth-web-impl-scope`

## 8. Implementierungsplan

`docs/architecture/S52_D_IMPLEMENTATION_PLAN.md`
