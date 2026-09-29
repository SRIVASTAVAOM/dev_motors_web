"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Copy,
  Check,
  Calendar,
  MapPin,
  Car,
  Wrench,
  Printer,
  Phone,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { ServiceBookingResult } from "@/lib/types/service";

interface BookingConfirmationCardProps {
  result: ServiceBookingResult;
  onReset: () => void;
}

export default function BookingConfirmationCard({
  result,
  onReset,
}: BookingConfirmationCardProps) {
  const [copied, setCopied] = useState(false);
  const details = result.details;
  const trackingId = result.trackingId || result.bookingNumber || "DM-SRV-2026";

  const handleCopyId = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-lg mb-4 animate-bounce">
          <CheckCircle className="h-9 w-9 stroke-[2.5]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Service Appointment Confirmed!
        </h2>
        <p className="text-sm text-emerald-100 mt-2 max-w-lg mx-auto">
          Thank you, <span className="font-semibold text-white">{details?.customerName || "Customer"}</span>. Your service booking has been created and assigned to the Dev Motors workshop queue.
        </p>

        {/* Tracking ID Badge */}
        <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 block">
              Tracking Confirmation ID
            </span>
            <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-widest">
              {trackingId}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyId}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Status Pill */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold text-white border border-white/30">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            STATUS: NEW (Under Workshop Assignment)
          </span>
        </div>
      </div>

      {/* Digital Service Pass (Printable) */}
      <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm print:border-none print:shadow-none space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Dev Motors Authorized Maruti Suzuki After-Sales Pass
            </span>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Digital Job Card Slip
            </h3>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Print Pass</span>
          </button>
        </div>

        {/* Pass Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
            <span className="text-zinc-500 text-[11px] uppercase font-semibold flex items-center gap-1 mb-1">
              <Car className="h-3.5 w-3.5 text-blue-600" />
              <span>Vehicle Identifier</span>
            </span>
            <p className="font-mono text-sm font-bold text-zinc-900 dark:text-white">
              {details?.vehicleIdentifier || "Vehicle"}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
            <span className="text-zinc-500 text-[11px] uppercase font-semibold flex items-center gap-1 mb-1">
              <Wrench className="h-3.5 w-3.5 text-indigo-600" />
              <span>Service Package</span>
            </span>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              {details?.serviceTitle}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
            <span className="text-zinc-500 text-[11px] uppercase font-semibold flex items-center gap-1 mb-1">
              <Calendar className="h-3.5 w-3.5 text-blue-600" />
              <span>Appointment Date & Time</span>
            </span>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              {details?.preferredDate}
            </p>
            <p className="text-zinc-500 text-[11px]">{details?.preferredTimeSlot}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
            <span className="text-zinc-500 text-[11px] uppercase font-semibold flex items-center gap-1 mb-1">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              <span>Mode & Workshop Hub</span>
            </span>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">
              {details?.serviceMode}
            </p>
            <p className="text-zinc-500 text-[11px] truncate">
              {details?.workshopLocation}
            </p>
          </div>
        </div>

        {/* Tentative Amount Box */}
        <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
          <div>
            <span className="text-xs text-blue-900 dark:text-blue-200 font-semibold block">
              Tentative Price (With 18% GST)
            </span>
            <span className="text-xs text-blue-700 dark:text-blue-300/80">
              Zero upfront payment. Pay securely upon final quality inspection.
            </span>
          </div>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
            ₹{details?.estimatedPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Next Steps Road Map */}
      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          What Happens Next?
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shrink-0">
              1
            </div>
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">Service Advisor Call</p>
              <p className="text-zinc-500 mt-0.5">
                A certified Dev Motors Service Advisor will call you within 30 minutes to review any special symptoms.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shrink-0">
              2
            </div>
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">Live WhatsApp Job Card</p>
              <p className="text-zinc-500 mt-0.5">
                Receive photos of used oil drain, filter condition, and real-time estimate before any repair commences.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs shrink-0">
              3
            </div>
            <div>
              <p className="font-bold text-zinc-900 dark:text-white">Doorstep Drop & Wash</p>
              <p className="text-zinc-500 mt-0.5">
                Quality road test, exterior high-pressure foam wash, and sanitized handover back to your door.
              </p>
            </div>
          </div>
        </div>

        {/* 24x7 Help contact */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Phone className="h-4 w-4 text-blue-600" />
            <span>Need immediate road assistance or rescheduling?</span>
            <a href="tel:+919876543210" className="font-bold text-blue-600 hover:underline">
              +91 98765 43210
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>6-Month Service Warranty Included</span>
          </div>
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Book Service for Another Car
        </button>

        <Link
          href="/sales"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>Explore New Car Sales Catalog</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
