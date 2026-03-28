import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
  return (
    <div className="flex flex-col min-h-[80vh] justify-center">
      <Section>
        <Container>
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-green-50 rounded-full">
                <CheckCircle size={64} className="text-green-500" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter">Order Confirmed!</h1>
              <p className="text-[#707072]">
                Thank you for your purchase. We've sent a confirmation email with your order details.
              </p>
            </div>

            <div className="pt-8 space-y-4">
              <Button variant="primary" className="w-full py-4 text-xs tracking-widest uppercase font-bold">
                <Link href="/account/orders" className="w-full h-full block">View My Orders</Link>
              </Button>
              <Button variant="outline" className="w-full py-4 text-xs tracking-widest uppercase font-bold">
                <Link href="/products" className="w-full h-full block">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default OrderSuccessPage;
