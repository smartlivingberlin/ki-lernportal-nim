# S56-C4 — Curated Retrieval Expansion (Lektion l4)

**Status:** Scope-Lock + Korpus-/UI-Erweiterung für Lektion `l4`  
**Stand:** 17. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-C3 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-C3 die **kuratierte Quellen-Suche** auf Lektion `l4`
(*Was ist ein Prompt?*) erweitern — ohne Flag-Flip, Embeddings oder Live-LLM.

```text
S56_C4_SCOPE_LOCK=YES
S56_C4_CURATED_L4_AUTHORIZED=YES
S56_C4_FREE_CHAT_FORBIDDEN=YES
S56_C4_LIVE_LLM=NO
S56_C4_VECTOR_DB=NO
S56_C4_EMBEDDINGS=NO
S56_C4_STAGING_FLAG_FLIP=NO
S56_C4_PRODUCTION_FLAG_FLIP=NO
S56_C4_RAILWAY_CHANGE_IN_REPO=NO
S56_C4_INTEGRATED_TO_MAIN=YES
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
MEDIA_M5_RAG_AUTHORIZED=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. `CURATED_PASSAGES` + `CURATED_UI_QUERIES` für `l4` (Prompt-Begriff, Klarheit, Ungenauigkeit, Enthaltung).
3. `CuratedRetrievalPanel` in Lektion `l4` (neben `l1`–`l3`).
4. Unit-Tests + Gate `pnpm test:s56-c4` + CI.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Mock-Tutor-Erweiterung (eigenes Slice M5-A3)
- Embeddings / Vektordatenbank (S56-D)
- Live-LLM / Flag-Flip (S56-B2)
- Railway-/Dashboard-Änderungen

## 4. Honesty

Mode bleibt `curated_retrieval`. Preset-Buttons only. Kein Claim „Live-Wissensdatenbank“.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-C3 | Expansion auf `l3` | integriert |
| S56-C4 | Expansion auf `l4` | dieses Dokument |
| S56-B2 | Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-D | Embeddings/Index | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
