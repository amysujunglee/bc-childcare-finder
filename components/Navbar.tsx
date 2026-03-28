"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-neutral-border sticky top-0 z-40 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-6 h-6 bg-primary-green rounded-full" />
            <span className="text-lg font-serif font-bold text-primary-dark group-hover:text-primary-green transition">
              BC Childcare Finder
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary-green transition"
            >
              Home
            </Link>
            <Link
              href="/find"
              className="text-foreground hover:text-primary-green transition"
            >
              Find Care
            </Link>
            <a
              href="#about"
              className="text-foreground hover:text-primary-green transition"
            >
              About
            </a>
          </div>

          {/* CTA Button */}
          <Link
            href="/find"
            className="bg-primary-green text-white px-6 py-2 rounded-card hover:bg-opacity-90 transition font-medium text-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
