"use client";

import { useState } from "react";
import { submitQuickLead, QuickLeadResponse } from "@/app/actions/booking";
import {
  Car,
  Wrench,
  CheckCircle2,
  Loader2,
  MessageSquare,
  ShieldCheck,
  Send,
  Building2,
  Calendar,
} from "lucide-react";

interface QuickBookingFormProps {
  initialMode?: "sales" | "service";
  onSuccess?: (res: QuickLeadResponse) => void;
  className?: string;
  isCompact?: boolean;
}

const CAR_OPTIONS = [
  "Swift",
  "Brezza",
  "Victoris",
  "Grand Vitara",
  "Baleno",
  "Fronx",
  "Dzire",
  "Ertiga",
  "Jimny (4x4)",
  "XL6",
  "Invicto",
  "e-Vitara",
  "Wagon-R",
  "S-Presso",
  "Alto K-10",
  "Celerio",
  "Eeco",
];

const DEALERSHIP_CAMPUSES = [
  "Dev Motors Hazratganj Campus, Lucknow",
  "Dev Motors Arena Campus - Kanpur Road, Lucknow",
  "Dev Motors Nexa Lounge - Gomti Nagar, Lucknow",
];

const SERVICE_TYPES = [
  "Periodic Maintenance (Paid / Free)",
  "Running Repairs & Diagnostics",
  "Air Conditioner & Battery Care",
  "Accidental Dent & Paint Repair",
  "Car Spa & Teflon Detailing",
];

export default function QuickBookingForm({
  initialMode = "sales",
  onSuccess,
  className = "",
  isCompact = false,
}: QuickBookingFormProps) {
  const [mode, setMode] = useState<"sales" | "service">(initialMode);
  const [carModel, setCarModel] = useState(CAR_OPTIONS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dealershipLocation, setDealershipLocation] = useState(DEALERSHIP_CAMPUSES[0]);
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [doorstepPickup, setDoorstepPickup] = useState(false);
  const [whatsappAlert, setWhatsappAlert] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuickLeadResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const clean = phone.trim().replace(/\D/g, "");
    if (clean.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await submitQuickLead({
        mode,
        customerName: name,
        customerPhone: clean,
        carModelName: carModel,
        serviceType: mode === "service" ? serviceType : undefined,
        dealershipLocation,
        pickupDropRequired: doorstepPickup,
      });

      if (res.success) {
        setResult(res);
        onSuccess?.(res);
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage("Network error while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setName("");
    setPhone("");
    setErrorMessage(null);
  };

  // SUCCESS STATE
  if (result) {
    return (
      <div className={`bg-white border border-gray-200 p-6 sm:p-8 text-center space-y-5 ${className}`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1B365D]">
            CONFIRMATION GENERATED
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#111827] uppercase">
            {mode === "sales" ? "Sales Inquiry Received!" : "Service Booking Scheduled!"}
          </h3>
          <p className="text-xs text-gray-600 max-w-md mx-auto pt-1">
            Reference No: <span className="font-mono font-bold text-[#E31837]">{result.bookingNumber}</span>.
            Our relationship specialist from <span className="font-semibold">{dealershipLocation}</span> will contact you shortly.
          </p>
        </div>

        {/* Automated WhatsApp Notice */}
        <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-4 text-left flex items-start gap-3 text-xs text-gray-800">
          <MessageSquare className="h-5 w-5 text-[#25D366] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-[#111827]">
              Automated WhatsApp Notification Initiated
            </p>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Booking details, dealership helpline, and offers have been dispatched. You can also open chat directly below.
            </p>
          </div>
        </div>

        {/* 1-Click WhatsApp Button (Backup) */}
        {result.whatsAppUrl && (
          <a
            href={result.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
          >
            <Send className="h-4 w-4" />
            <span>Open WhatsApp Chat Directly</span>
          </a>
        )}

        <div>
          <button
            type="button"
            onClick={resetForm}
            className="text-[11px] font-bold text-gray-500 hover:text-[#111827] underline uppercase tracking-wider"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 shadow-sm ${className}`}>
      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => {
            setMode("sales");
            setErrorMessage(null);
          }}
          className={`flex items-center justify-center gap-2 py-3 px-4 text-xs font-black uppercase tracking-wider transition-colors border-b-2 ${
            mode === "sales"
              ? "bg-white text-[#E31837] border-[#E31837]"
              : "text-gray-500 border-transparent hover:text-black hover:bg-gray-100/60"
          }`}
        >
          <Car className="h-4 w-4" />
          <span>New Car / Test Drive</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMode("service");
            setErrorMessage(null);
          }}
          className={`flex items-center justify-center gap-2 py-3 px-4 text-xs font-black uppercase tracking-wider transition-colors border-b-2 ${
            mode === "service"
              ? "bg-white text-[#1B365D] border-[#1B365D]"
              : "text-gray-500 border-transparent hover:text-black hover:bg-gray-100/60"
          }`}
        >
          <Wrench className="h-4 w-4" />
          <span>Book Service</span>
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4">
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 p-3 text-xs font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        <div className={`grid gap-4 ${isCompact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
          {/* Car Model */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block">
              {mode === "sales" ? "Interested Car Model *" : "Your Vehicle Model *"}
            </label>
            <select
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              className="w-full border border-gray-300 bg-white px-3 py-2.5 text-xs font-semibold text-gray-900 focus:border-[#E31837] focus:outline-none"
              required
            >
              {CAR_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Service Type or Dealership Location */}
          {mode === "service" ? (
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block">
                Service Required *
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full border border-gray-300 bg-white px-3 py-2.5 text-xs font-semibold text-gray-900 focus:border-[#1B365D] focus:outline-none"
              >
                {SERVICE_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block">
                Preferred Showroom *
              </label>
              <select
                value={dealershipLocation}
                onChange={(e) => setDealershipLocation(e.target.value)}
                className="w-full border border-gray-300 bg-white px-3 py-2.5 text-xs font-semibold text-gray-900 focus:border-[#E31837] focus:outline-none"
              >
                {DEALERSHIP_CAMPUSES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block">
              Your Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full border border-gray-300 bg-white px-3 py-2.5 text-xs font-medium text-gray-900 focus:border-[#E31837] focus:outline-none"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block">
              10-Digit Mobile Number *
            </label>
            <div className="flex">
              <span className="inline-flex items-center border border-r-0 border-gray-300 bg-gray-50 px-3 text-xs font-bold text-gray-600">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                maxLength={10}
                className="w-full border border-gray-300 bg-white px-3 py-2.5 text-xs font-medium text-gray-900 focus:border-[#E31837] focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Service Options (Pickup & Drop) */}
        {mode === "service" && (
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="doorstepPickup"
              checked={doorstepPickup}
              onChange={(e) => setDoorstepPickup(e.target.checked)}
              className="h-4 w-4 rounded-xs border-gray-300 text-[#1B365D] focus:ring-0"
            />
            <label htmlFor="doorstepPickup" className="text-xs text-gray-700 font-medium cursor-pointer">
              Require Free Doorstep Pickup &amp; Drop in Lucknow
            </label>
          </div>
        )}

        {/* WhatsApp Notification Checkbox */}
        <div className="flex items-center gap-2 pt-1 bg-emerald-50/50 p-2.5 border border-emerald-100">
          <input
            type="checkbox"
            id="whatsappAlert"
            checked={whatsappAlert}
            onChange={(e) => setWhatsappAlert(e.target.checked)}
            className="h-4 w-4 rounded-xs border-emerald-300 text-emerald-600 focus:ring-0"
          />
          <label htmlFor="whatsappAlert" className="text-xs text-gray-700 font-medium flex items-center gap-1.5 cursor-pointer">
            <MessageSquare className="h-3.5 w-3.5 text-[#25D366]" />
            <span>Send automated booking receipt &amp; special offers to my WhatsApp</span>
          </label>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 px-6 text-xs font-black uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2 ${
            mode === "sales"
              ? "bg-[#E31837] hover:bg-[#C8102E]"
              : "bg-[#1B365D] hover:bg-[#142847]"
          } ${loading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>PROCESSING BOOKING...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>
                {mode === "sales"
                  ? "GET ON-ROAD PRICE & SCHEDULE TEST DRIVE"
                  : "CONFIRM APPOINTMENT & GET WHATSAPP ALERT"}
              </span>
            </>
          )}
        </button>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 pt-1 text-[10px] text-gray-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Dev Motors • Maruti Suzuki Authorized Dealer Lucknow • 100% Privacy</span>
        </div>
      </form>
    </div>
  );
}
