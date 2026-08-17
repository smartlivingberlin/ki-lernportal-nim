# S56-C5 — Curated Retrieval Expansion (Lektion l5)

**Status:** Scope-Lock + Korpus-/UI-Erweiterung für Lektion `l5`  
**Stand:** 17. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-C4 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-C4 die **kuratierte Quellen-Suche** auf Lektion `l5`
(*Die einfache Prompt-Formel*) erweitern — ohne Flag-Flip, Embeddings oder Live-LLM.

```text
S56_C5_SCOPE_LOCK=YES
S56_C5_CURATED_L5_AUTHORIZED=YES
S56_C5_FREE_CHAT_FORBIDDEN=YES
S56_C5_LIVE_LLM=NO
S56_C5_VECTOR_DB=NO
S56_C5_EMBEDDINGS=NO
S56_C5_STAGING_FLAG_FLIP=NO
S56_C5_PRODUCTION_FLAG_FLIP=NO
S56_C5_RAILWAY_CHANGE_IN_REPO=NO
S56_C5_INTEGRATED_TO_MAIN=YES
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
MEDIA_M5_RAG_AUTHORIZED=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. `CURATED_PASSAGES` + `CURATED_UI_QUERIES` für `l5` (Formel, eine Aufgabe, zu viele Themen, Enthaltung).
3. `CuratedRetrievalPanel` in Lektion `l5` (neben `l1`–`l4`).
4. Unit-Tests + Gate `pnpm test:s56-c5` + CI.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Mock-Tutor-Erweiterung (eigenes Slice M5-A4)
- Embeddings / Vektordatenbank (S56-D)
- Live-LLM / Flag-Flip (S56-B2)
- Railway-/Dashboard-Änderungen

## 4. Honesty

Mode bleibt `curated_retrieval`. Preset-Buttons only. Kein Claim „Live-Wissensdatenbank“.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-C4 | Expansion auf `l4` | integriert |
| S56-C5 | Expansion auf `l5` | dieses Dokument |
| S56-B2 | Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-D | Embeddings/Index | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
