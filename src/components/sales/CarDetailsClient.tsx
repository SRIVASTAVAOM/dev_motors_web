"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { CarModelData, CarVariantData } from "@/lib/types/sales";
import VariantComparison from "@/components/sales/VariantComparison";
import EmiCalculator from "@/components/sales/EmiCalculator";
import TestDriveModal from "@/components/sales/TestDriveModal";
import { formatIndianPrice } from "@/components/sales/CarCard";
import {
  CalendarCheck,
  ShieldCheck,
  Fuel,
  Cog,
  Gauge,
  Sparkles,
  PhoneCall,
  FileText,
} from "lucide-react";

interface CarDetailsClientProps {
  car: CarModelData;
}

export default function CarDetailsClient({ car }: CarDetailsClientProps) {
  // Active selected variant
  const [selectedVariant, setSelectedVariant] = useState<CarVariantData>(
    car.variants[car.variants.length - 1] || car.variants[0]
  );

  // Gallery active image
  const [activeImage, setActiveImage] = useState<string>(
    car.heroImage || car.galleryImages[0] || ""
  );

  // 3D Tilt for Hero Gallery
  const heroRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
    );

    setGlare({
      opacity: 0.2,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare({ opacity: 0, x: 50, y: 50 });
  };

  // Test drive modal state
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [testDriveVariantName, setTestDriveVariantName] = useState<string>(
    selectedVariant.name
  );

  const handleOpenTestDrive = (vName?: string) => {
    setTestDriveVariantName(vName || selectedVariant.name);
    setTestDriveOpen(true);
  };

  const isNexa = car.channel === "NEXA";
  const allVariantNames = car.variants.map((v) => v.name);

  return (
    <div className="space-y-12 pb-24 bg-white text-[#111827]">
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION: MEDIA & KEY SPECS */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Gallery (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image with 3D Tilt */}
          <div
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: transformStyle,
              transition: "transform 0.16s cubic-bezier(0.2, 0, 0, 1)",
            }}
            className="group relative aspect-[16/10] w-full overflow-hidden border border-gray-200 bg-gradient-to-b from-white via-gray-50 to-gray-200/90 shadow-xs will-change-transform select-none"
          >
            {activeImage ? (
              <Image
                src={activeImage}
                alt={car.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-4 pb-8 transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                No preview available
              </div>
            )}

            {/* Dynamic Glare Sheen */}
            <div
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)`,
                transition: "opacity 0.2s ease-out",
              }}
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
            />

            {/* Badges Over Image */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <span
                className={`px-2.5 py-1 text-[11px] font-black tracking-widest uppercase shadow-sm ${
                  isNexa
                    ? "bg-black text-amber-300 border border-amber-400/40"
                    : "bg-[#E31837] text-white"
                }`}
              >
                {car.channel}
              </span>
              <span className="bg-black/70 px-2.5 py-1 text-[10px] font-bold text-gray-200 uppercase tracking-wider">
                {car.bodyType}
              </span>
            </div>

            {selectedVariant.mileage && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/80 px-3 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/30 z-10">
                <Gauge className="h-4 w-4" />
                <span>ARAI Certified: {selectedVariant.mileage}</span>
              </div>
            )}
          </div>

          {/* Gallery / Color Thumbnails */}
          {car.galleryImages && car.galleryImages.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[car.heroImage, ...car.galleryImages]
                .filter(Boolean)
                .map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img as string)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden border-2 bg-gradient-to-b from-white to-gray-100 transition-all cursor-pointer ${
                      activeImage === img
                        ? "border-[#E31837] shadow-sm ring-1 ring-[#E31837]"
                        : "border-gray-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img as string}
                      alt={`${car.name} thumbnail ${idx}`}
                      fill
                      className="object-contain p-1 drop-shadow-xs"
                    />
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Right: Pricing, Specs & Overview (Col 5) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-1">
            <div className="w-10 h-1 bg-[#E31837]" />
            <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#1B365D]">
              <Sparkles className="h-3 w-3 text-[#E31837]" />
              <span>OFFICIAL SHOWROOM MODEL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111827] uppercase">
              {car.name}
            </h1>
            {car.tagline && (
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {car.tagline}
              </p>
            )}
          </div>

          {/* Pricing Box */}
          <div className="border border-gray-200 bg-[#F9FAFB] p-5 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Starting Ex-Showroom
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#111827]">
                  {formatIndianPrice(car.startingPrice)} -{" "}
                  {formatIndianPrice(
                    car.variants[car.variants.length - 1]?.exShowroomPrice ||
                      car.startingPrice
                  )}
                  *
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                Ready Delivery
              </span>
            </div>
            <p className="text-[10px] text-gray-500">
              *Ex-showroom price Delhi/Lucknow. Taxes, registration, insurance &amp; accessories extra.
            </p>
          </div>

          {/* Overview Description */}
          {car.description && (
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              {car.description}
            </p>
          )}

          {/* Key Specs Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="border border-gray-200 bg-white p-3 text-center">
              <Fuel className="h-4 w-4 text-[#1B365D] mx-auto mb-1" />
              <div className="text-[9px] text-gray-400 uppercase font-bold">Fuel</div>
              <div className="text-xs font-black text-gray-900 uppercase">
                {Array.from(new Set(car.variants.map((v) => v.fuelType))).join(", ")}
              </div>
            </div>

            <div className="border border-gray-200 bg-white p-3 text-center">
              <Cog className="h-4 w-4 text-[#E31837] mx-auto mb-1" />
              <div className="text-[9px] text-gray-400 uppercase font-bold">Gearbox</div>
              <div className="text-xs font-black text-gray-900 uppercase">
                {Array.from(new Set(car.variants.map((v) => v.transmission))).join(", ")}
              </div>
            </div>

            <div className="border border-gray-200 bg-white p-3 text-center">
              <ShieldCheck className="h-4 w-4 text-emerald-600 mx-auto mb-1" />
              <div className="text-[9px] text-gray-400 uppercase font-bold">Warranty</div>
              <div className="text-xs font-black text-gray-900 uppercase">
                3 Yrs / 100k KM
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => handleOpenTestDrive()}
              className="w-full bg-[#E31837] hover:bg-[#C8102E] text-white py-3.5 text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Book 60-Min Doorstep Test Drive</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+919876543210"
                className="border border-gray-300 hover:border-black bg-white py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-900 flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <PhoneCall className="h-3.5 w-3.5 text-[#E31837]" />
                <span>Call Hotline</span>
              </a>

              <a
                href="#variants"
                className="border border-gray-300 hover:border-black bg-white py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-900 flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <FileText className="h-3.5 w-3.5 text-[#1B365D]" />
                <span>Compare Trims</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: VARIANT COMPARISON TABLE */}
      {/* ------------------------------------------------------------- */}
      <section id="variants" className="pt-8 border-t border-gray-200 space-y-6">
        <div className="space-y-2">
          <div className="w-10 h-1 bg-[#E31837]" />
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#111827]">
            Variant Selector &amp; Spec Comparison
          </h2>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            Compare mechanical specs, engine capacity, fuel types, and ex-showroom prices
          </p>
        </div>

        <VariantComparison
          variants={car.variants}
          selectedVariant={selectedVariant}
          onSelectVariant={(v) => {
            setSelectedVariant(v);
            setTestDriveVariantName(v.name);
          }}
          onBookTestDrive={(variantName) => handleOpenTestDrive(variantName)}
        />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: EMI & LOAN CALCULATOR */}
      {/* ------------------------------------------------------------- */}
      <section className="pt-8 border-t border-gray-200 space-y-6">
        <div className="space-y-2">
          <div className="w-10 h-1 bg-[#1B365D]" />
          <h2 className="text-2xl font-black uppercase tracking-tight text-[#111827]">
            Maruti Suzuki Smart Finance EMI Calculator
          </h2>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            Calculate your customized monthly EMI for {selectedVariant.name}
          </p>
        </div>

        <EmiCalculator
          carModelName={car.name}
          variantName={selectedVariant.name}
          exShowroomPrice={selectedVariant.exShowroomPrice}
        />
      </section>

      {/* Test Drive Modal */}
      <TestDriveModal
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
        carModelName={car.name}
        variantName={testDriveVariantName}
        availableVariants={allVariantNames}
      />
    </div>
  );
}
