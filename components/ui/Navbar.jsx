"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-deepblack/90 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Mobile Menu Button */}
        <button
          className="text-white lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Company Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={120}
              height={80}
              alt="Dream Build Luxury Glass LLC"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-300">
          <Link
            href="#about"
            className="hover:text-gold-500 transition-colors"
          >
            About
          </Link>
          <Link
            href="#services"
            className="hover:text-gold-500 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="hover:text-gold-500 transition-colors"
          >
            Gallery
          </Link>
        </nav>

        {/* Contact Button */}
        <div className="flex items-center justify-end">
          <Link
            href="#contact"
            className="hidden sm:block bg-gold-500 text-deepblack font-bold text-sm px-5 py-2.5 hover:bg-gold-600 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="#contact"
            className="text-gold-500 sm:hidden"
            aria-label="Contact Us"
          >
            <PhoneIcon className="h-6 w-6" />
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-deepblack/95 backdrop-blur-sm border-b border-gray-800/50 lg:hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-4 p-4">
              <Link
                href="#about"
                className="text-white hover:text-gold-500 transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="#services"
                className="text-white hover:text-gold-500 transition-colors"
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                href="/gallery"
                className="text-white hover:text-gold-500 transition-colors"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link
                href="#contact"
                className="text-white hover:text-gold-500 transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
