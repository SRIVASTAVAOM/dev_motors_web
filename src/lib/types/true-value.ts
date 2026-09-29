import { z } from "zod";
import { FuelType, TransmissionType, UsedCarStatus } from "@prisma/client";

export interface TrueValueCarItem {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  variant: string;
  yearOfManufacture: number;
  ownershipCount: number;
  odometerReadingKm: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyColor: string;
  sellingPrice: number;
  status: UsedCarStatus;
  certifiedByTrueValue: boolean;
  inspectionPointCount: number;
  warrantyMonths: number;
  freeServicesCount: number;
  insuranceValidUntil?: string | null;
  featuredImage: string;
  galleryImages: string[];
  city: string;
  rtoState: string;
  conditionNotes?: string | null;
  dealershipBranch: string;
  inspectionScore?: number; // e.g. 98/100
  rating?: number; // 4.8 / 5
}

export interface InspectionSection {
  title: string;
  checkpointCount: number;
  passedCount: number;
  status: "PASSED" | "EXCELLENT" | "ATTENTION_REQUIRED";
  highlights: string[];
}

export interface FullInspectionReport {
  carRegNumber: string;
  carTitle: string;
  inspectorName: string;
  inspectionDate: string;
  overallScore: number;
  sections: InspectionSection[];
}

// Instant valuation inputs
export interface ValuationInput {
  make: string;
  model: string;
  year: number;
  kmDriven: number;
  fuelType: "PETROL" | "CNG" | "HYBRID" | "DIESEL";
  transmission: "MANUAL" | "AUTOMATIC";
  ownership: number; // 1, 2, 3
  accidentalHistory: "NONE" | "MINOR_COSMETIC" | "MAJOR_REPAIR";
  city: string;
}

export interface ValuationResult {
  minPrice: number;
  maxPrice: number;
  fairPrice: number;
  marketDemand: "VERY_HIGH" | "HIGH" | "MODERATE";
  depreciationPercentage: number;
  estimatedOnRoadOriginal: number;
}

// Zod Schema for Sell Lead & Free Doorstep Inspection Booking
export const doorstepInspectionLeadSchema = z.object({
  customerName: z.string().trim().min(2, "Name must be at least 2 characters long"),
  customerPhone: z
    .string()
    .trim()
    .refine((val) => val.replace(/\D/g, "").length === 10, {
      message: "Please enter a valid 10-digit mobile number",
    }),
  customerEmail: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  vehicleMake: z.string().trim().default("Maruti Suzuki"),
  vehicleModel: z.string().trim().min(1, "Please select car model"),
  yearOfManufacture: z.coerce.number().min(2005).max(2026),
  kmDriven: z.coerce.number().min(500),
  fuelType: z.string().trim().default("PETROL"),
  accidentalHistory: z.string().trim().default("NONE"),
  estimatedValuationMin: z.coerce.number().optional(),
  estimatedValuationMax: z.coerce.number().optional(),
  preferredDate: z.string().min(1, "Please select inspection appointment date"),
  preferredTimeSlot: z.string().min(1, "Please select appointment time slot"),
  inspectionAddress: z.string().trim().min(5, "Please enter complete doorstep address for physical inspection"),
  registrationNumber: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type DoorstepInspectionLeadInput = z.infer<typeof doorstepInspectionLeadSchema>;

export interface DoorstepInspectionLeadResult {
  success: boolean;
  leadId?: string;
  bookingNumber?: string;
  status?: string;
  message: string;
  data?: {
    customerName: string;
    customerPhone: string;
    vehicleSummary: string;
    inspectionDate: string;
    inspectionTimeSlot: string;
    inspectionAddress: string;
    estimatedRange: string;
  };
  errors?: Record<string, string[]>;
}
