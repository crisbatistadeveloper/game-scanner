"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rajdhani.variable} antialiased`}>
        <SessionProvider>
           {children}
        </SessionProvider>
      </body>
    </html>
  );
}