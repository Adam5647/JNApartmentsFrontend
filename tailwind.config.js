/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d8ebff",
          200: "#b0d6ff",
          300: "#7cb5ff",
          400: "#4c8bff",
          500: "#1f5dff",
          600: "#1846db",
          700: "#1738ab",
          800: "#182f81",
          900: "#172b65"
        }
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
