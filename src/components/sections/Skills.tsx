import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/data/content";

export function Skills() {
  return (
    <section id="skills" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title={["What I", "work with"]}
            description="Frameworks, tools, and practices used to ship secure cross-platform mobile products."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.06}>
              <article className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-7">
                <p className="font-mono text-xs text-muted">/{group.id}</p>
                <h3 className="mt-3 font-display text-2xl text-ink-deep">
                  {group.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-[var(--radius-pill)] border border-line bg-canvas px-3 py-1.5 text-sm text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
