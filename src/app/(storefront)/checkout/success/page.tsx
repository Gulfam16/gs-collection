import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Home, Sparkles } from "lucide-react";

function SuccessContent({ orderNumber }: { orderNumber?: string }) {
  const displayOrderNum = orderNumber || "GS-2026-9182";

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-100 shadow-xl space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Order Confirmed</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">Thank You for Your Order!</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Your children&apos;s clothing parcel is now being packed with love and will be dispatched promptly.
          </p>
        </div>

        {/* Order Card Detail */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3 text-left">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Order Number:</span>
            <span className="font-extrabold text-slate-900 text-sm">{displayOrderNum}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Payment Mode:</span>
            <span className="font-bold text-slate-800">Cash on Delivery (COD)</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Status:</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
              Processing / Preparing for Courier
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderNumber?: string }>;
}) {
  const { orderNumber } = await searchParams;

  return (
    <Suspense fallback={<div className="p-20 text-center">Loading confirmation...</div>}>
      <SuccessContent orderNumber={orderNumber} />
    </Suspense>
  );
}
