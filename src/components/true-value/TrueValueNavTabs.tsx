"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Tag } from "lucide-react";

export default function TrueValueNavTabs() {
  const pathname = usePathname();
  const isBuy = pathname.includes("/true-value/buy");
  const isSell = pathname.includes("/true-value/sell");

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex border border-gray-300 bg-white p-1 shadow-xs">
        <Link
          href="/true-value/buy"
          className={`flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider transition-colors ${
            isBuy
              ? "bg-[#111827] text-white"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          }`}
        >
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Buy Certified Cars</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-emerald-600 text-white font-bold">
            376 CHECKS
          </span>
        </Link>

        <Link
          href="/true-value/sell"
          className={`flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider transition-colors ${
            isSell
              ? "bg-[#E31837] text-white"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          }`}
        >
          <Tag className="h-4 w-4" />
          <span>Sell / Instant Valuation</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-black/40 text-white font-bold">
            FREE VISIT
          </span>
        </Link>
      </div>
    </div>
  );
}
