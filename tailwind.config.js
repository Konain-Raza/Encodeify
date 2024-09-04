/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './assets/**/*.{js,jsx,ts,tsx}',
    './Screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',  // Example of adding a custom color
      },
      fontFamily: {
        gilroy: ['Gilroy-Regular', 'sans-serif'],
        gilroyBold: ['Gilroy-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
