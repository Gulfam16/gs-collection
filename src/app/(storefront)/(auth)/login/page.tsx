"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { showToast } from "@/store/useToastStore";
import { Logo } from "@/components/ui/Logo";
import { Lock, Mail, ArrowRight, ShieldCheck, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast("Please enter your email and password", "error");
      return;
    }

    const isAdmin = email.toLowerCase().includes("admin");
    login(email.trim(), isAdmin ? "ADMIN" : "CUSTOMER");
    showToast(`Signed in successfully as ${isAdmin ? "Store Admin" : "Customer"}!`, "success");

    if (isAdmin) {
      router.push("/admin");
    } else {
      router.push("/account/orders");
    }
  };

  const handleQuickLogin = (role: "CUSTOMER" | "ADMIN") => {
    if (role === "ADMIN") {
      login("admin@gscollection.pk", "ADMIN");
      showToast("Signed in as Store Administrator!", "success");
      router.push("/admin");
    } else {
      login("ayesha.malik@example.com", "CUSTOMER");
      showToast("Signed in as Customer (Ayesha Malik)!", "success");
      router.push("/account/orders");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center mb-3" />
          <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-xs text-slate-500">
            Sign in to track orders, manage addresses, and view your saved kids styles.
          </p>
        </div>

        {/* Quick Demo Login Badges for Instant Portfolio Testing */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
          <span className="block font-bold text-slate-700 text-[11px] uppercase tracking-wider text-center">
            🚀 1-Click Demo Evaluation Sign In
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("CUSTOMER")}
              className="py-2 px-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all"
            >
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>Customer Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("ADMIN")}
              className="py-2 px-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-700">Password</label>
              <span className="text-[11px] text-[#E05A47] hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#E05A47] hover:bg-[#C74433] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-bold text-[#E05A47] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
