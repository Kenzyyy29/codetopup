"use client";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import {usePathname} from "next/navigation";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 const pathname = usePathname();
 const noNavbarPaths = ["/auth"];

 const showNavbar = !noNavbarPaths.some(
  (path) => pathname === path || pathname.startsWith(`${path}/`)
 );
 return (
  <html lang="en">
   <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    {showNavbar && <Navbar />}
    {children}
   </body>
  </html>
 );
}
