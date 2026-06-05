"use client";

import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticleBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // الطريقة المستقرة والمضمونة لتهيئة الشبكة العصبية
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10 h-full w-full"
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: !isMobile,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
                color: "#f59e0b",
              },
            },
          },
        },
        particles: {
          color: {
            value: ["#f59e0b", "#fbbf24", "#1e3a8a", "#3b82f6"],
          },
          links: {
            color: "#f59e0b",
            distance: isMobile ? 100 : 140,
            enable: true,
            opacity: isMobile ? 0.07 : 0.12,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: isMobile ? 0.35 : 0.55,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: isMobile ? 1400 : 800,
            },
            value: isMobile ? 22 : 60,
          },
          opacity: {
            value: { min: 0.08, max: isMobile ? 0.35 : 0.5 },
            animation: {
              enable: true,
              speed: 0.8,
              sync: false,
            },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 1, max: isMobile ? 2 : 2.5 },
          },
        },
        detectRetina: true,
        background: { color: "transparent" },
      }}
    />
  );
}