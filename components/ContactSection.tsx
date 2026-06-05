"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Code2, Send, Download, Phone, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/lib/data";

const SOCIAL_LINKS = [
  {
    key: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    href: portfolioData.contact.linkedin,
    color: "hover:text-blue-400 hover:border-blue-400/40 hover:bg-blue-400/5",
  },
  {
    key: "github",
    icon: Github,
    label: "GitHub",
    href: portfolioData.contact.github,
    color: "hover:text-white hover:border-white/40 hover:bg-white/5",
  },
  {
    key: "codewars",
    icon: Code2,
    label: "Codewars",
    href: portfolioData.contact.codewars,
    color: "hover:text-red-400 hover:border-red-400/40 hover:bg-red-400/5",
  },
  {
    key: "email",
    icon: Mail,
    label: "Email",
    href: `mailto:${portfolioData.contact.email}`,
    color: "hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/5",
  },
];

export default function ContactSection() {
  const { personalInfo, contact } = portfolioData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #020817 0%, #0a1628 40%, #050d1e 80%, #020817 100%)",
        }}
      />

      {/* Glow accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
        style={{
          background: "radial-gradient(ellipse at center, rgba(251,191,36,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400/70 text-xs font-mono uppercase tracking-widest mb-5">
            &#47;&#47; get_in_touch
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Let's <span className="gold-text">Connect</span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            Open to data science roles, ML projects, and collaboration. Let's build something impactful.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-7 border border-amber-500/10">
              <h3 className="font-display font-semibold text-white text-xl mb-6">Send a Message</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                    <CheckCircle2 size={28} className="text-green-400" />
                  </div>
                  <h4 className="font-display font-semibold text-white text-lg mb-2">Message Sent!</h4>
                  <p className="text-gray-400 text-sm">I'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}
                    className="mt-6 text-xs text-amber-400/70 hover:text-amber-400 transition-colors font-mono"
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="input-gold w-full bg-[#0a1628] border border-amber-500/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm transition-all focus:bg-[#0f1e38]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="input-gold w-full bg-[#0a1628] border border-amber-500/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm transition-all focus:bg-[#0f1e38]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      className="input-gold w-full bg-[#0a1628] border border-amber-500/15 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm resize-none transition-all focus:bg-[#0f1e38]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right: Contact info + social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Info cards */}
            <div className="glass rounded-2xl p-7 border border-amber-500/10 flex flex-col gap-5">
              <h3 className="font-display font-semibold text-white text-xl">Contact Info</h3>

              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:border-amber-400/40 transition-colors flex-shrink-0">
                  <Mail size={16} className="text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-mono mb-0.5">Email</div>
                  <div className="text-sm">{contact.email}</div>
                </div>
              </a>

              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:border-amber-400/40 transition-colors flex-shrink-0">
                  <Phone size={16} className="text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 font-mono mb-0.5">Phone</div>
                  <div className="text-sm">{contact.phone}</div>
                </div>
              </a>
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl p-7 border border-amber-500/10">
              <h3 className="font-display font-semibold text-white text-lg mb-5">Find Me On</h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map(({ key, icon: Icon, label, href, color }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/10 text-gray-500 transition-all duration-300 ${color}`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* CV Download */}
            <a
              href={personalInfo.cvFile}
              download
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-amber-400 hover:bg-amber-500/15 hover:border-amber-400/60 transition-all group"
              style={{ boxShadow: "0 0 20px rgba(251,191,36,0.04)" }}
            >
              <Download size={18} className="group-hover:animate-bounce" />
              <span className="font-semibold">Download Full CV</span>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-xs">
              MW
            </div>
            <span className="text-gray-600 text-sm">
              {personalInfo.name} · {personalInfo.title}
            </span>
          </div>
          <p className="text-gray-700 text-xs font-mono">
            © {new Date().getFullYear()} · Built with Next.js & Framer Motion
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
