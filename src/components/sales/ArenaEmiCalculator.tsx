"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface ArenaEmiCalculatorProps {
  exShowroomPrice: number;
  carName: string;
  variantName?: string;
  onBookTestDrive?: () => void;
}

export default function ArenaEmiCalculator({
  exShowroomPrice,
  carName,
  variantName,
  onBookTestDrive,
}: ArenaEmiCalculatorProps) {
  // Estimated On-Road multiplier (~12% for RTO, Insurance, TCS & Registration in UP/India)
  const estimatedOnRoadPrice = Math.round(exShowroomPrice * 1.135);

  // Default down payment is 20%
  const defaultDownPayment = Math.round(estimatedOnRoadPrice * 0.2);
  const minDownPayment = Math.round(estimatedOnRoadPrice * 0.1);
  const maxDownPayment = Math.round(estimatedOnRoadPrice * 0.6);

  const [downPayment, setDownPayment] = useState<number>(defaultDownPayment);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(8.75); // Standard Maruti Suzuki Finance / SBI Car Loan

  // Calculation Logic
  const principal = Math.max(0, estimatedOnRoadPrice - downPayment);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const monthlyEmi =
    principal > 0 && monthlyRate > 0
      ? Math.round(
          (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const totalAmountPayable = monthlyEmi * totalMonths;
  const totalInterest = Math.max(0, totalAmountPayable - principal);
  const downPaymentPercent = Math.round((downPayment / estimatedOnRoadPrice) * 100);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-none p-6 sm:p-8">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-3 bg-[#E31837]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4B5563]">
              MARUTI SUZUKI FINANCE • EMI SIMULATOR
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight mt-1">
            Smart Finance EMI & Downpayment Calculator
          </h3>
          <p className="text-xs text-[#4B5563] mt-0.5">
            Configure your monthly installment tailored for {carName} {variantName ? `(${variantName})` : ""}.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
            ESTIMATED ON-ROAD PRICE
          </span>
          <span className="text-lg font-black text-[#111827] font-mono">
            ₹ {estimatedOnRoadPrice.toLocaleString("en-IN")}*
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Down Payment Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                Down Payment Amount ({downPaymentPercent}%)
              </label>
              <div className="text-sm font-black font-mono text-[#E31837]">
                ₹ {downPayment.toLocaleString("en-IN")}
              </div>
            </div>

            <input
              type="range"
              min={minDownPayment}
              max={maxDownPayment}
              step={5000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-1.5 bg-[#E5E7EB] rounded-none appearance-none cursor-pointer accent-[#E31837]"
            />

            <div className="flex justify-between text-[10px] font-mono text-[#6B7280]">
              <span>Min: ₹ {minDownPayment.toLocaleString("en-IN")} (10%)</span>
              <span>Max: ₹ {maxDownPayment.toLocaleString("en-IN")} (60%)</span>
            </div>
          </div>

          {/* Loan Tenure Selector (1 to 7 Years) */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                Loan Tenure (Duration)
              </label>
              <span className="text-xs font-bold font-mono text-[#111827]">
                {tenureYears} Years ({totalMonths} Months)
              </span>
            </div>

            {/* Sharp Segmented Tenure Buttons */}
            <div className="grid grid-cols-7 gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((yr) => {
                const isSelected = tenureYears === yr;
                return (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setTenureYears(yr)}
                    className={`py-2 text-xs font-bold border transition-colors ${
                      isSelected
                        ? "bg-[#111827] text-white border-[#111827]"
                        : "bg-[#F4F5F7] text-[#374151] border-[#E5E7EB] hover:bg-[#E5E7EB]"
                    }`}
                  >
                    {yr}Y
                  </button>
                );
              })}
            </div>
          </div>

          {/* Annual Interest Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                Annual Interest Rate (% p.a.)
              </label>
              <span className="text-xs font-black font-mono text-[#111827]">
                {interestRate.toFixed(2)}%
              </span>
            </div>

            <input
              type="range"
              min={7.5}
              max={14.0}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1.5 bg-[#E5E7EB] rounded-none appearance-none cursor-pointer accent-[#E31837]"
            />

            <div className="flex justify-between text-[10px] font-mono text-[#6B7280]">
              <span>7.50% (Special Festive Offer)</span>
              <span>8.75% (Market Benchmark)</span>
              <span>14.00%</span>
            </div>
          </div>

          {/* Partner Financers Strip */}
          <div className="p-3 bg-[#F4F5F7] border border-[#E5E7EB] text-[11px] text-[#4B5563] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-bold uppercase text-[10px] text-[#111827]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#059669]" />
              <span>Sanction Partners:</span>
            </div>
            <span className="font-semibold">SBI Car Loan</span>
            <span>•</span>
            <span className="font-semibold">HDFC Bank</span>
            <span>•</span>
            <span className="font-semibold">ICICI Bank</span>
            <span>•</span>
            <span className="font-semibold">Maruti Suzuki Smart Finance</span>
          </div>
        </div>

        {/* Right Column: Light-Gray Structured Quotation Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#F4F5F7] border border-[#E5E7EB] p-6 space-y-5">
          <div className="border-b border-[#E5E7EB] pb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#4B5563] block">
              INDICATIVE FINANCING SCHEDULE
            </span>
            <span className="text-xs font-bold text-[#111827] uppercase">
              Official Dealer Quotation
            </span>
          </div>

          {/* Big Monthly EMI Display */}
          <div className="bg-white border border-[#E5E7EB] p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
              ESTIMATED MONTHLY INSTALLMENT (EMI)
            </span>
            <div className="text-3xl font-black text-[#E31837] font-mono tracking-tight mt-1">
              ₹ {monthlyEmi.toLocaleString("en-IN")}
              <span className="text-xs text-[#6B7280] font-sans font-medium"> / mo*</span>
            </div>
            <span className="text-[10px] text-[#059669] font-bold uppercase block mt-1">
              Zero Foreclosure Charges Available
            </span>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-2 text-xs divide-y divide-[#E5E7EB]">
            <div className="flex justify-between py-1 text-[#4B5563]">
              <span>Principal Loan Amount:</span>
              <span className="font-mono font-semibold text-[#111827]">
                ₹ {principal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between py-1 text-[#4B5563]">
              <span>Down Payment Paid:</span>
              <span className="font-mono font-semibold text-[#111827]">
                ₹ {downPayment.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between py-1 text-[#4B5563]">
              <span>Total Interest Payable ({tenureYears} Yrs):</span>
              <span className="font-mono font-semibold text-[#111827]">
                ₹ {totalInterest.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between py-1.5 font-bold text-[#111827] border-t-2 border-[#111827]">
              <span>Total Amount Paid (Loan + Interest):</span>
              <span className="font-mono text-sm">
                ₹ {totalAmountPayable.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Rectangular Action Button */}
          <button
            type="button"
            onClick={onBookTestDrive}
            className="w-full flex items-center justify-center gap-2 bg-[#E31837] text-white py-3.5 text-xs font-black uppercase tracking-wider hover:bg-[#C8102E] active:bg-[#A80D26] transition-colors rounded-none"
          >
            <span>Book Test Drive With This Plan</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-[10px] text-[#6B7280] leading-relaxed">
            *Disclaimer: The EMI shown is indicative and calculated at an assumed rate of {interestRate}% p.a. for {tenureYears} years. Final approval, processing fees, documentation charges, and loan-to-value (LTV) limits are subject to bank/financier sole discretion.
          </p>
        </div>
      </div>
    </div>
  );
}
