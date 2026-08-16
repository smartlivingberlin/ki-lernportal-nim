# Content Schema v2 — Microlearning & Interaktion

**Status:** Schema v2 dokumentiert; alle zehn Themenwelten aktiv mit Micro-Einheiten; lokale Werkzeuge (Prompt, Privacy, Quellen, Modell-Kompass)  
**Stand:** 10. August 2026  
**Autorisierung:** Design-/Content-Foundation inkl. Agency-Freigabe; kein S51B-C Schema, keine produktive KI-Runtime

## Zweck

Einheitliches Schema für Micro-Lerneinheiten, Themenwelten, Lernmethoden und
interaktive Challenges — skalierbar auf 80–120 Einheiten, ohne Big-Bang-Rewrite.

## Themenwelt

Felder (siehe `ThemeWorld` in `apps/web/src/data/types.ts`):

- `id`, `title`, `shortLabel`, `goalPrompt`, `description`
- `audienceLevel` 0–5
- `estimatedUnits`, `status`, `accent`
- `starterLessonId`, `learningOutcomes`

## MicroLearningUnitV2 (Zielschema)

1. Warum nützlich?  
2. In einem Satz  
3. Alltag-/Berufsbeispiel  
4. Schritt-für-Schritt  
5. Mach es selbst  
6. Beispielweg  
7. Warum funktioniert das?  
8. Typischer Fehler  
9. Sicherheits-/Qualitätshinweis  
10. Retrieval-Fragen  
11. Teach-back  
12. Quelle + `lastReviewed`

## InteractiveChallenge

- Szenario in Alltagssprache
- 3 Optionen mit erklärendem Feedback
- Teach-back-Prompt
- optionales Confidence-Rating
- Verweis auf `methodIds` und optional `lessonId` / `worldId`

## Lernmethoden-Katalog

Seed in `apps/web/src/data/learning-methods.ts` — UI zeigt die Methoden klar
sichtbar, damit Lernende verstehen *warum* geübt wird. Jede Methode trägt
`sourceIds` auf freigegebene `publicSources` (Quellenparität).

## Quellenparität (Wegweiser)

Claim-bearing surfaces (Lektionen, Micro-Einheiten, Review-Karten,
Lernmethoden, Glossar, Challenges) referenzieren nur freigegebene
`publicSources` und rendern sie mit `data-source-id` / Publisher /
Prüfdatum. Gate: `pnpm source:check` + `pnpm test:quellenparitaet`.

## Medien (M0/M1)

Optionale Illustrationen und spätere Clips folgen
[`MEDIA_OPEN_SOURCE_STACK.md`](MEDIA_OPEN_SOURCE_STACK.md):

- `MediaAsset` im Manifest (`apps/web/src/data/media-manifest.ts`)
- Lektionen: optionales `mediaIds: string[]`
- UI: `MediaFigure` (Alt-Text, Lizenzhinweis, Reduced-Motion)
- Open-Source / ohne Paid-SaaS; Live-LLM und Live-Fotoreal-Avatar gesperrt
- Gate: `pnpm test:media-m0` / `pnpm test:media-m2` / `pnpm test:media-m3`
- M2: `MediaVideoPlayer`, Captions (`.vtt`), Poster, kein Autoplay-Ton
- M3: `GuideMascot` im Einstiegs-Coach (scripted, kein Chat)

Medien **ersetzen keine Quellenangaben** und begründen keine Claims allein.

## Migrationspfad

- Bestehende 12 Lektionen bleiben kompatibel.
- Neue Welten und Challenges wachsen schrittweise.
- Serverseitige Persistenz erst nach S51B-C / S52-Freigaben.

## Nicht autorisiert

- produktive Publish-Pipeline
- ungeprüfte Web-Autoupdates
- Schema-/Migrationscode in `packages/db`
- Paid-Media-SaaS, Live-LLM-Tutor, Live-Fotoreal-Avatar-Runtime (siehe Media-Stack)
