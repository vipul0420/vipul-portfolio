"use client";

import dynamic from "next/dynamic";
import { ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/content";

const HeroPhone3D = dynamic(() => import("@/components/HeroPhone3D"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full" aria-hidden>
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_center,rgba(107,124,255,0.18),transparent_68%)] blur-2xl" />
    </div>
  ),
});

export function Hero() {
  const firstName = site.name.split(" ")[0];
  const lastName = site.name.split(" ").slice(1).join(" ");

  return (
    <section
      id="hero"
      className="relative min-h-[min(92vh,920px)] overflow-hidden px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12"
    >
      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6">
        <div className="relative z-10">
          <Reveal>
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-line bg-surface/80 px-3 py-1.5 text-xs font-medium tracking-wide text-ink-deep uppercase backdrop-blur">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-plum shadow-[0_0_10px_rgba(139,124,255,0.9)]"
                  aria-hidden
                />
                Available
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={14} aria-hidden />
                {site.location}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="max-w-xl text-5xl leading-[0.95] tracking-tight text-ink-deep sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              <span className="block font-sans font-semibold">
                {firstName},
              </span>
              <span className="mt-1 block font-display text-[1.08em] italic">
                {lastName}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-muted md:text-xl">{site.role}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              {site.pitch}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-ink-deep px-6 py-3.5 text-sm font-medium text-canvas transition-colors hover:bg-accent-soft"
              >
                Contact Me
                <ArrowRight size={16} aria-hidden />
              </a>
              <a
                href={site.resume}
                download="Vipul-Sharma-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-line bg-surface/60 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink/30 hover:bg-surface"
              >
                Download Resume
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 border-t border-line pt-6">
              <p className="text-xs tracking-[0.14em] text-muted uppercase">
                I build
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink">
                Secure React Native apps · Campus identity systems ·
                Offline-first wallets
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative z-0 mx-auto aspect-[4/5] w-full max-w-[420px] sm:max-w-[460px] lg:max-w-none lg:aspect-square">
          <HeroPhone3D />
        </div>
      </div>

      <div
        className="relative z-10 mx-auto mt-10 flex max-w-6xl justify-center"
        aria-hidden
      >
        <a
          href="#about"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-ink/40 hover:text-ink-deep"
          aria-label="Scroll to about"
        >
          <span className="block h-3 w-px bg-current" />
        </a>
      </div>
    </section>
  );
}
