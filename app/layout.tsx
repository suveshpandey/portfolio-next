import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Suvesh Pandey - Full Stack Developer",
  description: "Full Stack Developer — Portfolio",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `.site-loader{display:none}` }} />
        </noscript>
      </head>
      <body className={`${inter.variable} ${geistMono.variable}`}>
        <Loader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
