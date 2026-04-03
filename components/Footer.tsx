"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-primary-green rounded-full" />
              <span className="font-serif font-bold text-lg">Find Care BC</span>
            </div>
            <p className="text-gray-300 text-sm">
              Helping BC families find the perfect childcare for their little
              ones.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary-green transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/find"
                  className="hover:text-primary-green transition"
                >
                  Find Care
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-green transition">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-serif font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-green transition">
                  Licensing Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-green transition">
                  $10/Day Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-green transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold mb-4">Contact</h3>
            <p className="text-sm text-gray-300 mb-2">
              <a
                href="/contact"
                className="hover:text-primary-green transition"
              >
                hello@findcarebc.ca
              </a>
            </p>
            <p className="text-sm text-gray-300">BC, Canada</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Find Care BC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
