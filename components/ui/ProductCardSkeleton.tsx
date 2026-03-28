import React from "react";
import Skeleton from "./Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="group space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5]">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
