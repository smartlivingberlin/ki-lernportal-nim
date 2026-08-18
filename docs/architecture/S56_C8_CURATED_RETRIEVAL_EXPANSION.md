# S56-C8 — Curated Retrieval Expansion (Lektion l8)

**Status:** Scope-Lock + Korpus-/UI-Erweiterung für Lektion `l8`  
**Stand:** 18. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-C7 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-C7 die **kuratierte Quellen-Suche** auf Lektion `l8`
(*Halluzinationen erkennen*) erweitern — ohne Flag-Flip, Embeddings oder
Live-LLM.

```text
S56_C8_SCOPE_LOCK=YES
S56_C8_CURATED_L8_AUTHORIZED=YES
S56_C8_FREE_CHAT_FORBIDDEN=YES
S56_C8_LIVE_LLM=NO
S56_C8_VECTOR_DB=NO
S56_C8_EMBEDDINGS=NO
S56_C8_STAGING_FLAG_FLIP=NO
S56_C8_PRODUCTION_FLAG_FLIP=NO
S56_C8_RAILWAY_CHANGE_IN_REPO=NO
S56_C8_INTEGRATED_TO_MAIN=YES
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
MEDIA_M5_RAG_AUTHORIZED=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. `CURATED_PASSAGES` + `CURATED_UI_QUERIES` für `l8` (Begriff, Warnzeichen, „Bist du sicher?“, Enthaltung).
3. `CuratedRetrievalPanel` in Lektion `l8` (neben `l1`–`l7`).
4. Unit-Tests + Gate `pnpm test:s56-c8` + CI.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Mock-Tutor-Erweiterung (eigenes Slice M5-A7)
- Embeddings / Vektordatenbank (S56-D)
- Live-LLM / Flag-Flip (S56-B2)
- Railway-/Dashboard-Änderungen

## 4. Honesty

Mode bleibt `curated_retrieval`. Preset-Buttons only. Kein Claim „Live-Wissensdatenbank“.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-C7 | Expansion auf `l7` | integriert |
| S56-C8 | Expansion auf `l8` | dieses Dokument |
| S56-C9 | Expansion auf `l9` | siehe `S56_C9_CURATED_RETRIEVAL_EXPANSION.md` |
| S56-B2 | Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-D | Embeddings/Index | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
