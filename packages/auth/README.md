# `@ki-lernportal-nim/auth`

## Zweck

Grenze für Auth-, Session-, Rollen-, Scope- und Ownership-Logik.

## Erlaubte Imports

- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`
- `@ki-lernportal-nim/db`

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
S52-A/S52-B deklarieren bewusst keine Package-Dependencies; Runtime nutzt
nur Node.js `crypto`.

## Verbotene Imports

- UI und React
- Login-/Registrierungsseiten in `apps/web` bis D2-Code
  (`LOGIN_UI=AUTHORIZED_BEHIND_FLAG`, `LOGIN_UI_IMPLEMENTED=NO`)
- OAuth-, MFA-, Passkey- oder Recovery-Provider-SDKs in S52-B/C
- Direkte Datenbankimports in S52-B/C (`DATABASE_CONNECTION_AUTHORIZED=NO`)

Unzulässig bleiben außerdem zyklische Abhängigkeiten und direkte
Quellpfadimporte in andere Packages.

## Öffentliche Exports

Der kontrollierte Entry-Point ist `src/index.ts`.

- **S52-A:** Plattformrollen, Sitzungszustände, Policy-Prädikate
- **S52-B:** Passwort-Hashing (`scrypt`), opake Tokens, Cookie-Vertrag,
  Memory-Session-Store, Session-Runtime (create/resolve/rotate/revoke/logout)
- **S52-D1:** Auth-HTTP-Handler (`createAuthHttpHandlers`) für Login/Logout
  hinter Feature-Flag; keine Login-UI

## Status

```text
S52_A_VOCABULARY=INTEGRATED
S52_B_AUTH_RUNTIME_FOUNDATION=AUTHORIZED
S52_C_AUTH_WEB_SCOPE_LOCK=AUTHORIZED
S52_D_AUTH_WEB_IMPL=AUTHORIZED
S52_D1_AUTH_HTTP_ROUTES=AUTHORIZED
S52_D2_LOGIN_UI_AUTHORIZED=YES
S52_D2_CODE_CHANGED=NO
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
AUTH_WEB_SURFACE=D1_ROUTES_BEHIND_FLAG
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
LOGIN_UI_IMPLEMENTED=NO
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
DATABASE_CONNECTION=NO
PRODUCTION_USERS=NO
```

## Spätere Slices

S52-C dokumentiert die Auth-Web-Grenze
(`docs/architecture/S52_C_IMPLEMENTATION_SCOPE.md`).
S52-D1 liefert Login/Logout-Route-Verträge hinter `auth_runtime`
(`docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md`). D2 Login-UI und
Staging-Flag sind freigegeben (`LOGIN_UI=AUTHORIZED_BEHIND_FLAG`,
`AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY`); Code und Railway-Setzen folgen in
eigenen PRs. Recovery, persistente Session-Stores und MFA brauchen weitere
Freigaben.

## Sicherheit und Datenschutz

- Rohe Sitzungstokens und Klartextpasswörter werden nicht persistiert.
- Cookie-Attribute: `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`.
- Keine Secrets, personenbezogenen Produktivdaten oder Railway-Änderungen
  in diesem Package-Slice.
