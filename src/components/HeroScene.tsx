"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type HeroSceneProps = {
  className?: string;
};

export function HeroScene({ className = "" }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 640;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(3.5, 4, 2);
    scene.add(key);

    const fill = new THREE.PointLight(0x6b7cff, 28, 18);
    fill.position.set(-2.5, 0.5, 2);
    scene.add(fill);

    const rim = new THREE.PointLight(0xffffff, 18, 14);
    rim.position.set(1.5, -1.5, -2);
    scene.add(rim);

    const chrome = new THREE.MeshStandardMaterial({
      color: 0xc8cdd6,
      metalness: 1,
      roughness: 0.18,
      envMapIntensity: 1.2,
    });

    // Procedural environment for chrome reflections without external HDR
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.add(new THREE.AmbientLight(0xffffff, 1));
    const envLight1 = new THREE.DirectionalLight(0xffffff, 2);
    envLight1.position.set(1, 1, 1);
    envScene.add(envLight1);
    const envLight2 = new THREE.DirectionalLight(0x6b7cff, 1.2);
    envLight2.position.set(-1, -0.5, -1);
    envScene.add(envLight2);
    const envMap = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envMap;
    chrome.envMap = envMap;

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.72, 0.22, 180, 28),
      chrome,
    );
    knot.rotation.x = 0.35;
    scene.add(knot);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.35, 0.015, 16, 100),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.25,
        transparent: true,
        opacity: 0.35,
      }),
    );
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    const grid = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.06,
      }),
    );
    grid.rotation.x = -Math.PI / 2.15;
    grid.position.y = -1.35;
    scene.add(grid);

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let frame = 0;
    let disposed = false;

    const renderStatic = () => {
      knot.rotation.y = 0.6;
      knot.rotation.x = 0.45;
      renderer.render(scene, camera);
    };

    const animate = (time: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      const t = time * 0.001;
      knot.rotation.y = t * 0.35;
      knot.rotation.x = 0.35 + Math.sin(t * 0.4) * 0.08;
      ring.rotation.z = t * 0.15;
      grid.position.z = Math.sin(t * 0.2) * 0.08;
      camera.position.x += (pointer.x * 0.35 - camera.position.x) * 0.04;
      camera.position.y += (0.35 + pointer.y * 0.2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      renderStatic();
    } else {
      frame = requestAnimationFrame(animate);
    }

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reduceMotion) renderStatic();
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      chrome.dispose();
      knot.geometry.dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
      envMap.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}
