import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#4B5E78",
        sky: {
          soft: "#CDEFFF",
          main: "#A7D8F2",
          hover: "#8DCBE6",
        },
        mist: "#F7FBFF",
        cream: "#FFE8A3",
      },
      fontFamily: {
        sans: ["Figtree", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [forms],
};

export default config;
