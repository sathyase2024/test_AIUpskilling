/**
 * SkillForge AI — Tailwind Configuration
 *
 * NOTE: This project uses Tailwind CSS v4, which has moved to a CSS-first
 * configuration model. All theme extensions (custom colors, animations,
 * keyframes, fonts) are defined via the `@theme` block inside
 * `app/globals.css` rather than this file.
 *
 * This file serves as a typed reference for the design tokens used across
 * the platform and for any tooling (e.g. IDE plugins) that still reads
 * tailwind.config.ts for intellisense.
 *
 * See: https://tailwindcss.com/docs/v4-beta#configuration
 */

import type { Config } from "tailwindcss";

const config: Config = {
  // v4 auto-detects content; explicit paths kept for compatibility
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],

  // Dark mode via class (add `dark` to <html> to switch)
  darkMode: "class",

  theme: {
    extend: {
      /* -------------------------------------------------------
         Colors — mirrors the @theme block in globals.css
      ------------------------------------------------------- */
      colors: {
        primary: {
          50:  "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
          DEFAULT: "#7c3aed",
        },
        secondary: {
          50:  "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
          DEFAULT: "#06b6d4",
        },
        accent: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          DEFAULT: "#f59e0b",
        },
        surface: {
          1: "#12121a",
          2: "#1a1a28",
          3: "#222236",
          4: "#2a2a44",
        },
        background: "#0a0a0f",
      },

      /* -------------------------------------------------------
         Typography
      ------------------------------------------------------- */
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "var(--font-fira-code)",
          "Fira Code",
          "Cascadia Code",
          "JetBrains Mono",
          "Consolas",
          "monospace",
        ],
      },

      /* -------------------------------------------------------
         Animations
      ------------------------------------------------------- */
      animation: {
        "pulse-glow":     "pulse-glow 3s ease-in-out infinite",
        "float":          "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "slide-up":       "slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "fade-in":        "fade-in 0.4s ease-out both",
        "fade-in-up":     "fade-in-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "spin-slow":      "spin-slow 8s linear infinite",
        "shimmer":        "shimmer 2s linear infinite",
      },

      /* -------------------------------------------------------
         Keyframes
      ------------------------------------------------------- */
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.2)",
            opacity: "1",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(124,58,237,0.7), 0 0 80px rgba(124,58,237,0.4), 0 0 120px rgba(6,182,212,0.2)",
            opacity: "0.9",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%":      { transform: "translateY(-12px) rotate(1deg)" },
          "66%":      { transform: "translateY(-6px) rotate(-1deg)" },
        },
        "gradient-shift": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px) scale(0.97)" },
          to:   { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to:   { backgroundPosition: "200% center" },
        },
      },

      /* -------------------------------------------------------
         Background images (grid patterns)
      ------------------------------------------------------- */
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
        "gradient-accent":
          "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
        "gradient-surface":
          "linear-gradient(135deg, #12121a 0%, #1a1a28 100%)",
        "gradient-glow":
          "radial-gradient(ellipse at top, rgba(124,58,237,0.15) 0%, transparent 70%)",
        "grid-pattern":
          "linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)",
        "dots-pattern":
          "radial-gradient(circle, rgba(139,92,246,0.15) 1px, transparent 1px)",
      },

      /* -------------------------------------------------------
         Box shadows
      ------------------------------------------------------- */
      boxShadow: {
        "glow-primary":
          "0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.2)",
        "glow-secondary":
          "0 0 20px rgba(6,182,212,0.4), 0 0 40px rgba(6,182,212,0.15)",
        "glow-accent":
          "0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.15)",
        "card":
          "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)",
        "card-hover":
          "0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.15)",
      },

      /* -------------------------------------------------------
         Border radius
      ------------------------------------------------------- */
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      /* -------------------------------------------------------
         Spacing extras
      ------------------------------------------------------- */
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
    },
  },

  plugins: [],
};

export default config;
