"use client";

import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { showToast } from "@/store/useToastStore";
import { Heart, Star, ShoppingBag, Eye, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const activeVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];
  const discountPercent = calculateDiscount(product.basePrice, product.salePrice);
  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = !activeVariant || activeVariant.stockQuantity <= 0;

  // Extract unique colors available across variants
  const uniqueColors = Array.from(
    new Map(product.variants.map((v) => [v.color.hexCode, v.color])).values()
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!activeVariant || activeVariant.stockQuantity <= 0) {
      showToast("Selected variant is currently out of stock", "error");
      return;
    }

    setIsAdding(true);
    addItem({
      id: `cart-${product.id}-${activeVariant.id}`,
      productId: product.id,
      variantId: activeVariant.id,
      name: product.name,
      slug: product.slug,
      image: primaryImage?.imageUrl || "/images/placeholder.jpg",
      sizeName: activeVariant.size.name,
      colorName: activeVariant.color.name,
      colorHex: activeVariant.color.hexCode,
      price: product.salePrice || product.basePrice,
      originalPrice: product.salePrice ? product.basePrice : undefined,
      maxStock: activeVariant.stockQuantity,
    });

    showToast(`Added "${product.name}" (${activeVariant.size.name}) to cart!`, "success");
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      inWishlist ? "Removed from wishlist" : "Added to wishlist!",
      inWishlist ? "info" : "success"
    );
  };

  return (
    <div className="group bg-white rounded-3xl p-3 border border-slate-100/80 shadow-xs hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between relative">
      {/* Top Image Frame */}
      <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-slate-100">
        <Link href={`/shop/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage?.imageUrl || "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-[#E05A47] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs tracking-wider">
              -{discountPercent}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              NEW
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-slate-700/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-xs z-10 ${
            inWishlist
              ? "bg-rose-50 text-[#E05A47] ring-2 ring-[#E05A47]/30"
              : "bg-white/80 text-slate-600 hover:bg-white hover:text-[#E05A47]"
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/95 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md hover:bg-white flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        )}
      </div>

      {/* Product Content Details */}
      <div className="pt-3 px-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Review Count */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-700">
              {product.ratingAverage || 4.8}
            </span>
            <span className="text-[11px] text-slate-400">
              ({product.reviewCount || 12})
            </span>
          </div>

          {/* Product Name */}
          <Link href={`/shop/${product.slug}`} className="block group-hover:text-[#E05A47] transition-colors">
            <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Color Variants indicator */}
          <div className="flex items-center gap-1.5 mt-2">
            {uniqueColors.map((color) => (
              <span
                key={color.hexCode}
                className="w-3 h-3 rounded-full border border-slate-300 shadow-2xs"
                style={{ backgroundColor: color.hexCode }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-slate-400 font-medium ml-1">
              {uniqueColors.length} {uniqueColors.length === 1 ? "color" : "colors"}
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="font-extrabold text-slate-900 text-base">
              {formatPrice(product.salePrice || product.basePrice)}
            </div>
            {product.salePrice && (
              <div className="text-xs text-slate-400 line-through">
                {formatPrice(product.basePrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock || isAdding}
            className={`p-2.5 rounded-2xl flex items-center justify-center transition-all ${
              isOutOfStock
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : isAdding
                ? "bg-emerald-600 text-white scale-95"
                : "bg-slate-900 hover:bg-[#E05A47] text-white hover:shadow-md hover:scale-105 active:scale-95"
            }`}
            title={isOutOfStock ? "Out of stock" : "Add to cart"}
          >
            {isAdding ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
