"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled || open ? "bg-canvas/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="font-sans text-lg font-medium tracking-tight text-ink-deep lowercase"
        >
          {site.name.split(" ")[0].toLowerCase()}
        </a>

        <ul className="hidden items-center gap-1 rounded-[var(--radius-pill)] border border-line bg-surface/70 px-2 py-1.5 backdrop-blur-md md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-[var(--radius-pill)] px-3.5 py-1.5 text-sm text-muted transition-colors hover:bg-surface-elevated hover:text-ink-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.resume}
            className="rounded-[var(--radius-pill)] border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-ink/30 hover:text-ink-deep"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-ink-deep px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-accent-soft"
          >
            Let&apos;s Chat!
            <ArrowRight size={14} aria-hidden />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-canvas px-5 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-lg text-ink-deep"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={site.resume}
              className="rounded-[var(--radius-pill)] border border-line px-4 py-3 text-center text-sm"
              onClick={() => setOpen(false)}
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="rounded-[var(--radius-pill)] bg-ink-deep px-4 py-3 text-center text-sm font-medium text-canvas"
              onClick={() => setOpen(false)}
            >
              Let&apos;s Chat!
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
