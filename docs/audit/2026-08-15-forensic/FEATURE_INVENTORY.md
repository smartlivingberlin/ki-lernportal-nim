# FEATURE INVENTORY — KI-Lernportal NIM

**Audit:** 2026-08-15T05:50:00Z · Commit `5c489c2d1acf0d3a5e63a26f4e1a1bd9b9c3f1e0`  
**Statuslegende:** vollständig | teilweise | Mock/Demo | nur UI | nur Backend | geplant | deaktiviert | unbekannt

| Funktion | Beschreibung | Nutzergruppe | Status | Frontend | Backend | Datenhaltung | Test | Deployment-verifiziert | Beleg |
| -------- | ------------ | ------------ | ------ | -------- | ------- | ------------ | ---- | ---------------------- | ----- |
| Startseite / Einstieg | Hero, Guided Start, Next-Step | Besucher | vollständig (client) | ja | nein | localStorage | Gates/Playwright lokal | ja (HTTP 200) | `apps/web/src/app/page.tsx` |
| Lektionen (12) | Markdown-Lektionen | Lernende | vollständig | ja | nein | Content-Repo | Content-Gates | ja | `content/lessons/` |
| Lernpfade / Kernweg | Sequenzierte Pfade | Lernende | vollständig | ja | nein | static + LS | Gates | ja | `apps/web/src/data/` |
| Themenwelten | Entdeckungspfad | Lernende | vollständig | ja | nein | static + LS | content-wave-c | ja | `theme-worlds.ts` |
| Glossar | ~17 Begriffe | Lernende | vollständig | ja | nein | static | Gates | ja | `glossary.ts` |
| Modellkatalog | Statische NIM-inspirierte Kategorien | Lernende | vollständig (statisch) | ja | nein | static | — | ja | Katalog-Seiten |
| Self-Check Übungen | 36 Fragen / 12 Exercises | Lernende | vollständig (client) | ja | nein | localStorage | Unit/UI | TEILWEISE (Code+Demo) | `SelfCheckPanel` |
| Challenges | Interaktive Challenges | Lernende | vollständig (client) | ja | nein | localStorage | lokal | TEILWEISE | `InteractiveChallengeCard` |
| Micro-Learning | Kurze Einheiten | Lernende | vollständig (client) | ja | nein | localStorage | lokal | TEILWEISE | `MicroLearningUnitView` |
| Teach-Back | Erklärung in eigenen Worten | Lernende | vollständig (client) | ja | nein | localStorage | lokal | TEILWEISE | Teachback-Komponenten |
| Spaced Review | Wiederholungsqueue | Lernende | vollständig (client) | ja | nein | localStorage | lokal | TEILWEISE | `SpacedReviewQueue` |
| Fortschritt speichern | Browser localStorage | Lernende | vollständig (client) | ja | nein | localStorage | lokal | TEILWEISE | Progress-Hooks |
| Fortschritt Export/Import | Backup JSON | Lernende | vollständig (client) | ja | nein | Datei+LS | lokal | TEILWEISE | `ProgressBackupPanel` |
| Fortschritt Reset | Mit Bestätigung | Lernende | vollständig (client) | ja | nein | localStorage | lokal | TEILWEISE | `ResetProgressConfirm` |
| Lesson Share-Link | URL kopieren | Lernende | vollständig (client) | ja | nein | — | lokal | TEILWEISE | `lesson-share-url.ts` |
| Next-Step / Unsicher | Adaptive Empfehlung | Lernende | vollständig (client) | ja | nein | LS confidence | lokal | TEILWEISE | `next-step.ts` |
| Lokale Suche | Client-Suche Content | Lernende | vollständig (client) | ja | nein | static index | lokal | TEILWEISE | Search-Komponenten |
| Hilfe / Layperson Help | Erklärtexte | Lernende | vollständig | ja | nein | static | Gates | TEILWEISE | Help-System |
| Datenschutz-Seite | Statische Infos | alle | teilweise (Keys unvollständig) | ja | nein | — | — | ja | Datenschutz-Route |
| Impressum | Statische Seite | alle | IMPLEMENTIERT | ja | nein | — | — | UNBEKANNT Inhalt | Legal-Routen |
| `/version` `/live` `/ready` `/health` | Ops | Betreiber | vollständig | — | ja | Flags/Env | Gates | ja HTTP | Route Handlers |
| Staging Login/Logout/Me | Session Auth | Test/Owner | nur Staging aktiv | ja | ja | Cookie+Memory/Env | Unit | TEILWEISE HTTP | `packages/auth`, auth routes |
| Production Auth | Gleiche API | — | **deaktiviert** | UI ggf. | 403 | — | — | ja 403 | FEATURE_DISABLED |
| Server Progress Sync | Cloud-Fortschritt | — | **geplant / nicht** | — | — | — | — | nein | Docs S54 |
| Admin CMS | Publishing | Admin | **Skeleton/leer** | — | — | — | — | nein | `packages/admin` empty |
| Live AI/RAG | Chat/Answers | Lernende | **nicht** | — | — | — | — | nein | `packages/ai-core` empty |
| MySQL Product DB | Persistenz | System | Adapter+Schema lokal; Live **not_configured** | — | packages/db | MySQL optional | Fake-Tests | `/ready` | drizzle |
| Analytics | Tracking | Betreiber | **nicht** | — | — | — | — | nein | keine SDK |
| Payment | Bezahlung | — | **nicht** | — | — | — | — | nein | keine Stripe etc. |
| PWA Install | Installierbar | — | **unbekannt/teilweise** | Manifest? | — | — | — | prüfen | ggf. Metadata |
| SEO Index | Google | — | **deaktiviert** | robots Disallow | — | — | — | ja | `robots.ts` |

## User Flows (Kurz)

### A. Anonymer Lernfluss (Production) — VERIFIZIERT als Design

1. Start `/` → Guided Start / Next Step  
2. Lektion öffnen → lesen → Self-Check / Challenge  
3. Fortschritt in localStorage  
4. Optional Backup exportieren  
5. Kein Login erforderlich  

**Unterbrochen:** Gerätewechsel ohne Backup → Fortschritt weg.

### B. Staging Auth (Code vorhanden, Login mit Secrets nicht ausgeführt)

1. `/anmelden` → POST login  
2. Session-Cookie → `/api/.../me`  
3. Logout  

**Production:** Flow absichtlich unterbrochen (403).

### C. Admin / Publishing — NICHT VORHANDEN als Produktflow

### D. AI Chat — NICHT VORHANDEN
