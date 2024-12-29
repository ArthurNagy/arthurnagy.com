import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arthur Nagy",
  description: "Software Engineer specializing in Mobile Development with a focus on Android",
  authors: [{ name: "Arthur Nagy" }],
  keywords: ["mobile", "android", "ios", "software engineer", "software development","android developer", "android development", ],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5EFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1721" },
  ],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  const storedTheme = localStorage.getItem('theme')
                  if (storedTheme) return storedTheme
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                }
                document.documentElement.classList.toggle('dark', getTheme() === 'dark')
              })()
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
