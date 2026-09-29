"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Gauge,
  User,
  Fuel,
  Settings2,
  FileCheck2,
  PhoneCall,
  Sparkles,
  MapPin,
} from "lucide-react";
import { TrueValueCarItem } from "@/lib/types/true-value";

interface TrueValueCarCardProps {
  car: TrueValueCarItem;
  onViewReport: (car: TrueValueCarItem) => void;
  onBookTestDrive?: (car: TrueValueCarItem) => void;
}

export default function TrueValueCarCard({
  car,
  onViewReport,
  onBookTestDrive,
}: TrueValueCarCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });

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

  const priceInLakhs = (car.sellingPrice / 100000).toFixed(2);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.16s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease",
      }}
      className="group flex flex-col justify-between overflow-hidden bg-white border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-200 select-none will-change-transform"
    >
      <div>
        {/* Car Image with Badges & 3D Glare */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
          <Image
            src={car.featuredImage}
            alt={`${car.yearOfManufacture} ${car.make} ${car.model} ${car.variant}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />

          {/* Dynamic 3D Glare */}
          <div
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 65%)`,
              transition: "opacity 0.2s ease-out",
            }}
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
          />

          {/* Top Left: 376 Quality Checks Verified Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
              <ShieldCheck className="h-3 w-3" />
              <span>376 Checkpoints Verified</span>
            </span>
          </div>

          {/* Top Right: True Value Certified Tag */}
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 bg-black/75 text-amber-300 text-[10px] font-black tracking-widest uppercase border border-amber-400/40">
              TRUE VALUE
            </span>
          </div>

          {/* Bottom Location */}
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-3 text-white text-xs z-10">
            <div className="flex items-center gap-1 text-[11px] text-gray-300 font-semibold">
              <MapPin className="h-3 w-3 text-emerald-400" />
              <span>{car.rtoState} Registered</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Title & Price Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                {car.yearOfManufacture} • {car.make}
              </span>
              <h3 className="text-base font-black text-[#111827] uppercase leading-snug group-hover:text-[#E31837] transition-colors">
                {car.model} <span className="font-semibold text-xs text-gray-500">{car.variant}</span>
              </h3>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">
                True Value Price
              </span>
              <div className="text-lg font-black text-[#111827] tracking-tight">
                ₹{priceInLakhs} <span className="text-xs font-bold text-gray-600">Lakh</span>
              </div>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100">
              <Gauge className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] text-gray-400 uppercase font-bold block leading-tight">Odometer</span>
                <span className="font-black text-gray-900 truncate text-[11px]">
                  {car.odometerReadingKm.toLocaleString()} km
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100">
              <User className="h-3.5 w-3.5 text-[#1B365D] shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] text-gray-400 uppercase font-bold block leading-tight">Ownership</span>
                <span className="font-black text-gray-900 truncate text-[11px]">
                  {car.ownershipCount === 1 ? "1st Owner" : `${car.ownershipCount}nd Owner`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100">
              <Fuel className="h-3.5 w-3.5 text-amber-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] text-gray-400 uppercase font-bold block leading-tight">Fuel Type</span>
                <span className="font-black text-gray-900 uppercase truncate text-[11px]">
                  {car.fuelType}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-100">
              <Settings2 className="h-3.5 w-3.5 text-[#E31837] shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] text-gray-400 uppercase font-bold block leading-tight">Gearbox</span>
                <span className="font-black text-gray-900 uppercase truncate text-[11px]">
                  {car.transmission}
                </span>
              </div>
            </div>
          </div>

          {/* Warranty & Services Banner */}
          <div className="p-2 bg-emerald-50 border border-emerald-200 flex items-center justify-between text-[10px] text-emerald-900 font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-emerald-700" />
              <span>1 Year Warranty</span>
            </div>
            <span>•</span>
            <div>3 Free Services</div>
            <span>•</span>
            <div>Clean RC Transfer</div>
          </div>
        </div>
      </div>

      {/* Dual Sharp CTAs */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onViewReport(car)}
          className="flex items-center justify-center gap-1.5 py-2.5 bg-white border border-gray-300 hover:border-black text-gray-900 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <FileCheck2 className="h-3.5 w-3.5" />
          <span>376 Audit</span>
        </button>

        <a
          href="tel:+919876543210"
          onClick={() => onBookTestDrive && onBookTestDrive(car)}
          className="flex items-center justify-center gap-1.5 py-2.5 bg-[#E31837] hover:bg-[#C8102E] text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer text-center"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          <span>Hold Car</span>
        </a>
      </div>
    </div>
  );
}
