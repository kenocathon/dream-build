// components/sections/Contact.tsx   (or .jsx)
"use client";

import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Fake success for now – replace with real endpoint later
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-32 bg-deepblack">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black tracking-tight">
          Start Your <span className="text-gold-500">Transformation</span>
        </h2>
        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Free consultation • Same-day quotes • Licensed & insured
        </p>

        <form onSubmit={handleSubmit} className="mt-16 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full px-6 py-5 bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-all"
            />
            <input
              type="tel"
              placeholder="Phone (required)"
              required
              className="w-full px-6 py-5 bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-all"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-6 py-5 bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-all"
          />

          <textarea
            rows={4}
            placeholder="Tell us about your project…"
            className="w-full px-6 py-5 bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-all resize-none"
          />

          <div className="text-left">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Attach photos of your space (optional but helps us quote faster)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="block w-full text-sm text-gray-400 file:mr-6 file:py-4 file:px-8 file:border-0 file:bg-gold-500 file:text-deepblack file:font-bold file:hover:bg-gold-600 file:cursor-pointer cursor-pointer"
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-gold-500 text-deepblack px-16 py-6 text-xl font-bold uppercase tracking-wider hover:bg-gold-600 transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Get Free Quote"}
            </button>
          </div>

          {success && (
            <p className="text-green-400 text-2xl font-medium animate-pulse">
              ✓ Thank you! We'll contact you within 2 hours.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
