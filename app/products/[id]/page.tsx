import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/ui/ProductCard";
import { ProductService } from "@/lib/services/ProductService";
import { StoreService } from "@/lib/services/StoreService";
import ProductGallery from "@/components/products/ProductGallery";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await ProductService.getProductById(id);
  const store = await StoreService.getActiveStore();
  
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | ${store?.name || "Biwal"}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${store?.name || "Biwal"}`,
      description: product.description,
      images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
      type: "article",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const store = await StoreService.getActiveStore();
  const product = await ProductService.getProductById(id);

  if (!product || !store) {
    notFound();
  }

  // Fetch related products (using the same category, scoped to store)
  const relatedProducts = await ProductService.getProducts({
    category: product.category.name,
    limit: 5,
  });
  const filteredRelated = relatedProducts.filter((p: { id: string }) => p.id !== product.id).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Section className="py-12 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Left Column: Image Gallery */}
            <ProductGallery images={product.images.length > 0 ? product.images : [{ id: 'default', url: product.image }]} />

            {/* Right Column: Details & Interaction */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#707072] mb-4">
                  {product.category.name}
                </p>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-[#212121] leading-none">
                  {product.name}
                </h1>
                <p className="text-3xl font-light text-[#212121]">${product.price.toFixed(2)}</p>
              </div>

              <div className="mb-10 space-y-6">
                <div className="pt-8 border-t border-[#F5F5F5]">
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4">The Detail</h3>
                  <div className="text-[#707072] leading-relaxed text-lg prose prose-sm max-w-none">
                    {product.description}
                  </div>
                </div>
              </div>

              {/* Client Component for Selectors & Add to Bag */}
              <ProductDetailClient product={product} />

              <div className="mt-12 grid grid-cols-2 gap-8 pt-8 border-t border-[#F5F5F5]">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">Materials</h4>
                  <p className="text-xs text-[#707072]">Premium sustainable fabrics sourced with care.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">Care</h4>
                  <p className="text-xs text-[#707072]">Machine wash cold, air dry recommended.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Recommended Section */}
      {filteredRelated.length > 0 && (
        <Section className="bg-[#FAF9F8] border-t border-[#F5F5F5]">
          <Container>
            <h2 className="text-3xl font-black tracking-tighter mb-12">Complete The Look</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredRelated.map((relProduct: { id: string; name: string; price: number; image: string; category: { name: string } }) => (
                <ProductCard 
                  key={relProduct.id} 
                  id={relProduct.id}
                  name={relProduct.name}
                  price={relProduct.price}
                  image={relProduct.image}
                  categoryName={relProduct.category.name}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
