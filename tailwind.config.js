/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        "primary-blue": "#004370",
        "light-peach": "#FAF2EC",
        "light-pink": "#FAE9F6",
        "light-blue": "#E5F0F9",
        "dark-gray": "#222222",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
