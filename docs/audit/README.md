# Audits & Handoffs

Unabhängige IST-Stand- und Due-Diligence-Pakete (read-only).  
Für den **aktuellen Produktstatus** bleiben `docs/00_PROJECT_STATUS.md` und die Architektur-Docs maßgeblich; Audits ergänzen sie mit Evidence-Tags.

## Aktuelles Paket

| Datum | Ordner | Einstieg |
|-------|--------|----------|
| 2026-08-15 | [`2026-08-15-forensic/`](./2026-08-15-forensic/) | [`PROJECT_STATE_HANDOFF.md`](./2026-08-15-forensic/PROJECT_STATE_HANDOFF.md) |
| 2026-08-15 | [`2026-08-15-forensic/full-disclosure/`](./2026-08-15-forensic/full-disclosure/) | **External AI master:** [`21_EXTERNAL_AI_MASTER_HANDOFF.md`](./2026-08-15-forensic/full-disclosure/21_EXTERNAL_AI_MASTER_HANDOFF.md) · [`22_…json`](./2026-08-15-forensic/full-disclosure/22_EXTERNAL_AI_MASTER_HANDOFF.json) |

The full-disclosure pass **re-verified** the lighter forensic pack and recorded CONFLICTS (e.g. 36 vs 38 practice checkQuestions).

## Zugriff

**In dieser Cloud-/Cursor-Arbeitskopie (Branch mit dem Audit):**

```text
docs/audit/2026-08-15-forensic/
```

**Am Laptop** (nach Checkout des Branches oder nach Merge in `main`):

```bash
git fetch origin
git checkout cursor/forensic-audit-handoff-b554   # oder: git pull origin main nach Merge
# dann im Editor öffnen:
# docs/audit/2026-08-15-forensic/PROJECT_STATE_HANDOFF.md
```

**Ohne lokalen Checkout** (GitHub, PR #212 bzw. nach Merge auf `main`):

- PR: https://github.com/smartlivingberlin/ki-lernportal-nim/pull/212
- Ordner auf dem Branch:  
  https://github.com/smartlivingberlin/ki-lernportal-nim/tree/cursor/forensic-audit-handoff-b554/docs/audit/2026-08-15-forensic

**Andere Modelle / Agenten:** diese Pfade im Prompt nennen oder `PROJECT_STATE_HANDOFF.md` / `.json` direkt einlesen — kein Chat-Verlauf nötig.
