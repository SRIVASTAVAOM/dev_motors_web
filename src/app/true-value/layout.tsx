import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Award, Wrench, ChevronRight } from "lucide-react";
import TrueValueNavTabs from "@/components/true-value/TrueValueNavTabs";

export const metadata: Metadata = {
  title: "Maruti Suzuki True Value Certified Pre-Owned Cars | Dev Motors",
  description:
    "Buy and sell certified used cars at Dev Motors True Value. 376-point digital quality inspection, 1-year warranty, 3 free services, instant valuation, and free doorstep evaluation.",
};

export default function TrueValueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* ------------------------------------------------------------- */}
      {/* DAYTIME OEM TRUE VALUE HERO BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="relative border-b border-gray-200 bg-[#F9FAFB] pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-black transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-400" />
            <span className="text-gray-500">Certified Pre-Owned</span>
            <ChevronRight className="h-3 w-3 text-gray-400" />
            <span className="text-black font-bold uppercase tracking-wider">True Value Hub</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
            <div className="max-w-2xl space-y-3">
              <div className="w-12 h-1 bg-[#E31837]" />

              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1B365D]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#E31837]" />
                <span>MARUTI SUZUKI TRUE VALUE CERTIFIED HUB</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111827] uppercase">
                India&apos;s Most Trusted <br />
                <span className="text-[#E31837]">CERTIFIED PRE-OWNED CARS</span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Every pre-owned vehicle undergoes our 376-checkpoint digital inspection, backed by a 1-year warranty and 3 complimentary services. Selling your car? Get instant algorithmic valuation and doorstep evaluation with immediate bank transfer.
              </p>
            </div>

            {/* True Value 3 Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-white border border-gray-200 shadow-xs text-center sm:text-left">
                <Award className="h-5 w-5 text-amber-500 mb-1 mx-auto sm:mx-0" />
                <h4 className="text-xs font-black uppercase text-gray-900">376 Checks</h4>
                <p className="text-[10px] text-gray-500">Digital Audit</p>
              </div>

              <div className="p-4 bg-white border border-gray-200 shadow-xs text-center sm:text-left">
                <ShieldCheck className="h-5 w-5 text-[#1B365D] mb-1 mx-auto sm:mx-0" />
                <h4 className="text-xs font-black uppercase text-gray-900">1-Yr Warranty</h4>
                <p className="text-[10px] text-gray-500">Engine &amp; Gearbox</p>
              </div>

              <div className="p-4 bg-white border border-gray-200 shadow-xs text-center sm:text-left">
                <Wrench className="h-5 w-5 text-emerald-600 mb-1 mx-auto sm:mx-0" />
                <h4 className="text-xs font-black uppercase text-gray-900">3 Services</h4>
                <p className="text-[10px] text-gray-500">Authorized Free</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Buy vs Sell) */}
          <TrueValueNavTabs />
        </div>
      </section>

      {/* Main Tab Viewport */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {children}
      </main>
    </div>
  );
}
