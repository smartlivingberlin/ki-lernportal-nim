# S52-C – Auth-Web Boundary Scope-Lock

**Status:** Scope-Lock nur. Keine Login-/Registrierungs-UI, keine neuen
Route Handler in `apps/web`, keine DB-Session-Persistenz, kein Railway-Change,
kein Feature-Flag-Flip.
**Parent:** `docs/architecture/S52_B_IMPLEMENTATION_SCOPE.md`,
`docs/architecture/adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`,
`docs/architecture/adr/ADR-0002-SERVER-BOUNDARIES.md`  
**Baseline:** `18deca45770daf8a58e61bbf4fae25dec7bd43cb`  
**Arbeitsbranch:** `cursor/s52-c-auth-web-scope-b554`

## 1. Zweck

S52-C schließt die **Web-Grenze** vor einer späteren Auth-Oberflächen-
Implementierung:

1. legt fest, welche `apps/web`-Oberflächen und Server-Grenzen künftig erlaubt
   sein dürfen;
2. hält `auth_runtime` auf dem sicheren Default `false` (OPS-A);
3. verbietet Login-UI, Session-Cookies in der Konzeptdemo und DB-backed
   Sessions, bis ein eigener Folgeslice freigegeben ist;
4. stellt einen CI-festen Negativvertrag bereit
   (`scripts/check-s52-c-auth-web-scope.mjs`).

## 2. Menschliche Freigabe (dieser Slice)

```text
S52_C_SCOPE_AUTHORIZED=YES
S52_C_IMPLEMENTATION_AUTHORIZED=SCOPE_LOCK_ONLY
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
AUTH_WEB_SURFACE=DOCUMENTED_NOT_IMPLEMENTED
LOGIN_UI=NO
REGISTRATION_UI=NO
APPS_WEB_AUTH_ROUTES=NO
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
DATABASE_CONNECTION_AUTHORIZED=NO
PRODUCTION_USERS=NO
RAILWAY_CHANGE=NO
```

## 3. Exakter Dateiscope

```text
ADD    docs/architecture/S52_C_IMPLEMENTATION_SCOPE.md
ADD    scripts/check-s52-c-auth-web-scope.mjs
MODIFY package.json
MODIFY .github/workflows/ci.yml
MODIFY AGENTS.md
MODIFY docs/00_PROJECT_STATUS.md
MODIFY docs/architecture/MVP_SCOPE.md
MODIFY docs/architecture/S52_B_IMPLEMENTATION_SCOPE.md
MODIFY docs/architecture/PACKAGE_DAG.md
MODIFY packages/auth/README.md
```

Keine Produktcode-Änderung in `apps/web`. Keine neue npm-Dependency.

## 4. Geplante Web-Grenze (noch nicht implementieren)

Spätere, separat freizugebende Slices dürfen **höchstens** folgende Richtung
verfolgen (kein Automatismus):

| Fläche | Später möglich | Jetzt |
| --- | --- | --- |
| `packages/auth` Runtime | bereits S52-B | freigegeben |
| Feature Flag `auth_runtime` | Default bleibt `false` bis Freigabe | gesperrt |
| Route Handler z. B. `/api/auth/*` | nur hinter Flag + CSRF/Cookie-Vertrag | gesperrt |
| Login-/Logout-UI | nur serverseitig maßgebliche Sessions | gesperrt |
| Registrierung | eigene Freigabe + DSGVO-Text | gesperrt |
| DB-Session-Store | erst nach Persistenz-/Migrationsfreigabe | gesperrt |
| Clientseitige Rollenanzeige als Autorisierung | niemals ausreichend | verboten |

Server-Grenze laut ADR-0002/0003:

```text
Browser
  -> HTTPS Route Handler / Server Action (apps/web)
    -> packages/auth Session-Runtime
      -> (später) packages/db Session-Store
```

React-Komponenten dürfen niemals:

- Passwort-Hashes erzeugen oder speichern;
- Sitzungstokens in `localStorage` legen;
- Rollen allein clientseitig „freischalten“.

## 5. Negativvertrag (CI)

`scripts/check-s52-c-auth-web-scope.mjs` prüft mindestens:

- dieses Scope-Dokument mit den Gate-Markern oben;
- `DEFAULT_FEATURE_FLAGS.auth_runtime === false` in
  `packages/contracts/src/operations.ts`;
- keine `apps/web/src/app/**/login|register|auth|session`-Routen;
- `packages/auth/README.md` enthält `LOGIN_UI=NO` und
  `AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY`.

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
S52_C_SCOPE_LOCK_COMPLETE=YES
S52_C_STATIC_CHECK=YES
AUTH_WEB_SURFACE=DOCUMENTED_NOT_IMPLEMENTED
LOGIN_UI=NO
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
DATABASE_CONNECTION_AUTHORIZED=NO
```

CI: `pnpm test:s52-c-auth-web-scope`

## 8. Folge: S52-D Auth-Web Implementation Scope-Lock

Implementierungsgrenze ohne Login-Code:
`docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md`.

Folgeslices (eigene Freigabe) können Auth-Route-Handler, Login-UI hinter
`auth_runtime`, DB-Session-Store und negative IDOR-Tests umfassen — nicht
dieser Slice.
