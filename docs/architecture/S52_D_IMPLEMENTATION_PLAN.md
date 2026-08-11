# S52-D – Auth-Web Implementierungsplan

**Status:** D1 integriert. D2 Login-UI und Staging-Flag **freigegeben**
(`LOGIN_UI=AUTHORIZED_BEHIND_FLAG`, `AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY`);
D2-Code und Railway-Änderung ausstehend.
**Parent:** `docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md`  
**Baseline `main`:** `d91514f1f08ad343cbd0d6e1e63e81833676ffd5` (#142)

## 1. Zweck

```text
S52_D_IMPLEMENTATION_PLAN_DOCUMENTED=YES
S52_D_IMPLEMENTATION_AUTHORIZED=YES
S52_D1_CODE_CHANGED=YES
S52_D2_LOGIN_UI_AUTHORIZED=YES
S52_D2_CODE_CHANGED=NO
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
DATABASE_CONNECTION_AUTHORIZED=NO
RAILWAY_CHANGE=NO
```

## 2. Schnittfolge

### Slice D1 – Route-Verträge — DONE (#142)

- `POST /api/auth/login`, `POST /api/auth/logout`
- Hinter `auth_runtime`; Default `false` → `403 FEATURE_DISABLED`, kein Cookie

### Slice D2 – Minimale Login-UI — AUTHORIZED, Code ausstehend

- Seite `/anmelden` (deutsch, schlicht)
- Felder: E-Mail, Passwort; Buttons: Anmelden, Abbrechen
- Kein Registrieren in D2
- Cookie nur Server-Set (S52-B)
- UI nur sinnvoll bei aktivem Staging-Flag; Default in Contracts bleibt `false`

### Slice D2b – Staging-Flag — AUTHORIZED, Railway ausstehend

- Staging: `AUTH_RUNTIME=true` erlaubt
- Production/Concept: kein Flag-Flip ohne eigenen Deploy-Entscheid
- Dieser Docs-Slice setzt **keine** Railway-Variablen

### Slice D3 – Negative Security-Tests

- CSRF-/SameSite, Session-Fixation, IDOR-Stubs, keine Secrets in Logs

### Slice D4 – optional später

- Registrierung, DB-Session-Store, Recovery/MFA/OAuth

## 3. Nicht ohne weitere Freigabe

```text
PRODUCTION_USERS=NO
OAUTH=NO
MFA=NO
PASSKEYS=NO
FIRST_USER_AUTO_ADMIN=FORBIDDEN
LOCALSTORAGE_SESSION_TOKEN=FORBIDDEN
AUTH_RUNTIME_FLAG_FLIP_PRODUCTION=NO
```

## 4. Abnahme vor Ready einer D2-Code-PR

- `S52_D2_LOGIN_UI_AUTHORIZED=YES` (dieses Dokument)
- `pnpm test:s52-c-auth-web-scope` und `pnpm test:s52-d-auth-web-impl-scope` grün
- Negativtests: Flag aus → kein Cookie; keine Klartextpasswörter in Logs
- Scope-Checks erlauben `/anmelden` erst mit D2-Code

## 5. Abnahme dieses Freigabe-/Sync-Slices

```text
S52_D_IMPLEMENTATION_PLAN_DOCUMENTED=YES
S52_D_IMPLEMENTATION_AUTHORIZED=YES
S52_D1_CODE_CHANGED=YES
S52_D2_LOGIN_UI_AUTHORIZED=YES
S52_D2_CODE_CHANGED=NO
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
```
