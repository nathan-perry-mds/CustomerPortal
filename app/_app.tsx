import '../styles/globals.css';
import { AppProps } from 'next/app';
import '../lib/fontawesome'; // Import the Font Awesome configuration
import { useEffect } from 'react';
import setBackground from '../lib/setBackground';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setBackground();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
