import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: "#fde68a",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        navy: {
          900: "#020817",
          800: "#0a1628",
          700: "#0f2040",
          600: "#132952",
        },
        slate: {
          850: "#0f172a",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
        body: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(251,191,36,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(251,191,36,0.6), 0 0 80px rgba(251,191,36,0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "from": { textShadow: "0 0 10px rgba(251,191,36,0.5)" },
          "to": { textShadow: "0 0 20px rgba(251,191,36,0.9), 0 0 40px rgba(251,191,36,0.4)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)",
        "navy-gradient": "linear-gradient(180deg, #020817 0%, #0a1628 50%, #020817 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
