# Content Schema v2 — Microlearning & Interaktion

**Status:** Schema v2 dokumentiert; Themenwelt „KI ohne Angst“ mit 10 Micro-Einheiten befüllt  
**Stand:** 10. August 2026  
**Autorisierung:** Design-/Content-Foundation-Slice (kein S51B-C, kein Deploy)

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
sichtbar, damit Lernende verstehen *warum* geübt wird.

## Migrationspfad

- Bestehende 12 Lektionen bleiben kompatibel.
- Neue Welten und Challenges wachsen schrittweise.
- Serverseitige Persistenz erst nach S51B-C / S52-Freigaben.

## Nicht autorisiert

- produktive Publish-Pipeline
- ungeprüfte Web-Autoupdates
- Schema-/Migrationscode in `packages/db`
