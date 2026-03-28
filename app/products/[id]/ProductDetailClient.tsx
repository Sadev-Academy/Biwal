"use client";

import React, { useState } from "react";
import VariantSelector from "@/components/products/VariantSelector";
import Button from "@/components/ui/Button";
import { useCart } from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

interface ProductDetailClientProps {
  product: any;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || null);
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a variant first");
      return;
    }

    if (selectedVariant.stock <= 0) {
      toast.error("This item is currently out of stock");
      return;
    }

    addItem({
      ...product,
      variantId: selectedVariant.id,
      selectedSize: selectedVariant.size,
      selectedColor: selectedVariant.color,
    });
    
    toast.success("Added to cart!");
  };

  return (
    <div className="space-y-10">
      <VariantSelector 
        variants={product.variants} 
        selectedVariant={selectedVariant}
        onSelect={setSelectedVariant}
      />

      <Button 
        onClick={handleAddToCart}
        className="w-full py-6 text-[11px] uppercase tracking-[0.25em] font-black"
        disabled={!selectedVariant || selectedVariant.stock === 0}
      >
        {selectedVariant?.stock === 0 ? "Out of Stock" : "Add to Shopping Bag"}
      </Button>
    </div>
  );
};

export default ProductDetailClient;
