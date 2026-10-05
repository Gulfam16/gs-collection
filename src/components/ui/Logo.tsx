import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", isDark = false, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: { title: "text-lg", sub: "text-[9px]", badge: "w-8 h-8 text-xs rounded-xl" },
    md: { title: "text-2xl", sub: "text-[10px]", badge: "w-11 h-11 text-sm rounded-2xl" },
    lg: { title: "text-3xl", sub: "text-[11px]", badge: "w-14 h-14 text-base rounded-2xl" },
  };

  const current = sizeClasses[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-all select-none ${className}`}
    >
      {/* Playful & Premium Brand Monogram Badge */}
      <div
        className={`relative ${current.badge} bg-gradient-to-tr from-[#E05A47] via-[#EA580C] to-[#F59E0B] text-white flex items-center justify-center font-black tracking-wider shadow-md shadow-[#E05A47]/25 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 shrink-0`}
      >
        <span className="drop-shadow-xs">GS</span>
        {/* Cute Sparkling Star Accent */}
        <span className="absolute -top-1 -right-1 text-[10px] transform group-hover:scale-125 transition-transform duration-300">
          ✨
        </span>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight ${current.title} ${
              isDark ? "text-white" : "text-slate-900 group-hover:text-[#E05A47]"
            } transition-colors`}
          >
            GS Collection
          </span>
        </div>
        <span
          className={`uppercase font-extrabold tracking-widest mt-1 ${current.sub} ${
            isDark ? "text-[#F59E0B]" : "text-[#E05A47]"
          }`}
        >
          Gullu Shani Clothing
        </span>
      </div>
    </Link>
  );
}
