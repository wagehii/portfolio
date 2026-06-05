"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/lib/data";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { personalInfo } = portfolioData;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className={`fixed top-2 left-0 right-0 z-[50] mx-4 md:mx-8 lg:mx-16 transition-all duration-500`}
      >
        <div
          className={`rounded-2xl px-5 py-3.5 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "glass shadow-2xl shadow-black/30 border border-amber-500/20"
              : "bg-transparent border border-transparent"
          }`}
          style={{
            backdropFilter: scrolled ? "blur(24px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          }}
        >
          {/* Logo / Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm shadow-lg shadow-amber-500/30">
              MW
            </div>
            <span className="font-display font-semibold text-white/90 group-hover:text-amber-400 transition-colors hidden sm:block">
              {personalInfo.name.split(" ")[0]}{" "}
              <span className="gold-text">{personalInfo.name.split(" ")[1]}</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-amber-400 group-hover:w-4/5 transition-all duration-300" />
              </button>
            ))}
            <a
              href={personalInfo.cvFile}
              download
              className="ml-3 px-5 py-2 text-sm font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95"
            >
              Download CV
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-amber-400 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-amber-400 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-amber-400 transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl glass border border-amber-500/20 p-4 flex flex-col gap-2"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-gray-300 hover:text-amber-400 hover:bg-amber-500/5 rounded-xl transition-all font-medium"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={personalInfo.cvFile}
                download
                className="mt-1 px-4 py-3 text-center font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl"
              >
                Download CV
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
