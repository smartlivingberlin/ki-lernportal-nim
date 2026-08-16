import type { MediaAsset } from "../../data/types";
import {
  KiCheckIllustration,
  KiPatternsIllustration,
} from "./media-illustrations";

const illustrationMap = {
  "component:KiPatternsIllustration": KiPatternsIllustration,
  "component:KiCheckIllustration": KiCheckIllustration,
} as const;

type MediaFigureProps = {
  asset: MediaAsset;
  className?: string;
};

/**
 * Accessible still media from the curated manifest (M1).
 * Videos/audio arrive in later phases with captions and reduced-motion rules.
 */
export function MediaFigure({ asset, className }: MediaFigureProps) {
  const Illustration =
    asset.src in illustrationMap
      ? illustrationMap[asset.src as keyof typeof illustrationMap]
      : null;

  return (
    <figure
      data-testid="media-figure"
      data-media-id={asset.id}
      data-media-phase={asset.phase}
      aria-label={asset.alt}
      className={
        className ??
        "overflow-hidden rounded-[var(--nim-radius-lg)] border border-[var(--nim-border)] bg-[var(--nim-surface)]"
      }
    >
      {Illustration ? (
        <Illustration className="h-auto w-full" />
      ) : (
        <p className="p-4 text-sm text-[var(--nim-secondary)]">
          Medienasset fehlt oder ist noch nicht angebunden ({asset.id}).
        </p>
      )}
      <figcaption className="space-y-1 border-t border-[var(--nim-border)] px-4 py-3 text-xs leading-5 text-[var(--nim-secondary)]">
        <p className="font-semibold text-[var(--foreground)]">{asset.title}</p>
        <p>{asset.purpose}</p>
        <p data-testid="media-license">
          Lizenz: {asset.license}
          {asset.synthetic ? " · synthetisch gekennzeichnet" : " · Originalillustration"}
        </p>
      </figcaption>
    </figure>
  );
}
