/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fbf2f4',
          100: '#f5e0e6',
          200: '#e9c2cf',
          300: '#d699ad',
          400: '#bf6885',
          500: '#a94868',
          600: '#8f3a56',
          700: '#722c43',
          800: '#5a2436',
          900: '#4a2030',
          950: '#2e1019',
        },
        rose: {
          50: '#fef5f7',
          100: '#fce9ed',
          200: '#fad3dc',
          300: '#f5b0c0',
          400: '#ec85a0',
          500: '#e05e80',
          600: '#cf4467',
          700: '#b23355',
          800: '#942c49',
          900: '#7c2a43',
        },
        champagne: {
          50: '#fdfbf5',
          100: '#faf3e0',
          200: '#f3e5bd',
          300: '#ead091',
          400: '#e0b96a',
          500: '#d4a345',
          600: '#c08e37',
          700: '#9e6f2c',
          800: '#80592a',
          900: '#6a4a27',
        },
        ivory: '#fdfbf8',
        charcoal: '#2d2528',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
