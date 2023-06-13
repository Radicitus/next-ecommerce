/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        104: "26rem",
        112: "28rem",
        120: "30rem",
        128: "32rem",
      },
      fontFamily: {
        lobster: ["var(--font-lobster)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
