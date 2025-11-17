"use client"; // Required for client-side interactivity (mobile menu, theme toggle)

import React, { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Mobile Menu Button */}
        <button
          className="text-foreground lg:hidden"
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
        <div className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 lg:flex-1 lg:text-center">
          <Link
            href="/"
            className="text-foreground text-lg font-bold tracking-tight lg:text-xl"
          >
            <Image
              src="/images/logo.png"
              width={150}
              height={100}
              alt="Dream Build Luxury Glass LLC"
              priority // Optimize for above-the-fold
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-muted-foreground">
          <Link
            href="#about"
            className="hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="#services"
            className="hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="hover:text-foreground transition-colors"
          >
            Gallery
          </Link>
        </nav>

        {/* Contact Button */}
        <div className="flex items-center justify-end">
          <Link
            href="#contact"
            className="hidden sm:block bg-primary text-primary-foreground font-bold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Contact Us
          </Link>
          <Link
            href="#contact"
            className="text-foreground sm:hidden"
            aria-label="Contact Us"
          >
            <PhoneIcon className="h-6 w-6" />
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-background/95 border-b border-border/50 lg:hidden">
            <div className="container mx-auto flex flex-col gap-4 p-4">
              <Link
                href="#about"
                className="text-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="#services"
                className="text-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                href="/gallery"
                className="text-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
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
