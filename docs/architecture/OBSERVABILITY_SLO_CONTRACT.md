# Observability and Service-Level Contract

**Status:** In S50B-R3 menschlich beschlossen; Implementierungs- und externe Aktionsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Geltungsbereich:** Health, Readiness, strukturierte Logs, Metriken, Traces,
Service-Level-Ziele, Alarmierung, Incident-Evidenz und Datenschutzgrenzen

## 1. Zweck

Ein erfolgreiches Deployment ist noch kein belastbarer Betriebsnachweis.

Vor produktiven Konten, Datenbankfunktionen oder KI-Laufzeit benötigt NIM:

- messbare technische Gesundheit;
- klar getrennte Health- und Readiness-Signale;
- redigierte Betriebsdiagnostik;
- nachvollziehbare Service-Level-Indikatoren;
- handlungsfähige Alarmierung;
- dokumentierte Incident-Abläufe;
- sichere Trennung von Betriebslogs und Auditdaten.

Dieses Dokument erzeugt kein öffentliches SLA.

## 2. Beobachtungssignale

Die Zielarchitektur verwendet mindestens:

~~~text
metrics
structured_logs
correlation_traces
health
readiness
audit_events
security_events
~~~

Betriebslogs, Sicherheitsereignisse und unveränderliche Auditereignisse sind
unterschiedliche Datenarten.

Sie besitzen getrennte:

- Zwecke;
- Zugriffsrollen;
- Aufbewahrungsfristen;
- Exportregeln;
- Löschgrenzen;
- Schutzanforderungen.

## 3. Health- und Readiness-Endpunkte

Der Zielvertrag unterscheidet:

~~~text
/live
Prozess läuft

/ready
notwendige Abhängigkeiten und Migrationszustand sind betriebsbereit

/version
freigegebene Build-Version und Commit-SHA, keine Secrets

/metrics
nur intern und zugriffsgeschützt
~~~

### `/live`

`/live` prüft nur, ob der Anwendungsprozess Anfragen beantworten kann.

Der Endpunkt darf nicht von einer externen KI-API, Suchmaschine oder
nicht notwendigen Zusatzfunktion abhängen.

### `/ready`

`/ready` prüft später mindestens:

- notwendige Datenbankverbindung;
- erwarteten Migrationszustand;
- kritische interne Konfiguration;
- Fähigkeit, den freigegebenen Kernpfad zu bedienen.

Eine optionale, deaktivierte Funktion darf Readiness nicht unnötig blockieren.

### `/version`

Der Endpunkt darf enthalten:

- freigegebene Anwendungsversion;
- verkürzte oder vollständige Build-SHA;
- Build-Zeit;
- Environment-Bezeichnung in nicht sensibler Form.

Nicht erlaubt sind:

- Secrets;
- interne URLs;
- Datenbankverbindungsdaten;
- vollständige Umgebungsvariablen;
- Token;
- private Netzwerkdetails.

## 4. Correlation IDs

Jede serverseitige Anfrage erhält eine Correlation ID.

Die ID wird durchgereicht an:

- Application Services;
- Repository-Aufrufe;
- Auditereignisse;
- Sicherheitsereignisse;
- Outbox-Einträge;
- Hintergrundjobs;
- spätere KI- oder Search-Adapter.

Eine Correlation ID ist kein Berechtigungsnachweis und darf keine
personenbezogenen Daten kodieren.

## 5. Strukturierte Logs

Ein gewöhnlicher Logeintrag darf enthalten:

~~~text
timestamp
severity
service
environment
version
route_template
http_method
status_class
duration_ms
correlation_id
controlled_error_code
redacted_actor_id
redacted_scope_id
~~~

Nicht erlaubt in gewöhnlichen Logs sind:

- Passwörter;
- Session-Tokens;
- Recovery-Tokens;
- Provider-Secrets;
- vollständige Prompts;
- vollständige KI-Antworten;
- vollständige hochgeladene Dokumente;
- Datenbankverbindungsstrings;
- unnötige Namen, E-Mail-Adressen oder Adressen;
- vollständige Stacktraces in Nutzerantworten.

Interne Fehlerdetails dürfen nur in geschützten, redigierten Betriebsdaten
erscheinen.

## 6. Fehlervertrag

Fehler werden mit kontrollierten Fehlercodes beschrieben.

Beispiele:

~~~text
AUTH_REQUIRED
ACCESS_DENIED
RESOURCE_NOT_FOUND
VALIDATION_FAILED
CONFLICT
RATE_LIMITED
DEPENDENCY_UNAVAILABLE
MIGRATION_MISMATCH
FEATURE_DISABLED
INTERNAL_ERROR
~~~

Ein Fehler darf nicht verraten, ob eine fremde geschützte Ressource existiert.

Nutzerantworten enthalten:

- verständliche Beschreibung;
- sichere nächste Handlung;
- Correlation ID;
- keinen Stacktrace;
- keine internen Datenbank- oder Providerdetails.

## 7. Service-Level-Indikatoren

Mindestens zu messen sind:

- Verfügbarkeit des Kernpfads;
- P50-, P95- und P99-Latenz;
- Anteil nicht behandelter Serverfehler;
- erfolgreiche und fehlgeschlagene Publikationen;
- Readiness-Ausfälle;
- Datenbankverbindungsfehler;
- Job-Rückstand;
- Authentifizierungsfehler;
- Autorisierungsablehnungen;
- Backupfehler;
- Restore-Test-Ergebnisse;
- spätere AI- und Search-Fehler.

Durchschnittswerte allein reichen nicht aus.

## 8. Interne Ausgangsziele

Die folgenden Ziele sind Architektur-Ausgangswerte und keine öffentlichen
Leistungsversprechen:

| Indikator | Interner Ausgangswert |
|---|---:|
| monatliche Verfügbarkeit des nicht KI-abhängigen Kernpfads | mindestens 99,5 % |
| P95-Latenz gewöhnlicher serverseitiger Nicht-KI-Anfragen | unter 800 ms |
| nicht behandelte Serverfehler | unter 0,5 % |
| erfolgreiche Publikationsoperationen | mindestens 99,5 % |
| Readiness nach genehmigtem Deployment | innerhalb von 10 Minuten |
| kritische Alarmbestätigung in betreuter Zeit | innerhalb von 30 Minuten |
| ältester normaler Pending Job | unter 15 Minuten |
| kritische Dead-Letter-Jobs ohne Bearbeitung | 0 |

Vor Production müssen Messmethode, Zeitfenster und Ausschlüsse ausdrücklich
freigegeben werden.

## 9. Error Budget

Ein späterer produktiver Betrieb kann aus dem internen Verfügbarkeitsziel ein
Error Budget ableiten.

Wird das Budget überschritten, haben Vorrang:

- Stabilisierung;
- Fehlerbehebung;
- Restore- und Incident-Arbeit;
- Reduzierung riskanter Änderungen.

Neue Funktionen dürfen nicht automatisch wichtiger sein als die Stabilität des
bestehenden Kernpfads.

## 10. AI-Observability

Wenn KI später aktiviert wird, dürfen redigiert erfasst werden:

- Feature-Key;
- Provider-Konfigurationsversion;
- Modell-Konfigurationsversion;
- Prompt-Template-Version;
- Latenz;
- geschätzte Tokenmenge;
- geschätzte Kosten;
- Retrieval-Trefferzahl;
- Citation vorhanden oder nicht;
- Abstention;
- kontrollierte Fehlerklasse;
- Safety- oder Policy-Entscheidung.

Vollständige Prompts und Antworten sind keine Standardtelemetrie.

Eine dauerhafte Inhaltsanalyse benötigt getrennte Privacy- und Product-Freigabe.

## 11. Search-Observability

Für spätere serverseitige Suche können redigiert gemessen werden:

- Query-Latenz;
- Trefferzahl;
- Nulltrefferquote;
- Indexalter;
- Indexierungsfehler;
- Scope-Filterfehler;
- veraltete Revisionsverweise.

Suchbegriffe werden nicht automatisch dauerhaft gespeichert.

## 12. Alarmkategorien

Mindestens vorzusehen sind:

- Readiness-Ausfall;
- erhöhte 5xx-Rate;
- Datenbankverbindung erschöpft;
- Migrationsabweichung;
- ungewöhnlich viele Loginfehler;
- ungewöhnlich viele Autorisierungsablehnungen;
- Publikationsfehler;
- Job-Dead-Letter;
- Backupfehler;
- fehlgeschlagener Restore-Test;
- AI-Kostenlimit überschritten;
- AI-Providerfehler;
- fehlende Zitate oder ungewöhnliche Abstention-Rate;
- Suchindex veraltet.

Jeder Alarm benötigt:

~~~text
alert_key
severity
owner
threshold
evaluation_window
runbook
notification_route
acknowledgement_rule
closure_evidence
~~~

Ein Alarm ohne Handlungsmöglichkeit soll nicht dauerhaft aktiv bleiben.

## 13. Severity-Modell

Vorgesehene Schweregrade:

~~~text
SEV1
kritischer Ausfall oder erhebliches Sicherheitsereignis

SEV2
wesentliche Funktion stark beeinträchtigt

SEV3
begrenzte Beeinträchtigung mit Workaround

SEV4
nicht dringende Abweichung oder Wartungsbedarf
~~~

Die genaue Rufbereitschaft und Supportzeit wird später gesondert entschieden.

## 14. Incident-Dokumentation

Ein Incident-Datensatz enthält mindestens:

~~~text
incident_id
severity
detected_at
acknowledged_at
resolved_at
affected_functions
user_effect
correlation_references
containment
root_cause
corrective_actions
owner
review_status
~~~

Incident-Dokumente enthalten redigierte Evidenz.

Secrets oder unnötige Nutzervolltexte werden nicht kopiert.

## 15. Umgebungsgrenzen

Production, Staging und lokale Entwicklung verwenden getrennte:

- Datenbanken;
- Secrets;
- Service-IDs;
- Dashboards;
- Alert-Routen;
- Datensätze;
- Environment-Bezeichnungen;
- Backupziele;
- Zugriffsrollen.

Staging-Telemetrie enthält keine Production-Echtdaten.

## 16. Deployment-Evidenz

Vor einem genehmigten Deployment sind später mindestens zu dokumentieren:

- erwartete Commit-SHA;
- CI-Ergebnis;
- Migrationsplan;
- Rollbackpfad;
- Health- und Readiness-Ergebnis;
- laufende Version;
- Region;
- Replica-Status;
- relevante Feature Flags;
- verantwortliche Freigabe.

Ein grüner Build ersetzt keine Laufzeitprüfung.

## 17. Backup- und Restore-Evidenz

Zu beobachten und alarmieren sind:

- Backup wurde erzeugt;
- Backup ist lesbar;
- Verschlüsselung ist aktiv;
- Aufbewahrungsgrenze wird eingehalten;
- Restore-Test wurde ausgeführt;
- restaurierte Anwendung startet;
- Datenintegrität wurde geprüft;
- Lösch-Tombstones wurden berücksichtigt.

Ein Backup ohne Restore-Nachweis darf nicht als belastbare Wiederherstellung
beworben werden.

## 18. Provider-Neutralität

`packages/domain` kennt keine Monitoring- oder Logging-Anbieter.

Fachpakete erzeugen providerneutrale:

- Metrikereignisse;
- strukturierte Logdaten;
- kontrollierte Fehler;
- Correlation-Kontexte.

Konkrete Anbieter werden über Adapter angebunden.

S51A wählt keinen Monitoring-Anbieter aus.

## 19. Paketgrenzen

`packages/contracts` definiert:

- Health-Responses;
- Readiness-Responses;
- kontrollierte Fehler;
- Metrik- und Event-Schemas.

`packages/domain` definiert:

- Fehlerkategorien;
- fachliche Ereignisse;
- SLO-neutrale Domain-Signale.

`packages/db` liefert später:

- Verbindungs- und Migrationsstatus;
- Job- und Outbox-Metriken.

`packages/auth` liefert redigierte Sicherheitsereignisse.

`packages/ai-core` liefert redigierte AI-Betriebsmetriken.

`apps/web` komponiert Endpunkte und Adapter.

## 20. Pflicht-Negativtests

Mindestens zu prüfen:

- Datenbank fällt aus und `/ready` bleibt trotzdem grün;
- öffentlicher Health-Endpunkt zeigt Secrets;
- `/metrics` ist öffentlich erreichbar;
- Correlation ID geht in Hintergrundjob verloren;
- Session-Token erscheint im Log;
- vollständiger Prompt erscheint im Log;
- Nutzerantwort enthält Stacktrace;
- Build-SHA stimmt nicht mit laufender Version überein;
- Alarmroute ist nicht erreichbar;
- AI-Kostenlimit erzeugt keine Eindämmung;
- Restore-Testfehler bleibt ohne Alarm;
- Staging-Dashboard enthält Production-Daten.

## 21. Freigabestatus

~~~text
OBSERVABILITY_CONTRACT_APPROVED=NO
HEALTH_READINESS_CONTRACT_APPROVED=NO
INITIAL_SLO_TARGETS_APPROVED=NO
ERROR_BUDGET_POLICY_APPROVED=NO
ALERTING_MODEL_APPROVED=NO
INCIDENT_MODEL_APPROVED=NO
MONITORING_PROVIDER_SELECTED=NO
PUBLIC_SLA_CREATED=NO
CONTINUOUS_PRODUCTION_MONITORING_ACTIVE=NO
~~~

## 22. Aktueller Autorisierungsstand

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
