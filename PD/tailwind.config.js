/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#25B9E2',
          light: '#4DC7E8',
          dark: '#1A9BC2'
        },
        secondary: {
          DEFAULT: '#F70B3A',
          light: '#F83D62',
          dark: '#D00830'
        }
      }
    },
  },
  plugins: [],
};