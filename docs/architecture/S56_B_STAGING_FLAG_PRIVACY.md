# S56-B — Staging-Flag-Entscheidung + Privacy-Review (ohne Flip)

**Status:** Scope-Lock + dokumentierte Entscheidung (kein Railway-Flip)  
**Stand:** 16. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-A („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-A (`retrieveCurated`) die **Betriebs- und Privacy-Grenze** für ein
späteres Staging-Flag festlegen — analog zu S52-D2b, aber **ohne** das Flag
jetzt zu setzen und ohne Product-UI.

```text
S56_B_SCOPE_LOCK=YES
S56_B_PRIVACY_REVIEW_DOCUMENTED=YES
S56_B_STAGING_FLAG_DECISION_DOCUMENTED=YES
S56_B_STAGING_FLAG_FLIP_EXECUTED=NO
S56_B_PRODUCTION_FLAG_FLIP=NO
S56_B_PRODUCT_UI=NO
S56_B_RAILWAY_CHANGE_IN_REPO=NO
S56_B_LIVE_LLM=NO
S56_B_VECTOR_DB=NO
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
AI_RAG_RUNTIME_FLAG_FLIP=STAGING_ONLY_FUTURE
AI_RAG_RUNTIME_FLAG_FLIP_PRODUCTION=NO
```

## 2. Flag-Vertrag

| Umgebung | `ai_rag_runtime` | Status in S56-B |
|----------|------------------|-----------------|
| Default (Code) | `false` | verbindlich |
| Production / Concept-Demo | unset/`false` | **Flip verboten** |
| Staging | später manuell `true` möglich | **noch nicht ausgeführt** |

Begründung: Es gibt noch **keine** Product-Oberfläche, die das Flag liest.
Ein Flip ohne UI wäre wirkungslos und suggerierte Live-RAG. Deshalb bleibt
`S56_B_STAGING_FLAG_FLIP_EXECUTED=NO`.

Späterer manueller Staging-Schritt (eigene Freigabe, nicht dieses Slice):

1. Privacy- und Honesty-UI vorhanden.
2. Railway Staging-Variable setzen (nicht in Git).
3. HTTP-Probe dokumentieren.
4. Production unverändert `false`.

## 3. Privacy-Review (kuratiertes Retrieval)

**Keine Rechtsberatung.** Technische Vorsorge für S56-A-Korpus:

1. **Kein Personenbezug im Korpus:** eingefrorene Lehrpassagen, keine
   Nutzerdaten, keine Accounts.
2. **Keine Prompt-Persistenz:** `retrieveCurated` speichert keine Queries.
3. **Keine Drittanbieter-Calls:** kein Embedding-/Cloud-LLM in S56-A/B.
4. **Enthaltung statt Halluzination:** bei fehlender Evidenz `abstain`.
5. **Zitate mit Provenienz:** `sourceId` / `revision` / `passageId`.
6. **Honesty:** Mode `curated_retrieval`, kein Claim „Live-Wissensdatenbank“.
7. **Feature-Flag:** Default aus; Production-Flip verboten.
8. **Logs:** keine vollständigen Nutzerqueries in Betriebslogs vorgesehen
   (Platform-Invariante §9).

```text
S56_B_PRIVACY_NO_USER_CORPUS_PII=YES
S56_B_PRIVACY_NO_PROMPT_PERSISTENCE=YES
S56_B_PRIVACY_NO_THIRD_PARTY_CALLS=YES
S56_B_PRIVACY_ABSTENTION_REQUIRED=YES
S56_B_PRIVACY_CITATION_REQUIRED=YES
```

## 4. In Scope

1. Dieses Scope-Dokument + Marker in Status/Stack.
2. `packages/ai-core`: `resolveAiRagRuntimePolicy()` (Default aus,
   Production-Flip unzulässig).
3. Unit-Tests + Gate `pnpm test:s56-b` + CI.
4. Docs-Baseline auf Live-SHA nach #236 (`0f708f5`).

## 5. Explizit out of scope

- Railway-/Dashboard-Änderungen
- `ai_rag_runtime=true` setzen (Staging oder Production)
- Product-UI / Chat
- Embeddings / Vektordatenbank (S56-C)
- Live-LLM
- M7 Staging-RAG-UI

## 6. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-A | Kuratiertes Retrieval | integriert |
| S56-B | Privacy + Flag-Entscheidung | dieses Dokument |
| S56-B2 | optionaler Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-C | Embeddings/Index | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
