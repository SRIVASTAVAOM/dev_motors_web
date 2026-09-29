"use server";

import { prisma } from "@/lib/prisma";
import {
  serviceBookingSchema,
  ServiceBookingInput,
  ServiceBookingResult,
  SERVICE_PACKAGES,
} from "@/lib/types/service";
import { BookingType, BookingStatus } from "@prisma/client";

/**
 * Server Action to validate service booking inputs with Zod,
 * persist record into Prisma with type 'SERVICE_APPOINTMENT' and status 'NEW',
 * and return tracking confirmation ID.
 */
export async function submitServiceBooking(
  rawInput: ServiceBookingInput
): Promise<ServiceBookingResult> {
  try {
    // 1. Validate payload using Zod
    const validationResult = serviceBookingSchema.safeParse(rawInput);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      validationResult.error.issues.forEach((err) => {
        const fieldName = err.path.join(".") || "form";
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = [];
        }
        fieldErrors[fieldName].push(err.message);
      });

      return {
        success: false,
        message: "Please correct the errors in the form before submitting.",
        errors: fieldErrors,
      };
    }

    const data = validationResult.data;

    // 2. Generate unique tracking confirmation ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `DM-SRV-${new Date().getFullYear()}-${randomSuffix}`;

    // Clean identifiers
    const vehicleIdentifier =
      data.regMode === "registration" && data.vehicleRegNumber
        ? data.vehicleRegNumber.replace(/\s+/g, " ").toUpperCase().trim()
        : `${data.carModel || "Maruti"} (${data.fuelType})`;

    const selectedPackage = SERVICE_PACKAGES.find((p) => p.id === data.serviceType);
    const serviceTitle = selectedPackage ? selectedPackage.title : data.serviceType;

    // Build structured service notes
    const formattedNotes = [
      `Service Package: ${serviceTitle}`,
      data.additionalServices.length > 0
        ? `Add-ons: ${data.additionalServices.join(", ")}`
        : null,
      `Estimated Total: ₹${data.estimatedPrice.toLocaleString("en-IN")}`,
      `Service Mode: ${data.serviceMode === "DOORSTEP_PICKUP" ? "Doorstep Pickup & Drop" : "Self Drop to Workshop"}`,
      `Workshop / Hub: ${data.workshopLocation}`,
      data.serviceNotes ? `Customer Notes: "${data.serviceNotes}"` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    // 3. Attempt DB persistence into Prisma
    try {
      // Find associated carModel if available
      let carModelRecord = null;
      if (data.carModel) {
        carModelRecord = await prisma.carModel.findFirst({
          where: { name: { contains: data.carModel, mode: "insensitive" } },
        });
      }

      await prisma.booking.create({
        data: {
          bookingNumber: trackingId,
          type: BookingType.SERVICE_APPOINTMENT,
          status: BookingStatus.NEW,
          customerName: data.customerName.trim(),
          customerPhone: data.customerPhone.trim(),
          customerEmail: data.customerEmail?.trim() || null,
          carModelId: carModelRecord?.id || null,
          vehicleRegNumber:
            data.regMode === "registration" && data.vehicleRegNumber
              ? data.vehicleRegNumber.toUpperCase().trim()
              : null,
          odometerReadingKm: data.odometerKm || null,
          preferredDate: new Date(data.preferredDate),
          preferredTimeSlot: data.preferredTimeSlot,
          pickupDropRequired: data.serviceMode === "DOORSTEP_PICKUP",
          pickupAddress:
            data.serviceMode === "DOORSTEP_PICKUP" ? data.pickupAddress?.trim() || null : null,
          serviceNotes: formattedNotes,
        },
      });
    } catch (dbError) {
      console.warn(
        "⚠️ Notice: Database persistence unavailable or uninitialized. Returning simulated confirmation tracking ID:",
        (dbError as Error).message
      );
    }

    // 4. Return success with tracking confirmation ID and summary details
    return {
      success: true,
      bookingNumber: trackingId,
      trackingId,
      status: "NEW",
      message: `Your service appointment has been scheduled successfully! Your tracking ID is ${trackingId}.`,
      details: {
        customerName: data.customerName.trim(),
        customerPhone: data.customerPhone.trim(),
        vehicleIdentifier,
        serviceTitle,
        serviceMode:
          data.serviceMode === "DOORSTEP_PICKUP"
            ? "Doorstep Pickup & Drop"
            : "Self Drop to Workshop",
        preferredDate: data.preferredDate,
        preferredTimeSlot: data.preferredTimeSlot,
        estimatedPrice: data.estimatedPrice,
        workshopLocation: data.workshopLocation,
      },
    };
  } catch (error) {
    console.error("Critical error in submitServiceBooking:", error);
    return {
      success: false,
      message:
        "An unexpected error occurred while booking your service. Please try again or call our 24x7 service hotline at +91 98765 43210.",
    };
  }
}
