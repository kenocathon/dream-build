"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/gallery") return pathname === "/gallery";
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-deepblack/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-deepblack/80 backdrop-blur-sm"
      } border-b border-gold-500/10`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16 lg:h-20">
        {/* Mobile Menu Button */}
        <button
          className="text-white lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
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
        <div className="hidden lg:block">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              width={200}
              height={80}
              alt="Dream Build Luxury Glass LLC"
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden flex-1 flex justify-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={150}
              height={60}
              alt="Dream Build Luxury Glass LLC"
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 group ${
                isActive(link.href)
                  ? "text-gold-500"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gold-500 transition-all duration-300 ${
                  isActive(link.href)
                    ? "w-6"
                    : "w-0 group-hover:w-6"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Contact Button */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+14047078819"
            className="hidden md:flex items-center gap-2 text-gray-400 hover:text-gold-500 transition-colors text-sm"
          >
            <PhoneIcon className="h-4 w-4" />
            <span>(404) 707-8819</span>
          </a>
          <Link
            href="/#contact"
            className="hidden sm:block bg-gold-500 text-deepblack font-bold text-sm px-6 py-2.5 hover:bg-gold-600 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/20"
          >
            Get Quote
          </Link>
          <Link
            href="/#contact"
            className="text-gold-500 sm:hidden p-2"
            aria-label="Contact Us"
          >
            <PhoneIcon className="h-6 w-6" />
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-deepblack/98 backdrop-blur-md border-b border-gold-500/10 lg:hidden transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <nav className="max-w-7xl mx-auto flex flex-col p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`py-3 px-4 text-lg font-medium border-b border-gray-800/50 transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-gold-500 bg-gold-500/5"
                    : "text-white hover:text-gold-500 hover:bg-white/5"
                }`}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+14047078819"
              className="mt-4 flex items-center justify-center gap-2 py-3 px-4 bg-gold-500 text-deepblack font-bold text-lg"
              onClick={toggleMenu}
            >
              <PhoneIcon className="h-5 w-5" />
              <span>(404) 707-8819</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
