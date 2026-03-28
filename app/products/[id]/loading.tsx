import React from "react";
import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
        {/* Image Skeleton */}
        <div className="aspect-[4/5] bg-[#F5F5F5] overflow-hidden">
          <Skeleton className="h-full w-full rounded-none" />
        </div>

        {/* Info Skeleton */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-20" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-16" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-6">
            <Skeleton className="h-14 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
