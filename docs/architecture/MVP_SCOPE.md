# MVP-Scope – KI-Lernportal NIM

**Status:** Architektur freigegeben; S51A sowie S51B-A und das lokale S51B-B-Adapterfundament integriert; weitere Plattform-Slices separat freigabepflichtig
**Stand:** 26. Juli 2026
**Baseline `main`:** `30e88dcd0516f5c2ddf3562a2f492f6f756f7e7a`

Dieses Dokument beschreibt den realistischen nächsten Plattform-Scope ausgehend
vom tatsächlich integrierten Stand. Es ist keine pauschale
Implementierungsfreigabe.

Maßgeblich sind:

- das [S50B-R3-Freigabepaket](S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md);
- der [historische S51A-Implementierungsvertrag](S51A_IMPLEMENTATION_SCOPE.md);
- die [S51B-Scope-Dokumentation](S51B_IMPLEMENTATION_SCOPE.md);
- der [S51B-B-Adapter-Scope-Lock](S51B_B_IMPLEMENTATION_SCOPE.md);
- die [Zielarchitektur](ARCHITECTURE_TARGET.md);
- der [Package-DAG](PACKAGE_DAG.md);
- die [Plattformverträge](PLATFORM_CONTRACTS.md);
- der [aktuelle Projektstatus](../00_PROJECT_STATUS.md).

[S50B-R2](S50B_R2_SOURCE_OF_TRUTH.md) bleibt historische Grundlage.

## 1. Bereits vorhandener Stand

Der gegenwärtige Stand umfasst:

- eine produktionsfähig baubare Next.js-Anwendung unter `apps/web`;
- den integrierten S51A-Workspace mit acht privaten Package-Grenzen;
- Package-Boundary- und Package-Typecheck-Gates in CI;
- integrierte S51B-A- und S51B-B-Scope-Locks;
- ein lokales S51B-B-MySQL-/Drizzle-Adapterfundament mit Lazy Initialization
  und lokalen Fake-/Unit-Tests;
- zwölf strukturierte Anfängerlektionen;
- lokale Suche und lokalen Lernfortschritt;
- zwölf Übungen und 36 Selbstprüfungsfragen;
- Accessibility-, Content-, Quellen-, Governance- und Supply-Chain-Gates;
- einen reproduzierbaren Next.js-Standalone-Build;
- eine öffentlich erreichbare Railway-Konzeptdemo.

Dieser Stand ist noch kein vollständiges produktives Lernportal.

~~~text
S51A=INTEGRATED
S51B_A=INTEGRATED
S51B_B_SCOPE_LOCK=INTEGRATED
S51B_B_LOCAL_ADAPTER_FOUNDATION=INTEGRATED

S51B_B_REAL_CONNECTION=NOT_AUTHORIZED
S51B_C_SCHEMA_AND_MIGRATIONS=NOT_AUTHORIZED
S51C_OPERATIONS_FOUNDATION=NOT_AUTHORIZED
S51D_RAILWAY_STAGING=NOT_AUTHORIZED
~~~

## 2. Nächster kontrollierter Plattform-Scope

### S51B-C – Schema- und Migrationsfundament

Dieser Slice beginnt nur nach einer neuen ausdrücklichen Freigabe.

Möglicher späterer Scope:

- kanonisches MySQL-/Drizzle-Schema;
- Migration Ledger;
- reproduzierbare Vorwärtsmigrationen;
- negative Migrationstests;
- kontrollierte Testdatenbank;
- dokumentierte Backup-, Restore-, Aufbewahrungs- und Löschgrenzen;
- keine Production-Migration ohne separate Entscheidung.

Nicht automatisch enthalten sind Auth, Admin, KI, Payment oder ein
Production-Deploy.

### S51C – Betriebsfundament

Möglicher späterer Scope:

- Feature Flags mit sicheren Defaultwerten;
- Health- und Readiness-Verträge;
- strukturierte, redigierte Logs;
- Correlation IDs;
- kontrollierte Fehlerverträge;
- keine Secrets oder personenbezogenen Volltexte in Logs;
- klar getrennte Liveness- und Readiness-Semantik;
- Monitoring- und SLO-Verträge ohne vorgetäuschte Betriebsreife.

### S51D – Isoliertes Railway-Staging

Der staging-only Repositoryvertrag wurde in PR #68 umgesetzt und durch eine
vollständig erfolgreiche CI verifiziert. Ein tatsächliches Railway-Staging ist
dadurch nicht automatisch erstellt oder freigegeben.

Ein späterer Staging-Slice beginnt erst nach separater menschlicher Freigabe und
umfasst höchstens:

- ein eigenes, von Production getrenntes Staging-Environment;
- belegte Root-, Build-, Start- und Healthcheck-Verträge;
- aktuelle read-only Verifikation von Autodeploy, Wait for CI und Config Source;
- getrennte Variablen und Secrets;
- einen freigegebenen Staging-Branch;
- keine Änderung der bestehenden Production ohne Einzelentscheidung.

PR #68 bleibt Draft, wurde nicht auf Ready gesetzt und ist nicht zum Merge
freigegeben. Vor einer späteren Mergeentscheidung ist der aktuelle
Railway-Istzustand erneut read-only zu prüfen.

### S52 – Auth, Sessions, Rollen und Ownership

Möglicher späterer Scope:

- serverseitig widerrufbare Sessions;
- Rollen `Visitor`, `Learner`, `Editor`, `Reviewer`, `Admin` und `Owner`;
- Scope- und Ownership-Prüfungen;
- negative IDOR- und Privilege-Escalation-Tests;
- sichere Recovery- und Session-Lifecycle-Regeln;
- keine automatische First-User-Admin-Regel.

### S53 – Content-, Quellen- und Medienadmin

Möglicher späterer Scope:

- revisionsfähige Inhalte;
- getrennte Autor- und Reviewer-Rollen;
- Draft-, Review-, Publish-, Supersede-, Archive- und Rollback-Workflow;
- aussagenbezogene Quellenfreigabe;
- Ressourcen- und Glossar-Governance;
- Medienrechteprüfung;
- unveränderliches Auditprotokoll.

### S54 und S55 – Lernen und Assessments

Möglicher späterer Scope:

- serverseitiger Lernfortschritt;
- getrennte Zustände wie `offen`, `begonnen`, `noch unsicher`, `verstanden`,
  `wiederholen` und `erledigt`;
- Fragebank und Revisionen;
- Quizversuche und Antworten;
- erklärendes Feedback;
- Wiederholungslogik;
- pädagogische und technische Tests;
- keine irreführenden Prüfungs- oder Zertifikatsclaims.

### S56 – KI/RAG

KI/RAG beginnt erst hinter einem separaten Evaluation Gate.

Möglicher späterer Scope:

- providerneutrale Adapter;
- Dokumentrevisionen mit Provenienz;
- berechtigungsgefiltertes Retrieval;
- belastbare Zitate und kontrollierte Enthaltung;
- Prompt-Injection-, Exfiltrations-, Poisoning- und Kostenkontrollen;
- Datenminimierung und dokumentierte Anbietergrenzen;
- keine automatische Veröffentlichung KI-generierter Inhalte;
- keine produktive Nutzung ohne Qualitäts-, Datenschutz- und Betriebskonzept.

## 3. Produkt-Hardening vor großen Plattformfunktionen

Unabhängig von Backend- und KI-Slices bleiben folgende Produktarbeiten
priorisiert und separat zu planen:

1. Cross-Browser- und reale Geräteabnahme;
2. echtes Browserzoom und manuelle Screenreader-Prüfung;
3. didaktisch strukturiertes Lesson-Schema mit individuellem Lernziel;
4. reduzierte Anfänger-UX mit einer eindeutigen Hauptaktion;
5. sicherer deutscher Lernstand-Reset;
6. konsistentes Light-/Dark- und Design-System;
7. aussagenbezogene Quellen- und Ressourcen-Governance;
8. lokale Wiederholung und „noch unsicher“-Zustände;
9. Lighthouse-, Web-Vitals-, Bundle- und visuelle Regressionsbudgets.

Diese Punkte dürfen in kleine, voneinander prüfbare Slices zerlegt werden.

## 4. Nicht Teil dieses MVP-Scope

Nicht automatisch freigegeben sind:

- Microservices;
- FastAPI- oder NestJS-Hauptruntime;
- Kubernetes;
- fest gekoppelter Vektor-Datenbankanbieter;
- LMS-, CRM- oder ERP-Vollausbau;
- Payment;
- B2B-Mandantenfähigkeit;
- White Label;
- öffentliche KI-, Sicherheits- oder Compliance-Claims;
- Production-Migration;
- Production-Deploy;
- Aktivierung von Autodeploy oder Änderung von Wait for CI;
- Änderung von Railway Root Directory oder Config Source.

## 5. Qualitäts- und Sicherheitsgates

Jeder Slice benötigt mindestens:

- einen eigenen kleinen Branch vom aktuellen `main`;
- einen dokumentierten und begrenzten Scope;
- nachvollziehbare positive und negative Tests;
- negative Security-Tests nach Risiko;
- `git diff --check`;
- keine Secrets;
- keine unbeabsichtigte externe Wirkung;
- Erhalt aller bestehenden CI-Gates;
- menschliche Abnahme vor Ready, Merge oder Deploy;
- eine getrennte Deploymentfreigabe, wenn ein Merge externe Wirkung haben kann.

Dokumentation, Produktcode, GitHub-Issue-Bereinigung, Datenbank und Railway
werden nicht in einem Misch-PR kombiniert.

## 6. Railway- und Production-Grenze

~~~text
CURRENT_PRODUCTION_AUTODEPLOY=UNVERIFIED
CURRENT_WAIT_FOR_CI=UNVERIFIED
CURRENT_CONFIG_SOURCE=UNVERIFIED
PR68_STAGING_ONLY_REMEDIATION=COMPLETE
PR68_FULL_CI=PASS
PR68_READY_EXECUTED=NO
PR68_MERGE_AUTHORIZED=NO
RAILWAY_REVERIFY_BEFORE_MERGE=REQUIRED
DEPLOY_APPROVAL=SEPARATE
~~~

Historische Railway-Einstellungen sind keine dauerhaft gültige
Betriebszusage.

## 7. Freigabestatus

~~~text
S50B_R3_PACKAGE_APPROVED=YES
S50B_R3_INTEGRATED_TO_MAIN=YES

S51A_SCOPE_DOCUMENTED=YES
S51A_IMPLEMENTED=YES
S51A_INTEGRATED_TO_MAIN=YES

S51B_A_INTEGRATED_TO_MAIN=YES
S51B_B_SCOPE_LOCK_INTEGRATED_TO_MAIN=YES
S51B_B_LOCAL_ADAPTER_FOUNDATION_INTEGRATED=YES

MVP_SCOPE_DOCUMENTED=YES
MVP_SCOPE_APPROVED=NO
HUMAN_NEXT_IMPLEMENTATION_APPROVAL=NO

S51B_B_REAL_CONNECTION_AUTHORIZED=NO
S51B_C_SCHEMA_AUTHORIZED=NO
S51C_OPERATIONS_AUTHORIZED=NO
S51D_RAILWAY_STAGING_AUTHORIZED=NO
AUTH_RUNTIME_AUTHORIZED=NO
ADMIN_RUNTIME_AUTHORIZED=NO
AI_RUNTIME_AUTHORIZED=NO
DATABASE_CHANGE_APPROVED=NO
PR68_MERGE_AUTHORIZED=NO
PRODUCTION_CHANGE_APPROVED=NO
~~~

Dieses Dokument erteilt keine Implementierungs-, Dependency-, Datenbank-,
GitHub-Issue-, Railway-, Merge- oder Deployfreigabe.
