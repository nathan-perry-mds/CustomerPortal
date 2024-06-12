import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MDS Coating Technologies | Customer Portal",
  description: "Customer Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} >
        <>
          <ConfigureAmplifyClientSide />
          {children}
        </>
        </body>
    </html>
  );
}
