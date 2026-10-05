import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mockData";
import { Product, ProductFilterState } from "@/types";

export class ProductService {
  /**
   * Search and filter products with parameter sanitization
   */
  static async searchProducts(filters: ProductFilterState = {}): Promise<Product[]> {
    let result = [...MOCK_PRODUCTS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabricMaterial?.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "all") {
      const cat = MOCK_CATEGORIES.find((c) => c.slug === filters.category);
      if (cat) {
        result = result.filter((p) => p.categoryId === cat.id);
      }
    }

    if (filters.gender) {
      result = result.filter((p) => p.gender === filters.gender);
    }

    if (filters.maxPrice) {
      result = result.filter((p) => {
        const price = p.salePrice || p.basePrice;
        return price <= filters.maxPrice!;
      });
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.variants.some((v) => v.stockQuantity > 0));
    }

    return result;
  }

  /**
   * Get single product by slug or id
   */
  static async getProductBySlug(slug: string): Promise<Product | null> {
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return product || null;
  }

  /**
   * Check stock availability for a specific variant
   */
  static async checkVariantStock(productId: string, sizeName: string, colorName: string): Promise<{
    available: boolean;
    stock: number;
    sku?: string;
  }> {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!product) return { available: false, stock: 0 };

    const variant = product.variants.find(
      (v) =>
        v.size.name.toLowerCase() === sizeName.toLowerCase() &&
        v.color.name.toLowerCase() === colorName.toLowerCase()
    );

    if (!variant) return { available: false, stock: 0 };

    return {
      available: variant.stockQuantity > 0,
      stock: variant.stockQuantity,
      sku: variant.sku,
    };
  }
}
