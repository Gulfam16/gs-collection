export const metadata = {
  title: "Privacy Policy | GS Collection",
  description: "Privacy policy and personal data protection principles for GS Collection (Gullu Shani Clothing).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 text-sm text-slate-600 leading-relaxed">
      <div className="border-b pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-slate-900">1. Information We Collect</h3>
          <p>
            When you purchase children&apos;s clothing from <strong>GS Collection (Gullu Shani Clothing)</strong>, we collect personal information you provide such as your recipient name, phone number, shipping street address, and email for dispatching your courier parcels.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-slate-900">2. How We Use Your Data</h3>
          <p>
            Your information is used strictly to fulfill orders, verify delivery addresses for Cash on Delivery, send courier tracking notifications, and respond to your sizing and exchange requests.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-extrabold text-base text-slate-900">3. Data Security</h3>
          <p>
            We implement industry-standard encryption and security protocols. We never sell, rent, or trade your contact information to external third parties or advertisers.
          </p>
        </section>
      </div>
    </div>
  );
}
