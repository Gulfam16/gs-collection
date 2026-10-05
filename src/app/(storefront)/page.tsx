import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Heart, Truck, Star } from "lucide-react";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isFeatured);
  const newArrivals = MOCK_PRODUCTS.filter((p) => p.isNewArrival);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF2F0]/80 via-[#FDFBF7] to-white pt-8 pb-16 sm:pt-12 sm:pb-24">
        {/* Soft background decor blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-rose-100/40 via-amber-100/40 to-sky-100/40 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-[#E05A47] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The New Summer Carnival Collection is Here!</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Little Styles. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E05A47] via-[#F59E0B] to-[#E05A47]">
                  Big Smiles.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Premium, joyful, and playground-proof children&apos;s fashion. Made from 100% breathable organic cotton, gentle on delicate skin and built for endless playtime adventures.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-sm shadow-lg shadow-[#E05A47]/25 flex items-center justify-center gap-2 hover:scale-102 active:scale-98 transition-all group"
                >
                  <span>Shop Children&apos;s Clothes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/shop?onSale=true"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center justify-center"
                >
                  Explore Sale %
                </Link>
              </div>

              {/* Trust Metric Counters */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="font-extrabold text-slate-900 text-xl">100%</div>
                  <div className="text-xs text-slate-500">Pure Organic Cotton</div>
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xl">0–13Y</div>
                  <div className="text-xs text-slate-500">Tailored Age Fits</div>
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xl">COD</div>
                  <div className="text-xs text-slate-500">Cash on Delivery</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop"
                  alt="GS Collection Happy Kids Fashion"
                  fill
                  priority
                  className="object-cover"
                />
                {/* Floating pill badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-white/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">Loved by 5,000+ Parents</h5>
                    <p className="text-[11px] text-slate-500">Rated 4.9/5 for comfort & durability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#E05A47] tracking-wider">
              Browse by Department
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Shop for Every Little One
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-bold text-slate-700 hover:text-[#E05A47] flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-xs hover:shadow-xl hover:border-slate-200 transition-all flex flex-col"
            >
              <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                <Image
                  src={category.imageUrl || "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop"}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#E05A47] transition-colors">
                  {category.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-medium">
                  {category.productCount} Items
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#E05A47] tracking-wider">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Children&apos;s Styles
            </h2>
          </div>
          <Link
            href="/shop?featured=true"
            className="text-sm font-bold text-slate-700 hover:text-[#E05A47] flex items-center gap-1 group"
          >
            <span>See All Featured</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. PROMOTIONAL PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E293B] text-white p-8 sm:p-14 shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1543854589-cb4898125866?q=80&w=800&auto=format&fit=crop"
              alt="Kids fashion banner background"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-block px-3 py-1 bg-[#E05A47] text-white text-xs font-black uppercase tracking-wider rounded-lg">
              Limited-Time Offer
            </span>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Get 10% OFF Your First Kids Order
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Use code <strong className="text-[#F59E0B] font-bold">WELCOME10</strong> at checkout. Plus, enjoy <strong>FREE Cash on Delivery</strong> for all orders over Rs. 3,000.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-sm hover:bg-slate-100 hover:scale-102 transition-all shadow-md"
              >
                <span>Shop the Collection Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-[#E05A47] tracking-wider">
              Fresh Out of the Workshop
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              New Arrivals For This Season
            </h2>
          </div>
          <Link
            href="/shop?newArrival=true"
            className="text-sm font-bold text-slate-700 hover:text-[#E05A47] flex items-center gap-1 group"
          >
            <span>Explore All New</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. WHY PARENTS TRUST GS COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm text-center">
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold text-[#E05A47] tracking-wider">
              The GS Promise
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Why Parents Choose GS Collection
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Every seam, button, and fabric swatch is rigorously inspected to keep your children comfortable and smiling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-100/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#E05A47] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Gentle on Sensitive Skin</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hypoallergenic, breathable organic cotton and non-irritating flatlock tags ensure zero scratching or rashes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#F59E0B] flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Playground-Proof Durability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Double-stitched seams and resilient stretch weaves withstand frequent tumble washes, running, and climbing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-100/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Nationwide Fast Dispatch</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Orders dispatched within 24 hours. Convenient Cash on Delivery across Karachi, Lahore, Islamabad, and nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
