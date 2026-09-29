import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  DealershipChannel,
  BodyType,
  FuelType,
  TransmissionType,
  UsedCarStatus,
} from "@prisma/client";

const connectionString = (process.env.DIRECT_URL || process.env.DATABASE_URL) as string;

if (!connectionString) {
  throw new Error("Neither DIRECT_URL nor DATABASE_URL is set in environment.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting Dev Motors database seeding...");
  console.log(`📡 Connected to database via adapter: ${connectionString.replace(/:[^:@]*@/, ":****@")}`);

  // -------------------------------------------------------------
  // 1. SEED SALES CATALOG: CAR MODELS & VARIANTS
  // -------------------------------------------------------------
  console.log("\n🚗 1. Seeding Sales Catalog (Car Models & Variants)...");

  // Model 1: Grand Vitara (NEXA - SUV)
  const grandVitara = await prisma.carModel.upsert({
    where: { slug: "grand-vitara" },
    update: {
      name: "Grand Vitara",
      tagline: "The Intelligent Electric Hybrid SUV",
      startingPrice: 1099000.0,
      channel: DealershipChannel.NEXA,
      bodyType: BodyType.SUV,
      isFeatured: true,
      isActive: true,
    },
    create: {
      name: "Grand Vitara",
      slug: "grand-vitara",
      tagline: "The Intelligent Electric Hybrid SUV",
      description:
        "Engineered for the discerning explorer, the Grand Vitara offers Intelligent Electric Hybrid technology, ALLGRIP SELECT AWD, and a commanding road presence with a panoramic sunroof and 360 View Camera.",
      channel: DealershipChannel.NEXA,
      bodyType: BodyType.SUV,
      startingPrice: 1099000.0,
      heroImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      ],
      brochureUrl: "/brochures/grand-vitara-brochure.pdf",
      isFeatured: true,
      isActive: true,
    },
  });

  const grandVitaraVariants = [
    {
      name: "Delta Smart Hybrid 1.5L",
      slug: "delta-smart-hybrid-1-5l",
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      engineCapacityCc: 1462,
      mileage: "21.11 km/l",
      exShowroomPrice: 1220000.0,
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
      exShowroomPrice: 1843000.0,
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
      exShowroomPrice: 1993000.0,
      keyFeatures: ["360 Degree View Camera", "Ventilated Front Seats", "Premium Clarion Sound System", "Tyre Pressure Monitoring (TPMS)"],
      availableColors: ["Arctic White Dual Tone", "Opulent Red Dual Tone", "Midnight Black"],
      isAvailable: true,
    },
  ];

  for (const v of grandVitaraVariants) {
    await prisma.carVariant.upsert({
      where: {
        carModelId_name: {
          carModelId: grandVitara.id,
          name: v.name,
        },
      },
      update: v,
      create: { ...v, carModelId: grandVitara.id },
    });
  }

  // Model 2: Baleno (NEXA - Hatchback)
  const baleno = await prisma.carModel.upsert({
    where: { slug: "baleno" },
    update: {
      name: "Baleno",
      tagline: "Tech Goes Bold",
      startingPrice: 666000.0,
      channel: DealershipChannel.NEXA,
      bodyType: BodyType.HATCHBACK,
      isFeatured: true,
      isActive: true,
    },
    create: {
      name: "Baleno",
      slug: "baleno",
      tagline: "Tech Goes Bold",
      description:
        "The New Age Baleno is sculpted with liquid flow aesthetics and packed with segment-first technology including a Head-Up Display, 360 View Camera, and Next-Gen Suzuki Connect.",
      channel: DealershipChannel.NEXA,
      bodyType: BodyType.HATCHBACK,
      startingPrice: 666000.0,
      heroImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80",
      ],
      brochureUrl: "/brochures/baleno-brochure.pdf",
      isFeatured: true,
      isActive: true,
    },
  });

  const balenoVariants = [
    {
      name: "Delta 1.2L DualJet",
      slug: "delta-1-2l-manual",
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      engineCapacityCc: 1197,
      mileage: "22.35 km/l",
      exShowroomPrice: 750000.0,
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
      exShowroomPrice: 840000.0,
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
      exShowroomPrice: 988000.0,
      keyFeatures: ["9-inch SmartPlay Pro+ Audio", "Head-Up Display (HUD)", "360 View Camera", "16-inch Precision Cut Alloys", "Cruise Control"],
      availableColors: ["Nexa Blue", "Luxe Beige", "Opulent Red", "Pearl Arctic White"],
      isAvailable: true,
    },
  ];

  for (const v of balenoVariants) {
    await prisma.carVariant.upsert({
      where: {
        carModelId_name: {
          carModelId: baleno.id,
          name: v.name,
        },
      },
      update: v,
      create: { ...v, carModelId: baleno.id },
    });
  }

  // Model 3: Swift (ARENA - Hatchback)
  const swift = await prisma.carModel.upsert({
    where: { slug: "swift" },
    update: {
      name: "Swift",
      tagline: "Drive the All-New Z-Series Thrill",
      startingPrice: 649000.0,
      channel: DealershipChannel.ARENA,
      bodyType: BodyType.HATCHBACK,
      isFeatured: true,
      isActive: true,
    },
    create: {
      name: "Swift",
      slug: "swift",
      tagline: "Drive the All-New Z-Series Thrill",
      description:
        "The iconic hatchback reborn with the revolutionary all-new 1.2L Z-Series 3-cylinder engine, dynamic wrap-around cockpit, 6 standard airbags, and unrivaled fuel efficiency.",
      channel: DealershipChannel.ARENA,
      bodyType: BodyType.HATCHBACK,
      startingPrice: 649000.0,
      heroImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
      ],
      brochureUrl: "/brochures/swift-brochure.pdf",
      isFeatured: true,
      isActive: true,
    },
  });

  const swiftVariants = [
    {
      name: "LXi 1.2L Z-Series MT",
      slug: "lxi-1-2l-manual",
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      engineCapacityCc: 1197,
      mileage: "24.80 km/l",
      exShowroomPrice: 649000.0,
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
      exShowroomPrice: 820000.0,
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
      exShowroomPrice: 960000.0,
      keyFeatures: ["9-inch HD SmartPlay Pro+", "Wireless Android Auto & Apple CarPlay", "LED Projector Headlamps with DRLs", "Wireless Phone Charger"],
      availableColors: ["Sizzling Red with Midnight Black Roof", "Luster Blue with Midnight Black Roof", "Pearl Arctic White"],
      isAvailable: true,
    },
  ];

  for (const v of swiftVariants) {
    await prisma.carVariant.upsert({
      where: {
        carModelId_name: {
          carModelId: swift.id,
          name: v.name,
        },
      },
      update: v,
      create: { ...v, carModelId: swift.id },
    });
  }

  // Model 4: Brezza (ARENA - SUV)
  const brezza = await prisma.carModel.upsert({
    where: { slug: "brezza" },
    update: {
      name: "Brezza",
      tagline: "Hot and Techy SUV",
      startingPrice: 834000.0,
      channel: DealershipChannel.ARENA,
      bodyType: BodyType.SUV,
      isFeatured: true,
      isActive: true,
    },
    create: {
      name: "Brezza",
      slug: "brezza",
      tagline: "Hot and Techy SUV",
      description:
        "Command every boulevard in India's favorite compact SUV. Featuring an electric sunroof, 6-speed torque converter automatic with paddle shifters, and muscular SUV styling.",
      channel: DealershipChannel.ARENA,
      bodyType: BodyType.SUV,
      startingPrice: 834000.0,
      heroImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      ],
      brochureUrl: "/brochures/brezza-brochure.pdf",
      isFeatured: true,
      isActive: true,
    },
  });

  const brezzaVariants = [
    {
      name: "LXi 1.5L K-Series MT",
      slug: "lxi-1-5l-manual",
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      engineCapacityCc: 1462,
      mileage: "17.38 km/l",
      exShowroomPrice: 834000.0,
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
      exShowroomPrice: 1065000.0,
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
      exShowroomPrice: 1414000.0,
      keyFeatures: ["Electric Sunroof", "Paddle Shifters", "Arkamys Surround Sound System", "Head-Up Display", "360 View Camera"],
      availableColors: ["Brave Khaki with Arctic White Roof", "Sizzling Red with Midnight Black Roof", "Splendid Silver with Black Roof"],
      isAvailable: true,
    },
  ];

  for (const v of brezzaVariants) {
    await prisma.carVariant.upsert({
      where: {
        carModelId_name: {
          carModelId: brezza.id,
          name: v.name,
        },
      },
      update: v,
      create: { ...v, carModelId: brezza.id },
    });
  }

  console.log(`✅ Seeded 4 Car Models & 12 Variants: Grand Vitara, Baleno, Swift, Brezza.`);

  // -------------------------------------------------------------
  // 2. SEED TRUE VALUE: CERTIFIED PRE-OWNED CARS
  // -------------------------------------------------------------
  console.log("\n🚘 2. Seeding True Value Certified Pre-Owned Cars...");

  const usedCarsData = [
    {
      registrationNumber: "UP32EA4582",
      make: "Maruti Suzuki",
      model: "Swift",
      variant: "ZXi 1.2L DualJet",
      yearOfManufacture: 2023,
      ownershipCount: 1,
      odometerReadingKm: 18200,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      bodyColor: "Pearl Metallic Lucent Orange",
      sellingPrice: 685000.0,
      status: UsedCarStatus.AVAILABLE,
      certifiedByTrueValue: true,
      inspectionPointCount: 376,
      warrantyMonths: 12,
      freeServicesCount: 3,
      city: "Lucknow",
      rtoState: "UP (Uttar Pradesh - Lucknow RTO)",
      conditionNotes:
        "Single corporate owner, non-accidental vehicle. Full showroom service history available at Dev Motors. Brand new Michelin tyres, valid comprehensive insurance until November 2026. Immaculate interior and exterior.",
      dealershipBranch: "Dev Motors Main Arena Campus, Lucknow",
      featuredImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      registrationNumber: "UP32DF8190",
      make: "Maruti Suzuki",
      model: "Baleno",
      variant: "Alpha 1.2L DualJet (Top Model)",
      yearOfManufacture: 2022,
      ownershipCount: 1,
      odometerReadingKm: 29400,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      bodyColor: "Celestial Blue",
      sellingPrice: 745000.0,
      status: UsedCarStatus.AVAILABLE,
      certifiedByTrueValue: true,
      inspectionPointCount: 376,
      warrantyMonths: 12,
      freeServicesCount: 3,
      city: "Lucknow",
      rtoState: "UP (Uttar Pradesh - Lucknow RTO)",
      conditionNotes:
        "Single doctor owner, 100% original paint, verified odometer. Equipped with Head-Up Display and 360-degree camera. All periodic services completed at Nexa Dev Motors.",
      dealershipBranch: "Dev Motors Nexa Lounge, Lucknow",
      featuredImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      registrationNumber: "DL8CBA7712",
      make: "Maruti Suzuki",
      model: "Brezza",
      variant: "VXi Smart Hybrid 1.5L AT",
      yearOfManufacture: 2021,
      ownershipCount: 1,
      odometerReadingKm: 44000,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.AUTOMATIC,
      bodyColor: "Magma Grey",
      sellingPrice: 815000.0,
      status: UsedCarStatus.AVAILABLE,
      certifiedByTrueValue: true,
      inspectionPointCount: 376,
      warrantyMonths: 12,
      freeServicesCount: 3,
      city: "Lucknow",
      rtoState: "DL (Delhi NCR RTO - NOC ready for UP transfer)",
      conditionNotes:
        "Genuine highway driven vehicle. Smooth torque-converter automatic transmission, chilled climate control, clean battery and suspension diagnostic report. Certified under 376 True Value checkpoints.",
      dealershipBranch: "Dev Motors True Value Hub, Lucknow",
      featuredImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      registrationNumber: "UP32MN1024",
      make: "Maruti Suzuki",
      model: "Grand Vitara",
      variant: "Delta Smart Hybrid 1.5L",
      yearOfManufacture: 2024,
      ownershipCount: 1,
      odometerReadingKm: 9800,
      fuelType: FuelType.PETROL,
      transmission: TransmissionType.MANUAL,
      bodyColor: "Nexa Blue",
      sellingPrice: 1125000.0,
      status: UsedCarStatus.AVAILABLE,
      certifiedByTrueValue: true,
      inspectionPointCount: 376,
      warrantyMonths: 24,
      freeServicesCount: 3,
      city: "Lucknow",
      rtoState: "UP (Uttar Pradesh - Lucknow RTO)",
      conditionNotes:
        "Virtually brand new showroom-grade vehicle. Manufacturer warranty active till 2027 + additional True Value extended warranty. Untouched spare wheel, zero scratch bodywork.",
      dealershipBranch: "Dev Motors True Value Hub, Lucknow",
      featuredImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      ],
    },
  ];

  for (const car of usedCarsData) {
    await prisma.usedCar.upsert({
      where: { registrationNumber: car.registrationNumber },
      update: car,
      create: car,
    });
  }

  console.log(`✅ Seeded ${usedCarsData.length} True Value Certified Pre-Owned Vehicles.`);

  // -------------------------------------------------------------
  // 3. SEED INSURANCE PLANS (DEFAULT ADD-ON COVERS)
  // -------------------------------------------------------------
  console.log("\n🛡️ 3. Seeding Maruti Insurance Plans & Add-On Covers...");

  const insurancePlansData = [
    {
      name: "Zero Depreciation Cover (Bumper-to-Bumper)",
      slug: "zero-depreciation",
      description:
        "Ensures complete claim settlement without deducting depreciation on metal, rubber, nylon, plastic, or fiberglass vehicle components during collision claims.",
      category: "Comprehensive Add-On",
      startingPrice: 2499.0,
      keyBenefits: [
        "100% claim settlement on plastic, rubber, fiber, and metal parts",
        "Applicable up to 2 claims per policy year",
        "Zero deduction on repair bills at authorized Dev Motors workshops",
        "Cashless claim processing across all Dev Motors network centers",
      ],
      isActive: true,
    },
    {
      name: "Engine & Gearbox Protection Cover",
      slug: "engine-protect",
      description:
        "Protects against severe expenses resulting from hydrostatic lock caused by water ingression in flooded roads or differential lubricant leakage.",
      category: "Comprehensive Add-On",
      startingPrice: 1899.0,
      keyBenefits: [
        "Covers complete engine repair and replacement costs due to water ingression",
        "Covers gearbox damage caused by accidental lubricant leakage",
        "Includes cylinder head, piston, crankshaft, and connecting rod overhaul",
        "Essential protection for monsoons and high water-logging zones",
      ],
      isActive: true,
    },
    {
      name: "24x7 Roadside Assistance (RSA)",
      slug: "roadside-assistance",
      description:
        "Round-the-clock nationwide emergency support for breakdown towing, flat tyre assistance, emergency fuel delivery, and battery jumpstart.",
      category: "Assistance Cover",
      startingPrice: 999.0,
      keyBenefits: [
        "Free towing to the nearest Dev Motors service station (up to 50 km)",
        "On-spot battery jumpstart & minor mechanical repairs",
        "Emergency fuel supply assistance up to 5 Litres",
        "Key lockout and tyre puncture replacement assistance",
      ],
      isActive: true,
    },
    {
      name: "Return to Invoice (RTI) Cover",
      slug: "return-to-invoice",
      description:
        "In the unfortunate event of vehicle total loss or theft, bridges the gap between Insured Declared Value (IDV) and the original on-road purchase price.",
      category: "Total Loss Add-On",
      startingPrice: 3199.0,
      keyBenefits: [
        "Reimburses full original on-road purchase price upon total loss or theft",
        "Reimburses road tax, registration fees, and municipal levies paid",
        "Valid for vehicles up to 3 years old",
        "Provides total peace of mind for newly purchased Arena and Nexa cars",
      ],
      isActive: true,
    },
  ];

  for (const plan of insurancePlansData) {
    await prisma.insurancePlan.upsert({
      where: { slug: plan.slug },
      update: plan,
      create: plan,
    });
  }

  console.log(`✅ Seeded ${insurancePlansData.length} Maruti Insurance Add-On Plans.`);

  // -------------------------------------------------------------
  // 4. SAMPLE INSURANCE INQUIRY (LEAD DEMO)
  // -------------------------------------------------------------
  console.log("\n📋 4. Seeding Sample Insurance Renewal Inquiry...");

  await prisma.insuranceInquiry.upsert({
    where: { inquiryNumber: "INS-2026-0001" },
    update: {},
    create: {
      inquiryNumber: "INS-2026-0001",
      customerName: "Rahul Sharma",
      customerPhone: "+91 98765 43210",
      customerEmail: "rahul.sharma@example.com",
      vehicleRegNumber: "UP32EA4582",
      carMakeAndModel: "Maruti Suzuki Swift ZXi",
      previousPolicyNumber: "MB-2025-998811",
      previousInsurer: "Maruti Insurance Broking (Bajaj Allianz)",
      hasExistingClaim: false,
      claimedNcbPercentage: 25,
      quotedAmount: 14850.0,
      agentNotes: "Customer requested Zero Depreciation + Engine Protect add-on combo.",
    },
  });

  console.log("\n✨ Dev Motors database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
