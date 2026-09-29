import { FuelType, TransmissionType, UsedCarStatus } from "@prisma/client";
import { TrueValueCarItem } from "@/lib/types/true-value";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";

export const DEFAULT_TRUE_VALUE_CARS: TrueValueCarItem[] = [
  {
    id: "tv-car-01",
    registrationNumber: "UP 32 EA 4582",
    make: "Maruti Suzuki",
    model: "Swift",
    variant: "ZXi 1.2L DualJet",
    yearOfManufacture: 2023,
    ownershipCount: 1,
    odometerReadingKm: 18200,
    fuelType: FuelType.PETROL,
    transmission: TransmissionType.MANUAL,
    bodyColor: "Pearl Metallic Lucent Orange",
    sellingPrice: 685000,
    status: UsedCarStatus.AVAILABLE,
    certifiedByTrueValue: true,
    inspectionPointCount: 376,
    warrantyMonths: 12,
    freeServicesCount: 3,
    insuranceValidUntil: "2026-11-20",
    featuredImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    ],
    city: "Lucknow",
    rtoState: "UP (Lucknow RTO)",
    conditionNotes:
      "Single corporate owner, non-accidental vehicle. Full showroom service history available at Dev Motors. Brand new Michelin tyres, valid comprehensive insurance. Immaculate interior and exterior.",
    dealershipBranch: "Dev Motors Arena Campus, Hazratganj",
    inspectionScore: 98,
    rating: 4.9,
  },
  {
    id: "tv-car-02",
    registrationNumber: "UP 32 DF 8190",
    make: "Maruti Suzuki",
    model: "Baleno",
    variant: "Alpha 1.2L DualJet (Top Spec)",
    yearOfManufacture: 2022,
    ownershipCount: 1,
    odometerReadingKm: 29400,
    fuelType: FuelType.PETROL,
    transmission: TransmissionType.MANUAL,
    bodyColor: "Celestial Blue",
    sellingPrice: 745000,
    status: UsedCarStatus.AVAILABLE,
    certifiedByTrueValue: true,
    inspectionPointCount: 376,
    warrantyMonths: 12,
    freeServicesCount: 3,
    insuranceValidUntil: "2026-08-15",
    featuredImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80",
    ],
    city: "Lucknow",
    rtoState: "UP (Lucknow RTO)",
    conditionNotes:
      "Single doctor owner, 100% original paint, verified odometer. Equipped with Head-Up Display and 360-degree camera. All periodic services completed at Nexa Dev Motors.",
    dealershipBranch: "Dev Motors Nexa Lounge, Gomti Nagar",
    inspectionScore: 97,
    rating: 4.8,
  },
  {
    id: "tv-car-03",
    registrationNumber: "DL 8C BA 7712",
    make: "Maruti Suzuki",
    model: "Brezza",
    variant: "VXi Smart Hybrid 1.5L AT",
    yearOfManufacture: 2021,
    ownershipCount: 1,
    odometerReadingKm: 44000,
    fuelType: FuelType.PETROL,
    transmission: TransmissionType.AUTOMATIC,
    bodyColor: "Magma Grey",
    sellingPrice: 815000,
    status: UsedCarStatus.AVAILABLE,
    certifiedByTrueValue: true,
    inspectionPointCount: 376,
    warrantyMonths: 12,
    freeServicesCount: 3,
    insuranceValidUntil: "2026-10-10",
    featuredImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    ],
    city: "Indore",
    rtoState: "DL (Delhi NCR - NOC Available)",
    conditionNotes:
      "Highway driven SUV in prime mechanical health. Automatic transmission shifts smoothly, brake pads replaced recently. Complete True Value 376-point certificate passed with zero defects.",
    dealershipBranch: "Dev Motors Central Megastore, Indore",
    inspectionScore: 96,
    rating: 4.8,
  },
  {
    id: "tv-car-04",
    registrationNumber: "MP 09 CM 9941",
    make: "Maruti Suzuki",
    model: "Grand Vitara",
    variant: "Zeta+ Intelligent Electric Hybrid",
    yearOfManufacture: 2023,
    ownershipCount: 1,
    odometerReadingKm: 16500,
    fuelType: FuelType.HYBRID,
    transmission: TransmissionType.CVT,
    bodyColor: "Grandeur Grey",
    sellingPrice: 1540000,
    status: UsedCarStatus.AVAILABLE,
    certifiedByTrueValue: true,
    inspectionPointCount: 376,
    warrantyMonths: 12,
    freeServicesCount: 3,
    insuranceValidUntil: "2027-02-14",
    featuredImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    ],
    city: "Indore",
    rtoState: "MP (Indore RTO)",
    conditionNotes:
      "Practically brand new Intelligent Hybrid SUV delivering 27.97 km/l real-world mileage. Panoramic sunroof, ventilated seats, wireless charging. Maruti OEM battery warranty active until 2031.",
    dealershipBranch: "Dev Motors Nexa Lounge, Indore",
    inspectionScore: 99,
    rating: 5.0,
  },
  {
    id: "tv-car-05",
    registrationNumber: "UP 32 KN 3219",
    make: "Maruti Suzuki",
    model: "Ertiga",
    variant: "ZXi 1.5L S-CNG",
    yearOfManufacture: 2022,
    ownershipCount: 1,
    odometerReadingKm: 38200,
    fuelType: FuelType.CNG,
    transmission: TransmissionType.MANUAL,
    bodyColor: "Pearl Metallic Oxford Blue",
    sellingPrice: 980000,
    status: UsedCarStatus.AVAILABLE,
    certifiedByTrueValue: true,
    inspectionPointCount: 376,
    warrantyMonths: 12,
    freeServicesCount: 3,
    insuranceValidUntil: "2026-09-30",
    featuredImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    ],
    city: "Lucknow",
    rtoState: "UP (Lucknow RTO)",
    conditionNotes:
      "Factory fitted S-CNG, highly economical 7-seater MPV. Dual airbags, ABS with EBD, push button start, clean engine compression. Certified by True Value master technicians.",
    dealershipBranch: "Dev Motors True Value Hub, Transport Nagar",
    inspectionScore: 95,
    rating: 4.7,
  },
  {
    id: "tv-car-06",
    registrationNumber: "UP 32 TR 6604",
    make: "Maruti Suzuki",
    model: "Dzire",
    variant: "VXi 1.2L DualJet",
    yearOfManufacture: 2020,
    ownershipCount: 1,
    odometerReadingKm: 52000,
    fuelType: FuelType.PETROL,
    transmission: TransmissionType.MANUAL,
    bodyColor: "Sherwood Brown",
    sellingPrice: 535000,
    status: UsedCarStatus.AVAILABLE,
    certifiedByTrueValue: true,
    inspectionPointCount: 376,
    warrantyMonths: 12,
    freeServicesCount: 3,
    insuranceValidUntil: "2026-12-05",
    featuredImage: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80",
    ],
    city: "Lucknow",
    rtoState: "UP (Lucknow RTO)",
    conditionNotes:
      "Sedan comfort with remarkable fuel efficiency (23+ km/l). Rear AC vents, steering audio controls, clean upholstery, battery replaced under 6 months ago with invoice.",
    dealershipBranch: "Dev Motors Arena Campus, Lucknow",
    inspectionScore: 94,
    rating: 4.7,
  },
];

export async function getCertifiedUsedCars(): Promise<TrueValueCarItem[]> {
  if (!isDatabaseConfigured) {
    return DEFAULT_TRUE_VALUE_CARS;
  }

  try {
    const dbCars = await prisma.usedCar.findMany({
      where: { status: UsedCarStatus.AVAILABLE },
      orderBy: { createdAt: "desc" },
    });

    if (dbCars && dbCars.length > 0) {
      return dbCars.map((c) => ({
        id: c.id,
        registrationNumber: c.registrationNumber,
        make: c.make,
        model: c.model,
        variant: c.variant,
        yearOfManufacture: c.yearOfManufacture,
        ownershipCount: c.ownershipCount,
        odometerReadingKm: c.odometerReadingKm,
        fuelType: c.fuelType,
        transmission: c.transmission,
        bodyColor: c.bodyColor,
        sellingPrice: Number(c.sellingPrice),
        status: c.status,
        certifiedByTrueValue: c.certifiedByTrueValue,
        inspectionPointCount: c.inspectionPointCount,
        warrantyMonths: c.warrantyMonths,
        freeServicesCount: c.freeServicesCount,
        insuranceValidUntil: c.insuranceValidUntil?.toISOString() || null,
        featuredImage:
          c.featuredImage ||
          "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
        galleryImages: c.galleryImages.length > 0 ? c.galleryImages : [c.featuredImage || ""],
        city: c.city,
        rtoState: c.rtoState,
        conditionNotes: c.conditionNotes,
        dealershipBranch: c.dealershipBranch,
        inspectionScore: 97,
        rating: 4.8,
      }));
    }
  } catch (error) {
    console.warn("⚠️ Database query failed or uninitialized, using curated True Value cars:", (error as Error).message);
  }

  return DEFAULT_TRUE_VALUE_CARS;
}

export { calculateInstantValuation, generateSampleInspectionReport } from "@/lib/valuation";

