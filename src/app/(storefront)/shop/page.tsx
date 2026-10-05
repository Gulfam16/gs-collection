import { Suspense } from "react";
import { ShopCatalogContent } from "./ShopCatalogContent";

export const metadata = {
  title: "Shop All Children's Clothes & Kids Fashion | GS Collection",
  description:
    "Explore our complete range of high-quality kids clothing: boys t-shirts, girls summer frocks, baby rompers, and cozy hoodies with Cash on Delivery in Pakistan.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-12 h-12 border-4 border-[#C05646] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium text-sm">Loading GS Collection catalog...</p>
        </div>
      }
    >
      <ShopCatalogContent />
    </Suspense>
  );
}
