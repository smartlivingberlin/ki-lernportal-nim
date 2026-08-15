# 11 — EVERY BUTTON / ACTION REGISTER (condensed master)

> Full narrative in `04_UI_INTERACTION_INVENTORY.md`. This table is the cross-check register of **consciously implemented** actions.

| Page | Element | Label (typical DE) | Component | Handler | Action | Destination/API | Data mutation | Status | Evidence |
|------|---------|-------------------|-----------|---------|--------|-----------------|---------------|--------|----------|
| `/` | Toggle | Einfache Ansicht | SimpleModeToggle | onClick | flip mode | — | `simple-mode:v1` | VERIFIED_CURRENT code | hook |
| `/` | Dismiss | Coach erledigt | FirstStartCoach | onClick | dismiss | — | `first-start-coach:v1` | VERIFIED_CURRENT code | component |
| `/` | Options | Antwort wählen | SelfCheckPanel | setAnswer | store | — | `self-check:v1` | VERIFIED_CURRENT code | |
| `/` | Button | Empfehlung anzeigen | SelfCheckPanel | showRecommendation | compute world | hash/world | LS | VERIFIED_CURRENT code | |
| `/` | Button | Selbstcheck zurücksetzen | SelfCheckPanel | confirm | clear | — | LS | VERIFIED_CURRENT code | |
| `/` | Buttons | Station erledigt | LiteracyPathPanel | toggle | mark | — | `literacy-path:v1` | VERIFIED_CURRENT code | |
| `/` | Buttons | Karte bewerten | SpacedReviewQueue | answer | schedule | — | `spaced-review:v1` | VERIFIED_CURRENT code | |
| `/` | Button | Antwort zeigen | SpacedReviewQueue | setRevealed | UI | — | ephemeral | VERIFIED_CURRENT code | |
| `/` | Tiles | Welt wählen | GoalNavigation | onSelectWorld | select+scroll | `#themenwelt` | React state | VERIFIED_CURRENT code | |
| `/` | Button | Einheit erledigt | MicroLearningUnitView | onToggleCompleted | toggle | — | `micro-progress:v1` | VERIFIED_CURRENT code | |
| `/` | Radios | Einschätzung | MicroLearningUnitView | setConfidence | UI | — | ephemeral | VERIFIED_CURRENT code | |
| `/` | Button | Lektion öffnen | Micro/Module/Planned | onOpenLesson | select | `#pfad` | React | VERIFIED_CURRENT code | |
| `/` | Button | Erledigt | LessonWorkspace | onToggleCompleted | toggle | — | `local-progress:v1` | VERIFIED_CURRENT code | |
| `/` | Button | Noch unsicher | LessonWorkspace | onToggleUnsure | toggle | — | `lesson-confidence:v1` | VERIFIED_CURRENT code | |
| `/` | Button | Link kopieren | LessonWorkspace | copyLessonLink | clipboard | — | none | VERIFIED_CURRENT code + test | |
| `/` | Button | Nächste Lektion | LessonWorkspace | onOpenLesson | select | — | React | VERIFIED_CURRENT code | |
| `/` | Options | Challenge wählen | InteractiveChallengeCard | choose | feedback | — | ephemeral | VERIFIED_CURRENT code | |
| `/` | Radios | Challenge confidence | InteractiveChallengeCard | setLevel | UI | — | ephemeral | VERIFIED_CURRENT code | |
| `/` | Button | Export | ProgressBackupPanel | handleExport | download | file | read LS | VERIFIED_CURRENT test PASS | |
| `/` | Button | Import | ProgressBackupPanel | file+confirm | apply | — | write LS | VERIFIED_CURRENT test PASS | |
| `/` | Button | Reset Fortschritt | ResetProgressConfirm | onConfirm | clear keys | — | LS clear | VERIFIED_CURRENT code | |
| `/` | Nav | Mobile tabs | MobileBottomNav | navigatePortalHash | scroll/focus | hash | URL | VERIFIED_CURRENT code | |
| `/` | Buttons | Prompt kopieren | PromptLibraryPanel | clipboard | copy | — | none | VERIFIED_CURRENT code | |
| `/` | Input | Suche | LocalSearchPanel | onChange | filter | — | ephemeral | VERIFIED_CURRENT code | |
| `/` | Help | Explain tips | CursorExplainLayer | pointer/key | show tip | hash links | ephemeral | VERIFIED_CURRENT code | |
| `/anmelden` | Submit | Anmelden | LoginForm | onSubmit | POST | `/api/auth/login` | cookie if ok | PARTIAL (prod disabled; staging success NOT TESTED) | |
| `/kontakt` | mailto | E-Mail | static `<a>` | navigate | mail client | — | none | VERIFIED_CURRENT | |
| Legal | Links | Impressum/Datenschutz | static | navigate | pages | — | none | VERIFIED_CURRENT | |

**No-op / absent:** Admin save, AI send, payment checkout, analytics consent save, password reset submit — **ABSENT**.
