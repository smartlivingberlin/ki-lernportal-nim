# S56-C9 — Curated Retrieval Expansion (Lektion l9)

**Status:** Scope-Lock + Korpus-/UI-Erweiterung für Lektion `l9`  
**Stand:** 18. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-C8 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-C8 die **kuratierte Quellen-Suche** auf Lektion `l9`
(*Quellen prüfen*) erweitern — ohne Flag-Flip, Embeddings oder
Live-LLM.

```text
S56_C9_SCOPE_LOCK=YES
S56_C9_CURATED_L9_AUTHORIZED=YES
S56_C9_FREE_CHAT_FORBIDDEN=YES
S56_C9_LIVE_LLM=NO
S56_C9_VECTOR_DB=NO
S56_C9_EMBEDDINGS=NO
S56_C9_STAGING_FLAG_FLIP=NO
S56_C9_PRODUCTION_FLAG_FLIP=NO
S56_C9_RAILWAY_CHANGE_IN_REPO=NO
S56_C9_INTEGRATED_TO_MAIN=YES
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
MEDIA_M5_RAG_AUTHORIZED=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. `CURATED_PASSAGES` + `CURATED_UI_QUERIES` für `l9` (Begriff, Prüfung, Erklärung vs. Beleg, Enthaltung).
3. `CuratedRetrievalPanel` in Lektion `l9` (neben `l1`–`l8`).
4. Unit-Tests + Gate `pnpm test:s56-c9` + CI.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Mock-Tutor-Erweiterung (eigenes Slice M5-A8)
- Embeddings / Vektordatenbank (S56-D)
- Live-LLM / Flag-Flip (S56-B2)
- Railway-/Dashboard-Änderungen

## 4. Honesty

Mode bleibt `curated_retrieval`. Preset-Buttons only. Kein Claim „Live-Wissensdatenbank“.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-C8 | Expansion auf `l8` | integriert |
| S56-C9 | Expansion auf `l9` | integriert |
| S56-C10 | Expansion auf `l10` | siehe `S56_C10_CURATED_RETRIEVAL_EXPANSION.md` |
| S56-B2 | Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-D | Embeddings/Index | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
