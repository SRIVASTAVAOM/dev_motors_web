"use client";

import { useState } from "react";
import {
  CheckCircle,
  Copy,
  Check,
  ShieldCheck,
  Download,
  PhoneCall,
  MessageSquare,
  FileText,
  CreditCard,
  RotateCcw,
} from "lucide-react";
import { InsuranceInquiryResult, PremiumBreakdown } from "@/lib/types/insurance";
import PolicySummaryModal from "./PolicySummaryModal";

interface InsuranceConfirmationCardProps {
  result: InsuranceInquiryResult;
  breakdown: PremiumBreakdown;
  selectedAddonTitles: string[];
  customerEmail?: string;
  onReset: () => void;
}

export default function InsuranceConfirmationCard({
  result,
  breakdown,
  selectedAddonTitles,
  customerEmail,
  onReset,
}: InsuranceConfirmationCardProps) {
  const [copied, setCopied] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [paymentLinkSent, setPaymentLinkSent] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);

  const details = result.details;
  const inquiryNumber = result.inquiryNumber || details?.inquiryNumber || "DM-INS-2026";
  const customerPhone = details?.customerPhone || "9876543210";
  const customerName = details?.customerName || "Valued Customer";
  const vehicleReg = details?.vehicleRegNumber || "UP 32 AB 1234";
  const carModel = details?.carMakeAndModel || "Maruti Suzuki";
  const quotedAmount = details?.quotedAmount || breakdown.totalPayable;

  const handleCopyId = () => {
    navigator.clipboard.writeText(inquiryNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendPaymentLink = () => {
    setPaymentLinkSent(true);
  };

  const handleRequestCallback = () => {
    setCallbackRequested(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* 1. Top Success Hero Banner */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-zinc-900 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-xl mb-4">
          <CheckCircle className="h-9 w-9 stroke-[2.5]" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200 mb-2 backdrop-blur-md">
          MARUTI SUZUKI AUTHORIZED RENEWAL
        </div>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          Insurance Renewal Quote Locked!
        </h2>
        <p className="text-sm text-blue-100 mt-2 max-w-lg mx-auto">
          Thank you, <span className="font-semibold text-white">{customerName}</span>. Your guaranteed renewal quotation has been generated and locked in the Maruti Insurance Broking system.
        </p>

        {/* Locked Quote Reference Number */}
        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-2.5 backdrop-blur-md border border-white/20">
          <span className="text-xs text-blue-200">Quotation Reference ID:</span>
          <span className="font-mono text-base font-extrabold tracking-wider text-white">
            {inquiryNumber}
          </span>
          <button
            onClick={handleCopyId}
            className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
            title="Copy Reference ID"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* 2. Key Action CTAs: Payment Callback vs Download Policy Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 1: Payment Callback / Instant WhatsApp Pay */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <CreditCard className="h-4 w-4" />
              <span>Instant Policy Payment</span>
            </div>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
              Initiate Payment Callback
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Pay securely via UPI, NetBanking or Credit Card. Once paid, your valid digitally signed insurance policy certificate is issued within 3 minutes.
            </p>
          </div>

          {paymentLinkSent ? (
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-4 border border-emerald-200 dark:border-emerald-900 space-y-2 text-xs text-emerald-900 dark:text-emerald-100">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Payment Link Dispatched!</span>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                A secure payment link of <strong>₹{quotedAmount.toLocaleString("en-IN")}</strong> has been sent to <strong>+91 {customerPhone}</strong> via WhatsApp & SMS.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSendPaymentLink}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Send WhatsApp Payment Link</span>
              </button>

              {!callbackRequested ? (
                <button
                  type="button"
                  onClick={handleRequestCallback}
                  className="w-full flex items-center justify-center gap-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-blue-600" />
                  <span>Request Advisor Callback</span>
                </button>
              ) : (
                <p className="text-[11px] text-center text-blue-600 dark:text-blue-400 font-medium py-1">
                  ✓ Priority callback registered. An agent will call +91 {customerPhone} shortly.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Option 2: Download Policy Summary */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <FileText className="h-4 w-4" />
              <span>Official Schedule</span>
            </div>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
              Download Policy Summary
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              View, print or download your detailed policy quotation schedule with itemized premium schedule, IDV, and authorized Dev Motors dealership endorsement.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSummaryModal(true)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Download className="h-4 w-4" />
            <span>View & Download Policy Summary</span>
          </button>
        </div>
      </div>

      {/* 3. Dealership Coverage Details Card */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          Locked Policy Specifications
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Vehicle</span>
            <div className="font-mono text-sm font-bold text-zinc-900 dark:text-white mt-0.5">
              {vehicleReg}
            </div>
            <div className="text-[11px] text-zinc-500">{carModel}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Insured Value (IDV)</span>
            <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">
              ₹{breakdown.idv.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-zinc-500">Market Value</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">No Claim Bonus</span>
            <div className="text-sm font-bold text-emerald-600 mt-0.5">
              {breakdown.ncbDiscountPercentage}%
            </div>
            <div className="text-[11px] text-zinc-500">
              -₹{breakdown.ncbDiscountAmount.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-400 uppercase font-bold">Annual Premium</span>
            <div className="text-sm font-black text-zinc-900 dark:text-white mt-0.5">
              ₹{quotedAmount.toLocaleString("en-IN")}
            </div>
            <div className="text-[10px] text-zinc-400">Incl. 18% GST</div>
          </div>
        </div>

        {/* Addons preview */}
        {selectedAddonTitles.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">
              Endorsed Add-ons:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedAddonTitles.map((title, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                  <span>{title}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Support Hotline & Reset Options */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <a
          href="tel:+919876543210"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-blue-600"
        >
          <PhoneCall className="h-4 w-4 text-blue-600" />
          <span>Have questions? Call Dev Motors Insurance Desk: +91 98765 43210</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Renew Another Vehicle</span>
        </button>
      </div>

      {/* Printable Modal */}
      <PolicySummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        inquiryNumber={inquiryNumber}
        customerName={customerName}
        customerPhone={customerPhone}
        customerEmail={customerEmail}
        vehicleRegNumber={vehicleReg}
        carMakeAndModel={carModel}
        policyExpiryDate={details?.policyExpiryDate || "2026-10-15"}
        claimedNcbPercentage={details?.ncbPercentage || breakdown.ncbDiscountPercentage}
        selectedAddonTitles={selectedAddonTitles}
        breakdown={breakdown}
      />
    </div>
  );
}
