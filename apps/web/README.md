# KI-Lernportal NIM - Frontend

Dies ist das Next.js-Frontend für das KI-Lernportal NIM.

## Voraussetzungen

- [pnpm](https://pnpm.io/) (v10 oder höher)
- Node.js (v18 oder höher)

## Entwicklung

Um den Entwicklungsserver zu starten:

```bash
# Vom Root-Verzeichnis aus:
pnpm --filter web dev

# Oder direkt in apps/web:
pnpm dev
```

## Verifizierung

Führen Sie die folgenden Befehle aus, um sicherzustellen, dass die Anwendung korrekt funktioniert:

```bash
# Installation der Abhängigkeiten
pnpm install

# Build der Anwendung
pnpm --filter web build

# Linting
pnpm --filter web lint
```

## Struktur

- `src/app`: Next.js App Router (Landing Page, Layout)
- `_prototype`: Referenz-HTML-Prototyp (nicht für Produktion)
- `public`: Statische Assets
