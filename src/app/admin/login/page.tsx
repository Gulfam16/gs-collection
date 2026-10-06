"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useAuthStore } from "@/store/useAuthStore";
import { showToast } from "@/store/useToastStore";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldAlert,
  Eye,
  EyeOff,
  ArrowLeft,
  KeyRound,
  AlertCircle,
} from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";

  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both administrator email and password");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Authentication failed. Access denied.");
        showToast(data.error || "Invalid credentials", "error");
        setIsLoading(false);
        return;
      }

      // Update client store state
      login(data.user.email, "ADMIN");
      showToast("Access Granted: Welcome back, Administrator", "success");

      // Redirect to the intended admin page
      router.push(redirectPath);
      router.refresh();
    } catch (err) {
      console.error("Login request error:", err);
      setErrorMessage("Network error occurred during authentication.");
      showToast("Connection failed. Try again.", "error");
      setIsLoading(false);
    }
  };

  const fillDefaultCredentials = () => {
    setEmail("admin@gscollection.pk");
    setPassword("GSadmin@2026!");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#C05646]/15 via-indigo-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Return link */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-2 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-slate-900/60"
        >
          <ArrowLeft className="w-4 h-4 text-[#C05646]" />
          <span>Return to Public Store</span>
        </Link>

        <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Security Gateway Live</span>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="max-w-md w-full mx-auto my-auto z-10 py-8">
        <div className="bg-[#0B132A]/90 backdrop-blur-xl p-8 sm:p-10 rounded-[32px] border border-slate-800 shadow-2xl space-y-6 relative">
          {/* Card Accent Glow */}
          <div className="absolute -top-[1px] left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#C05646] to-transparent" />

          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center pb-1">
              <Logo size="lg" isDark={true} />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[10px] font-bold uppercase tracking-widest text-slate-300">
              <KeyRound className="w-3.5 h-3.5 text-[#C05646]" />
              <span>Admin Control Console</span>
            </div>
            <h1 className="text-2xl font-editorial font-bold text-white tracking-tight">
              Administrator Access
            </h1>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Restricted portal. Provide valid management credentials to access store controls, inventory, and customer orders.
            </p>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 block">Admin Email</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@gscollection.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-hidden focus:border-[#C05646] focus:ring-1 focus:ring-[#C05646]/40 transition-all font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 block">Secret Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-hidden focus:border-[#C05646] focus:ring-1 focus:ring-[#C05646]/40 transition-all font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#C05646] hover:bg-[#A84638] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#C05646]/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Authenticate & Enter Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Secure Credential Autofill Helper for the Store Owner */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Store Owner Key
                </span>
                <button
                  type="button"
                  onClick={fillDefaultCredentials}
                  className="text-[11px] font-bold text-[#C05646] hover:text-[#d16a5a] underline transition-colors cursor-pointer"
                >
                  Quick Fill Credentials
                </button>
              </div>
              <div className="text-[11px] font-mono text-slate-400 space-y-0.5">
                <p>Email: <span className="text-slate-200">admin@gscollection.pk</span></p>
                <p>Password: <span className="text-slate-200">GSadmin@2026!</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Warning Notice */}
        <div className="mt-4 text-center">
          <p className="text-[11px] text-slate-500 font-light flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
            <span>Unauthorized access attempts are prohibited and logged.</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[11px] text-slate-600 py-2 z-10">
        © {new Date().getFullYear()} GS Collection (Gullu Shani Clothing). Secure Management Portal.
      </footer>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center space-y-4 text-slate-300">
          <Logo size="lg" isDark={true} />
          <div className="w-8 h-8 border-3 border-[#C05646] border-t-transparent rounded-full animate-spin mt-4" />
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Loading Security Gateway...
          </p>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
