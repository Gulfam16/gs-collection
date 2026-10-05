"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { MOCK_CATEGORIES } from "@/lib/mockData";

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { setIsOpen: setCartOpen, getTotalItems, getSubtotal } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();

  const cartItemCount = getTotalItems();
  const wishlistItemCount = wishlistItems.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E4DE] transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#0B132A] text-slate-200 text-[11px] font-medium py-2 px-4 text-center tracking-wider border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C05646]" />
          <span>
            <strong>Free Nationwide Delivery</strong> on orders over <strong>Rs. 3,000</strong> | Cash on Delivery Available
          </span>
          <span className="hidden md:inline-block text-slate-500">|</span>
          <span className="hidden md:inline-block text-[#C05646] font-semibold">
            Use Code: WELCOME10 for 10% OFF
          </span>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#C05646] hover:bg-[#EAE6DF]/60 rounded-xl transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* GS Collection Logo */}
          <div className="shrink-0 flex items-center">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 font-medium text-xs tracking-wider uppercase text-slate-800">
            <Link href="/" className="hover:text-[#C05646] transition-colors py-1">
              Home
            </Link>
            <Link href="/shop" className="hover:text-[#C05646] transition-colors py-1">
              Shop All
            </Link>
            {/* Category Dropdown */}
            <div className="relative group py-1">
              <button className="flex items-center gap-1 hover:text-[#C05646] transition-colors uppercase">
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-[#E7E4DE] p-2 space-y-1">
                  {MOCK_CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      href={`/shop?category=${category.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#FAF8F5] hover:text-[#C05646] transition-colors"
                    >
                      <span>{category.name}</span>
                      <span className="text-[10px] text-slate-400">{category.productCount} items</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/shop?gender=BOYS" className="hover:text-[#C05646] transition-colors py-1">
              Boys
            </Link>
            <Link href="/shop?gender=GIRLS" className="hover:text-[#C05646] transition-colors py-1">
              Girls
            </Link>
            <Link href="/shop?gender=BABY" className="hover:text-[#C05646] transition-colors py-1">
              Baby
            </Link>
            <Link
              href="/shop?onSale=true"
              className="text-[#C05646] font-bold hover:text-[#A84638] transition-colors py-1"
            >
              Sale %
            </Link>
            <Link href="/about" className="hover:text-[#C05646] transition-colors py-1">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#C05646] transition-colors py-1">
              Contact
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-slate-700 hover:text-[#C05646] hover:bg-[#EAE6DF]/60 rounded-full transition-colors"
              aria-label="Search clothing catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="relative p-2.5 text-slate-700 hover:text-[#C05646] hover:bg-slate-100 rounded-full transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#C05646] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 text-slate-700 hover:text-[#C05646] hover:bg-slate-100 rounded-full transition-colors flex items-center gap-2"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#C05646] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Account / Admin Menu */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-2.5 text-slate-700 hover:text-[#C05646] hover:bg-slate-100 rounded-full transition-colors flex items-center"
                aria-label="User account menu"
              >
                <UserIcon className="w-5 h-5" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {user?.fullName}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/account/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-[#C05646] rounded-xl"
                        >
                          My Orders & Tracking
                        </Link>
                        <Link
                          href="/account/addresses"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-[#C05646] rounded-xl"
                        >
                          Shipping Addresses
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl my-1"
                          >
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            Admin Dashboard
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1">
                      <Link
                        href="/login"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-3 py-2 text-xs font-bold text-slate-800 hover:bg-rose-50 hover:text-[#C05646] rounded-xl"
                      >
                        Sign In / Register
                      </Link>
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-xl"
                      >
                        Store Admin Portal
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {searchOpen && (
          <form
            onSubmit={handleSearchSubmit}
            className="pb-4 pt-1 animate-in slide-in-from-top-2 duration-200"
          >
            <div className="relative max-w-2xl mx-auto flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search children's clothing (e.g. Cotton T-Shirt, Floral Dress, Jeans)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C05646]/30 focus:border-[#C05646]"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-28 z-40 bg-white border-t border-slate-100 overflow-y-auto p-6 space-y-6">
          <nav className="space-y-4 font-semibold text-slate-800 text-base">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-slate-100 hover:text-[#C05646]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-slate-100 hover:text-[#C05646]"
            >
              Shop All
            </Link>
            <Link
              href="/shop?gender=BOYS"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-slate-100 hover:text-[#C05646]"
            >
              Boys Collection
            </Link>
            <Link
              href="/shop?gender=GIRLS"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-slate-100 hover:text-[#C05646]"
            >
              Girls Collection
            </Link>
            <Link
              href="/shop?gender=BABY"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-slate-100 hover:text-[#C05646]"
            >
              Baby & Toddler
            </Link>
            <Link
              href="/shop?onSale=true"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-slate-100 text-[#C05646] font-bold"
            >
              Special Sale %
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-slate-100 hover:text-[#C05646]"
            >
              About GS Collection
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 border-b border-slate-100 hover:text-[#C05646]"
            >
              Contact Us
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-emerald-700 font-bold"
            >
              Admin Dashboard Portal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
