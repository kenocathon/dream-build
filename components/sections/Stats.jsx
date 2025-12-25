// components/sections/Stats.jsx
"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 15, label: "Years of Excellence", suffix: "+" },
  { value: 500, label: "Projects Completed", suffix: "+" },
  { value: 100, label: "Happy Clients", suffix: "%" },
  { value: 48, label: "Hour Quote Turnaround", suffix: "h" },
];

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="py-24 md:py-32 bg-deepblack overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">
            Built on <span className="text-gold-500">Trust</span>
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-gray-400 font-light">
            Numbers that speak for themselves
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              stat={stat}
              delay={index * 200}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, delay, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let start = 0;
      const end = stat.value;
      const duration = 2200;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [stat.value, delay, isVisible]);

  return (
    <div className="text-center group">
      <div className="text-6xl md:text-8xl font-black text-gold-500 tabular-nums">
        {count}
        <span className="text-5xl md:text-7xl">{stat.suffix}</span>
      </div>
      <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-wide group-hover:text-white transition-colors">
        {stat.label}
      </p>
      <div className="mx-auto mt-4 w-16 h-1 bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
}
