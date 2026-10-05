import Link from "next/link";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", isDark = false, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: {
      emblem: "w-8 h-8 text-sm",
      title: "text-base tracking-[0.18em]",
      sub: "text-[7.5px] tracking-[0.24em]",
      gap: "gap-2.5",
    },
    md: {
      emblem: "w-10 h-10 text-base",
      title: "text-lg tracking-[0.2em]",
      sub: "text-[8.5px] tracking-[0.26em]",
      gap: "gap-3",
    },
    lg: {
      emblem: "w-12 h-12 text-lg",
      title: "text-xl tracking-[0.22em]",
      sub: "text-[9.5px] tracking-[0.28em]",
      gap: "gap-3.5",
    },
  };

  const current = sizeClasses[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${current.gap} group transition-all select-none ${className}`}
    >
      {/* Refined Architectural Monogram */}
      <div
        className={`relative ${current.emblem} rounded-xl flex items-center justify-center font-serif font-black transition-all duration-300 shrink-0 ${
          isDark
            ? "bg-slate-800 text-white border border-slate-700 shadow-xs"
            : "bg-[#0F172A] text-white shadow-xs group-hover:bg-[#E05A47]"
        }`}
      >
        <span className="leading-none tracking-tight italic">GS</span>
        {/* Subtle Fashion House Corner Dot */}
        <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#E05A47]" />
      </div>

      {/* Haute Couture Typography */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif font-black uppercase leading-tight ${current.title} ${
            isDark ? "text-white" : "text-[#0F172A] group-hover:text-[#E05A47]"
          } transition-colors`}
        >
          GS COLLECTION
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`font-sans font-bold uppercase ${current.sub} ${
              isDark ? "text-slate-400" : "text-[#E05A47]"
            }`}
          >
            GULLU SHANI CLOTHING
          </span>
        </div>
      </div>
    </Link>
  );
}
