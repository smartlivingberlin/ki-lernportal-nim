# MEDIA M5-A3 — Mock-Tutor Expansion (Lektion l3)

**Status:** Scope-Lock + Mock-Tutor-Erweiterung für Lektion `l3`  
**Stand:** 17. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach M5-A2 / S56-C3 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Den deterministischen Mock-Tutor (M5-A / M5-A2) von Lektion `l1`/`l2` auf `l3`
erweitern — weiterhin nur Preset-Fragen, kein Netz, keine Live-KI.

```text
MEDIA_M5_A3_SCOPE_LOCK=YES
MEDIA_M5_A3_MOCK_L3_AUTHORIZED=YES
MEDIA_M5_A3_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A3_NETWORK_FORBIDDEN=YES
MEDIA_M5_A3_LIVE_LLM=NO
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. Drei kuratierte Mock-Fragen für `l3` (sichere Frage, Platzhalter, keine privaten Daten).
3. `MockTutorPanel` in Lektion `l3` (neben weiterhin `l1` und `l2`).
4. Tests + bestehendes Gate `pnpm test:media-m5`.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Quellen-Suche (S56-C / C2 / C3 / C4)
- Ollama / Live-LLM
- Embeddings / Flag-Flip
- Mock-Tutor für `l4+` (siehe `MEDIA_M5_A4_MOCK_TUTOR_L4.md`)

## 4. Honesty

Unverändert M5-A: `mode: "mock_curated"`, Enthaltung bei unbekannter Frage.
