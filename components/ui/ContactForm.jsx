// components/ui/ContactForm.jsx
import React from "react";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  return (
    <section id="contact" className="py-16 px-4 md:py-24 bg-background">
      <div className="container mx-auto">
        <h2 className="text-foreground tracking-tight text-4xl font-bold md:text-5xl text-center mb-12">
          Get in Touch
        </h2>
        <form className="max-w-lg mx-auto flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 rounded-xl bg-muted text-foreground border border-border/50"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-muted text-foreground border border-border/50"
            required
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            className="w-full p-3 rounded-xl bg-muted text-foreground border border-border/50"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded-xl bg-muted text-foreground border border-border/50 min-h-[150px]"
            required
          ></textarea>
          <Button className="bg-primary text-primary-foreground">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
