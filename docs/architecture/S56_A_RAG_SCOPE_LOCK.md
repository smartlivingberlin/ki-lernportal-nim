# S56-A — RAG Scope-Lock + kuratiertes Retrieval (ohne Live-LLM)

**Status:** Scope-Lock + lokale kuratierte Retrieval-Foundation integriert  
**Stand:** 16. August 2026  
**Merge:** #235 (`ffa90f6e9e704bd83e585361d6ad32d63619df71`)  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach M5-B („durch, weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Erste S56-Schicht in `packages/ai-core` gemäß Plattform-Invarianten
(`PLATFORM_CONTRACTS.md` §9):

- **kuratierte** Passagen mit Quelle/Revision/Chunk-ID,
- kontrollierte **Enthaltung** ohne Evidenz,
- **kein** Live-LLM, **kein** Vektorindex, **kein** Staging-Flag-Flip,
- **kein** Product-Chat und keine Railway-Aktivierung.

```text
S56_A_SCOPE_LOCK=YES
S56_A_CURATED_RETRIEVAL_AUTHORIZED=YES
S56_A_LIVE_LLM=NO
S56_A_VECTOR_DB=NO
S56_A_EMBEDDINGS=NO
S56_A_PRODUCT_UI=NO
S56_A_STAGING_FLAG_FLIP=NO
S56_A_PRODUCTION_FLAG_FLIP=NO
S56_A_INTEGRATED_TO_MAIN=YES
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
AI_CORE_LIVE_PROVIDER=NO
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
```

## 2. In Scope

1. Scope-Dokument + Marker in Status/Stack.
2. `packages/ai-core`: `retrieveCurated()` über eingefrorene Passagen (l1-Pilot),
   Rückgabe mit Zitaten oder `abstain`.
3. Unit-Tests (Treffer, Enthaltung, keine Netzaufrufe).
4. Gate `pnpm test:s56-a` + CI.
5. Docs-Baseline auf Live-SHA nach #234.

## 3. Explizit out of scope

- Embedding-Modelle / Vektordatenbanken / Index-Builds
- Live-LLM-Generierung von Antworten
- `ai_rag_runtime=true` in Staging oder Production
- Product-UI / Chat / Streaming
- Open-Web-Crawl ohne Kuratierung
- Automatische Veröffentlichung KI-generierter Inhalte
- Prompt-Logging vollständiger Nutzertexte in Betriebslogs
- M6 Talking-Head, M7 Staging-RAG-Runtime

## 4. Honesty / Safety

- Mode: `curated_retrieval` (nicht „Live-RAG“).
- Antworten nur aus kuratierten Passagen; sonst Enthaltung.
- Concept-Demo-UI bleibt beim M5-A Mock-Tutor.
- Kein Claim „Live-KI mit Wissensdatenbank“ ohne Flag und Freigabe.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-A | Scope + kuratiertes Retrieval | dieses Dokument |
| S56-B | Staging-Flag-Entscheidung / Privacy-Review | **gesperrt** |
| S56-C | optionale Embeddings/Index (isoliert) | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
