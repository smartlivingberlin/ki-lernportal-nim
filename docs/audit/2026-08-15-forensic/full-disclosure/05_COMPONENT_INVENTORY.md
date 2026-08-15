# 05 — COMPONENT INVENTORY

**Root:** `apps/web/src/components/` — **33** `.tsx` files.  
Import graph: all appear referenced from `page.tsx` or `/anmelden` (no obvious orphans). Classification: VERIFIED_CURRENT presence.

## Auth

| Component | Path | Client | Purpose | Key props/events |
|-----------|------|--------|---------|------------------|
| LoginForm | `auth/LoginForm.tsx` | yes | Staging login | submit → fetch login |

## Learning

| Component | Path | Client | Purpose | Notes |
|-----------|------|--------|---------|-------|
| CursorExplainLayer | `learning/CursorExplainLayer.tsx` | yes | Global help overlay | complex pointer/keyboard |
| ExplainCloud | `learning/ExplainCloud.tsx` | yes | Tip cloud UI | used by layer |
| FirstStartCoach | `learning/FirstStartCoach.tsx` | yes | 3-min onboarding | LS dismiss |
| GoalNavigation | `learning/GoalNavigation.tsx` | yes | Theme world picker | |
| GuidedStartSteps | `learning/GuidedStartSteps.tsx` | unmarked | Step list | |
| InlineGlossary | `learning/InlineGlossary.tsx` | yes | Term popovers | |
| InteractiveChallengeCard | `learning/InteractiveChallengeCard.tsx` | yes | MC + confidence | ephemeral confidence |
| KernwegCompletePanel | `learning/KernwegCompletePanel.tsx` | unmarked | Post-12-lesson | |
| LearningBlock | `learning/LearningBlock.tsx` | unmarked | Lesson text | |
| LearningWorkspaces | `learning/LearningWorkspaces.tsx` | yes | Local tools | |
| LessonPracticePanel | `learning/LessonPracticePanel.tsx` | yes | Per-lesson practice | |
| LessonWorkspace | `learning/LessonWorkspace.tsx` | yes | Active lesson chrome | share/complete/unsure |
| LiteracyPathPanel | `learning/LiteracyPathPanel.tsx` | yes | 60-min path | |
| LocalSearchPanel | `learning/LocalSearchPanel.tsx` | yes | Client search | |
| MicroLearningUnitView | `learning/MicroLearningUnitView.tsx` | yes | Micro unit | |
| MobileBottomNav | `learning/MobileBottomNav.tsx` | yes | Mobile hash nav | |
| ModelNavigator | `learning/ModelNavigator.tsx` | yes | Model cards | static |
| ModuleNavigation | `learning/ModuleNavigation.tsx` | yes | 12 lessons nav | |
| OnboardingRoutePanel | `learning/OnboardingRoutePanel.tsx` | yes | Route map | |
| PlannedPathsPanel | `learning/PlannedPathsPanel.tsx` | yes | Locked paths honesty | |
| PortalHero | `learning/PortalHero.tsx` | yes | Progress strip | |
| ProgressBackupPanel | `learning/ProgressBackupPanel.tsx` | yes | Export/import | |
| PromptLibraryPanel | `learning/PromptLibraryPanel.tsx` | yes | Copy prompts | |
| ResetProgressConfirm | `learning/ResetProgressConfirm.tsx` | yes | Inline confirm | not modal lib |
| ResourceCard | `learning/ResourceCard.tsx` | unmarked | External resource | |
| ScamModulePanel | `learning/ScamModulePanel.tsx` | yes | Scam literacy | |
| SelfCheckPanel | `learning/SelfCheckPanel.tsx` | yes | Placement quiz | |
| SimpleModePackHint | `learning/SimpleModePackHint.tsx` | yes | Simple mode hint | |
| SimpleModeToggle | `learning/SimpleModeToggle.tsx` | yes | Toggle | |
| SpacedReviewQueue | `learning/SpacedReviewQueue.tsx` | yes | Review SRS-like | |
| ThemeWorldTrack | `learning/ThemeWorldTrack.tsx` | yes | World units list | |
| TodayStartCard | `learning/TodayStartCard.tsx` | yes | Next step card | |

## packages/ui

| Export | Status |
|--------|--------|
| Color/typography/spacing/motion/radius tokens | VERIFIED_CURRENT |
| React UI primitives | ABSENT (comment: later slices) |

## Duplicates / vendor

| Item | Notes |
|------|-------|
| `apps/web/vendor/*` | Copies of auth/contracts/domain for Railway isolation — sync scripts required |
| Modal libraries (Radix Dialog etc.) | ABSENT — inline confirms used |

## Experimental / legacy UI

| Path | Status |
|------|--------|
| `apps/web/_prototype/portal-prototype.html` | HISTORICAL prototype |
| `apps/web/public/*.svg` (next/vercel defaults) | likely unused / leftover |
