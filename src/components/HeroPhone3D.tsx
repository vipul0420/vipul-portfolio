"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import * as THREE from "three";
import {
  HeroDeviceScene,
  SCENES,
  SCENE_LABELS,
  type HeroScene,
} from "@/components/HeroDeviceScenes";

type HeroPhone3DProps = {
  className?: string;
};

const CYCLE_MS = 4000;
const CLICK_PAUSE_MS = 8000;
const TRANSITION_S = 0.4;
const MAX_TILT_DEG = 12;
const MAX_TILT = (MAX_TILT_DEG * Math.PI) / 180;
const LERP_SPEED = 4.2;

const PHONE = {
  w: 1.08,
  h: 2.22,
  d: 0.092,
  radius: 0.105,
  screenW: 0.98,
  screenH: 2.08,
} as const;

const SCREEN_CSS_W = 270;
const SCREEN_CSS_H = Math.round(SCREEN_CSS_W * (PHONE.screenH / PHONE.screenW));
// drei Html transform: worldWidth ≈ cssWidth * (distanceFactor / 400)
const SCREEN_DISTANCE_FACTOR = (PHONE.screenW * 400) / SCREEN_CSS_W;

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

export default function HeroPhone3D({ className = "" }: HeroPhone3DProps) {
  const reduceMotion = useReducedMotion();
  const [scene, setScene] = useState<HeroScene>(SCENES[0]);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [clickPauseKey, setClickPauseKey] = useState(0);
  const [inView, setInView] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ x: 0, y: 0, active: false });
  const isTouchRef = useRef(false);

  const clickPaused = clickPauseKey > 0;
  const autoPaused = !!reduceMotion || hoverPaused || clickPaused;

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouch(touch);
    isTouchRef.current = touch;
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "40px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (autoPaused) return;

    const id = window.setInterval(() => {
      setScene((current) => {
        const index = SCENES.indexOf(current);
        return SCENES[(index + 1) % SCENES.length];
      });
    }, CYCLE_MS);

    return () => window.clearInterval(id);
  }, [autoPaused]);

  useEffect(() => {
    if (clickPauseKey === 0) return;
    const id = window.setTimeout(() => setClickPauseKey(0), CLICK_PAUSE_MS);
    return () => window.clearTimeout(id);
  }, [clickPauseKey]);

  useEffect(() => {
    if (reduceMotion || isTouch) {
      pointer.current = { x: 0, y: 0, active: false };
      return;
    }

    const hero = document.getElementById("hero");
    if (!hero) return;

    const onMove = (event: PointerEvent) => {
      if (!inView) {
        pointer.current.active = false;
        return;
      }
      const rect = hero.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      pointer.current.x = THREE.MathUtils.clamp(px * 2, -1, 1);
      pointer.current.y = THREE.MathUtils.clamp(py * 2, -1, 1);
      pointer.current.active = true;
    };

    const onLeave = () => {
      pointer.current.active = false;
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, isTouch, inView]);

  const selectScene = (next: HeroScene) => {
    setScene(next);
    if (!reduceMotion) {
      setClickPauseKey((key) => key + 1);
    }
  };

  const frameloop = !inView ? "never" : reduceMotion ? "demand" : "always";

  return (
    <div
      ref={containerRef}
      className={`relative flex h-full w-full items-center justify-center ${className}`}
    >
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_center,rgba(107,124,255,0.22),transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-[18%] bottom-[6%] h-16 rounded-[100%] bg-black/55 blur-2xl" />

      <div className="relative h-full w-full max-w-[340px] sm:max-w-[380px]">
        <Canvas
          dpr={[1, 2]}
          frameloop={frameloop}
          camera={{ position: [0, 0.05, 4.35], fov: 30, near: 0.1, far: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
        >
          <PhoneScene
            scene={scene}
            reduceMotion={!!reduceMotion}
            pointer={pointer}
            isTouchRef={isTouchRef}
            onScreenEnter={() => setHoverPaused(true)}
            onScreenLeave={() => setHoverPaused(false)}
          />
        </Canvas>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center gap-2">
        {SCENES.map((id) => {
          const active = scene === id;
          return (
            <button
              key={id}
              type="button"
              aria-label={`Show ${SCENE_LABELS[id]}`}
              aria-current={active ? "true" : undefined}
              onClick={() => selectScene(id)}
              className="flex h-6 items-center justify-center px-0.5"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-500 ${
                  active
                    ? "w-5 bg-ink-deep"
                    : "w-1.5 bg-line hover:bg-ink/50"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

type PhoneSceneProps = {
  scene: HeroScene;
  reduceMotion: boolean;
  pointer: MutableRefObject<PointerState>;
  isTouchRef: MutableRefObject<boolean>;
  onScreenEnter: () => void;
  onScreenLeave: () => void;
};

function PhoneScene({
  scene,
  reduceMotion,
  pointer,
  isTouchRef,
  onScreenEnter,
  onScreenLeave,
}: PhoneSceneProps) {
  return (
    <>
      <ambientLight intensity={0.28} />
      {/* Key — upper front */}
      <directionalLight
        position={[2.4, 3.2, 4.2]}
        intensity={1.35}
        color="#f2f4ff"
      />
      {/* Fill — opposite, softer */}
      <directionalLight
        position={[-3.2, 0.6, 2.2]}
        intensity={0.35}
        color="#9aa6ff"
      />
      {/* Rim — silhouette separation */}
      <directionalLight
        position={[-1.2, 1.4, -3.6]}
        intensity={0.85}
        color="#c8c0ff"
      />

      <PhoneModel
        scene={scene}
        reduceMotion={reduceMotion}
        pointer={pointer}
        isTouchRef={isTouchRef}
        onScreenEnter={onScreenEnter}
        onScreenLeave={onScreenLeave}
      />
    </>
  );
}

function PhoneModel({
  scene,
  reduceMotion,
  pointer,
  isTouchRef,
  onScreenEnter,
  onScreenLeave,
}: PhoneSceneProps) {
  const group = useRef<THREE.Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (reduceMotion) invalidate();
  }, [reduceMotion, scene, invalidate]);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    if (reduceMotion) {
      node.rotation.set(0, 0, 0);
      return;
    }

    const t = state.clock.elapsedTime;
    let targetX = 0;
    let targetY = 0;

    if (isTouchRef.current) {
      targetY = Math.sin(t * 0.32) * MAX_TILT * 0.5;
      targetX = Math.sin(t * 0.24 + 0.6) * MAX_TILT * 0.22;
    } else if (pointer.current.active) {
      targetY = pointer.current.x * MAX_TILT;
      targetX = -pointer.current.y * MAX_TILT;
      targetY += Math.sin(t * 0.45) * 0.018;
      targetX += Math.cos(t * 0.38) * 0.012;
    } else {
      targetY = Math.sin(t * 0.4) * 0.035;
      targetX = Math.sin(t * 0.33 + 1.1) * 0.022;
    }

    const alpha = 1 - Math.exp(-LERP_SPEED * delta);
    node.rotation.x += (targetX - node.rotation.x) * alpha;
    node.rotation.y += (targetY - node.rotation.y) * alpha;
  });

  const screenZ = PHONE.d / 2 + 0.001;

  return (
    <group ref={group} position={[0, -0.02, 0]} rotation={[0.04, -0.12, 0]}>
      {/* Body */}
      <RoundedBox
        args={[PHONE.w, PHONE.h, PHONE.d]}
        radius={PHONE.radius}
        smoothness={8}
      >
        <meshPhysicalMaterial
          color="#141416"
          metalness={0.72}
          roughness={0.28}
          clearcoat={0.55}
          clearcoatRoughness={0.22}
        />
      </RoundedBox>

      {/* Slightly inset screen well */}
      <mesh position={[0, 0, PHONE.d / 2 - 0.004]}>
        <planeGeometry args={[PHONE.screenW + 0.02, PHONE.screenH + 0.02]} />
        <meshStandardMaterial color="#050508" roughness={0.9} metalness={0} />
      </mesh>

      {/* Side buttons */}
      <mesh position={[-PHONE.w / 2 - 0.008, 0.42, 0]}>
        <boxGeometry args={[0.016, 0.12, 0.04]} />
        <meshPhysicalMaterial color="#1c1c1e" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-PHONE.w / 2 - 0.008, 0.22, 0]}>
        <boxGeometry args={[0.016, 0.18, 0.04]} />
        <meshPhysicalMaterial color="#1c1c1e" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-PHONE.w / 2 - 0.008, 0.02, 0]}>
        <boxGeometry args={[0.016, 0.18, 0.04]} />
        <meshPhysicalMaterial color="#1c1c1e" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[PHONE.w / 2 + 0.008, 0.18, 0]}>
        <boxGeometry args={[0.016, 0.28, 0.04]} />
        <meshPhysicalMaterial color="#1c1c1e" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Glass face under the Html layer — edge specular when the device turns */}
      <mesh position={[0, 0, screenZ]}>
        <planeGeometry args={[PHONE.screenW, PHONE.screenH]} />
        <meshPhysicalMaterial
          color="#0c0c14"
          metalness={0.12}
          roughness={0.04}
          transmission={0.35}
          thickness={0.02}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.03}
          transparent
          opacity={0.35}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Screen UI — distanceFactor maps CSS px → phone screen world size */}
      <Html
        transform
        distanceFactor={SCREEN_DISTANCE_FACTOR}
        position={[0, 0, screenZ + 0.008]}
        style={{
          width: SCREEN_CSS_W,
          height: SCREEN_CSS_H,
          borderRadius: 36,
          overflow: "hidden",
        }}
        pointerEvents="auto"
      >
        <div
          className="relative h-full w-full bg-[#0e0e12]"
          onPointerEnter={onScreenEnter}
          onPointerLeave={onScreenLeave}
        >
          <div className="absolute top-3 left-1/2 z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
          <div className="pointer-events-none absolute inset-0 z-10 rounded-[36px] ring-1 ring-inset ring-white/10" />

          <AnimatePresence mode="wait">
            <ScreenPane key={scene}>
              <HeroDeviceScene scene={scene} reduceMotion={reduceMotion} />
            </ScreenPane>
          </AnimatePresence>

          <div className="absolute bottom-2.5 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-white/25" />

          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-[36px]"
            style={{
              background:
                "linear-gradient(125deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 28%, transparent 48%)",
            }}
          />
        </div>
      </Html>
    </group>
  );
}

function ScreenPane({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: TRANSITION_S, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
