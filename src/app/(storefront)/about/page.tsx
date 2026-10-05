import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart, Shield, Award, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | GS Collection — Gullu Shani Clothing",
  description:
    "Learn about GS Collection (Gullu Shani Clothing), our philosophy, dedication to children's skin-safe fabrics, and passion for cheerful kids fashion.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero Intro */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-[#E05A47] text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Philosophy</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Crafting Smiles and Comfort for Little Ones
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Welcome to <strong>GS Collection (Gullu Shani Clothing)</strong>. We believe childhood is meant to be full of laughter, discovery, and joyful play — and children&apos;s clothing should be comfortable, safe, and built to keep up with every adventure.
        </p>
      </div>

      {/* Brand Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E05A47] flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Gentle on Delicate Skin</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We prioritize breathable natural cotton, tagless neck labels, and non-toxic dyes to ensure our garments cause zero irritation for active children and infants.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F59E0B] flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Playground-Proof Craft</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Children climb, tumble, and run. Our stitching, seams, and elastic waistbands are reinforced to withstand daily rough-and-tumble wear and frequent machine washing.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900">Vibrant, Age-Appropriate Style</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Fashion that celebrates childhood innocence. Modern, tasteful color palettes and charming cuts that both children and parents genuinely adore.
          </p>
        </div>
      </div>

      {/* Brand Message Banner */}
      <div className="bg-slate-900 text-white p-10 sm:p-14 rounded-3xl text-center space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-black">Ready to Explore Our Children&apos;s Wardrobe?</h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          From everyday cotton play-tees and summer dresses to cozy winter hoodies, discover outfits tailored for children aged 0 to 13.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-sm rounded-xl transition-all shadow-md"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
