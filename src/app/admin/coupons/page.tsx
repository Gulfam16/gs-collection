"use client";

import { useState } from "react";
import { MOCK_COUPONS } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { showToast } from "@/store/useToastStore";
import { Coupon, DiscountType } from "@/types";
import { Tag, Plus, Trash2, CheckCircle2, XCircle, X } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState(10);
  const [minOrder, setMinOrder] = useState(2000);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCoupon: Coupon = {
      id: `coup-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discountType,
      discountValue,
      minOrderAmount: minOrder,
      usageLimit: 500,
      timesUsed: 0,
      startDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
    };

    setCoupons([...coupons, newCoupon]);
    setShowAddModal(false);
    showToast(`Created coupon "${newCoupon.code}"!`, "success");
    setCode("");
  };

  const handleToggle = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    showToast("Coupon status updated", "info");
  };

  const handleDelete = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast("Coupon deleted", "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Coupons & Promotional Discounts</h1>
          <p className="text-xs text-slate-400 mt-1">
            Create promotional codes, seasonal vouchers, and minimum order rules for store visitors.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-mono text-base font-black text-[#F59E0B] tracking-wider px-3 py-1 bg-amber-950/60 border border-amber-800 rounded-xl">
                  {coupon.code}
                </span>
                <button
                  onClick={() => handleToggle(coupon.id)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    coupon.isActive
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {coupon.isActive ? "Active" : "Disabled"}
                </button>
              </div>

              <div>
                <span className="text-2xl font-black text-white">
                  {coupon.discountType === "PERCENTAGE"
                    ? `${coupon.discountValue}% OFF`
                    : `${formatPrice(coupon.discountValue)} OFF`}
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Applies on orders over {formatPrice(coupon.minOrderAmount)}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Used {coupon.timesUsed} times</span>
              <button
                onClick={() => handleDelete(coupon.id)}
                className="text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl z-10 space-y-4">
            <h3 className="font-black text-lg text-white border-b border-slate-800 pb-3">
              Create Promotional Coupon
            </h3>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EIDMUBARAK15"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount (PKR)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Discount Value *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Minimum Order Amount (PKR)</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={minOrder}
                  onChange={(e) => setMinOrder(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#E05A47] text-white font-bold rounded-xl hover:bg-[#C74433]"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
