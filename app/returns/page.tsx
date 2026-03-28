import React from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const ReturnsPage = () => {
  return (
    <Section className="py-24">
      <Container>
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#707072]">Support</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#212121]">Returns & Exchanges</h1>
          </div>

          <div className="prose prose-sm prose-neutral max-w-none text-[#707072] leading-relaxed space-y-8 text-lg font-medium">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#212121] uppercase tracking-widest text-sm">Our Guarantee</h2>
              <p>
                We want you to love your Biwal essentials. If you are not completely satisfied with your purchase, you can return or exchange any item within 30 days of delivery.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#212121] uppercase tracking-widest text-sm">Easy Returns</h2>
              <p>
                To initiate a return, please visit our online Return Portal with your order number and email address. Items must be in their original condition, unworn and unwashed, with all tags attached.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#212121] uppercase tracking-widest text-sm">Refunds</h2>
              <p>
                Once we receive and inspect your return, we will process your refund to the original payment method within 5-7 business days. Please note that original shipping costs are non-refundable.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ReturnsPage;
