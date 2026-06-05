"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Download, ArrowRight, Code2, Database, Brain } from "lucide-react";
import { portfolioData } from "@/lib/data";
import ParticleBackground from "./ParticleBackground";
import dynamic from "next/dynamic";

const Tilt = dynamic(() => import("react-parallax-tilt"), { ssr: false });

const TYPED_ROLES = [
  "Data Scientist",
  "AI Engineer",
  "ML Engineer",
  "Python Developer",
];

const SKILL_BADGES = [
  { icon: Brain, label: "Machine Learning" },
  { icon: Database, label: "Data Analysis" },
  { icon: Code2, label: "Python & SQL" },
];

function TypedText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentRole = TYPED_ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!deleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % TYPED_ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <span className="gold-text font-display">
      {displayText}
      <span className="animate-pulse text-amber-400">|</span>
    </span>
  );
}

export default function HeroSection() {
  const { personalInfo } = portfolioData;

  const handleScrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Particles */}
      <ParticleBackground />

      {/* Deep navy overlay gradient */}
      <div className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,32,64,0.3) 0%, rgba(2,8,23,0.7) 100%)",
        }}
      />

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2]"
        style={{
          background: "linear-gradient(to top, #020817 0%, transparent 100%)",
        }}
      />

      {/* Gold radial glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 30% at 70% 40%, rgba(251,191,36,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-[3] container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 max-w-6xl">
        {/* Left content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono text-amber-400/80 tracking-widest uppercase">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* Main title */}
          <motion.h1
            variants={fadeUp}
            className="hero-title font-display font-bold leading-[1.1] mb-4"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            <span className="text-white">Hi, I'm </span>
            <span className="gold-glow text-amber-400">{personalInfo.name}</span>
          </motion.h1>

          {/* Typed role */}
          <motion.div
            variants={fadeUp}
            className="text-xl sm:text-2xl mb-6 font-display h-9"
          >
            <TypedText />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Skill badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10">
            {SKILL_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-amber-500/15 text-xs text-amber-300/70 font-mono"
              >
                <Icon size={12} className="text-amber-400" />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={handleScrollToProjects}
              className="group relative flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/45 hover:scale-105 active:scale-95 overflow-hidden"
              style={{ animation: "pulseGold 3s ease-in-out infinite" }}
            >
              <span>Explore My Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={personalInfo.cvFile}
              download
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-amber-400 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
            >
              <Download size={16} />
              <span>Download CV</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Profile image with tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <Tilt
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            glareEnable={true}
            glareMaxOpacity={0.12}
            glareColor="#f59e0b"
            glarePosition="all"
            glareBorderRadius="50%"
            scale={1.04}
            transitionSpeed={1500}
            className="cursor-pointer"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Animated gold ring */}
              <div
                className="absolute -inset-4 rounded-full animate-pulse-gold"
                style={{
                  background: "conic-gradient(from 0deg, #f59e0b, transparent, transparent, #f59e0b, transparent, #d97706, transparent)",
                  opacity: 0.6,
                  borderRadius: "50%",
                  padding: "2px",
                }}
              >
                <div className="w-full h-full rounded-full bg-[#020817]" />
              </div>

              {/* Outer glow ring */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  boxShadow: "0 0 40px rgba(251,191,36,0.2), 0 0 80px rgba(251,191,36,0.08)",
                  borderRadius: "50%",
                }}
              />

              {/* Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-amber-500/30 bg-navy-800">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  onError={(e) => {
                    // Fallback to placeholder gradient
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                {/* Overlay tint */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/5 to-blue-900/10 pointer-events-none" />
              </div>

              {/* Floating stat badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-4 glass border border-amber-500/25 rounded-2xl px-3 py-2 shadow-xl"
              >
                <div className="text-xs text-gray-400 font-mono">Best AUC</div>
                <div className="text-lg font-bold gold-text font-mono">0.98</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-2 -left-4 glass border border-amber-500/25 rounded-2xl px-3 py-2 shadow-xl"
              >
                <div className="text-xs text-gray-400 font-mono">Projects</div>
                <div className="text-lg font-bold gold-text font-mono">20+</div>
              </motion.div>
            </div>
          </Tilt>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-amber-500/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
