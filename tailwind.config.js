/** @type {import('tailwindcss').Config} */
import colors from "./src/styles/colors";
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scale: {
          "0%": { scale: 0 },
          "100%": { scale: 1 },
        },
      },
      animation: {
        scale: "scale 0.5s ",
        spin: "spin 2s linear infinite",
      },
      width: {
        128: "32rem",
        160: "50rem",
      },
      height: {
        140: "40rem",
        160: "50rem",
      },
      maxWidth: {
        125: "11.5rem",
      },
    },
    screens: {
      mxs: "320px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xlg: "1400px",
      xl: "1700px",
      xxl: "2300px",
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
};
