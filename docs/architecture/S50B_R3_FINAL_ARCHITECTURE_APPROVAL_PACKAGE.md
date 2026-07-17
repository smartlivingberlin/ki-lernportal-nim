# S50B-R3 – Final Architecture Approval Package

**Status:** Menschlich freigegeben; Umsetzungs-, Git- und Betriebsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Repository-Basis:** `1d67a4b1b7eace8869614aec82bdf42fb3d61adc`
**Pull Request:** PR #73 ist Ready for Review und nicht gemergt

## 1. Zweck

S50B-R3 schließt die nach S50B-R2 erkannten Architektur- und Vertragslücken.

Das Paket bündelt:

- die bestehende Zielarchitektur;
- die Server- und Trust-Boundaries;
- den Package-DAG;
- die Plattformverträge;
- acht ergänzte Architekturverträge;
- die Prüfung durch sechs Expertendimensionen;
- die endgültige Approval-Matrix;
- den exakten Kandidatenscope für S51A.

Dieses Dokument erteilt keine Implementierungs-, Commit-, Push-, Merge-,
Railway-, Datenbank-, Deploy- oder Produktionsfreigabe.

## 2. Maßgebliche bestehende Dokumente

Das Paket baut auf folgenden Dokumenten auf:

1. [S50B-R2 Source-of-Truth-Kandidat](S50B_R2_SOURCE_OF_TRUTH.md)
2. [Zielarchitektur](ARCHITECTURE_TARGET.md)
3. [Package-DAG](PACKAGE_DAG.md)
4. [Plattformverträge](PLATFORM_CONTRACTS.md)
5. [MVP-Scope](MVP_SCOPE.md)
6. [Premium-Transfer-Ledger](PREMIUM_TRANSFER_LEDGER.md)
7. [ADR-0001 Modularer Next.js-Monolith](adr/ADR-0001-MODULAR-NEXTJS-MONOLITH.md)
8. [ADR-0002 Server Boundaries](adr/ADR-0002-SERVER-BOUNDARIES.md)

## 3. Ergänzte acht Architekturverträge

S50B-R3 ergänzt:

1. [ADR-0003 Identity and Session Lifecycle](adr/ADR-0003-IDENTITY-SESSION-LIFECYCLE.md)
2. [Data Classification, Retention and Deletion](DATA_CLASSIFICATION_RETENTION_DELETION_CONTRACT.md)
3. [Learning Domain](LEARNING_DOMAIN_CONTRACT.md)
4. [Content and Assessment Revision](CONTENT_ASSESSMENT_REVISION_CONTRACT.md)
5. [Observability and Service Level](OBSERVABILITY_SLO_CONTRACT.md)
6. [Scope and Organization Seam](SCOPE_ORGANIZATION_SEAM_CONTRACT.md)
7. [Jobs and Transactional Outbox](JOBS_OUTBOX_CONTRACT.md)
8. [Search](SEARCH_CONTRACT.md)

Der vorgeschlagene erste Implementierungsscope ist separat dokumentiert:

- [S51A Exact Implementation Scope](S51A_IMPLEMENTATION_SCOPE.md)

## 4. Konsolidierte Architekturentscheidung

Die empfohlene Zielarchitektur bleibt:

~~~text
modularer Next.js-Monolith
+ explizite Package-Grenzen
+ MySQL und Drizzle für spätere Persistenz
+ opake und widerrufbare Serversitzungen
+ serverseitige Rollen-, Scope- und Ownership-Prüfung
+ unveränderliche Content- und Assessment-Revisionen
+ erklärbares Learning-Domain-Modell
+ datenbankgestützte Jobs und Transactional Outbox
+ providerneutrale Search- und AI-Adapter
+ isoliertes Staging vor jeder Production-Änderung
~~~

Nicht erforderlich für den Plattformkern sind:

- Microservices;
- Kubernetes;
- Event-Streaming-Plattform;
- externe Search Engine;
- Vektordatenbank;
- vollständige Multi-Tenant-Architektur;
- White Label;
- Payment;
- produktive KI-Laufzeit.

## 5. Begründung für den modularen Monolithen

Der modulare Monolith passt zum aktuellen Produktstand, weil:

- ein kleines System nicht künstlich verteilt wird;
- fachliche Grenzen trotzdem statisch geprüft werden;
- Deployment und Betrieb beherrschbar bleiben;
- Datenbanktransaktionen einfach bleiben;
- Auth, Admin, Learning und AI klar getrennt werden können;
- spätere Extraktion einzelner Dienste nicht blockiert wird;
- Kosten und Betriebsrisiken niedrig bleiben.

Ein Microservice wird erst dann gerechtfertigt, wenn ein konkreter
Skalierungs-, Sicherheits-, Compliance- oder Betriebsbedarf belegt ist.

## 6. Product Review

### Befund

Die Architektur unterstützt das Hauptproduktziel:

- Menschen ohne KI-Vorkenntnisse;
- ältere oder digital unsichere Nutzer;
- geführtes Lernen;
- angstfreie Bedienung;
- sichere KI-Nutzung;
- Quellenprüfung;
- schrittweise Kompetenzentwicklung.

### Bedingungen

- Gastlernen bleibt möglich;
- Kontoerstellung benötigt einen sichtbaren Nutzervorteil;
- die Plattform wächst nicht dauerhaft als einzige überladene Seite;
- Payment bleibt hinter einem separaten Business- und Legal-Gate;
- B2B und White Label werden nicht vor Pilotvalidierung gebaut;
- S51A verändert kein sichtbares Produktverhalten.

~~~text
PRODUCT_ARCHITECTURE_REVIEW=PASS_WITH_CONDITIONS
~~~

## 7. Learning Review

### Befund

Das Learning-Domain-Modell trennt jetzt:

- Öffnen;
- Bearbeiten;
- Üben;
- Prüfen;
- Abschließen;
- Wiederholen;
- späteres Behalten;
- Mastery.

### Bedingungen

- Completion bleibt erklärbar;
- Mastery entsteht nicht durch bloßes Öffnen;
- Assessments referenzieren unveränderliche Revisionen;
- Wiederholungsintervalle werden erst in S54/S55 entschieden;
- Confidence Rating ist keine Diagnose;
- LLM-Feedback ist zunächst nur formativ.

~~~text
LEARNING_ARCHITECTURE_REVIEW=PASS_WITH_CONDITIONS
~~~

## 8. Security Review

### Befund

Die Architektur definiert:

- serverseitige Policy-Entscheidungen;
- opake widerrufbare Sitzungen;
- Scope- und Ownership-Prüfung;
- Admin- und Owner-Trennung;
- MFA-Anforderung;
- negative Security-Tests;
- sichere Job- und Search-Grenzen;
- keine First-User-Admin-Regel.

### Bedingungen

- Admin und Owner erhalten vor Aktivierung MFA;
- Session Fixation, Replay, Recovery und IDOR werden negativ getestet;
- ASVS-orientierte Prüfung erfolgt vor produktiven Konten;
- Upload, AI, Payment und Multi-Tenant bleiben deaktiviert;
- keine Credential- oder Tokenwerte gelangen in Logs.

~~~text
SECURITY_ARCHITECTURE_REVIEW=PASS_WITH_CONDITIONS
~~~

## 9. Privacy Review

### Befund

Die Architektur berücksichtigt:

- Datenklassifizierung;
- Datenminimierung;
- Zweckbindung;
- Aufbewahrung;
- Export;
- Löschung;
- Anonymisierung;
- Backup-Auswirkungen;
- AI-Inhaltsgrenzen;
- Staging-Trennung.

### Bedingungen

- jede produktive Datenkategorie erhält einen freigegebenen Registereintrag;
- technische Ausgangsfristen werden vor Production bestätigt;
- Gastfortschritt wird nur bewusst in ein Konto importiert;
- vollständige AI-Inhalte sind standardmäßig flüchtig;
- Production-Daten werden nicht nach Staging kopiert;
- bezahlte Lernangebote erhalten eine separate rechtliche Prüfung.

~~~text
PRIVACY_ARCHITECTURE_REVIEW=PASS_WITH_CONDITIONS
~~~

## 10. AI- und RAG-Review

### Befund

Die bestehende Architektur ist mit einem späteren sicheren Tutor vereinbar:

- providerneutrale Adapter;
- nur freigegebene Revisionen;
- Provenienz;
- scopegefiltertes Retrieval;
- Zitate;
- kontrollierte Enthaltung;
- Cost Limits;
- Rate Limits;
- Feature- und Provider-Abschaltung.

### Bedingungen

- kein allgemeiner Chatbot vor Evaluation;
- kein produktiver Dokumentupload vor Quarantäne und Rechteprüfung;
- keine autonome externe Aktion;
- keine automatische Publikation;
- keine endgültige LLM-Benotung;
- Prompt-Injection, Exfiltration und Isolation werden negativ getestet.

~~~text
AI_RAG_ARCHITECTURE_REVIEW=PASS_WITH_CONDITIONS
~~~

## 11. Operations Review

### Befund

Die Architektur umfasst:

- Health;
- Readiness;
- Versionsevidenz;
- strukturierte Logs;
- Correlation IDs;
- interne SLO-Ausgangswerte;
- Alarmierung;
- Incident-Evidenz;
- Jobs und Dead Letter;
- Backup- und Restore-Nachweise.

### Bedingungen

- PR #68 bleibt von S50B-R3 getrennt;
- Railway-Staging benötigt eine separate Freigabe;
- Production-Autodeploy wird vor jeder relevanten Merge-Entscheidung geprüft;
- Monitoring ist vor produktiven Konten aktiv;
- Backup-Claims setzen erfolgreichen Restore-Test voraus;
- Production bleibt durch dieses Paket unverändert.

~~~text
OPERATIONS_ARCHITECTURE_REVIEW=PASS_WITH_CONDITIONS
~~~

## 12. Cross-Domain-Matrix

| Entscheidung | Product | Learning | Security | Privacy | AI/RAG | Operations | Empfehlung |
|---|---|---|---|---|---|---|---|
| modularer Monolith | Pass | Pass | Pass | Pass | Pass | Pass | freigeben |
| Package-DAG | Pass | Pass | Pass | Pass | Pass | Pass | freigeben |
| Server Boundaries | Pass | Pass | Pass | Pass | Pass | Pass | freigeben |
| widerrufbare Sessions | Pass | neutral | Pass | Pass | neutral | Pass | mit Bedingungen |
| Datenklassifizierung | Pass | Pass | Pass | Pass | Pass | Pass | mit Bedingungen |
| Learning-Domain | Pass | Pass | Pass | Pass | neutral | Pass | mit Bedingungen |
| immutable Revisionen | Pass | Pass | Pass | Pass | Pass | Pass | freigeben |
| interne SLO-Ausgangswerte | Pass | neutral | Pass | Pass | Pass | Pass | mit Bedingungen |
| Organisationsnaht | Pass | neutral | Pass | Pass | Pass | Pass | freigeben, Aktivierung vertagen |
| Transactional Outbox | Pass | Pass | Pass | Pass | Pass | Pass | freigeben |
| providerneutrale Suche | Pass | Pass | Pass | Pass | Pass | Pass | freigeben |
| providerneutraler AI-Core | Pass | Pass | Pass | Pass | Pass | Pass | hinter Evaluation Gate |
| isoliertes Staging | Pass | neutral | Pass | Pass | Pass | Pass | später separat freigeben |
| S51A Package-Skeleton | Pass | Pass | Pass | Pass | Pass | Pass | nächster Kandidat |

## 13. Harte Scope-Grenzen

Durch S50B-R3 werden nicht freigegeben:

~~~text
PAYMENT=OUT_OF_SCOPE
WHITE_LABEL=OUT_OF_SCOPE
FULL_MULTI_TENANCY=OUT_OF_SCOPE
PRODUCTIVE_AI=OUT_OF_SCOPE
PRODUCTIVE_UPLOAD=OUT_OF_SCOPE
PRODUCTIVE_AUTH=OUT_OF_SCOPE
PRODUCTIVE_DATABASE=OUT_OF_SCOPE
RAILWAY_STAGING_CHANGE=OUT_OF_SCOPE
PRODUCTION_DATABASE_CHANGE=OUT_OF_SCOPE
PRODUCTION_DEPLOY=OUT_OF_SCOPE
~~~

## 14. Approval-Matrix

| Architekturbaustein | Agentur-Empfehlung | Menschliche Entscheidung |
|---|---|---|
| modularer Next.js-Monolith | Approve | Approved |
| ADR-0002 Server Boundaries | Approve | Approved |
| Package-DAG | Approve | Approved |
| Plattformverträge | Approve with conditions | Approved with conditions |
| ADR-0003 Identity und Sessions | Approve with conditions | Approved with conditions |
| Datenklassifizierung und Löschung | Approve with conditions | Approved with conditions |
| Learning-Domain | Approve with conditions | Approved with conditions |
| Content- und Assessment-Revisionen | Approve | Approved |
| Observability und interne SLOs | Approve with conditions | Approved with conditions |
| Scope- und Organisationsnaht | Approve, activation deferred | Approved; activation deferred |
| Jobs und Transactional Outbox | Approve | Approved |
| Search-Vertrag | Approve | Approved |
| AI/RAG Trust Boundaries | Approve behind later gate | Approved behind later gate |
| Premium-Transfer-Ledger | Review and retain | Pending separate transfer review |
| S51A-Implementierungsscope | Approve as next candidate | Pending separate scope approval |

## 15. Spätere Entscheidungen, die S51A nicht blockieren

Folgende Detailentscheidungen müssen vor ihrer jeweiligen Funktion, aber nicht
vor dem reinen S51A-Skeleton getroffen werden:

- konkretes Passwort-Hashingverfahren und Parameter;
- endgültige Session-Laufzeiten;
- endgültige Aufbewahrungsfristen;
- konkrete Tabellen und Migrationen;
- Scoring-Policy;
- Wiederholungsintervalle;
- Monitoring-Anbieter;
- Alert-Kanäle;
- AI-Provider und Modell;
- externe Search Engine;
- Vektordatenbank;
- Organisationsverwaltung;
- Payment-Modell;
- Zertifikats- und Fernunterrichtsmodell.

## 16. S51A-Voraussetzungen

S51A darf erst beginnen, wenn alle folgenden Voraussetzungen erfüllt und
jeweils ausdrücklich dokumentiert wurden:

~~~text
REQUIRED_HUMAN_ARCHITECTURE_APPROVAL=YES
REQUIRED_S51A_SCOPE_APPROVAL=YES
REQUIRED_S51A_IMPLEMENTATION_AUTHORIZATION=YES
~~~

Architekturfreigabe allein reicht nicht.

Branch-Erstellung, Umsetzung, Commit, Push und PR benötigen die im Projekt
festgelegten Freigabestufen.

## 17. Reihenfolge nach Architekturentscheidung

Empfohlene Reihenfolge:

1. S50B-R3 vollständig read-only gegenprüfen.
2. menschliche Architekturentscheidung treffen.
3. erforderliche Dokumentkorrekturen ausführen.
4. gesonderte Commit-Freigabe einholen.
5. Dokumente committen.
6. gesonderte Push-Freigabe einholen.
7. PR #73 aktualisieren und CI prüfen.
8. gesonderte Ready-for-Review-Entscheidung.
9. gesonderte Merge-Entscheidung.
10. nach Merge aktuellen `main` read-only prüfen.
11. gesonderte S51A-Implementierungsfreigabe.
12. S51A auf einem neuen kleinen Branch von aktuellem `main` beginnen.

## 18. Menschliche Entscheidungsoptionen

Die spätere menschliche Entscheidung soll genau eine Option wählen:

~~~text
APPROVE_ARCHITECTURE
APPROVE_WITH_REQUIRED_DOCUMENT_CORRECTIONS
REJECT_AND_REVISE
~~~

Die menschliche Entscheidung vom 17. Juli 2026 lautet:

~~~text
HUMAN_ARCHITECTURE_DECISION=APPROVE_ARCHITECTURE
~~~

Diese Entscheidung genehmigt die Architektur, aber keine Implementierung,
keinen S51A-Scope, keinen Premium-Transfer und keine Git- oder Betriebsaktion.

## 19. Agenturempfehlung

Die Gesamtarchitektur ist tragfähig.

Die Agenturempfehlung lautet:

~~~text
AGENCY_RECOMMENDATION=APPROVE_WITH_CONDITIONS
~~~

Die Bedingungen betreffen überwiegend spätere Feature-Aktivierungen und keine
grundlegende Neuarchitektur.

## 20. Aktueller Paketstatus

~~~text
S50B_R3_PACKAGE_COMPLETE=YES
S50B_R3_PACKAGE_APPROVED=YES
HUMAN_ARCHITECTURE_APPROVAL=YES
HUMAN_ARCHITECTURE_DECISION=APPROVE_ARCHITECTURE
HUMAN_ARCHITECTURE_DECISION_DATE=2026-07-17
HUMAN_IMPLEMENTATION_APPROVAL=NO
S51A_SCOPE_APPROVED=NO
S51A_IMPLEMENTATION_AUTHORIZED=NO
PR73_READY_FOR_REVIEW=YES
PR73_MERGE_APPROVED=NO
PR73_DEPLOY_APPROVED=NO
~~~

PR #73 ist Ready for Review und bleibt bis zu einer gesonderten Merge-Entscheidung ungemergt.

## 21. Aktueller Autorisierungsstand

~~~text
DOCUMENT_STATUS=ARCHITECTURE_APPROVED_COMMITTED_LOCALLY
PRODUCT_CODE_CHANGE_AUTHORIZED=NO
DATABASE_CHANGE_AUTHORIZED=NO
RAILWAY_CHANGE_AUTHORIZED=NO
COMMIT_AUTHORIZED=YES
COMMIT_AUTHORIZATION=AUTHORIZE_COMMIT_ONLY
COMMIT_SCOPE=S50B_R3_DOCUMENTATION_ONLY
COMMIT_CREATED=YES
PUSH_AUTHORIZED=YES
PUSH_AUTHORIZATION=AUTHORIZE_PUSH_ONLY
PUSH_EXECUTED=YES
READY_FOR_REVIEW_AUTHORIZED=YES
READY_FOR_REVIEW_EXECUTED=YES
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
~~~
