# S51C-OPS-A – Betriebsfundament Scope-Lock und Implementierung

**Status:** Scope-Lock mit schmaler, freigegebener Implementierung.
**Parent:** `docs/architecture/OBSERVABILITY_SLO_CONTRACT.md`, `docs/architecture/MVP_SCOPE.md`, Issue #94  
**Baseline:** `65ebac18673497ba64ed53e2afdf2ebe60c03437`  
**Arbeitsbranch:** `cursor/s51c-ops-a-foundation-b554`

## 1. Zweck

S51C-OPS-A liefert das erste Betriebsfundament:

- getrennte Liveness-/Readiness-/Version-Verträge;
- Feature Flags mit sicheren Defaultwerten (`false`);
- providerneutrale, redigierte Betriebslog-Felder;
- Correlation-ID-Hilfen;
- Web-Routen `/live`, `/ready`, `/version` ohne Secrets;
- bestehendes Railway-`/health` bleibt unverändert.

## 2. Exakter Dateiscope

```text
ADD    docs/architecture/S51C_OPS_A_OPERATIONS_FOUNDATION_SCOPE.md
ADD    packages/contracts/src/operations.ts
ADD    packages/contracts/src/operations.test.ts
MODIFY packages/contracts/src/index.ts
MODIFY packages/contracts/README.md
ADD    apps/web/src/app/live/route.ts
ADD    apps/web/src/app/ready/route.ts
ADD    apps/web/src/app/version/route.ts
MODIFY package.json
MODIFY .github/workflows/ci.yml
MODIFY AGENTS.md
MODIFY docs/00_PROJECT_STATUS.md
MODIFY docs/architecture/MVP_SCOPE.md
```

`apps/web` darf **keine** neue Workspace-Dependency auf `@ki-lernportal-nim/*`
erhalten (Railway Production Root Directory `apps/web` ohne pnpm-Workspace).
Die Web-Routen bleiben daher selbstständig und spiegeln die Contract-Formen.

## 3. Verträge

### 3.1 `/live`

```text
status=live
```

Nur Prozess-Erreichbarkeit. Keine DB, keine Flags, keine Secrets, keine Env-Dumps.

### 3.2 `/ready`

```text
status=ready|not_ready
checks[]={ name, status=pass|fail|not_configured }
```

Für die Konzeptdemo gilt:

```text
database = not_configured
database_readiness_required = false (Feature Flag Default)
=> overall status=ready
```

Sobald `database_readiness_required=true` und die DB nicht konfiguriert oder
fehlgeschlagen ist, muss `status=not_ready` folgen. Keine echte
Datenbankverbindung in diesem Slice.

### 3.3 `/version`

```text
service=web
version
build_sha (null oder verkürzt, nie Secret)
environment=concept_demo|local|unknown
```

Keine internen URLs, keine Verbindungsstrings, keine vollständigen Env-Dumps.

### 3.4 Feature Flags

Kontrollierte Allowlist, Defaults alle `false`:

```text
auth_runtime
admin_runtime
ai_rag_runtime
database_readiness_required
```

Unbekannte Flag-Namen werden abgewiesen.

### 3.5 Redigierte Logs

Erlaubte Felder:

```text
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
```

Verbotene Inhalte (werden entfernt oder maskiert): Passwörter, Tokens,
Secrets, E-Mails, vollständige Prompts/Antworten, DB-URLs, Stacktraces in
Nutzerantworten.

## 4. Ausgeschlossen

- `/metrics` öffentlich
- Monitoring-Provider-Auswahl
- echte DB-/Migrations-Readinessprüfung
- Auth-/Session-Runtime
- Railway-Config-Änderungen
- Production-Deploy
- Autodeploy-Änderung
- Workspace-Dependency in `apps/web`

## 5. Abnahme

```text
S51C_OPS_A_SCOPE_AUTHORIZED=YES
S51C_OPS_A_IMPLEMENTATION_AUTHORIZED=YES
LIVE_READY_VERSION_CONTRACTS=YES
FEATURE_FLAGS_SAFE_DEFAULT_FALSE=YES
REDACTED_LOG_HELPERS=YES
RAILWAY_HEALTH_UNCHANGED=YES
WEB_WORKSPACE_DEPENDENCY_ADDED=NO
DATABASE_CONNECTION_AUTHORIZED=NO
MONITORING_PROVIDER_SELECTED=NO
PUBLIC_METRICS_EXPOSED=NO
```

## 6. Verifikation

```text
pnpm test:s51c-ops-a-operations
pnpm packages:boundaries
# CI probes /live /ready /version after local web server start
```
