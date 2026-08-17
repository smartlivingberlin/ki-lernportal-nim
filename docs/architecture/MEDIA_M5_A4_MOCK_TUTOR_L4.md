# MEDIA M5-A4 — Mock-Tutor Expansion (Lektion l4)

**Status:** Scope-Lock + Mock-Tutor-Erweiterung für Lektion `l4`  
**Stand:** 17. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach M5-A3 / S56-C4 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Den deterministischen Mock-Tutor von Lektion `l1`–`l3` auf `l4`
erweitern — weiterhin nur Preset-Fragen, kein Netz, keine Live-KI.

```text
MEDIA_M5_A4_SCOPE_LOCK=YES
MEDIA_M5_A4_MOCK_L4_AUTHORIZED=YES
MEDIA_M5_A4_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A4_NETWORK_FORBIDDEN=YES
MEDIA_M5_A4_LIVE_LLM=NO
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. Drei kuratierte Mock-Fragen für `l4` (Prompt-Begriff, klare Anweisung, Ungenauigkeit).
3. `MockTutorPanel` in Lektion `l4` (neben weiterhin `l1`–`l3`).
4. Tests + bestehendes Gate `pnpm test:media-m5`.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Quellen-Suche (S56-C / C2 / C3 / C4 / C5)
- Ollama / Live-LLM
- Embeddings / Flag-Flip
- Mock-Tutor für `l5+` (später)

## 4. Honesty

Unverändert M5-A: `mode: "mock_curated"`, Enthaltung bei unbekannter Frage.
