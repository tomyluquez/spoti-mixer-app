/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sgreen-light": "#1cbc54",
        "sgreen-strong": "#1FDF64",
        sblack: "#121212",
        sgray: "#A3A3A3",
        swhite: "#FFFFFF",
        cards: "rgb(18, 25, 19, 0.7)",
      },
    },
  },
  plugins: [],
};
