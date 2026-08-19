# S56-C10 — Curated Retrieval Expansion (Lektion l10)

**Status:** Scope-Lock + Korpus-/UI-Erweiterung für Lektion `l10`  
**Stand:** 19. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-C9 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-C9 die **kuratierte Quellen-Suche** auf Lektion `l10`
(*Datenschutz im Prompt*) erweitern — ohne Flag-Flip, Embeddings oder
Live-LLM.

```text
S56_C10_SCOPE_LOCK=YES
S56_C10_CURATED_L10_AUTHORIZED=YES
S56_C10_FREE_CHAT_FORBIDDEN=YES
S56_C10_LIVE_LLM=NO
S56_C10_VECTOR_DB=NO
S56_C10_EMBEDDINGS=NO
S56_C10_STAGING_FLAG_FLIP=NO
S56_C10_PRODUCTION_FLAG_FLIP=NO
S56_C10_RAILWAY_CHANGE_IN_REPO=NO
S56_C10_INTEGRATED_TO_MAIN=NO
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
MEDIA_M5_RAG_AUTHORIZED=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. `CURATED_PASSAGES` + `CURATED_UI_QUERIES` für `l10` (persönliche Daten, Platzhalter, Dokument-Kopie).
3. `CuratedRetrievalPanel` in Lektion `l10` (neben `l1`–`l9`).
4. Unit-Tests + Gate `pnpm test:s56-c10` + CI.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Mock-Tutor-Erweiterung (eigenes Slice M5-A9)
- Embeddings / Vektordatenbank (S56-D)
- Live-LLM / Flag-Flip (S56-B2)
- Railway-/Dashboard-Änderungen

## 4. Honesty

Mode bleibt `curated_retrieval`. Preset-Buttons only. Kein Claim „Live-Wissensdatenbank“.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-C9 | Expansion auf `l9` | integriert |
| S56-C10 | Expansion auf `l10` | dieses Dokument |
| S56-B2 | Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-D | Embeddings/Index | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
