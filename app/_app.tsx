import '../styles/globals.css';
import { AppProps } from 'next/app';
import '../lib/fontawesome'; // Import the Font Awesome configuration

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
