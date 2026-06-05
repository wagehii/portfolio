"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TERMINAL_LINES = [
  { text: "$ python train.py --model xgboost --dataset healthcare_risk.csv", delay: 0 },
  { text: "> Initializing Feature Store... [OK]", delay: 200, color: "text-green-400" },
  { text: "> Loading 45,823 patient records...", delay: 400 },
  { text: "> Running hyperparameter optimization (Optuna)...", delay: 650 },
  { text: "  Trial 47/100  |  AUC: 0.9134  |  F1: 0.8871  ██████░░░░  47%", delay: 900 },
  { text: "  Trial 89/100  |  AUC: 0.9401  |  F1: 0.9102  █████████░  89%", delay: 1150 },
  { text: "> Best params: {'n_estimators': 412, 'max_depth': 7, 'lr': 0.0213}", delay: 1400, color: "text-amber-400" },
  { text: "> Fitting final model on full train set...", delay: 1600 },
  { text: "> MLflow experiment logged: run_id=a8f3b9c2", delay: 1750 },
  { text: "✓ Model saved → /models/healthcare_risk_v3.pkl", delay: 1900, color: "text-green-400" },
  { text: "✓ Pipeline ready. AUC: 0.9401 | Deploying...", delay: 2050, color: "text-gold-400" },
];

interface TerminalIntroProps {
  onComplete: () => void;
}

export default function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [isDone, setIsDone] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
      timeoutsRef.current.push(t);
    });

    // Trigger exit after all lines + brief pause
    const exitTimeout = setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 700);
    }, 2350);
    timeoutsRef.current.push(exitTimeout);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="terminal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)", scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]"
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-2xl mx-4"
          >
            {/* Terminal window */}
            <div className="rounded-xl overflow-hidden shadow-2xl border border-amber-500/20"
              style={{ boxShadow: "0 0 60px rgba(251,191,36,0.08), 0 25px 50px rgba(0,0,0,0.6)" }}>
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1923] border-b border-amber-500/10">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-gray-500 font-mono">
                  wageh@ml-workstation: ~/capstone_project
                </span>
                <div className="ml-auto">
                  <span className="text-[10px] text-amber-500/60 font-mono uppercase tracking-widest">
                    Python 3.11 | XGBoost 2.0
                  </span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="bg-[#080f1a] px-5 py-5 min-h-[280px] font-mono text-sm">
                {TERMINAL_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={`leading-6 transition-all duration-200 ${
                      visibleLines.includes(i) ? "opacity-100" : "opacity-0"
                    } ${line.color || "text-gray-300"}`}
                    style={{
                      transitionDelay: visibleLines.includes(i) ? "0ms" : "0ms",
                    }}
                  >
                    {line.text}
                  </div>
                ))}

                {/* Blinking cursor */}
                {visibleLines.length < TERMINAL_LINES.length && (
                  <span className="inline-block w-2 h-4 bg-amber-400 animate-pulse ml-0.5 align-middle" />
                )}
              </div>
            </div>

            {/* Loading bar at bottom */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-amber-500/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.1, ease: "easeInOut" }}
                />
              </div>
              <span className="text-xs text-amber-500/60 font-mono whitespace-nowrap">
                Initializing portfolio...
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
