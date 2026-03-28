import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import ProductCard from "@/components/ui/ProductCard";
import { ProductService } from "@/lib/services/ProductService";
import { StoreService } from "@/lib/services/StoreService";

export default async function Home() {
  const store = await StoreService.getActiveStore();
  const featuredProducts = await ProductService.getFeaturedProducts();
  const categories = await StoreService.getCategories();

  if (!store) {
    return <div>Store not found.</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <Image
          src={store.logo || "/biwal_hero_image.png"}
          alt={store.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
        <Container className="relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.85]">
              {store.name === "Biwal Global" ? (
                <>Ethical Luxury. <br /> Timeless Design.</>
              ) : (
                store.name
              )}
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/95 max-w-lg font-medium leading-relaxed">
              Elevating the essentials. Discover a collection where uncompromising quality meets a deep respect for the planet. Crafted for the modern conscious.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button variant="primary" className="px-8 py-4 text-[10px] tracking-[0.2em] font-black uppercase">Shop Collection</Button>
              </Link>
              <Link href="/#story">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-[#212121] px-8 py-4 text-[10px] tracking-[0.2em] font-black uppercase">
                  Our Philosophy
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <Section 
        title="Curated Essentials" 
        subtitle="Refined silhouettes and premium textiles, meticulously curated for a modern lifestyle."
      >
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product: any) => (
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
          <div className="mt-16 text-center">
            <Link href="/products">
              <Button variant="outline" style={{ borderColor: store.primaryColor }}>View All Products</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Categories Section */}
      <Section 
        id="categories"
        title="Shop by Category"
        subtitle="From foundational staples to contemporary icons – discover the Biwal aesthetic."
        className="bg-[#F5F5F5]"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category: any) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.name}`}
                className="group relative aspect-[4/5] overflow-hidden bg-white flex items-center justify-center"
              >
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                <div className="relative z-20 text-center">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white group-hover:scale-110 transition-transform duration-300">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Brand Story */}
      <Section id="story" className="bg-white py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            <div className="relative aspect-[4/5] bg-[#FAF9F8] overflow-hidden group">
              <Image
                src="/brand_story.png"
                alt={`${store.name} Sustainable Craftsmanship`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#707072]">Our Philosophy</p>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#212121] leading-[0.9]">
                  A Legacy of <br /> Conscious <br /> Craftsmanship.
                </h2>
              </div>
              <div className="space-y-6 text-[#707072] leading-relaxed text-lg font-medium">
                <p>
                  We exist at the intersection of intentionality and elegance. Every stitch tells a story of sustainability, and every silhouette is a testament to our commitment to a better future. 
                </p>
                <p>
                  At {store.name}, we don't just make clothing; we build icons that represent a deeper respect for our world. Our journey is defined by the pursuit of the perfect essential.
                </p>
              </div>
              <Link href="/products">
                <Button variant="primary" className="mt-4 px-10 py-5 text-[10px] uppercase tracking-[0.2em] font-black" style={{ backgroundColor: store.primaryColor }}>
                  Discover Our Story
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
