import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/content";

export function Experience() {
  return (
    <section id="experience" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title={["Roles that", "shipped product"]}
            description="Two production-focused React Native roles — campus-scale security work at C3IHUB, and cross-platform product delivery at DigiMantra Labs."
          />
        </Reveal>

        <ol className="relative mt-14 space-y-0">
          <div
            className="absolute top-3 bottom-3 left-[15px] w-px bg-line md:left-[23px]"
            aria-hidden
          />
          {experience.map((role, index) => (
            <li key={role.id} className="relative pb-12 last:pb-0">
              <Reveal delay={index * 0.06}>
                <div className="grid gap-6 md:grid-cols-[88px_1fr] md:gap-10">
                  <div className="relative z-10 flex items-start">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface font-mono text-xs text-ink-deep md:h-12 md:w-12 md:text-sm">
                      /{role.id}
                    </span>
                  </div>

                  <article className="rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl text-ink-deep md:text-3xl">
                          {role.title}
                        </h3>
                        <p className="mt-1 text-base text-ink">
                          {role.company}
                          <span className="text-muted"> · {role.location}</span>
                        </p>
                      </div>
                      <p className="rounded-[var(--radius-pill)] border border-line bg-canvas px-3 py-1.5 text-xs tracking-wide text-label uppercase">
                        {role.period}
                      </p>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {role.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-deep"
                            aria-hidden
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
