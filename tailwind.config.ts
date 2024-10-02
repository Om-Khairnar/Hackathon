import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#003145",
        "dark-blue": "#002a3b",
        "yellow": "#fecf5c",
        "custom-green":"#5fa065",
      },
    },
  },
  plugins: [],
};
export default config;
