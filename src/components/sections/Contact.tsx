"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/content";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title={["Let’s talk", "your next build"]}
            description={site.availability}
          />

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-base text-ink transition-colors hover:text-ink-deep"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                <Mail size={16} aria-hidden />
              </span>
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-3 text-base text-ink transition-colors hover:text-ink-deep"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                <Phone size={16} aria-hidden />
              </span>
              {site.phone}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-base text-ink transition-colors hover:text-ink-deep"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                <LinkedInIcon size={16} />
              </span>
              LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={handleSubmit}
            className="rounded-[var(--radius-card)] border border-line bg-surface p-6 md:p-8"
            noValidate
          >
            <p className="mb-6 text-sm tracking-[0.1em] text-label uppercase">
              Fill this form below
            </p>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink/40"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-muted">Email</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink/40"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-muted">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  className="w-full resize-y rounded-2xl border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink/40"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-ink-deep px-6 py-3.5 text-sm font-medium text-canvas transition-colors hover:bg-accent-soft sm:w-auto"
            >
              Send message
              <Send size={15} aria-hidden />
            </button>
            <p className="mt-3 text-xs text-muted">
              Opens your email client — no backend required.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
