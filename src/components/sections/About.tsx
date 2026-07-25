import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, languages, site } from "@/data/content";

export function About() {
  return (
    <section id="about" className="relative px-5 py-20 md:px-8 md:py-28">
      <p
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(4rem,18vw,14rem)] italic leading-none text-ink-deep/[0.04] select-none lg:block"
        aria-hidden
      >
        vipul
      </p>
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <Reveal>
          <SectionHeading
            eyebrow={about.eyebrow}
            title={about.title}
            description={about.body}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7 md:p-8">
            <dl className="space-y-6">
              <div>
                <dt className="text-xs tracking-[0.12em] text-label uppercase">
                  Based in
                </dt>
                <dd className="mt-2 text-lg text-ink-deep">{site.location}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.12em] text-label uppercase">
                  Open to
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted">
                  Remote freelance · Part-time (10–20 hrs/week) · Contract React
                  Native
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.12em] text-label uppercase">
                  Languages
                </dt>
                <dd className="mt-2 space-y-1">
                  {languages.map((lang) => (
                    <p key={lang.name} className="text-base text-ink">
                      {lang.name}
                      <span className="text-muted"> — {lang.level}</span>
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
