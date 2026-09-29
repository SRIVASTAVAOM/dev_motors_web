import { DealershipChannel, BodyType, FuelType, TransmissionType } from "@prisma/client";
import { CarModelData } from "@/lib/types/sales";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";

export const DEFAULT_CAR_MODELS: CarModelData[] = [
  {
    name: "Grand Vitara",
    slug: "grand-vitara",
    tagline: "The Intelligent Electric Hybrid SUV",
    description:
      "Engineered for the discerning explorer, the Grand Vitara offers Intelligent Electric Hybrid technology, ALLGRIP SELECT AWD, and a commanding road presence with a panoramic sunroof and 360 View Camera.",
    channel: DealershipChannel.NEXA,
    bodyType: BodyType.SUV,
    startingPrice: 1099000,
    heroImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    ],
    brochureUrl: "#",
    isFeatured: true,
    isActive: true,
    variants: [
      {
        name: "Delta Smart Hybrid 1.5L",
        slug: "delta-smart-hybrid-1-5l",
        fuelType: FuelType.PETROL,
        transmission: TransmissionType.MANUAL,
        engineCapacityCc: 1462,
        mileage: "21.11 km/l",
        exShowroomPrice: 1220000,
        keyFeatures: ["SmartPlay Pro 7-inch Audio", "Push Start/Stop", "Rear Parking Camera", "Dual Front Airbags"],
        availableColors: ["Nexa Blue", "Grandeur Grey", "Arctic White", "Splendid Silver"],
        isAvailable: true,
      },
      {
        name: "Zeta+ Intelligent Electric Hybrid",
        slug: "zeta-plus-hybrid",
        fuelType: FuelType.HYBRID,
        transmission: TransmissionType.CVT,
        engineCapacityCc: 1490,
        mileage: "27.97 km/l",
        exShowroomPrice: 1843000,
        keyFeatures: ["All-Electric Drive Mode", "Panoramic Sunroof", "Head-Up Display", "Wireless Charging", "6 Airbags"],
        availableColors: ["Nexa Blue", "Opulent Red", "Arctic White Dual Tone", "Splendid Silver Dual Tone"],
        isAvailable: true,
      },
      {
        name: "Alpha+ Intelligent Hybrid (Top Spec)",
        slug: "alpha-plus-hybrid-top",
        fuelType: FuelType.HYBRID,
        transmission: TransmissionType.CVT,
        engineCapacityCc: 1490,
        mileage: "27.97 km/l",
        exShowroomPrice: 1993000,
        keyFeatures: ["360 Degree View Camera", "Ventilated Front Seats", "Premium Clarion Sound System", "Tyre Pressure Monitoring (TPMS)"],
        availableColors: ["Arctic White Dual Tone", "Opulent Red Dual Tone", "Midnight Black"],
        isAvailable: true,
      },
    ],
  },
  {
    name: "Baleno",
    slug: "baleno",
    tagline: "Tech Goes Bold",
    description:
      "The New Age Baleno is sculpted with liquid flow aesthetics and packed with segment-first technology including a Head-Up Display, 360 View Camera, and Next-Gen Suzuki Connect.",
    channel: DealershipChannel.NEXA,
    bodyType: BodyType.HATCHBACK,
    startingPrice: 666000,
    heroImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80",
    ],
    brochureUrl: "#",
    isFeatured: true,
    isActive: true,
    variants: [
      {
        name: "Delta 1.2L DualJet",
        slug: "delta-1-2l-manual",
        fuelType: FuelType.PETROL,
        transmission: TransmissionType.MANUAL,
        engineCapacityCc: 1197,
        mileage: "22.35 km/l",
        exShowroomPrice: 750000,
        keyFeatures: ["7-inch SmartPlay Studio", "Steering Mounted Controls", "Automatic Climate Control", "Electronic Stability Program (ESP)"],
        availableColors: ["Nexa Blue", "Pearl Arctic White", "Splendid Silver", "Grandeur Grey"],
        isAvailable: true,
      },
      {
        name: "Zeta S-CNG 1.2L DualJet",
        slug: "zeta-s-cng",
        fuelType: FuelType.CNG,
        transmission: TransmissionType.MANUAL,
        engineCapacityCc: 1197,
        mileage: "30.61 km/kg",
        exShowroomPrice: 840000,
        keyFeatures: ["Factory Fitted S-CNG Dual ECU", "LED Projector Headlamps", "Rear View Camera", "6 Airbags Standard"],
        availableColors: ["Nexa Blue", "Pearl Arctic White", "Splendid Silver"],
        isAvailable: true,
      },
      {
        name: "Alpha 1.2L AGS (Automatic)",
        slug: "alpha-1-2l-ags",
        fuelType: FuelType.PETROL,
        transmission: TransmissionType.AMT,
        engineCapacityCc: 1197,
        mileage: "22.94 km/l",
        exShowroomPrice: 988000,
        keyFeatures: ["9-inch SmartPlay Pro+ Audio", "Head-Up Display (HUD)", "360 View Camera", "16-inch Precision Cut Alloys", "Cruise Control"],
        availableColors: ["Nexa Blue", "Luxe Beige", "Opulent Red", "Pearl Arctic White"],
        isAvailable: true,
      },
    ],
  },
  {
    name: "Swift",
    slug: "swift",
    tagline: "Drive the All-New Z-Series Thrill",
    description:
      "The iconic hatchback reborn with the revolutionary all-new 1.2L Z-Series 3-cylinder engine, dynamic wrap-around cockpit, 6 standard airbags, and unrivaled fuel efficiency.",
    channel: DealershipChannel.ARENA,
    bodyType: BodyType.HATCHBACK,
    startingPrice: 649000,
    heroImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
    ],
    brochureUrl: "#",
    isFeatured: true,
    isActive: true,
    variants: [
      {
        name: "LXi 1.2L Z-Series MT",
        slug: "lxi-1-2l-manual",
        fuelType: FuelType.PETROL,
        transmission: TransmissionType.MANUAL,
        engineCapacityCc: 1197,
        mileage: "24.80 km/l",
        exShowroomPrice: 649000,
        keyFeatures: ["6 Airbags Standard Across Variants", "Electronic Stability Program (ESP)", "Hill Hold Assist", "Remote Keyless Entry"],
        availableColors: ["Sizzling Red", "Pearl Arctic White", "Magma Grey"],
        isAvailable: true,
      },
      {
        name: "VXi S-CNG 1.2L",
        slug: "vxi-s-cng",
        fuelType: FuelType.CNG,
        transmission: TransmissionType.MANUAL,
        engineCapacityCc: 1197,
        mileage: "32.85 km/kg",
        exShowroomPrice: 820000,
        keyFeatures: ["Ultra-High Fuel Efficiency", "Microswitch Safety Cut-Off", "Speed-Sensitive Auto Door Locks", "Electric Power Steering"],
        availableColors: ["Pearl Arctic White", "Magma Grey", "Splendid Silver"],
        isAvailable: true,
      },
      {
        name: "ZXi+ 1.2L AMT Dual Tone",
        slug: "zxi-plus-amt-dual-tone",
        fuelType: FuelType.PETROL,
        transmission: TransmissionType.AMT,
        engineCapacityCc: 1197,
        mileage: "25.75 km/l",
        exShowroomPrice: 960000,
        keyFeatures: ["9-inch HD SmartPlay Pro+", "Wireless Android Auto & Apple CarPlay", "LED Projector Headlamps with DRLs", "Wireless Phone Charger"],
        availableColors: ["Sizzling Red with Black Roof", "Luster Blue with Black Roof", "Pearl Arctic White"],
        isAvailable: true,
      },
    ],
  },
  {
    name: "Brezza",
    slug: "brezza",
    tagline: "Hot and Techy SUV",
    description:
      "Command every boulevard in India's favorite compact SUV. Featuring an electric sunroof, 6-speed torque converter automatic with paddle shifters, and muscular SUV styling.",
    channel: DealershipChannel.ARENA,
    bodyType: BodyType.SUV,
    startingPrice: 834000,
    heroImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    ],
    brochureUrl: "#",
    isFeatured: true,
    isActive: true,
    variants: [
      {
        name: "LXi 1.5L K-Series MT",
        slug: "lxi-1-5l-manual",
        fuelType: FuelType.PETROL,
        transmission: TransmissionType.MANUAL,
        engineCapacityCc: 1462,
        mileage: "17.38 km/l",
        exShowroomPrice: 834000,
        keyFeatures: ["Dual Airbags", "Rear Parking Sensors", "Electrically Adjustable ORVMs", "Shark Fin Antenna"],
        availableColors: ["Brave Khaki", "Pearl Arctic White", "Magma Grey"],
        isAvailable: true,
      },
      {
        name: "VXi S-CNG 1.5L",
        slug: "vxi-s-cng-brezza",
        fuelType: FuelType.CNG,
        transmission: TransmissionType.MANUAL,
        engineCapacityCc: 1462,
        mileage: "25.51 km/kg",
        exShowroomPrice: 1065000,
        keyFeatures: ["Dual Interdependent ECUs", "Auto Climate Control", "SmartPlay Audio with Steering Controls", "Rear Defogger"],
        availableColors: ["Pearl Arctic White", "Splendid Silver", "Magma Grey"],
        isAvailable: true,
      },
      {
        name: "ZXi+ 1.5L 6AT Dual Tone",
        slug: "zxi-plus-6at-dual-tone",
        fuelType: FuelType.PETROL,
        transmission: TransmissionType.AUTOMATIC,
        engineCapacityCc: 1462,
        mileage: "19.80 km/l",
        exShowroomPrice: 1414000,
        keyFeatures: ["Electric Sunroof", "Paddle Shifters", "Arkamys Surround Sound System", "Head-Up Display", "360 View Camera"],
        availableColors: ["Brave Khaki Dual Tone", "Sizzling Red Dual Tone", "Splendid Silver Dual Tone"],
        isAvailable: true,
      },
    ],
  },
];

export async function getCarModels(): Promise<CarModelData[]> {
  if (!isDatabaseConfigured) {
    return DEFAULT_CAR_MODELS;
  }

  try {
    // Attempt database retrieval
    const dbModels = await prisma.carModel.findMany({
      where: { isActive: true },
      include: {
        variants: {
          where: { isAvailable: true },
          orderBy: { exShowroomPrice: "asc" },
        },
      },
      orderBy: { startingPrice: "asc" },
    });

    if (dbModels && dbModels.length > 0) {
      return dbModels.map((m) => ({
        id: m.id,
        name: m.name,
        slug: m.slug,
        tagline: m.tagline,
        description: m.description,
        channel: m.channel,
        bodyType: m.bodyType,
        startingPrice: Number(m.startingPrice),
        heroImage: m.heroImage,
        galleryImages: m.galleryImages,
        brochureUrl: m.brochureUrl,
        isFeatured: m.isFeatured,
        isActive: m.isActive,
        variants: m.variants.map((v) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          fuelType: v.fuelType,
          transmission: v.transmission,
          engineCapacityCc: v.engineCapacityCc,
          mileage: v.mileage,
          exShowroomPrice: Number(v.exShowroomPrice),
          keyFeatures: v.keyFeatures,
          availableColors: v.availableColors,
          isAvailable: v.isAvailable,
        })),
      }));
    }
  } catch (err) {
    // Graceful fallback to static data if database is offline or not yet seeded
    console.warn("⚠️ Database query failed or uninitialized, using curated catalog:", (err as Error).message);
  }

  return DEFAULT_CAR_MODELS;
}

export async function getCarModelBySlug(slug: string): Promise<CarModelData | null> {
  if (!isDatabaseConfigured) {
    return DEFAULT_CAR_MODELS.find((m) => m.slug.toLowerCase() === slug.toLowerCase()) ?? null;
  }

  try {
    const dbModel = await prisma.carModel.findUnique({
      where: { slug },
      include: {
        variants: {
          where: { isAvailable: true },
          orderBy: { exShowroomPrice: "asc" },
        },
      },
    });

    if (dbModel) {
      return {
        id: dbModel.id,
        name: dbModel.name,
        slug: dbModel.slug,
        tagline: dbModel.tagline,
        description: dbModel.description,
        channel: dbModel.channel,
        bodyType: dbModel.bodyType,
        startingPrice: Number(dbModel.startingPrice),
        heroImage: dbModel.heroImage,
        galleryImages: dbModel.galleryImages,
        brochureUrl: dbModel.brochureUrl,
        isFeatured: dbModel.isFeatured,
        isActive: dbModel.isActive,
        variants: dbModel.variants.map((v) => ({
          id: v.id,
          name: v.name,
          slug: v.slug,
          fuelType: v.fuelType,
          transmission: v.transmission,
          engineCapacityCc: v.engineCapacityCc,
          mileage: v.mileage,
          exShowroomPrice: Number(v.exShowroomPrice),
          keyFeatures: v.keyFeatures,
          availableColors: v.availableColors,
          isAvailable: v.isAvailable,
        })),
      };
    }
  } catch (err) {
    console.warn(`⚠️ Database query for slug ${slug} failed, checking curated catalog:`, (err as Error).message);
  }

  const fallback = DEFAULT_CAR_MODELS.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
  return fallback ?? null;
}
