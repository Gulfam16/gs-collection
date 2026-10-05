import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  isDark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", isDark = false, size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { width: 106, height: 60, maxHeightClass: "max-h-[50px]" },
    md: { width: 124, height: 70, maxHeightClass: "max-h-[60px]" },
    lg: { width: 160, height: 90, maxHeightClass: "max-h-[76px]" },
  };

  const current = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center justify-center transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] select-none ${className}`}
      aria-label="GS Collection — Gullu Shani Clothing"
    >
      <Image
        src={isDark ? "/images/logo-light.png" : "/images/logo-transparent.png"}
        alt="GS Collection — Gullu Shani Clothing"
        width={current.width}
        height={current.height}
        priority
        className={`w-auto ${current.maxHeightClass} object-contain transition-all drop-shadow-2xs`}
      />
    </Link>
  );
}
