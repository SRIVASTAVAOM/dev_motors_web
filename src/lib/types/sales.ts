import { DealershipChannel, BodyType, FuelType, TransmissionType } from "@prisma/client";

export interface CarVariantData {
  id?: string;
  name: string;
  slug: string;
  fuelType: FuelType;
  transmission: TransmissionType;
  engineCapacityCc: number | null;
  mileage: string | null;
  exShowroomPrice: number;
  keyFeatures: string[];
  availableColors: string[];
  isAvailable: boolean;
}

export interface CarModelData {
  id?: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  channel: DealershipChannel;
  bodyType: BodyType;
  startingPrice: number;
  heroImage: string | null;
  galleryImages: string[];
  brochureUrl: string | null;
  isFeatured: boolean;
  isActive: boolean;
  variants: CarVariantData[];
}

export interface TestDriveBookingInput {
  carModelName: string;
  variantName?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  dealershipLocation: string;
  doorstepPickup: boolean;
  pickupAddress?: string;
}
