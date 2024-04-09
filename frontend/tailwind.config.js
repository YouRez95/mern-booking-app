/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#324B4C",
        secondary: "#068488",
        white: "#FFFFFF",
        additionaly: "#00C6CF",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "9rem",
      },
    },
  },
  plugins: [],
};
