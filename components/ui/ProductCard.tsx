import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  categoryName,
}) => {
  return (
    <Link href={`/products/${id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF9F8] mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>
      <div className="space-y-1.5 px-1">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#707072] font-black">
          {categoryName}
        </p>
        <h3 className="text-sm font-bold text-[#212121] tracking-tight group-hover:underline decoration-1 underline-offset-4 decoration-[#212121]">
          {name}
        </h3>
        <p className="text-sm text-[#707072] font-medium">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
