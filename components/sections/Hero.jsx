// components/sections/Hero.jsx
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <Image
        src="https://images.dbluxuryglass.com/open-concept-glass-rail.jpeg"
        alt="Dream Build Luxury Glass - Modern open-concept glass railing"
        fill
        priority
        quality={95}
        className="object-cover brightness-[0.7]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-wide text-white">
          Dream Build <span className="text-gold-500">Luxury Glass</span>
        </h1>
        <p className="mt-6 font-serif text-2xl md:text-4xl lg:text-5xl font-light italic text-gray-200 max-w-3xl mx-auto tracking-wide">
          Elevate Your Lifestyle
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/#services"
            className="bg-gold-500 text-deepblack px-10 py-5 text-lg font-bold uppercase tracking-wider hover:bg-gold-600 transition-all hover:scale-105"
          >
            Explore Services
          </Link>
          <Link
            href="/#contact"
            className="border-2 border-gold-500 text-gold-500 px-10 py-5 text-lg font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-deepblack transition-all"
          >
            Get Free Quote
          </Link>
        </div>
      </div>

      {/* Bouncing Arrow - positioned relative to section */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
        <Link href="/#about" aria-label="Scroll to About section">
          <ChevronDown className="w-10 h-10 text-gold-500 animate-bounce cursor-pointer hover:text-gold-400 transition-colors" />
        </Link>
      </div>
    </section>
  );
}
