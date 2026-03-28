import React from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div 
      className={`animate-pulse bg-[#F5F5F5] rounded-md ${className}`}
    />
  );
};

export default Skeleton;
