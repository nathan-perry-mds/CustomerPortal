import '../styles/globals.css';
import { AppProps } from 'next/app';
import { Provider } from "next-auth/client";
import '../lib/fontawesome'; // Import the Font Awesome configuration
import setBackground from 'app/lib/setBackground' // Import Random Background picker
import { useEffect } from 'react';


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('useEffect is called'); // Debugging line
    setBackground();
  }, []);

  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
    );
}

export default MyApp;