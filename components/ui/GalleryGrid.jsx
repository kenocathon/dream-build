// components/ui/GalleryGrid.jsx
import React from "react";
import Card from "@/components/ui/Card";
import { galleryImages } from "@/lib/data";

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {galleryImages.map((image, index) => (
        <Card
          key={index}
          title={image.title}
          description={image.description}
          imageUrl={image.imageUrl}
          altText={image.altText}
        />
      ))}
    </div>
  );
}
