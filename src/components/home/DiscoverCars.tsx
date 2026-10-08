"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarShowcaseItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  channel: "ARENA" | "NEXA";
}

// ARENA Models - In the exact sequence as official Maruti Suzuki website
const ARENA_CARS: CarShowcaseItem[] = [
  {
    id: "dzire",
    name: "DZIRE",
    slug: "dzire",
    image: "/images/showcase/dzire.png",
    channel: "ARENA",
  },
  {
    id: "victoris",
    name: "VICTORIS",
    slug: "victoris",
    image: "/images/showcase/victoris.png",
    channel: "ARENA",
  },
  {
    id: "swift",
    name: "SWIFT",
    slug: "swift",
    image: "/images/showcase/swift.png",
    channel: "ARENA",
  },
  {
    id: "brezza",
    name: "BREZZA",
    slug: "brezza",
    image: "/images/showcase/brezza.png",
    channel: "ARENA",
  },
  {
    id: "ertiga",
    name: "ERTIGA",
    slug: "ertiga",
    image: "/images/showcase/ertiga.png",
    channel: "ARENA",
  },
  {
    id: "wagon-r",
    name: "WAGON-R",
    slug: "wagon-r",
    image: "/images/showcase/wagon-r.png",
    channel: "ARENA",
  },
  {
    id: "s-presso",
    name: "S-PRESSO",
    slug: "s-presso",
    image: "/images/showcase/s-presso.png",
    channel: "ARENA",
  },
  {
    id: "alto-k10",
    name: "ALTO K-10",
    slug: "alto-k10",
    image: "/images/showcase/alto-k10.png",
    channel: "ARENA",
  },
  {
    id: "celerio",
    name: "CELERIO",
    slug: "celerio",
    image: "/images/showcase/celerio.png",
    channel: "ARENA",
  },
  {
    id: "eeco",
    name: "EECO",
    slug: "eeco",
    image: "/images/showcase/eeco.png",
    channel: "ARENA",
  },
];

// NEXA Models - In the exact sequence as official Maruti Suzuki website
const NEXA_CARS: CarShowcaseItem[] = [
  {
    id: "baleno",
    name: "BALENO",
    slug: "baleno",
    image: "/images/showcase/baleno.png",
    channel: "NEXA",
  },
  {
    id: "grand-vitara",
    name: "GRAND VITARA",
    slug: "grand-vitara",
    image: "/images/showcase/grand-vitara.png",
    channel: "NEXA",
  },
  {
    id: "fronx",
    name: "FRONX",
    slug: "fronx",
    image: "/images/showcase/fronx.png",
    channel: "NEXA",
  },
  {
    id: "jimny",
    name: "JIMNY",
    slug: "jimny",
    image: "/images/showcase/jimny.png",
    channel: "NEXA",
  },
  {
    id: "xl6",
    name: "XL6",
    slug: "xl6",
    image: "/images/showcase/xl6.png",
    channel: "NEXA",
  },
  {
    id: "invicto",
    name: "INVICTO",
    slug: "invicto",
    image: "/images/showcase/invicto.png",
    channel: "NEXA",
  },
  {
    id: "e-vitara",
    name: "e-VITARA",
    slug: "e-vitara",
    image: "/images/showcase/e-vitara.png",
    channel: "NEXA",
  },
];

export default function DiscoverCars() {
  const [arenaIndex, setArenaIndex] = useState(0);
  const [nexaIndex, setNexaIndex] = useState(0);

  const handlePrevArena = () => {
    setArenaIndex((prev) => (prev === 0 ? ARENA_CARS.length - 1 : prev - 1));
  };
  const handleNextArena = () => {
    setArenaIndex((prev) => (prev + 1) % ARENA_CARS.length);
  };

  const handlePrevNexa = () => {
    setNexaIndex((prev) => (prev === 0 ? NEXA_CARS.length - 1 : prev - 1));
  };
  const handleNextNexa = () => {
    setNexaIndex((prev) => (prev + 1) % NEXA_CARS.length);
  };

  // 4 items visible in current view
  const visibleArenaCars = [0, 1, 2, 3].map(
    (offset) => ARENA_CARS[(arenaIndex + offset) % ARENA_CARS.length]
  );

  const visibleNexaCars = [0, 1, 2, 3].map(
    (offset) => NEXA_CARS[(nexaIndex + offset) % NEXA_CARS.length]
  );

  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main Section Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111827]">
            Discover Maruti Suzuki Cars
          </h2>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. ARENA ROW */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-center text-[#111827] tracking-wider uppercase">
            ARENA
          </h3>

          <div className="relative px-2 sm:px-4">
            {/* Left arrow */}
            <button
              type="button"
              onClick={handlePrevArena}
              aria-label="Previous Arena Model"
              className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-neutral-800 text-white w-9 h-11 sm:w-10 sm:h-14 flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
            </button>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {visibleArenaCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/sales/${car.slug}`}
                  className="group relative aspect-[430/260] w-full overflow-hidden bg-gray-100 shadow-xs block transition-transform duration-200 hover:scale-[1.02]"
                >
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  {/* Subtle bottom dark gradient for high text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

                  {/* Overlaid Car Name */}
                  <div className="absolute inset-x-0 bottom-2.5 sm:bottom-3 z-10 text-center px-2 pointer-events-none">
                    <span className="text-sm sm:text-base md:text-lg font-black tracking-wider text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                      {car.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right arrow */}
            <button
              type="button"
              onClick={handleNextArena}
              aria-label="Next Arena Model"
              className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-neutral-800 text-white w-9 h-11 sm:w-10 sm:h-14 flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            >
              <ChevronRight className="h-6 w-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. NEXA ROW */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-6 pt-4">
          <h3 className="text-2xl sm:text-3xl font-black text-center text-[#111827] tracking-wider uppercase">
            NEXA
          </h3>

          <div className="relative px-2 sm:px-4">
            {/* Left arrow */}
            <button
              type="button"
              onClick={handlePrevNexa}
              aria-label="Previous Nexa Model"
              className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-neutral-800 text-white w-9 h-11 sm:w-10 sm:h-14 flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
            </button>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {visibleNexaCars.map((car) => (
                <Link
                  key={car.id}
                  href={`/sales/${car.slug}`}
                  className="group relative aspect-[430/260] w-full overflow-hidden bg-gray-100 shadow-xs block transition-transform duration-200 hover:scale-[1.02]"
                >
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  {/* Subtle bottom dark gradient for high text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

                  {/* Overlaid Car Name */}
                  <div className="absolute inset-x-0 bottom-2.5 sm:bottom-3 z-10 text-center px-2 pointer-events-none">
                    <span className="text-sm sm:text-base md:text-lg font-black tracking-wider text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                      {car.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right arrow */}
            <button
              type="button"
              onClick={handleNextNexa}
              aria-label="Next Nexa Model"
              className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 bg-black hover:bg-neutral-800 text-white w-9 h-11 sm:w-10 sm:h-14 flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            >
              <ChevronRight className="h-6 w-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
