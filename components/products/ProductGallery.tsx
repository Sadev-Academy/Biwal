"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: { id: string; url: string }[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeImage, setActiveImage] = useState(images[0]?.url || "/placeholder.png");

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5] group">
        <Image
          src={activeImage}
          alt="Product gallery"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => setActiveImage(image.url)}
              className={`relative aspect-square overflow-hidden border-2 transition-all ${
                activeImage === image.url ? "border-[#212121]" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.url}
                alt="Thumbnail"
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
