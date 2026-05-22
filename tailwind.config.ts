import type { Config } from "tailwindcss";

/**
 * Whamr brand tokens — "Sunset": electric orange-red (the wham) + golden yellow (the joy),
 * on warm cream. Pulled directly from the existing brand guidelines so the app matches.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFAF5",
        "bg-alt": "#FFF3E8",
        card: "#FFFFFF",
        ink: "#1A0F00",
        "ink-soft": "#4A3020",
        "ink-mute": "#8A7060",
        line: "#F0DDD0",
        "line-soft": "#FBF0E8",
        // Primary: the wham
        wham: {
          DEFAULT: "#FF4500",
          mid: "#FF6B35",
          bright: "#FF8C60",
          dark: "#CC3700",
          soft: "#FFF1EC",
          xsoft: "#FFF8F5",
        },
        // Accent: the joy
        gold: {
          DEFAULT: "#FFB800",
          bright: "#FFD60A",
          soft: "#FFF8DC",
        },
        ok: "#00C853",
        danger: "#FF2D55",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,15,0,0.04), 0 8px 24px -12px rgba(26,15,0,0.18)",
        lift: "0 12px 40px -12px rgba(255,69,0,0.35)",
        modal: "0 24px 80px -20px rgba(26,15,0,0.45)",
      },
      backgroundImage: {
        ember:
          "linear-gradient(135deg,#1A0F00 0%,#4A1000 25%,#CC3700 55%,#FF4500 78%,#FFB800 100%)",
        "wham-pill": "linear-gradient(135deg,#FF4500 0%,#FF6B35 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s cubic-bezier(0.22,1,0.36,1) both",
        "scale-in": "scale-in 0.22s cubic-bezier(0.22,1,0.36,1) both",
        pop: "pop 0.32s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
