# Search Contract

**Status:** In S50B-R3 menschlich beschlossen; Implementierungs- und externe Aktionsfreigaben ausstehend
**Stand:** 17. Juli 2026
**Geltungsbereich:** Lokale Suche, spätere serverseitige Suche, Indexierung,
Autorisierung, Revisionsintegrität und Provider-Neutralität

## 1. Ausgangslage

Die Konzeptdemo besitzt eine Browser-lokale Suche über:

- öffentliche Lektionen;
- Glossarbegriffe;
- freigegebene Ressourcen.

Suchbegriffe werden dabei nicht an einen Server gesendet.

Dieses Verhalten bleibt gültig, bis ein gesonderter serverseitiger Search-Slice
freigegeben wird.

## 2. Architekturentscheidung

Search wird über einen providerneutralen Application Contract abstrahiert.

~~~text
SearchProvider
LocalPublicSearchProvider
DatabaseSearchProvider
optional ExternalSearchProvider
~~~

S51A benötigt keinen externen Search-Anbieter.

S51A implementiert keine serverseitige Suche.

## 3. Zielprinzipien

Search muss:

- nachvollziehbar sein;
- nur zulässige Revisionen liefern;
- Scope und Ownership serverseitig erzwingen;
- barrierefrei bedienbar sein;
- bei Ausfall nicht die direkte Navigation blockieren;
- keine KI-Laufzeit voraussetzen;
- Anbieterwechsel ermöglichen;
- keine geschützten Result Counts offenlegen.

## 4. Search-Dokument

Ein späteres Search-Dokument referenziert mindestens:

~~~text
search_document_id
object_type
object_id
revision_id
publication_id
title
summary
normalized_terms
language
scope_type
scope_id
indexed_at
index_version
~~~

Optional:

- competency_ids;
- module_id;
- path_id;
- source_type;
- review_date;
- content_type;
- public_url;
- ranking_signals.

## 5. Maßgebliche Datenquelle

Der Search-Index ist nicht das System of Record.

Maßgeblich bleiben:

- freigegebene Content-Revision;
- Publikationsreferenz;
- Source-Revision;
- Scope Policy;
- Repository-Daten.

Ein Search-Treffer darf keine fachliche Freigabe erzeugen.

## 6. Öffentliche Suche

Öffentliche Suche darf später enthalten:

- veröffentlichte Lektionen;
- veröffentlichte Lernpfade;
- freigegebene Glossarbegriffe;
- freigegebene öffentliche Quellen;
- freigegebene öffentliche Ressourcen;
- freigegebene Hilfeseiten.

Nicht enthalten sein dürfen:

- Drafts;
- abgelehnte Revisionen;
- interne technische Quellen;
- vertrauliche Medien;
- archivierte öffentliche Pointer;
- nicht freigegebene KI-Inhalte;
- private Lernantworten;
- interne Adminnotizen.

## 7. Geschützte Suche

Eine spätere geschützte Suche prüft serverseitig:

~~~text
Authentifizierung
-> aktuelle Rolle
-> aktueller Scope
-> Membership
-> Ownership
-> Ressourcenstatus
-> Feature Flag
-> Suchausführung
~~~

Ein nachträgliches Client-Filtering ist unzulässig.

## 8. Result Counts

Trefferzahlen dürfen keine fremden geschützten Ressourcen offenlegen.

Nicht zulässig:

~~~text
23 Treffer gefunden
aber nur 3 sichtbar
~~~

wenn dadurch zwanzig fremde geschützte Datensätze erkennbar werden.

Zählung und Trefferfilter müssen denselben Scope anwenden.

## 9. Indexierungsablauf

Eine spätere Indexierung folgt:

~~~text
freigegebene Publikation
-> Transactional-Outbox-Ereignis
-> Search-Index-Job
-> Revision validieren
-> Scope validieren
-> Dokument idempotent upserten
-> veralteten öffentlichen Pointer entfernen
-> Ergebnis protokollieren
~~~

Ein fehlgeschlagenes Indexupdate verändert nicht den maßgeblichen
Publikationszustand.

## 10. Idempotenz

Ein möglicher Idempotency Key lautet:

~~~text
revision_id + index_version + search_provider_key
~~~

Doppelte Events dürfen keine doppelten Resultate erzeugen.

Ein Rebuild darf reproduzierbar sein.

## 11. Superseded und Archive

Bei einer neuen Publikation:

- neue Revision wird indexiert;
- öffentlicher Pointer verweist auf die neue Revision;
- alte Revision bleibt historische Evidenz;
- alte Revision erscheint nicht mehr als aktueller öffentlicher Treffer.

Bei Archivierung:

- öffentlicher Treffer wird entfernt;
- historische Revision bleibt in der maßgeblichen Datenbank;
- geschützte administrative Suche kann sie je nach Policy weiterhin finden.

## 12. Query-Normalisierung

Die erste serverseitige Version soll mindestens unterstützen:

- deutsche Groß- und Kleinschreibung;
- Umlautnormalisierung;
- Akzentnormalisierung;
- überflüssige Leerzeichen;
- begrenzte Query-Länge;
- sichere Sonderzeichenbehandlung;
- leere Query;
- deterministische Tokenisierung;
- Sprachkennzeichnung.

Die Normalisierung darf keine SQL-, Filter- oder Scope-Manipulation erlauben.

## 13. Ranking

Die erste Rankingstrategie soll nachvollziehbar sein.

Mögliche Signale:

- Titelübereinstimmung;
- Glossarbegriff;
- exakte Phrase;
- Modul- oder Lernpfadbezug;
- Inhaltsübereinstimmung;
- Aktualität einer freigegebenen Revision;
- Quellenrelevanz.

Nicht zulässig ohne gesonderte Freigabe:

- versteckte bezahlte Bevorzugung;
- Profiling aufgrund sensibler Daten;
- undurchsichtige KI-Rankings;
- Ranking nach privatem Lernverhalten;
- Ranking nach geschützten Organisationsdaten.

## 14. Deterministische erste Version

Die erste serverseitige Search-Version benötigt keine:

- Vektordatenbank;
- Embeddings;
- LLM-Reformulierung;
- Reranking-Modell;
- externe Suchmaschine;
- personalisierte Ranking-KI.

Eine kontrollierte Datenbanksuche kann für den ersten Server-Slice ausreichen.

## 15. Semantische Suche

Semantische oder vektorbasierte Suche ist eine spätere Option.

Vor Aktivierung benötigt sie:

- Provider-Review;
- Datenschutzprüfung;
- Scope-Isolation;
- Poisoning-Tests;
- Revisions-Provenienz;
- Kostenlimits;
- Rebuild-Strategie;
- Lösch- und Archivierungsweg;
- Qualitätsevaluation;
- Fallback.

## 16. Search und AI/RAG

Portal-Search und KI-Retrieval sind getrennte Fähigkeiten.

`packages/ai-core` wird nicht automatisch zur allgemeinen Portal-Suchmaschine.

Ein Search Query wird nicht automatisch in einen KI-Prompt übernommen.

Eine spätere Kombination benötigt bewusste Nutzerinteraktion und eigene
Privacy-, AI- und Product-Freigabe.

## 17. Suchbegriffe und Datenschutz

Bei Browser-lokaler Suche bleiben Begriffe im Browser.

Bei späterer serverseitiger Suche gilt:

- Suchbegriffe sind nicht automatisch Analytics;
- keine unbegrenzte Speicherung;
- keine automatische Profilbildung;
- sensible Begriffe werden nicht ungeprüft geloggt;
- Aufbewahrung benötigt explizite Freigabe;
- Nutzer müssen über Speicherung informiert werden;
- Suchhistorie ist standardmäßig deaktiviert.

## 18. Accessibility

Die Suchoberfläche benötigt:

- sichtbares Label;
- Tastaturbedienung;
- klare Fokusführung;
- verständliche Trefferzahl;
- zugängliche Statusmeldung;
- klaren Nulltrefferzustand;
- sichtbaren Resultattyp;
- verständlichen Ziel-Link;
- Kennzeichnung externer Links;
- ausreichend große Bedienelemente;
- keine reine Farbcodierung.

Search darf nicht der einzige Weg zu Kerninhalten sein.

## 19. Nulltrefferzustand

Ein Nulltrefferzustand soll:

- die Suchanfrage bestätigen;
- keine fremden geschützten Treffer andeuten;
- Schreibvarianten anbieten;
- Glossar oder Lernpfade verlinken;
- keine falschen KI-Antworten erfinden;
- direkte Navigation ermöglichen.

## 20. Fehlerverhalten

Bei Provider-Ausfall:

- direkte Lektions-URLs bleiben erreichbar;
- Lernpfadnavigation bleibt funktionsfähig;
- verständliche Fehlermeldung wird gezeigt;
- Correlation ID wird bereitgestellt;
- kein Stacktrace wird ausgegeben.

Ein Fallback auf Datenbanksuche erfolgt nur, wenn er ausdrücklich implementiert
und getestet wurde.

## 21. Caching

Öffentliche Search-Ergebnisse dürfen kontrolliert gecacht werden.

Geschützte Ergebnisse benötigen Cache Keys mit:

- Scope;
- Nutzer- oder Policy-Kontext, soweit erforderlich;
- Query-Normalform;
- Indexversion;
- Feature-Version.

Ein geschützter Cache darf keine Ergebnisse scopeübergreifend wiederverwenden.

## 22. Search-Index-Version

Jeder Index besitzt eine Version.

Eine neue Version kann notwendig sein bei:

- geändertem Dokumentformat;
- geänderter Normalisierung;
- geänderter Rankingstrategie;
- geändertem Scope-Modell;
- geändertem Provider;
- geändertem Sprachmodell;
- Sicherheitskorrektur.

Rebuild und Umschaltung müssen kontrolliert möglich sein.

## 23. Rebuild

Ein Index-Rebuild:

- liest ausschließlich zulässige Revisionen;
- arbeitet idempotent;
- besitzt Kosten- und Zeitgrenzen;
- kann abgebrochen werden;
- schreibt in eine neue Indexversion;
- wird vor Umschaltung validiert;
- entfernt keine maßgeblichen Datenbankrevisionen.

## 24. Qualitätsmetriken

Später sinnvoll zu messen:

- Query-Latenz;
- Nulltrefferquote;
- Klick auf Ergebnis;
- fehlerhafte Resultatlinks;
- veraltete Treffer;
- Indexalter;
- Indexierungsfehler;
- Scope-Filterfehler;
- Ranking-Regression;
- barrierefreie Bedienbarkeit.

Eine Klickrate allein beweist keine inhaltliche Qualität.

## 25. Search-Evaluation

Vor einem Anbieterwechsel oder semantischen Ausbau benötigt NIM ein
redigiertes Testset mit:

- Anfängerbegriffen;
- Synonymen;
- Umlauten;
- Tippfehlern;
- Glossarbegriffen;
- langen Fragen;
- leeren Queries;
- sensiblen Begriffen;
- fremden Scope-Versuchen;
- archivierten Revisionen;
- widersprüchlichen Quellen.

## 26. Paketgrenzen

`packages/contracts` definiert:

- Search Request;
- Search Response;
- Result Type;
- Pagination;
- kontrollierte Fehler.

`packages/domain` definiert:

- searchable publication;
- Scope;
- Revision;
- zulässige Resultattypen;
- Ranking-neutrale Fachregeln.

`packages/db` darf später eine DatabaseSearchProvider-Implementierung besitzen.

Ein späteres Search-Application-Service wählt den Provider.

`packages/ai-core` besitzt keine allgemeine Search-Autorität.

`apps/web` stellt Resultate dar und führt keine geschützte Scope-Filterung im
Browser durch.

## 27. S51A-Grenze

S51A darf lediglich:

- Search-Interfaces vorbereiten;
- Paketgrenzen dokumentieren;
- verbotene Importpfade testen;
- providerneutrale Typen anlegen, wenn ausdrücklich genehmigt.

S51A implementiert nicht:

- serverseitige Search Route;
- Search-Datenbankabfrage;
- Search-Index;
- Search-Job;
- Analytics;
- externe Suchmaschine;
- Embeddings;
- semantische Suche;
- KI-Reranking.

## 28. Pflicht-Negativtests

Mindestens zu prüfen:

- Draft erscheint in öffentlicher Suche;
- archivierte Revision erscheint öffentlich;
- interne technische Quelle erscheint öffentlich;
- fremder Scope wird gefunden;
- Result Count verrät fremde Datensätze;
- Query manipuliert Filter;
- Cache Key enthält keinen Scope;
- veralteter Index verweist auf superseded Revision;
- doppelte Indexevents erzeugen Duplikate;
- Provider-Ausfall blockiert direkte Navigation;
- lange Query verursacht unkontrollierte Last;
- Suchbegriff erscheint unredigiert im Log;
- Search Query wird ungefragt an KI gesendet;
- Nulltrefferzustand erfindet eine Antwort.

## 29. Freigabestatus

~~~text
SEARCH_CONTRACT_APPROVED=NO
CURRENT_LOCAL_PUBLIC_SEARCH_RETAINED=YES
SERVER_SEARCH_IMPLEMENTATION_APPROVED=NO
EXTERNAL_SEARCH_PROVIDER_SELECTED=NO
VECTOR_SEARCH_REQUIRED_FOR_FIRST_PHASE=NO
SEMANTIC_SEARCH_APPROVED=NO
PROTECTED_SERVER_SEARCH_AUTHORIZED=NO
SEARCH_QUERY_RETENTION_APPROVED=NO
~~~

## 30. Aktueller Autorisierungsstand

Dieses Dokument beschreibt einen Architekturvertrag zur getrennten menschlichen
Abnahme. Es erteilt keine Implementierungs- oder externe Aktionsfreigabe.

~~~text
DOCUMENT_STATUS=ARCHITECTURE_APPROVED_IMPLEMENTATION_NOT_AUTHORIZED
PRODUCT_CODE_CHANGE_AUTHORIZED=NO
DATABASE_CHANGE_AUTHORIZED=NO
RAILWAY_CHANGE_AUTHORIZED=NO
COMMIT_AUTHORIZED=NO
PUSH_AUTHORIZED=NO
MERGE_AUTHORIZED=NO
DEPLOY_AUTHORIZED=NO
PRODUCTION_CHANGE_AUTHORIZED=NO
~~~
