# S51C-B1A – Domain-Implementierungs-Scope-Lock

**Status:** Implementierung auf `main` integriert (PR #102). Dieser Stand
dokumentiert den exakten Dateiscope, die Abnahmekriterien und den
Autorisierungszustand nachträglich als verbindliche Gate-Quelle.

**Parent:** `docs/architecture/S51C_B1_DOMAIN_CONTRACT_TYPES_SCOPE.md`, Issue #94  
**Baseline bei Integration:** `588cbadce7803825b464170a9d402b6c0f6c7d62`  
**Gate-/CI-Nachzug:** `cursor/s51c-b1a-ci-gate-docs-b554`

## 1. Zweck

S51C-B1A liefert das kanonische, infrastrukturfreie Pilot-Domain-Vokabular und
reine fachliche Regeln in `packages/domain`.

Keine Persistenz, kein Transport, kein Framework, keine Datenbank, keine Auth-
oder Web-Runtime, kein Railway und kein Deployment.

## 2. Exakter Dateiscope der Implementierung

```text
MODIFY packages/domain/README.md
MODIFY packages/domain/src/index.ts
ADD    packages/domain/src/pilot-domain.ts
ADD    packages/domain/src/pilot-domain.test.ts
```

Gate-/CI-Nachzug darf zusätzlich ändern:

```text
MODIFY package.json
MODIFY .github/workflows/ci.yml
MODIFY AGENTS.md
MODIFY docs/00_PROJECT_STATUS.md
MODIFY docs/architecture/MVP_SCOPE.md
MODIFY docs/architecture/S51C_B1_DOMAIN_CONTRACT_TYPES_SCOPE.md
ADD    docs/architecture/S51C_B1A_IMPLEMENTATION_SCOPE.md
```

## 3. Inhaltliche Grenze

Erlaubt und geliefert:

- Statusfamilien und Allowlists gemäß B1-Scope;
- erlaubte und verbotene Statusübergänge;
- terminale Zustände;
- Privacy-Retry-Schutz für `failed -> processing`;
- Assessment-Antwort- und Finalisierungsinvarianten;
- reine Guards und Prädikate;
- exhaustive Unit-Tests ohne Netzwerk oder Datenbank.

Verboten und nicht enthalten:

- Imports aus `packages/contracts` oder anderen Workspace-Packages;
- Schema, SQL, Migrationen, Seeds, Queries;
- Auth-/Session-/Web-Runtime;
- Railway, Staging, Production;
- konkrete Retention-/Löschfristen;
- S51C-B1B Contract-Typen.

## 4. Abhängigkeit

```text
packages/domain -> (keine Workspace-Packages)
packages/contracts -> packages/domain = erlaubt
```

## 5. Abnahme

```text
S51C_B1A_IMPLEMENTATION_AUTHORIZED=YES
S51C_B1A_INTEGRATED_TO_MAIN=YES
S51C_B1A_IMPLEMENTATION_PR_NUMBER=102
S51C_B1A_IMPLEMENTATION_MERGE_COMMIT=588cbadce7803825b464170a9d402b6c0f6c7d62
DOMAIN_PACKAGE_INFRASTRUCTURE_FREE=YES
CONTRACTS_DEPENDENCY_ABSENT=YES
STATIC_UNIT_TESTS_PRESENT=YES
DATABASE_ACCESSED=NO
AUTH_RUNTIME_CHANGED=NO
WEB_CHANGED=NO
RAILWAY_CHANGED=NO
PRODUCTION_CHANGED=NO
```

CI-Nachweis nach Gate-Nachzug:

```text
pnpm test:s51c-b1a-pilot-domain
```

## 6. Nächster Slice

S51C-B1B (Contract-Typen) ist code-seitig über PR #104 vorhanden und benötigt
einen eigenen Gate-/CI-Nachzug. Betriebsfundament (Health/Readiness/Flags/Logs)
bleibt separat freizugeben.
