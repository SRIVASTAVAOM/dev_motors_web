"use client";

import { useState } from "react";
import StepIndicator from "./StepIndicator";
import StepVehicleDetails from "./StepVehicleDetails";
import StepServiceType from "./StepServiceType";
import StepServiceMode from "./StepServiceMode";
import StepContactReview from "./StepContactReview";
import BookingConfirmationCard from "./BookingConfirmationCard";
import {
  ServiceTypeKey,
  ServiceBookingResult,
  SERVICE_PACKAGES,
} from "@/lib/types/service";
import { submitServiceBooking } from "@/app/actions/service-booking";

export default function ServiceBookingWizard() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | undefined>(undefined);
  const [bookingResult, setBookingResult] = useState<ServiceBookingResult | null>(null);

  // Initial base price with GST for default package (Periodic Maintenance: 3499 * 1.18 = 4129)
  const defaultBasePrice = SERVICE_PACKAGES[0].basePrice;
  const initialEstimate = Math.round(defaultBasePrice * 1.18);

  // Form State
  const [formData, setFormData] = useState({
    regMode: "registration" as "registration" | "model",
    vehicleRegNumber: "",
    carModel: "Swift",
    fuelType: "PETROL",
    odometerKm: null as number | null,
    serviceType: "PERIODIC_MAINTENANCE" as ServiceTypeKey,
    additionalServices: [] as string[],
    estimatedPrice: initialEstimate,
    serviceMode: "DOORSTEP_PICKUP" as "DOORSTEP_PICKUP" | "WORKSHOP_SELF_DROP",
    pickupAddress: "",
    workshopLocation: "Dev Motors Central Workshop & Megastore",
    preferredDate: "",
    preferredTimeSlot: "Morning (10:30 AM - 12:30 PM)",
    serviceNotes: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
  });

  const updateFormData = (fields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleStepJump = (targetStep: number) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setServerError(null);
    setFieldErrors(undefined);

    try {
      const response = await submitServiceBooking({
        regMode: formData.regMode,
        vehicleRegNumber: formData.vehicleRegNumber,
        carModel: formData.carModel,
        fuelType: formData.fuelType,
        odometerKm: formData.odometerKm,
        serviceType: formData.serviceType,
        additionalServices: formData.additionalServices,
        estimatedPrice: formData.estimatedPrice,
        serviceMode: formData.serviceMode,
        pickupAddress: formData.pickupAddress,
        workshopLocation: formData.workshopLocation,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail || "",
        serviceNotes: formData.serviceNotes || "",
      });

      if (response.success) {
        setBookingResult(response);
        window.scrollTo({ top: 100, behavior: "smooth" });
      } else {
        setServerError(response.message || "Failed to submit booking.");
        setFieldErrors(response.errors);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setServerError("An unexpected connection error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBookingResult(null);
    setCurrentStep(1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const iso = tomorrow.toISOString().split("T")[0];

    setFormData({
      regMode: "registration",
      vehicleRegNumber: "",
      carModel: "Swift",
      fuelType: "PETROL",
      odometerKm: null,
      serviceType: "PERIODIC_MAINTENANCE",
      additionalServices: [],
      estimatedPrice: initialEstimate,
      serviceMode: "DOORSTEP_PICKUP",
      pickupAddress: "",
      workshopLocation: "Dev Motors Central Workshop & Megastore",
      preferredDate: iso,
      preferredTimeSlot: "Morning (10:30 AM - 12:30 PM)",
      serviceNotes: "",
      customerName: "",
      customerPhone: "",
      customerEmail: "",
    });
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // If booking is confirmed, render confirmation view
  if (bookingResult) {
    return <BookingConfirmationCard result={bookingResult} onReset={handleReset} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 shadow-xl backdrop-blur-md p-6 sm:p-10 transition-all">
      {/* Visual Stepper */}
      <StepIndicator currentStep={currentStep} totalSteps={4} onStepClick={handleStepJump} />

      {/* Wizard Steps */}
      {currentStep === 1 && (
        <StepVehicleDetails
          regMode={formData.regMode}
          vehicleRegNumber={formData.vehicleRegNumber}
          carModel={formData.carModel}
          fuelType={formData.fuelType}
          odometerKm={formData.odometerKm}
          onUpdate={updateFormData}
          onNext={handleNextStep}
        />
      )}

      {currentStep === 2 && (
        <StepServiceType
          serviceType={formData.serviceType}
          additionalServices={formData.additionalServices}
          estimatedPrice={formData.estimatedPrice}
          onUpdate={updateFormData}
          onNext={handleNextStep}
          onBack={handleBackStep}
        />
      )}

      {currentStep === 3 && (
        <StepServiceMode
          serviceMode={formData.serviceMode}
          pickupAddress={formData.pickupAddress}
          workshopLocation={formData.workshopLocation}
          preferredDate={formData.preferredDate}
          preferredTimeSlot={formData.preferredTimeSlot}
          serviceNotes={formData.serviceNotes}
          onUpdate={updateFormData}
          onNext={handleNextStep}
          onBack={handleBackStep}
        />
      )}

      {currentStep === 4 && (
        <StepContactReview
          customerName={formData.customerName}
          customerPhone={formData.customerPhone}
          customerEmail={formData.customerEmail}
          regMode={formData.regMode}
          vehicleRegNumber={formData.vehicleRegNumber}
          carModel={formData.carModel}
          fuelType={formData.fuelType}
          odometerKm={formData.odometerKm}
          serviceType={formData.serviceType}
          additionalServices={formData.additionalServices}
          estimatedPrice={formData.estimatedPrice}
          serviceMode={formData.serviceMode}
          pickupAddress={formData.pickupAddress}
          workshopLocation={formData.workshopLocation}
          preferredDate={formData.preferredDate}
          preferredTimeSlot={formData.preferredTimeSlot}
          serviceNotes={formData.serviceNotes}
          isSubmitting={isSubmitting}
          serverError={serverError}
          fieldErrors={fieldErrors}
          onUpdate={updateFormData}
          onSubmit={handleSubmitBooking}
          onBack={handleBackStep}
        />
      )}
    </div>
  );
}
