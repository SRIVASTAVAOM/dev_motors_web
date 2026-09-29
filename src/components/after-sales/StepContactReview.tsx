"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  MapPin,
  Car,
  Wrench,
  AlertCircle,
  ArrowLeft,
  Loader2,
  FileCheck,
} from "lucide-react";
import {
  ServiceTypeKey,
  SERVICE_PACKAGES,
  SERVICE_ADDONS,
} from "@/lib/types/service";

interface StepContactReviewProps {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  regMode: "registration" | "model";
  vehicleRegNumber: string;
  carModel: string;
  fuelType: string;
  odometerKm?: number | null;
  serviceType: ServiceTypeKey;
  additionalServices: string[];
  estimatedPrice: number;
  serviceMode: "DOORSTEP_PICKUP" | "WORKSHOP_SELF_DROP";
  pickupAddress: string;
  workshopLocation: string;
  preferredDate: string;
  preferredTimeSlot: string;
  serviceNotes: string;
  isSubmitting: boolean;
  serverError: string | null;
  fieldErrors?: Record<string, string[]>;
  onUpdate: (data: {
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
  }) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function StepContactReview({
  customerName,
  customerPhone,
  customerEmail,
  regMode,
  vehicleRegNumber,
  carModel,
  fuelType,
  odometerKm,
  serviceType,
  additionalServices,
  estimatedPrice,
  serviceMode,
  pickupAddress,
  workshopLocation,
  preferredDate,
  preferredTimeSlot,
  serviceNotes,
  isSubmitting,
  serverError,
  fieldErrors,
  onUpdate,
  onSubmit,
  onBack,
}: StepContactReviewProps) {
  const [localError, setLocalError] = useState<string | null>(null);

  const currentPackage =
    SERVICE_PACKAGES.find((p) => p.id === serviceType) || SERVICE_PACKAGES[0];

  const selectedAddonObjects = SERVICE_ADDONS.filter((a) =>
    additionalServices.includes(a.id)
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    onUpdate({ customerPhone: val });
  };

  const handleFinalSubmit = () => {
    if (!customerName || customerName.trim().length < 2) {
      setLocalError("Please enter your full name.");
      return;
    }

    if (!customerPhone || customerPhone.length !== 10) {
      setLocalError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLocalError(null);
    onSubmit();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="w-10 h-0.5 bg-[#E31837] mb-2" />
        <h2 className="text-xl font-black uppercase tracking-tight text-[#111827]">
          Step 4: Contact Details &amp; Final Review
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Review your appointment itinerary, tentative pricing breakdown, and enter your contact number for live tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Form */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-gray-700">
            Contact Information
          </h3>

          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-[#1B365D]" />
              <span>Vehicle Owner / Customer Name *</span>
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => {
                setLocalError(null);
                onUpdate({ customerName: e.target.value });
              }}
              placeholder="e.g. Rahul Sharma"
              className="w-full border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
            />
            {fieldErrors?.customerName && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.customerName[0]}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#E31837]" />
              <span>10-Digit Mobile Number (For Live SMS Updates) *</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs font-bold text-gray-500 border-r border-gray-300 pr-2">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                value={customerPhone}
                onChange={handlePhoneChange}
                placeholder="9876543210"
                className="w-full border border-gray-300 bg-white pl-16 pr-3.5 py-2.5 text-xs font-mono text-gray-900 focus:outline-none focus:border-black"
              />
            </div>
            {fieldErrors?.customerPhone && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.customerPhone[0]}</p>
            )}
            <p className="text-[11px] text-gray-500 mt-1">
              We send your real-time vehicle inspection report &amp; digital bill via WhatsApp.
            </p>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-gray-500" />
              <span>Email Address (Optional - For Tax Invoice)</span>
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => onUpdate({ customerEmail: e.target.value })}
              placeholder="rahul.sharma@example.com"
              className="w-full border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
            />
            {fieldErrors?.customerEmail && (
              <p className="text-xs text-red-600 mt-1">{fieldErrors.customerEmail[0]}</p>
            )}
          </div>

          {/* Security & Dealer Assurance Box */}
          <div className="p-4 border border-gray-200 bg-gray-50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#111827]">
              <ShieldCheck className="h-4 w-4 text-[#E31837]" />
              <span>Dev Motors Authorized Dealership Guarantee</span>
            </div>
            <ul className="text-[11px] text-gray-600 space-y-1 list-disc pl-4">
              <li>100% Genuine Maruti Suzuki Parts (MSGP) with factory warranty.</li>
              <li>6-Month / 10,000 km Service Warranty on all repairs.</li>
              <li>No unauthorized part replacement without your prior digital approval.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Comprehensive Booking Summary Card */}
        <div className="lg:col-span-6">
          <div className="border border-gray-200 bg-[#F9FAFB] p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-[#1B365D]" />
                <span>Appointment Summary</span>
              </h3>
              <span className="px-2 py-0.5 bg-[#1B365D] text-white text-[9px] font-black uppercase tracking-wider">
                SERVICE_APPOINTMENT
              </span>
            </div>

            {/* Vehicle Spec */}
            <div className="flex items-start gap-3 border-b border-gray-200 pb-3">
              <div className="flex h-9 w-9 items-center justify-center bg-white border border-gray-200 text-[#E31837] shrink-0">
                <Car className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Vehicle</span>
                <span className="font-black text-gray-900 uppercase">
                  {regMode === "registration" && vehicleRegNumber
                    ? `Reg: ${vehicleRegNumber} (${carModel || "Maruti Suzuki"})`
                    : `Maruti Suzuki ${carModel} • ${fuelType}`}
                </span>
                {odometerKm && (
                  <span className="text-gray-500 block text-[11px]">
                    Current Reading: {odometerKm.toLocaleString()} KM
                  </span>
                )}
              </div>
            </div>

            {/* Service & Add-ons */}
            <div className="flex items-start gap-3 border-b border-gray-200 pb-3">
              <div className="flex h-9 w-9 items-center justify-center bg-white border border-gray-200 text-emerald-600 shrink-0">
                <Wrench className="h-4 w-4" />
              </div>
              <div className="text-xs flex-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Package</span>
                <div className="flex items-center justify-between">
                  <span className="font-black text-gray-900">{currentPackage.title}</span>
                  <span className="font-bold text-gray-900">₹{currentPackage.basePrice.toLocaleString("en-IN")}</span>
                </div>
                {selectedAddonObjects.length > 0 && (
                  <div className="mt-1 space-y-0.5 text-[11px] text-blue-600">
                    {selectedAddonObjects.map((a) => (
                      <div key={a.id} className="flex justify-between">
                        <span>+ {a.name}</span>
                        <span>₹{a.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mode & Schedule */}
            <div className="flex items-start gap-3 border-b border-gray-200 pb-3">
              <div className="flex h-9 w-9 items-center justify-center bg-white border border-gray-200 text-amber-600 shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Schedule &amp; Mode</span>
                <span className="font-black text-gray-900 block">
                  {preferredDate} &bull; {preferredTimeSlot}
                </span>
                <span className="text-gray-600 block text-[11px] mt-0.5">
                  {serviceMode === "DOORSTEP_PICKUP"
                    ? `Doorstep Pickup: ${pickupAddress}`
                    : `Self Drop: ${workshopLocation}`}
                </span>
              </div>
            </div>

            {/* Estimated Total */}
            <div className="pt-2 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">
                  Total Payable (Incl. 18% GST)
                </span>
                <span className="text-2xl font-black text-[#E31837]">
                  ₹{estimatedPrice.toLocaleString("en-IN")}*
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5">
                Pay After Service
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Errors display */}
      {(localError || serverError) && (
        <div className="p-3 bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-700 font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{localError || serverError}</span>
        </div>
      )}

      {/* Step Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 border border-gray-300 text-xs font-bold uppercase tracking-wider text-gray-800 hover:border-black transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleFinalSubmit}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#E31837] hover:bg-[#C8102E] disabled:bg-gray-300 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating Booking Token...</span>
            </>
          ) : (
            <span>Confirm Service Appointment</span>
          )}
        </button>
      </div>
    </div>
  );
}
