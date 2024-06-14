import '../styles/globals.css';
import { AppProps } from 'next/app';
import '../lib/fontawesome'; // Import the Font Awesome configuration
import setBackground from 'app/lib/setBackground' // Import Random Background picker
import { useEffect } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setBackground();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
