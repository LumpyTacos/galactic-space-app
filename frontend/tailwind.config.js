/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#242424',
        'space-light': '#ffffff',
        'accent-blue': '#646cff',
        'accent-blue-hover': '#535bf2',
        'accent-react': '#61dafb',
      },
      animation: {
        'logo-spin': 'spin 20s linear infinite',
      },
      dropShadow: {
        'glow-blue': '0 0 2em #646cffaa',
        'glow-react': '0 0 2em #61dafbaa',
      },
    },
  },
}