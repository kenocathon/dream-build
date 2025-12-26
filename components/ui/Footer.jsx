// components/ui/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-deepblack border-t border-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-white text-lg font-bold">
            Dream Build Luxury Glass LLC
          </h3>
          <p className="text-gray-400 text-sm mt-2">
            Elevate Your Lifestyle
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 justify-center text-gray-400">
          <Link
            href="/"
            className="hover:text-gold-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="hover:text-gold-500 transition-colors"
          >
            About
          </Link>
          <Link
            href="/#services"
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
          <Link
            href="/#contact"
            className="hover:text-gold-500 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="hover:text-gold-500 transition-colors"
          >
            Privacy
          </Link>
        </nav>
        <div className="flex flex-col items-center md:items-end gap-2">
          <a
            href="tel:+14047078819"
            className="text-gray-400 hover:text-gold-500 transition-colors"
          >
            (404) 707-8819
          </a>
          <a
            href="mailto:support@dbluxuryglass.com"
            className="text-gray-400 hover:text-gold-500 transition-colors"
          >
            support@dbluxuryglass.com
          </a>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} Dream Build Luxury Glass LLC. All
        rights reserved.
        <span className="mx-2">|</span>
        <Link href="/portal" className="hover:text-gray-400 transition-colors">
          Admin
        </Link>
      </div>
    </footer>
  );
}
