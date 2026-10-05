"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { showToast } from "@/store/useToastStore";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem, setIsOpen: setCartOpen } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  // State
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSizeId, setSelectedSizeId] = useState<string>(
    product.variants[0]?.sizeId || ""
  );
  const [selectedColorId, setSelectedColorId] = useState<string>(
    product.variants[0]?.colorId || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [userReviews, setUserReviews] = useState([
    {
      id: "rev-1",
      userName: "Fatima Noor",
      rating: 5,
      date: "2 days ago",
      comment:
        "The fabric is exceptionally soft and doesn't shrink after wash. My 5-year-old son loves wearing it to preschool!",
    },
    {
      id: "rev-2",
      userName: "Usman Ali",
      rating: 5,
      date: "1 week ago",
      comment:
        "Very fast delivery to Karachi. Stitches are neat and the color looks even better in person than the pictures.",
    },
  ]);

  // Derived current variant based on selected size + color
  const matchedVariant: ProductVariant | undefined = product.variants.find(
    (v) => v.sizeId === selectedSizeId && v.colorId === selectedColorId
  ) || product.variants[0];

  const isOutOfStock = !matchedVariant || matchedVariant.stockQuantity <= 0;
  const inWishlist = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.basePrice, product.salePrice);
  const activeImage = product.images[selectedImageIdx] || product.images[0];

  // Distinct sizes and colors for picker
  const availableSizes = Array.from(
    new Map(product.variants.map((v) => [v.size.id, v.size])).values()
  );
  const availableColors = Array.from(
    new Map(product.variants.map((v) => [v.color.id, v.color])).values()
  );

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    if (isOutOfStock) {
      showToast("This combination is currently out of stock", "error");
      return;
    }

    setIsAdding(true);
    addItem(
      {
        id: `cart-${product.id}-${matchedVariant.id}`,
        productId: product.id,
        variantId: matchedVariant.id,
        name: product.name,
        slug: product.slug,
        image: activeImage?.imageUrl || "/images/placeholder.jpg",
        sizeName: matchedVariant.size.name,
        colorName: matchedVariant.color.name,
        colorHex: matchedVariant.color.hexCode,
        price: product.salePrice || product.basePrice,
        originalPrice: product.salePrice ? product.basePrice : undefined,
        maxStock: matchedVariant.stockQuantity,
      },
      quantity
    );

    showToast(`Added ${quantity}x "${product.name}" to cart!`, "success");
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    handleAddToCart();
    setCartOpen(false);
    router.push("/checkout");
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    setUserReviews([
      {
        id: `rev-${Date.now()}`,
        userName: "Verified Customer",
        rating: reviewRating,
        date: "Just now",
        comment: reviewComment.trim(),
      },
      ...userReviews,
    ]);

    setReviewComment("");
    showToast("Thank you! Your review has been submitted.", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/shop" className="hover:text-slate-900">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImageIdx === idx
                      ? "border-[#E05A47] shadow-sm scale-102"
                      : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.altText || product.name}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Large Preview */}
          <div className="relative flex-1 aspect-4/5 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md">
            <Image
              src={activeImage?.imageUrl || "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-[#E05A47] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                SAVE {discountPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold text-[#E05A47] tracking-wider">
                {product.gender} • {product.ageGroup || "Kids Fashion"}
              </span>
              <button
                onClick={() => {
                  toggleWishlist(product);
                  showToast(
                    inWishlist ? "Removed from wishlist" : "Saved to wishlist!",
                    inWishlist ? "info" : "success"
                  );
                }}
                className={`p-2.5 rounded-full border transition-all ${
                  inWishlist
                    ? "bg-rose-50 text-[#E05A47] border-[#E05A47]/40"
                    : "bg-white text-slate-600 border-slate-200 hover:text-[#E05A47]"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-800">
                {product.ratingAverage || 4.9}
              </span>
              <span className="text-xs text-slate-400">
                ({product.reviewCount || userReviews.length} verified reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900">
              {formatPrice(product.salePrice || product.basePrice)}
            </span>
            {product.salePrice && (
              <span className="text-sm font-semibold text-slate-400 line-through">
                {formatPrice(product.basePrice)}
              </span>
            )}
            <span className="ml-auto text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
              In Stock & Ready to Dispatch
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-900">Select Age / Size</label>
              <span className="text-[11px] text-slate-400 font-medium">Standard Pakistan Fit</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {availableSizes.map((size) => {
                const isSelected = selectedSizeId === size.id;
                return (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSizeId(size.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {size.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-900">Select Color</label>
            <div className="flex items-center gap-3">
              {availableColors.map((color) => {
                const isSelected = selectedColorId === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColorId(color.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? "border-[#E05A47] bg-rose-50/50 text-slate-900 ring-2 ring-[#E05A47]/20"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-300"
                      style={{ backgroundColor: color.hexCode }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock Indicator */}
          <div className="text-xs">
            {isOutOfStock ? (
              <span className="font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-lg">
                ⚠️ Out of stock in this size/color combination
              </span>
            ) : matchedVariant.stockQuantity < 5 ? (
              <span className="font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-lg">
                ⚡ Only {matchedVariant.stockQuantity} items left in stock — order soon!
              </span>
            ) : (
              <span className="font-bold text-emerald-700">
                ✓ Available in Stock ({matchedVariant.stockQuantity} units)
              </span>
            )}
          </div>

          {/* Quantity & CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-200 rounded-2xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-xl font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(matchedVariant?.stockQuantity || 1, quantity + 1))
                  }
                  disabled={quantity >= (matchedVariant?.stockQuantity || 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-xl font-bold disabled:opacity-30"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdding}
                className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isOutOfStock
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : isAdding
                    ? "bg-emerald-600 text-white"
                    : "bg-[#E05A47] hover:bg-[#C74433] text-white hover:scale-101 active:scale-99 shadow-[#E05A47]/20"
                }`}
              >
                {isAdding ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                <span>{isAdding ? "Added!" : "Add to Cart"}</span>
              </button>
            </div>

            {/* Buy Now (Quick Checkout) */}
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            >
              <Zap className="w-4 h-4 text-[#F59E0B]" />
              <span>Buy Now with Cash on Delivery</span>
            </button>
          </div>

          {/* Fabric & Care Specs */}
          <div className="border-t border-slate-200/80 pt-6 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">Garment Details</h4>
            <div className="grid grid-cols-2 gap-3 text-slate-600">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="block text-slate-400 font-semibold mb-0.5">Fabric & Weave</span>
                <span className="font-bold text-slate-800">{product.fabricMaterial || "100% Organic Combed Cotton"}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="block text-slate-400 font-semibold mb-0.5">Washing Advice</span>
                <span className="font-bold text-slate-800">{product.careInstructions || "Machine Wash Cold"}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Assurance */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#E05A47]" />
              <span><strong>Free Delivery</strong> on orders over Rs. 3,000 (Nationwide COD)</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#F59E0B]" />
              <span><strong>7-Day Size Exchange:</strong> Wrong fit? We replace it swiftly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 gap-4">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Parents&apos; Reviews & Feedback</h3>
            <p className="text-xs text-slate-500 mt-1">Real feedback from verified purchasers</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-black text-slate-900">4.9</div>
            <div>
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[11px] text-slate-400">Based on {userReviews.length} reviews</span>
            </div>
          </div>
        </div>

        {/* Existing reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userReviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{rev.userName}</span>
                <span className="text-[11px] text-slate-400">{rev.date}</span>
              </div>
              <div className="flex items-center text-amber-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>

        {/* Review submission form */}
        <form onSubmit={handleReviewSubmit} className="pt-6 border-t space-y-4 max-w-xl">
          <h4 className="font-bold text-sm text-slate-900">Write a Review for GS Collection</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-semibold">Your Rating:</span>
            <div className="flex items-center gap-1 text-amber-400 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setReviewRating(star)}
                  className="hover:scale-120 transition-transform"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= reviewRating ? "fill-current" : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <textarea
            required
            rows={3}
            placeholder="Share your thoughts about the fabric, fit, and softness..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#E05A47]/20"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-[#E05A47] transition-colors"
          >
            Submit Review
          </button>
        </form>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900">You May Also Adore</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
