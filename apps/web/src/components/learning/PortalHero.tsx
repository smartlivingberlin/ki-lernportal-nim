type PortalHeroProps = {
  progressText: string;
  progressPercent: number;
  totalLessons: number;
};

export function PortalHero({
  progressText,
  progressPercent,
  totalLessons,
}: PortalHeroProps) {
  return (
    <section
      aria-labelledby="portalstatus-title"
      className="rounded-[2rem] bg-nim-primary p-5 text-white shadow-lg"
    >
      <h2
        id="portalstatus-title"
        className="text-xs font-black uppercase tracking-widest text-white"
      >
        Portalstatus
      </h2>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-4xl font-black">{progressText}</p>
          <p className="mt-1 text-sm font-semibold text-white">lokal erledigt</p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-black">{progressPercent}%</p>
          <p className="text-xs font-semibold text-white">
            von {totalLessons || 12} Lektionen
          </p>
        </div>
      </div>

      <div
        className="mt-5 h-3 overflow-hidden rounded-full bg-white/25"
        role="progressbar"
        aria-label="Lernfortschritt"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        aria-valuetext={`${progressText} Lektionen lokal erledigt`}
      >
        <div
          className="h-full rounded-full bg-white transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  );
}
