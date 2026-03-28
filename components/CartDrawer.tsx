"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { X, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import Button from "./ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CartDrawer = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

  const onCheckout = async () => {
    if (!session) {
      cart.onClose();
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/checkout", {
        items: cart.items,
      });

      if (response.data.url) {
        window.location.assign(response.data.url);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${cart.isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={cart.onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-in-out ${cart.isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5F5F5]">
            <h2 className="text-sm font-bold uppercase tracking-widest flex items-center">
              Your Cart 
              <span className="ml-2 text-[#707072] font-semibold">({cart.items.length})</span>
            </h2>
            <button onClick={cart.onClose} className="p-2 hover:bg-[#F5F5F5] transition-colors rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto px-6 py-4 space-y-6">
            {cart.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                  <div className="absolute -inset-4 bg-[#F5F5F5] rounded-full animate-pulse" />
                  <ShoppingBag size={40} className="relative text-[#212121]" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#212121]">Your cart is empty</h3>
                  <p className="text-xs text-[#707072] font-medium leading-relaxed max-w-[200px] mx-auto">
                    It looks like you haven't added any pieces to your collection yet.
                  </p>
                </div>
                <Button variant="outline" onClick={cart.onClose} className="px-10 py-4 text-[10px] uppercase font-black tracking-widest bg-transparent border-[#D9D9D9] hover:border-[#212121]">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.variantId} className="flex space-x-4 pb-6 border-b border-[#F5F5F5] last:border-0 last:pb-0">
                  <div className="relative aspect-square w-24 flex-shrink-0 bg-[#F5F5F5]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-[#707072] font-semibold mb-1">
                            {item.categoryName}
                          </p>
                          <h3 className="text-sm font-medium text-[#212121]">{item.name}</h3>
                          {item.selectedSize && (
                            <p className="text-[10px] text-[#707072] mt-1 uppercase font-bold tracking-widest">
                              Size: {item.selectedSize}
                              {item.selectedColor && item.selectedColor !== "Original" && ` / Color: ${item.selectedColor}`}
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button 
                          onClick={() => cart.decreaseQuantity(item.variantId)}
                          className="px-2 py-1 hover:bg-[#F5F5F5] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => cart.increaseQuantity(item.variantId)}
                          className="px-2 py-1 hover:bg-[#F5F5F5] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => cart.removeItem(item.variantId)}
                        className="text-[10px] uppercase font-bold tracking-widest text-[#707072] hover:text-[#212121] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="px-6 py-8 border-t border-[#F5F5F5] space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold uppercase tracking-widest">Subtotal</p>
                <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
              </div>
              <p className="text-[10px] text-[#707072] text-center uppercase tracking-widest font-semibold py-2">
                Shipping and taxes calculated at checkout
              </p>
              <Button 
                variant="primary" 
                className="w-full py-5 text-sm flex items-center justify-center gap-2"
                onClick={onCheckout}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {session ? "Proceed to Checkout" : "Sign in to Checkout"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
