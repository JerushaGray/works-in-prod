"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-light-1024-3MKfAUHxpc7h96q1HIurk4G5p00tRY.png"
            alt="Works in Prod Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <h1 className="text-xl font-bold tracking-tight">Works in Prod</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
            About
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card/90 backdrop-blur-sm">
          <nav className="flex flex-col p-4 space-y-3 text-sm">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
