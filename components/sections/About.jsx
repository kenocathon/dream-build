// components/sections/About.jsx
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-32 bg-deepblack overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image – using your real R2 photo */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <Image
                src="https://images.dbluxuryglass.com/glass-shower-white-bathroom.jpeg"
                alt="Dream Build Luxury Glass - Professional frameless shower installation"
                width={800}
                height={1000}
                className="object-cover w-full rounded-none shadow-2xl group-hover:scale-[1.02] transition-transform duration-700"
                quality={95}
              />
              {/* Subtle gold border accent */}
              <div className="absolute inset-0 border-4 border-gold-500/20 pointer-events-none" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">
              Why Choose <span className="text-gold-500">Dream Build</span>
            </h2>

            <p className="mt-8 text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
              With over{" "}
              <span className="text-gold-500 font-bold">15 years</span> of
              experience, we transform ordinary spaces into modern masterpieces
              using only the highest-grade tempered glass and precision
              engineering.
            </p>

            <ul className="mt-10 space-y-6 text-left max-w-xl mx-auto lg:mx-0">
              {[
                "Fully licensed, bonded & insured",
                "Lifetime warranty on all installations",
                "In-house design + fabrication",
                "100% custom – no prefab parts",
                "Same-week quotes • Fast installation",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-lg text-gray-200"
                >
                  <span className="text-gold-500 text-2xl">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <Link
                href="#contact"
                className="inline-block bg-gold-500 text-deepblack px-12 py-6 text-xl font-bold uppercase tracking-wider hover:bg-gold-600 transition-all hover:scale-105 shadow-xl"
              >
                Get Your Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
