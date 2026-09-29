import { Metadata } from "next";
import Link from "next/link";
import DaylightGrandVitaraShowroom from "@/components/sales/DaylightGrandVitaraShowroom";
import { ChevronRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Maruti Suzuki Grand Vitara - 3D Daylight Showroom | Dev Motors Lucknow",
  description:
    "Experience the All-New Maruti Suzuki Grand Vitara in our interactive 3D WebGL daylight showroom. Check ex-showroom price starting ₹ 10.99 Lakh*, 27.97 km/l ARAI certified mileage, 4-column engineering specs, and live smart EMI calculator with Dev Motors Lucknow.",
  keywords: [
    "Maruti Suzuki Grand Vitara",
    "Grand Vitara 3D Showroom",
    "Grand Vitara Price Lucknow",
    "Strong Hybrid SUV",
    "Grand Vitara Mileage 27.97 kmpl",
    "Dev Motors Arena",
    "Dev Motors Nexa",
  ],
};

export default function GrandVitaraShowroomPage() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      {/* ------------------------------------------------------------- */}
      {/* OEM LIGHT BREADCRUMB NAVIGATION */}
      {/* ------------------------------------------------------------- */}
      <div className="border-b border-[#E5E7EB] bg-[#F4F5F7] px-4 py-2.5">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs font-semibold text-[#6B7280]">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#111827] transition-colors"
          >
            <Home className="h-3.5 w-3.5 text-[#9CA3AF]" />
            <span>DEV MOTORS</span>
          </Link>
          <ChevronRight className="h-3 w-3 text-[#D1D5DB]" />
          <Link
            href="/sales"
            className="hover:text-[#111827] transition-colors"
          >
            NEW CARS
          </Link>
          <ChevronRight className="h-3 w-3 text-[#D1D5DB]" />
          <span className="text-[#111827] uppercase font-bold">
            GRAND VITARA (INTELLIGENT ELECTRIC HYBRID)
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DAYLIGHT SHOWROOM & 3D STUDIO EXPERIENCE */}
      {/* ------------------------------------------------------------- */}
      <DaylightGrandVitaraShowroom />
    </div>
  );
}
