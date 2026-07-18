# ADR-0003 – Identity and Session Lifecycle

**Status:** In S50B-R3 menschlich beschlossen; Implementierungs- und externe Aktionsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Geltungsbereich:** Identitäten, Anmeldung, Sitzungen, Wiederherstellung,
privilegierte Zugänge und Sicherheitsereignisse

## 1. Kontext

Die Konzeptdemo besitzt noch keine produktiven Benutzerkonten.

Der spätere Slice S52 soll Konten, widerrufbare Sitzungen, Rollen, Scopes und
Ownership einführen. Deshalb müssen Identitäts- und Sitzungsgrenzen vor jeder
Implementierung eindeutig festgelegt werden.

Nicht ausreichend als Berechtigungsnachweis sind:

- eine im Browser angezeigte Rolle;
- ein ausgeblendeter Menüpunkt;
- eine Objekt-ID;
- eine URL;
- eine vom Client behauptete Organisation;
- ein langlebiges und nicht widerrufbares Token.

## 2. Architekturentscheidung

NIM verwendet serverseitig maßgebliche Identitäten sowie opake, widerrufbare
Sitzungen.

Die erste produktive Anmeldevariante ist E-Mail-Adresse plus Passwort.

Passkeys und externe Identity Provider dürfen später als Adapter ergänzt werden.
Sie ersetzen niemals die internen Rollen-, Scope-, Ownership- und
Sitzungsentscheidungen.

~~~text
zufälliges Sitzungstoken im sicheren Cookie
-> ausschließlich Token-Hash in der Datenbank
-> serverseitiger Sitzungsdatensatz
-> aktueller Nutzer-, Rollen-, Scope- und Sicherheitsstatus
-> serverseitige Autorisierungsentscheidung
~~~

Das rohe Sitzungstoken wird weder in der Datenbank noch in normalen Logs
gespeichert.

## 3. Cookie- und Transportvertrag

Produktive Sitzungscookies müssen:

- `HttpOnly` sein;
- ausschließlich über HTTPS übertragen werden;
- `Secure` gesetzt haben;
- auf notwendige Domain und Pfade begrenzt sein;
- einen bewusst geprüften `SameSite`-Wert besitzen;
- gegen Session Fixation, Replay und CSRF geschützt sein;
- nur nach einer dokumentierten Rotationsrichtlinie erneuert werden.

Nutzerantworten dürfen niemals enthalten:

- Passwort-Hashes;
- Sitzungs- oder Recovery-Tokens;
- Provider-Secrets;
- Datenbankverbindungsinformationen;
- interne Stacktraces;
- vollständige Rollen- oder Policy-Datensätze.

## 4. Sitzungszustände

Der Lebenszyklus unterscheidet mindestens:

~~~text
created
active
rotated
expired
revoked
compromised
terminated
~~~

Pflichtregeln:

1. Eine erfolgreiche Anmeldung erzeugt eine neue Sitzung.
2. Ein vorläufiger oder anonymer Bezeichner wird nicht weiterverwendet.
3. Eine Privilegienerhöhung rotiert die Sitzung.
4. Eine Passwortänderung widerruft bestehende Sitzungen.
5. Eine erfolgreiche Kontowiederherstellung widerruft bestehende Sitzungen.
6. Eine Rollen- oder Scope-Reduzierung widerruft betroffene Sitzungen.
7. Logout widerruft die Sitzung serverseitig.
8. „Alle Geräte abmelden“ widerruft alle Sitzungen des Kontos.
9. Ablaufzeiten werden serverseitig geprüft.
10. Widerrufene oder abgelaufene Sitzungen dürfen nicht erneuert werden.

Leerlaufzeit und absolute Lebensdauer werden getrennt geprüft.

Als später zu bestätigende technische Ausgangswerte gelten:

- normale Lernersitzung: höchstens sieben Tage Leerlauf;
- normale Lernersitzung: höchstens dreißig Tage absolute Lebensdauer;
- privilegierte Sitzung: deutlich kürzere Werte;
- besonders sensible Aktion: aktuelle erneute Authentifizierung.

Diese Werte sind noch keine produktive Freigabe.

## 5. Admin- und Owner-Zugänge

Vor der Aktivierung von Admin oder Owner sind verpflichtend:

- Mehrfaktor-Authentifizierung;
- getrennte persönliche Konten;
- keine gemeinsam genutzten Adminzugänge;
- keine fest eingebauten Owner-Zugangsdaten;
- verkürzte Sitzungsdauer;
- Step-up-Authentifizierung für sensible Aktionen;
- stärkere Kontowiederherstellung;
- Auditierung von Rollen- und Konfigurationsänderungen.

Der erste registrierte Nutzer wird niemals automatisch Admin oder Owner.

Owner ist kein Konto für normale tägliche Verwaltungsarbeit.

## 6. Passwörter und Credentials

Passwörter werden mit einem aktuellen Passwort-Hashingverfahren, individuellen
Salts und dokumentierten Parametern verarbeitet.

Ausgeschlossen sind:

- Klartextpasswörter;
- reversible Passwortverschlüsselung;
- Credentials im Repository;
- Credentials in Logs;
- Passwörter in Auditereignissen;
- gemeinsam genutzte globale Adminpasswörter.

Credential-Daten werden von öffentlichen Profildaten getrennt gespeichert.

Nur `packages/auth` darf Credential-Verifikation, Credential-Wechsel,
Sitzungserzeugung und Kontowiederherstellung implementieren.

## 7. Kontowiederherstellung

Ein Wiederherstellungstoken muss:

- kryptografisch zufällig sein;
- nur gehasht gespeichert werden;
- einmalig verwendbar sein;
- eine kurze Ablaufzeit besitzen;
- nach Nutzung verbraucht sein;
- rate-limitiert sein;
- bestehende Sitzungen nach erfolgreicher Nutzung widerrufen;
- ein redigiertes Sicherheitsereignis erzeugen.

Die öffentliche Antwort darf nicht verraten, ob eine E-Mail-Adresse zu einem
Konto gehört.

Ein bereits verwendetes, abgelaufenes oder widerrufenes Token bleibt ungültig.

## 8. Passkeys und externe Identity Provider

Passkeys sind ein zulässiger späterer Adapter, aber kein Bestandteil von S51A.

Ein späterer Passkey-Slice benötigt eigene Entscheidungen zu:

- Geräteverlust;
- Credential-Inventar;
- Widerruf;
- Wiederherstellung;
- privilegierten Konten;
- synchronisierten Passkeys;
- Step-up-Authentifizierung.

Externe Identity Provider sind ebenfalls nur Adapter.

Eine externe Anmeldung erteilt keine interne Admin-, Owner- oder
Organisationsrolle.

## 9. Sicherheitsereignisse

Mindestens folgende Vorgänge erzeugen ein redigiertes Sicherheitsereignis:

- erfolgreiche und fehlgeschlagene Anmeldung;
- Rate-Limit-Aktivierung;
- Sitzungserzeugung;
- Sitzungsrotation;
- Sitzungswiderruf;
- Passwortänderung;
- Identity-Änderung;
- Recovery-Anforderung;
- erfolgreiche Wiederherstellung;
- MFA-Aktivierung und Entfernung;
- Rollen- und Scope-Änderung;
- privilegierte Step-up-Aktion;
- Break-glass-Aktion.

Nicht gespeichert werden:

- Passwörter;
- rohe Tokens;
- vollständige Prompts;
- vollständige Dokumente;
- Provider-Secrets;
- unnötige personenbezogene Inhalte.

## 10. Paketgrenzen

`packages/auth` besitzt später:

- Authentifizierungsinterfaces;
- Credential-Operationen;
- Sitzungslebenszyklus;
- Recovery-Operationen;
- Identity-Adapter;
- serverseitige Auth-Kontexte.

`packages/domain` darf neutrale Policy- und Rollenbegriffe definieren, importiert
aber weder Next.js noch Auth-SDKs, Datenbankclients oder Provider-SDKs.

`apps/web` komponiert Auth ausschließlich in serverseitigen Grenzen.

Browsercode trifft keine endgültige Berechtigungsentscheidung.

## 11. Pflicht-Negativtests vor S52-Abnahme

Zu prüfen sind mindestens:

- Session Fixation;
- Replay eines rotierten Tokens;
- Nutzung einer abgelaufenen Sitzung;
- Nutzung einer widerrufenen Sitzung;
- Rollenreduzierung bei aktiver Sitzung;
- Recovery-Token wird zweimal verwendet;
- Account Enumeration;
- manipulierte Clientrolle;
- gültige Sitzung im falschen Scope;
- Adminzugriff ohne erforderliche MFA;
- Owner-Aktion ohne aktuelle Step-up-Authentifizierung;
- CSRF gegen schreibende Operationen;
- Logout lässt die Sitzung serverseitig aktiv;
- Passwortwechsel lässt eine alte Sitzung aktiv.

## 12. Konsequenzen

Die Entscheidung benötigt einen persistenten Sitzungsspeicher und expliziten
Widerruf.

Der zusätzliche Aufwand ist gewollt. Ein ausschließlich selbstenthaltenes,
langlebiges und nicht widerrufbares Token würde die vorgesehenen Rollen-,
Recovery- und Sicherheitsregeln nicht zuverlässig erfüllen.

## 13. Architekturstatus

~~~text
ADR_IDENTITY_SESSION_LIFECYCLE_APPROVED=YES
IDENTITY_METHOD_BASELINE=EMAIL_PASSWORD
OPAQUE_REVOCABLE_SESSIONS=REQUIRED
ADMIN_OWNER_MFA=REQUIRED_BEFORE_ACTIVATION
FIRST_USER_ADMIN=PROHIBITED
PASSKEY_SUPPORT=DEFERRED_ADAPTER
EXTERNAL_IDENTITY_PROVIDER=OPTIONAL_ADAPTER
~~~

## 14. Aktueller Autorisierungsstand

Dieser Architekturvertrag wurde am 17. Juli 2026 menschlich abgenommen.
Er erteilt keine Implementierungs- oder externe Aktionsfreigabe.

~~~text
DOCUMENT_STATUS=ARCHITECTURE_APPROVED_IMPLEMENTATION_NOT_AUTHORIZED
PRODUCT_CODE_CHANGE_AUTHORIZED=NO
DATABASE_CHANGE_AUTHORIZED=NO
RAILWAY_CHANGE_AUTHORIZED=NO
COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
~~~
