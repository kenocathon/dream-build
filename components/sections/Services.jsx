// components/sections/Services.jsx
import Image from "next/image";
import Link from "next/link";

const mainServices = [
  {
    title: "Frameless Showers",
    description:
      "Sleek, custom-measured glass enclosures that turn your bathroom into a modern spa.",
    image:
      "https://images.dbluxuryglass.com/shower-marble-black-accent-gold-trim.jpeg",
    alt: "Luxury frameless glass shower by Dream Build Luxury Glass",
  },
  {
    title: "Glass Handrails",
    description:
      "Standalone or integrated LED-lit handrails for stairs, decks, and balconies.",
    image:
      "https://images.dbluxuryglass.com/glass-handrail-white-steps.jpeg",
    alt: "Elegant glass handrail installation",
  },
];

const comingSoon = [
  "Custom Mirrors & Backlit Designs",
  "Glass Wine Cellars",
  "Commercial Partitions & Storefronts",
  "Outdoor Pool Enclosures",
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-deepblack">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">
            Our <span className="text-gold-500">Services</span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
            Premium glass solutions, crafted and installed with obsessive
            attention to detail
          </p>
        </div>

        {/* Main services with real photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {mainServices.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden bg-black/40 border border-gray-800 hover:border-gold-500/50 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Coming Soon – text only, looks intentional and premium */}
        <div className="text-center">
          <p className="text-2xl text-gray-400 mb-8">Now expanding into</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-xl md:text-2xl text-gray-200">
            {comingSoon.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="text-gold-500 text-3xl">→</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link
            href="#contact"
            className="inline-block bg-gold-500 text-deepblack px-12 py-6 text-xl font-bold uppercase tracking-wider hover:bg-gold-600 transition-all hover:scale-105 active:scale-95 shadow-2xl"
          >
            Start Your Project
          </Link>
        </div>
      </div>
    </section>
  );
}
