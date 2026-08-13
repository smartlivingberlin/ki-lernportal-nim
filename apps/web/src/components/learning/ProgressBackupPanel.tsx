"use client";

import { useId, useRef, useState } from "react";
import {
  applyProgressBackupToStorage,
  buildProgressBackupFromStorage,
  countBackupItems,
  parseProgressBackup,
  serializeProgressBackup,
} from "../../lib/local-progress-backup";
import { explainAttrs } from "../../data/help-tips";

type ProgressBackupPanelProps = {
  onApplied?: (summary: string) => void;
};

/**
 * Lokaler JSON-Export/Import — kein Server, kein Konto.
 */
export function ProgressBackupPanel({ onApplied }: ProgressBackupPanelProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = () => {
    setError(null);
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
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = parseProgressBackup(text);
      if (!parsed.ok) {
        setError(parsed.error);
        return;
      }
      applyProgressBackupToStorage(parsed.value, window.localStorage);
      const count = countBackupItems(parsed.value);
      const message = `Lokaler Stand wiederhergestellt (${count} Einträge).`;
      setStatus(message);
      onApplied?.(message);
    } catch {
      setError("Datei konnte nicht gelesen werden.");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <section
      data-testid="progress-backup-panel"
      aria-labelledby="progress-backup-title"
      {...explainAttrs("fortschritt")}
      className="rounded-[var(--nim-radius-xl)] border border-[var(--nim-border)] bg-[var(--nim-surface)] p-4 shadow-[var(--shadow-lift)]"
    >
      <p className="text-xs font-black uppercase tracking-widest text-[var(--nim-secondary)]">
        Gerät wechseln
      </p>
      <h2
        id="progress-backup-title"
        className="mt-1 text-lg font-black text-[var(--nim-primary)]"
      >
        Fortschritt sichern
      </h2>
      <p className="mt-2 text-xs font-medium leading-5 text-[var(--nim-secondary)]">
        Lade deinen lokalen Lernstand als JSON-Datei herunter oder stelle ihn auf
        diesem Browser wieder her. Nichts wird an einen Server gesendet.
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
