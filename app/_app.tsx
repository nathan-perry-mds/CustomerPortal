// app/_app.tsx (if using TypeScript)
import '../app/globals.css'; // Adjust the path if necessary
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
