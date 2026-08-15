# 15 — SEO, ACCESSIBILITY, PERFORMANCE, DESIGN, ASSETS

## SEO

| Item | Status | Evidence |
|------|--------|----------|
| robots.txt | `Disallow: /` | VERIFIED_CURRENT |
| meta robots | noindex/nofollow (layout + pages) | VERIFIED_CURRENT sample |
| Sitemap | ABSENT | |
| Canonicals | not systematically present | PARTIAL/ABSENT |
| OpenGraph/Twitter | not fully inventoried; concept-demo noindex | PARTIAL |
| Indexability | intentionally off | VERIFIED_CURRENT |
| Structured data | ABSENT found | |

## Accessibility

| Item | Status |
|------|--------|
| Semantic landmarks / headings | PARTIAL — present in components |
| Labels on login | VERIFIED_CURRENT |
| Focus management hash nav | VERIFIED_CURRENT code |
| ARIA in help layer | PARTIAL |
| axe Playwright smokes | EXISTS in CI — NOT re-run full this pass |
| Contrast | design tokens claim AA-oriented — NOT measured |
| Formal WCAG 2.2 AA | UNKNOWN / NOT CERTIFIED |

## Performance

| Item | Status |
|------|--------|
| Quantitative LCP/INP/bundle | **NOT MEASURED** this pass |
| Next cache headers on `/` | `x-nextjs-cache: HIT` observed | VERIFIED_CURRENT |
| Lazy micro-units (5 worlds) | dynamic import | VERIFIED_CURRENT code |
| Images | few product images; SVG leftovers in public | PARTIAL |

## Design system

| Token area | Source | Notes |
|------------|--------|-------|
| Colors | `packages/ui` + CSS vars in web | warm teal/coral; no gray chrome intent |
| Fonts | Fraunces (display), Source Sans 3 (body) | layout |
| Spacing/radius/motion | tokens | reduced-motion flag in tokens |
| Dark mode | ABSENT as product theme | |
| React primitives in ui pkg | ABSENT | tokens only |

## Assets

| Asset | Status |
|-------|--------|
| `public/*.svg` Next defaults | likely unused |
| `_prototype/portal-prototype.html` | historical |
| Content images/video/audio lessons | largely text-first ABSENT rich media library |
