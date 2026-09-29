"use client";

import { Printer, X, ShieldCheck, CheckCircle2, Car } from "lucide-react";
import { PremiumBreakdown } from "@/lib/types/insurance";

interface PolicySummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  vehicleRegNumber: string;
  carMakeAndModel: string;
  policyExpiryDate: string;
  claimedNcbPercentage: number;
  selectedAddonTitles: string[];
  breakdown: PremiumBreakdown;
}

export default function PolicySummaryModal({
  isOpen,
  onClose,
  inquiryNumber,
  customerName,
  customerPhone,
  customerEmail,
  vehicleRegNumber,
  carMakeAndModel,
  policyExpiryDate,
  claimedNcbPercentage,
  selectedAddonTitles,
  breakdown,
}: PolicySummaryModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 my-8 overflow-hidden text-zinc-900 dark:text-white print:border-none print:shadow-none print:m-0 print:w-full print:max-w-none">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>Official Renewal Quotation Schedule</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div className="p-8 space-y-6 print:p-0">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-900 dark:border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                <Car className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight uppercase">DEV MOTORS</h1>
                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Authorized Maruti Suzuki Arena & Nexa Dealership
                </p>
                <p className="text-[10px] text-zinc-400">
                  Maruti Insurance Broking Private Limited • IRDAI Reg: DB 120/02
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block rounded-md bg-blue-100 dark:bg-blue-950 px-2 py-0.5 text-[11px] font-mono font-bold text-blue-800 dark:text-blue-300">
                REF: {inquiryNumber}
              </span>
              <p className="text-[11px] text-zinc-500 mt-1">
                Generated: {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
              </p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase">
                Status: Pre-Approved & Locked
              </p>
            </div>
          </div>

          {/* Policyholder & Vehicle Meta Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs">
            {/* Column 1: Policyholder Info */}
            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-zinc-500 text-[10px]">
                Policyholder Information
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Name:</span>
                  <span className="font-bold">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Mobile Phone:</span>
                  <span className="font-mono font-semibold">+91 {customerPhone}</span>
                </div>
                {customerEmail && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Email:</span>
                    <span>{customerEmail}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-500">Service Network:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">Dev Motors Cashless</span>
                </div>
              </div>
            </div>

            {/* Column 2: Vehicle & Risk Details */}
            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-zinc-500 text-[10px]">
                Vehicle & Insurance Risk Details
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Registration Number:</span>
                  <span className="font-mono font-bold uppercase">{vehicleRegNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Car Make & Model:</span>
                  <span className="font-bold">{carMakeAndModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Insured Declared Value (IDV):</span>
                  <span className="font-mono font-bold text-blue-600">
                    ₹{breakdown.idv.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">NCB Benefit Applied:</span>
                  <span className="font-bold text-emerald-600">
                    {claimedNcbPercentage}% (-₹{breakdown.ncbDiscountAmount.toLocaleString("en-IN")})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Previous Expiry Date:</span>
                  <span className="font-medium">{policyExpiryDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add-on Covers Schedule */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-zinc-900 dark:text-white text-xs mb-2">
              Endorsed Add-on Covers & Protective Riders
            </h4>
            {selectedAddonTitles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedAddonTitles.map((addonTitle, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">{addonTitle}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500 italic p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800">
                Standard Comprehensive Policy without additional add-on endorsements.
              </p>
            )}
          </div>

          {/* Itemized Premium Table */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-100 dark:bg-zinc-800 font-bold uppercase text-[10px] text-zinc-600 dark:text-zinc-300">
                <tr>
                  <th className="p-3">Coverage Description</th>
                  <th className="p-3 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-3">
                    <span className="font-medium">Basic Own Damage (OD) Cover</span>
                    <span className="block text-[10px] text-zinc-400">Assessed on vehicle IDV of ₹{breakdown.idv.toLocaleString("en-IN")}</span>
                  </td>
                  <td className="p-3 text-right font-mono">₹{breakdown.baseOdPremium.toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400">
                    <span className="font-medium">Less: No Claim Bonus (NCB) Discount ({breakdown.ncbDiscountPercentage}%)</span>
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    -₹{breakdown.ncbDiscountAmount.toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr>
                  <td className="p-3">
                    <span className="font-medium">Net Own Damage Premium</span>
                  </td>
                  <td className="p-3 text-right font-mono font-medium">₹{breakdown.netOdPremium.toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td className="p-3">
                    <span className="font-medium">Mandatory Third-Party Liability Premium</span>
                    <span className="block text-[10px] text-zinc-400">IRDAI Fixed Statutory Rate</span>
                  </td>
                  <td className="p-3 text-right font-mono">₹{breakdown.tpMandatedPremium.toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td className="p-3">
                    <span className="font-medium">Selected Add-On Endorsements</span>
                    <span className="block text-[10px] text-zinc-400">{selectedAddonTitles.length} add-on riders</span>
                  </td>
                  <td className="p-3 text-right font-mono font-medium text-blue-600">
                    +₹{breakdown.addonsPremium.toLocaleString("en-IN")}
                  </td>
                </tr>
                <tr className="bg-zinc-50 dark:bg-zinc-800/40 font-semibold">
                  <td className="p-3">Net Premium Before Taxes</td>
                  <td className="p-3 text-right font-mono">₹{breakdown.subtotal.toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td className="p-3">
                    <span>Applicable GST (CGST 9% + SGST 9%)</span>
                  </td>
                  <td className="p-3 text-right font-mono">₹{breakdown.gstAmount.toLocaleString("en-IN")}</td>
                </tr>
                <tr className="bg-blue-600 text-white font-black text-sm">
                  <td className="p-3.5">TOTAL ANNUAL RENEWAL PREMIUM</td>
                  <td className="p-3.5 text-right font-mono text-base">
                    ₹{breakdown.totalPayable.toLocaleString("en-IN")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Official Footnotes & Seal */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] text-zinc-500">
            <div className="space-y-1">
              <p>• Premium rates valid for 15 days from issuance date.</p>
              <p>• Cashless claim settlement honored across all Dev Motors workshops in Uttar Pradesh.</p>
              <p>• Final policy certificate generated immediately upon online payment or dealership deposit.</p>
            </div>

            <div className="text-right">
              <div className="border border-blue-600/40 rounded-xl px-4 py-2 bg-blue-50/50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-bold">
                DEV MOTORS MARUTI INSURANCE BROKING DESK
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
