# Jobs and Transactional Outbox Contract

**Status:** In S50B-R3 menschlich beschlossen; Implementierungs- und externe Aktionsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Geltungsbereich:** Hintergrundaufgaben, zuverlässige Ereigniszustellung,
Idempotenz, Wiederholungen, Leasing, Dead Letter, Planung und Abbruch

## 1. Zweck

Publikationen, Exporte, Löschungen, Benachrichtigungen und spätere
Indexierungsprozesse dürfen nicht von fragilen Nebenwirkungen innerhalb einer
gewöhnlichen HTTP-Anfrage abhängen.

NIM bleibt zunächst ein modularer Monolith.

Für die erste Plattformphase reicht ein datenbankgestütztes Job- und
Transactional-Outbox-Modell.

Nicht erforderlich für S51A sind:

- eigener Microservice;
- externe Message Queue;
- Kubernetes Worker;
- verteiltes Event Streaming;
- produktiver Hintergrundprozess.

## 2. Geeignete Jobkategorien

Später freigegebene Slices dürfen Jobs erzeugen für:

- geplante Veröffentlichung;
- Nutzerexport;
- Kontolöschung;
- E-Mail-Benachrichtigung;
- Quellen-Wiedervorlage;
- Medienverarbeitung;
- Suchindex-Aktualisierung;
- KI-Dokumentprüfung;
- KI-Dokumentindexierung;
- Backup- oder Restore-Koordination;
- Bereinigung abgelaufener Sessions und Tokens.

Nicht jede Operation gehört in einen Hintergrundjob.

Sicherheitskritische Autorisierungsentscheidungen bleiben synchron und
serverseitig.

## 3. Transactional Outbox

Wenn eine fachliche Datenbankänderung eine spätere Nebenwirkung benötigt,
werden Fachänderung und Outbox-Eintrag in derselben Transaktion geschrieben.

~~~text
fachliche Zustandsänderung
+ Outbox-Eintrag
= eine Datenbanktransaktion
~~~

Beispiel:

~~~text
Publikationsreferenz erzeugen
+ öffentlichen Pointer aktualisieren
+ Outbox-Ereignis speichern
= atomare Transaktion
~~~

Ein Worker verarbeitet den Outbox-Eintrag nach erfolgreichem Commit.

## 4. Warum keine direkte Nebenwirkung

Nicht zulässig als alleinige Zuverlässigkeitsstrategie:

~~~text
Datenbankänderung committen
-> externe API aufrufen
-> hoffen, dass kein Prozessabbruch erfolgt
~~~

Mögliche Fehler:

- Prozess beendet sich nach Commit;
- Provider antwortet zu spät;
- Netzwerk fällt aus;
- Anfrage wird wiederholt;
- Nutzer klickt mehrfach;
- Deployment unterbricht die Verarbeitung;
- externe Wirkung tritt ein, Statusmarkierung jedoch nicht.

Die Outbox reduziert diese Inkonsistenz.

Sie garantiert nicht automatisch exakt einmalige externe Wirkung.

Deshalb ist zusätzliche Idempotenz erforderlich.

## 5. Jobdatensatz

Ein Job- oder Outbox-Datensatz benötigt mindestens:

~~~text
job_id
job_type
payload_version
payload_redacted
scope_type
scope_id
status
available_at
attempt_count
max_attempts
lease_owner
lease_expires_at
idempotency_key
created_at
updated_at
last_error_code
correlation_id
~~~

Optional können gelten:

- priority;
- deadline;
- cancellation_requested_at;
- completed_at;
- dead_lettered_at;
- parent_job_id;
- source_event_id;
- provider_key;
- cost_budget_key.

## 6. Payload-Regeln

Ein Payload enthält bevorzugt:

- fachliche IDs;
- Revisions-IDs;
- Scope;
- minimale Steuerdaten;
- Payload-Version;
- kontrollierte Optionen.

Nicht zulässig im normalen Payload sind:

- Passwörter;
- rohe Session-Tokens;
- Recovery-Tokens;
- Provider-Secrets;
- vollständige Dokumente;
- vollständige Prompts;
- unnötige personenbezogene Volltexte;
- Datenbankverbindungsinformationen.

Große fachliche Inhalte werden über autorisierte Repository-Aufrufe geladen.

## 7. Jobzustände

Der Zielzustand unterscheidet:

~~~text
pending
leased
running
succeeded
retry_wait
cancelled
dead_letter
~~~

Bedeutung:

- `pending`: bereit oder noch nicht zeitlich fällig;
- `leased`: exklusiv von einem Worker reserviert;
- `running`: Verarbeitung wurde begonnen;
- `succeeded`: Wirkung erfolgreich abgeschlossen;
- `retry_wait`: temporärer Fehler, später erneut versuchen;
- `cancelled`: vor zulässiger Ausführung abgebrochen;
- `dead_letter`: manuelle oder gesonderte Behandlung erforderlich.

## 8. Leasing

Ein Worker beansprucht einen Job durch ein datenbanksicheres Lease.

Das Lease besitzt:

~~~text
lease_owner
lease_started_at
lease_expires_at
~~~

Pflichtregeln:

- zwei Worker dürfen denselben Job nicht gleichzeitig regulär ausführen;
- ein abgestürzter Worker darf den Job nicht dauerhaft blockieren;
- ein abgelaufenes Lease kann kontrolliert übernommen werden;
- Lease-Verlängerung ist begrenzt;
- Worker-ID ist keine Nutzeridentität;
- Lease-Zustand wird atomar geändert.

## 9. Idempotenz

Jede wiederholbare schreibende Wirkung benötigt einen Idempotency Key.

Beispiele:

| Vorgang | Möglicher Schlüssel |
|---|---|
| Publikation | Publication Operation ID |
| Nutzerexport | Export Request ID |
| Kontolöschung | Deletion Request ID |
| E-Mail | Empfänger, Zweck und Nachrichtenversion |
| Search-Indexierung | Revision ID und Indexversion |
| RAG-Indexierung | Dokumentrevision und Collection-Version |
| Quellen-Erinnerung | Quelle, Review-Fälligkeit und Empfänger |

Ein bereits erfolgreich verarbeiteter Schlüssel erzeugt keine doppelte Wirkung.

## 10. Genau-einmal-Illusion vermeiden

Die Architektur verspricht nicht pauschal „exactly once“.

Realistisch ist:

~~~text
at-least-once delivery
+ idempotenter Handler
+ gespeicherte Wirkungsevidenz
= kontrollierte Wiederholung
~~~

Externe Provider müssen nach Möglichkeit ebenfalls einen Idempotency Key
erhalten.

Wenn ein Provider keine Idempotenz unterstützt, benötigt der Handler eine
gesonderte Kompensations- oder Deduplizierungsstrategie.

## 11. Wiederholungsstrategie

Temporäre Fehler verwenden begrenztes exponentielles Backoff mit Jitter.

Beispiele temporärer Fehler:

- Netzwerkfehler;
- Provider-Timeout;
- HTTP 429;
- kurzfristige Datenbankstörung;
- vorübergehend nicht verfügbare Abhängigkeit.

Permanente Fehler werden nicht endlos wiederholt.

Beispiele permanenter Fehler:

- ungültige Payload-Version;
- fehlende Berechtigung;
- gelöschter Scope;
- widerrufene Medienrechte;
- archivierte Ressource;
- Feature dauerhaft deaktiviert;
- nicht unterstützter Dateityp.

## 12. Versuchszahl und Dead Letter

Jeder Job besitzt eine begrenzte maximale Versuchszahl.

Nach Überschreitung:

~~~text
status=dead_letter
last_error_code=<kontrollierter Code>
dead_lettered_at=<Zeitpunkt>
~~~

Ein Dead-Letter-Replay benötigt:

- berechtigten Operator;
- dokumentierten Grund;
- korrigierte Ursache;
- neue Correlation ID;
- Auditereignis;
- erneute Idempotenzprüfung.

Ein Replay überschreibt die ursprüngliche Evidenz nicht.

## 13. Planung

Geplante Jobs besitzen `available_at`.

Eine geplante Publikation darf erst nach diesem Zeitpunkt geleast werden.

Pflichtregeln:

- Zeitzone ist eindeutig;
- Nutzeroberfläche zeigt absolute Zeit und Zeitzone;
- doppelte Planung ist idempotent;
- Änderung erzeugt nachvollziehbare Evidenz;
- bereits freigegebene Revision bleibt referenziert;
- Planungszeit allein erteilt keine Publikationsfreigabe.

## 14. Abbruch

Ein noch nicht gestarteter geplanter Job kann abgebrochen werden.

Abbruch ist idempotent.

Nicht zulässig:

- erfolgreicher Job wird durch Statusänderung scheinbar rückgängig gemacht;
- bereits versendete E-Mail wird als ungesendet dargestellt;
- bereits veröffentlichte Revision wird durch Job-Cancel zurückgenommen.

Für bereits eingetretene fachliche Wirkungen ist ein gesonderter
Kompensations- oder Rollbackvorgang erforderlich.

## 15. Scope-Prüfung zur Ausführungszeit

Ein früher gültiger Job darf nicht blind später ausgeführt werden.

Vor einer sicherheitsrelevanten Wirkung prüft der Handler erneut:

- Scope existiert;
- Rolle oder Systemberechtigung ist weiterhin gültig;
- Ressource ist nicht gelöscht;
- Ressource ist nicht unzulässig archiviert;
- Feature Flag ist aktiv;
- Revision ist weiterhin freigegeben;
- Rechtefreigabe besteht;
- Deadline ist nicht überschritten.

## 16. Publikationsjob

Ein Publikationsjob referenziert:

- Publication Operation ID;
- freigegebene Revision;
- Scope;
- erwarteten aktuellen Pointer;
- Idempotency Key;
- Correlation ID.

Der Job darf keine nicht freigegebene Revision veröffentlichen.

Bei Konflikt mit einem inzwischen geänderten Pointer stoppt er kontrolliert.

## 17. Exportjob

Ein Exportjob:

- prüft Nutzer-Ownership;
- lädt nur exportierbare Daten;
- erstellt ein zeitlich begrenztes Artefakt;
- protokolliert keinen Datenvolltext;
- besitzt einen Löschzeitpunkt;
- benachrichtigt den Nutzer erst nach erfolgreicher Fertigstellung;
- kann sicher erneut ausgeführt werden.

## 18. Löschjob

Ein Löschjob:

- widerruft Sitzungen;
- verarbeitet zulässige Datenkategorien;
- anonymisiert notwendige Referenzen;
- erzeugt Abschlussnachweis;
- berücksichtigt Backups und Tombstones;
- ist idempotent;
- lässt keine teilweise als vollständig dargestellte Löschung zu.

## 19. Search- und AI-Indexjobs

Indexjobs referenzieren ausschließlich freigegebene Revisionen.

Sie müssen:

- Indexversion speichern;
- Scope berücksichtigen;
- alte öffentliche Pointer kontrolliert ersetzen;
- Poisoning- und Rechteprüfungen beachten;
- Kosten- und Concurrency-Limits einhalten;
- bei Deaktivierung des Features abbrechen.

## 20. Concurrency Limits

Begrenzungen können gelten nach:

- Jobtyp;
- Scope;
- Provider;
- Kostenbudget;
- Dateityp;
- Risikoklasse;
- Environment.

Ein KI-Indexjob darf nicht alle Worker blockieren, die für Löschung oder
Publikation benötigt werden.

## 21. Prioritäten

Eine mögliche Prioritätsreihenfolge ist:

~~~text
security_and_deletion
publication
user_export
notification
search_index
ai_index
maintenance
~~~

Die endgültige Prioritätsstrategie wird erst im jeweiligen
Implementierungsslice beschlossen.

## 22. Observability

Zu messen sind mindestens:

- Anzahl `pending`;
- Alter des ältesten Pending Jobs;
- Laufzeit;
- Erfolgsrate;
- Fehlerrate;
- Retry-Anzahl;
- Dead-Letter-Anzahl;
- Lease-Übernahmen;
- Abbruchanzahl;
- Providerfehler;
- Kostenlimit-Verstöße.

Jeder Job verwendet eine Correlation ID.

## 23. Datenschutz

Jobinspektion darf keine unnötigen Nutzervolltexte zeigen.

Admin- und Owner-Zugriff auf Jobs ist nach Rolle, Scope und Zweck begrenzt.

Payloads und Fehler werden gemäß Datenklassifizierungsvertrag behandelt.

## 24. Paketgrenzen

`packages/domain` definiert:

- Domain Events;
- Job Intents;
- Zustände;
- Idempotenzbegriffe;
- kontrollierte Fehler.

`packages/contracts` definiert:

- versionierte Payload-Schemas;
- Handler-Responses;
- Job-Status-Schemas.

`packages/db` implementiert später:

- Outbox-Repository;
- Leasing;
- atomare Claims;
- Retry- und Dead-Letter-Persistenz.

Feature-Pakete registrieren Handler über Interfaces.

`apps/web` darf Jobs über Application Services anfordern, führt aber keine
zuverlässige Hintergrundarbeit innerhalb einer gewöhnlichen Anfrage aus.

## 25. S51A-Grenze

S51A darf lediglich Interfaces, Paketgrenzen und statische Importregeln
vorbereiten.

S51A implementiert nicht:

- Jobtabelle;
- Outboxtabelle;
- Worker;
- Scheduler;
- Queue;
- Lease;
- Retry;
- Dead Letter;
- produktiven Handler.

## 26. Pflicht-Negativtests

Mindestens zu prüfen:

- Fachtransaktion scheitert vor Outbox-Insert;
- Fachtransaktion committet, Worker ist aber offline;
- Worker stürzt nach externer Wirkung ab;
- gleicher Idempotency Key wird zweimal verarbeitet;
- zwei Worker beanspruchen denselben Job;
- Lease läuft ab;
- permanenter Fehler wird endlos wiederholt;
- Dead-Letter-Replay ohne Berechtigung;
- stornierte Publikation wird trotzdem ausgeführt;
- entfernter Scope führt alten Job aus;
- Payload enthält Token oder Dokumentvolltext;
- Feature Flag wird vor Ausführung deaktiviert;
- bereits archivierte Revision wird indexiert;
- Provider-Timeout erzeugt doppelte externe Wirkung.

## 27. Freigabestatus

~~~text
JOBS_CONTRACT_APPROVED=NO
TRANSACTIONAL_OUTBOX_REQUIRED=YES
JOB_STATE_MODEL_APPROVED=NO
IDEMPOTENCY_CONTRACT_APPROVED=NO
RETRY_POLICY_APPROVED=NO
DEAD_LETTER_POLICY_APPROVED=NO
EXTERNAL_QUEUE_REQUIRED_FOR_S51A=NO
BACKGROUND_WORKER_IMPLEMENTATION_AUTHORIZED=NO
~~~

## 28. Aktueller Autorisierungsstand

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
