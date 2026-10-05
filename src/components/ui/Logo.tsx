import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", isDark = false, size = "md" }: LogoProps) {
  const dimensions = {
    sm: { width: 36, height: 36, text: "text-lg", sub: "text-[9px]" },
    md: { width: 48, height: 48, text: "text-2xl", sub: "text-[10px]" },
    lg: { width: 60, height: 60, text: "text-3xl", sub: "text-[11px]" },
  };

  const current = dimensions[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group transition-all ${className}`}>
      {/* Brand Monogram Emblem */}
      <div
        className={`relative overflow-hidden rounded-xl border transition-transform group-hover:scale-105 shrink-0 ${
          isDark
            ? "border-slate-700 bg-white/95 shadow-sm"
            : "border-slate-200/80 bg-white shadow-xs"
        }`}
        style={{ width: current.width, height: current.height }}
      >
        <Image
          src="/images/logo.png"
          alt="GS Collection Logo"
          width={current.width}
          height={current.height}
          priority
          className="object-cover w-full h-full"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none ${current.text} ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          GS Collection
        </span>
        <span
          className={`uppercase font-bold tracking-widest mt-0.5 ${current.sub} ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Gullu Shani Clothing
        </span>
      </div>
    </Link>
  );
}
