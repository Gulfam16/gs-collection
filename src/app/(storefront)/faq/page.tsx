"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What fabric do you use for your children's clothing?",
      a: "The vast majority of our garments (including our t-shirts, summer dresses, and baby rompers) are made from 100% combed organic cotton. We use breathable, hypoallergenic fabrics that are gentle on sensitive baby and toddler skin.",
    },
    {
      q: "How do I choose the right size for my child?",
      a: "Our sizes correspond to typical age groups (e.g. 2-3 Years, 4-5 Years, etc.). If your child is taller or between two age brackets, we generally recommend ordering one size up to give them room to grow comfortably.",
    },
    {
      q: "Do you offer Cash on Delivery (COD)?",
      a: "Yes! Cash on Delivery is available across all cities and towns in Pakistan. You pay in cash to the delivery rider only when your parcel arrives safely at your doorstep.",
    },
    {
      q: "How much is the delivery charge?",
      a: "Delivery is completely FREE on all orders of Rs. 3,000 or above! For orders below Rs. 3,000, we charge a flat shipping rate of Rs. 250 anywhere in Pakistan.",
    },
    {
      q: "How can I track my order status?",
      a: "Once you place an order, you can visit the 'Track Your Order' section in your account dashboard. You will also receive WhatsApp and SMS updates as your package moves from fulfillment to courier dispatch.",
    },
    {
      q: "What if the clothes don't fit my child?",
      a: "No worries! We offer a smooth 7-Day Size Exchange policy. Simply message our WhatsApp support (+92 300 0000000) with your Order ID, and our team will arrange a quick exchange for the correct size.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="border-b pb-6">
        <span className="text-xs font-black uppercase tracking-wider text-[#E05A47]">
          Help & Answers
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Everything you need to know about shopping, fabrics, sizing, and deliveries at GS Collection.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:text-[#E05A47] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-[#E05A47]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
