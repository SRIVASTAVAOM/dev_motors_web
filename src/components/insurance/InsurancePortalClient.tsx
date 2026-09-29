"use client";

import { useState } from "react";
import QuickRenewalForm from "./QuickRenewalForm";
import AddonCustomizer from "./AddonCustomizer";
import InsuranceLeadForm from "./InsuranceLeadForm";
import InsuranceConfirmationCard from "./InsuranceConfirmationCard";
import {
  INSURANCE_ADDONS,
  InsuranceInquiryResult,
  PremiumBreakdown,
} from "@/lib/types/insurance";
import { calculateInsurancePremium } from "@/lib/insurance-calculator";
import { submitInsuranceRenewal } from "@/app/actions/insurance";
import {
  Car,
  ShieldCheck,
  User,
  CheckCircle2,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Vehicle & Expiry", icon: Car },
  { id: 2, label: "Add-on Customizer", icon: ShieldCheck },
  { id: 3, label: "Policyholder Details", icon: User },
  { id: 4, label: "Locked Quote", icon: CheckCircle2 },
];

export default function InsurancePortalClient() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | undefined>(undefined);
  const [inquiryResult, setInquiryResult] = useState<InsuranceInquiryResult | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    vehicleRegNumber: "UP 32 AB 1234",
    carMakeAndModel: "Grand Vitara",
    policyExpiryDate: "2026-10-15",
    previousInsurer: "Maruti Insurance Broking",
    claimedNcbPercentage: 20,
    hasExistingClaim: false,
    selectedAddonIds: ["zero-dep", "engine-protect", "consumables"] as string[],
    customIdv: 1380000,

    customerName: "",
    customerPhone: "",
    customerEmail: "",
    previousPolicyNumber: "",
    communicationChannel: "WHATSAPP" as "WHATSAPP" | "PHONE_CALL" | "EMAIL",
    agentNotes: "",
  });

  const updateFormData = (fields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  // Recalculate dynamic premium
  const breakdown: PremiumBreakdown = calculateInsurancePremium(
    formData.carMakeAndModel,
    formData.claimedNcbPercentage,
    formData.selectedAddonIds,
    formData.customIdv
  );

  const selectedAddonTitles = formData.selectedAddonIds.map((id) => {
    const match = INSURANCE_ADDONS.find((a) => a.id === id);
    return match ? match.name : id;
  });

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmitLead = async () => {
    setIsSubmitting(true);
    setServerError(null);
    setFieldErrors(undefined);

    try {
      const response = await submitInsuranceRenewal({
        vehicleRegNumber: formData.vehicleRegNumber,
        carMakeAndModel: formData.carMakeAndModel,
        policyExpiryDate: formData.policyExpiryDate,
        previousPolicyNumber: formData.previousPolicyNumber,
        previousInsurer: formData.previousInsurer,
        claimedNcbPercentage: formData.claimedNcbPercentage,
        hasExistingClaim: formData.hasExistingClaim,
        selectedAddons: formData.selectedAddonIds,
        idv: breakdown.idv,
        quotedAmount: breakdown.totalPayable,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail,
        communicationChannel: formData.communicationChannel,
        agentNotes: formData.agentNotes,
      });

      if (response.success) {
        setInquiryResult(response);
        setCurrentStep(4);
        window.scrollTo({ top: 120, behavior: "smooth" });
      } else {
        setServerError(response.message);
        if (response.errors) {
          setFieldErrors(response.errors);
        }
      }
    } catch {
      setServerError("An unexpected connection issue occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      vehicleRegNumber: "",
      carMakeAndModel: "Swift",
      policyExpiryDate: "",
      previousInsurer: "Maruti Insurance Broking",
      claimedNcbPercentage: 20,
      hasExistingClaim: false,
      selectedAddonIds: ["zero-dep", "engine-protect"],
      customIdv: 680000,
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      previousPolicyNumber: "",
      communicationChannel: "WHATSAPP",
      agentNotes: "",
    });
    setInquiryResult(null);
    setServerError(null);
    setFieldErrors(undefined);
    setCurrentStep(1);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Visual Step Progress Indicator */}
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between relative">
          {/* Progress bar background line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-gray-200 -z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#E31837] transition-all duration-300 -z-0"
            style={{
              width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
            }}
          />

          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => {
                    // Allow clicking back to already visited steps
                    if (step.id < currentStep && !isSubmitting && currentStep !== 4) {
                      setCurrentStep(step.id);
                    }
                  }}
                  disabled={step.id > currentStep || currentStep === 4}
                  className={`flex h-10 w-10 items-center justify-center border-2 transition-all shadow-xs ${
                    isCompleted
                      ? "border-[#E31837] bg-[#E31837] text-white"
                      : isCurrent
                      ? "border-[#E31837] bg-white text-[#E31837] ring-2 ring-red-500/20"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </button>
                <span
                  className={`mt-2 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap ${
                    isCurrent
                      ? "text-[#E31837]"
                      : isCompleted
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Contents */}
      <div className="pt-4">
        {currentStep === 1 && (
          <QuickRenewalForm
            vehicleRegNumber={formData.vehicleRegNumber}
            carMakeAndModel={formData.carMakeAndModel}
            policyExpiryDate={formData.policyExpiryDate}
            previousInsurer={formData.previousInsurer}
            claimedNcbPercentage={formData.claimedNcbPercentage}
            hasExistingClaim={formData.hasExistingClaim}
            onUpdate={updateFormData}
            onProceed={handleNextStep}
          />
        )}

        {currentStep === 2 && (
          <AddonCustomizer
            carMakeAndModel={formData.carMakeAndModel}
            vehicleRegNumber={formData.vehicleRegNumber}
            claimedNcbPercentage={formData.claimedNcbPercentage}
            selectedAddonIds={formData.selectedAddonIds}
            customIdv={formData.customIdv}
            onUpdateAddons={(addons) => updateFormData({ selectedAddonIds: addons })}
            onUpdateIdv={(idv) => updateFormData({ customIdv: idv })}
            onProceed={handleNextStep}
            onBack={handleBackStep}
          />
        )}

        {currentStep === 3 && (
          <InsuranceLeadForm
            customerName={formData.customerName}
            customerPhone={formData.customerPhone}
            customerEmail={formData.customerEmail}
            previousPolicyNumber={formData.previousPolicyNumber}
            communicationChannel={formData.communicationChannel}
            agentNotes={formData.agentNotes}
            onUpdate={updateFormData}
            breakdown={breakdown}
            selectedAddonIds={formData.selectedAddonIds}
            carMakeAndModel={formData.carMakeAndModel}
            vehicleRegNumber={formData.vehicleRegNumber}
            policyExpiryDate={formData.policyExpiryDate}
            claimedNcbPercentage={formData.claimedNcbPercentage}
            isSubmitting={isSubmitting}
            serverError={serverError}
            fieldErrors={fieldErrors}
            onSubmit={handleSubmitLead}
            onBack={handleBackStep}
          />
        )}

        {currentStep === 4 && inquiryResult && (
          <InsuranceConfirmationCard
            result={inquiryResult}
            breakdown={breakdown}
            selectedAddonTitles={selectedAddonTitles}
            customerEmail={formData.customerEmail}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
