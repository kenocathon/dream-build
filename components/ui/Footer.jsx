// components/ui/Footer.jsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border/50 py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-foreground text-lg font-bold">
            Dream Build Luxury Glass LLC
          </h3>
          <p className="text-muted-foreground text-sm mt-2">
            Crafting Luxury, One Pane at a Time
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 justify-center text-muted-foreground">
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
          <Link
            href="#contact"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="flex flex-col items-center md:items-end gap-2">
          <a
            href="tel:+1234567890"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            (123) 456-7890
          </a>
          <a
            href="mailto:info@dreambuildglass.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            info@dreambuildglass.com
          </a>
        </div>
      </div>
      <div className="text-center text-muted-foreground text-sm mt-6">
        &copy; {new Date().getFullYear()} Dream Build Luxury Glass LLC. All
        rights reserved.
      </div>
    </footer>
  );
}
