"use client";

import { useState } from "react";
import Image from "next/image";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_SIZES, MOCK_COLORS } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { showToast } from "@/store/useToastStore";
import { Product } from "@/types";
import {
  Plus,
  Search,
  Filter,
  Package,
  Trash2,
  Edit2,
  Check,
  AlertTriangle,
  ChevronDown,
  X,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [stockInputVal, setStockInputVal] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);

  // New product state
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState(MOCK_CATEGORIES[0].id);
  const [newGender, setNewGender] = useState<"BOYS" | "GIRLS" | "BABY" | "UNISEX">("BOYS");
  const [newBasePrice, setNewBasePrice] = useState(2000);
  const [newSalePrice, setNewSalePrice] = useState<number | undefined>(1650);
  const [newDescription, setNewDescription] = useState("");
  const [newFabric, setNewFabric] = useState("100% Breathable Cotton");

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.categoryId === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleUpdateStock = (productId: string, variantId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        return {
          ...p,
          variants: p.variants.map((v) =>
            v.id === variantId ? { ...v, stockQuantity: Math.max(0, newStock) } : v
          ),
        };
      })
    );
    setEditingStockId(null);
    showToast("Variant stock quantity updated successfully!", "success");
  };

  const handleDeleteProduct = (productId: string) => {
    if (!confirm("Are you sure you want to remove this garment from the store catalog?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast("Product deleted from catalog", "info");
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDescription.trim()) {
      showToast("Please provide product name and description", "error");
      return;
    }

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: newName.trim(),
      slug: newName.toLowerCase().trim().replace(/\s+/g, "-"),
      description: newDescription.trim(),
      fabricMaterial: newFabric,
      gender: newGender,
      basePrice: newBasePrice,
      salePrice: newSalePrice || null,
      isFeatured: true,
      isNewArrival: true,
      isActive: true,
      categoryId: newCategory,
      ratingAverage: 5.0,
      reviewCount: 1,
      images: [
        {
          id: `img-${Date.now()}`,
          productId: `prod-${Date.now()}`,
          imageUrl:
            "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop",
          isPrimary: true,
          displayOrder: 1,
        },
      ],
      variants: [
        {
          id: `var-${Date.now()}-1`,
          productId: `prod-${Date.now()}`,
          sizeId: MOCK_SIZES[3].id,
          colorId: MOCK_COLORS[0].id,
          sku: `GS-${Math.floor(100 + Math.random() * 900)}`,
          stockQuantity: 10,
          size: MOCK_SIZES[3],
          color: MOCK_COLORS[0],
        },
      ],
    };

    setProducts([newProd, ...products]);
    setShowAddModal(false);
    showToast(`Created new product "${newProd.name}"!`, "success");
    setNewName("");
    setNewDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Product Catalog & Variant Stock</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage children&apos;s garments, sizes, colors, pricing, and live inventory.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search products by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#E05A47]/40"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-300 focus:ring-2 focus:ring-[#E05A47]/40"
        >
          <option value="all">All Categories</option>
          {MOCK_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table with Variant Accordions */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-800">
              <tr>
                <th className="p-4">Garment</th>
                <th className="p-4">Category</th>
                <th className="p-4">Base / Sale Price</th>
                <th className="p-4">Variant Stock Breakdown</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {filteredProducts.map((product) => {
                const totalStock = product.variants.reduce(
                  (sum, v) => sum + v.stockQuantity,
                  0
                );
                return (
                  <tr key={product.id} className="hover:bg-slate-800/40">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                          {product.images[0] && (
                            <Image
                              src={product.images[0].imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-white block truncate max-w-56">
                            {product.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {product.gender} • {product.variants.length} variants
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-[11px] font-semibold">
                        {MOCK_CATEGORIES.find((c) => c.id === product.categoryId)?.name ||
                          "Kids Wear"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-white">
                        {formatPrice(product.salePrice || product.basePrice)}
                      </div>
                      {product.salePrice && (
                        <span className="text-[10px] text-slate-500 line-through">
                          {formatPrice(product.basePrice)}
                        </span>
                      )}
                    </td>

                    {/* Variant Stock Inline Editor */}
                    <td className="p-4">
                      <div className="space-y-1.5 max-w-sm">
                        {product.variants.map((v) => (
                          <div
                            key={v.id}
                            className="flex items-center justify-between p-1.5 bg-slate-950/60 rounded-lg border border-slate-800 text-[11px]"
                          >
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-slate-700"
                                style={{ backgroundColor: v.color.hexCode }}
                              />
                              <span className="text-slate-300 font-semibold">{v.size.name}</span>
                              <span className="text-slate-500">({v.color.name})</span>
                            </div>

                            {editingStockId === v.id ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  min="0"
                                  defaultValue={v.stockQuantity}
                                  onChange={(e) => setStockInputVal(Number(e.target.value))}
                                  className="w-14 px-1.5 py-0.5 bg-slate-800 text-white rounded border border-slate-700 text-center font-bold"
                                />
                                <button
                                  onClick={() =>
                                    handleUpdateStock(product.id, v.id, stockInputVal)
                                  }
                                  className="p-1 text-emerald-400 hover:bg-slate-800 rounded"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingStockId(null)}
                                  className="p-1 text-slate-400 hover:bg-slate-800 rounded"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                                    v.stockQuantity === 0
                                      ? "bg-rose-950 text-rose-400"
                                      : v.stockQuantity < 5
                                      ? "bg-amber-950 text-amber-400"
                                      : "bg-emerald-950 text-emerald-400"
                                  }`}
                                >
                                  {v.stockQuantity} in stock
                                </span>
                                <button
                                  onClick={() => {
                                    setEditingStockId(v.id);
                                    setStockInputVal(v.stockQuantity);
                                  }}
                                  className="text-slate-500 hover:text-white"
                                  title="Edit stock"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-xl p-6 sm:p-8 rounded-3xl shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-black text-lg text-white border-b border-slate-800 pb-3">
              Add New Children&apos;s Garment
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Garment Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Classic Embroidered Kids Kurta"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    {MOCK_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Gender / Department *</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="BOYS">Boys</option>
                    <option value="GIRLS">Girls</option>
                    <option value="BABY">Baby & Toddler</option>
                    <option value="UNISEX">Unisex</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Base Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={newBasePrice}
                    onChange={(e) => setNewBasePrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Sale Price (Optional)</label>
                  <input
                    type="number"
                    min="0"
                    value={newSalePrice || ""}
                    onChange={(e) =>
                      setNewSalePrice(e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Fabric & Material Spec</label>
                <input
                  type="text"
                  value={newFabric}
                  onChange={(e) => setNewFabric(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Comfortable, soft everyday outfit..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#E05A47] text-white font-bold rounded-xl hover:bg-[#C74433]"
                >
                  Add Product to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
