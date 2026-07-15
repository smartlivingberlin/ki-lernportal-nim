type LearningBlockProps = {
  title: string;
  text: string;
  large?: boolean;
};

export function LearningBlock({
  title,
  text,
  large = false,
}: LearningBlockProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-black uppercase tracking-widest text-nim-secondary">
        {title}
      </h3>
      <div
        className={`mt-3 whitespace-pre-line text-slate-800 ${
          large ? "text-base leading-8" : "text-sm leading-7"
        }`}
      >
        {text}
      </div>
    </section>
  );
}
