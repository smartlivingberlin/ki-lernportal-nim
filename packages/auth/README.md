# `@ki-lernportal-nim/auth`

## Zweck

Grenze für Auth-, Session-, Rollen-, Scope- und Ownership-Logik.

## Erlaubte Imports

- `@ki-lernportal-nim/contracts`
- `@ki-lernportal-nim/domain`
- `@ki-lernportal-nim/db`

Die aufgeführten Grenzen beschreiben die maximal erlaubte Richtung.
S52-A deklariert bewusst keine Package-Dependencies.

## Verbotene Imports

- UI und React
- Login-, Registrierungs- oder Cookie-Runtime in S52-A
- OAuth-, MFA-, Passkey- oder Recovery-Provider-SDKs in S52-A

Unzulässig bleiben außerdem zyklische Abhängigkeiten und direkte
Quellpfadimporte in andere Packages.

## Öffentliche Exports

Der kontrollierte Entry-Point ist `src/index.ts`.

S52-A exportiert ausschließlich Plattformrollen-, Sitzungszustands- und
Policy-Vokabular sowie reine Prädikate.

## Status

S52-A enthält infrastrukturfreies Auth-Policy-Vokabular.

Keine Runtime-Implementierung von Cookies, Passwort-Hashing, Datenbankzugriff,
Login-UI, Route Handlern, Railway oder Deploymentlogik ist Bestandteil von
S52-A.

```text
S52_A_VOCABULARY=INTEGRATED
AUTH_RUNTIME_AUTHORIZED=NO
```

## Spätere Slices

S52-B und spätere Auth-Slices dürfen erst nach getrennter Freigabe Cookie-
Runtime, Credential-Prüfung, Session-Persistenz und Web-Integration einführen.

## Sicherheit und Datenschutz

S52-A enthält keine Secrets, Credentials, personenbezogenen Daten,
externen Requests, produktiven Providerzugriffe oder Persistenz.

Jede spätere Erweiterung benötigt eine eigene fachliche,
sicherheitsbezogene und datenschutzbezogene Prüfung.
