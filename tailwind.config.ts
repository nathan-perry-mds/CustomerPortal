import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Make sure this path is correct
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

export default config;
