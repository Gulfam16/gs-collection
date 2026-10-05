"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { showToast } from "@/store/useToastStore";
import { Logo } from "@/components/ui/Logo";
import { Lock, Mail, User, Phone, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      showToast("Please fill all required fields", "error");
      return;
    }

    login(email.trim(), "CUSTOMER");
    showToast("Account created successfully! Welcome to GS Collection.", "success");
    router.push("/account/orders");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center mb-3" />
          <h1 className="text-2xl font-black text-slate-900">Create Account</h1>
          <p className="text-xs text-slate-500">
            Join the GS Collection family for fast checkout, size guides, and order tracking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Full Name *</label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Fatima Noor"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Email Address *</label>
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
            <label className="font-bold text-slate-700">Phone / WhatsApp Number (Optional)</label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                placeholder="0300 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#E05A47]/20"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Create Password *</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="Minimum 6 characters"
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
            <span>Create My Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t">
          Already registered?{" "}
          <Link href="/login" className="font-bold text-[#E05A47] hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
