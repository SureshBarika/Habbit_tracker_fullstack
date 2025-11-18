/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7DD3FC',
        accent: '#FBCFE8',
        mint: '#BBF7D0',
      }
    },
  },
  plugins: [],
}


