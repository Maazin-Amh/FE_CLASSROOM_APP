/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hook/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      colors: {
        littlewhite: "#FFFCF2",
        cream: "#CCC5B9",
        chocolate: "#403D39",
        doff: "#252422",
        orangebold: "#EB5E28",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
