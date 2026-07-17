# MVP-Scope – KI-Lernportal NIM

**Status:** In S50B-R3 architektonisch freigegeben; MVP- und S51A-Scopefreigaben ausstehend
**Stand:** 17. Juli 2026

Dieses Dokument beschreibt den nächsten realistischen Plattform-Scope.

Maßgeblich sind:

- das [S50B-R3-Freigabepaket](S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md);
- der [exakte S51A-Implementierungsscope](S51A_IMPLEMENTATION_SCOPE.md);
- die [Zielarchitektur](ARCHITECTURE_TARGET.md);
- der [Package-DAG](PACKAGE_DAG.md);
- die [Plattformverträge](PLATFORM_CONTRACTS.md).

[S50B-R2](S50B_R2_SOURCE_OF_TRUTH.md) bleibt historische Grundlage.
Für den exakten Inhalt von S51A hat `S51A_IMPLEMENTATION_SCOPE.md` Vorrang.

## 1. Bereits vorhandener Konzeptdemo-Stand

Der bestehende Stand umfasst:

- eine produktionsfähig baubare Next.js-Anwendung unter `apps/web`;
- zwölf strukturierte Anfängerlektionen;
- lokale Suche und lokalen Lernfortschritt;
- zwölf Übungen und 36 Selbstprüfungsfragen;
- Accessibility-, Content-, Quellen-, Governance- und Supply-Chain-Gates;
- eine öffentlich erreichbare Railway-Konzeptdemo.

Dieser Stand ist noch kein vollständiges produktives Lernportal.

## 2. Vorgesehener nächster Plattform-Scope

### S51A – Workspace- und Package-Skeleton

Geplant sind die Paketgrenzen:

```text
apps/web
packages/ui
packages/contracts
packages/domain
packages/db
packages/auth
packages/admin
packages/ai-core
packages/testing
```

Dieser Slice erzeugt nur das technische Gerüst und die Importregeln. Er enthält
noch keine produktive Datenbank, Authentifizierung oder KI-Laufzeit.

### S51B – Persistenzfundament

- MySQL mit Drizzle;
- kanonisches Schema;
- Migration Ledger;
- reproduzierbare Migrationen;
- Testdatenbank und negative Migrationstests;
- dokumentierte Backup-, Restore- und Löschgrenzen.

### S51C – Betriebsfundament

- Feature Flags mit sicheren Defaultwerten;
- Health- und Readiness-Verträge;
- strukturierte, redigierte Logs;
- Correlation IDs;
- kontrollierte Fehlerverträge;
- keine Secrets oder personenbezogenen Volltexte in Logs.

### S51D – Isoliertes Railway-Staging

Dieser Slice beginnt erst nach separater menschlicher Freigabe.

Er umfasst:

- eigenes Staging-Environment;
- belegte Root-, Build-, Start- und Healthcheck-Verträge;
- Wait for CI;
- getrennte Variablen und Secrets;
- keine Änderung der bestehenden Production ohne Einzelentscheidung.

### S52 – Auth, Sessions, Rollen und Ownership

- serverseitig widerrufbare Sessions;
- Rollen `Visitor`, `Learner`, `Editor`, `Reviewer`, `Admin`, `Owner`;
- Scope- und Ownership-Prüfungen;
- negative IDOR- und Privilege-Escalation-Tests;
- keine automatische First-User-Admin-Regel.

### S53 – Content-, Quellen- und Medienadmin

- revisionsfähige Inhalte;
- getrennte Autor- und Reviewer-Rollen;
- Draft-, Review-, Publish-, Supersede-, Archive- und Rollback-Workflow;
- Quellenfreigabe;
- Medienrechteprüfung;
- unveränderliches Auditprotokoll.

### S54 und S55 – Lernen

- serverseitiger Lernfortschritt;
- Fragebank und Revisionen;
- Quizversuche und Antworten;
- Wiederholungslogik;
- pädagogische und technische Tests.

### S56 – KI/RAG

KI/RAG beginnt erst hinter einem separaten Evaluation Gate.

Geplant sind:

- provider-neutrale Adapter;
- Dokumentrevisionen mit Provenienz;
- berechtigungsgefiltertes Retrieval;
- Zitate und kontrollierte Enthaltung;
- Prompt-Injection-, Exfiltrations-, Poisoning- und Kostenkontrollen;
- keine automatische Veröffentlichung KI-generierter Inhalte.

## 3. Nicht Teil dieses MVP-Scope

Nicht automatisch freigegeben sind:

- Microservices;
- FastAPI- oder NestJS-Hauptruntime;
- Kubernetes;
- fest gekoppelter Vektor-Datenbankanbieter;
- LMS-, CRM- oder ERP-Vollausbau;
- Payment;
- B2B-Mandantenfähigkeit;
- White Label;
- öffentliche KI- oder Compliance-Claims;
- Production-Migration oder Production-Deploy.

## 4. Qualitäts- und Sicherheitsgates

Jeder Slice benötigt mindestens:

- eigenen kleinen Branch;
- dokumentierten Scope;
- nachvollziehbare Tests;
- negative Security-Tests nach Risiko;
- `git diff --check`;
- keine Secrets;
- keine unbeabsichtigte externe Wirkung;
- menschliche Abnahme vor Commit, Push, PR, Merge oder Deploy gemäß Freigabestufe.

## 5. Freigabestatus

```text
S50B_R3_PACKAGE_APPROVED=YES
MVP_SCOPE_APPROVED=NO
HUMAN_IMPLEMENTATION_APPROVAL=NO
S51A_SCOPE_DOCUMENTED=YES
S51A_SCOPE_APPROVED=NO
S51A_IMPLEMENTATION_AUTHORIZED=NO
DATABASE_CHANGE_APPROVED=NO
RAILWAY_STAGING_APPROVED=NO
PRODUCTION_CHANGE_APPROVED=NO
```

Dieses Dokument erteilt keine Implementierungs-, Datenbank-, GitHub-, Railway-,
Merge- oder Deployfreigabe.
