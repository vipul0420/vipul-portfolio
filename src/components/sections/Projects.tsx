"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/content";

const accents = [
  "from-glow/30 via-surface to-surface-elevated",
  "from-white/10 via-surface to-glow/20",
  "from-plum/25 via-surface to-surface-elevated",
  "from-glow/15 via-surface to-white/5",
];

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title={["Apps in", "production"]}
            description="Identity, verification, credential wallets, and family products — built for real users at campus and consumer scale."
          />
        </Reveal>

        <div className="mt-14 grid gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <motion.article
                className="group grid gap-8 rounded-[var(--radius-card)] border border-line bg-surface p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-8"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        boxShadow: "0 28px 60px -28px rgba(107,124,255,0.35)",
                      }
                }
                transition={{ duration: 0.25 }}
              >
                <PhoneFrame
                  title={project.name}
                  image={project.image}
                  accent={accents[index % accents.length]}
                />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-muted">
                      /{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-[var(--radius-pill)] border border-line bg-canvas px-3 py-1 text-xs tracking-wide text-label uppercase">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-3xl text-ink-deep md:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-lg text-ink">{project.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                    {project.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {project.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-ink"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-deep"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-[var(--radius-pill)] border border-line px-3 py-1 text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
