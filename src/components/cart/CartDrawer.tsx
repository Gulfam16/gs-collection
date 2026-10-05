"use client";

import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MOCK_COUPONS } from "@/lib/mockData";
import { showToast } from "@/store/useToastStore";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
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
    showToast(`Coupon "${found.code}" applied successfully!`, "success");
    setCouponInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E05A47]" />
            <h2 className="font-bold text-lg text-slate-900">Your Shopping Cart</h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-amber-50/70 p-3 border-b border-amber-100">
          <div className="flex justify-between text-xs font-medium text-amber-900 mb-1.5">
            {subtotal >= freeShippingThreshold ? (
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" /> Congratulations! You got FREE Shipping
              </span>
            ) : (
              <span>
                Add <strong className="text-amber-800">{formatPrice(freeShippingThreshold - subtotal)}</strong> more for <strong>FREE Shipping</strong>!
              </span>
            )}
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                subtotal >= freeShippingThreshold ? "bg-emerald-500" : "bg-[#E05A47]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-[#E05A47]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-lg">Your cart is empty</p>
                <p className="text-sm text-slate-500 mt-1">
                  Looks like you haven&apos;t added any cute outfits yet.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-[#E05A47] text-white font-semibold rounded-xl hover:bg-[#C74433] transition-colors shadow-sm"
              >
                Shop Kids Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 relative group"
              >
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-sm text-slate-900 truncate pr-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
                        {item.sizeName}
                      </span>
                      <span className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        {item.colorName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="font-bold text-slate-900 text-sm">
                      {formatPrice(item.price)}
                    </div>
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="p-1 hover:bg-slate-100 text-slate-600 disabled:opacity-30 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals and checkout button */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 p-4 bg-slate-50/50 space-y-3">
            {/* Coupon field */}
            {coupon ? (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>
                    Code <strong>{coupon.code}</strong> applied (-{formatPrice(discount)})
                  </span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-slate-400 hover:text-rose-600 font-bold"
                >
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
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#E05A47]/20 uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-900">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-[#E05A47] text-base">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold rounded-xl shadow-md transition-all group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
