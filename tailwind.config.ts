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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#32a8c4",
      },
      backgroundColor: {
        primaryLight: "rgba(50,168,196,0.18)",
      },
      screens: {
        'xs': '500px'
      }
    },
  },
  plugins: [],
};
export default config;
