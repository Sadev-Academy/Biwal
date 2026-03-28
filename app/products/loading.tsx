import React from "react";
import Container from "@/components/ui/Container";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-64" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </Container>
  );
}
