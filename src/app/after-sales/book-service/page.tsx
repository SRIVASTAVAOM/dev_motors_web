import { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Truck,
  Award,
  ChevronRight,
  Clock,
  Phone,
} from "lucide-react";
import ServiceBookingWizard from "@/components/after-sales/ServiceBookingWizard";

export const metadata: Metadata = {
  title: "Book Car Service & Maintenance | Dev Motors Maruti Suzuki",
  description:
    "Schedule authorized Maruti Suzuki periodic service, accidental repair, wheel alignment, or AC care with free doorstep pickup & delivery, transparent MGP parts, and 6-month warranty at Dev Motors.",
};

export default function BookServicePage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* ------------------------------------------------------------- */}
      {/* DAYTIME OEM SERVICE HERO BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="relative border-b border-gray-200 bg-[#F9FAFB] pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-black transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-gray-400" />
            <span className="text-gray-500">After-Sales</span>
            <ChevronRight className="h-3 w-3 text-gray-400" />
            <span className="text-black font-bold uppercase tracking-wider">Book Service</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="w-12 h-1 bg-[#E31837]" />

              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1B365D]">
                <Wrench className="h-3.5 w-3.5 text-[#E31837]" />
                <span>AUTHORIZED MARUTI SUZUKI SERVICE NETWORK</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111827] uppercase">
                Expert Care For Your <br />
                <span className="text-[#E31837]">MARUTI SUZUKI VEHICLE</span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Book your service appointment in 4 simple steps. Enjoy instant tentative pricing, computerized diagnostic scans, genuine MGP spare parts, and complimentary doorstep pickup &amp; drop across Lucknow.
              </p>
            </div>

            {/* Service Pillars / Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-white border border-gray-200 shadow-xs">
                <ShieldCheck className="h-5 w-5 text-[#E31837] mb-1.5" />
                <h4 className="text-xs font-black uppercase text-gray-900">Genuine MSGP</h4>
                <p className="text-[11px] text-gray-500">100% Factory Spares</p>
              </div>

              <div className="p-4 bg-white border border-gray-200 shadow-xs">
                <Truck className="h-5 w-5 text-[#1B365D] mb-1.5" />
                <h4 className="text-xs font-black uppercase text-gray-900">Doorstep Pickup</h4>
                <p className="text-[11px] text-gray-500">Home or Workplace</p>
              </div>

              <div className="p-4 bg-white border border-gray-200 shadow-xs col-span-2 sm:col-span-1">
                <Award className="h-5 w-5 text-emerald-600 mb-1.5" />
                <h4 className="text-xs font-black uppercase text-gray-900">6-Mo Warranty</h4>
                <p className="text-[11px] text-gray-500">On Labor &amp; Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4-STEP SERVICE BOOKING WIZARD CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="border border-gray-200 bg-white p-6 sm:p-10 shadow-xs">
          <ServiceBookingWizard />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* WORKSHOP DETAILS & QUICK HOTLINE */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Dev Motors Central Workshop
            </h4>
            <p className="text-xs font-semibold text-gray-900">
              Transport Nagar &amp; Kanpur Road Industrial Hub, Lucknow
            </p>
            <p className="text-[11px] text-gray-500">
              Equipped with 24 dedicated hydraulic bays, computerized wheel balancers, and paint booth.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Workshop Working Hours
            </h4>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
              <span>Monday to Sunday: 08:30 AM – 07:00 PM</span>
            </div>
            <p className="text-[11px] text-gray-500">
              Express 60-Minute Quick Service available by prior appointment.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Service Emergency Desk
            </h4>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-1.5 text-sm font-black text-[#E31837] hover:underline"
            >
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210 (Toll-Free Helpline)</span>
            </a>
            <p className="text-[11px] text-gray-500">
              24x7 Roadside &amp; Flatbed Towing Assistance within 50 km radius.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
