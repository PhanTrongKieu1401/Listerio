/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'charlie-display': ['"Charlie Display"', 'sans-serif'],
        'charlie-text': ['"Charlie Text"', 'sans-serif'],
        apple: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        ui: ['ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        'custom-dark': '#101214',
        'button-color': '#0C66E4',
        'text-dark-thin': '#172B4D', 
        'text-dark': '#44546F',
      },

      
    },
  },
  plugins: [],
}
