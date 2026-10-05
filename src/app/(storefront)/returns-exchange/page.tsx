import { RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Returns & Exchange Policy | GS Collection",
  description: "Learn about our hassle-free 7-day size and color exchange policy for children's clothing.",
};

export default function ReturnsExchangePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="border-b pb-6">
        <span className="text-xs font-black uppercase tracking-wider text-[#E05A47]">
          Hassle-Free Process
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
          7-Day Returns & Size Exchange Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          We want your children to be 100% comfortable in their GS Collection outfits.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 text-[#E05A47] rounded-xl">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Size Exchange Guarantee</h3>
          </div>
          <p>
            Children grow fast, and sometimes the fit isn&apos;t quite right. We offer an easy <strong>7-Day Size Exchange</strong> from the date your parcel was delivered.
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
            <span className="font-bold text-slate-800">Eligibility Conditions:</span>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Item must be unworn, unwashed, and in original brand condition.</li>
              <li>Original tags and packaging must remain intact.</li>
              <li>Contact our WhatsApp support team at +92 300 0000000 with your Order Number.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <h3 className="font-extrabold text-slate-900 text-base">Defective or Incorrect Items</h3>
          <p>
            In the rare event that an item arrives with a manufacturing defect or an incorrect size was packed, our courier will pick up the parcel from your doorstep and deliver the replacement at <strong>zero extra delivery cost</strong> to you.
          </p>
        </div>
      </div>
    </div>
  );
}
