# MEDIA M5-A2 — Mock-Tutor Expansion (Lektion l2)

**Status:** Scope-Lock + Mock-Tutor-Erweiterung für Lektion `l2`  
**Stand:** 17. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach S56-C2 („weiter“, parallel zu S56-C3)  
**Keine Rechtsberatung.**

## 1. Zweck

Den deterministischen Mock-Tutor (M5-A) von Lektion `l1` auf `l2`
erweitern — weiterhin nur Preset-Fragen, kein Netz, keine Live-KI.

```text
MEDIA_M5_A2_SCOPE_LOCK=YES
MEDIA_M5_A2_MOCK_L2_AUTHORIZED=YES
MEDIA_M5_A2_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A2_NETWORK_FORBIDDEN=YES
MEDIA_M5_A2_LIVE_LLM=NO
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. Drei kuratierte Mock-Fragen für `l2` (Stärken, Grenzen, Fachpersonen).
3. `MockTutorPanel` in Lektion `l2` (neben weiterhin `l1`).
4. Tests + bestehendes Gate `pnpm test:media-m5`.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Quellen-Suche (S56-C / C2 / C3)
- Ollama / Live-LLM
- Embeddings / Flag-Flip
- Mock-Tutor für `l3+` (später)

## 4. Honesty

Unverändert M5-A: `mode: "mock_curated"`, Enthaltung bei unbekannter Frage.
