import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";

const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt323" });

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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `.site-loader{display:none}` }} />
        </noscript>
      </head>
      <body className={vt323.variable}>
        <Loader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
