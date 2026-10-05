"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_SIZES, MOCK_COLORS } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { GenderCategory } from "@/types";

export function ShopCatalogContent() {
  const searchParams = useSearchParams();

  // Search parameters from URL
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";
  const initialGender = searchParams.get("gender") || "all";
  const initialOnSale = searchParams.get("onSale") === "true";
  const initialFeatured = searchParams.get("featured") === "true";
  const initialNewArrival = searchParams.get("newArrival") === "true";

  // State
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [onSaleOnly, setOnSaleOnly] = useState(initialOnSale);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filtered and sorted product listing
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Search
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFabric = product.fabricMaterial?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesFabric) return false;
      }

      // Category
      if (selectedCategory !== "all") {
        const cat = MOCK_CATEGORIES.find((c) => c.slug === selectedCategory);
        if (cat && product.categoryId !== cat.id) return false;
      }

      // Gender
      if (selectedGender !== "all" && product.gender !== selectedGender) {
        return false;
      }

      // Size
      if (selectedSize !== "all") {
        const hasSize = product.variants.some((v) => v.size.name === selectedSize);
        if (!hasSize) return false;
      }

      // Color
      if (selectedColor !== "all") {
        const hasColor = product.variants.some((v) => v.color.name === selectedColor);
        if (!hasColor) return false;
      }

      // Max price
      const activePrice = product.salePrice || product.basePrice;
      if (activePrice > priceRange) return false;

      // On sale
      if (onSaleOnly && (!product.salePrice || product.salePrice >= product.basePrice)) {
        return false;
      }

      // In stock
      if (inStockOnly) {
        const hasStock = product.variants.some((v) => v.stockQuantity > 0);
        if (!hasStock) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.basePrice;
      const priceB = b.salePrice || b.basePrice;

      if (sortBy === "price_asc") return priceA - priceB;
      if (sortBy === "price_desc") return priceB - priceA;
      if (sortBy === "rating") return (b.ratingAverage || 0) - (a.ratingAverage || 0);
      if (sortBy === "discount") {
        const discA = a.salePrice ? a.basePrice - a.salePrice : 0;
        const discB = b.salePrice ? b.basePrice - b.salePrice : 0;
        return discB - discA;
      }
      return 0; // default newest
    });
  }, [
    search,
    selectedCategory,
    selectedGender,
    selectedSize,
    selectedColor,
    priceRange,
    onSaleOnly,
    inStockOnly,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedGender("all");
    setSelectedSize("all");
    setSelectedColor("all");
    setPriceRange(5000);
    setOnSaleOnly(false);
    setInStockOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="border-b border-slate-200/80 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#E05A47]">
            GS Collection Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
            Children&apos;s Clothing & Fashion
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing {filteredProducts.length} cute outfits for boys, girls, and babies
          </p>
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#E05A47]" />
            Filters
          </button>

          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-xs font-semibold text-slate-700 py-2.5 pl-4 pr-9 rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#E05A47]/30"
            >
              <option value="newest">Sort by: Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
            <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#E05A47]" />
              Filter Products
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-[#E05A47] hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Department / Gender */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Department
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "All", value: "all" },
                { label: "Boys", value: "BOYS" },
                { label: "Girls", value: "GIRLS" },
                { label: "Baby", value: "BABY" },
              ].map((g) => (
                <button
                  key={g.value}
                  onClick={() => setSelectedGender(g.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedGender === g.value
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Category
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-rose-50 text-[#E05A47] font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                All Garments
              </button>
              {MOCK_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex justify-between items-center ${
                    selectedCategory === c.slug
                      ? "bg-rose-50 text-[#E05A47] font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-[10px] text-slate-400">{c.productCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Age & Size
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setSelectedSize("all")}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all text-center ${
                  selectedSize === "all"
                    ? "bg-[#E05A47] text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                All Sizes
              </button>
              {MOCK_SIZES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSize(s.name)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all text-center truncate ${
                    selectedSize === s.name
                      ? "bg-[#E05A47] text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-800 uppercase tracking-wider">Max Price</label>
              <span className="font-bold text-[#E05A47]">Rs. {priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="5000"
              step="250"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#E05A47]"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Rs. 1,000</span>
              <span>Rs. 5,000</span>
            </div>
          </div>

          {/* Quick Checkboxes */}
          <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#E05A47] focus:ring-[#E05A47]"
              />
              <span>On Sale % Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#E05A47] focus:ring-[#E05A47]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-[#E05A47] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">No Matching Clothes Found</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                We couldn&apos;t find any products matching your active filters. Try resetting your search or price range.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-[#E05A47] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER MODAL */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-bold text-base text-slate-900">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase">Department</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "All", value: "all" },
                  { label: "Boys", value: "BOYS" },
                  { label: "Girls", value: "GIRLS" },
                  { label: "Baby", value: "BABY" },
                ].map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setSelectedGender(g.value)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold ${
                      selectedGender === g.value
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t space-y-2">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-[#E05A47] text-white font-bold rounded-xl text-sm"
              >
                Show Results ({filteredProducts.length})
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
