import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | GS Collection",
    };
  }

  return {
    title: `${product.name} — Kids Clothing`,
    description: product.description,
    openGraph: {
      title: `${product.name} | GS Collection`,
      description: product.description,
      images: [
        {
          url: product.images[0]?.imageUrl || "",
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or gender
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.categoryId === product.categoryId || p.gender === product.gender)
  ).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
