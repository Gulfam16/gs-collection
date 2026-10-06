"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { showToast } from "@/store/useToastStore";
import { Logo } from "@/components/ui/Logo";
import { Lock, Mail, ArrowRight, User, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast("Please enter your email and password", "error");
      return;
    }

    setIsLoading(true);

    // Regular client login is strictly for CUSTOMER accounts
    login(email.trim(), "CUSTOMER");
    showToast("Signed in successfully to your customer account!", "success");
    setIsLoading(false);
    router.push("/account/orders");
  };

  const handleQuickCustomerDemo = () => {
    login("ayesha.malik@example.com", "CUSTOMER");
    showToast("Signed in as Customer (Ayesha Malik)!", "success");
    router.push("/account/orders");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E7E4DE] shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center mb-3" />
          <h1 className="text-2xl font-editorial font-bold text-[#0B132A]">
            Client Account Sign In
          </h1>
          <p className="text-xs text-slate-500 font-light">
            Sign in to track orders, manage delivery addresses, and view your saved wishlist.
          </p>
        </div>

        {/* Quick Customer Demo Button */}
        <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E7E4DE] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider">
              1-Click Customer Demo
            </span>
            <button
              type="button"
              onClick={handleQuickCustomerDemo}
              className="py-1.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-bold flex items-center gap-1.5 shadow-2xs transition-all text-xs cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>Sign in as Ayesha</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#C05646] focus:ring-1 focus:ring-[#C05646]/30 text-slate-900"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-700">Password</label>
              <span className="text-[11px] text-[#C05646] hover:underline cursor-pointer">
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
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#C05646] focus:ring-1 focus:ring-[#C05646]/30 text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#0B132A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4 text-[#C05646]" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Don&apos;t have an account yet?{" "}
          <Link href="/register" className="font-bold text-[#C05646] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
