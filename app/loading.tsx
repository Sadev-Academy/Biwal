import React from "react";
import Container from "@/components/ui/Container";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Skeleton */}
      <div className="relative h-[80vh] w-full bg-[#F5F5F5]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-16 w-3/4 max-w-2xl" />
          <Skeleton className="h-12 w-48" />
        </div>
      </div>

      {/* Featured Products Skeleton */}
      <Container>
        <div className="space-y-10">
          <div className="flex flex-col items-center text-center space-y-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
