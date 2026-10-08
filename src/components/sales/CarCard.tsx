"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CarModelData } from "@/lib/types/sales";
import TestDriveModal from "@/components/sales/TestDriveModal";
import {
  Gauge,
  Fuel,
  Cog,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";

interface CarCardProps {
  car: CarModelData;
}

// Utility to format price in Lakhs
export function formatIndianPrice(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

// Rough monthly EMI estimation (assuming 20% downpayment, 8.5% interest, 5 years)
export function calculateStartingEmi(startingPrice: number): string {
  const principal = startingPrice * 0.8;
  const rate = 8.5 / (12 * 100);
  const tenureMonths = 60;
  const emi =
    (principal * rate * Math.pow(1 + rate, tenureMonths)) /
    (Math.pow(1 + rate, tenureMonths) - 1);
  return Math.round(emi).toLocaleString("en-IN");
}

export default function CarCard({ car }: CarCardProps) {
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });

  // 3D Tilt calculation on mousemove
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransformStyle(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`
    );

    setGlare({
      opacity: 0.22,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)");
    setGlare({ opacity: 0, x: 50, y: 50 });
  };

  const availableFuelTypes = Array.from(
    new Set(car.variants.map((v) => v.fuelType))
  );
  const availableTransmissions = Array.from(
    new Set(car.variants.map((v) => v.transmission))
  );

  const bestMileageVariant = car.variants.find((v) => v.mileage) || car.variants[0];
  const variantNames = car.variants.map((v) => v.name);
  const isNexa = car.channel === "NEXA";

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transformStyle,
          transition: "transform 0.16s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease",
        }}
        className="group relative flex flex-col bg-white border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-200 select-none will-change-transform"
      >
        {/* Top Badges & Image Preview */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-200/90 border-b border-gray-100">
          {car.heroImage ? (
            <Image
              src={car.heroImage}
              alt={car.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-108 drop-shadow-sm"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

          {/* Dynamic 3D Glare */}
          <div
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 65%)`,
              transition: "opacity 0.2s ease-out",
            }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
          />

          {/* Dealership Channel Pill (NEXA or ARENA) */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 z-10">
            <span
              className={`px-2 py-0.5 text-[10px] font-black tracking-widest uppercase shadow-sm ${
                isNexa
                  ? "bg-black text-amber-300 border border-amber-400/40"
                  : "bg-[#E31837] text-white"
              }`}
            >
              {car.channel}
            </span>

            {car.isFeatured && (
              <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-[#1B365D] text-white shadow-sm">
                HOT PICK
              </span>
            )}
          </div>

          {/* Body Type Pill */}
          <div className="absolute right-3 top-3 z-10">
            <span className="bg-black/70 px-2 py-0.5 text-[10px] font-bold text-gray-200 uppercase tracking-wider">
              {car.bodyType}
            </span>
          </div>

          {/* Mileage Badge Overlay */}
          {bestMileageVariant?.mileage && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/80 px-2.5 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/30 z-10">
              <Gauge className="h-3 w-3" />
              <span>{bestMileageVariant.mileage} ARAI*</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-5 space-y-3">
          {/* Title & Tagline */}
          <div>
            <h3 className="text-lg font-black tracking-wider uppercase text-[#111827] group-hover:text-[#E31837] transition-colors">
              {car.name}
            </h3>
            {car.tagline && (
              <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-medium">
                {car.tagline}
              </p>
            )}
          </div>

          {/* Fuel & Transmission Chips */}
          <div className="flex flex-wrap gap-1">
            {availableFuelTypes.map((fuel) => (
              <span
                key={fuel}
                className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-700"
              >
                <Fuel className="h-2.5 w-2.5 text-gray-500" />
                {fuel}
              </span>
            ))}
            {availableTransmissions.map((trans) => (
              <span
                key={trans}
                className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-700"
              >
                <Cog className="h-2.5 w-2.5 text-gray-500" />
                {trans}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <div className="text-[11px] text-gray-600 space-y-1 pt-1 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-[#1B365D]" />
              <span>
                {car.variants.length} Trims:{" "}
                <span className="font-semibold text-gray-900">
                  {car.variants.map((v) => v.name.split(" ")[0]).slice(0, 3).join(", ")}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span>Standard 3-Year Maruti Suzuki Warranty</span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-auto pt-3 border-t border-gray-200">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Starting Ex-Showroom
              </span>
              <span className="text-base font-black text-[#111827]">
                {formatIndianPrice(car.startingPrice)}*
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3">
              <span>Estimated EMI</span>
              <span className="font-bold text-[#E31837]">
                ₹{calculateStartingEmi(car.startingPrice)}/mo*
              </span>
            </div>

            {/* Dual Sharp Rectangular Action CTAs */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/sales/${car.slug}`}
                className="flex items-center justify-center gap-1 bg-white border border-gray-300 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-900 hover:border-black hover:bg-gray-50 transition-colors text-center"
              >
                <span>Specs</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              <button
                onClick={() => setTestDriveOpen(true)}
                className="flex items-center justify-center gap-1 bg-[#E31837] hover:bg-[#C8102E] text-white py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <CalendarCheck className="h-3 w-3" />
                <span>Test Drive</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Drive Modal */}
      <TestDriveModal
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
        carModelName={car.name}
        availableVariants={variantNames}
      />
    </>
  );
}
