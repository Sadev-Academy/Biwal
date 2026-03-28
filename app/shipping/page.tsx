import React from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const ShippingPage = () => {
  return (
    <Section className="py-24">
      <Container>
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#707072]">Support</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#212121]">Shipping Policy</h1>
          </div>

          <div className="prose prose-sm prose-neutral max-w-none text-[#707072] leading-relaxed space-y-8 text-lg font-medium">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#212121] uppercase tracking-widest text-sm">Domestic Shipping</h2>
              <p>
                We offer free standard shipping on all domestic orders over $100. For orders under $100, a flat rate of $10 applies. Standard shipping typically takes 3-5 business days.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#212121] uppercase tracking-widest text-sm">International Shipping</h2>
              <p>
                At this time, Biwal ships to select international locations. Shipping rates and delivery times vary by destination and will be calculated at checkout. Please note that customers are responsible for any customs or import duties.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#212121] uppercase tracking-widest text-sm">Order Processing</h2>
              <p>
                Orders are processed Monday through Friday, excluding holidays. Most orders are shipped within 24-48 hours of purchase. Once your order has shipped, you will receive a confirmation email with tracking information.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ShippingPage;
