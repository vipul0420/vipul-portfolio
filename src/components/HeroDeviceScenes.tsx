"use client";

import { motion } from "framer-motion";
import { Check, Lock, MapPin } from "lucide-react";

export const SCENES = ["verifier", "mind-fossil", "osr-jobs"] as const;
export type HeroScene = (typeof SCENES)[number];

export const SCENE_LABELS: Record<HeroScene, string> = {
  verifier: "IITK Verifier",
  "mind-fossil": "Mind Fossil",
  "osr-jobs": "OSR Jobs",
};

type HeroDeviceSceneProps = {
  scene: HeroScene;
  reduceMotion: boolean;
};

const shellClass =
  "flex h-full flex-col items-center bg-[radial-gradient(ellipse_at_50%_18%,rgba(107,124,255,0.22),transparent_55%),linear-gradient(180deg,#12121a_0%,#0a0a0e_100%)] px-5 pt-14 pb-9";

export function HeroDeviceScene({ scene, reduceMotion }: HeroDeviceSceneProps) {
  switch (scene) {
    case "verifier":
      return <VerifierScene reduceMotion={reduceMotion} />;
    case "mind-fossil":
      return <MindFossilScene />;
    case "osr-jobs":
      return <OsrJobsScene reduceMotion={reduceMotion} />;
  }
}

function SceneLabel({ children }: { children: string }) {
  return (
    <p className="shrink-0 text-[10px] tracking-[0.22em] text-white/45 uppercase">
      {children}
    </p>
  );
}

function VerifierScene({ reduceMotion }: { reduceMotion: boolean }) {
  const scanDuration = 1.35;
  const resultDelay = reduceMotion ? 0 : scanDuration;

  return (
    <div className={shellClass}>
      <SceneLabel>IITK Verifier</SceneLabel>

      <div className="mt-7 flex w-full flex-1 flex-col items-center justify-center gap-5">
        <div className="relative flex h-[7.25rem] w-[7.25rem] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          <SignedQr />
          {!reduceMotion && (
            <motion.div
              className="absolute inset-x-3 h-0.5 rounded-full bg-[#c8c0ff]/90 shadow-[0_0_12px_rgba(139,124,255,0.75)]"
              initial={{ top: "10%", opacity: 0 }}
              animate={{ top: ["10%", "88%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: scanDuration, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </div>

        <motion.div
          className="w-full rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-3"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: resultDelay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-black">
              <Check size={12} strokeWidth={3} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-emerald-200">
                Verified · DigiLocker
              </p>
              <p className="mt-1 text-[11px] text-white/45">
                Student ID · IIT Kanpur
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MindFossilScene() {
  return (
    <div className={shellClass}>
      <SceneLabel>Mind Fossil</SceneLabel>

      <div className="mt-7 flex w-full flex-1 flex-col items-center justify-center gap-5">
        <div className="relative flex h-[7.25rem] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a28] via-[#14141c] to-[#0f0f14] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_-24px_rgba(107,124,255,0.45)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(200,192,255,0.55), transparent 42%), radial-gradient(circle at 80% 70%, rgba(107,124,255,0.4), transparent 45%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#c8c0ff]">
              <Lock size={18} aria-hidden />
            </span>
            <p className="text-[10px] tracking-[0.18em] text-white/40 uppercase">
              Sealed capsule
            </p>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-center">
          <p className="text-sm font-medium text-white">Unlocks in 214 days</p>
          <p className="mt-1 text-[11px] text-white/45">
            Encrypted with Expo Secure Store
          </p>
        </div>
      </div>
    </div>
  );
}

function OsrJobsScene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className={shellClass}>
      <SceneLabel>OSR Jobs</SceneLabel>

      <div className="mt-7 flex w-full flex-1 flex-col items-center justify-center gap-5">
        <div className="relative h-[7.25rem] w-full">
          <motion.div
            className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a28] via-[#14141c] to-[#0f0f14] p-3.5 shadow-[0_20px_40px_-24px_rgba(107,124,255,0.45)]"
            initial={reduceMotion ? false : { x: 0, rotate: 0 }}
            animate={
              reduceMotion
                ? { x: 0, rotate: 0 }
                : { x: [0, 18, 12], rotate: [0, 4, 2.5] }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div>
              <p className="text-sm font-semibold text-white">Frontend Engineer</p>
              <p className="mt-1 text-[11px] text-white/45">DigiMantra Labs</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/55">
                <MapPin size={10} aria-hidden />
                Remote
              </span>
              <motion.span
                className="rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2 py-0.5 text-[9px] font-medium tracking-wide text-emerald-300 uppercase"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.45, duration: 0.3 }}
              >
                Matched
              </motion.span>
            </div>
          </motion.div>
        </div>

        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-3 text-center">
          <p className="text-[11px] tracking-wide text-white/55">
            Payment secured · Stripe
          </p>
        </div>
      </div>
    </div>
  );
}

function SignedQr() {
  const cells = [
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1,
    1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1,
  ];

  return (
    <div className="grid h-[5.25rem] w-[5.25rem] shrink-0 grid-cols-7 gap-[2px] rounded-lg bg-white p-1.5">
      {cells.map((on, i) => (
        <span
          key={i}
          className={`rounded-[1px] ${on ? "bg-black" : "bg-transparent"}`}
        />
      ))}
    </div>
  );
}
