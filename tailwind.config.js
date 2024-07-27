/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sgreen-light": "#1ED45E",
        "sgreen-strong": "#18bc51",
        sblack: "#232323",
        sgray: "#A3A3A3",
        swhite: "#FFFFFF",
        cards: "#127234",
      },
    },
  },
  plugins: [],
};
