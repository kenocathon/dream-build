// components/ui/Card.jsx
import React from "react";
import Image from "next/image";

export default function Card({ title, description, imageUrl, altText }) {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={altText}
          width={600}
          height={400}
          className="object-cover aspect-video w-full h-full transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-foreground text-lg font-bold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
