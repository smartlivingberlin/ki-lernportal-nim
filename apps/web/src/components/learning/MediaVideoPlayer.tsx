"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { MediaAsset } from "../../data/types";

type MediaVideoPlayerProps = {
  asset: MediaAsset;
  className?: string;
};

/**
 * Accessible short-video player (M2).
 * - No autoplay with sound
 * - Captions track required via asset.captionsVtt
 * - Respects prefers-reduced-motion (pause + honesty note)
 */
export function MediaVideoPlayer({ asset, className }: MediaVideoPlayerProps) {
  const labelId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) {
        videoRef.current?.pause();
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (asset.kind !== "video") {
    return null;
  }

  return (
    <figure
      data-testid="media-video"
      data-media-id={asset.id}
      data-media-phase={asset.phase}
      aria-labelledby={labelId}
      className={
        className ??
        "overflow-hidden rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface)]"
      }
    >
      <div className="bg-[var(--nim-surface-soft)]">
        <video
          ref={videoRef}
          className="h-auto w-full"
          controls
          playsInline
          preload="metadata"
          poster={asset.posterSrc}
          aria-describedby={labelId}
        >
          <source src={asset.src} type="video/mp4" />
          {asset.captionsVtt ? (
            <track
              kind="captions"
              srcLang="de"
              label="Deutsch"
              src={asset.captionsVtt}
              default
            />
          ) : null}
        </video>
      </div>
      <figcaption
        id={labelId}
        className="space-y-1 border-t border-[var(--nim-border)] px-4 py-3 text-xs leading-5 text-[var(--nim-secondary)]"
      >
        <p className="font-semibold text-[var(--foreground)]">{asset.title}</p>
        <p>{asset.purpose}</p>
        <p className="sr-only">{asset.alt}</p>
        {reducedMotion ? (
          <p data-testid="media-video-reduced-motion">
            Weniger Bewegung aktiv: Clip startet nicht automatisch — bei Bedarf
            manuell abspielen oder nur den Text lesen.
          </p>
        ) : (
          <p>Start nur nach Klick. Untertitel sind eingeschaltet.</p>
        )}
        <p data-testid="media-license">
          Lizenz: {asset.license}
          {asset.synthetic ? " · synthetisch gekennzeichnet" : " · Originalclip"}
        </p>
      </figcaption>
    </figure>
  );
}
