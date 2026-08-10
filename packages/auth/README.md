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
- Login-/Registrierungsseiten in `apps/web` (noch nicht freigegeben)
- OAuth-, MFA-, Passkey- oder Recovery-Provider-SDKs in S52-B
- Direkte Datenbankimports in S52-B (`DATABASE_CONNECTION_AUTHORIZED=NO`)

Unzulässig bleiben außerdem zyklische Abhängigkeiten und direkte
Quellpfadimporte in andere Packages.

## Öffentliche Exports

Der kontrollierte Entry-Point ist `src/index.ts`.

- **S52-A:** Plattformrollen, Sitzungszustände, Policy-Prädikate
- **S52-B:** Passwort-Hashing (`scrypt`), opake Tokens, Cookie-Vertrag,
  Memory-Session-Store, Session-Runtime (create/resolve/rotate/revoke/logout)

## Status

```text
S52_A_VOCABULARY=INTEGRATED
S52_B_AUTH_RUNTIME_FOUNDATION=AUTHORIZED
AUTH_RUNTIME_AUTHORIZED=YES
AUTH_RUNTIME_SURFACE=PACKAGES_AUTH_ONLY
LOGIN_UI=NO
DATABASE_CONNECTION=NO
PRODUCTION_USERS=NO
```

## Spätere Slices

S52-C+ dürfen erst nach getrennter Freigabe Web-Integration, Recovery,
persistente Session-Stores über `packages/db` und MFA einführen.

## Sicherheit und Datenschutz

- Rohe Sitzungstokens und Klartextpasswörter werden nicht persistiert.
- Cookie-Attribute: `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`.
- Keine Secrets, personenbezogenen Produktivdaten oder Railway-Änderungen
  in diesem Package-Slice.
