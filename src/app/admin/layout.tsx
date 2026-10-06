"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Users,
  Tag,
  FolderTree,
  ArrowLeft,
  LogOut,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, login, logout } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(true);

  // If we are on the login page itself, do not wrap in admin sidebar
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsVerifying(false);
      return;
    }

    let isMounted = true;

    async function verifyAdminAuth() {
      try {
        // Strictly verify with the server-side HTTP-only session cookie
        const res = await fetch("/api/admin/auth/session");
        if (!res.ok) throw new Error("No valid session");

        const data = await res.json();
        if (data.authenticated && data.user) {
          login(data.user.email, "ADMIN");
          if (isMounted) setIsVerifying(false);
          return;
        }
      } catch {
        // Session invalid or absent
      }

      // Unauthorized: clear client store and redirect to /admin/login
      logout();
      if (isMounted) {
        router.replace(
          `/admin/login?redirect=${encodeURIComponent(pathname)}`
        );
      }
    }

    verifyAdminAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, isAdmin, user, login, router]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error", e);
    }
    logout();
    router.replace("/admin/login");
    router.refresh();
  };

  // If on login page, render child directly
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading barrier while checking credentials
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center space-y-4 text-slate-300">
        <Logo size="lg" isDark={true} />
        <div className="w-8 h-8 border-3 border-[#C05646] border-t-transparent rounded-full animate-spin mt-4" />
        <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
          Verifying Administrator Privileges...
        </p>
      </div>
    );
  }

  const adminNav = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products & Stock", icon: Shirt },
    { href: "/admin/orders", label: "Orders Management", icon: ShoppingBag },
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/coupons", label: "Coupons & Promos", icon: Tag },
    { href: "/admin/customers", label: "Customer Accounts", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Logo size="md" isDark={true} />
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin</span>
            </span>
          </div>

          <div className="pt-2">
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 block mb-2 px-3">
              Store Control Panel
            </span>
            <nav className="space-y-1">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#C05646] text-white shadow-md shadow-[#C05646]/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors py-1"
          >
            <ArrowLeft className="w-4 h-4 text-[#C05646]" />
            <span>Return to Public Store</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B1120]">
        {/* Admin Top Header */}
        <header className="h-16 border-b border-slate-800 px-6 sm:px-8 flex items-center justify-between bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>GS Collection Administration</span>
            <span>/</span>
            <span className="text-white font-bold capitalize">
              {pathname.replace("/admin", "").replace("/", "") || "Overview"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Logged in: <strong className="text-white">{user?.fullName || "Store Owner"}</strong>
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-800 text-[#C05646] font-black flex items-center justify-center text-xs border border-slate-700">
              GS
            </div>
          </div>
        </header>

        {/* Admin Page Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
