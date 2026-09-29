"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, CalendarCheck } from "lucide-react";

interface CarShowcaseItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  tagline?: string;
  startingPrice?: string;
  channel: "ARENA" | "NEXA";
}

const ARENA_CARS: CarShowcaseItem[] = [
  {
    id: "eeco",
    name: "EECO",
    slug: "eeco",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    tagline: "India's Multi-Purpose Van",
    startingPrice: "₹ 5.32 Lakh*",
    channel: "ARENA",
  },
  {
    id: "s-presso",
    name: "S-PRESSO",
    slug: "s-presso",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    tagline: "Mini-SUV Attitude",
    startingPrice: "₹ 4.26 Lakh*",
    channel: "ARENA",
  },
  {
    id: "dzire",
    name: "DZIRE",
    slug: "dzire",
    image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80",
    tagline: "India's Best-Selling Sedan",
    startingPrice: "₹ 6.57 Lakh*",
    channel: "ARENA",
  },
  {
    id: "swift",
    name: "SWIFT",
    slug: "swift",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    tagline: "All-New Z-Series Engine",
    startingPrice: "₹ 6.49 Lakh*",
    channel: "ARENA",
  },
];

const NEXA_CARS: CarShowcaseItem[] = [
  {
    id: "grand-vitara",
    name: "GRAND VITARA",
    slug: "grand-vitara",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
    tagline: "Intelligent Electric Hybrid",
    startingPrice: "₹ 10.99 Lakh*",
    channel: "NEXA",
  },
  {
    id: "fronx",
    name: "FRONX",
    slug: "fronx",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    tagline: "Shape Your New",
    startingPrice: "₹ 7.52 Lakh*",
    channel: "NEXA",
  },
  {
    id: "jimny",
    name: "JIMNY",
    slug: "jimny",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    tagline: "Legendary 4x4 ALLGRIP PRO",
    startingPrice: "₹ 12.74 Lakh*",
    channel: "NEXA",
  },
  {
    id: "xl6",
    name: "XL6",
    slug: "xl6",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    tagline: "Premium 3-Row MPV",
    startingPrice: "₹ 11.61 Lakh*",
    channel: "NEXA",
  },
];

function Model3DCard({ car }: { car: CarShowcaseItem }) {
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
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.02, 1.02, 1.02)`
    );

    setGlare({
      opacity: 0.3,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)");
    setGlare({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.16s cubic-bezier(0.2, 0, 0, 1)",
      }}
      className="group relative w-full aspect-[16/10] bg-gray-100 overflow-hidden border border-gray-200 shadow-xs cursor-pointer will-change-transform select-none"
    >
      {/* Background Car Photo */}
      <Image
        src={car.image}
        alt={car.name}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-106"
      />

      {/* Ambient Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      {/* Dynamic 3D Glare */}
      <div
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)`,
          transition: "opacity 0.2s ease-out",
        }}
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
      />

      {/* Model Name Banner matching Screenshot 5 */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10">
        <h4 className="text-base sm:text-lg font-black tracking-wider text-white uppercase drop-shadow-md">
          {car.name}
        </h4>
        {car.startingPrice && (
          <span className="text-[11px] font-semibold text-gray-200 block opacity-90 group-hover:opacity-100">
            Starting {car.startingPrice}
          </span>
        )}
      </div>

      {/* Hover Action Sheet */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2.5 p-4 z-20">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E31837]">
          {car.channel}
        </span>
        <h4 className="text-lg font-black text-white uppercase">{car.name}</h4>
        <p className="text-xs text-gray-300 text-center mb-1">{car.tagline}</p>

        <div className="flex items-center gap-2 w-full max-w-[200px]">
          <Link
            href={`/sales/${car.slug}`}
            className="flex-1 bg-white text-black py-2 text-[11px] font-bold uppercase tracking-wider text-center hover:bg-gray-200 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/sales#test-drive"
            className="flex-1 bg-[#E31837] text-white py-2 text-[11px] font-bold uppercase tracking-wider text-center hover:bg-[#C8102E] transition-colors"
          >
            Test Drive
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DiscoverCars() {
  const [arenaIndex, setArenaIndex] = useState(0);
  const [nexaIndex, setNexaIndex] = useState(0);

  const handlePrevArena = () => {
    setArenaIndex((prev) => (prev === 0 ? ARENA_CARS.length - 1 : prev - 1));
  };
  const handleNextArena = () => {
    setArenaIndex((prev) => (prev === ARENA_CARS.length - 1 ? 0 : prev + 1));
  };

  const handlePrevNexa = () => {
    setNexaIndex((prev) => (prev === 0 ? NEXA_CARS.length - 1 : prev - 1));
  };
  const handleNextNexa = () => {
    setNexaIndex((prev) => (prev === NEXA_CARS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Section Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111827]">
            Discover Maruti Suzuki Cars
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest font-semibold">
            Explore India&apos;s Most Trusted Lineup Across ARENA & NEXA
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. ARENA ROW */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-[#111827] tracking-wider uppercase font-sans">
              ARENA
            </h3>
            <Link
              href="/sales?channel=ARENA"
              className="text-xs font-bold uppercase tracking-wider text-[#E31837] hover:underline flex items-center gap-1"
            >
              <span>View All Arena Models</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={handlePrevArena}
              aria-label="Previous Arena Car"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2.5 hover:bg-gray-800 transition-colors shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ARENA_CARS.map((car) => (
                <Model3DCard key={car.id} car={car} />
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNextArena}
              aria-label="Next Arena Car"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2.5 hover:bg-gray-800 transition-colors shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. NEXA ROW */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-light text-[#111827] tracking-[0.25em] uppercase">
              N E X A
            </h3>
            <Link
              href="/sales?channel=NEXA"
              className="text-xs font-bold uppercase tracking-wider text-[#111827] hover:underline flex items-center gap-1"
            >
              <span>View All Nexa Models</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={handlePrevNexa}
              aria-label="Previous Nexa Car"
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2.5 hover:bg-gray-800 transition-colors shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {NEXA_CARS.map((car) => (
                <Model3DCard key={car.id} car={car} />
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNextNexa}
              aria-label="Next Nexa Car"
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2.5 hover:bg-gray-800 transition-colors shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Red Pill Indicator matching Screenshot 5 */}
        <div className="pt-4 flex justify-center">
          <div className="w-12 h-1 bg-[#E31837]" />
        </div>
      </div>
    </section>
  );
}
