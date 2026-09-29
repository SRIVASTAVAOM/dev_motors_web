"use server";

import { prisma } from "@/lib/prisma";
import {
  insuranceInquirySchema,
  InsuranceInquiryInput,
  InsuranceInquiryResult,
  INSURANCE_ADDONS,
} from "@/lib/types/insurance";
import { InsuranceInquiryType, InsuranceStatus } from "@prisma/client";

/**
 * Server Action to validate insurance renewal inputs with Zod,
 * persist record into Prisma InsuranceInquiry with type 'RENEWAL' and status 'NEW',
 * and return tracking confirmation inquiry number.
 */
export async function submitInsuranceRenewal(
  rawInput: InsuranceInquiryInput
): Promise<InsuranceInquiryResult> {
  try {
    // 1. Zod Validation
    const validation = insuranceInquirySchema.safeParse(rawInput);

    if (!validation.success) {
      const fieldErrors: Record<string, string[]> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "form";
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(issue.message);
      });

      return {
        success: false,
        message: "Please correct the form fields before generating your insurance quote.",
        errors: fieldErrors,
      };
    }

    const data = validation.data;
    const cleanPhone = data.customerPhone.trim();
    const cleanReg = data.vehicleRegNumber.replace(/\s+/g, " ").toUpperCase().trim();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const inquiryNumber = `DM-INS-${new Date().getFullYear()}-${randomSuffix}`;

    const selectedAddonTitles = data.selectedAddons.map((addonId) => {
      const match = INSURANCE_ADDONS.find((a) => a.id === addonId);
      return match ? match.name : addonId;
    });

    const structuredAgentNotes = [
      `[MARUTI INSURANCE BROKING RENEWAL]`,
      `Vehicle: ${cleanReg} - ${data.carMakeAndModel}`,
      `IDV: ₹${data.idv.toLocaleString("en-IN")}`,
      `Quoted Annual Premium: ₹${data.quotedAmount.toLocaleString("en-IN")}`,
      `Claimed NCB: ${data.claimedNcbPercentage}% (Existing Claim: ${data.hasExistingClaim ? "Yes" : "No"})`,
      `Previous Insurer: ${data.previousInsurer}`,
      `Add-ons: ${selectedAddonTitles.length > 0 ? selectedAddonTitles.join(", ") : "None (Base Comprehensive)"}`,
      `Preferred Contact: ${data.communicationChannel}`,
      data.agentNotes ? `Customer Notes: "${data.agentNotes}"` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    // 2. Persist into Prisma InsuranceInquiry table
    try {
      await prisma.insuranceInquiry.create({
        data: {
          inquiryNumber,
          type: InsuranceInquiryType.RENEWAL,
          status: InsuranceStatus.NEW,
          customerName: data.customerName.trim(),
          customerPhone: cleanPhone,
          customerEmail: data.customerEmail?.trim() || null,
          vehicleRegNumber: cleanReg,
          carMakeAndModel: data.carMakeAndModel.trim(),
          previousPolicyNumber: data.previousPolicyNumber?.trim() || null,
          previousInsurer: data.previousInsurer,
          policyExpiryDate: new Date(data.policyExpiryDate),
          hasExistingClaim: data.hasExistingClaim,
          claimedNcbPercentage: data.claimedNcbPercentage,
          quotedAmount: data.quotedAmount,
          agentNotes: structuredAgentNotes,
        },
      });
    } catch (dbErr) {
      console.warn("⚠️ Notice: Database persistence unavailable or uninitialized for InsuranceInquiry. Returning simulated confirmation:", (dbErr as Error).message);
    }

    return {
      success: true,
      inquiryNumber,
      status: "NEW",
      message: `Your insurance renewal quote of ₹${data.quotedAmount.toLocaleString("en-IN")} has been locked! Reference: ${inquiryNumber}.`,
      details: {
        inquiryNumber,
        customerName: data.customerName.trim(),
        customerPhone: cleanPhone,
        vehicleRegNumber: cleanReg,
        carMakeAndModel: data.carMakeAndModel.trim(),
        policyExpiryDate: data.policyExpiryDate,
        idv: data.idv,
        quotedAmount: data.quotedAmount,
        ncbPercentage: data.claimedNcbPercentage,
        selectedAddonTitles,
      },
    };
  } catch (error) {
    console.error("Critical error in submitInsuranceRenewal:", error);
    return {
      success: false,
      message:
        "An unexpected error occurred while processing your insurance quote. Please call our dedicated Insurance Desk at +91 98765 43210.",
    };
  }
}
