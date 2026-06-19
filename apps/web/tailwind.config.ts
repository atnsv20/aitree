import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Neutral surfaces for the white minimalist theme.
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#fafafa",
          muted: "#f4f4f5",
        },
        line: "#e7e7ea",
        // Single restrained accent used across links, focus and primary CTAs.
        accent: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          600: "#4f46e5",
          700: "#4338ca",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 3px 0 rgba(15, 23, 42, 0.06)",
        "soft-md":
          "0 2px 8px -2px rgba(15, 23, 42, 0.08), 0 4px 16px -4px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
