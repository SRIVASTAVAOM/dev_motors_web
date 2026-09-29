"use client";

import { useState, useMemo } from "react";
import {
  Gauge,
  Calendar,
  CheckCircle2,
  Truck,
  Loader2,
  Sparkles,
} from "lucide-react";
import { DoorstepInspectionLeadResult } from "@/lib/types/true-value";
import { calculateInstantValuation } from "@/lib/valuation";
import { submitTrueValueInspectionLead } from "@/app/actions/true-value";

const CAR_MODELS = [
  "Swift",
  "Baleno",
  "Brezza",
  "Dzire",
  "Ertiga",
  "Grand Vitara",
  "WagonR",
  "Alto K10",
  "Fronx",
  "Jimny",
  "XL6",
  "Ciaz",
  "Ignis",
  "Celerio",
];

const TIME_SLOTS = [
  "Morning (10:00 AM - 12:30 PM)",
  "Afternoon (01:30 PM - 03:30 PM)",
  "Evening (03:30 PM - 06:00 PM)",
];

export default function SellCarValuator() {
  // Valuation Form State
  const make = "Maruti Suzuki";
  const [model, setModel] = useState("Swift");
  const [year, setYear] = useState<number>(2022);
  const [kmDriven, setKmDriven] = useState<number>(32000);
  const [fuelType, setFuelType] = useState<"PETROL" | "CNG" | "HYBRID" | "DIESEL">("PETROL");
  const [transmission, setTransmission] = useState<"MANUAL" | "AUTOMATIC">("MANUAL");
  const [ownership, setOwnership] = useState<number>(1);
  const [accidentalHistory, setAccidentalHistory] = useState<"NONE" | "MINOR_COSMETIC" | "MAJOR_REPAIR">("NONE");

  // Lead Booking State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [inspectionAddress, setInspectionAddress] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadResult, setLeadResult] = useState<DoorstepInspectionLeadResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);

  // Compute live valuation range using pure algorithm
  const valuation = useMemo(() => {
    return calculateInstantValuation({
      make,
      model,
      year,
      kmDriven,
      fuelType,
      transmission,
      ownership,
      accidentalHistory,
      city: "Lucknow",
    });
  }, [model, year, kmDriven, fuelType, transmission, ownership, accidentalHistory]);

  const minPriceLakh = (valuation.minPrice / 100000).toFixed(2);
  const maxPriceLakh = (valuation.maxPrice / 100000).toFixed(2);
  const fairPriceLakh = (valuation.fairPrice / 100000).toFixed(2);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setCustomerPhone(val);
  };

  const handleBookInspection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setFieldErrors(null);

    try {
      const response = await submitTrueValueInspectionLead({
        customerName,
        customerPhone,
        customerEmail: customerEmail || undefined,
        inspectionAddress,
        preferredDate: preferredDate || new Date().toISOString().split("T")[0],
        preferredTimeSlot,
        vehicleMake: make,
        vehicleModel: model,
        yearOfManufacture: year,
        kmDriven,
        fuelType,
        accidentalHistory,
        registrationNumber: registrationNumber || undefined,
        estimatedValuationMin: valuation.minPrice,
        estimatedValuationMax: valuation.maxPrice,
        notes: notes || undefined,
      });

      if (response.success) {
        setLeadResult(response);
      } else {
        setSubmitError(response.message || "Failed to schedule inspection.");
        setFieldErrors(response.errors || null);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setSubmitError("An unexpected error occurred. Please try again or call our hotline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setLeadResult(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setInspectionAddress("");
    setRegistrationNumber("");
    setNotes("");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // If inspection lead is confirmed
  if (leadResult) {
    return (
      <div className="max-w-2xl mx-auto border border-gray-300 bg-white p-8 shadow-md text-center space-y-6">
        <div className="flex h-16 w-16 items-center justify-center bg-emerald-50 border border-emerald-300 text-emerald-600 mx-auto">
          <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
            Inspection Booked &amp; Queued
          </span>
          <h2 className="text-2xl font-black uppercase text-gray-900 mt-1">
            Free Doorstep Evaluation Scheduled!
          </h2>
          <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">
            Our certified True Value evaluation specialist will visit your location to inspect the car and issue a spot purchase offer.
          </p>
        </div>

        {/* Lead Confirmation ID */}
        <div className="p-4 bg-gray-50 border border-gray-200">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
            Lead Confirmation Reference
          </span>
          <span className="text-2xl font-mono font-black text-gray-900 tracking-widest">
            {leadResult.leadId || leadResult.bookingNumber}
          </span>
        </div>

        {/* Evaluation Summary */}
        <div className="grid grid-cols-2 gap-3 text-xs text-left p-4 bg-emerald-50/50 border border-emerald-200">
          <div>
            <span className="text-gray-500 block text-[10px] font-bold uppercase">Vehicle</span>
            <span className="font-black text-gray-900">
              {leadResult.data?.vehicleSummary}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] font-bold uppercase">Estimated Price Range</span>
            <span className="font-black text-emerald-700">
              {leadResult.data?.estimatedRange}
            </span>
          </div>
          <div className="col-span-2 pt-2 border-t border-emerald-200">
            <span className="text-gray-500 block text-[10px] font-bold uppercase">Scheduled Date</span>
            <span className="font-bold text-gray-900">
              {leadResult.data?.inspectionDate} ({leadResult.data?.inspectionTimeSlot})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 text-xs text-gray-700 text-left">
          <Sparkles className="h-4 w-4 text-[#1B365D] shrink-0" />
          <span>Dev Motors Guarantee: Instant bank transfer in 60 minutes + Free RC Name Transfer.</span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2.5 bg-white border border-gray-300 text-xs font-bold uppercase tracking-wider text-gray-900 hover:border-black transition-colors"
        >
          Evaluate Another Vehicle
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* 2-Column Split: Valuation Calculator Left, Live Price Output + Doorstep Lead Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Instant Valuation Algorithm Form */}
        <div className="lg:col-span-7 border border-gray-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <div className="w-10 h-0.5 bg-[#E31837] mb-2" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1B365D]">
              INSTANT TRUE VALUE ALGORITHM
            </span>
            <h2 className="text-xl font-black uppercase text-[#111827] mt-1">
              Check Your Car&apos;s Resale Value in 30 Seconds
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Standard automotive depreciation engine calibrated against live market auction data.
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-2">
              Select Car Model *
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {CAR_MODELS.slice(0, 8).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModel(m)}
                  className={`text-xs px-3 py-1.5 border font-bold uppercase transition-colors ${
                    model === m
                      ? "bg-[#111827] text-white border-black"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full border border-gray-300 bg-white px-3.5 py-2 text-xs text-gray-900 font-semibold focus:outline-none focus:border-black"
            >
              {CAR_MODELS.map((m) => (
                <option key={m} value={m}>
                  Maruti Suzuki {m}
                </option>
              ))}
            </select>
          </div>

          {/* Year Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#E31837]" />
                <span>Manufacturing Year</span>
              </label>
              <span className="text-sm font-black text-[#E31837]">
                {year}
              </span>
            </div>
            <input
              type="range"
              min={2014}
              max={2024}
              step={1}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-[#E31837]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-semibold mt-1">
              <span>2014</span>
              <span>2019</span>
              <span>2024 (Latest)</span>
            </div>
          </div>

          {/* KM Driven Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Gauge className="h-4 w-4 text-[#1B365D]" />
                <span>Odometer Reading (KM)</span>
              </label>
              <span className="text-sm font-black text-[#1B365D]">
                {kmDriven.toLocaleString()} km
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={5000}
              value={kmDriven}
              onChange={(e) => setKmDriven(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-[#1B365D]"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-semibold mt-1">
              <span>5,000 km</span>
              <span>75,000 km</span>
              <span>1,50,000 km</span>
            </div>
          </div>

          {/* Fuel & Ownership Matrix */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5">
                Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-900 uppercase focus:outline-none focus:border-black"
              >
                <option value="PETROL">Petrol</option>
                <option value="CNG">Factory S-CNG</option>
                <option value="HYBRID">Smart / Electric Hybrid</option>
                <option value="DIESEL">Diesel (DDiS)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5">
                Ownership
              </label>
              <div className="grid grid-cols-3 gap-1 text-xs">
                {[1, 2, 3].map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOwnership(o)}
                    className={`py-2 px-1 border font-bold transition-colors ${
                      ownership === o
                        ? "bg-[#111827] text-white border-black"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {o === 1 ? "1st" : o === 2 ? "2nd" : "3rd+"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Transmission Type */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5">
              Transmission / Gearbox
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {(["MANUAL", "AUTOMATIC"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTransmission(t)}
                  className={`py-2.5 px-3 border font-bold uppercase transition-colors ${
                    transmission === t
                      ? "bg-[#111827] text-white border-black"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {t === "MANUAL" ? "Manual (MT)" : "Automatic (AT / AGS / AMT)"}
                </button>
              ))}
            </div>
          </div>

          {/* Accidental History */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-2">
              Accidental &amp; Damage History *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setAccidentalHistory("NONE")}
                className={`p-3 border text-left transition-all ${
                  accidentalHistory === "NONE"
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-white"
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Zero Accidents</span>
                  {accidentalHistory === "NONE" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">100% Original Paint &amp; Frame</p>
              </button>

              <button
                type="button"
                onClick={() => setAccidentalHistory("MINOR_COSMETIC")}
                className={`p-3 border text-left transition-all ${
                  accidentalHistory === "MINOR_COSMETIC"
                    ? "border-amber-600 bg-amber-50 text-amber-950 font-bold"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-white"
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Minor Dents</span>
                  {accidentalHistory === "MINOR_COSMETIC" && <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />}
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Bumper Repaint Only</p>
              </button>

              <button
                type="button"
                onClick={() => setAccidentalHistory("MAJOR_REPAIR")}
                className={`p-3 border text-left transition-all ${
                  accidentalHistory === "MAJOR_REPAIR"
                    ? "border-red-600 bg-red-50 text-red-950 font-bold"
                    : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-white"
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Major Claim</span>
                  {accidentalHistory === "MAJOR_REPAIR" && <CheckCircle2 className="h-3.5 w-3.5 text-red-600" />}
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Structural / Airbag Claim</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Valuation Card & Lead Capture */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Valuation Output Box */}
          <div className="bg-[#0B132B] text-white p-6 border border-gray-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                True Value Valuation
              </span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 uppercase">
                {valuation.marketDemand === "VERY_HIGH" ? "High Demand" : "Verified"}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Estimated Resale Range</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                ₹{minPriceLakh} - ₹{maxPriceLakh} <span className="text-base text-gray-300 font-bold">Lakh</span>
              </div>
              <p className="text-xs text-gray-300 mt-1 font-semibold">
                Fair Market Benchmark: <strong className="text-white">₹{fairPriceLakh} Lakh</strong>
              </p>
            </div>

            {/* Breakdown stats */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
              <div>
                <span className="text-gray-400 text-[10px] uppercase block font-semibold">Original Ex-Showroom</span>
                <span className="font-bold text-white">
                  ₹{(valuation.estimatedOnRoadOriginal / 100000).toFixed(2)} Lakh
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase block font-semibold">Total Depreciation</span>
                <span className="font-bold text-amber-400">
                  {valuation.depreciationPercentage}% from new
                </span>
              </div>
            </div>

            <div className="p-3 bg-white/10 text-[11px] text-gray-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Dev Motors Spot Purchase Guarantee</span>
              </div>
              <p className="text-gray-400 leading-relaxed font-normal">
                Receive 100% payment in your bank account within 60 minutes of physical car handover + Free RC transfer paperwork.
              </p>
            </div>
          </div>

          {/* Schedule Free Doorstep Inspection Form */}
          <form
            onSubmit={handleBookInspection}
            className="border border-gray-200 bg-white p-6 shadow-xs space-y-4"
          >
            <div className="border-b border-gray-200 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#E31837]" />
                <span>Schedule Free Doorstep Inspection</span>
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                An authorized True Value technician visits your home/office to inspect and confirm final offer price.
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Alok Mishra"
                className="w-full border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-black"
              />
              {fieldErrors?.customerName && (
                <p className="text-[10px] text-red-500 mt-1">{fieldErrors.customerName[0]}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1">
                10-Digit Mobile Number *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                value={customerPhone}
                onChange={handlePhoneChange}
                placeholder="9876543210"
                className="w-full border border-gray-300 bg-white px-3 py-2 text-xs font-mono text-gray-900 focus:outline-none focus:border-black"
              />
              {fieldErrors?.customerPhone && (
                <p className="text-[10px] text-red-500 mt-1">{fieldErrors.customerPhone[0]}</p>
              )}
            </div>

            {/* Doorstep Address */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1">
                Inspection Address (Home / Office) *
              </label>
              <textarea
                rows={2}
                required
                value={inspectionAddress}
                onChange={(e) => setInspectionAddress(e.target.value)}
                placeholder="House/Plot No., Society/Colony, Lucknow"
                className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
              />
              {fieldErrors?.inspectionAddress && (
                <p className="text-[10px] text-red-500 mt-1">{fieldErrors.inspectionAddress[0]}</p>
              )}
            </div>

            {/* Date & Time Slot Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full border border-gray-300 bg-white p-2 text-xs text-gray-900 focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1">
                  Time Slot
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full border border-gray-300 bg-white p-2 text-xs text-gray-900 font-semibold focus:outline-none focus:border-black"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot.split(" ")[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#E31837] hover:bg-[#C8102E] disabled:bg-gray-300 text-white py-3.5 text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting Lead...</span>
                </>
              ) : (
                <span>Schedule Free Doorstep Inspection</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
