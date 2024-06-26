// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: 'rgb(18, 50, 219)',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus', 'peer-focus'],
    },
  },
  plugins: [],
};