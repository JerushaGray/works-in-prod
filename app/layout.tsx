import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/components/Header";

// Fonts (your setup stays the same)
import {
  Geist,
  Geist_Mono,
  Source_Serif_4,
  Geist as V0_Font_Geist,
  Geist_Mono as V0_Font_Geist_Mono,
  Source_Serif_4 as V0_Font_Source_Serif_4,
} from "next/font/google";

const _geist = V0_Font_Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const _geistMono = V0_Font_Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const _sourceSerif_4 = V0_Font_Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const _sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Martech Stack Dashboard",
  description: "Manage your marketing technology tools and vendors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${_geist.className} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-border bg-card/50 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Works in Prod · Built by Jerusha Gray
        </footer>
      </body>
    </html>
  );
}
