import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedLayout from "@/components/AnimatedLayout";
import Script from 'next/script'

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arthurnagy.com'),
  title: {
    default: 'Arthur Nagy - Software Engineer',
    template: '%s | Arthur Nagy'
  },
  description: 'Software Engineer specializing in Mobile Development with a focus on Android',
  openGraph: {
    title: 'Arthur Nagy - Software Engineer',
    description: 'Software Engineer specializing in Mobile Development with a focus on Android',
    url: 'https://arthurnagy.com',
    siteName: 'Arthur Nagy',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5EFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1721" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-Q0VCE32GMQ`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q0VCE32GMQ');
          `}
        </Script>
      </head>
      <body 
        className={`${inter.className} dark:dark`}
        suppressHydrationWarning
      >
        <Header />
        <AnimatedLayout>
          {children}
        </AnimatedLayout>
        <Footer />
      </body>
    </html>
  );
}
