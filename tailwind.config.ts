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
        primary: {
          DEFAULT: "#ff6b35",
          hover: "#e55a2b",
          light: "#ffe5d4",
        },
        background: {
          primary: "#f8fafc",
          card: "rgba(255, 255, 255, 0.25)",
        },
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};
export default config;

