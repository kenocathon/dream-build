// components/ui/Section.jsx
import React from "react";

export default function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`py-16 px-4 md:py-24 ${className}`}>
      {children}
    </section>
  );
}
