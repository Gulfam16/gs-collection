"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/storefront/Navbar";
import { Footer } from "@/components/storefront/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import { Package, MapPin, User, Heart, LogOut } from "lucide-react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navLinks = [
    { href: "/account/orders", label: "My Orders & Tracking", icon: Package },
    { href: "/account/addresses", label: "Shipping Addresses", icon: MapPin },
    { href: "/account/profile", label: "Profile & Settings", icon: User },
    { href: "/wishlist", label: "Saved Wishlist", icon: Heart },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Account Sidebar */}
          <aside className="lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-6">
            <div className="border-b pb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Logged In Account
              </span>
              <h3 className="font-black text-slate-900 text-base truncate">
                {user?.fullName || "Guest Customer"}
              </h3>
              <p className="text-xs text-slate-500 truncate">{user?.email || "customer@example.com"}</p>
            </div>

            <nav className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#E05A47] text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </aside>

          {/* Account Page Content */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xs">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
