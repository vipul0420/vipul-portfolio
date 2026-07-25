type SectionHeadingProps = {
  eyebrow: string;
  title: [string, string];
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="mb-4 inline-flex items-center rounded-[var(--radius-pill)] border border-line bg-surface px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-muted uppercase">
        {eyebrow}
      </p>
      <h2 className="text-4xl leading-[1.05] tracking-tight text-ink-deep sm:text-5xl md:text-6xl">
        <span className="block font-display italic">{title[0]}</span>
        <span className="block font-sans font-semibold">{title[1]}</span>
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
