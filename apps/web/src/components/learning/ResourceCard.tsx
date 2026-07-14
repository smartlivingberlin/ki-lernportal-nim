import type { ResourceCard as ResourceCardItem } from "../../data/types";

type ResourceCardProps = {
  resource: ResourceCardItem;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="rounded-3xl bg-slate-50 p-5">
      <p className="text-xs font-black uppercase tracking-widest text-nim-secondary">
        {resource.provider}
      </p>
      <h3 className="mt-2 text-xl font-black text-nim-primary">
        {resource.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-nim-secondary">
        {resource.benefit}
      </p>
      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex rounded-2xl bg-nim-primary px-4 py-3 text-sm font-black text-white hover:bg-nim-primary/90"
      >
        Extern öffnen
      </a>
    </article>
  );
}
