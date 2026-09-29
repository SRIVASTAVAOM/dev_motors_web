"use client";

import {
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  Info,
} from "lucide-react";
import {
  ServiceTypeKey,
  SERVICE_PACKAGES,
  SERVICE_ADDONS,
} from "@/lib/types/service";

interface StepServiceTypeProps {
  serviceType: ServiceTypeKey;
  additionalServices: string[];
  estimatedPrice: number;
  onUpdate: (data: {
    serviceType?: ServiceTypeKey;
    additionalServices?: string[];
    estimatedPrice?: number;
  }) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepServiceType({
  serviceType,
  additionalServices,
  onUpdate,
  onNext,
  onBack,
}: StepServiceTypeProps) {
  const currentPackage =
    SERVICE_PACKAGES.find((p) => p.id === serviceType) || SERVICE_PACKAGES[0];

  // Helper to recalculate total
  const computePrice = (pkgId: ServiceTypeKey, addons: string[]) => {
    const pkg = SERVICE_PACKAGES.find((p) => p.id === pkgId) || SERVICE_PACKAGES[0];
    const addonsTotal = addons.reduce((sum, addonId) => {
      const match = SERVICE_ADDONS.find((a) => a.id === addonId);
      return sum + (match ? match.price : 0);
    }, 0);
    const subtotal = pkg.basePrice + addonsTotal;
    const gst = Math.round(subtotal * 0.18);
    return subtotal + gst;
  };

  const handleSelectPackage = (id: ServiceTypeKey) => {
    const newTotal = computePrice(id, additionalServices);
    onUpdate({ serviceType: id, estimatedPrice: newTotal });
  };

  const toggleAddon = (addonId: string) => {
    const nextAddons = additionalServices.includes(addonId)
      ? additionalServices.filter((id) => id !== addonId)
      : [...additionalServices, addonId];
    const newTotal = computePrice(serviceType, nextAddons);
    onUpdate({ additionalServices: nextAddons, estimatedPrice: newTotal });
  };

  // Base and taxes breakdown for the display
  const basePrice = currentPackage.basePrice;
  const addonsTotal = additionalServices.reduce((sum, addonId) => {
    const match = SERVICE_ADDONS.find((a) => a.id === addonId);
    return sum + (match ? match.price : 0);
  }, 0);
  const subtotal = basePrice + addonsTotal;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="w-10 h-0.5 bg-[#E31837] mb-2" />
        <h2 className="text-xl font-black uppercase tracking-tight text-[#111827]">
          Step 2: Choose Service Type &amp; Add-ons
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Select authorized Maruti Suzuki factory service packages with transparent MGP parts and labor pricing.
        </p>
      </div>

      {/* 4 Core Service Cards */}
      <div>
        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-3">
          Select Primary Service Package *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICE_PACKAGES.map((pkg) => {
            const isSelected = serviceType === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() => handleSelectPackage(pkg.id)}
                className={`relative flex flex-col justify-between p-5 border cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? "bg-red-50/20 border-[#E31837] shadow-xs"
                    : "bg-white border-gray-200 hover:border-gray-400"
                }`}
              >
                {/* Badge top-right */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-black tracking-widest uppercase ${
                      pkg.popular
                        ? "bg-[#E31837] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {pkg.popular && <Sparkles className="h-3 w-3" />}
                    {pkg.badge}
                  </span>

                  <div className="flex items-center gap-1 text-[11px] text-gray-500 font-semibold">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span>{pkg.estimatedDuration}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-base font-black uppercase text-gray-900 flex items-center justify-between">
                    <span>{pkg.title}</span>
                    <span className="text-base font-black text-[#E31837]">
                      ₹{pkg.basePrice.toLocaleString("en-IN")}*
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 mb-4 leading-relaxed font-normal">
                    {pkg.subtitle}
                  </p>

                  {/* Feature checklist */}
                  <ul className="space-y-1.5 border-t border-gray-100 pt-3">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-700"
                      >
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Selection Indicator */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    {isSelected ? "Selected Service" : "Click to Select"}
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

      {/* Add-on Services Checklist */}
      <div>
        <label className="block text-[10px] font-black uppercase tracking-wider text-gray-700 mb-3">
          Recommended Value Add-ons
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICE_ADDONS.map((addon) => {
            const isChecked = additionalServices.includes(addon.id);

            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`p-3.5 border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isChecked
                    ? "bg-red-50/20 border-[#E31837]"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black uppercase text-gray-900">
                    {addon.name}
                  </h4>
                  <p className="text-[11px] text-gray-500">{addon.description}</p>
                  <span className="text-xs font-bold text-[#E31837] block mt-1">
                    +₹{addon.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div
                  className={`h-4 w-4 shrink-0 border flex items-center justify-center transition-colors ${
                    isChecked
                      ? "border-[#E31837] bg-[#E31837] text-white"
                      : "border-gray-300"
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instant Tentative Pricing Card */}
      <div className="border border-gray-200 bg-[#F9FAFB] p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">
              Estimated Service Total
            </span>
            <span className="text-2xl font-black text-[#E31837]">
              ₹{total.toLocaleString("en-IN")}*
            </span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
            Tentative Estimate
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Primary Package Base Price:</span>
            <span className="font-bold text-gray-900">₹{basePrice.toLocaleString("en-IN")}</span>
          </div>
          {addonsTotal > 0 && (
            <div className="flex justify-between text-blue-600">
              <span>Selected Add-ons Total:</span>
              <span className="font-bold">+₹{addonsTotal.toLocaleString("en-IN")}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Applicable GST (18%):</span>
            <span className="font-bold text-gray-900">₹{gst.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 pt-2 border-t border-gray-200">
          <Info className="h-3 w-3 text-gray-400 shrink-0" />
          <span>Final invoice generated after digital vehicle inspection at Dev Motors workshop.</span>
        </div>
      </div>

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
          onClick={onNext}
          className="flex items-center gap-1.5 px-6 py-3 bg-[#E31837] hover:bg-[#C8102E] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
        >
          <span>Continue to Step 3</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
