import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy | GS Collection",
  description: "Nationwide shipping information, delivery timelines, and Cash on Delivery guidelines for GS Collection across Pakistan.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="border-b pb-6">
        <span className="text-xs font-black uppercase tracking-wider text-[#E05A47]">
          Customer Assurance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Fast, secure, and reliable nationwide delivery directly to your doorstep.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 text-[#E05A47] rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Free Delivery Threshold</h3>
          </div>
          <p>
            We offer <strong>Free Shipping</strong> across Pakistan on all orders having a subtotal of <strong>Rs. 3,000 or above</strong>. For orders below Rs. 3,000, a nominal flat shipping fee of <strong>Rs. 250</strong> applies regardless of your city.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-[#F59E0B] rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Delivery Timelines</h3>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li><strong>Major Cities (Karachi, Lahore, Islamabad, Rawalpindi):</strong> 2 to 3 business days.</li>
            <li><strong>Other Cities & Nationwide Towns:</strong> 3 to 5 business days.</li>
            <li>All orders placed before 3:00 PM are processed and packed on the same business day.</li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Cash on Delivery (COD) Rules</h3>
          </div>
          <p>
            Please have the exact cash amount ready for the courier agent upon parcel delivery. You will receive an SMS/WhatsApp tracking update once your parcel is out for delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
