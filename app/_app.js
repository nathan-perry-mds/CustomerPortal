import '../styles/globals.css';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../lib/fontawesome'; // Import the Font Awesome configuration
import setBackground from 'app/lib/setBackground'; // Import Random Background picker
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('useEffect is called'); // Debugging line
    setBackground();
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
