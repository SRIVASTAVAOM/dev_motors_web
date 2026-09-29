"use client";

import { useState } from "react";
import CarStage, { ColorSwatch, GRAND_VITARA_COLORS } from "@/components/3d/CarStage";
import ArenaEmiCalculator from "@/components/sales/ArenaEmiCalculator";
import TestDriveModal from "@/components/sales/TestDriveModal";
import { Fuel, CalendarCheck, Info } from "lucide-react";

export interface GrandVitaraVariant {
  id: string;
  name: string;
  code: string;
  powertrain: string;
  fuelType: "PETROL" | "STRONG_HYBRID";
  transmission: string;
  exShowroomPrice: number;
  araiMileage: string;
  engineCc: number;
  highlightSpecs: string[];
  isPopular?: boolean;
}

const GRAND_VITARA_VARIANTS: GrandVitaraVariant[] = [
  {
    id: "delta-smart-hybrid",
    name: "Delta 1.5L Smart Hybrid",
    code: "DELTA_MT",
    powertrain: "1.5L K15C Dual Jet Dual VVT + ISG",
    fuelType: "PETROL",
    transmission: "5-Speed Manual",
    exShowroomPrice: 1220000,
    araiMileage: "21.11 km/l",
    engineCc: 1462,
    highlightSpecs: [
      "SmartPlay Pro 7-inch Touchscreen",
      "Keyless Push Start / Stop",
      "Cruise Control & Steering Audio Controls",
      "Rear Parking Camera with Sensors",
      "Dual Airbags & ESP with Hill Hold",
    ],
  },
  {
    id: "zeta-plus-hybrid",
    name: "Zeta+ Intelligent Electric Hybrid",
    code: "ZETA_PLUS_ECVT",
    powertrain: "1.5L Atkinson Cycle + Synchronous AC Electric Motor",
    fuelType: "STRONG_HYBRID",
    transmission: "e-CVT (Electric Variable)",
    exShowroomPrice: 1843000,
    araiMileage: "27.97 km/l",
    engineCc: 1490,
    highlightSpecs: [
      "Dedicated Full-Electric EV Drive Mode",
      "Panoramic Sunroof with Dual Sliding Panes",
      "Head-Up Display (HUD) with Hybrid Telemetry",
      "Wireless Smartphone Charging Dock",
      "6 Airbags (Front, Side & Curtain)",
    ],
    isPopular: true,
  },
  {
    id: "alpha-plus-hybrid",
    name: "Alpha+ Strong Hybrid (Flagship)",
    code: "ALPHA_PLUS_TOP",
    powertrain: "1.5L Strong Hybrid + High Output Lithium-Ion Battery",
    fuelType: "STRONG_HYBRID",
    transmission: "e-CVT (Electric Variable)",
    exShowroomPrice: 1993000,
    araiMileage: "27.97 km/l",
    engineCc: 1490,
    highlightSpecs: [
      "360-Degree Surround View HD Camera",
      "Front Ventilated Leatherette Seats",
      "Premium Clarion 6-Speaker Hi-Fi Audio",
      "Tyre Pressure Monitoring System (TPMS)",
      "9-inch SmartPlay Pro+ with Wireless Carplay",
    ],
  },
];

export default function DaylightGrandVitaraShowroom() {
  const [selectedVariant, setSelectedVariant] = useState<GrandVitaraVariant>(
    GRAND_VITARA_VARIANTS[1] // Default to Zeta+ Strong Hybrid
  );
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(
    GRAND_VITARA_COLORS[0]
  );
  const [testDriveOpen, setTestDriveOpen] = useState(false);

  const formatPriceLakh = (price: number) => {
    const inLakhs = (price / 100000).toFixed(2);
    return `₹ ${inLakhs} Lakh*`;
  };

  return (
    <div className="bg-[#FFFFFF] text-[#111827] min-h-screen">
      {/* ------------------------------------------------------------- */}
      {/* 1. SEAMLESS TOP 3D STUDIO CANVAS INTEGRATION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full border-b border-[#E5E7EB]">
        <CarStage
          modelName="GRAND VITARA"
          variantName={selectedVariant.name}
          startingPrice={formatPriceLakh(selectedVariant.exShowroomPrice)}
          onColorChange={(swatch) => setSelectedColor(swatch)}
        />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. COMMERCIAL PRICING & SPEC BAR */}
      {/* ------------------------------------------------------------- */}
      <section className="sticky top-20 z-30 bg-[#FFFFFF] border-b border-[#E5E7EB] shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            {/* Model & Active Variant Identification */}
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#111827] uppercase">
                    MARUTI SUZUKI GRAND VITARA
                  </span>
                  <span className="bg-[#111827] text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">
                    ARENA & NEXA
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4B5563] mt-0.5">
                  <span className="text-[#E31837] font-bold">{selectedVariant.name}</span>
                  <span>•</span>
                  <span>{selectedColor.name}</span>
                </div>
              </div>
            </div>

            {/* Price & Primary CTA Cluster */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Mileage & Fuel Pill */}
              <div className="flex items-center gap-3 pr-4 sm:border-r border-[#E5E7EB]">
                <div className="text-left sm:text-right">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    <Fuel className="h-3 w-3 text-[#E31837]" />
                    <span>{selectedVariant.fuelType.replace("_", " ")}</span>
                  </div>
                  <div className="text-xs font-black text-[#059669] font-mono">
                    {selectedVariant.araiMileage} ARAI*
                  </div>
                </div>
              </div>

              {/* Price Block */}
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                  EX-SHOWROOM LUCKNOW
                </span>
                <span className="text-2xl font-black text-[#111827] font-mono tracking-tight block">
                  ₹ {selectedVariant.exShowroomPrice.toLocaleString("en-IN")}*
                </span>
              </div>

              {/* Sharp Red Rectangular CTA */}
              <button
                type="button"
                onClick={() => setTestDriveOpen(true)}
                className="flex items-center justify-center gap-2 bg-[#E31837] text-white px-6 py-3.5 text-xs font-black uppercase tracking-wider hover:bg-[#C8102E] active:bg-[#A80D26] transition-colors rounded-none shadow-none"
              >
                <CalendarCheck className="h-4 w-4" />
                <span>Book Test Drive</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. VARIANT SELECTION ARCHITECTURAL TABS */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-[#F4F5F7] border-b border-[#E5E7EB] py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-[#4B5563]">
              SELECT TRIM & POWERTRAIN ARCHITECTURE:
            </span>
            <span className="text-[11px] text-[#6B7280]">
              Showing 3 Available Lineup Variants
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {GRAND_VITARA_VARIANTS.map((variant) => {
              const isSelected = selectedVariant.id === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-4 text-left border transition-all rounded-none ${
                    isSelected
                      ? "bg-white border-[#E31837] ring-1 ring-[#E31837] shadow-xs"
                      : "bg-white border-[#E5E7EB] hover:border-[#D1D5DB]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-[#111827] uppercase">
                          {variant.name}
                        </span>
                        {variant.isPopular && (
                          <span className="bg-[#E31837] text-white px-1.5 py-0.2 text-[9px] font-bold uppercase">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#4B5563] block mt-0.5">
                        {variant.transmission} • {variant.engineCc} cc
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black font-mono text-[#111827]">
                        ₹ {(variant.exShowroomPrice / 100000).toFixed(2)} L*
                      </span>
                      <span className="text-[10px] text-[#059669] font-bold block">
                        {variant.araiMileage}
                      </span>
                    </div>
                  </div>

                  {/* Bullet previews */}
                  <div className="mt-3 pt-3 border-t border-[#F4F5F7] space-y-1">
                    {variant.highlightSpecs.slice(0, 2).map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-[11px] text-[#6B7280]"
                      >
                        <span className="w-1 h-1 bg-[#E31837]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. ENGINEERING BLUEPRINT SPEC MATRIX (4-COLUMN GRID) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Header */}
          <div className="border-b border-[#E5E7EB] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3 bg-[#E31837]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#4B5563]">
                ENGINEERING BLUEPRINT
              </span>
            </div>
            <h2 className="text-2xl font-black uppercase text-[#111827] tracking-tight mt-1">
              Technical Specifications & Performance Data
            </h2>
            <p className="text-xs text-[#4B5563] mt-0.5">
              Official ARAI and OEM homologation engineering parameters for Maruti Suzuki Grand Vitara.
            </p>
          </div>

          {/* 4-Column Border-Separated White Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#E5E7EB] bg-white divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
            {/* Column 1: Powertrain & Architecture */}
            <div className="p-6 space-y-4">
              <div className="border-b border-[#E5E7EB] pb-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] block">
                  SYSTEM 01
                </span>
                <h3 className="text-sm font-black text-[#111827] uppercase">
                  POWERTRAIN & MOTOR
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Engine Type
                  </span>
                  <span className="font-bold text-[#111827]">
                    {selectedVariant.powertrain}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Displacement & Valves
                  </span>
                  <span className="font-bold text-[#111827]">
                    {selectedVariant.engineCc} cc • 16-Valve DOHC
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Combined Max Power
                  </span>
                  <span className="font-bold text-[#111827]">
                    115.56 PS (85 kW) @ 5,500 rpm
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Electric Motor Output
                  </span>
                  <span className="font-bold text-[#111827]">
                    79 PS • 141 Nm Instant Torque
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Transmission
                  </span>
                  <span className="font-bold text-[#111827]">
                    {selectedVariant.transmission}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Fuel Efficiency & Dynamics */}
            <div className="p-6 space-y-4">
              <div className="border-b border-[#E5E7EB] pb-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] block">
                  SYSTEM 02
                </span>
                <h3 className="text-sm font-black text-[#111827] uppercase">
                  EFFICIENCY & RANGE
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    ARAI Certified Mileage
                  </span>
                  <span className="font-mono text-base font-black text-[#059669]">
                    {selectedVariant.araiMileage}*
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Single-Tank Driving Range
                  </span>
                  <span className="font-bold text-[#111827]">
                    Up to 1,200 km (45L Tank)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    EV Mode Capability
                  </span>
                  <span className="font-bold text-[#111827]">
                    Zero-Emission Pure Electric Drive
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Braking Energy Capture
                  </span>
                  <span className="font-bold text-[#111827]">
                    Advanced Multi-Stage Regenerative Braking
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Emission Norms
                  </span>
                  <span className="font-bold text-[#111827]">
                    BS6 Phase 2 (OBD-II Compliant)
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3: Dimensions & Chassis */}
            <div className="p-6 space-y-4">
              <div className="border-b border-[#E5E7EB] pb-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] block">
                  SYSTEM 03
                </span>
                <h3 className="text-sm font-black text-[#111827] uppercase">
                  DIMENSIONS & CHASSIS
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Length x Width x Height
                  </span>
                  <span className="font-bold text-[#111827]">
                    4,345 mm x 1,795 mm x 1,645 mm
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Wheelbase
                  </span>
                  <span className="font-bold text-[#111827]">
                    2,600 mm (Spacious 5-Seater)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Ground Clearance
                  </span>
                  <span className="font-bold text-[#111827]">
                    210 mm (Unladen Benchmark)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Turning Radius
                  </span>
                  <span className="font-bold text-[#111827]">
                    5.4 m (Nimble Urban Turning)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Suspension
                  </span>
                  <span className="font-bold text-[#111827]">
                    MacPherson Strut (F) / Torsion Beam (R)
                  </span>
                </div>
              </div>
            </div>

            {/* Column 4: Safety & Protective Shield */}
            <div className="p-6 space-y-4">
              <div className="border-b border-[#E5E7EB] pb-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#9CA3AF] block">
                  SYSTEM 04
                </span>
                <h3 className="text-sm font-black text-[#111827] uppercase">
                  SAFETY SHIELD
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Core Body Architecture
                  </span>
                  <span className="font-bold text-[#111827]">
                    Suzuki TECT High-Tensile Steel Body
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Airbags
                  </span>
                  <span className="font-bold text-[#111827]">
                    6 Airbags (Front, Side & Curtains)
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Braking System
                  </span>
                  <span className="font-bold text-[#111827]">
                    All-4 Disc Brakes with ABS + EBD
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Dynamic Stability
                  </span>
                  <span className="font-bold text-[#111827]">
                    ESP with Hill Hold & Hill Descent Assist
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">
                    Camera & Vision
                  </span>
                  <span className="font-bold text-[#111827]">
                    360° HD Panoramic View Camera
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. SMART FINANCE EMI & DOWNPAYMENT CALCULATOR */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 bg-[#F4F5F7] border-y border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ArenaEmiCalculator
            exShowroomPrice={selectedVariant.exShowroomPrice}
            carName="Grand Vitara"
            variantName={selectedVariant.name}
            onBookTestDrive={() => setTestDriveOpen(true)}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. STATUTORY DISCLAIMERS & FOOTNOTE */}
      {/* ------------------------------------------------------------- */}
      <section className="py-8 bg-white text-[11px] text-[#6B7280] border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-[#E31837] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>
                *Ex-showroom prices quoted are for Lucknow, Uttar Pradesh, and are indicative. Final on-road price includes mandatory Road Tax & Registration fees, Fastag, Compulsory Motor Insurance, TCS, and optional accessories.
              </p>
              <p>
                *Fuel efficiency figures (27.97 km/l for Intelligent Electric Hybrid and 21.11 km/l for 1.5L Smart Hybrid) are as certified by test agency ARAI under Rule 115 of the Central Motor Vehicles Rules 1989. Real-world performance may vary depending on traffic conditions, driving style, AC usage, and maintenance schedule.
              </p>
              <p>
                *Colors shown are generated via WebGL calibrated for daylight showroom conditions. Dual-tone paint options (Black Roof) are available on select Zeta+ and Alpha+ trims at supplementary cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Drive Booking Modal */}
      <TestDriveModal
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
        carModelName="Grand Vitara"
        variantName={selectedVariant.name}
        availableVariants={GRAND_VITARA_VARIANTS.map((v) => v.name)}
      />
    </div>
  );
}
