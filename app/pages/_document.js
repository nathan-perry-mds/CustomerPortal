// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Your description here" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}