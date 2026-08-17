# MEDIA M5-A5 — Mock-Tutor Expansion (Lektion l5)

**Status:** Scope-Lock + Mock-Tutor-Erweiterung für Lektion `l5`  
**Stand:** 17. August 2026  
**Autorisierung:** menschliche Fortsetzungsfreigabe nach M5-A4 / S56-C5 („weiter“)  
**Keine Rechtsberatung.**

## 1. Zweck

Den deterministischen Mock-Tutor von Lektion `l1`–`l4` auf `l5`
erweitern — weiterhin nur Preset-Fragen, kein Netz, keine Live-KI.

```text
MEDIA_M5_A5_SCOPE_LOCK=YES
MEDIA_M5_A5_MOCK_L5_AUTHORIZED=YES
MEDIA_M5_A5_FREE_CHAT_FORBIDDEN=YES
MEDIA_M5_A5_NETWORK_FORBIDDEN=YES
MEDIA_M5_A5_LIVE_LLM=NO
MEDIA_M5_RAG_AUTHORIZED=NO
MEDIA_M5_PRODUCTION_LLM=NO
```

## 2. In Scope

1. Dieses Scope-Dokument + Marker.
2. Drei kuratierte Mock-Fragen für `l5` (Prompt-Formel, eine klare Aufgabe, zu viele Themen).
3. `MockTutorPanel` in Lektion `l5` (neben weiterhin `l1`–`l4`).
4. Tests + bestehendes Gate `pnpm test:media-m5`.
5. Vendor-Sync `ai-core`.

## 3. Explizit out of scope

- Freitext-Chat / Streaming
- Quellen-Suche (S56-C / C2 / C3 / C4 / C5 / C6)
- Ollama / Live-LLM
- Embeddings / Flag-Flip
- Mock-Tutor für `l6+` (später)

## 4. Honesty

Unverändert M5-A: `mode: "mock_curated"`, Enthaltung bei unbekannter Frage.
