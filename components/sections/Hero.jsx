// components/sections/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
      <Image
        src="https://pub-cc4555fbc9df4ef39b98f6a38afad8ee.r2.dev/Open%20Concept%20Glass%20Rail.jpeg"
        alt="Dream Build Luxury Glass - Modern open-concept glass railing"
        fill
        priority
        quality={95}
        className="object-cover brightness-[0.7]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
          Dream Build <span className="text-gold-500">Luxury Glass</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl font-light text-gray-200 max-w-3xl mx-auto">
          Crafting Luxury, One Pane at a Time
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="#services"
            className="bg-gold-500 text-deepblack px-10 py-5 text-lg font-bold uppercase tracking-wider hover:bg-gold-600 transition-all hover:scale-105"
          >
            Explore Services
          </Link>
          <Link
            href="#contact"
            className="border-2 border-gold-500 text-gold-500 px-10 py-5 text-lg font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-deepblack transition-all"
          >
            Get Free Quote
          </Link>
        </div>
        <ChevronDown className="absolute bottom-10 left-1/2 -translate-x-1/2 w-9 h-9 text-gold-500 animate-bounce" />
      </div>
    </section>
  );
}
