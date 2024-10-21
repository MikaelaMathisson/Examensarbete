"use client";
import localFont from "next/font/local";
import "./globals.css";
import { metadata } from "@/app/metadata";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-other`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        </body>
        </html>
    );
}