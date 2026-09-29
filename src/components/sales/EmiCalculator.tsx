"use client";

import { useState, useMemo } from "react";
import { formatIndianPrice } from "@/components/sales/CarCard";
import {
  Percent,
  Calendar,
  Wallet,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface EmiCalculatorProps {
  carModelName: string;
  variantName: string;
  exShowroomPrice: number;
}

export default function EmiCalculator({
  carModelName,
  variantName,
  exShowroomPrice,
}: EmiCalculatorProps) {
  // Downpayment percentage (10% to 70%, defaults to 20%)
  const [downpaymentPercent, setDownpaymentPercent] = useState<number>(20);

  // Tenure in years (1 to 7 years)
  const [tenureYears, setTenureYears] = useState<number>(5);

  // Interest rate per annum (percentage)
  const [interestRate, setInterestRate] = useState<number>(8.5);

  // Loan computation formula:
  // EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
  const calculation = useMemo(() => {
    const validDownpayment = Math.round(
      exShowroomPrice * (downpaymentPercent / 100)
    );
    const principal = Math.max(0, exShowroomPrice - validDownpayment);
    const monthlyRate = interestRate / (12 * 100);
    const tenureMonths = tenureYears * 12;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = principal / tenureMonths;
    } else {
      emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    }

    const totalPayable = emi * tenureMonths;
    const totalInterest = Math.max(0, totalPayable - principal);

    const principalPercent = totalPayable > 0 ? (principal / totalPayable) * 100 : 0;
    const interestPercent = totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 0;

    return {
      principal,
      validDownpayment,
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
      tenureMonths,
      principalPercent,
      interestPercent,
    };
  }, [exShowroomPrice, downpaymentPercent, tenureYears, interestRate]);

  return (
    <div className="border border-gray-200 bg-white p-6 shadow-xs transition-all">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#1B365D] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
              SMART FINANCE
            </span>
            <span className="text-xs text-gray-500 font-semibold">Instant Bank Approval</span>
          </div>
          <h3 className="text-xl font-black uppercase text-[#111827] mt-1">
            EMI &amp; Downpayment Estimator
          </h3>
          <p className="text-xs text-gray-500">
            Computed for <strong className="text-gray-900">{carModelName} &bull; {variantName}</strong> ({formatIndianPrice(exShowroomPrice)}*)
          </p>
        </div>

        {/* Quick Rate Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 border border-emerald-200">
          <TrendingDown className="h-5 w-5 text-emerald-600" />
          <div>
            <div className="text-[9px] uppercase font-bold text-emerald-700 tracking-wider">
              Special Dealership Rate
            </div>
            <div className="text-xs font-black text-emerald-900">
              Starting from 8.5% p.a.
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls Left, Results Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Sliders & Inputs (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider 1: Downpayment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Wallet className="h-4 w-4 text-[#1B365D]" />
                <span>Downpayment ({downpaymentPercent}%)</span>
              </label>
              <span className="text-xs font-black text-gray-900">
                ₹{calculation.validDownpayment.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={70}
              step={5}
              value={downpaymentPercent}
              onChange={(e) => setDownpaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-[#E31837]"
            />

            <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
              <span>Min 10% ({formatIndianPrice(exShowroomPrice * 0.1)})</span>
              <span className="font-bold text-[#E31837]">
                {downpaymentPercent}% Down
              </span>
              <span>Max 70% ({formatIndianPrice(exShowroomPrice * 0.7)})</span>
            </div>
          </div>

          {/* Slider 2: Loan Tenure */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#E31837]" />
                <span>Loan Tenure ({tenureYears} Years / {calculation.tenureMonths} Months)</span>
              </label>
              <span className="text-xs font-black text-gray-900">
                {tenureYears} Years
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={7}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-[#E31837]"
            />

            <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
              <span>1 Year (12M)</span>
              <span className="font-bold text-[#E31837]">{tenureYears} Years</span>
              <span>7 Years (84M)</span>
            </div>
          </div>

          {/* Slider 3: Interest Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="h-4 w-4 text-emerald-600" />
                <span>Interest Rate (% per annum)</span>
              </label>
              <span className="text-xs font-black text-gray-900">
                {interestRate.toFixed(1)}% p.a.
              </span>
            </div>

            <input
              type="range"
              min={7.5}
              max={14}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-[#E31837]"
            />

            <div className="flex justify-between text-[10px] text-gray-400 font-semibold">
              <span>7.5% (Prime)</span>
              <span className="font-bold text-[#E31837]">{interestRate}%</span>
              <span>14.0%</span>
            </div>
          </div>
        </div>

        {/* Calculation Result Summary Card (Col 5) */}
        <div className="lg:col-span-5 bg-[#F9FAFB] border border-gray-200 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-8 h-0.5 bg-[#E31837]" />
            <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              Estimated Monthly EMI
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#E31837]">
              ₹{calculation.monthlyEmi.toLocaleString("en-IN")}
              <span className="text-xs font-bold text-gray-500"> / month*</span>
            </div>

            {/* Split Metrics */}
            <div className="space-y-2 border-t border-gray-200 pt-4 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Principal Loan Amount:</span>
                <span className="font-bold text-gray-900">
                  ₹{calculation.principal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Interest Payable:</span>
                <span className="font-bold text-gray-900">
                  ₹{calculation.totalInterest.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-gray-900 font-black border-t border-gray-200 pt-2">
                <span>Total Amount Payable:</span>
                <span>₹{calculation.totalPayable.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Zero Pre-Payment Charges Options with Partner Banks</span>
            </div>

            <a
              href="tel:+919876543210"
              className="block w-full text-center bg-[#C8102E] hover:bg-[#A80D26] text-white py-3 text-xs font-black uppercase tracking-wider transition-colors shadow-xs"
            >
              Apply For Instant Loan Approval
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
