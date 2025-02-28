import type { Metadata } from "next";

import "./globals.css";
import Head from "next/head";
import { AuthProvider } from './context/AuthContext';
import JsonLd from "./components/JsonLd";
import { Toaster } from "sonner";
import { Poppins } from 'next/font/google';
   
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});



// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });



export const metadata: Metadata = {
  metadataBase: new URL('https://www.bennydev.fr'),
  title: {
    default: 'BennyDev | Développeur Web Freelance',
    template: '%s | BennyDev'
  },
  description: 'Spécialiste en React et Next.js, création de sites web et applications modernes. Contactez-moi !',
  authors: [{ name: 'Benjamin' }],
  creator: 'Benjamin',
  publisher: 'BennyDev',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.bennydev.fr',
    siteName: 'BennyDev',
    title: 'BennyDev | Développeur Web Freelance',
    description: 'Développeur web freelance spécialisé dans la création de sites web et applications sur mesure.',
    images: [
      {
        url: '/Bennydev.ico',
        width: 1200,
        height: 630,
        alt: 'BennyDev - Développeur Web Freelance',
      },
    ], 
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BennyDev | Développeur Web Freelance',
    description: 'Développeur web freelance spécialisé dans la création de sites web et applications sur mesure.',
    images: ['https://www.bennydev.fr/twitter-image.jpg'],
  },
  icons: {
    icon: '/Bennydev.ico',
    shortcut: '/Bennydev.ico',
    apple: '/Bennydev.ico',
    other: [
      {
        rel: 'search provider icon',
        url: '/Bennydev.ico',
        type: 'image/x-icon',
      }
    ],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
 

  return (
    <html lang="fr">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <JsonLd />
      </Head>
      <body className={`${poppins.className} antialiased relative`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-right" />
        <div className="z-0 absolute inset-0 bg-[linear-gradient(rgba(167,139,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.05)_1px,transparent_1px)] bg-[size:9rem_9rem]" /> 
      </body>
    </html>
  );
}
