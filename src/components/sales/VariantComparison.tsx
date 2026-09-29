"use client";

import { CarVariantData } from "@/lib/types/sales";
import { formatIndianPrice } from "@/components/sales/CarCard";
import { Check, Fuel, Cog, Gauge, CalendarCheck } from "lucide-react";

interface VariantComparisonProps {
  variants: CarVariantData[];
  selectedVariant: CarVariantData;
  onSelectVariant: (variant: CarVariantData) => void;
  onBookTestDrive: (variantName: string) => void;
}

export default function VariantComparison({
  variants,
  selectedVariant,
  onSelectVariant,
  onBookTestDrive,
}: VariantComparisonProps) {
  return (
    <div className="border border-gray-200 bg-white p-6 shadow-xs transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#111827] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
              VARIANT MATRIX
            </span>
            <span className="text-xs text-gray-500 font-semibold">({variants.length} Trim Options Available)</span>
          </div>
          <h3 className="text-xl font-black uppercase text-[#111827] mt-1">
            Compare Specs &amp; Standard Features
          </h3>
          <p className="text-xs text-gray-500">
            Select any trim below to inspect its equipment sheet and synchronize the live EMI calculator.
          </p>
        </div>

        {/* Selected Variant Quick Badge */}
        <div className="flex items-center gap-4 bg-gray-50 p-3 border border-gray-200">
          <div>
            <div className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Active Selection</div>
            <div className="text-sm font-black text-[#E31837] uppercase">
              {selectedVariant.name}
            </div>
          </div>
          <div className="border-l border-gray-200 pl-4 text-right">
            <div className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Ex-Showroom</div>
            <div className="text-base font-black text-[#111827]">
              {formatIndianPrice(selectedVariant.exShowroomPrice)}*
            </div>
          </div>
        </div>
      </div>

      {/* Variant Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        {variants.map((variant) => {
          const isSelected = selectedVariant.name === variant.name;
          return (
            <button
              key={variant.name}
              onClick={() => onSelectVariant(variant)}
              className={`relative flex flex-col items-start p-4 text-left border transition-all cursor-pointer ${
                isSelected
                  ? "border-[#E31837] bg-red-50/20 shadow-xs"
                  : "border-gray-200 bg-gray-50 hover:bg-white"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center bg-[#E31837] text-white">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              )}
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                {variant.fuelType} • {variant.transmission}
              </span>
              <span className="text-sm font-black text-gray-900 uppercase mt-1">
                {variant.name}
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-base font-black text-[#111827]">
                  {formatIndianPrice(variant.exShowroomPrice)}*
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Ex-Showroom</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Side-by-Side Detailed Specs Matrix */}
      <div className="border border-gray-200 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F9FAFB] border-b border-gray-200 text-gray-700 uppercase font-black text-[10px] tracking-wider">
            <tr>
              <th className="p-3">Specification / Feature</th>
              {variants.map((v) => (
                <th
                  key={v.name}
                  className={`p-3 min-w-[160px] ${
                    selectedVariant.name === v.name ? "bg-red-50/50 text-[#E31837]" : ""
                  }`}
                >
                  {v.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-3 font-bold text-gray-900 flex items-center gap-1.5">
                <Fuel className="h-3.5 w-3.5 text-[#1B365D]" />
                <span>Fuel Type</span>
              </td>
              {variants.map((v) => (
                <td key={v.name} className="p-3 text-gray-700 uppercase font-semibold">
                  {v.fuelType}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-bold text-gray-900 flex items-center gap-1.5">
                <Cog className="h-3.5 w-3.5 text-[#E31837]" />
                <span>Transmission</span>
              </td>
              {variants.map((v) => (
                <td key={v.name} className="p-3 text-gray-700 uppercase font-semibold">
                  {v.transmission}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-bold text-gray-900 flex items-center gap-1.5">
                <Gauge className="h-3.5 w-3.5 text-emerald-600" />
                <span>Certified Mileage</span>
              </td>
              {variants.map((v) => (
                <td key={v.name} className="p-3 text-emerald-700 font-bold">
                  {v.mileage || "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-bold text-gray-900">Engine Displacement</td>
              {variants.map((v) => (
                <td key={v.name} className="p-3 text-gray-700">
                  {v.engineCapacityCc ? `${v.engineCapacityCc} cc` : "N/A"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-bold text-gray-900">Key Highlights</td>
              {variants.map((v) => (
                <td key={v.name} className="p-3 text-gray-600">
                  <ul className="space-y-1">
                    {v.keyFeatures && v.keyFeatures.length > 0 ? (
                      v.keyFeatures.map((f, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))
                    ) : (
                      <li>Standard OEM Trim Spec</li>
                    )}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-bold text-gray-900">Action</td>
              {variants.map((v) => (
                <td key={v.name} className="p-3">
                  <button
                    onClick={() => onBookTestDrive(v.name)}
                    className="w-full bg-[#E31837] hover:bg-[#C8102E] text-white py-2 px-3 text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <CalendarCheck className="h-3 w-3" />
                    <span>Test Drive</span>
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
