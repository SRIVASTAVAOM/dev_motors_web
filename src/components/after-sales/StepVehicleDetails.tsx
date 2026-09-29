"use client";

import { useState } from "react";
import { Car, Hash, Fuel, Gauge, AlertCircle, ArrowRight } from "lucide-react";
import { POPULAR_CAR_MODELS, FUEL_TYPES } from "@/lib/types/service";

interface StepVehicleDetailsProps {
  regMode: "registration" | "model";
  vehicleRegNumber: string;
  carModel: string;
  fuelType: string;
  odometerKm?: number | null;
  onUpdate: (data: {
    regMode?: "registration" | "model";
    vehicleRegNumber?: string;
    carModel?: string;
    fuelType?: string;
    odometerKm?: number | null;
  }) => void;
  onNext: () => void;
}

export default function StepVehicleDetails({
  regMode,
  vehicleRegNumber,
  carModel,
  fuelType,
  odometerKm,
  onUpdate,
  onNext,
}: StepVehicleDetailsProps) {
  const [error, setError] = useState<string | null>(null);

  const formatRegNumber = (val: string) => {
    const clean = val.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    if (clean.length <= 2) return clean;
    if (clean.length <= 4) return `${clean.slice(0, 2)} ${clean.slice(2)}`;
    if (clean.length <= 6)
      return `${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4)}`;
    return `${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4, clean.length - 4)} ${clean.slice(clean.length - 4)}`;
  };

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const raw = e.target.value;
    const formatted = formatRegNumber(raw);
    onUpdate({ vehicleRegNumber: formatted });
  };

  const validateAndProceed = () => {
    if (regMode === "registration") {
      const clean = vehicleRegNumber.replace(/\s+/g, "");
      if (clean.length < 6) {
        setError("Please enter a valid vehicle registration number (e.g., UP 32 AB 1234 or DL 01 AA 9999).");
        return;
      }
    } else {
      if (!carModel) {
        setError("Please choose your Maruti Suzuki car model.");
        return;
      }
      if (!fuelType) {
        setError("Please select the fuel type of your vehicle.");
        return;
      }
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="w-10 h-0.5 bg-[#E31837] mb-2" />
        <h2 className="text-xl font-black uppercase tracking-tight text-[#111827]">
          Step 1: Vehicle Identification
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Provide your vehicle registration plate or select the model &amp; fuel type from our authorized catalog.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 border border-gray-200 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => {
            setError(null);
            onUpdate({ regMode: "registration" });
          }}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-black uppercase tracking-wider transition-colors ${
            regMode === "registration"
              ? "bg-[#111827] text-white"
              : "text-gray-600 hover:text-black hover:bg-gray-200"
          }`}
        >
          <Hash className="h-4 w-4" />
          <span>By Reg Number</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setError(null);
            onUpdate({ regMode: "model" });
          }}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-black uppercase tracking-wider transition-colors ${
            regMode === "model"
              ? "bg-[#111827] text-white"
              : "text-gray-600 hover:text-black hover:bg-gray-200"
          }`}
        >
          <Car className="h-4 w-4" />
          <span>By Model &amp; Fuel</span>
        </button>
      </div>

      {/* Option A: Registration Number */}
      {regMode === "registration" && (
        <div className="space-y-6 pt-2">
          {/* Indian HSRP License Plate Mockup */}
          <div className="max-w-md mx-auto">
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-500 mb-2 text-center">
              Enter Indian Vehicle Registration Plate
            </label>
            <div className="relative flex items-center h-16 w-full border-2 border-gray-900 bg-white shadow-sm overflow-hidden">
              {/* Blue IND Strip */}
              <div className="h-full w-12 bg-[#001E50] flex flex-col items-center justify-between py-1.5 px-1 shrink-0 text-white select-none">
                <div className="h-3 w-3 rounded-full border border-yellow-400/80 flex items-center justify-center text-[7px] text-yellow-300 font-bold">
                  ★
                </div>
                <span className="text-[11px] font-black tracking-widest">IND</span>
              </div>

              {/* Number Input */}
              <input
                type="text"
                value={vehicleRegNumber}
                onChange={handleRegChange}
                placeholder="UP 32 AB 1234"
                maxLength={14}
                className="w-full h-full bg-transparent px-4 text-xl sm:text-2xl font-mono font-black uppercase tracking-widest text-[#111827] focus:outline-none placeholder:text-gray-300"
              />
            </div>
            <p className="text-[11px] text-gray-500 text-center mt-2">
              Supports all state RTOs (UP, MP, DL, HR, MH, etc.). Fast-tracks warranty check.
            </p>
          </div>

          {/* Quick Model Selector to assist in case reg isn't in DB yet */}
          <div className="max-w-md mx-auto pt-2 bg-gray-50 p-4 border border-gray-200">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
              Select Your Model (Optional if entering reg number):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_CAR_MODELS.slice(0, 8).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onUpdate({ carModel: m })}
                  className={`text-xs px-2.5 py-1 border uppercase font-bold transition-colors ${
                    carModel === m
                      ? "bg-[#E31837] text-white border-[#E31837]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Option B: Model & Fuel Selection */}
      {regMode === "model" && (
        <div className="space-y-6 pt-2 max-w-2xl mx-auto">
          {/* Car Model Selector */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
              <Car className="h-4 w-4 text-[#E31837]" />
              <span>Select Maruti Suzuki Model *</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {POPULAR_CAR_MODELS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onUpdate({ carModel: m })}
                  className={`p-3 border text-center text-xs font-bold uppercase transition-all ${
                    carModel === m
                      ? "border-[#E31837] bg-red-50/20 text-[#E31837]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
              <Fuel className="h-4 w-4 text-[#1B365D]" />
              <span>Fuel Type *</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FUEL_TYPES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onUpdate({ fuelType: f.id })}
                  className={`p-3 border text-center text-xs font-bold uppercase transition-all ${
                    fuelType === f.id
                      ? "border-[#1B365D] bg-blue-50/20 text-[#1B365D]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Common: Approximate Odometer Reading */}
      <div className="max-w-md mx-auto pt-4">
        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-emerald-600" />
            <span>Odometer Reading (KM Driven)</span>
          </span>
          <span className="text-[10px] text-gray-400 font-semibold">(Optional)</span>
        </label>
        <div className="relative">
          <input
            type="number"
            value={odometerKm || ""}
            onChange={(e) =>
              onUpdate({
                odometerKm: e.target.value ? parseInt(e.target.value, 10) : null,
              })
            }
            placeholder="e.g. 24000"
            className="w-full border border-gray-300 bg-white px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
          />
          <span className="absolute right-3.5 top-2.5 text-xs text-gray-400 font-bold uppercase">
            KM
          </span>
        </div>
        <p className="text-[11px] text-gray-500 mt-1">
          Helps our service technicians prepare schedule-specific parts (filters, fluids, brake pads).
        </p>
      </div>

      {/* Error alert */}
      {error && (
        <div className="max-w-md mx-auto p-3 bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-700 font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Step Actions */}
      <div className="flex items-center justify-end pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={validateAndProceed}
          className="flex items-center gap-2 px-6 py-3 bg-[#E31837] hover:bg-[#C8102E] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
        >
          <span>Proceed to Select Service</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
