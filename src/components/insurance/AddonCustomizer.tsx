"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  SlidersHorizontal,
  FileCheck2,
} from "lucide-react";
import { INSURANCE_ADDONS, PremiumBreakdown } from "@/lib/types/insurance";
import { calculateInsurancePremium } from "@/lib/insurance-calculator";

interface AddonCustomizerProps {
  carMakeAndModel: string;
  vehicleRegNumber: string;
  claimedNcbPercentage: number;
  selectedAddonIds: string[];
  customIdv?: number;
  onUpdateAddons: (addonIds: string[]) => void;
  onUpdateIdv: (idv: number) => void;
  onProceed: () => void;
  onBack: () => void;
}

export default function AddonCustomizer({
  carMakeAndModel,
  vehicleRegNumber,
  claimedNcbPercentage,
  selectedAddonIds,
  customIdv,
  onUpdateAddons,
  onUpdateIdv,
  onProceed,
  onBack,
}: AddonCustomizerProps) {
  const defaultBreakdown = calculateInsurancePremium(
    carMakeAndModel,
    claimedNcbPercentage,
    selectedAddonIds,
    customIdv
  );

  const baseCalculatedIdv = defaultBreakdown.idv;
  const minIdv = Math.round(baseCalculatedIdv * 0.9);
  const maxIdv = Math.round(baseCalculatedIdv * 1.1);
  const currentIdv = customIdv && customIdv > 0 ? customIdv : baseCalculatedIdv;

  const [idvValue, setIdvValue] = useState<number>(currentIdv);

  const breakdown: PremiumBreakdown = calculateInsurancePremium(
    carMakeAndModel,
    claimedNcbPercentage,
    selectedAddonIds,
    idvValue
  );

  const toggleAddon = (id: string) => {
    if (selectedAddonIds.includes(id)) {
      onUpdateAddons(selectedAddonIds.filter((item) => item !== id));
    } else {
      onUpdateAddons([...selectedAddonIds, id]);
    }
  };

  const handleApplyRecommendedBundle = () => {
    const bundle = ["zero-dep", "engine-protect", "consumables"];
    onUpdateAddons(bundle);
  };

  const handleSelectAll = () => {
    onUpdateAddons(INSURANCE_ADDONS.map((a) => a.id));
  };

  const handleClearAll = () => {
    onUpdateAddons([]);
  };

  const handleIdvSliderChange = (newVal: number) => {
    setIdvValue(newVal);
    onUpdateIdv(newVal);
  };

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-200 bg-[#F9FAFB] p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
              {vehicleRegNumber || "CAR RENEWAL"}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-xs font-black text-[#E31837] uppercase tracking-wider">
              {carMakeAndModel}
            </span>
          </div>
          <h2 className="text-xl font-black uppercase text-[#111827] mt-1">
            Customize Add-On Covers &amp; Insured Value (IDV)
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Select high-value protection covers to eliminate out-of-pocket claim expenses.
          </p>
        </div>

        {/* Quick Action Presets */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleApplyRecommendedBundle}
            className="flex items-center gap-1.5 bg-[#E31837] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-[#C8102E] transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Recommended Shield</span>
          </button>
          <button
            type="button"
            onClick={handleSelectAll}
            className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase text-gray-700 hover:border-black transition-colors"
          >
            All
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold uppercase text-gray-500 hover:text-red-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Addon Checkbox Cards & IDV Slider (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* IDV Fine-Tuning Slider */}
          <div className="border border-gray-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal className="h-4 w-4 text-[#1B365D]" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-700">
                    Insured Declared Value (IDV)
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Current maximum market reimbursement value for total loss or theft.
                </p>
              </div>

              <div className="text-right">
                <span className="text-base font-black text-[#111827]">
                  ₹{idvValue.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <input
              type="range"
              min={minIdv}
              max={maxIdv}
              step={10000}
              value={idvValue}
              onChange={(e) => handleIdvSliderChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-[#E31837]"
            />

            <div className="flex justify-between text-[10px] font-semibold text-gray-400">
              <span>Min: ₹{minIdv.toLocaleString("en-IN")} (-10%)</span>
              <span className="font-bold text-[#E31837]">Selected IDV</span>
              <span>Max: ₹{maxIdv.toLocaleString("en-IN")} (+10%)</span>
            </div>
          </div>

          {/* Add-ons List */}
          <div className="space-y-3">
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700">
              Select Protective Add-on Covers ({selectedAddonIds.length} Selected)
            </label>

            <div className="space-y-2.5">
              {INSURANCE_ADDONS.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                      isSelected
                        ? "bg-red-50/20 border-[#E31837] shadow-xs"
                        : "bg-white border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-black uppercase text-gray-900">
                          {addon.name}
                        </h4>
                        {addon.popular && (
                          <span className="bg-[#E31837] text-white px-1.5 py-0.2 text-[9px] font-bold uppercase">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        {addon.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-black text-[#E31837]">
                        +₹{addon.price.toLocaleString("en-IN")}
                      </span>
                      <div
                        className={`h-4 w-4 border flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-[#E31837] bg-[#E31837] text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Premium Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#0B132B] text-white p-6 border border-gray-800 space-y-4 shadow-md">
            <div className="border-b border-white/10 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  Annual Premium Estimate
                </span>
                <span className="text-3xl font-black text-emerald-400 mt-1 block">
                  ₹{breakdown.totalPayable.toLocaleString("en-IN")}*
                </span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/30 uppercase">
                Zero Paperwork
              </span>
            </div>

            {/* Premium Details breakdown */}
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Own Damage (OD) Base Premium:</span>
                <span className="font-bold">₹{breakdown.baseOdPremium.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>No Claim Bonus ({breakdown.ncbDiscountPercentage}% NCB):</span>
                <span className="font-bold">-₹{breakdown.ncbDiscountAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Own Damage Premium:</span>
                <span className="font-bold">₹{breakdown.netOdPremium.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-blue-300">
                <span>Selected Add-ons ({selectedAddonIds.length}):</span>
                <span className="font-bold">+₹{breakdown.addonsPremium.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Third Party (TP) Legal Liability:</span>
                <span className="font-bold">₹{breakdown.tpMandatedPremium.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 text-gray-400">
                <span>Applicable GST (18%):</span>
                <span className="font-bold">₹{breakdown.gstAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="p-3 bg-white/10 text-[11px] text-gray-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>100% Cashless Repairs Guaranteed</span>
              </div>
              <p className="text-gray-400 leading-relaxed font-normal">
                Includes mandatory Maruti Suzuki Genuine Parts (MSGP) fitment and nationwide towing assistance.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-300 text-xs font-bold uppercase text-gray-700 hover:border-black transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={onProceed}
              className="flex items-center gap-2 px-6 py-3 bg-[#E31837] hover:bg-[#C8102E] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
            >
              <span>Continue to Contact</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
