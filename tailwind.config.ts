import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--base)",
        panel: "var(--panel)",
        "panel-raised": "var(--panel-raised)",
        border: "var(--border)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        signal: "var(--signal)",
        "signal-dim": "var(--signal-dim)",
        warning: "var(--warning)",
        "warning-dim": "var(--warning-dim)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        data: ["var(--font-data)", "monospace"],
      },
      fontFeatureSettings: {
        tabular: '"tnum" 1',
      },
      keyframes: {
        "caret-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "panel-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1s steps(1) infinite",
        "panel-in": "panel-in 260ms ease-out both",
        sweep: "sweep 1.6s linear infinite",
      },
      boxShadow: {
        bezel:
          "inset 0 1px 0 0 rgba(255,255,255,0.04), inset 0 -1px 0 0 rgba(0,0,0,0.3)",
        "bezel-light":
          "inset 0 1px 0 0 rgba(255,255,255,0.6), inset 0 -1px 0 0 rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
