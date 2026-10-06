"use client";

import { MOCK_ORDERS } from "@/lib/mockData";
import { formatPrice, formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Package, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { OrderStatus } from "@/types";

export default function CustomerOrdersPage() {
  const statusBadges: Record<OrderStatus, { label: string; color: string; icon: any }> = {
    PENDING: { label: "Pending Verification", color: "bg-slate-100 text-slate-700", icon: Clock },
    CONFIRMED: { label: "Order Confirmed", color: "bg-sky-100 text-sky-800", icon: CheckCircle2 },
    PROCESSING: { label: "Preparing Garments", color: "bg-amber-100 text-amber-800", icon: Package },
    SHIPPED: { label: "Out for Delivery", color: "bg-indigo-100 text-indigo-800", icon: Truck },
    DELIVERED: { label: "Delivered", color: "bg-emerald-100 text-emerald-800", icon: CheckCircle2 },
    CANCELLED: { label: "Cancelled", color: "bg-rose-100 text-rose-800", icon: AlertCircle },
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-black text-slate-900">Your Orders & Tracking</h2>
        <p className="text-xs text-slate-500 mt-1">
          Track packages, check past purchase details, and manage delivery addresses.
        </p>
      </div>

      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => {
          const badge = statusBadges[order.status] || statusBadges.PROCESSING;
          const StatusIcon = badge.icon;

          return (
            <div
              key={order.id}
              className="border border-slate-200/80 rounded-2xl p-5 sm:p-6 bg-slate-50/50 space-y-4"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Destination: {order.shippingAddress.city}, {order.shippingAddress.province}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${badge.color}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span>{badge.label}</span>
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                        {item.productImage && (
                          <Image
                            src={item.productImage}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/shop/${item.productSlug}`}
                          className="font-bold text-slate-900 hover:text-[#C05646] transition-colors"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          Size: {item.sizeName} • Color: {item.colorName} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 shrink-0">
                      {formatPrice(item.lineTotal)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals & Delivery snapshot */}
              <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
                <div>
                  Payment: <strong>Cash on Delivery (COD)</strong> • Status:{" "}
                  <strong className="text-emerald-700">{order.paymentStatus}</strong>
                </div>
                <div className="font-black text-slate-900 text-sm">
                  Total Paid: <span className="text-[#E05A47] text-base">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
