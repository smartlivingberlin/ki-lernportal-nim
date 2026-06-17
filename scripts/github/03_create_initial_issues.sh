#!/usr/bin/env bash
set -euo pipefail
set +H

REPO="smartlivingberlin/ki-lernportal-nim"

cat > /tmp/ki_nim_issues.tsv <<'TSV'
Jules read-only architecture audit	Read the repository and produce a structured architecture audit. Do not modify files. Do not create a PR. Deliver status, missing pieces, MVP scope, risks, first 10 issues and phased roadmap.
Create Next.js frontend baseline	Create apps/web as Next.js + TypeScript + Tailwind. Preserve static prototype as reference. No paid services, no secrets.
Convert static prototype into React components	Turn apps/web/_prototype/portal-prototype.html into accessible reusable React components.
Add beginner onboarding flow	Ask simple questions about confidence, goal, digital skill level, learning pace and preferred language style. Store locally only.
Add model catalog data layer	Create local TypeScript model catalog categories. Do not claim all 147 NVIDIA models were fully validated.
Add glossary and jargon translator UI	Create beginner-friendly glossary, tooltips and simple-language explanations.
Add admin dashboard skeleton	Create sidebar skeleton: Overview, Users, Courses, Model Catalog, Glossary, RAG Documents, Trend Watcher, Monetization, Compliance, Settings.
Add Playwright and accessibility tests	Test homepage, navigation, model search, onboarding and axe accessibility smoke test.
Add FastAPI API skeleton	Create services/api with /health, config and basic structure.
Add AI/RAG service skeleton	Create services/ai with /health and Qdrant-ready skeleton. No paid model calls.
TSV

while IFS=$'\t' read -r title body; do
  gh issue create --repo "$REPO" --title "$title" --body "$body" || true
done < /tmp/ki_nim_issues.tsv
