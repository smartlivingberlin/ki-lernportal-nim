# S50B-R3 – Premium-Transfer-Ledger

**Status:** In S50B-R3 architektonisch freigegeben; menschliche Transferfreigabe ausstehend
**Stand:** 17. Juli 2026
**Spenderbasis:** `smartlivingberlin/Immobilie-Akademie-Premium`
**Zielbasis:** `smartlivingberlin/ki-lernportal-nim`
**Aktueller Freigabekandidat:** [`S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md`](S50B_R3_FINAL_ARCHITECTURE_APPROVAL_PACKAGE.md)
**Exakte S51A-Grenze:** [`S51A_IMPLEMENTATION_SCOPE.md`](S51A_IMPLEMENTATION_SCOPE.md)

[S50B-R2](S50B_R2_SOURCE_OF_TRUTH.md) bleibt historische Architekturgrundlage.

## 1. Zweck

Das Premium-Portal dient ausschließlich als **Pattern Library**. Es ist keine
kopierfertige Zielcodebasis für das KI-Lernportal NIM.

Jeder mögliche Transfer wird fachlich, technisch, rechtlich und sicherheitsseitig
neu bewertet. Ähnliche Dateinamen, Komponenten oder Tabellen begründen keine
automatische Übernahme.

## 2. Verbindliche Klassifikationen

```text
KEEP_AS_PRINCIPLE
ADAPT_PATTERN
REBUILD_FOR_NIM
DEFER
REJECT
```

### KEEP_AS_PRINCIPLE

Ein bewährtes Grundprinzip wird übernommen, aber nicht zwingend derselbe Code.

### ADAPT_PATTERN

Ein Muster ist nützlich, muss jedoch an NIM-Domäne, Next.js-Zielarchitektur,
Barrierefreiheit, Datenschutz und Sicherheitsverträge angepasst werden.

### REBUILD_FOR_NIM

Die fachliche Fähigkeit ist nützlich, aber Datenmodell, Autorisierung,
Schnittstellen und Tests werden für NIM neu entwickelt.

### DEFER

Die Fähigkeit ist nicht grundsätzlich ausgeschlossen, gehört aber nicht in die
aktuelle Plattformphase.

### REJECT

Das Muster ist für NIM fachlich, technisch, rechtlich oder sicherheitsseitig
ungeeignet.

## 3. Übergreifende Transferregeln

Vor jeder Übernahme müssen mindestens dokumentiert sein:

```text
Domain
Donor evidence
Target need
Classification
Security risk
Privacy risk
Accessibility risk
Coupling
Dependencies
Data model impact
Migration impact
Tests required
Suggested slice
Decision rationale
```

Zusätzlich gilt:

- kein blindes Kopieren ganzer Verzeichnisse;
- keine Übernahme von Secrets, Echtdaten oder produktiven Konfigurationen;
- keine Übernahme von Immobilien-, AZAV-, IHK- oder Verwaltungsclaims;
- keine Übernahme von Express-/Vite-Grenzen in die Next.js-Hauptruntime;
- keine Übernahme dynamischer DDL oder impliziter Migrationen;
- keine Übernahme clientseitiger Autorisierungsentscheidungen;
- keine Übernahme von First-User-Admin-Mechanismen;
- keine Übernahme langer, nicht widerrufbarer Sitzungen;
- keine Übernahme ungeprüfter Payment-, Tenant- oder Trackinglogik;
- jeder Transfer benötigt positive und negative Tests.

## 4. Transfermatrix

| Domäne oder Muster | Entscheidung | NIM-Ziel | Hauptgrund |
|---|---|---|---|
| klare Dashboardnavigation | ADAPT_PATTERN | anfängerfreundliche Adminnavigation | Struktur nutzbar, Fachsprache neu |
| rollenabhängige Navigation | REBUILD_FOR_NIM | nur ergänzende UI-Anzeige | Client darf nicht autorisieren |
| Draft/Review/Publish | ADAPT_PATTERN | Vier-Augen-Workflow | gutes Prinzip, neue Policies nötig |
| Revisionshistorie | ADAPT_PATTERN | unveränderliche Contentrevisionen | Datenmodell und Audit neu |
| Rollback und Archivierung | ADAPT_PATTERN | kontrollierter Publikationsrollback | fachneutral neu absichern |
| Auditprotokoll | REBUILD_FOR_NIM | datensparsame Sicherheits- und Fachereignisse | Datenschutz und Integrität |
| Nutzerverwaltung | REBUILD_FOR_NIM | scopefähige Rollen und Ownership | Premium-Modell nicht kanonisch |
| Auth-Credentials | REBUILD_FOR_NIM | sichere Credentials und Recovery | neue Threat- und Sessionmodelle |
| serverseitige Sessions | REBUILD_FOR_NIM | widerrufbare, rotierbare Sessions | keine langen JWT-Sitzungen |
| First User wird Admin | REJECT | expliziter Owner-Bootstrap | kritischer Privilegienfehler |
| CSV- oder Stringrollen | REJECT | normalisierte Role Assignments | fehlende Scopes und Constraints |
| ID-basierte Freigabe | REJECT | serverseitige Ownership-Policy | ID ist kein Berechtigungsnachweis |
| Lernfortschritt | ADAPT_PATTERN | freiwillig und transparent | fachneutral und datensparsam |
| Lernereignisse | REBUILD_FOR_NIM | definierte Eventtaxonomie | kein Tracking ohne Zweck |
| Quizversuche | REBUILD_FOR_NIM | versionierte Fragen und Antworten | keine Prüfungsclaims |
| Wiederholungslogik | ADAPT_PATTERN | pädagogisch belegte Wiederholung | NIM-Didaktik separat prüfen |
| Zertifikate | DEFER | nur nach Rechts- und Produktprüfung | Claim- und FernUSG-Risiko |
| Lerninhalte | REJECT | NIM-eigener Content | Immobilienfachlichkeit unpassend |
| Quellenverwaltung | ADAPT_PATTERN | Revisionen, Rechte und Provenienz | stärkerer Quellenvertrag nötig |
| Medienverwaltung | REBUILD_FOR_NIM | Quarantäne, Rechte und Löschung | Upload- und Privacy-Risiko |
| Datei-Upload | REBUILD_FOR_NIM | isolierte sichere Ingestion | Dateityp, Malware, Rechte |
| KI-Chatoberfläche | ADAPT_PATTERN | anfängerfreundliche Tutoroberfläche | UX-Muster, Backend neu |
| KI-Konversationen | REBUILD_FOR_NIM | Ownership und Löschung | neue Daten- und Privacyregeln |
| RAG-Retrieval | REBUILD_FOR_NIM | freigegebene Quellenrevisionen | Provenienz und Berechtigungen |
| Provideradapter | REBUILD_FOR_NIM | providerneutrale Interfaces | kein Vendor-Lock-in |
| Promptvorlagen | REBUILD_FOR_NIM | versionierte, evaluierte Prompts | keine ungeprüften Alt-Prompts |
| KI-Nutzungsmetriken | REBUILD_FOR_NIM | Kosten- und Qualitätsdaten ohne Volltext | Datenschutz |
| Feature Flags | ADAPT_PATTERN | registrybasiert und auditiert | Defaults und Scopes neu |
| Health-Endpoint | KEEP_AS_PRINCIPLE | sichere Liveness-/Readiness-Grenzen | keine sensiblen Details |
| strukturierte Logs | ADAPT_PATTERN | redigiert und korrelierbar | PII- und Secretfilter |
| Backup-Runbook | ADAPT_PATTERN | Restore-Beweis und RPO/RTO | NIM-Infrastruktur neu |
| Incident-Runbook | ADAPT_PATTERN | NIM-spezifische Eskalation | Rollen und Systeme neu |
| B2B-Tenants | DEFER | erst nach stabilem Einzelmandantenkern | Isolationsrisiko |
| White-Label | DEFER | spätere Produktentscheidung | erhöht Komplexität |
| Payment | DEFER | kein aktueller Kernbestandteil | Rechts- und Sicherheitsrisiko |
| Affiliate/Referral | REJECT | kein Lernplattformkern | unnötige Kopplung |
| Immobilien-CRM | REJECT | kein NIM-Kern | fachlich unpassend |
| Odoo/ERP-Integration | REJECT | keine frühe Fremdplattform | unnötige Betriebsgrenze |
| Express-Hauptruntime | REJECT | Next.js-Hauptruntime | widerspricht ADR-0001 |
| Vite-Hauptruntime | REJECT | Next.js-App Router | widerspricht Zielstack |
| dynamische DDL im Requestpfad | REJECT | versionierte Migrationen | Drift- und Race-Risiko |
| Schema-Fallbacks im Produktivpfad | REJECT | harter Migrationsvertrag | verdeckt Fehler |
| Railway-Produktionswerte | REJECT | eigener NIM-Betriebsvertrag | keine Konfigurationskopie |
| Design Tokens | ADAPT_PATTERN | NIM-eigene barrierearme Tokens | Kontrast und Sprache neu |
| Formularmuster | ADAPT_PATTERN | accessible Forms | Validierung und Copy neu |
| Tabellen- und Filtermuster | ADAPT_PATTERN | Admin-Arbeitslisten | mobile und A11y prüfen |
| Toast- und Fehlermeldungen | ADAPT_PATTERN | klare Recovery-Hinweise | keine internen Fehlerdetails |
| Exportfunktionen | DEFER | Datenschutz- und Zweckprüfung | Datenabflussrisiko |
| Löschfunktionen | REBUILD_FOR_NIM | Policy, Audit und Referenzschutz | rechtliche Anforderungen |
| Seed-Daten | REJECT | synthetische NIM-Fixtures | keine Spenderdaten |
| Testmuster | ADAPT_PATTERN | Policy-, DB- und Browsertests | Fixtures neu |
| Produktionsdaten | REJECT | niemals übertragen | Datenschutz und Geheimhaltung |

## 5. Verbotene Direkttransfers

Folgende Dinge dürfen nicht aus dem Spender übernommen werden:

- `.env`-Dateien oder Variablenwerte;
- Tokens, Schlüssel, Cookies oder Zugangsdaten;
- reale Nutzer-, Kunden-, Kurs- oder Zahlungsdaten;
- Railway-Projekt-, Service- oder Environment-Konfigurationen;
- produktive Datenbank-Dumps;
- Domain-, Stripe-, Mail- oder Storage-Zugangsdaten;
- alte Rollen-, Session- oder Berechtigungsannahmen;
- fachgebundene Claims und Rechtsformulierungen;
- Binary-Artefakte ohne Herkunfts- und Rechteprüfung;
- generierte Dateien ohne reproduzierbare Quelle.

## 6. Sicherheitsprüfung je Transfer

Jeder konkrete Transfer muss mindestens beantworten:

1. Welche Assets und Trust Boundaries entstehen?
2. Welche Rolle darf lesen, erstellen, ändern, freigeben oder löschen?
3. Wie wird Ownership serverseitig geprüft?
4. Welche negativen Tests beweisen die Abgrenzung?
5. Welche personenbezogenen Daten entstehen?
6. Welche Aufbewahrungs- und Löschregel gilt?
7. Welche Logs werden erzeugt und redigiert?
8. Welche Feature Flags halten den Slice standardmäßig aus?
9. Wie wird der Slice zurückgerollt?
10. Welche Spenderabhängigkeit wird entfernt oder ersetzt?

## 7. Barrierefreiheitsprüfung je UI-Muster

Ein UI-Muster wird nur übernommen, wenn mindestens geprüft sind:

- Tastaturbedienung;
- Fokusreihenfolge und sichtbarer Fokus;
- semantische Überschriften;
- zugängliche Namen und Beschreibungen;
- verständliche deutsche Sprache;
- Fehleridentifikation und Recovery;
- Kontrast und Zoom;
- reduzierte Bewegung;
- mobile Bedienbarkeit;
- Screenreader-Verhalten.

## 8. Geplante Reihenfolge

### Frühestens S51A, S51C und S52

- S51A: ausschließlich Package-, Boundary- und Teststrukturmuster;
- S51C: Health-, Readiness- und Loggingprinzipien;
- S52: Auth-, Session-, Rollen- und Ownership-Neubau;
- operative Runbookmuster erst im jeweils ausdrücklich freigegebenen Slice.

### Frühestens S53

- Adminnavigation;
- Revision, Review, Publish, Rollback;
- Quellen- und Medienverwaltung.

### Frühestens S54/S55

- Fortschritt;
- Fragen, Quiz und Wiederholung;
- pädagogische Auswertungen.

### Frühestens S56

- KI-Chat-UX;
- Konversationen, RAG, Zitate und Evaluation;
- Provider- und Kostenadapter.

### Zurückgestellt

- B2B;
- Multi-Tenant;
- White-Label;
- Exporte;
- Zertifikate.

### Ausgeschlossen im aktuellen Zielbild

- Immobilien-CRM;
- Payment und Affiliate;
- Express-/Vite-Hauptruntime;
- automatische Adminvergabe;
- dynamische DDL;
- direkte Spenderdatenübernahme.

## 9. Abnahmezustand

```text
S50B_R3_PACKAGE_APPROVED=YES
PREMIUM_USED_AS_PATTERN_LIBRARY=YES
WHOLESALE_CODE_COPY_ALLOWED=NO
DONOR_SECRETS_OR_DATA_ALLOWED=NO
AUTH_REQUIRES_REBUILD=YES
DATA_MODEL_REQUIRES_REBUILD=YES
ADMIN_REQUIRES_ADAPTATION=YES
AI_RAG_REQUIRES_REBUILD=YES
PAYMENT_IN_CURRENT_SCOPE=NO
B2B_IN_CURRENT_SCOPE=NO
PREMIUM_TRANSFER_LEDGER_REVIEWED=NO
HUMAN_TRANSFER_APPROVAL=NO
S51A_IMPLEMENTATION_AUTHORIZED=NO
```

Dieses Ledger erteilt keine Erlaubnis, Spendercode zu kopieren oder
Produktcode zu ändern. Jeder konkrete Transfer benötigt einen eigenen
read-only Audit, einen begrenzten Slice und eine ausdrückliche Freigabe.
