import type { Metadata } from "next";
import { Anton, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

// 設定字體
const anton = Anton({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-anton",
});

const notoSans = Noto_Sans_TC({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Andrew's Space | Persona 5 Style CV",
  description: "Developer & Researcher Portfolio",
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
        className={`${anton.variable} ${notoSans.variable} bg-p5-black text-p5-white overflow-x-hidden font-sans`}
      >
        <div className="fixed inset-0 z-[-1] opacity-50 bg-p5-pattern bg-[length:20px_20px]" />
        {children}
      </body>
    </html>
  );
}