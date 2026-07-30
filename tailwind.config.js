/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        card: "#FFFFFF",
        primaryText: "#0F172A",
        secondaryText: "#64748B",
        border: "#E2E8F0",
        primaryBlue: "#2563EB",
        green: "#16A34A",
        red: "#DC2626",
        yellow: "#F59E0B",
      },
      borderRadius: {
        'lg': '12px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
