import type { Config } from "tailwindcss";

/* AZ Technology — design tokens ported from the Claude Design handoff (tw-config.js).
   Cyan is DECORATIVE-ONLY (gradients/accents). Text/CTAs use primary/navy for WCAG AA
   contrast (design review Pass 6). */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0056B3",
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#bcd9ff",
          300: "#8ec1ff",
          400: "#5a9eff",
          500: "#3179f5",
          600: "#0056B3",
          700: "#054a98",
          800: "#0a3f7c",
          900: "#0e3666",
        },
        cyan: {
          DEFAULT: "#00D1FF",
          50: "#e6fbff",
          100: "#c2f4ff",
          200: "#8ae9ff",
          300: "#4fdcff",
          400: "#00D1FF",
          500: "#00b6e6",
          600: "#0093bd",
        },
        navy: { DEFAULT: "#002D5A", light: "#063a6e", deep: "#001f3f" },
        ink: "#0f1b2d",
        mist: "#F8FAFC",
        sale: "#e11d48",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,27,45,.04), 0 8px 24px -12px rgba(16,27,45,.18)",
        cardHover: "0 8px 28px -8px rgba(0,86,179,.28)",
        mega: "0 24px 60px -20px rgba(0,45,90,.35)",
        pop: "0 30px 80px -24px rgba(0,31,63,.55)",
      },
      borderRadius: { xl2: "1.1rem" },
      maxWidth: { site: "1240px" },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        scaleIn: {
          "0%": { opacity: "0", transform: "translateY(10px) scale(.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp .6s cubic-bezier(.2,.7,.2,1) both",
        fadeIn: "fadeIn .5s ease both",
        scaleIn: "scaleIn .26s cubic-bezier(.2,.7,.2,1) both",
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
