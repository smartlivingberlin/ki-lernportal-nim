# Sicherheitsrichtlinie

## Unterstützter Projektstand

Sicherheitskorrekturen werden für den aktuellen Stand des Standardbranches
`main` sowie für einzeln autorisierte Draft-PRs geprüft, die auf dem jeweils
aktuellen `main` basieren.

Es besteht keine automatisch unterstützte Draft-PR-Kette. Abgelöste,
geschlossene, veraltete oder konfliktbehaftete Entwicklungsbranches sind keine
zulässige Entwicklungsbasis und erhalten keine eigenständige
Sicherheitsunterstützung.

## Sicherheitslücken melden

Bitte veröffentlichen Sie vermutete Sicherheitslücken nicht in öffentlichen
Issues, Diskussionen oder Pull Requests.

Nutzen Sie nach Aktivierung von GitHub Private Vulnerability Reporting die
Funktion **Security → Report a vulnerability** dieses Repositorys.

Eine Meldung sollte möglichst enthalten:

- betroffene Datei, Komponente oder Abhängigkeit;
- nachvollziehbare Reproduktionsschritte;
- erwartetes und tatsächlich beobachtetes Verhalten;
- mögliche Auswirkungen;
- bekannte Voraussetzungen für eine Ausnutzung;
- Vorschläge zur Behebung, sofern vorhanden.

Veröffentlichen Sie keine echten Zugangsdaten, Tokens, Cookies,
personenbezogenen Daten oder fremden Systeme.

## Umgang mit Zugangsdaten

Gefundene Zugangsdaten dürfen nicht getestet, weitergegeben oder in einem
öffentlichen Bericht wiedergegeben werden.

Bei einem vermuteten Secret-Leak soll nur der Typ und Fundort beschrieben
werden, niemals der vollständige Wert.

## Projektgrenzen

Dieses Repository enthält derzeit eine öffentliche Konzeptdemo und ein lokal
getestetes, noch nicht produktiv verbundenes Persistenzfundament.

Es gibt gegenwärtig insbesondere:

- keine Zahlungsaktivierung;
- keine produktive Benutzerkontenverwaltung;
- keine produktive Lerndatenbank;
- keine freigegebene produktive KI-/RAG-Laufzeit;
- keinen freigegebenen Deployment-Ablauf aus Pull Requests;
- keine Berechtigung für PR-Workflows, Repository-Inhalte zu verändern.

Datenbank-, Railway-, Deployment- und Produktionsaktionen benötigen jeweils
eine eigene menschliche Freigabe. Historische Betriebsbeobachtungen sind vor
einer neuen Entscheidung erneut read-only zu verifizieren.

## Offenlegung

Eine Veröffentlichung erfolgt erst nach Abstimmung, Behebung und ausreichender
Zeit zur Prüfung. Es besteht kein Anspruch auf eine bestimmte Bearbeitungsfrist
oder Vergütung.
