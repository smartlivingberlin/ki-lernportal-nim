# Hinweise für den Eigentümer

Dieses Paket ist absichtlich noch kein laufendes Full-Stack-Portal. Es ist ein sauberer Startstand, damit:

1. lokal ein Git-Repo erstellt werden kann,
2. ein privates GitHub-Repo angelegt werden kann,
3. Jules/Codex/Manus/Claude klaren Kontext bekommen,
4. alle Agenten nur kleine, sichere Aufgaben erhalten.

## Empfohlene Reihenfolge

1. ZIP entpacken.
2. `scripts/bootstrap/00_readonly_audit.sh` ausführen.
3. `scripts/bootstrap/01_local_git_init.sh` ausführen.
4. GitHub-Repo privat erstellen.
5. `scripts/github/03_create_initial_issues.sh` ausführen.
6. Jules zuerst nur auf Issue #1 setzen.
