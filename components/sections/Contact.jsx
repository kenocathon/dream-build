// components/sections/Contact.jsx
"use client";

import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setSuccess(true);
      e.target.reset();
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setError("Something went wrong. Please try again or call us at (404) 707-8819.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-6 py-5 bg-black/40 border border-gray-800 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all";

  return (
    <section id="contact" className="py-32 bg-deepblack">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-black tracking-tight">
          Start Your <span className="text-gold-500">Transformation</span>
        </h2>
        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Free consultation • Same-day quotes • Licensed & insured
        </p>

        <form onSubmit={handleSubmit} className="mt-16 space-y-8 text-left">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className={inputClasses}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                required
                className={inputClasses}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className={inputClasses}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
              Project Details
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`${inputClasses} resize-none`}
              placeholder="Tell us about your project..."
            />
          </div>

          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-gray-400 mb-2">
              Attach photos of your space (optional)
            </label>
            <input
              type="file"
              id="photos"
              name="photos"
              multiple
              accept="image/*"
              className="block w-full text-sm text-gray-400 file:mr-6 file:py-4 file:px-8 file:border-0 file:bg-gold-500 file:text-deepblack file:font-bold file:hover:bg-gold-600 file:cursor-pointer cursor-pointer"
            />
          </div>

          <div className="pt-8 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-gold-500 text-deepblack px-16 py-6 text-xl font-bold uppercase tracking-wider hover:bg-gold-600 transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gold-500/50"
            >
              {isSubmitting ? "Sending..." : "Get Free Quote"}
            </button>
          </div>

          {success && (
            <p className="text-green-400 text-2xl font-medium animate-pulse text-center">
              Thank you! We'll contact you within 2 hours.
            </p>
          )}

          {error && (
            <p className="text-red-400 text-lg text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
