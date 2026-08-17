# S56-C2 — Curated Retrieval Expansion (Lektion l2)

**Status:** Scope-Lock + Korpus-/UI-Erweiterung für Lektion `l2` integriert  
**Stand:** 16. August 2026  
**Merge:** #244 (`167b3199c03572fbe80cb81bf10f11160ca0a38c`)  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-C („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-C (Pilot-UI nur `l1`) die **kuratierte Quellen-Suche** auf die
nächste Kernweg-Lektion `l2` erweitern — weiterhin ohne Flag-Flip,
Embeddings oder Live-LLM.

```text
S56_C2_SCOPE_LOCK=YES
S56_C2_CURATED_L2_AUTHORIZED=YES
S56_C2_FREE_CHAT_FORBIDDEN=YES
S56_C2_LIVE_LLM=NO
S56_C2_VECTOR_DB=NO
S56_C2_EMBEDDINGS=NO
S56_C2_STAGING_FLAG_FLIP=NO
S56_C2_PRODUCTION_FLAG_FLIP=NO
S56_C2_RAILWAY_CHANGE_IN_REPO=NO
S56_C2_INTEGRATED_TO_MAIN=YES
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
MEDIA_M5_RAG_AUTHORIZED=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker in Status/Stack.
2. `CURATED_PASSAGES` + `CURATED_UI_QUERIES` für `l2` (Stärken, Grenzen, sichere Nutzung, Enthaltung).
3. `CuratedRetrievalPanel` in Lektion `l2` (neben weiterhin `l1`).
4. Unit-Tests + Gate `pnpm test:s56-c2` + CI.
5. Vendor-Sync für `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Mock-Tutor-Erweiterung auf `l2` (bleibt M5-A/`l1`)
- Embeddings / Vektordatenbank (S56-D)
- Live-LLM / Ollama im Product-UI
- `ai_rag_runtime` Staging-/Production-Flip (S56-B2)
- Railway-/Dashboard-Änderungen
- M6 Talking-Head, M7 Flag-gated Staging-RAG-Runtime

## 4. Honesty / Safety

- Mode bleibt `curated_retrieval` (S56-A).
- Preset-Buttons only; Enthaltungs-Beispiel bleibt.
- Kein Claim „Live-Wissensdatenbank“ oder „semantische Suche“.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-C | Curated Retrieval Pilot UI (`l1`) | integriert |
| S56-C2 | Expansion auf `l2` | dieses Dokument |
| S56-C3 | Expansion auf `l3` | siehe `S56_C3_CURATED_RETRIEVAL_EXPANSION.md` |
| S56-C4 | Expansion auf `l4` | siehe `S56_C4_CURATED_RETRIEVAL_EXPANSION.md` |
| S56-B2 | Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-D | Embeddings/Index | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
