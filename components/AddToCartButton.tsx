"use client";

import React, { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import Button from "./ui/Button";
import { Check, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: {
    id: string;
    variantId: string;
    name: string;
    price: number;
    image: string;
    categoryName: string;
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const cart = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    cart.addItem(product);
    
    // Reset loading state after a short delay for visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <Button 
      variant="primary" 
      className="w-full py-5 text-sm flex items-center justify-center gap-2"
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? (
        <>
          <Check size={18} />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart size={18} />
          Add to Cart
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;
