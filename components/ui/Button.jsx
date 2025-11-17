// components/ui/Button.jsx
import React from "react";
import Link from "next/link";

export default function Button({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`flex w-fit items-center justify-center rounded-xl h-12 px-6 text-base font-bold transition-transform hover:scale-105 ${className}`}
    >
      {children}
    </Link>
  );
}
