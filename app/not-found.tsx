import React from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section className="min-h-[70vh] flex items-center">
      <Container>
        <div className="max-w-xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#707072]">Lost in the clouds</p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#212121]">Page not <br /> found.</h1>
            <p className="text-[#707072] text-lg font-medium">
              The piece you are looking for has moved or no longer exists. Explore our collection for something new.
            </p>
          </div>
          
          <div className="pt-4">
            <Link 
              href="/products"
              className="inline-block px-10 py-4 bg-[#212121] text-white text-[10px] uppercase font-black tracking-widest hover:bg-[#333333] transition-colors"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
