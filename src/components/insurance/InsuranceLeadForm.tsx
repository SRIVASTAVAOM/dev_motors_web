"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  Lock,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { INSURANCE_ADDONS, PremiumBreakdown } from "@/lib/types/insurance";

interface InsuranceLeadFormProps {
  vehicleRegNumber: string;
  carMakeAndModel: string;
  policyExpiryDate: string;
  claimedNcbPercentage: number;
  selectedAddonIds: string[];
  breakdown: PremiumBreakdown;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  previousPolicyNumber: string;
  communicationChannel: "WHATSAPP" | "PHONE_CALL" | "EMAIL";
  agentNotes: string;
  isSubmitting: boolean;
  fieldErrors?: Record<string, string[]>;
  serverError?: string | null;
  onUpdate: (fields: {
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    previousPolicyNumber?: string;
    communicationChannel?: "WHATSAPP" | "PHONE_CALL" | "EMAIL";
    agentNotes?: string;
  }) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function InsuranceLeadForm({
  vehicleRegNumber,
  carMakeAndModel,
  policyExpiryDate,
  claimedNcbPercentage,
  selectedAddonIds,
  breakdown,
  customerName,
  customerPhone,
  customerEmail,
  previousPolicyNumber,
  communicationChannel,
  agentNotes,
  isSubmitting,
  fieldErrors,
  serverError,
  onUpdate,
  onSubmit,
  onBack,
}: InsuranceLeadFormProps) {
  const [localErrors, setLocalErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});

  const handlePhoneChange = (val: string) => {
    // Keep only numbers up to 10 digits
    const cleaned = val.replace(/\D/g, "").slice(0, 10);
    onUpdate({ customerPhone: cleaned });
    if (localErrors.phone) setLocalErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; phone?: string; email?: string } = {};

    if (!customerName || customerName.trim().length < 2) {
      errs.name = "Please enter policyholder's full name";
    }

    const cleanPhone = customerPhone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      errs.phone = "Please enter a valid 10-digit mobile number";
    }

    if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      errs.email = "Please enter a valid email address";
    }

    if (Object.keys(errs).length > 0) {
      setLocalErrors(errs);
      return;
    }

    setLocalErrors({});
    onSubmit();
  };

  const selectedAddonNames = selectedAddonIds.map((id) => {
    const match = INSURANCE_ADDONS.find((a) => a.id === id);
    return match ? match.name : id;
  });

  return (
    <form onSubmit={validateAndSubmit} className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-blue-950/40 dark:to-zinc-900 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Lock Your Dev Motors Renewal Quote
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Provide policyholder contact details to lock this premium and receive your downloadable policy summary & payment link.
            </p>
          </div>
        </div>
      </div>

      {serverError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Policyholder Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Policyholder Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  onUpdate({ customerName: e.target.value });
                  if (localErrors.name) setLocalErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="e.g. Ramesh Kumar Verma"
                className={`w-full rounded-2xl border ${
                  localErrors.name || fieldErrors?.customerName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500"
                } bg-white dark:bg-zinc-900 py-3.5 pl-10 pr-4 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2`}
              />
            </div>
            {(localErrors.name || fieldErrors?.customerName?.[0]) && (
              <p className="mt-1.5 text-xs text-red-500">
                {localErrors.name || fieldErrors?.customerName?.[0]}
              </p>
            )}
          </div>

          {/* Mobile Number & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                  <span className="text-xs font-bold text-zinc-500">+91</span>
                </div>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="98765 43210"
                  className={`w-full rounded-2xl border ${
                    localErrors.phone || fieldErrors?.customerPhone
                      ? "border-red-500 focus:ring-red-500"
                      : "border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500"
                  } bg-white dark:bg-zinc-900 py-3.5 pl-12 pr-4 text-sm font-mono font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2`}
                />
              </div>
              {(localErrors.phone || fieldErrors?.customerPhone?.[0]) && (
                <p className="mt-1.5 text-xs text-red-500">
                  {localErrors.phone || fieldErrors?.customerPhone?.[0]}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
                Email Address <span className="text-zinc-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => {
                    onUpdate({ customerEmail: e.target.value });
                    if (localErrors.email) setLocalErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="ramesh@example.com"
                  className={`w-full rounded-2xl border ${
                    localErrors.email || fieldErrors?.customerEmail
                      ? "border-red-500 focus:ring-red-500"
                      : "border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500"
                  } bg-white dark:bg-zinc-900 py-3.5 pl-10 pr-4 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2`}
                />
              </div>
              {(localErrors.email || fieldErrors?.customerEmail?.[0]) && (
                <p className="mt-1.5 text-xs text-red-500">
                  {localErrors.email || fieldErrors?.customerEmail?.[0]}
                </p>
              )}
            </div>
          </div>

          {/* Preferred Communication Channel */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Preferred Mode for Quote & Payment Link
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "WHATSAPP",
                  label: "WhatsApp",
                  sub: "Instant PDF & Pay Link",
                  icon: MessageSquare,
                  badge: "FASTEST",
                },
                {
                  id: "PHONE_CALL",
                  label: "Phone Call",
                  sub: "Insurance Specialist",
                  icon: Phone,
                },
                {
                  id: "EMAIL",
                  label: "Email",
                  sub: "Detailed Quotation",
                  icon: Mail,
                },
              ].map((channel) => {
                const isSelected = communicationChannel === channel.id;
                const IconComponent = channel.icon;

                return (
                  <button
                    key={channel.id}
                    type="button"
                    onClick={() =>
                      onUpdate({
                        communicationChannel: channel.id as "WHATSAPP" | "PHONE_CALL" | "EMAIL",
                      })
                    }
                    className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-2 ring-blue-500/20 shadow-sm"
                        : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                      {channel.badge && (
                        <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
                          {channel.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold">{channel.label}</span>
                    <span className="text-[10px] text-zinc-500">{channel.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Previous Policy Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Existing Policy Number <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={previousPolicyNumber}
              onChange={(e) => onUpdate({ previousPolicyNumber: e.target.value })}
              placeholder="e.g. 2311/01293812/00/000"
              className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-3 px-4 text-sm font-mono text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-[11px] text-zinc-500">
              Found on your current policy schedule or vehicle RC cover.
            </p>
          </div>

          {/* Optional Agent Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Special Instructions or Cover Questions <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={agentNotes}
              onChange={(e) => onUpdate({ agentNotes: e.target.value })}
              placeholder="e.g., Please also verify if CNG kit endorsement is included or clarify towing radius."
              className="w-full rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Column: Quote Summary Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xl space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Summary of Cover
              </span>
              <h4 className="text-base font-black text-zinc-900 dark:text-white">
                Review Your Package
              </h4>
            </div>

            <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 p-4 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Vehicle:</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  {vehicleRegNumber}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Model:</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {carMakeAndModel}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Expiry Date:</span>
                <span className="font-medium text-zinc-900 dark:text-white">
                  {policyExpiryDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Insured Value (IDV):</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  ₹{breakdown.idv.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Claimed NCB:</span>
                <span className="font-bold text-emerald-600">
                  {claimedNcbPercentage}% (-₹{breakdown.ncbDiscountAmount.toLocaleString("en-IN")})
                </span>
              </div>
            </div>

            {/* Addons selected list */}
            <div>
              <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                Add-on Covers Included ({selectedAddonIds.length}):
              </div>
              {selectedAddonNames.length > 0 ? (
                <div className="space-y-1.5">
                  {selectedAddonNames.map((name, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-400 italic">
                  Standard Comprehensive (No add-ons selected)
                </p>
              )}
            </div>

            {/* Price Box */}
            <div className="rounded-2xl bg-zinc-900 text-white p-4 space-y-2">
              <div className="flex justify-between items-baseline text-xs text-zinc-400">
                <span>Final Annual Premium</span>
                <span className="text-[10px] text-zinc-400">Incl. 18% GST</span>
              </div>
              <div className="text-2xl font-black text-white">
                ₹{breakdown.totalPayable.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Locking Quote & Generating Policy...</span>
                  </>
                ) : (
                  <>
                    <span>Lock Quote & Issue Summary</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 py-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Add-ons</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
