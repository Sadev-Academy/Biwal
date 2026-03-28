"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FilterSidebarProps {
  categories: { id: string; name: string }[];
}

const FilterSidebar = ({ categories }: FilterSidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const currentCategory = searchParams.get("category");
  const currentMinPrice = searchParams.get("minPrice");
  const currentMaxPrice = searchParams.get("maxPrice");

  const updateFilters = (newFilters: any) => {
    const currentQueries = qs.parse(searchParams.toString());
    const updatedQueries = { ...currentQueries, ...newFilters };

    const url = qs.stringifyUrl({
      url: window.location.pathname,
      query: updatedQueries,
    }, { skipNull: true });

    router.push(url);
  };

  return (
    <div className="space-y-12">
      {/* Search Bar */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#212121]">Search</h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && updateFilters({ search })}
          placeholder="Filter by name..."
          className="w-full bg-[#FAF9F8] border border-[#E5E5E5] px-4 py-3 text-xs focus:outline-none focus:border-[#212121] transition-colors"
        />
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#212121]">Category</h3>
        <div className="space-y-2">
          <button
            onClick={() => updateFilters({ category: null })}
            className={`block text-xs uppercase tracking-widest transition-colors ${!currentCategory ? "text-[#212121] font-bold" : "text-[#707072] hover:text-[#212121]"}`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilters({ category: cat.name })}
              className={`block text-xs uppercase tracking-widest transition-colors ${currentCategory === cat.name ? "text-[#212121] font-bold" : "text-[#707072] hover:text-[#212121]"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#212121]">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            defaultValue={currentMinPrice || ""}
            onBlur={(e) => updateFilters({ minPrice: e.target.value || null })}
            className="w-full bg-[#FAF9F8] border border-[#E5E5E5] px-4 py-3 text-xs focus:outline-none focus:border-[#212121] transition-colors"
          />
          <input
            type="number"
            placeholder="Max"
            defaultValue={currentMaxPrice || ""}
            onBlur={(e) => updateFilters({ maxPrice: e.target.value || null })}
            className="w-full bg-[#FAF9F8] border border-[#E5E5E5] px-4 py-3 text-xs focus:outline-none focus:border-[#212121] transition-colors"
          />
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => router.push("/products")}
        className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] border border-[#212121] text-[#212121] hover:bg-[#212121] hover:text-white transition-all"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
