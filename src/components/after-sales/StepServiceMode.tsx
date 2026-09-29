"use client";

import { useState } from "react";
import {
  Truck,
  Building2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import {
  DEALERSHIP_WORKSHOPS,
  TIME_SLOTS,
} from "@/lib/types/service";

interface StepServiceModeProps {
  serviceMode: "DOORSTEP_PICKUP" | "WORKSHOP_SELF_DROP";
  pickupAddress: string;
  workshopLocation: string;
  preferredDate: string;
  preferredTimeSlot: string;
  serviceNotes: string;
  onUpdate: (data: {
    serviceMode?: "DOORSTEP_PICKUP" | "WORKSHOP_SELF_DROP";
    pickupAddress?: string;
    workshopLocation?: string;
    preferredDate?: string;
    preferredTimeSlot?: string;
    serviceNotes?: string;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepServiceMode({
  serviceMode,
  pickupAddress,
  workshopLocation,
  preferredDate,
  preferredTimeSlot,
  serviceNotes,
  onUpdate,
  onNext,
  onBack,
}: StepServiceModeProps) {
  const [error, setError] = useState<string | null>(null);

  // Generate next 7 dates for quick selection
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split("T")[0];
      const weekday = d.toLocaleDateString("en-IN", { weekday: "short" });
      const dayNum = d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      const isToday = i === 0;
      const isTomorrow = i === 1;

      days.push({
        iso,
        label: isToday ? "Today" : isTomorrow ? "Tomorrow" : `${weekday}, ${dayNum}`,
      });
    }
    return days;
  };

  const availableDays = getNextDays();

  const validateAndProceed = () => {
    if (serviceMode === "DOORSTEP_PICKUP" && (!pickupAddress || pickupAddress.trim().length < 5)) {
      setError("Please provide your complete Doorstep Pickup address (House/Flat No., Street, Landmark).");
      return;
    }

    if (!preferredDate) {
      setError("Please choose your preferred appointment date.");
      return;
    }

    if (!preferredTimeSlot) {
      setError("Please choose a preferred time slot.");
      return;
    }

    setError(null);
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="w-10 h-0.5 bg-[#E31837] mb-2" />
        <h2 className="text-xl font-black uppercase tracking-tight text-[#111827]">
          Step 3: Service Mode &amp; Schedule
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Opt for convenient doorstep vehicle pickup &amp; return or drive into your nearest Dev Motors authorized workshop.
        </p>
      </div>

      {/* Mode Selection Cards */}
      <div>
        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-3">
          Select Service Delivery Mode *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Doorstep Pickup & Drop */}
          <div
            onClick={() => {
              setError(null);
              onUpdate({ serviceMode: "DOORSTEP_PICKUP" });
            }}
            className={`relative p-5 border cursor-pointer transition-all duration-150 ${
              serviceMode === "DOORSTEP_PICKUP"
                ? "bg-red-50/20 border-[#E31837] shadow-xs"
                : "bg-white border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center bg-[#E31837] text-white">
                <Truck className="h-5 w-5" />
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                FREE DOORSTEP
              </span>
            </div>

            <h3 className="text-sm font-black uppercase text-gray-900 flex items-center justify-between">
              <span>Doorstep Pickup &amp; Drop</span>
              {serviceMode === "DOORSTEP_PICKUP" && (
                <CheckCircle2 className="h-4 w-4 text-[#E31837] shrink-0" />
              )}
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Our verified service driver picks up your car from your residence or workplace in Lucknow and returns it fully serviced and washed.
            </p>
          </div>

          {/* Option 2: Workshop Self-Drop */}
          <div
            onClick={() => {
              setError(null);
              onUpdate({ serviceMode: "WORKSHOP_SELF_DROP" });
            }}
            className={`relative p-5 border cursor-pointer transition-all duration-150 ${
              serviceMode === "WORKSHOP_SELF_DROP"
                ? "bg-red-50/20 border-[#E31837] shadow-xs"
                : "bg-white border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center bg-[#1B365D] text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-wider">
                EXPRESS BAY
              </span>
            </div>

            <h3 className="text-sm font-black uppercase text-gray-900 flex items-center justify-between">
              <span>Self-Drop to Workshop</span>
              {serviceMode === "WORKSHOP_SELF_DROP" && (
                <CheckCircle2 className="h-4 w-4 text-[#E31837] shrink-0" />
              )}
            </h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Drive into our central workshop facility. Enjoy our customer lounge with Wi-Fi while our technicians work on your car.
            </p>
          </div>
        </div>
      </div>

      {/* Conditional Fields: Address vs Workshop Selection */}
      {serviceMode === "DOORSTEP_PICKUP" ? (
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[#E31837]" />
            <span>Complete Pickup &amp; Drop Address in Lucknow *</span>
          </label>
          <textarea
            rows={3}
            value={pickupAddress}
            onChange={(e) => onUpdate({ pickupAddress: e.target.value })}
            placeholder="House/Plot No., Society/Apartment Name, Area Landmark, Lucknow (PIN Code)"
            className="w-full border border-gray-300 bg-white p-3 text-xs text-gray-900 focus:outline-none focus:border-black"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-[#1B365D]" />
            <span>Select Preferred Workshop Hub *</span>
          </label>
          <div className="space-y-2">
            {DEALERSHIP_WORKSHOPS.map((w) => {
              const isSelected = workshopLocation === w.name;
              return (
                <div
                  key={w.id}
                  onClick={() => onUpdate({ workshopLocation: w.name })}
                  className={`p-3.5 border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? "border-[#1B365D] bg-blue-50/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black uppercase text-gray-900">{w.name}</h4>
                    <p className="text-[11px] text-gray-500">{w.address}</p>
                  </div>
                  <div
                    className={`h-4 w-4 border flex items-center justify-center ${
                      isSelected
                        ? "border-[#1B365D] bg-[#1B365D] text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Date Picker Grid */}
      <div className="space-y-2">
        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-[#E31837]" />
          <span>Appointment Date *</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {availableDays.map((day) => {
            const isSelected = preferredDate === day.iso;
            return (
              <button
                key={day.iso}
                type="button"
                onClick={() => onUpdate({ preferredDate: day.iso })}
                className={`p-2.5 border text-center text-xs font-bold uppercase transition-all ${
                  isSelected
                    ? "border-[#E31837] bg-red-50/30 text-[#E31837]"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Picker */}
      <div className="space-y-2">
        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-[#1B365D]" />
          <span>Time Slot *</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TIME_SLOTS.map((slot) => {
            const isSelected = preferredTimeSlot === slot.label;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => onUpdate({ preferredTimeSlot: slot.label })}
                className={`p-3 border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? "border-[#1B365D] bg-blue-50/20 text-[#1B365D]"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <span className="text-xs font-bold">{slot.label}</span>
                <span className="text-[10px] font-semibold text-gray-500 uppercase">{slot.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional Service Notes */}
      <div className="space-y-2">
        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-gray-500" />
          <span>Special Instructions / Customer Complaints (Optional)</span>
        </label>
        <textarea
          rows={2}
          value={serviceNotes}
          onChange={(e) => onUpdate({ serviceNotes: e.target.value })}
          placeholder="e.g. Squeaking noise in front right brake, AC cooling low in traffic..."
          className="w-full border border-gray-300 bg-white p-3 text-xs text-gray-900 focus:outline-none focus:border-black"
        />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-700 font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Step Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-5 py-3 border border-gray-300 text-xs font-bold uppercase tracking-wider text-gray-800 hover:border-black transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={validateAndProceed}
          className="flex items-center gap-1.5 px-6 py-3 bg-[#E31837] hover:bg-[#C8102E] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
        >
          <span>Continue to Final Review</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
