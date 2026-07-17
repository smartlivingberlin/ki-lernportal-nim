# S50B-R3 – Plattformverträge und Vertragsindex

**Status:** In S50B-R3 menschlich freigegeben; Implementierungs- und Betriebsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Geltungsbereich:** Rollen, Ownership, Redaktion, Datenschutz, Feature Flags und KI-Sicherheitsgrenzen

## 1. Zweck

Dieses Dokument definiert fachliche und sicherheitsrelevante Invarianten, die
vor Auth-, Admin-, Datenbank- oder KI-Implementierung verbindlich entschieden
sein müssen.

Es beschreibt Verträge, noch keine Implementierung.

Die spezialisierten S50B-R3-Verträge konkretisieren dieses Dokument:

- [`adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md`](./adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md)
- [`DATA_CLASSIFICATION_RETENTION_DELETION_CONTRACT.md`](./DATA_CLASSIFICATION_RETENTION_DELETION_CONTRACT.md)
- [`LEARNING_DOMAIN_CONTRACT.md`](./LEARNING_DOMAIN_CONTRACT.md)
- [`CONTENT_ASSESSMENT_REVISION_CONTRACT.md`](./CONTENT_ASSESSMENT_REVISION_CONTRACT.md)
- [`OBSERVABILITY_SLO_CONTRACT.md`](./OBSERVABILITY_SLO_CONTRACT.md)
- [`SCOPE_ORGANIZATION_SEAM_CONTRACT.md`](./SCOPE_ORGANIZATION_SEAM_CONTRACT.md)
- [`JOBS_OUTBOX_CONTRACT.md`](./JOBS_OUTBOX_CONTRACT.md)
- [`SEARCH_CONTRACT.md`](./SEARCH_CONTRACT.md)

Bei Widersprüchen hat das
[`S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`](./S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
Vorrang.

## 2. Rollen

Verbindliche Rollen:

```text
Visitor
Learner
Editor
Reviewer
Admin
Owner
```

### Rollenmatrix

| Aktion | Visitor | Learner | Editor | Reviewer | Admin | Owner |
|---|---:|---:|---:|---:|---:|---:|
| veröffentlichte Inhalte lesen | Ja | Ja | Ja | Ja | Ja | Ja |
| eigenen Fortschritt verwalten | Nein | Ja | Ja | Ja | Ja | Ja |
| eigenen Export anfordern | Nein | Ja | Ja | Ja | Ja | Ja |
| Entwurf erstellen | Nein | Nein | Ja | Ja | Ja | Ja |
| eigenen Entwurf freigeben | Nein | Nein | Nein | Nein | Nein | Nein |
| fremden Entwurf prüfen | Nein | Nein | Nein | Ja | optional | optional |
| veröffentlichen | Nein | Nein | Nein | Ja | optional | optional |
| Nutzer verwalten | Nein | Nein | Nein | Nein | Ja | Ja |
| Rollen zuweisen | Nein | Nein | Nein | Nein | begrenzt | Ja |
| Feature Flags ändern | Nein | Nein | Nein | Nein | begrenzt | Ja |
| System- und KI-Konfiguration | Nein | Nein | Nein | Nein | begrenzt | Ja |
| Break-glass-Aktion | Nein | Nein | Nein | Nein | Nein | Ja |

`Admin` und `Owner` sind nicht gleichbedeutend. `Owner` ist kein
Alltagskonto für normale Verwaltungsarbeit.

## 3. Scope- und Ownership-Regeln

- Rollen werden als scopefähige Datensätze gespeichert, nicht als CSV-String.
- Jede geschützte Operation prüft Rolle, Scope und Ownership serverseitig.
- Eine Objekt-ID ist niemals ein Berechtigungsnachweis.
- Mandanten-, Organisations- oder Kursgrenzen werden ausdrücklich geprüft.
- Listenabfragen filtern bereits im Repository nach erlaubtem Scope.
- Detailabfragen prüfen zusätzlich die konkrete Ressource.
- Browserzustand, Navigation und versteckte Buttons ersetzen keine Policy.
- Owner-Zugriff wird auf notwendige Sonderfälle begrenzt.
- Break-glass benötigt starke Authentifizierung, Begründung und Audit.
- Rollenänderungen widerrufen betroffene Sessions nach dokumentierter Policy.

## 4. Sitzungs- und Sicherheitsvertrag

Produktive Sitzungen müssen:

- serverseitig widerrufbar sein;
- eine begrenzte Lebensdauer besitzen;
- Rotation und Logout unterstützen;
- keine endgültige Rollenentscheidung allein aus einem langlebigen JWT ableiten;
- bei Passwort-, Rollen- oder Sicherheitsänderungen invalidierbar sein;
- gegen Session Fixation, CSRF und Replay geschützt werden;
- sicher protokollierte Sicherheitsereignisse erzeugen.

Ausgeschlossen sind:

- First User wird automatisch Admin;
- gemeinsam genutzte Adminzugänge;
- feste Owner-Zugangsdaten im Repository;
- nicht widerrufbare Langzeitsitzungen;
- Rollenfreigaben nur im Client.

## 5. Publikationsworkflow

Zielzustände:

```text
Draft
-> Review requested
-> Changes requested oder Approved
-> Published
-> Superseded, Archived oder Rolled back
```

Pflichtregeln:

- jede fachliche Änderung erzeugt eine neue Revision;
- Autor und Reviewer sind bei Freigabe getrennt;
- der Autor darf den eigenen Entwurf nicht selbst genehmigen;
- eine Publikation referenziert eine unveränderliche freigegebene Revision;
- Quellen benötigen eine eigene freigegebene Quellenrevision;
- Medien benötigen eine dokumentierte Rechtefreigabe;
- ein Rollback erzeugt einen neuen nachvollziehbaren Auditvorgang;
- Archivierung löscht keine historische Evidenz;
- veröffentlichte Inhalte werden nicht still überschrieben;
- geplante Veröffentlichungen müssen abbrechbar und idempotent sein.

## 6. Auditvertrag

Auditereignisse benötigen mindestens:

```text
event_id
occurred_at
actor_id oder system_actor
actor_role
action
resource_type
resource_id
scope
reason
correlation_id
result
metadata_redacted
```

Nicht in Auditlogs:

- Passwörter;
- Sessionwerte;
- Tokens;
- vollständige Prompts;
- vollständige Dokumentinhalte;
- unnötige personenbezogene Daten;
- geheime Variablen;
- Zahlungsdaten.

Auditdaten sind gegen normale Fachänderungen geschützt und besitzen eine
definierte Aufbewahrungs- und Exportregel.

## 7. Datenschutzvertrag

Für jede Datenkategorie werden dokumentiert:

- Zweck;
- Rechtsgrundlage oder zulässiger Nutzungskontext;
- minimale notwendige Felder;
- Aufbewahrungsdauer;
- Exportpfad;
- Berichtigungsweg;
- Lösch- oder Anonymisierungsweg;
- Zugriffsrollen;
- Backup-Auswirkung;
- Protokollierungsgrenzen.

Pflichtprinzipien:

- Datenminimierung;
- Zweckbindung;
- Trennung von Lern-, Sicherheits- und Betriebsdaten;
- keine Echtdaten in Tests;
- keine Production-Daten im Staging;
- kein Backup-Claim ohne nachgewiesene Wiederherstellung;
- Löschung darf Audit- und Referenzintegrität nicht unkontrolliert zerstören.

## 8. Feature-Flag-Vertrag

Risikoreiche Funktionen starten ausgeschaltet:

| Flag | Standard | Freigabegate |
|---|---:|---|
| `auth.registration` | OFF | Security und Product |
| `admin.internal_access` | OFF | Owner und Security |
| `upload.documents` | OFF | Security, Privacy und Rights |
| `ai.tutor` | OFF | AI, Privacy, Security und Cost |
| `ai.provider.*` | OFF | Provider Review |
| `learning.quiz_scoring` | OFF | Pedagogy und Legal |
| `b2b.tenants` | OFF | Isolation Review |
| `payment.*` | OFF | separates Business- und Legal-Gate |

Jede Flag-Änderung benötigt:

```text
flag_key
scope
old_value
new_value
actor
reason
changed_at
expires_at oder no_expiry_reason
rollback_reference
correlation_id
```

Feature Flags ersetzen keine:

- Datenbankmigration;
- serverseitige Berechtigung;
- rechtliche Zulässigkeit;
- Sicherheitsprüfung;
- Datenlöschung;
- Rollbackplanung.

## 9. KI- und RAG-Invarianten

- nur freigegebene Dokumentrevisionen werden produktiv indexiert;
- jede Passage bleibt auf Quelle, Revision und Chunk rückführbar;
- Retrieval wird nach Berechtigung und Ownership gefiltert;
- Antworten enthalten überprüfbare Zitate;
- bei unzureichender Evidenz erfolgt kontrollierte Enthaltung;
- Prompt-Injection und Datenexfiltration werden negativ getestet;
- Dokumente werden vor Parsing auf Typ, Größe, Rechte und Risiken geprüft;
- Uploads durchlaufen Quarantäne und Freigabe;
- KI-generierte Inhalte werden nicht automatisch veröffentlicht;
- Provider, Modell und Funktion sind getrennt abschaltbar;
- Kosten-, Rate-, Token- und Latenzgrenzen sind verpflichtend;
- Betriebslogs enthalten keine vollständigen Prompts oder Dokumentvolltexte;
- Evaluation erfolgt mit redigierten Testfällen und dokumentierten Kriterien.

## 10. Fehler- und API-Vertrag

Jede geschützte Serveroperation benötigt:

- Schema- und Typvalidierung;
- Authentifizierung;
- Autorisierung;
- Scope- und Ownership-Prüfung;
- kontrollierten Fehlercode;
- keine internen Stacktraces für Nutzer;
- Correlation ID;
- Rate Limit nach Risiko;
- Idempotenz bei wiederholbaren Schreibvorgängen;
- positive und negative Tests.

Fehler dürfen keine Information darüber verraten, ob eine fremde geschützte
Ressource existiert.

## 11. Pflicht-Negativtests

Mindestens zu prüfen:

- nicht angemeldeter Zugriff;
- falsche Rolle;
- richtige Rolle im falschen Scope;
- fremde Ressourcen-ID;
- Autor genehmigt eigenen Entwurf;
- widerrufene Session;
- abgelaufene Session;
- deaktiviertes Feature Flag;
- wiederholter idempotenter Schreibaufruf;
- manipulierte Objekt-ID;
- Upload ohne Rechtefreigabe;
- Retrieval aus nicht freigegebener Quelle;
- KI-Antwort ohne ausreichende Evidenz;
- Auditlog ohne Secret- oder PII-Leak.

## 12. Exit-Gate

Die Plattformverträge und ihre spezialisierten S50B-R3-Ergänzungen sind
dokumentiert, aber noch nicht menschlich freigegeben.

Aktueller Stand:

~~~text
ROLE_SCOPE_CONTRACT_DOCUMENTED=YES
OWNERSHIP_POLICY_DOCUMENTED=YES
SESSION_POLICY_DOCUMENTED=YES
ADMIN_WORKFLOW_CONTRACT_DOCUMENTED=YES
AUDIT_CONTRACT_DOCUMENTED=YES
PRIVACY_CONTRACT_DOCUMENTED=YES
FEATURE_FLAG_CONTRACT_DOCUMENTED=YES
AI_RAG_TRUST_BOUNDARIES_DOCUMENTED=YES
NEGATIVE_TEST_MATRIX_DOCUMENTED=YES
PLATFORM_CONTRACTS_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
HUMAN_IMPLEMENTATION_APPROVAL=NO
IMPLEMENTATION_AUTHORIZED=NO
COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
READY_FOR_REVIEW_AUTHORIZED=NO
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
~~~

Dieses Dokument erteilt keine Implementierungs-, Commit-, Push-, PR-,
Merge-, Datenbank-, Railway- oder Deployfreigabe.
