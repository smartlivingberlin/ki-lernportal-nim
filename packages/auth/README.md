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
- Login-/Registrierungsseiten: D2 `/anmelden` hinter Flag freigegeben und
  implementiert; Registrierung bleibt `NO`
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
- **S52-D2:** `/anmelden` Login-UI in `apps/web` hinter Flag

## Status

```text
S52_A_VOCABULARY=INTEGRATED
S52_B_AUTH_RUNTIME_FOUNDATION=AUTHORIZED
S52_C_AUTH_WEB_SCOPE_LOCK=AUTHORIZED
S52_D_AUTH_WEB_IMPL=AUTHORIZED
S52_D1_AUTH_HTTP_ROUTES=AUTHORIZED
S52_D2_LOGIN_UI_AUTHORIZED=YES
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
AUTH_WEB_SURFACE=D2_LOGIN_UI_BEHIND_FLAG
LOGIN_UI=AUTHORIZED_BEHIND_FLAG
LOGIN_UI_IMPLEMENTED=YES
AUTH_RUNTIME_FLAG_FLIP=STAGING_ONLY
DATABASE_CONNECTION=NO
PRODUCTION_USERS=NO
```

## Spätere Slices

S52-D2 liefert `/anmelden` hinter Flag. Staging darf `AUTH_RUNTIME=true`
manuell setzen (`S52_D2B_STAGING_AUTH_RUNTIME.md`). Recovery, DB-Sessions und
MFA brauchen weitere Freigaben.

## Sicherheit und Datenschutz

- Rohe Sitzungstokens und Klartextpasswörter werden nicht persistiert.
- Cookie-Attribute: `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`.
- Keine Secrets, personenbezogenen Produktivdaten oder Railway-Änderungen
  in diesem Package-Slice.
