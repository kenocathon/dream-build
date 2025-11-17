import React from "react";
import Link from "next/link";
import {
  SparklesIcon,
  PuzzlePieceIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const featuresData = [
  {
    icon: <SparklesIcon className="h-8 w-8 text-primary" />,
    title: "Premium Quality Materials",
    description:
      "We use only the finest glass and hardware for lasting beauty and durability.",
  },
  {
    icon: <PuzzlePieceIcon className="h-8 w-8 text-primary" />,
    title: "Custom Designs",
    description:
      "Every project is a unique collaboration, tailored to your specific vision and space.",
  },
  {
    icon: <WrenchScrewdriverIcon className="h-8 w-8 text-primary" />,
    title: "Exceptional Craftsmanship",
    description:
      "Our experienced artisans ensure meticulous attention to detail and flawless installation.",
  },
];

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-1 flex-col gap-4 rounded-xl border border-border bg-muted/50 p-6 transition-all hover:border-primary hover:-translate-y-1">
    {icon}
    <div className="flex flex-col gap-1">
      <h3 className="text-foreground text-lg font-bold leading-tight">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm font-normal leading-normal">
        {description}
      </p>
    </div>
  </div>
);

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-16 px-4 md:py-24 bg-background">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-foreground tracking-tight text-4xl font-bold leading-tight md:text-5xl">
            Why Choose Us?
          </h2>
          <p className="text-muted-foreground text-lg font-normal leading-relaxed max-w-xl">
            At Dream Build Luxury Glass, we merge artistry with engineering to
            create stunning, bespoke glass installations. Our commitment to
            quality and customer satisfaction sets us apart.
          </p>
          <Link
            href="/about"
            className="flex w-fit items-center justify-center rounded-xl h-12 px-6 bg-primary text-primary-foreground text-base font-bold transition-transform hover:scale-105"
          >
            Learn More About Our Process
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
