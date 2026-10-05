import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Heart,
  Truck,
  Star,
  RotateCcw,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isFeatured);
  const newArrivals = MOCK_PRODUCTS.filter((p) => p.isNewArrival);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION WITH ENTRANCE ANIMATIONS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F6F3ED] via-[#FAF8F5] to-white pt-8 pb-16 sm:pt-14 sm:pb-28 border-b border-[#EAE6DF]/60">
        {/* Ambient Warm Glow Orbs in Background */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#C05646]/10 to-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10 animate-glow" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gradient-to-br from-[#0B132A]/5 to-[#C05646]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-float" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Headline & Editorial Callouts */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Boutique Welcome Badge (Entrance Slide Down) */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E7E4DE] text-[#0B132A] text-xs font-semibold tracking-wider shadow-xs animate-slide-down">
                <span className="w-2 h-2 rounded-full bg-[#C05646] animate-ping" />
                <span className="font-editorial italic text-xs text-[#C05646]">Gullu Shani Atelier</span>
                <span className="text-[#E7E4DE]">•</span>
                <span className="uppercase text-[11px] tracking-widest text-slate-700">Spring & Eid Edit 2026</span>
              </div>

              {/* Grand Editorial Headline (Entrance Slide Up Delay 1) */}
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-editorial font-bold text-[#0B132A] tracking-tight leading-[1.08] animate-slide-up-delay-1">
                Timeless Elegance. <br />
                <span className="italic font-normal text-[#C05646]">Handcrafted</span> for Little Wonders.
              </h1>

              {/* Brand Statement (Entrance Slide Up Delay 2) */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed animate-slide-up-delay-2">
                Pakistan&apos;s premier childrenswear atelier for ages <strong>0 to 13</strong>. Crafted from 100% GOTS-certified organic cotton — feather-soft on sensitive skin, impeccably tailored, and built to endure joyful adventures.
              </p>

              {/* CTAs (Entrance Slide Up Delay 3) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 animate-slide-up-delay-3">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0B132A] hover:bg-[#1E293B] text-white font-semibold text-xs tracking-widest uppercase shadow-xl shadow-[#0B132A]/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all group border border-[#0B132A]"
                >
                  <span>Explore The Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#C05646] group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <Link
                  href="/shop?onSale=true"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/90 hover:bg-[#FAF8F5] text-[#0B132A] font-semibold text-xs tracking-widest uppercase border border-[#E7E4DE] shadow-xs hover:border-slate-400 transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-[#C05646]">✦</span>
                  <span>View Special Offers %</span>
                </Link>
              </div>

              {/* Trust & Heritage Accolade Metrics */}
              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#E7E4DE] max-w-lg mx-auto lg:mx-0 text-left animate-fade-in">
                <div>
                  <div className="font-editorial font-bold text-[#0B132A] text-2xl sm:text-3xl">100%</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mt-0.5">Organic Pima Cotton</div>
                </div>
                <div>
                  <div className="font-editorial font-bold text-[#0B132A] text-2xl sm:text-3xl">0–13 Y</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mt-0.5">Tailored Age Fits</div>
                </div>
                <div>
                  <div className="font-editorial font-bold text-[#C05646] text-2xl sm:text-3xl">Free COD</div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mt-0.5">Orders Over Rs. 3,000</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Composition with Floating Animated Badges */}
            <div className="lg:col-span-5 relative animate-scale-in">
              {/* Outer Decorative Luxury Border */}
              <div className="relative mx-auto w-full max-w-md aspect-4/5 rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-slate-100 ring-1 ring-[#E7E4DE]">
                <Image
                  src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop"
                  alt="GS Collection Children's Luxury Boutique Clothing"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Subtle Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132A]/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge 1: Top Floating Quality Badge */}
                <div className="absolute top-6 left-6 animate-float z-20 pointer-events-none">
                  <div className="px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Fabric Standard</p>
                      <p className="text-xs font-bold text-[#0B132A]">100% GOTS Pure Cotton</p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Reviews Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 flex items-center gap-3.5 animate-float-reverse z-20">
                  <div className="w-11 h-11 rounded-xl bg-[#0B132A] text-[#C5A059] flex items-center justify-center font-bold shrink-0 shadow-sm">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#C5A059] fill-current" />
                      ))}
                      <span className="text-xs font-bold text-[#0B132A] ml-1">4.9 / 5.0</span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate">
                      Loved by 5,000+ discerning parents across Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE LUXURY RUNNING TICKER (CONSTANT MOTION) */}
      <section className="relative overflow-hidden bg-[#0B132A] text-white py-4 border-y border-slate-800">
        <div className="animate-marquee flex items-center whitespace-nowrap text-xs font-medium tracking-[0.28em] uppercase text-slate-300">
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> GULLU SHANI CLOTHING ATELIER
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> 100% GOTS CERTIFIED ORGANIC COTTON
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> NATIONWIDE CASH ON DELIVERY
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> 7-DAY EFFORTLESS SIZE EXCHANGE
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> ETHICALLY TAILORED FOR AGES 0 TO 13
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> ZERO-SCRATCH FLATLOCK SEAMS
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> GULLU SHANI CLOTHING ATELIER
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> 100% GOTS CERTIFIED ORGANIC COTTON
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> NATIONWIDE CASH ON DELIVERY
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> 7-DAY EFFORTLESS SIZE EXCHANGE
          </span>
          <span className="mx-6 flex items-center gap-3">
            <span className="text-[#C05646]">✦</span> ETHICALLY TAILORED FOR AGES 0 TO 13
          </span>
        </div>
      </section>

      {/* 3. CURATED BOUTIQUE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-[#C05646]" />
              <span className="text-[11px] uppercase font-bold text-[#C05646] tracking-[0.25em]">
                Curated Collections
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-editorial font-bold text-[#0B132A]">
              Explore by Wardrobe Department
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-slate-700 hover:text-[#C05646] uppercase tracking-wider flex items-center gap-1.5 group transition-colors"
          >
            <span>View Complete Atelier</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C05646] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {MOCK_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E7E4DE] shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-square w-full bg-[#FAF8F5] overflow-hidden">
                <Image
                  src={category.imageUrl || "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop"}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 text-center bg-white flex flex-col justify-between">
                <h3 className="font-editorial font-bold text-sm text-[#0B132A] group-hover:text-[#C05646] transition-colors">
                  {category.name}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mt-1">
                  {category.productCount} Garments
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED ATELIER PIECES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-[#C05646]" />
              <span className="text-[11px] uppercase font-bold text-[#C05646] tracking-[0.25em]">
                Handpicked Garments
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-editorial font-bold text-[#0B132A]">
              Featured Children&apos;s Styles
            </h2>
          </div>
          <Link
            href="/shop?featured=true"
            className="text-xs font-semibold text-slate-700 hover:text-[#C05646] uppercase tracking-wider flex items-center gap-1.5 group transition-colors"
          >
            <span>See All Featured</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C05646] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL PROMOTION BANNER (LUXURY ATELIER VOUCHER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#0B132A] via-[#111C3D] to-[#0B132A] text-white p-8 sm:p-14 shadow-2xl border border-slate-800">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C05646]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#C5A059] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Boutique Invitation Privilege</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-bold tracking-tight leading-tight">
              Enjoy 10% Off Your Child&apos;s Inaugural Order
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Experience the unmatched softness of GOTS-certified pima cotton. Apply voucher code{" "}
              <strong className="text-white font-mono bg-white/15 px-2 py-0.5 rounded-md border border-white/25">
                WELCOME10
              </strong>{" "}
              during checkout. Plus, enjoy <strong>Free Cash on Delivery</strong> for all nationwide orders over Rs. 3,000.
            </p>

            <div className="pt-3 flex flex-wrap gap-4 items-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#C05646] hover:bg-[#A84638] text-white font-semibold text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#C05646]/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant discount applied at checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FRESH SEASON ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-[#C05646]" />
              <span className="text-[11px] uppercase font-bold text-[#C05646] tracking-[0.25em]">
                Fresh From The Atelier
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-editorial font-bold text-[#0B132A]">
              New Season Arrivals
            </h2>
          </div>
          <Link
            href="/shop?newArrival=true"
            className="text-xs font-semibold text-slate-700 hover:text-[#C05646] uppercase tracking-wider flex items-center gap-1.5 group transition-colors"
          >
            <span>Explore All New</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C05646] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. WHY PARENTS TRUST GS COLLECTION (THE ATELIER STANDARD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-[32px] p-8 sm:p-14 border border-[#E7E4DE] shadow-xs text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#C05646]" />
              <span className="text-[11px] uppercase font-bold text-[#C05646] tracking-[0.25em]">
                The GS Collection Standard
              </span>
              <span className="w-6 h-[1px] bg-[#C05646]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-[#0B132A]">
              Tailored For Play. Crafted For Memories.
            </h2>
            <p className="text-sm text-slate-600 mt-3 font-normal leading-relaxed">
              Every seam, button, and organic swatch is rigorously tested to guarantee unmatched comfort, durability, and skin-friendly luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            <div className="p-7 rounded-2xl bg-white border border-[#E7E4DE] space-y-3.5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#C05646] border border-[#E7E4DE] flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-editorial font-bold text-[#0B132A] text-lg">Pure Organic Skin Care</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hypoallergenic, breathable 100% GOTS organic cotton with itch-free heat-sealed tags guarantees zero irritation on sensitive baby skin.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-[#E7E4DE] space-y-3.5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#C5A059] border border-[#E7E4DE] flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-editorial font-bold text-[#0B132A] text-lg">Playground-Proof Durability</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reinforced double-stitched French seams and resilient colorfast dyes withstand 50+ tumble wash cycles without fading or shrinking.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-white border border-[#E7E4DE] space-y-3.5 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] text-[#0B132A] border border-[#E7E4DE] flex items-center justify-center font-bold">
                <Truck className="w-6 h-6" />
              </div>
              <h4 className="font-editorial font-bold text-[#0B132A] text-lg">Nationwide COD & 7-Day Swap</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prompt 24-hour dispatch across Karachi, Lahore, Islamabad, and all cities. Pay cash at your doorstep with an effortless 7-day size exchange.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
