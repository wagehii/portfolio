"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import TerminalIntro from "@/components/TerminalIntro";
import MagneticCursor from "@/components/MagneticCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [terminalDone, setTerminalDone] = useState(false);

  const handleTerminalComplete = useCallback(() => {
    setTerminalDone(true);
  }, []);

  return (
    <>
      {/* Custom cursor — always mounted */}
      <MagneticCursor />

      {/* Terminal Intro */}
      {!terminalDone && <TerminalIntro onComplete={handleTerminalComplete} />}

      {/* Main site — fades in after terminal */}
      <AnimatePresence>
        {terminalDone && (
          <motion.div
            key="main-site"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Scroll progress bar */}
            <ScrollProgressBar />

            {/* Sticky navbar */}
            <Navbar />

            {/* Main content */}
            <main>
              <HeroSection />
              <AboutSection />
              <ProjectsSection />
              <ContactSection />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
