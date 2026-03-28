import React from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/ui/ProductCard";
import { ProductService } from "@/lib/services/ProductService";
import { StoreService } from "@/lib/services/StoreService";
import FilterSidebar from "@/components/search/FilterSidebar";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const store = await StoreService.getActiveStore();
  return {
    title: `Shop All ${store?.name || "Biwal"} | Sustainable Minimalist Apparel`,
    description: `Browse our complete collection of premium sustainable clothing from ${store?.name || "Biwal"}.`,
  };
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search, minPrice, maxPrice } = await searchParams;
  const store = await StoreService.getActiveStore();

  const products = await ProductService.getProducts({
    category,
    search,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
  });

  const categories = await StoreService.getCategories();

  if (!store) {
    return <div>Store not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Section className="pb-8 pt-24 bg-[#F5F5F5]">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tighter mb-4 capitalize">
              {category ? category : search ? `Search: ${search}` : "All Products"}
            </h1>
            <p className="text-[#707072]">
              Explore the {store.name} collection of premium essentials, crafted for comfort and style.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-16">
            {/* Left Sidebar: Filters */}
            <aside className="lg:col-span-1">
              <FilterSidebar categories={categories} />
            </aside>

            {/* Right Column: Product Grid */}
            <main className="lg:col-span-3">
              {products.length === 0 ? (
                <div className="text-center py-20 space-y-6 bg-[#FAF9F8] border border-dashed border-[#E5E5E5] rounded-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#707072]">No Results</p>
                  <h2 className="text-2xl font-black tracking-tighter text-[#212121]">No products found matching your criteria.</h2>
                  <p className="text-[#707072] max-w-sm mx-auto text-sm">Try adjusting your filters or searching for something else.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                  {products.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      categoryName={product.category.name}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </Container>
      </Section>
    </div>
  );
}
