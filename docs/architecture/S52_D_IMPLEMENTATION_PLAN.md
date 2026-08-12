# S52-D – Auth-Web Implementierungsplan

**Status:** D1 integriert; D2 `/anmelden` implementiert; Staging-Flag
Deploy-Entscheid dokumentiert (`AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY`).
**Parent:** `docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md`

## 1. Marker

```text
S52_D_IMPLEMENTATION_PLAN_DOCUMENTED=YES
S52_D_IMPLEMENTATION_AUTHORIZED=YES
S52_D1_CODE_CHANGED=YES
S52_D2_LOGIN_UI_AUTHORIZED=YES
S52_D2_CODE_CHANGED=YES
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
LOGIN_UI_IMPLEMENTED=YES
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
DATABASE_CONNECTION_AUTHORIZED=NO
RAILWAY_CHANGE=NO
```

## 2. Schnittfolge

### Slice D1 — DONE (#142)
### Slice D2 — DONE (dieser PR): `/anmelden` + LoginForm hinter Flag
### Slice D2b — DONE: Staging `AUTH_RUNTIME=true` manuell + HTTP-verifiziert (2026-08-12)
### Slice D3 — Security-Tests (eigene Freigabe)
### Slice D4 — Registrierung / DB-Sessions (eigene Freigabe)

## 3. Abnahme D2

```text
S52_D2_CODE_CHANGED=YES
LOGIN_UI_IMPLEMENTED=YES
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
S52_D2B_STAGING_FLAG_HTTP_VERIFIED=YES
```
