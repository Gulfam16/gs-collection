"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { MOCK_COUPONS } from "@/lib/mockData";
import { showToast } from "@/store/useToastStore";
import { useState } from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Tag,
  X,
  Truck,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotalAmount,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getTotalAmount();
  const freeShippingThreshold = 3000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const found = MOCK_COUPONS.find(
      (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase() && c.isActive
    );

    if (!found) {
      showToast("Invalid or expired coupon code", "error");
      return;
    }

    if (subtotal < found.minOrderAmount) {
      showToast(`Coupon requires minimum order of ${formatPrice(found.minOrderAmount)}`, "error");
      return;
    }

    applyCoupon(found);
    showToast(`Coupon "${found.code}" applied!`, "success");
    setCouponInput("");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="bg-white rounded-3xl p-12 max-w-lg mx-auto border border-slate-100 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-[#E05A47] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Your Shopping Bag is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Looks like you haven&apos;t added any lovely outfits to your bag yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-sm rounded-xl shadow-md transition-all"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b pb-6 gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#E05A47]">
            Review & Checkout
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Shopping Bag</h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:underline"
        >
          Clear entire bag
        </button>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
        <div className="flex justify-between text-xs font-bold text-amber-900 mb-2">
          {subtotal >= freeShippingThreshold ? (
            <span className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              You qualify for FREE Cash on Delivery nationwide!
            </span>
          ) : (
            <span>
              Add <strong className="text-amber-950">{formatPrice(freeShippingThreshold - subtotal)}</strong> more for FREE Shipping!
            </span>
          )}
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-amber-200 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              subtotal >= freeShippingThreshold ? "bg-emerald-500" : "bg-[#E05A47]"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Items Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100 gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <Link
                    href={`/shop/${item.slug}`}
                    className="font-bold text-sm text-slate-900 hover:text-[#E05A47] transition-colors"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">
                      Size: {item.sizeName}
                    </span>
                    <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">
                      <span
                        className="w-2.5 h-2.5 rounded-full border"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      {item.colorName}
                    </span>
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm mt-2">
                    {formatPrice(item.price)}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Line Total */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                <div className="flex items-center border border-slate-200 bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    className="p-2 hover:bg-slate-100 text-slate-600"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    disabled={item.quantity >= item.maxStock}
                    className="p-2 hover:bg-slate-100 text-slate-600 disabled:opacity-30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="block font-black text-slate-900 text-base">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeItem(item.variantId)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-6 sticky top-28">
          <h3 className="font-bold text-lg text-slate-900 border-b pb-4">Order Summary</h3>

          {/* Coupon */}
          {coupon ? (
            <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>Coupon: {coupon.code}</span>
              </div>
              <button onClick={removeCoupon} className="text-slate-400 hover:text-rose-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code (e.g. WELCOME10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase focus:ring-2 focus:ring-[#E05A47]/20"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Apply
              </button>
            </form>
          )}

          {/* Breakdown */}
          <div className="space-y-3 text-xs text-slate-600 pt-2 border-t">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-bold text-slate-900">
                {shipping === 0 ? <span className="text-emerald-700">FREE</span> : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t">
              <span>Estimated Total</span>
              <span className="text-[#E05A47] text-xl">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <Link
            href="/checkout"
            className="w-full py-4 bg-[#E05A47] hover:bg-[#C74433] text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#E05A47]/25 transition-all group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
