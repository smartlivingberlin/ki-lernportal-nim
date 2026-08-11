# S52-D – Auth-Web Implementation Scope-Lock

**Status:** Scope-Lock nur. Keine Login-/Registrierungs-UI, keine Auth-Route
Handler, kein Flag-Flip, keine DB-Sessions, kein Railway in diesem Slice.
**Parent:** `docs/architecture/S52_C_IMPLEMENTATION_SCOPE.md`,
`docs/architecture/S52_B_IMPLEMENTATION_SCOPE.md`,
`docs/architecture/adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`  
**Baseline:** `06e65b2e32eb1bc51faba615fe1944ba62abdfbc`  
**Arbeitsbranch:** `cursor/s52-d-auth-web-impl-scope-b554`

## 1. Zweck

S52-D sperrt den **nächsten Implementierungsschnitt** für Auth in `apps/web`,
nachdem S52-C die Web-Grenze dokumentiert hat:

1. definiert den exakten Folgescope für Login/Logout hinter Feature-Flag;
2. hält `auth_runtime` Default `false` und `LOGIN_UI=NO` bis Freigabe;
3. verlangt negative Security-Tests (IDOR/CSRF/Cookie) vor Ready;
4. stellt einen CI-Negativvertrag bereit
   (`scripts/check-s52-d-auth-web-impl-scope.mjs`).

## 2. Menschliche Freigabe (dieser Slice)

```text
S52_D_SCOPE_AUTHORIZED=YES
S52_D_IMPLEMENTATION_AUTHORIZED=SCOPE_LOCK_ONLY
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
AUTH_WEB_SURFACE=DOCUMENTED_NOT_IMPLEMENTED
LOGIN_UI=NO
REGISTRATION_UI=NO
APPS_WEB_AUTH_ROUTES=NO
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
AUTH_RUNTIME_FLAG_FLIP=NO
DATABASE_CONNECTION_AUTHORIZED=NO
PRODUCTION_USERS=NO
RAILWAY_CHANGE=NO
```

## 3. Exakter Dateiscope (dieser Scope-Lock)

```text
ADD    docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md
ADD    scripts/check-s52-d-auth-web-impl-scope.mjs
MODIFY package.json
MODIFY .github/workflows/ci.yml
MODIFY AGENTS.md
MODIFY docs/00_PROJECT_STATUS.md
MODIFY docs/architecture/MVP_SCOPE.md
MODIFY docs/architecture/S52_C_IMPLEMENTATION_SCOPE.md
MODIFY docs/architecture/PACKAGE_DAG.md
MODIFY packages/auth/README.md
```

Keine Produktcode-Änderung in `apps/web`. Keine neue npm-Dependency.

## 4. Geplanter Folgescope (eigene Implementierungsfreigabe)

Erst nach **separater** `S52_D_IMPLEMENTATION_AUTHORIZED=YES` (nicht dieser PR):

| Schritt | Erlaubt dann | Weiterhin gesperrt |
| --- | --- | --- |
| Route Handler `/api/auth/login` + `/api/auth/logout` | hinter `auth_runtime` | ohne Flag |
| Minimale Login-UI (E-Mail + Passwort) | nur Staging/Concept hinter Flag | Production-Nutzer |
| Cookie setzen laut S52-B Vertrag | HttpOnly/Secure/SameSite | Token in localStorage |
| Memory-Store in Process | Tests + Dev | DB-Session-Store |
| Negative Tests | CSRF, Session-Fixation, IDOR stubs | OAuth/MFA/Passkeys |

```text
Browser
  -> HTTPS Route Handler (apps/web)
    -> packages/auth Session-Runtime
      -> (später S52-E+) packages/db Session-Store
```

## 5. Negativvertrag (CI)

`scripts/check-s52-d-auth-web-impl-scope.mjs` prüft mindestens:

- dieses Scope-Dokument mit den Gate-Markern oben;
- S52-C Negativvertrag bleibt gültig (`LOGIN_UI=NO`, keine Auth-Routen);
- `DEFAULT_FEATURE_FLAGS.auth_runtime === false`;
- `packages/auth/README.md` nennt S52-D Scope-Lock und `LOGIN_UI=NO`.

## 6. Ausgeschlossen

```text
LOGIN_UI=NO
REGISTRATION_UI=NO
APPS_WEB_ROUTE_HANDLERS_AUTH=NO
COOKIE_SET_IN_CONCEPT_DEMO=NO
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

## 7. Abnahme

```text
S52_D_SCOPE_LOCK_COMPLETE=YES
S52_D_STATIC_CHECK=YES
AUTH_WEB_SURFACE=DOCUMENTED_NOT_IMPLEMENTED
LOGIN_UI=NO
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
DATABASE_CONNECTION_AUTHORIZED=NO
```

CI: `pnpm test:s52-d-auth-web-impl-scope`

Implementierung der Auth-Web-Oberfläche ist **nicht** Teil dieses Slices.
