# S56-C6 — Curated Retrieval Expansion (Lektion l6)

**Status:** Scope-Lock + Korpus-/UI-Erweiterung für Lektion `l6`  
**Stand:** 17. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-C5 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-C5 die **kuratierte Quellen-Suche** auf Lektion `l6`
(*E-Mails und Texte verbessern*) erweitern — ohne Flag-Flip, Embeddings oder Live-LLM.

```text
S56_C6_SCOPE_LOCK=YES
S56_C6_CURATED_L6_AUTHORIZED=YES
S56_C6_FREE_CHAT_FORBIDDEN=YES
S56_C6_LIVE_LLM=NO
S56_C6_VECTOR_DB=NO
S56_C6_EMBEDDINGS=NO
S56_C6_STAGING_FLAG_FLIP=NO
S56_C6_PRODUCTION_FLAG_FLIP=NO
S56_C6_RAILWAY_CHANGE_IN_REPO=NO
S56_C6_INTEGRATED_TO_MAIN=YES
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
MEDIA_M5_RAG_AUTHORIZED=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. `CURATED_PASSAGES` + `CURATED_UI_QUERIES` für `l6` (Formulieren, private Daten, Prüfung, Enthaltung).
3. `CuratedRetrievalPanel` in Lektion `l6` (neben `l1`–`l5`).
4. Unit-Tests + Gate `pnpm test:s56-c6` + CI.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Mock-Tutor-Erweiterung (eigenes Slice M5-A5)
- Embeddings / Vektordatenbank (S56-D)
- Live-LLM / Flag-Flip (S56-B2)
- Railway-/Dashboard-Änderungen

## 4. Honesty

Mode bleibt `curated_retrieval`. Preset-Buttons only. Kein Claim „Live-Wissensdatenbank“.

## 5. Nächste Freigaben

| Slice | Inhalt | Status |
|-------|--------|--------|
| S56-C5 | Expansion auf `l5` | integriert |
| S56-C6 | Expansion auf `l6` | dieses Dokument |
| S56-B2 | Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-D | Embeddings/Index | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
