/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        correct: '#10b981',
        present: '#f59e0b',
        absent: '#334155',
      },
    },
  },
  plugins: [],
}
