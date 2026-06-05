"use client";

import { useEffect, useRef, useState } from "react";

export default function MagneticCursor() {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Attach to all interactive elements
    const interactiveEls = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-magnetic]"
    );

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    // Smooth cursor follow with lerp
    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.12);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.12);

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${posRef.current.x}px`;
        cursorRingRef.current.style.top = `${posRef.current.y}px`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${targetRef.current.x}px`;
        cursorDotRef.current.style.top = `${targetRef.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  // Re-attach on DOM changes
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const observer = new MutationObserver(() => {
      const handleHoverStart = () => setIsHovering(true);
      const handleHoverEnd = () => setIsHovering(false);
      const interactiveEls = document.querySelectorAll(
        "a, button, [role='button'], input, textarea"
      );
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Outer ring - lagging */}
      <div
        ref={cursorRingRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: -100,
          top: -100,
          transform: "translate(-50%, -50%)",
          width: isHovering ? "48px" : "28px",
          height: isHovering ? "48px" : "28px",
          borderRadius: "50%",
          border: isHovering
            ? "2px solid rgba(251,191,36,0.9)"
            : "1.5px solid rgba(251,191,36,0.6)",
          boxShadow: isHovering
            ? "0 0 20px rgba(251,191,36,0.6), 0 0 40px rgba(251,191,36,0.2), inset 0 0 15px rgba(251,191,36,0.1)"
            : "0 0 8px rgba(251,191,36,0.2)",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
          opacity: isVisible ? 1 : 0,
          mixBlendMode: "normal",
          backgroundColor: isHovering ? "rgba(251,191,36,0.05)" : "transparent",
        }}
      />
      {/* Inner dot - precise */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          left: -100,
          top: -100,
          transform: "translate(-50%, -50%)",
          width: isHovering ? "6px" : "4px",
          height: isHovering ? "6px" : "4px",
          borderRadius: "50%",
          backgroundColor: "#fbbf24",
          boxShadow: "0 0 6px rgba(251,191,36,0.8)",
          transition: "width 0.15s ease, height 0.15s ease",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
