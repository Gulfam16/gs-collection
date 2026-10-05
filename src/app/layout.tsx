import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "GS Collection — Gullu Shani Clothing | Premium Kids Fashion",
    template: "%s | GS Collection (Gullu Shani Clothing)",
  },
  description:
    "Discover adorable, durable, and 100% organic cotton children's clothing for ages 0–13. Shop trendy boys wear, girls frocks, and baby rompers with Cash on Delivery across Pakistan.",
  keywords: [
    "children clothing",
    "kids fashion pakistan",
    "baby clothes",
    "boys t-shirts",
    "girls frocks",
    "GS collection",
    "gullu shani clothing",
    "cash on delivery kids clothing",
  ],
  authors: [{ name: "GS Collection" }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://gscollection.pk",
    siteName: "GS Collection — Gullu Shani Clothing",
    title: "GS Collection — Gullu Shani Clothing | Premium Kids Fashion",
    description: "Timeless Elegance. Handcrafted for Little Wonders. Pakistan's premier childrenswear atelier for ages 0 to 13.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "GS Collection Children's Luxury Clothing",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F5] text-[#0B132A] selection:bg-[#C05646]/20 selection:text-[#C05646]">
        {children}
        <CartDrawer />
        <ToastContainer />
      </body>
    </html>
  );
}
