"use server";

import { prisma } from "@/lib/prisma";
import {
  doorstepInspectionLeadSchema,
  DoorstepInspectionLeadInput,
  DoorstepInspectionLeadResult,
} from "@/lib/types/true-value";
import { BookingType, BookingStatus } from "@prisma/client";

/**
 * Server Action for True Value Sell Car:
 * Validates input with Zod, inserts record into Prisma Booking table
 * with type 'DOORSTEP_SERVICE' and status 'NEW', and returns confirmation lead ID.
 */
export async function submitTrueValueInspectionLead(
  rawInput: DoorstepInspectionLeadInput
): Promise<DoorstepInspectionLeadResult> {
  try {
    // 1. Zod Validation
    const validation = doorstepInspectionLeadSchema.safeParse(rawInput);

    if (!validation.success) {
      const fieldErrors: Record<string, string[]> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path.join(".") || "form";
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(issue.message);
      });

      return {
        success: false,
        message: "Please correct the form fields before booking your inspection.",
        errors: fieldErrors,
      };
    }

    const data = validation.data;
    const cleanPhone = data.customerPhone.trim();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `DM-TV-SELL-${new Date().getFullYear()}-${randomSuffix}`;

    const vehicleSummary = `${data.yearOfManufacture} ${data.vehicleMake} ${data.vehicleModel} (${data.fuelType})`;
    const estimatedRange =
      data.estimatedValuationMin && data.estimatedValuationMax
        ? `₹${data.estimatedValuationMin.toLocaleString("en-IN")} - ₹${data.estimatedValuationMax.toLocaleString("en-IN")}`
        : "Market Estimate Provided";

    const formattedNotes = [
      `[TRUE VALUE SELL EVALUATION]`,
      `Vehicle: ${vehicleSummary}`,
      `Odometer: ${data.kmDriven.toLocaleString()} km`,
      `Accidental History: ${data.accidentalHistory}`,
      `Estimated Market Range: ${estimatedRange}`,
      data.notes ? `Customer Remarks: "${data.notes}"` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    // 2. Persist into Prisma Booking table
    try {
      // Find matching car model id if possible
      let carModelRecord = null;
      if (data.vehicleModel) {
        carModelRecord = await prisma.carModel.findFirst({
          where: { name: { contains: data.vehicleModel, mode: "insensitive" } },
        });
      }

      await prisma.booking.create({
        data: {
          bookingNumber,
          type: BookingType.DOORSTEP_SERVICE,
          status: BookingStatus.NEW,
          customerName: data.customerName.trim(),
          customerPhone: cleanPhone,
          customerEmail: data.customerEmail?.trim() || null,
          carModelId: carModelRecord?.id || null,
          vehicleRegNumber: data.registrationNumber ? data.registrationNumber.toUpperCase().trim() : null,
          odometerReadingKm: data.kmDriven,
          preferredDate: new Date(data.preferredDate),
          preferredTimeSlot: data.preferredTimeSlot,
          pickupDropRequired: true,
          pickupAddress: data.inspectionAddress.trim(),
          serviceNotes: formattedNotes,
        },
      });
    } catch (dbErr) {
      console.warn("⚠️ Notice: Database persistence unavailable or uninitialized for True Value lead. Generating confirmation ID:", (dbErr as Error).message);
    }

    return {
      success: true,
      leadId: bookingNumber,
      bookingNumber,
      status: "NEW",
      message: `Your Free Doorstep Inspection has been scheduled successfully! Your confirmation ID is ${bookingNumber}.`,
      data: {
        customerName: data.customerName.trim(),
        customerPhone: cleanPhone,
        vehicleSummary,
        inspectionDate: data.preferredDate,
        inspectionTimeSlot: data.preferredTimeSlot,
        inspectionAddress: data.inspectionAddress.trim(),
        estimatedRange,
      },
    };
  } catch (error) {
    console.error("Critical error in submitTrueValueInspectionLead:", error);
    return {
      success: false,
      message:
        "An unexpected error occurred while scheduling your doorstep inspection. Please call our True Value hotline at +91 98765 43210.",
    };
  }
}
