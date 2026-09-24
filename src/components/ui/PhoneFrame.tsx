"use client";

import { useState } from "react";

type PhoneFrameProps = {
  title: string;
  image?: string;
  accent?: string;
};

export function PhoneFrame({
  title,
  image,
  accent = "from-glow/25 via-surface to-surface-elevated",
}: PhoneFrameProps) {
  const [showImage, setShowImage] = useState(Boolean(image));

  return (
    <div className="relative mx-auto w-[168px] shrink-0 sm:w-[188px]" aria-hidden>
      <div className="rounded-[var(--radius-phone)] border border-line bg-[#0b0b0b] p-2.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]">
        <div className="relative overflow-hidden rounded-[32px] bg-surface aspect-[9/19]">
          <div className="absolute top-2.5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-canvas" />
          {showImage && image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              onError={() => setShowImage(false)}
            />
          ) : (
            <div
              className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-br ${accent} p-5`}
            >
              <div className="mb-auto mt-10 space-y-2">
                <div className="h-2 w-2/3 rounded-full bg-ink/15" />
                <div className="h-2 w-1/2 rounded-full bg-ink/15" />
                <div className="mt-4 aspect-[4/3] rounded-2xl border border-line bg-surface-elevated/80 shadow-sm" />
                <div className="h-2 w-full rounded-full bg-ink/15" />
                <div className="h-2 w-4/5 rounded-full bg-ink/15" />
              </div>
              <p className="font-sans text-lg font-semibold leading-tight text-ink-deep">
                {title}
              </p>
              <p className="mt-1 text-[10px] tracking-wide text-muted uppercase">
                Screenshot soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
