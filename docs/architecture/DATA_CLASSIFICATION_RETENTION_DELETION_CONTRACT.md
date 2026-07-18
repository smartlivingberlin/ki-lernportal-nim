# Data Classification, Retention and Deletion Contract

**Status:** In S50B-R3 menschlich beschlossen; Implementierungs- und externe Aktionsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Geltungsbereich:** Dateninventar, Datenminimierung, Aufbewahrung, Export,
Löschung, Anonymisierung, Auditnachweise und Backup-Auswirkungen

## 1. Zweck

Jede persistent gespeicherte Datenkategorie benötigt vor ihrer produktiven
Erhebung:

- einen dokumentierten Zweck;
- eine Klassifizierung;
- minimale notwendige Felder;
- zulässige Leser und Schreiber;
- eine Aufbewahrungsregel;
- einen Exportpfad;
- einen Lösch- oder Anonymisierungsweg;
- eine dokumentierte Backup-Auswirkung;
- eine verantwortliche Rolle;
- einen Freigabestatus.

Eine Tabelle ist nicht automatisch freigegeben, nur weil eine Migration dafür
existiert.

Dieses Dokument ist ein technischer Architekturvertrag und keine abschließende
rechtliche Einzelfallbewertung.

## 2. Klassifizierungsmodell

NIM verwendet folgende Klassen:

~~~text
PUBLIC
INTERNAL
CONFIDENTIAL
RESTRICTED
SECRET
~~~

| Klasse | Beispiele | Grundregel |
|---|---|---|
| PUBLIC | veröffentlichte Lektionen und Quellen | öffentlich lesbar |
| INTERNAL | interne Entwurfsmetadaten | nur berechtigtes Personal |
| CONFIDENTIAL | Kontoprofil und Lernfortschritt | Nutzer und autorisierte Rollen |
| RESTRICTED | Sicherheitsereignisse und Betriebsmetadaten | eng begrenzter Zugriff |
| SECRET | Credentials, rohe Tokens und Provider-Secrets | eigene Secret-Grenze |

Rohe Passwörter sowie rohe Sitzungs-, Recovery- oder API-Tokens sind keine
zulässigen persistenten Anwendungsdaten.

## 3. Pflichtfelder des Datenregisters

Für jede Kategorie werden mindestens dokumentiert:

~~~text
category_key
business_purpose
data_subject
classification
minimum_fields
system_of_record
allowed_readers
allowed_writers
legal_or_product_basis
retention_rule
deletion_or_anonymization_rule
export_rule
backup_effect
audit_effect
owner
approval_status
~~~

Ein fehlender Eintrag blockiert die produktive Datenerhebung.

## 4. Technische Ausgangswerte

Die folgenden Werte sind technische Ausgangsvorschläge für eine spätere
gemeinsame Freigabe durch Product, Privacy, Security und Operations.

| Datenkategorie | Technischer Ausgangswert |
|---|---|
| aktives Kernkonto | solange das Konto besteht |
| abgelaufenes Recovery-Token | Löschung innerhalb von 24 Stunden |
| abgelaufene normale Sitzung | Löschung innerhalb von 30 Tagen |
| minimale Widerrufsevidenz | höchstens 90 Tage |
| Login- und Sicherheitsereignisse | 180 Tage, sofern kein Incident Hold gilt |
| Lernfortschritt | Kontolaufzeit, danach Löschworkflow |
| Assessment-Evidenz | Kontolaufzeit oder definierter Nachweisbedarf |
| gewöhnlicher KI-Antwortinhalt | standardmäßig flüchtig |
| redigierte KI-Betriebsmetrik | 30 Tage |
| gewöhnliche Anwendungslogs | 30 Tage |
| Publikationsaudit | mindestens 365 Tage, finale Policy ausstehend |
| Staging-Datenbankbackup | rollierend höchstens 35 Tage |

Keiner dieser Werte aktiviert eine produktive Datenerhebung.

Vor Production müssen alle Zeiträume ausdrücklich bestätigt oder korrigiert
werden.

## 5. Datenminimierung

Verpflichtend sind:

- optionale Profilfelder fehlen standardmäßig;
- Geburtsdatum, Anschrift und Telefonnummer werden ohne fachliche Notwendigkeit
  nicht erhoben;
- Freitextfelder warnen vor sensiblen Eingaben;
- Test und Staging verwenden keine Production-Echtdaten;
- Logs enthalten IDs und redigierte Metadaten statt Volltexte;
- vollständige Prompts und Dokumente sind keine normalen Betriebslogs;
- Analytics und Tracking werden durch diesen Vertrag nicht aktiviert;
- Daten werden nicht vorsorglich „für später“ gesammelt.

## 6. Trennung der Datenarten

Mindestens getrennt behandelt werden:

- Identitätsdaten;
- Credential-Daten;
- Sitzungsdaten;
- Lernfortschritt;
- Assessment-Evidenz;
- Redaktions- und Publikationsdaten;
- Sicherheitsereignisse;
- Betriebslogs;
- Auditdaten;
- spätere KI-Interaktionen;
- Dokument- und Medieninhalte.

Eine Datenart darf nicht ohne dokumentierten Grund für einen anderen Zweck
wiederverwendet werden.

## 7. Export

Ein Nutzerexport wird aus den maßgeblichen Application Services erstellt.

Er muss:

- authentifiziert angefordert werden;
- Ownership prüfen;
- verständliche Nutzerdaten enthalten;
- fremde Daten ausschließen;
- interne Secrets ausschließen;
- unnötige Sicherheitsdetails redigieren;
- über einen zeitlich begrenzten Download bereitgestellt werden;
- sicher wiederholbar und idempotent sein;
- ein redigiertes Auditereignis erzeugen.

Ein Export darf keine rohen Credential-, Session- oder Recovery-Werte enthalten.

## 8. Löschworkflow

Kontolöschung ist ein kontrollierter Workflow und kein ungeprüftes
Datenbank-Cascade.

~~~text
Löschantrag
-> Identitätsbestätigung
-> Pending-Deletion
-> Widerruf aller Sitzungen
-> Löschung zulässiger personenbezogener Daten
-> Anonymisierung erforderlicher Referenzen
-> Abschlussnachweis
-> regulärer Ablauf der Backups
~~~

Der Vorgang muss idempotent sein.

Eine Wiederholung darf keine inkonsistenten Teilzustände erzeugen.

## 9. Referenz- und Auditintegrität

Löschung darf fachliche oder sicherheitsrelevante Evidenz nicht unkontrolliert
zerstören.

Mögliche Maßnahmen:

- Nutzerbezug anonymisieren;
- öffentliche Autorenanzeige entfernen;
- technische Referenz durch einen anonymen Systemakteur ersetzen;
- notwendige minimale Auditbeziehung erhalten;
- unnötige personenbezogene Metadaten löschen.

Veröffentlichte Inhalte dürfen nach Kontolöschung auf eine anonymisierte
Autor- oder Systemreferenz verweisen, sofern dies zur Integrität notwendig ist.

## 10. Backup-Verhalten

Backups werden nicht nachträglich in-place bearbeitet.

Gelöschte Daten können bis zum regulären Ende des verschlüsselten,
zeitlich begrenzten Backup-Zyklus enthalten sein.

Nach einer Wiederherstellung muss vor Freigabe des Systems:

- eine Lösch-Tombstone-Abstimmung erfolgen;
- die Löschwarteschlange erneut verarbeitet werden;
- die Datenintegrität geprüft werden;
- dokumentiert werden, dass bereits gelöschte Datensätze nicht wieder aktiv
  bereitgestellt werden.

Ein Backup-Claim ist ohne erfolgreich getestete Wiederherstellung unzulässig.

## 11. Incident Hold

Ein zeitlich begrenzter Incident Hold darf eine normale Löschung nur in einem
konkreten Sicherheits- oder Nachweisfall übersteuern.

Er benötigt:

- verantwortlichen Genehmiger;
- betroffene Datenkategorien;
- dokumentierten Grund;
- Startdatum;
- Überprüfungsdatum;
- beschränkte Zugriffsrollen;
- ausdrückliche Aufhebung.

Ein allgemeiner Schalter „alles unbegrenzt behalten“ ist verboten.

## 12. KI- und Promptdaten

Für spätere KI-Funktionen gilt standardmäßig:

- keine automatische dauerhafte Speicherung vollständiger Prompts;
- keine automatische dauerhafte Speicherung vollständiger Antworten;
- keine Nutzung für Modelltraining ohne getrennte Freigabe;
- keine automatische Übernahme in Analytics;
- nur notwendige redigierte Betriebsmetriken;
- gespeicherte Tutorverläufe nur nach bewusster Nutzerentscheidung;
- eigene Lösch- und Exportregeln für bewusst gespeicherte Verläufe.

## 13. Paketgrenzen

`packages/domain` definiert:

- Klassifizierungsbegriffe;
- Retention Policies;
- Löschzustände;
- Export- und Anonymisierungsregeln.

`packages/db` implementiert später:

- Repository-Filter;
- Löschtransaktionen;
- Purge-Jobs;
- Tombstone- und Restore-Abstimmung.

`packages/auth` besitzt Credential- und Sessionlöschung.

`packages/admin` stellt ausschließlich genehmigte operative Abläufe bereit.

`packages/ai-core` erzwingt KI-spezifische Speichergrenzen.

`apps/web` implementiert keine unabhängige Aufbewahrungslogik.

## 14. Pflicht-Negativtests

Zu prüfen sind mindestens:

- Export enthält Datensätze eines anderen Nutzers;
- Löschung lässt aktive Sitzungen bestehen;
- Löschung ist bei Wiederholung nicht idempotent;
- Anonymisierung zerstört notwendige Auditintegrität;
- Restore aktiviert bereits gelöschte Datensätze;
- abgelaufene Tokens werden nicht entfernt;
- Sessiondaten bleiben unbegrenzt erhalten;
- Secret- oder Dokumentvolltext erscheint in Logs;
- Staging enthält Production-Daten;
- KI-Volltexte werden ohne Zustimmung gespeichert;
- Incident Hold besitzt kein Ablauf- oder Reviewdatum.

## 15. Freigabestatus

~~~text
DATA_CLASSIFICATION_CONTRACT_APPROVED=NO
DATA_REGISTER_APPROVED=NO
RETENTION_DEFAULTS_APPROVED=NO
DELETION_WORKFLOW_APPROVED=NO
EXPORT_WORKFLOW_APPROVED=NO
BACKUP_EXPIRY_POLICY_APPROVED=NO
AI_CONTENT_RETENTION_APPROVED=NO
PRODUCTION_PERSONAL_DATA_AUTHORIZED=NO
~~~

## 16. Aktueller Autorisierungsstand

Dieses Dokument beschreibt einen Architekturvertrag zur getrennten menschlichen
Abnahme. Es erteilt keine Implementierungs- oder externe Aktionsfreigabe.

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
