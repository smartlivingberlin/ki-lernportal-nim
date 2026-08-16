"use client";

import { useId } from "react";
import type { MediaAsset } from "../../data/types";

type MediaAudioPlayerProps = {
  asset: MediaAsset;
  className?: string;
  /** Short visible transcript (a11y + honesty). */
  transcript: string;
};

/**
 * Accessible prerendered audio (M4).
 * - Playback starts only after an explicit user click
 * - Transcript always visible
 * - Synthetic TTS must be labeled via asset.synthetic
 */
export function MediaAudioPlayer({
  asset,
  className,
  transcript,
}: MediaAudioPlayerProps) {
  const labelId = useId();

  if (asset.kind !== "audio") {
    return null;
  }

  return (
    <figure
      data-testid="media-audio"
      data-media-id={asset.id}
      data-media-phase={asset.phase}
      aria-labelledby={labelId}
      className={
        className ??
        "overflow-hidden rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface)]"
      }
    >
      <div className="bg-[var(--nim-surface-soft)] px-4 py-3">
        <audio
          className="w-full"
          controls
          preload="metadata"
          aria-describedby={labelId}
        >
          <source src={asset.src} type="audio/mp4" />
        </audio>
      </div>
      <figcaption
        id={labelId}
        className="space-y-1 border-t border-[var(--nim-border)] px-4 py-3 text-xs leading-5 text-[var(--nim-secondary)]"
      >
        <p className="font-semibold text-[var(--foreground)]">{asset.title}</p>
        <p>{asset.purpose}</p>
        <p data-testid="media-audio-transcript">
          <span className="font-semibold text-[var(--foreground)]">Transkript: </span>
          {transcript}
        </p>
        <p>Start nur nach Klick. Kein Live-Mikrofon und keine Cloud-TTS zur Laufzeit.</p>
        <p data-testid="media-license">
          Lizenz: {asset.license}
          {asset.synthetic
            ? " · Stimme synthetisch (lokal vorproduziert, Piper)"
            : " · Originalton"}
        </p>
      </figcaption>
    </figure>
  );
}
