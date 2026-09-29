"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

const POPULAR_MODELS = [
  { name: "Grand Vitara", segment: "Hybrid SUV", defaultIdv: 1380000 },
  { name: "Brezza", segment: "Compact SUV", defaultIdv: 950000 },
  { name: "Baleno", segment: "Premium Hatchback", defaultIdv: 740000 },
  { name: "Swift", segment: "Dynamic Hatchback", defaultIdv: 680000 },
  { name: "Fronx", segment: "Turbo Crossover", defaultIdv: 840000 },
  { name: "Ertiga", segment: "7-Seater MPV", defaultIdv: 980000 },
  { name: "Dzire", segment: "Compact Sedan", defaultIdv: 710000 },
  { name: "Jimny", segment: "4x4 Off-Roader", defaultIdv: 1200000 },
];

const PREVIOUS_INSURERS = [
  "Maruti Insurance Broking",
  "ICICI Lombard",
  "Bajaj Allianz",
  "HDFC ERGO",
  "Tata AIG",
  "New India Assurance",
  "Go Digit",
  "SBI General",
  "Other / Unsure",
];

const NCB_SLABS = [
  { value: 0, label: "0% (New / Made Claim)", desc: "1st year or claimed last year" },
  { value: 20, label: "20% (1 Claim-Free Year)", desc: "1 year with 0 claims" },
  { value: 25, label: "25% (2 Claim-Free Years)", desc: "2 consecutive clean years" },
  { value: 35, label: "35% (3 Claim-Free Years)", desc: "3 consecutive clean years" },
  { value: 45, label: "45% (4 Claim-Free Years)", desc: "4 consecutive clean years" },
  { value: 50, label: "50% (5+ Claim-Free Years)", desc: "Maximum IRDAI allowed discount" },
];

interface QuickRenewalFormProps {
  vehicleRegNumber: string;
  carMakeAndModel: string;
  policyExpiryDate: string;
  previousInsurer: string;
  claimedNcbPercentage: number;
  hasExistingClaim: boolean;
  onUpdate: (fields: {
    vehicleRegNumber?: string;
    carMakeAndModel?: string;
    policyExpiryDate?: string;
    previousInsurer?: string;
    claimedNcbPercentage?: number;
    hasExistingClaim?: boolean;
  }) => void;
  onProceed: () => void;
}

export default function QuickRenewalForm({
  vehicleRegNumber,
  carMakeAndModel,
  policyExpiryDate,
  previousInsurer,
  claimedNcbPercentage,
  hasExistingClaim,
  onUpdate,
  onProceed,
}: QuickRenewalFormProps) {
  const [errors, setErrors] = useState<{
    reg?: string;
    model?: string;
    expiry?: string;
  }>({});

  const handleRegChange = (val: string) => {
    const formatted = val.toUpperCase().replace(/[^A-Z0-9\s]/g, "");
    onUpdate({ vehicleRegNumber: formatted });
    if (errors.reg) setErrors((prev) => ({ ...prev, reg: undefined }));
  };

  const handlePresetExpiry = (daysFromToday: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    onUpdate({ policyExpiryDate: dateStr });
    if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: undefined }));
  };

  const handleClaimToggle = (hadClaim: boolean) => {
    onUpdate({
      hasExistingClaim: hadClaim,
      claimedNcbPercentage: hadClaim ? 0 : claimedNcbPercentage === 0 ? 20 : claimedNcbPercentage,
    });
  };

  const validateAndProceed = () => {
    const newErrors: { reg?: string; model?: string; expiry?: string } = {};

    if (!vehicleRegNumber || vehicleRegNumber.trim().length < 5) {
      newErrors.reg = "Please enter a valid car registration number (e.g. UP 32 AB 1234)";
    }

    if (!carMakeAndModel || carMakeAndModel.trim().length < 2) {
      newErrors.model = "Please select or enter your Maruti Suzuki car model";
    }

    if (!policyExpiryDate) {
      newErrors.expiry = "Please specify when your previous policy expires";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onProceed();
  };

  return (
    <div className="space-y-8">
      {/* Header Introduction */}
      <div className="border border-gray-200 bg-[#F9FAFB] p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#E31837] text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black uppercase tracking-wider text-[#111827]">
                Instant Motor Insurance Renewal
              </h2>
              <span className="bg-[#1B365D] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                Maruti Insurance Broking
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Renew your comprehensive policy with official cashless protection across Dev Motors and 4,500+ authorized Maruti Suzuki workshops nationwide. Enter your vehicle number below to get an instant renewal quote.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Vehicle & Reg Info */}
        <div className="space-y-5">
          {/* Reg Number Input */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5">
              Vehicle Registration Number (RTO) *
            </label>
            <div className="relative flex items-center h-14 border border-gray-300 bg-white">
              <div className="h-full w-12 bg-[#001E50] flex flex-col items-center justify-between py-1 px-1 text-white select-none shrink-0">
                <span className="text-[7px] text-yellow-300">★</span>
                <span className="text-[10px] font-black tracking-widest">IND</span>
              </div>
              <input
                type="text"
                value={vehicleRegNumber}
                onChange={(e) => handleRegChange(e.target.value)}
                placeholder="UP 32 AB 1234"
                className="w-full h-full bg-transparent px-3 text-lg font-mono font-black uppercase tracking-wider text-gray-900 focus:outline-none placeholder:text-gray-300"
              />
            </div>
            {errors.reg && <p className="text-xs text-red-600 mt-1">{errors.reg}</p>}
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5">
              Select Your Maruti Suzuki Model *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
              {POPULAR_MODELS.map((m) => (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => onUpdate({ carMakeAndModel: m.name })}
                  className={`p-2.5 border text-xs font-bold uppercase transition-all ${
                    carMakeAndModel === m.name
                      ? "border-[#E31837] bg-red-50/30 text-[#E31837]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
            {errors.model && <p className="text-xs text-red-600 mt-1">{errors.model}</p>}
          </div>

          {/* Previous Insurer */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5">
              Existing / Expiring Insurance Company
            </label>
            <select
              value={previousInsurer}
              onChange={(e) => onUpdate({ previousInsurer: e.target.value })}
              className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:border-black"
            >
              {PREVIOUS_INSURERS.map((ins) => (
                <option key={ins} value={ins}>
                  {ins}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column: Policy Expiry & NCB */}
        <div className="space-y-5">
          {/* Expiry Date */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5">
              Previous Policy Expiry Date *
            </label>
            <input
              type="date"
              value={policyExpiryDate}
              onChange={(e) => onUpdate({ policyExpiryDate: e.target.value })}
              className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
            />
            {errors.expiry && <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>}

            {/* Quick Expiry Presets */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                type="button"
                onClick={() => handlePresetExpiry(15)}
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                In 15 Days
              </button>
              <button
                type="button"
                onClick={() => handlePresetExpiry(30)}
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                In 30 Days
              </button>
              <button
                type="button"
                onClick={() => handlePresetExpiry(-10)}
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                Expired Recently
              </button>
            </div>
          </div>

          {/* Claims in Previous Year */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5">
              Did You Make Any Insurance Claim in the Previous Year?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleClaimToggle(false)}
                className={`py-2.5 px-3 border text-xs font-bold uppercase transition-all ${
                  !hasExistingClaim
                    ? "border-[#E31837] bg-red-50/30 text-[#E31837]"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                No Claim (Retain NCB)
              </button>
              <button
                type="button"
                onClick={() => handleClaimToggle(true)}
                className={`py-2.5 px-3 border text-xs font-bold uppercase transition-all ${
                  hasExistingClaim
                    ? "border-[#E31837] bg-red-50/30 text-[#E31837]"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Yes, Claim Made (NCB 0%)
              </button>
            </div>
          </div>

          {/* NCB Selector */}
          {!hasExistingClaim && (
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-1.5 flex items-center justify-between">
                <span>Existing No Claim Bonus (NCB) Discount</span>
                <span className="text-[#E31837] font-black">{claimedNcbPercentage}% Discount</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {NCB_SLABS.filter((s) => s.value > 0).map((slab) => (
                  <button
                    key={slab.value}
                    type="button"
                    onClick={() => onUpdate({ claimedNcbPercentage: slab.value })}
                    className={`p-2 border text-center transition-all ${
                      claimedNcbPercentage === slab.value
                        ? "border-[#1B365D] bg-blue-50/20 text-[#1B365D] font-black"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xs block">{slab.label.split(" ")[0]}</span>
                    <span className="text-[9px] text-gray-400 block">{slab.label.split(" ")[1]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cashless Claim Guarantee */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900 font-bold">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>100% Cashless Repairs at Dev Motors Lucknow Workshops</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={validateAndProceed}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#E31837] hover:bg-[#C8102E] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
        >
          <span>Configure Add-ons &amp; Zero-Dep</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
