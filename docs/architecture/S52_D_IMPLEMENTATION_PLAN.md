# S52-D – Auth-Web Implementierungsplan

**Status:** D1 Route-Verträge implementiert. Login-UI, Flag-Flip, DB und
Railway bleiben eigene Freigaben.  
**Parent:** `docs/architecture/S52_D_IMPLEMENTATION_SCOPE.md`  
**Arbeitsbranch:** `cursor/s52-d1-auth-routes-b554`

## 1. Zweck

Dieses Dokument plant die **spätere** S52-D-Implementierung in kleinen,
freigabepflichtigen Schnitten. Der Scope-Lock bleibt gültig:

```text
S52_D_IMPLEMENTATION_AUTHORIZED=YES
LOGIN_UI=NO
FEATURE_FLAG_AUTH_RUNTIME_DEFAULT=false
AUTH_RUNTIME_FLAG_FLIP=NO
DATABASE_CONNECTION_AUTHORIZED=NO
RAILWAY_CHANGE=NO
```

## 2. Empfohlene Schnittfolge (nach Freigabe)

### Slice D1 – Route-Verträge (Feature-Flag bleibt false)

- Route Handler-Skizze: `POST /api/auth/login`, `POST /api/auth/logout`
- Nur hinter `resolveFeatureFlags().auth_runtime === true`
- Bei Default `false`: `403`/`404` mit redacted Fehler (OPS-A)
- Unit-Tests ohne Netzwerk; Negative: Flag aus → kein Cookie

### Slice D2 – Minimale Login-UI (Staging/Concept)

- Eine schlichte deutsche Seite `/anmelden` (kein Marketing-Overload)
- Felder: E-Mail, Passwort; Buttons: Anmelden, Abbrechen
- Kein Registrieren in D2 (eigene Freigabe)
- Cookie nur über Server-Set laut S52-B Vertrag
- `auth_runtime` Default bleibt `false` bis expliziter Flip-Freigabe

### Slice D3 – Negative Security-Tests

- CSRF-/SameSite-Annahmen dokumentieren und testen
- Session-Fixation: Login rotiert Session
- IDOR-Stubs: fremde `sessionId` → deny
- Keine Klartextpasswörter/Tokens in Logs

### Slice D4 – optional später

- Registrierung + DSGVO-Texte
- DB-Session-Store (eigene DB-Freigabe)
- Recovery / MFA / OAuth (eigene ADRs)

## 3. Nicht in der ersten Implementierung

```text
PRODUCTION_USERS=NO
OAUTH=NO
MFA=NO
PASSKEYS=NO
FIRST_USER_AUTO_ADMIN=FORBIDDEN
LOCALSTORAGE_SESSION_TOKEN=FORBIDDEN
```

## 4. Abnahme vor Ready einer Implementierungs-PR

- Scope-Lock S52-D unverändert respektiert, bis Freigabe-Marker gewechselt
- `pnpm test:s52-c-auth-web-scope` und `pnpm test:s52-d-auth-web-impl-scope` grün
- Neue positiven/negativen Tests für den jeweiligen D-Slice
- Keine Secrets, keine Railway-Änderung ohne Einzelentscheidung

## 5. Freigabe-Gate für echten Code

Menschliche Freigabe muss explizit setzen:

```text
S52_D_IMPLEMENTATION_AUTHORIZED=YES
LOGIN_UI=AUTHORIZED_BEHIND_FLAG   # oder gleichwertig dokumentiert
AUTH_RUNTIME_FLAG_FLIP=NO|YES     # separat entscheiden
```

Ohne diese Marker bleibt Implementierung **verboten**.

## 6. Abnahme dieses Plan-Slices / D1

```text
S52_D_IMPLEMENTATION_PLAN_DOCUMENTED=YES
S52_D_IMPLEMENTATION_AUTHORIZED=YES
S52_D1_CODE_CHANGED=YES
LOGIN_UI=NO
AUTH_RUNTIME_FLAG_FLIP=NO
```

D1 Route Handler sind implementiert. D2 Login-UI und Flag-Flip bleiben
eigene Freigaben.
