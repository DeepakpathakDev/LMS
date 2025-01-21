/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5ff',
          100: '#ecedfe',
          200: '#d8d9fd',
          300: '#b6b8fb',
          400: '#8f92f8',
          500: '#5B5FC7',
          600: '#4A4DB4',
          700: '#3e40a0',
          800: '#363983',
          900: '#2f316d',
        }
      },
    },
  },
  plugins: [],
};