export const metadata = {
  title: "Terms and Conditions | GS Collection",
  description: "Terms and conditions for browsing and purchasing from GS Collection.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-sm text-slate-600 leading-relaxed">
      <div className="border-b pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Terms and Conditions</h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-slate-900">1. Acceptance of Terms</h3>
          <p>
            By accessing or purchasing from <strong>GS Collection (Gullu Shani Clothing)</strong>, you agree to these Terms and Conditions and our standard shopping and return guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-slate-900">2. Pricing & Currency</h3>
          <p>
            All prices listed on the store are in <strong>Pakistani Rupee (PKR / Rs.)</strong>. We reserve the right to correct any typographical pricing errors prior to order dispatch.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-slate-900">3. Cash on Delivery (COD) Obligations</h3>
          <p>
            When choosing Cash on Delivery, customers agree to accept the parcel and pay the courier rider upon delivery at the registered shipping address.
          </p>
        </section>
      </div>
    </div>
  );
}
