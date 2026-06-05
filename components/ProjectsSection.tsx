"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/lib/data";

const TECH_COLORS: Record<string, string> = {
  "Python": "bg-blue-500/10 text-blue-300 border-blue-500/20",
  "Computer Vision": "bg-purple-500/10 text-purple-300 border-purple-500/20",
  "AI": "bg-amber-500/10 text-amber-300 border-amber-500/20",
  "Scikit-learn": "bg-orange-500/10 text-orange-300 border-orange-500/20",
  "Classification": "bg-green-500/10 text-green-300 border-green-500/20",
  "Linear Regression": "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  "Pandas": "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  "Seaborn": "bg-teal-500/10 text-teal-300 border-teal-500/20",
  "Streamlit": "bg-rose-500/10 text-rose-300 border-rose-500/20",
  "Machine Learning": "bg-amber-500/10 text-amber-300 border-amber-500/20",
  "Deployment": "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "default": "bg-gray-500/10 text-gray-300 border-gray-500/20",
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof portfolioData.projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 2) * 0.15, ease: "easeOut" }}
      className="group relative"
    >
      <div
        className="relative rounded-2xl overflow-hidden glass border border-amber-500/10 h-full
          transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/40
          hover:shadow-2xl hover:shadow-amber-500/10"
      >
        {/* Image area */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/20 to-transparent" />

          {/* Number */}
          <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center text-xs font-mono text-amber-400/70">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* GitHub icon always visible */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-500/40 transition-all"
          >
            <Github size={14} />
          </a>

          {/* Hover overlay with CTA */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 shadow-lg shadow-amber-500/30"
              style={{ transitionDelay: "50ms" }}
            >
              <span>View Project</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-amber-300 transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`text-xs px-2.5 py-1 rounded-md border font-mono ${
                  TECH_COLORS[tech] || TECH_COLORS["default"]
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Bottom link */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-amber-400 transition-colors group/link"
          >
            <Github size={14} />
            <span className="font-mono text-xs">{project.githubUrl.replace("https://github.com/", "")}</span>
            <ExternalLink size={11} className="ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Gold border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: "inset 0 0 30px rgba(251,191,36,0.04)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { projects } = portfolioData;
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative py-24 lg:py-32">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #020817 0%, #050d1e 50%, #020817 100%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400/70 text-xs font-mono uppercase tracking-widest mb-5">
            &#47;&#47; my_work
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Featured <span className="gold-text">Projects</span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
          <p className="text-gray-400 max-w-lg mx-auto text-sm">
            End-to-end ML systems, from data pipelines to deployed applications.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 transition-all text-sm font-semibold group"
          >
            <Github size={16} />
            <span>View All on GitHub</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
