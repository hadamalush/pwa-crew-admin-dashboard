/** @type {import('tailwindcss').Config} */
import colors from "./src/styles/colors";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%": { opacity: "0", transform: "translateY(-10%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wiggleShow: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "20%": { opacity: "0", transform: "translateY(-10%)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.3s ",
        wiggleShow: "wiggle 0.1 forwards",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
