"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { CheckCircle, ShoppingBag } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const SuccessPage = () => {
  const cart = useCart();

  useEffect(() => {
    // Clear cart on successful payment
    cart.clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Section>
        <Container>
          <div className="max-w-md mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <div className="p-4 bg-green-50 rounded-full">
                <CheckCircle size={64} className="text-green-500" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter">Payment Successful!</h1>
              <p className="text-[#707072] text-lg">
                Thank you for your purchase. Your order is now being processed.
              </p>
            </div>

            <div className="pt-8 space-y-4">
              <Button variant="primary" className="w-full py-4 text-xs tracking-widest uppercase font-bold">
                <Link href="/account/orders" className="w-full h-full block flex items-center justify-center">
                  View My Orders
                </Link>
              </Button>
              <Button variant="outline" className="w-full py-4 text-xs tracking-widest uppercase font-bold">
                <Link href="/products" className="w-full h-full block flex items-center justify-center">
                  <ShoppingBag size={16} className="mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default SuccessPage;
