import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const metadataBase = new URL(siteUrl);

// 設定字體
const orbitron = Orbitron({
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Andrew's Space",
  description: "Developer & Researcher Portfolio",
  metadataBase,
  alternates: {
    canonical: "/",
  },

  icons:{
    icon: '/images/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 
         1. 加入 suppressHydrationWarning 解決外掛導致的報錯 
         2. 確保 className 裡的變數正確
      */}
      <body 
        suppressHydrationWarning={true}
        className={`${orbitron.variable} ${spaceGrotesk.variable} bg-p5-black text-p5-white overflow-x-hidden font-sans`}
      >
        <div className="fixed inset-0 z-[-1] opacity-50 bg-p5-pattern bg-[length:20px_20px]" />
        {children}
      </body>
    </html>
  );
}