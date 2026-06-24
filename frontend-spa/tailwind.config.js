/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        navy: '#100e2c',
        'brand-blue': '#0056ff',
        'brand-green': '#8ed952',
        'brand-purple': '#9652d9',
        'muted-text': '#7a7373',
      },
      fontFamily: {
        gantari: ['Gantari', 'Helvetica', 'sans-serif'],
        inter: ['Inter', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
