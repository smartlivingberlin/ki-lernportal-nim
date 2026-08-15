"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  applyProgressBackupToStorage,
  buildProgressBackupFromStorage,
  countBackupItems,
  parseProgressBackup,
  serializeProgressBackup,
  type ProgressBackupV1,
} from "../../lib/local-progress-backup";
import { explainAttrs } from "../../data/help-tips";

type ProgressBackupPanelProps = {
  onApplied?: (summary: string) => void;
};

type PendingImport = {
  backup: ProgressBackupV1;
  count: number;
};

/**
 * Lokaler Export/Import der Fortschritts-Datei — kein Server, kein Konto.
 */
export function ProgressBackupPanel({ onApplied }: ProgressBackupPanelProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingImport, setPendingImport] = useState<PendingImport | null>(null);

  useEffect(() => {
    const focusIfTargeted = () => {
      if (window.location.hash !== "#fortschritt-sichern") return;
      titleRef.current?.focus({ preventScroll: true });
    };

    focusIfTargeted();
    window.addEventListener("hashchange", focusIfTargeted);
    return () => window.removeEventListener("hashchange", focusIfTargeted);
  }, []);

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleExport = () => {
    setError(null);
    setPendingImport(null);
    try {
      const backup = buildProgressBackupFromStorage(window.localStorage);
      const blob = new Blob([serializeProgressBackup(backup)], {
        type: "application/json;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const stamp = backup.exportedAt.slice(0, 10);
      anchor.href = url;
      anchor.download = `ki-lernportal-nim-fortschritt-${stamp}.json`;
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      const count = countBackupItems(backup);
      const message =
        count === 0
          ? "Leere Sicherungsdatei heruntergeladen (noch kein lokaler Stand)."
          : `Sicherungsdatei heruntergeladen (${count} Einträge).`;
      setStatus(message);
      onApplied?.(message);
    } catch {
      setError("Download fehlgeschlagen. Prüfe Browser-Berechtigungen.");
    }
  };

  const handleImportFile = async (file: File | undefined) => {
    setError(null);
    setStatus(null);
    setPendingImport(null);
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = parseProgressBackup(text);
      if (!parsed.ok) {
        setError(parsed.error);
        return;
      }
      setPendingImport({
        backup: parsed.value,
        count: countBackupItems(parsed.value),
      });
    } catch {
      setError("Datei konnte nicht gelesen werden.");
    } finally {
      clearFileInput();
    }
  };

  const cancelPendingImport = () => {
    setPendingImport(null);
    setStatus("Laden abgebrochen — aktueller Stand bleibt unverändert.");
  };

  const confirmPendingImport = () => {
    if (!pendingImport) return;
    applyProgressBackupToStorage(pendingImport.backup, window.localStorage);
    const { count } = pendingImport;
    const message =
      count === 0
        ? "Leere Sicherungsdatei übernommen — lokaler Stand ist jetzt leer."
        : `Lokaler Stand wiederhergestellt (${count} Einträge).`;
    setPendingImport(null);
    setError(null);
    setStatus(message);
    onApplied?.(message);
  };

  return (
    <section
      id="fortschritt-sichern"
      data-testid="progress-backup-panel"
      aria-labelledby="progress-backup-title"
      {...explainAttrs("fortschritt")}
      className="scroll-mt-72 rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-4 shadow-[var(--shadow-lift)] sm:scroll-mt-64 lg:scroll-mt-36"
    >
      <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
        Gerät wechseln · lokal sichern
      </p>
      <h2
        ref={titleRef}
        id="progress-backup-title"
        tabIndex={-1}
        className="mt-1 text-lg font-black text-[var(--nim-primary)] outline-none"
      >
        Fortschritt sichern
      </h2>
      <p className="mt-2 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
        Dein Lernstand liegt nur in diesem Browser. Lade eine Sicherungsdatei
        herunter oder stelle sie hier wieder her — z.&nbsp;B. vor dem Löschen von
        Daten oder beim Wechsel auf ein anderes Gerät. Nichts wird an einen Server
        gesendet.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          data-testid="progress-backup-export"
          onClick={handleExport}
          className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-3 py-2 text-xs font-black text-white"
        >
          Herunterladen
        </button>
        <button
          type="button"
          data-testid="progress-backup-import"
          aria-expanded={Boolean(pendingImport)}
          aria-controls="progress-backup-import-confirm"
          onClick={() => fileInputRef.current?.click()}
          className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] px-3 py-2 text-xs font-black text-[var(--nim-primary)]"
        >
          Datei laden
        </button>
        <input
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => {
            void handleImportFile(event.target.files?.[0]);
          }}
        />
      </div>

      <div id="progress-backup-import-confirm">
        {pendingImport ? (
          <div
            role="group"
            aria-labelledby="progress-backup-import-title"
            data-testid="progress-backup-import-confirm"
            className="mt-3 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface-soft)] p-3"
          >
            <p
              id="progress-backup-import-title"
              className="text-sm font-black text-[var(--nim-primary)]"
            >
              Sicherungsdatei wirklich laden?
            </p>
            <p className="mt-1 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
              {pendingImport.count === 0
                ? "Die Datei enthält 0 Einträge und würde den aktuellen Stand in diesem Browser leeren."
                : `Die Datei enthält ${pendingImport.count} Einträge und ersetzt den aktuellen Stand in diesem Browser.`}
            </p>
            <p className="mt-2 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
              Betroffen: Lektions-Haken, Vertiefungs-Einheiten, Kurzpfad, Wiederholen,
              „Noch unsicher“ und Selbstcheck. Das lässt sich nicht rückgängig machen —
              lade vorher „Herunterladen“, falls du den jetzigen Stand behalten willst.
              Kein Konto, kein Server.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                data-testid="progress-backup-import-cancel"
                onClick={cancelPendingImport}
                className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] border border-[var(--nim-border)] bg-[var(--nim-surface)] px-3 py-2 text-xs font-black text-[var(--nim-primary)]"
              >
                Abbrechen
              </button>
              <button
                type="button"
                data-testid="progress-backup-import-confirm-yes"
                onClick={confirmPendingImport}
                className="nim-interactive min-h-11 rounded-[var(--nim-radius-md)] bg-[var(--nim-primary)] px-3 py-2 text-xs font-black text-white"
              >
                Ja, Stand ersetzen
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {status ? (
        <p
          role="status"
          className="mt-3 rounded-[var(--nim-radius-md)] bg-[var(--nim-success-soft)] p-3 text-xs font-semibold leading-5 text-[var(--foreground)]"
        >
          {status}
        </p>
      ) : null}
      {error ? (
        <p
          role="alert"
          className="mt-3 rounded-[var(--nim-radius-md)] bg-[var(--nim-accent-soft)] p-3 text-xs font-semibold leading-5 text-[var(--foreground)]"
        >
          {error}
        </p>
      ) : null}
    </section>
  );
}
