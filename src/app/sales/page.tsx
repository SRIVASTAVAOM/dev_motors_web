import { Metadata } from "next";
import { getCarModels } from "@/data/sales-catalog";
import SalesCatalogContainer from "@/components/sales/SalesCatalogContainer";
import { ShieldCheck, Zap, Award, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "New Car Sales Catalog | Dev Motors (Maruti Suzuki Arena & Nexa)",
  description:
    "Explore the full range of Maruti Suzuki new cars at Dev Motors Lucknow. Filter by Hatchback, SUV, Petrol, CNG, or Hybrid. Compare specs, calculate live EMIs, and book doorstep test drives.",
};

export default async function SalesPage() {
  const cars = await getCarModels();

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* ------------------------------------------------------------- */}
      {/* DAYTIME OEM SALES HERO BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="relative border-b border-gray-200 bg-[#F9FAFB] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="w-12 h-1 bg-[#E31837]" />
              
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#1B365D]">
                <span>OFFICIAL AUTHORIZED SHOWROOM CATALOG</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111827] uppercase">
                Explore Maruti Suzuki <br />
                <span className="text-[#E31837]">ARENA &amp; NEXA RANGE</span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Discover intelligent electric hybrids, factory-fitted S-CNG mobility, and bold SUVs. Compare variants side-by-side, estimate financing EMIs, and book 60-minute doorstep test drives directly from our Lucknow showroom campus.
              </p>

              {/* Quick Perks / Badges */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-700 font-bold">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#E31837]" />
                  <span>3-Year Standard Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-[#1B365D]" />
                  <span>Maruti Finance at 8.5% p.a.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <span>Doorstep Delivery &amp; Test Drive</span>
                </div>
              </div>
            </div>

            {/* Dealership Quick Contact Banner Card */}
            <div className="bg-white border border-gray-200 p-6 max-w-sm lg:w-80 shadow-xs space-y-3">
              <div className="w-6 h-0.5 bg-[#E31837]" />
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                DIRECT DEALERSHIP DESK
              </div>
              <h4 className="text-base font-black text-[#111827] uppercase leading-tight">
                Consult A Car Specialist
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Get custom on-road price quotes, corporate discounts, or check immediate color availability at Dev Motors.
              </p>
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 bg-[#C8102E] hover:bg-[#A80D26] py-3 text-xs font-black uppercase tracking-wider text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                Call +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CATALOG & STICKY FILTERS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <SalesCatalogContainer initialCars={cars} />
      </section>
    </div>
  );
}
