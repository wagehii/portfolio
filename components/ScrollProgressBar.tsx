"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #d97706, #f59e0b, #fbbf24, #fde68a)",
        boxShadow: "0 0 10px rgba(251,191,36,0.8), 0 0 20px rgba(251,191,36,0.4)",
      }}
    />
  );
}
