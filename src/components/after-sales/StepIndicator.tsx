"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { step: 1, title: "Vehicle Details", description: "Reg No. or Model" },
  { step: 2, title: "Service & Pricing", description: "Packages & Add-ons" },
  { step: 3, title: "Mode & Time Slot", description: "Pickup / Workshop" },
  { step: 4, title: "Customer & Review", description: "Contact & Submit" },
];

export default function StepIndicator({
  currentStep,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="w-full pb-8">
      {/* Mobile Step Bar */}
      <div className="sm:hidden mb-4 bg-gray-50 p-3 border border-gray-200">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold uppercase tracking-wider text-gray-900">
            Step {currentStep} of 4: {STEPS[currentStep - 1]?.title}
          </span>
          <span className="text-[#E31837] font-black">
            {Math.round((currentStep / 4) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-[#E31837] transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Step Stepper */}
      <div className="hidden sm:grid grid-cols-4 gap-3 relative">
        {STEPS.map((s) => {
          const isCompleted = s.step < currentStep;
          const isCurrent = s.step === currentStep;
          const isPending = s.step > currentStep;

          return (
            <button
              key={s.step}
              type="button"
              disabled={isPending}
              onClick={() => onStepClick && isCompleted && onStepClick(s.step)}
              className={`text-left p-3.5 border transition-all relative ${
                isCurrent
                  ? "bg-red-50/40 border-[#E31837] shadow-xs"
                  : isCompleted
                  ? "bg-emerald-50/40 border-emerald-500 hover:bg-emerald-50 cursor-pointer"
                  : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center font-black text-xs transition-colors ${
                    isCurrent
                      ? "bg-[#E31837] text-white"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : s.step}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-xs font-black uppercase tracking-wider truncate ${
                      isCurrent
                        ? "text-[#E31837]"
                        : isCompleted
                        ? "text-emerald-900"
                        : "text-gray-700"
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate font-medium">
                    {s.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
