# S52-D2b – Staging AUTH_RUNTIME Deploy-Entscheid

**Status:** Menschlich freigegeben (`AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY`).
Deploy-Schritt dokumentiert. **Staging-Flag ist gesetzt und HTTP-verifiziert**
(2026-08-12). Production bleibt bewusst aus. Das Setzen der Railway-
Variable bleibt manuell im Staging-Dashboard (kein Repo-Secret, kein
Production-Flip).

**Parent:** `docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md`  
**Staging-Domain:** `ki-lernportal-nim-staging.up.railway.app`

## 1. Freigabe

```text
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
AUTH_RUNTIME_FLAG_FLIP_PRODUCTION=NO
RAILWAY_STAGING_AUTH_RUNTIME=AUTHORIZED
RAILWAY_PRODUCTION_AUTH_RUNTIME=NO
PRODUCTION_USERS=NO
```

## 2. Staging-Schritte (manuell)

1. Railway Projekt `ki-lernportal-nim` → **Staging**-Service öffnen.
2. Variables: `AUTH_RUNTIME=true` setzen (Service-Variable, nicht in Git).
3. Optional später (eigene Freigabe): Bootstrap-Credentials nur in Staging,
   niemals Production-Nutzer, keine Secrets im Repo.
4. Redeploy Staging (kein Autodeploy-Zwang; Wait for CI bleibt an).
5. Prüfen:
   - `GET https://ki-lernportal-nim-staging.up.railway.app/anmelden` zeigt Formular
   - `POST /api/auth/login` ohne Flag wäre `403`; mit Flag ohne User → `401`
   - Production/Concept-Demo unverändert ohne Flag

## 3. Production / Concept-Demo

```text
AUTH_RUNTIME=unset|false
LOGIN_UI sichtbar, aber „Anmeldung nicht aktiv“
```

Kein stiller Flag-Flip auf Production.

## 4. HTTP-Nachweis (2026-08-12)

Read-only Probes, keine Credentials, keine Secrets:

```text
STAGING_GET_ANMELDEN=200_FORM_WITH_EMAIL_PASSWORD
STAGING_POST_LOGIN_UNKNOWN_USER=401_AUTH_REQUIRED
PRODUCTION_GET_ANMELDEN=200_DISABLED_COPY
PRODUCTION_POST_LOGIN=403_FEATURE_DISABLED
PRODUCTION_USERS=NO
BOOTSTRAP_CREDENTIALS_IN_REPO=NO
```

Beobachtet:

- Staging `/anmelden` rendert Login-Formular (`type="email"`).
- Staging `POST /api/auth/login` mit Dummy-Credentials → `401` /
  `AUTH_REQUIRED` / „Invalid credentials.“ (Runtime an, kein Seed-User).
- Production `/anmelden` zeigt „Anmeldung ist derzeit nicht aktiv“.
- Production `POST /api/auth/login` → `403` / `FEATURE_DISABLED`.

Statischer Docs-Guard: `pnpm test:s52-d2b-staging-auth-docs`  
Optionale Live-Probe (manuell, nicht CI-pflichtig):
`bash scripts/probe-s52-d2b-staging-auth.sh`

## 5. Abnahme

```text
S52_D2B_STAGING_FLAG_DECISION_DOCUMENTED=YES
S52_D2B_STAGING_FLAG_HTTP_VERIFIED=YES
S52_D2B_STAGING_FLAG_HTTP_VERIFIED_AT=2026-08-12
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
RAILWAY_CHANGE_IN_REPO=NO
HUMAN_SETS_STAGING_AUTH_RUNTIME=YES
AUTH_RUNTIME_FLAG_FLIP_PRODUCTION=NO
```
