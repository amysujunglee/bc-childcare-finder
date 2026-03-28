import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F5F0",
        foreground: "#1A1A2E",
        primary: {
          dark: "#1A1A2E",
          green: "#4CAF82",
        },
        neutral: {
          card: "#FFFFFF",
          muted: "#666666",
          border: "#E8E4DC",
        },
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(26, 26, 46, 0.08)",
        md: "0 4px 6px rgba(26, 26, 46, 0.1)",
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
