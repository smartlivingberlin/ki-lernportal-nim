# 19 — RISK, GAP, UNKNOWN REGISTER

## Gaps (recommendations only — NOT implemented)

### P0
| Gap | Evidence | Impact | Area | Dependency | Recommendation |
|-----|----------|--------|------|------------|----------------|
| Market as SaaS/AI-runtime | empty ai-core; auth off | Reputation/legal | Product | — | Honesty-only claims |
| Flip Prod AUTH without DB sessions | memory auth + not_configured | Account chaos/security | Auth | Freigaben | Keep OFF |

### P1
| Gap | Evidence | Impact | Recommendation |
|-----|----------|--------|----------------|
| Privacy copy incomplete | Datenschutz vs LS/backup | Compliance risk | Sync keys + login wording |
| No CSP | headers inventory | XSS defense in depth | Add carefully |
| No APM | no Sentry | Blind incidents | Minimal monitoring |
| Staging auth hardening | no rate limit | Brute force | Limits + secret ops |
| Docs SHA drift | 00 vs live | Operator confusion | Docs-sync after merge |

### P2
| Gap | Impact | Recommendation |
|-----|--------|----------------|
| Branch clutter | noise | prune policy |
| a11y beyond smokes | inclusion | formal checklist |
| Public asset cleanup | hygiene | remove unused SVGs |
| Measure performance | unknown UX cost | Lighthouse budget |

### P3
Server progress, admin CMS, AI/RAG, monetization — after explicit freigaben.

## Unknowns (mandatory)

- Railway dashboard settings, costs, exact env values, autodeploy toggle  
- Whether Staging bootstrap user currently exists / password valid  
- Full CI green for every commit on audit branch  
- Formal WCAG / pen-test / legal opinions  
- Quantitative Core Web Vitals  
- Custom domains  
- Whether all 165 remote branches abandoned  
- Residual XSS if any `dangerouslySetInnerHTML` paths missed (spot-check recommended)  
- Complete dependency CVE list at this timestamp  

## Adversarial second pass — where prior audit could be wrong

| Suspicion | Outcome |
|-----------|---------|
| Lesson count ≠ 12 | Confirmed 12 |
| “36 questions” exact | **Wrong if = checkQuestions** (38) |
| Me endpoint | Confirmed absent |
| DB secretly live | `/ready` still not_configured both envs |
| AI secretly wired | ai-core empty; no SDK |
| Auth prod secretly on | FEATURE_DISABLED confirmed |
| Content thinner than claimed | Actually **richer** (116 micros) than short audits implied |
| AGENTS all NO gates | Repo AGENTS advanced — cloud prompt stale |

## Completeness matrix

| Area | Investigated | Evidence | Runtime verified | Unknowns | File |
|------|--------------|----------|------------------|----------|------|
| UI | Y | code | partial HTTP | device lab | 04,05 |
| Routes | Y | app router | Y HTTP | — | 03 |
| Interactions | Y | components | limited | every click | 04,04b |
| Content | Y | data/*.ts | counts | pedagogy study | 06 |
| Components | Y | 33 files | — | — | 05 |
| Backend | Y | routes/packages | ops+auth probe | logout success | 08 |
| API | Y | full list short | Y | — | 08 |
| DB | Y | schema | live unused | local docker | 09 |
| Storage | Y | LS keys | — | — | 09 |
| Auth | Y | packages+HTTP | partial | bootstrap login | 10 |
| Authz | Y | roles unused on content | — | — | 10 |
| Security | Y | headers+review | headers Y | pen-test | 10 |
| AI | Y | empty | n/a | — | 11 |
| Integrations | Y | search | Railway Y | costs | 11 |
| Infra | Y | railway/ci | URLs Y | dashboard | 12 |
| Deploy | Y | version match | Y | autodeploy | 12 |
| Testing | Y | sample exec | sample | full CI | 13 |
| Privacy | Y | page+code | — | legal | 14 |
| Legal | Y | pages | HTTP | adequacy | 14 |
| SEO | Y | robots | Y | OG deep | 15 |
| a11y | Y | code/CI | partial | cert | 15 |
| Performance | Y | cache hdr | not measured | CWV | 15 |
| Analytics | Y | absent | — | — | 16 |
| Monetization | Y | absent | — | — | 16 |
| Affiliate | Y | absent | — | — | 16 |
| Didactics | Y | content | — | efficacy | 06,21 |
| Git | Y | log/PRs | — | all branches | 17 |
| Docs | Y | conflicts | — | — | 18 |
| Risks | Y | register | — | — | 19 |
