import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import PlausibleProvider from 'next-plausible';

const inter = Inter({ subsets: ['latin'] });

let title = 'Explore Careers';
let description = 'Explore careers based on your interests & skills';
let url = 'https://explorecareers.io/';
let ogimage = 'https://explorecareers.io/og-image.png';
let sitename = 'ExploreCareers.io';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <PlausibleProvider domain='explorecareers.io' />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
