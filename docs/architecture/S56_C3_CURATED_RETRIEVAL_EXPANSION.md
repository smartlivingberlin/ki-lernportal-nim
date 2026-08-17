# S56-C3 — Curated Retrieval Expansion (Lektion l3)

**Status:** Scope-Lock + Korpus-/UI-Erweiterung für Lektion `l3` integriert  
**Stand:** 17. August 2026  
**Merge:** #248 (`6cac7a22d40d4dd9ff99ac924b61880a95299be1`)  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-C2 („weiter“ / S56-C3)  
**Keine Rechtsberatung.**

## 1. Zweck

Nach S56-C2 (`l1`+`l2`) die **kuratierte Quellen-Suche** auf die nächste
Kernweg-Lektion `l3` (*Deine erste sichere KI-Frage*) erweitern —
weiterhin ohne Flag-Flip, Embeddings oder Live-LLM.

```text
S56_C3_SCOPE_LOCK=YES
S56_C3_CURATED_L3_AUTHORIZED=YES
S56_C3_FREE_CHAT_FORBIDDEN=YES
S56_C3_LIVE_LLM=NO
S56_C3_VECTOR_DB=NO
S56_C3_EMBEDDINGS=NO
S56_C3_STAGING_FLAG_FLIP=NO
S56_C3_PRODUCTION_FLAG_FLIP=NO
S56_C3_RAILWAY_CHANGE_IN_REPO=NO
S56_C3_INTEGRATED_TO_MAIN=YES
FEATURE_FLAG_AI_RAG_RUNTIME_DEFAULT=false
MEDIA_M5_RAG_AUTHORIZED=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker in Status/Stack.
2. `CURATED_PASSAGES` + `CURATED_UI_QUERIES` für `l3` (keine privaten Daten,
   Platzhalter, Prompt-Fehler, Enthaltung).
3. `CuratedRetrievalPanel` in Lektion `l3` (neben `l1` und `l2`).
4. Unit-Tests + Gate `pnpm test:s56-c3` + CI.
5. Vendor-Sync für `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Mock-Tutor-Erweiterung (eigenes Slice M5-A2)
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
| S56-C2 | Expansion auf `l2` | integriert |
| S56-C3 | Expansion auf `l3` | dieses Dokument |
| S56-C4 | Expansion auf `l4` | siehe `S56_C4_CURATED_RETRIEVAL_EXPANSION.md` |
| S56-B2 | Staging-Flag-Flip + HTTP-Probe | **gesperrt** |
| S56-D | Embeddings/Index | **gesperrt** |
| M7 | Flag-gated Staging-RAG UI | **gesperrt** |
