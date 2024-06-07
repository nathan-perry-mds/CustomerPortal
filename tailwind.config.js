// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Ensure you include your app directory
  ],
  theme: {
    extend: {
      colors: {
        main: 'rgb(18, 50, 219)',
      },
    },
  },
  plugins: [],
};
