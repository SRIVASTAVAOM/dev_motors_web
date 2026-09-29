import {
  ValuationInput,
  ValuationResult,
  TrueValueCarItem,
  FullInspectionReport,
} from "@/lib/types/true-value";

/**
 * Standard Indian Automotive Depreciation Algorithm
 * - Initial year depreciation: 15% - 20%
 * - Age depreciation: ~10% per year for years 2-4, then 7-8% subsequently
 * - Mileage penalty/reward: Base expectation ~10,000 km/year.
 * - Ownership penalty: 2nd owner -7%, 3rd owner -15%
 * - Accidental penalty: None: 0%, Minor: -6%, Major: -22%
 */
export function calculateInstantValuation(input: ValuationInput): ValuationResult {
  const currentYear = 2026;
  const age = Math.max(1, currentYear - input.year);

  // Approximate base original new on-road price in INR
  const basePriceMap: Record<string, number> = {
    swift: 820000,
    baleno: 890000,
    brezza: 1150000,
    dzire: 850000,
    ertiga: 1180000,
    "grand vitara": 1650000,
    wagonr: 650000,
    "alto k10": 520000,
    fronx: 1020000,
    jimny: 1450000,
    xl6: 1350000,
    ciaz: 1100000,
    ignis: 720000,
    celerio: 620000,
  };

  const modelKey = input.model.toLowerCase().trim();
  const estimatedOriginal = basePriceMap[modelKey] || 850000;

  // 1. Age Depreciation Factor
  let ageDepreciation = 0;
  if (age === 1) ageDepreciation = 0.15;
  else if (age === 2) ageDepreciation = 0.25;
  else if (age === 3) ageDepreciation = 0.35;
  else if (age === 4) ageDepreciation = 0.44;
  else if (age === 5) ageDepreciation = 0.52;
  else ageDepreciation = Math.min(0.78, 0.52 + (age - 5) * 0.05);

  // 2. Mileage Factor (benchmarked at 10,000 km/year)
  const expectedKm = age * 10000;
  const kmDifference = input.kmDriven - expectedKm;
  // Penalty of ~0.5% per 5,000 excess km or bonus for low km
  const kmAdjustment = (kmDifference / 5000) * 0.012;
  const clampedKmAdjustment = Math.max(-0.08, Math.min(0.18, kmAdjustment));

  // 3. Ownership Factor
  let ownershipPenalty = 0;
  if (input.ownership === 2) ownershipPenalty = 0.07;
  else if (input.ownership >= 3) ownershipPenalty = 0.15;

  // 4. Accidental History
  let accidentalPenalty = 0;
  if (input.accidentalHistory === "MINOR_COSMETIC") accidentalPenalty = 0.06;
  else if (input.accidentalHistory === "MAJOR_REPAIR") accidentalPenalty = 0.22;

  // 5. Powertrain adjustment (CNG & Hybrids retain higher resale value)
  let fuelBonus = 0;
  if (input.fuelType === "CNG") fuelBonus = 0.04;
  if (input.fuelType === "HYBRID") fuelBonus = 0.06;

  const totalDepreciation = Math.min(
    0.85,
    Math.max(0.10, ageDepreciation + clampedKmAdjustment + ownershipPenalty + accidentalPenalty - fuelBonus)
  );

  const fairPrice = Math.round((estimatedOriginal * (1 - totalDepreciation)) / 1000) * 1000;
  const spread = Math.round(fairPrice * 0.04);
  const minPrice = fairPrice - spread;
  const maxPrice = fairPrice + spread;

  let marketDemand: "VERY_HIGH" | "HIGH" | "MODERATE" = "HIGH";
  if (["swift", "baleno", "brezza", "ertiga", "grand vitara"].includes(modelKey)) {
    marketDemand = "VERY_HIGH";
  } else if (age > 7) {
    marketDemand = "MODERATE";
  }

  return {
    fairPrice,
    minPrice,
    maxPrice,
    marketDemand,
    depreciationPercentage: Math.round(totalDepreciation * 100),
    estimatedOnRoadOriginal: estimatedOriginal,
  };
}

/**
 * Standard 376-Point Digital Inspection Report Data
 */
export function generateSampleInspectionReport(car: TrueValueCarItem): FullInspectionReport {
  return {
    carRegNumber: car.registrationNumber,
    carTitle: `${car.yearOfManufacture} ${car.make} ${car.model} ${car.variant}`,
    inspectorName: "Er. Amit Trivedi (Chief Certified True Value Engineer, Dev Motors)",
    inspectionDate: "September 2026",
    overallScore: car.inspectionScore || 97,
    sections: [
      {
        title: "Engine, Fuel & Transmission",
        checkpointCount: 92,
        passedCount: 92,
        status: "EXCELLENT",
        highlights: [
          "Cylinder compression test passed (within 2% OEM specification)",
          "Engine oil viscosity & level verified optimal (Synthetic grade)",
          "Transmission gear engagement smooth, clutch plate wear < 15%",
          "Cooling radiator & water pump pressure tested (zero leaks)",
        ],
      },
      {
        title: "Chassis, Frame & Structural Integrity",
        checkpointCount: 74,
        passedCount: 74,
        status: "PASSED",
        highlights: [
          "100% Non-Accidental: Apron, A-B-C Pillars and floor bed intact",
          "Zero underbody rust or frame deformation detected",
          "OEM spot welds match factory automated line standards",
        ],
      },
      {
        title: "Braking, Suspension & Steering",
        checkpointCount: 68,
        passedCount: 68,
        status: "EXCELLENT",
        highlights: [
          "Front brake discs and rear drum lining > 75% life remaining",
          "ABS hydraulic modulator and wheel speed sensors calibrated",
          "MacPherson strut suspension rebound & shock absorbers tested",
          "Electronic Power Steering (EPS) centring play verified 0 mm",
        ],
      },
      {
        title: "Electricals, Battery & Air Conditioning",
        checkpointCount: 82,
        passedCount: 82,
        status: "PASSED",
        highlights: [
          "Computerized OBD-II diagnostic scan: 0 stored DTC trouble codes",
          "Battery cold-cranking test (CCA) rated 96% health",
          "AC cabin cooling grill temperature reached 6.2°C within 3 minutes",
          "All power windows, infotainment & LED lights verified working",
        ],
      },
      {
        title: "Documentation, RTO & Title Verification",
        checkpointCount: 60,
        passedCount: 60,
        status: "PASSED",
        highlights: [
          "Original Registration Certificate (RC) clear of bank hypothecation/NOC ready",
          "National Crime Record Bureau (NCRB) & police record verified clear",
          "Zero pending e-challans or traffic fines across state RTOs",
          "Odometer history cross-verified with authorized dealer DMS logs",
        ],
      },
    ],
  };
}
