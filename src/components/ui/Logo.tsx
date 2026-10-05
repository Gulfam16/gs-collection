import Link from "next/link";
import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", isDark = false, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const badgeSizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2 group transition-all ${className}`}>
      <div
        className={`${badgeSizes[size]} rounded-xl bg-gradient-to-tr from-[#E05A47] to-[#F59E0B] text-white flex items-center justify-center font-black tracking-wider shadow-sm group-hover:scale-105 transition-transform`}
      >
        GS
      </div>
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none ${sizeClasses[size]} ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          GS Collection
        </span>
        <span
          className={`text-[10px] uppercase font-semibold tracking-widest ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Gullu Shani Clothing
        </span>
      </div>
    </Link>
  );
}
