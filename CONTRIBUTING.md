# Beitragen zum KI-Lernportal

## Grundprinzip

Änderungen erfolgen ausschließlich über eine eigene Branch und einen Pull
Request. Direkte Änderungen an `main` sind nicht vorgesehen.

## Sicherheitsregeln

Beiträge dürfen insbesondere nicht enthalten:

- Passwörter, Tokens, API-Schlüssel oder Cookies;
- echte personenbezogene Daten;
- fremde vertrauliche Dokumente;
- nicht nachvollziehbare Binärdateien;
- neue Git- oder Tarball-Unterabhängigkeiten;
- ungepinnte GitHub Actions;
- `pull_request_target` für die Ausführung von PR-Code;
- Schreibrechte für den normalen Prüfworkflow;
- Deploy-, Zahlungs- oder Produktionsaktivierungen ohne separate Freigabe.

GitHub Actions müssen auf vollständige Commit-SHAs gepinnt sein.

## Abhängigkeiten

Das Projekt verwendet ausschließlich:

- Node.js `22.22.1`;
- pnpm `11.13.0`;
- `pnpm-lock.yaml` als einziges Lockfile.

Keine anderen Paketmanager-Lockfiles hinzufügen.

Neue oder aktualisierte Abhängigkeiten benötigen:

1. eine nachvollziehbare Begründung;
2. einen kontrollierten Lockfile-Diff;
3. `pnpm audit`;
4. `pnpm audit --prod`;
5. bestandene Supply-Chain-Prüfungen.

## Lokale Mindestprüfungen

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm governance:check
pnpm supply-chain:check
pnpm audit
pnpm audit --prod
pnpm --filter web lint
pnpm --filter web exec tsc --noEmit
pnpm content:check
pnpm source:check
pnpm --filter web build
pnpm --filter web verify:standalone-assets
```

## Pull Requests

Pull Requests sollen:

- zunächst als Draft erstellt werden;
- einen klar begrenzten Scope besitzen;
- die Basisbranch und Abhängigkeiten nennen;
- Tests und Ergebnisse dokumentieren;
- keine sachfremden Änderungen enthalten;
- keine Merge-, Deploy- oder Tag-Freigabe behaupten.

Ein erfolgreicher CI-Lauf ist erforderlich, aber allein keine Merge-Freigabe.

## Projektgrenzen

- Kein Auto-Merge.
- Kein Deploy ohne ausdrückliche Freigabe.
- Kein Safety-Tag ohne ausdrückliche Freigabe.
- Keine Zahlungsaktivierung ohne ausdrückliche Freigabe.

## Commits

Commits sollen klein, nachvollziehbar und thematisch geschlossen sein.

Beispiel:

```text
fix(security): harden pull request workflow
```

## Rechtliche und inhaltliche Verantwortung

Nur Inhalte beitragen, für die ausreichende Nutzungsrechte bestehen. Quellen,
Behauptungen und fachliche Aussagen müssen nachvollziehbar und überprüfbar sein.
