"use client";

import { useState } from "react";
import Image from "next/image";
import { MOCK_CATEGORIES } from "@/lib/mockData";
import { showToast } from "@/store/useToastStore";
import { Category } from "@/types";
import { Plus, Trash2, Edit2, FolderTree, X } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: name.trim(),
      slug: name.toLowerCase().trim().replace(/\s+/g, "-"),
      description: description.trim() || undefined,
      imageUrl: imageUrl.trim() || "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop",
      displayOrder: categories.length + 1,
      isActive: true,
      productCount: 0,
    };

    setCategories([...categories, newCat]);
    setShowAddModal(false);
    showToast(`Category "${newCat.name}" added successfully!`, "success");
    setName("");
    setDescription("");
    setImageUrl("");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setCategories(categories.filter((c) => c.id !== id));
    showToast("Category removed", "info");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Store Categories</h1>
          <p className="text-xs text-slate-400 mt-1">
            Organize kids clothing into intuitive departments and collections.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-800">
                {cat.imageUrl && (
                  <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover" />
                )}
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">{cat.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {cat.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">{cat.productCount || 0} Products</span>
              <button
                onClick={() => handleDelete(cat.id)}
                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Delete category"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-slate-900 border border-slate-800 w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl z-10 space-y-4">
            <h3 className="font-black text-lg text-white border-b border-slate-800 pb-3">
              Add New Category
            </h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Knitwear"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Cozy sweaters and knit sets..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
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
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
