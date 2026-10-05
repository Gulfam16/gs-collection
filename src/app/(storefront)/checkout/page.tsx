"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/utils";
import { showToast } from "@/store/useToastStore";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotalAmount,
    coupon,
    clearCart,
  } = useCartStore();

  const { user } = useAuthStore();

  // Form state
  const [recipientName, setRecipientName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("Lahore");
  const [province, setProvince] = useState("Punjab");
  const [postalCode, setPostalCode] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getTotalAmount();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-[#E05A47] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your bag is empty</h2>
        <p className="text-sm text-slate-500">
          Please add some children&apos;s clothes before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex px-6 py-3 bg-[#E05A47] text-white font-bold rounded-xl text-sm"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim() || !phone.trim() || !streetAddress.trim() || !city.trim()) {
      showToast("Please complete all required shipping fields", "error");
      return;
    }

    setIsSubmitting(true);

    // Generate unique order number (e.g., GS-2026-8942)
    const orderNumber = `GS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      clearCart();
      showToast("Order placed successfully with Cash on Delivery!", "success");
      router.push(`/checkout/success?orderNumber=${orderNumber}`);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="border-b pb-6 mb-8">
        <span className="text-xs font-black uppercase tracking-wider text-[#E05A47]">
          Secure Step 2 of 2
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-1 flex items-center gap-3">
          <Lock className="w-6 h-6 text-emerald-600" />
          Checkout & Dispatch
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Customer & Shipping Address */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Customer Information */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-black text-base text-slate-900 border-b pb-3">
              1. Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Malik"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-slate-700">Email Address (for order tracking receipt)</label>
                <input
                  type="email"
                  placeholder="e.g. yourname@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-black text-base text-slate-900 border-b pb-3">
              2. Delivery Address in Pakistan
            </h3>
            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  House / Street Address / Apartment / Area *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. House # 14-B, Street 5, Phase 4, DHA"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lahore / Karachi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Province *</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Islamabad Capital Territory">Islamabad</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Postal Code (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 54000"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Delivery Notes for Courier (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Call before delivery, ring second bell"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
                />
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-black text-base text-slate-900 border-b pb-3">
              3. Payment Selection
            </h3>

            <div className="space-y-3">
              {/* Cash on Delivery (Active) */}
              <label
                className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === "COD"
                    ? "border-[#E05A47] bg-rose-50/40 ring-2 ring-[#E05A47]/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="mt-1 accent-[#E05A47]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Pay securely in cash directly to the courier when your children&apos;s clothing parcel arrives.
                  </p>
                </div>
              </label>

              {/* Online Payment (Architected for Future Expansion) */}
              <div className="p-4 rounded-2xl border border-slate-200/60 bg-slate-50/50 opacity-60">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-700">
                        Online Payment (Debit/Credit Card / JazzCash / Easypaisa)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Digital payment gateway integration coming soon for international cardholders.
                    </p>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Submit */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6 sticky top-28">
          <h3 className="font-black text-lg text-slate-900 border-b pb-4">
            Order Review ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
          </h3>

          {/* Item Thumbnails List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.variantId} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 truncate max-w-48">{item.name}</h5>
                    <span className="text-[11px] text-slate-400">
                      {item.sizeName} • {item.colorName} • Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2.5 text-xs text-slate-600 pt-4 border-t">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount ({coupon?.code})</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-slate-900">
                {shipping === 0 ? <span className="text-emerald-700">FREE</span> : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t">
              <span>Payable on Delivery</span>
              <span className="text-[#E05A47] text-2xl">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Place Order CTA Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#E05A47] hover:bg-[#C74433] text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-[#E05A47]/30 transition-all hover:scale-101 active:scale-99 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <span>Confirm Order via Cash on Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Trust Guarantees */}
          <div className="pt-2 border-t space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Safe & Confidential: We never share your phone number</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Dispatched via priority courier across Pakistan</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
