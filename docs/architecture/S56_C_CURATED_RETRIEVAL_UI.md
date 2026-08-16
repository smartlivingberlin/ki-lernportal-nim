# S56-C — Curated Retrieval Pilot UI (ohne Flag-Flip, ohne Embeddings)

**Status:** Scope-Lock + Pilot-UI für Lektion `l1`  
**Stand:** 16. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe („ok, du entscheidest“)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-A (`retrieveCurated`) und S56-B (Privacy + Flag-Entscheidung ohne Flip)
eine **sichtbare, ehrliche Pilot-Oberfläche** anbieten, die:

- nur **vorgegebene** Queries nutzt (kein Freitext-Chat),
- Treffer mit **Zitaten** und Enthaltung ohne Evidenz zeigt,
- **kein** `ai_rag_runtime`-Flag setzt,
- **keine** Embeddings / Vektordatenbank / Live-LLM nutzt.

```text
S56_C_SCOPE_LOCK=YES
S56_C_CURATED_RETRIEVAL_UI_AUTHORIZED=YES
S56_C_FREE_CHAT_FORBIDDEN=YES
S56_C_LIVE_LLM=NO
S56_C_VECTOR_DB=NO
S56_C_EMBEDDINGS=NO
S56_C_STAGING_FLAG_FLIP=NO
S56_C_PRODUCTION_FLAG_FLIP=NO
S56_C_RAILWAY_CHANGE_IN_REPO=NO
S56_C_INTEGRATED_TO_MAIN=YES
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker in Status/Stack.
2. `packages/ai-core`: `CURATED_UI_QUERIES` / `listCuratedUiQueries` (l1-Pilot).
3. `CuratedRetrievalPanel` in Lektion `l1` (nach Mock-Tutor).
4. Gate `pnpm test:s56-c` + CI.
5. Datenschutz-Hinweis: kuratierte Quellen-Suche ohne Netz/Live-KI.
6. Vendor-Sync für `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Embeddings / Vektordatenbank / Index-Builds (→ **S56-D**)
- Live-LLM / Ollama im Product-UI
- `ai_rag_runtime=true` (Staging oder Production) — weiterhin S56-B2
- Railway-/Dashboard-Änderungen
- Open-Web-Crawl
- M6 Talking-Head, M7 Flag-gated Staging-RAG-Runtime

## 4. Honesty / Safety

- Mode bleibt `curated_retrieval` (S56-A).
- UI-Honesty: feste Passagen, Zitate, Enthaltung, kein Netz, keine Live-KI.
- Kein Claim „Live-Wissensdatenbank“ oder „semantische Suche“.
- Preset-Query „Beispiel ohne Evidenz“ demonstriert absichtliche Enthaltung.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-A | Kuratiertes Retrieval | integriert |
| S56-B | Privacy + Flag-Entscheidung | integriert |
| S56-C | Curated Retrieval Pilot UI | dieses Dokument |
| S56-B2 | Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-D | optionale Embeddings/Index (isoliert) | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
