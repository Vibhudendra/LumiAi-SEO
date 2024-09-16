import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import LenisScroll from "@/components/LenisScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lumi SEO ",
  description: "A landing page for Lumi AI SEO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(inter.className, "bg-black text-white antialiased")}
      > 
        <LenisScroll />
        {children}
      </body>
    </html>
  );
}
