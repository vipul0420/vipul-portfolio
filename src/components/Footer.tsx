import { ArrowUp, Mail, Phone } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { site } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-sans text-xl font-medium lowercase tracking-tight text-ink-deep">
            {site.name.split(" ")[0].toLowerCase()}
          </p>
          <p className="mt-2 text-sm text-muted">{site.role}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-ink-deep"
            aria-label="Email"
          >
            <Mail size={16} aria-hidden />
            Email
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-ink-deep"
            aria-label="Phone"
          >
            <Phone size={16} aria-hidden />
            Phone
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-ink-deep"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>
        </div>

        <a
          href="#hero"
          className="inline-flex items-center gap-2 self-start rounded-[var(--radius-pill)] border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-ink/30 hover:text-ink-deep md:self-auto"
        >
          Back to top
          <ArrowUp size={14} aria-hidden />
        </a>
      </div>
    </footer>
  );
}
