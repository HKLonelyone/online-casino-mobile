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
        primary: "#6C5CE7",
        secondary: "#00CEC9",
        accent: "#FFA502",
        background: "#0C0C0C",
        surface: "#1E1E1E",
        text: "#FFFFFF",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        'mobile': '414px', // iPhone 8 Plus 宽度，适合大多数手机
      },
    },
  },
  plugins: [],
};

export default config;
