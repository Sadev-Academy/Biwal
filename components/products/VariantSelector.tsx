"use client";

import React from "react";

interface Variant {
  id: string;
  size: string | null;
  color: string | null;
  stock: number;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelect: (variant: Variant) => void;
}

const VariantSelector = ({ variants, selectedVariant, onSelect }: VariantSelectorProps) => {
  // Group by unique sizes and colors
  const sizes = Array.from(new Set(variants.filter(v => v.size).map(v => v.size!)));
  const colors = Array.from(new Set(variants.filter(v => v.color).map(v => v.color!)));

  return (
    <div className="space-y-8">
      {/* Sizes */}
      {sizes.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#212121]">Select Size</h3>
            <span className="text-xs text-[#707072] underline cursor-pointer hover:text-black">Size Guide</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => {
              const variant = variants.find(v => v.size === size);
              const isSelected = selectedVariant?.size === size;
              const isOutOfStock = variant?.stock === 0;

              return (
                <button
                  key={size}
                  disabled={isOutOfStock}
                  onClick={() => variant && onSelect(variant)}
                  className={`py-3 text-[10px] font-bold border transition-all ${
                    isSelected 
                      ? "bg-[#212121] text-white border-[#212121]" 
                      : isOutOfStock 
                        ? "bg-[#F5F5F5] text-[#707072]/40 border-transparent cursor-not-allowed line-through"
                        : "bg-white text-[#212121] border-[#E5E5E5] hover:border-[#212121]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Colors (Optional) */}
      {colors.length > 0 && colors[0] !== "Original" && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#212121]">Select Color</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const variant = variants.find(v => v.color === color);
              const isSelected = selectedVariant?.color === color;

              return (
                <button
                  key={color}
                  onClick={() => variant && onSelect(variant)}
                  className={`px-4 py-2 text-[10px] font-bold border rounded-full transition-all ${
                    isSelected 
                      ? "bg-[#212121] text-white border-[#212121]" 
                      : "bg-white text-[#212121] border-[#E5E5E5] hover:border-[#212121]"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Stock Status */}
      {selectedVariant && (
        <div className="pt-2">
          {selectedVariant.stock > 0 && selectedVariant.stock < 10 && (
            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest animate-pulse">
              Only {selectedVariant.stock} left in stock - order soon!
            </p>
          )}
          {selectedVariant.stock === 0 && (
            <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
              Currently Out of Stock
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
