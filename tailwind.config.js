/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
      },
      spacing: {
        "safe-left": "max(1rem, env(safe-area-inset-left, 0px))",
        "safe-right": "max(1rem, env(safe-area-inset-right, 0px))",
        "safe-top": "max(0px, env(safe-area-inset-top, 0px))",
        "safe-bottom": "max(0px, env(safe-area-inset-bottom, 0px))",
      },
      minHeight: {
        touch: "44px",
      },
    }
  },
  plugins: []
};
