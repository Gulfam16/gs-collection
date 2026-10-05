"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import { ProductCard } from "@/components/product/ProductCard";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#E05A47]">
            Your Saved Items
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-1 flex items-center gap-2">
            <Heart className="w-7 h-7 text-[#E05A47] fill-current" />
            Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {items.length === 0
              ? "You haven't saved any children's garments yet"
              : `You have ${items.length} saved ${items.length === 1 ? "item" : "items"}`}
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-bold text-rose-600 hover:underline"
          >
            Clear All Wishlist
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 sm:p-16 text-center border border-slate-100 shadow-sm max-w-lg mx-auto space-y-5">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-[#E05A47] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-black text-xl text-slate-900">Your wishlist is empty</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Click the heart icon on any outfit while browsing our catalog to save your favorite styles for later!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-sm rounded-xl shadow-md transition-all"
          >
            <span>Explore Children&apos;s Wear</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
