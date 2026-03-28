import React from "react";
import Skeleton from "@/components/ui/Skeleton";
import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="py-20 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md space-y-8 p-8 border border-[#F5F5F5] rounded-xl">
        <div className="text-center space-y-4">
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-10 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-12 w-full mt-4" />
        </div>

        <div className="text-center">
          <Skeleton className="h-4 w-40 mx-auto" />
        </div>
      </div>
    </Container>
  );
}
