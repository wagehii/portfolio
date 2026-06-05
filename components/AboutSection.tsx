"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, MapPin, Calendar, Users } from "lucide-react";
import { portfolioData } from "@/lib/data";

const STATS = [
  { value: "20+", label: "ML Projects" },
  { value: "5K+", label: "Records Processed" },
  { value: "98%", label: "Best Accuracy" },
  { value: "32", label: "Team Members Led" },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof portfolioData.timeline)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const isEducation = item.type === "education";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative pl-10 pb-10 last:pb-0"
    >
      {/* Vertical line */}
      {index < portfolioData.timeline.length - 1 && (
        <div
          className="absolute left-[14px] top-8 bottom-0 w-px timeline-line"
          style={{ opacity: 0.4 }}
        />
      )}

      {/* Icon node */}
      <div
        className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
          isEducation
            ? "border-blue-400/60 bg-blue-900/30"
            : "border-amber-400/60 bg-amber-900/20"
        }`}
        style={{
          boxShadow: isEducation
            ? "0 0 12px rgba(96,165,250,0.2)"
            : "0 0 12px rgba(251,191,36,0.2)",
        }}
      >
        {isEducation ? (
          <GraduationCap size={13} className="text-blue-400" />
        ) : (
          <Briefcase size={13} className="text-amber-400" />
        )}
      </div>

      {/* Card */}
      <div className="glass glass-hover rounded-xl p-5 transition-all duration-300 group">
        {/* Badge */}
        <span
          className={`inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${
            isEducation
              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          }`}
        >
          {item.type}
        </span>

        <h3 className="font-display font-semibold text-white text-base mb-1 group-hover:text-amber-300 transition-colors">
          {item.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-sm">
          <span className="flex items-center gap-1.5 text-gray-400">
            <MapPin size={12} className="text-amber-500/60" />
            {item.organization}
          </span>
          <span className="flex items-center gap-1.5 text-gray-500 font-mono text-xs">
            <Calendar size={11} />
            {item.date}
          </span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const { personalInfo, timeline } = portfolioData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 lg:py-32">
      {/* Section background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #020817 0%, #0a1628 30%, #0a1628 70%, #020817 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400/70 text-xs font-mono uppercase tracking-widest mb-5">
            &#47;&#47; about.me
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            About <span className="gold-text">Me</span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Bio + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Bio card */}
            <div className="glass rounded-2xl p-7 mb-8 border border-amber-500/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 flex items-center justify-center border border-amber-500/20">
                  <Users size={20} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-lg">{personalInfo.name}</h3>
                  <p className="text-amber-400/70 text-sm">{personalInfo.title}</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-[15px]">{personalInfo.bio}</p>

              {/* Divider */}
              <div className="my-5 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

              {/* Key info pills */}
              <div className="flex flex-wrap gap-2">
                {["Python", "Scikit-learn", "XGBoost", "Pandas", "SQL", "Streamlit", "MLflow"].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-lg border border-amber-500/15 bg-amber-500/5 text-amber-300/80 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="glass glass-hover rounded-xl p-5 text-center group transition-all"
                >
                  <div className="font-display font-bold text-3xl gold-text mb-1 gold-glow">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-mono uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="font-display font-semibold text-xl text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-amber-400" />
              Journey
            </h3>
            <div>
              {timeline.map((item, i) => (
                <TimelineItem key={item.id} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
