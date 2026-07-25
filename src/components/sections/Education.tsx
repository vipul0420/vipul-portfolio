import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/content";

export function Education() {
  return (
    <section id="education" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Education"
            title={["Foundation", "& formation"]}
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-8">
                <p className="font-mono text-xs text-muted">
                  /{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl text-ink-deep md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-base text-ink">{item.school}</p>
                <p className="mt-4 text-sm tracking-wide text-muted uppercase">
                  {item.period}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
