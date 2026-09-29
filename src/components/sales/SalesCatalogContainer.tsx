"use client";

import { useState, useMemo } from "react";
import { CarModelData } from "@/lib/types/sales";
import CarCard from "@/components/sales/CarCard";
import {
  X,
  Search,
  Car,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface SalesCatalogContainerProps {
  initialCars: CarModelData[];
}

export default function SalesCatalogContainer({ initialCars }: SalesCatalogContainerProps) {
  const [selectedSegment, setSelectedSegment] = useState<string>("ALL");
  const [selectedFuel, setSelectedFuel] = useState<string>("ALL");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("ALL");
  const [selectedChannel, setSelectedChannel] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("price-asc");

  // Reset all filters
  const resetFilters = () => {
    setSelectedSegment("ALL");
    setSelectedFuel("ALL");
    setSelectedTransmission("ALL");
    setSelectedChannel("ALL");
    setSearchQuery("");
    setSortBy("price-asc");
  };

  const hasActiveFilters =
    selectedSegment !== "ALL" ||
    selectedFuel !== "ALL" ||
    selectedTransmission !== "ALL" ||
    selectedChannel !== "ALL" ||
    searchQuery.trim() !== "";

  // Filter and sort cars
  const filteredCars = useMemo(() => {
    return initialCars
      .filter((car) => {
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesName = car.name.toLowerCase().includes(query);
          const matchesTagline = car.tagline?.toLowerCase().includes(query);
          const matchesVariant = car.variants.some((v) =>
            v.name.toLowerCase().includes(query)
          );
          if (!matchesName && !matchesTagline && !matchesVariant) return false;
        }

        // Segment / BodyType filter
        if (selectedSegment !== "ALL" && car.bodyType !== selectedSegment) {
          return false;
        }

        // Channel filter
        if (selectedChannel !== "ALL" && car.channel !== selectedChannel) {
          return false;
        }

        // Fuel Type filter
        if (selectedFuel !== "ALL") {
          const hasFuel = car.variants.some((v) => v.fuelType === selectedFuel);
          if (!hasFuel) return false;
        }

        // Transmission filter
        if (selectedTransmission !== "ALL") {
          if (selectedTransmission === "MANUAL") {
            const hasManual = car.variants.some(
              (v) => v.transmission === "MANUAL"
            );
            if (!hasManual) return false;
          } else if (selectedTransmission === "AUTOMATIC") {
            const hasAuto = car.variants.some(
              (v) =>
                v.transmission === "AUTOMATIC" ||
                v.transmission === "AMT" ||
                v.transmission === "AGS" ||
                v.transmission === "CVT"
            );
            if (!hasAuto) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.startingPrice - b.startingPrice;
        }
        if (sortBy === "price-desc") {
          return b.startingPrice - a.startingPrice;
        }
        if (sortBy === "name-asc") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [
    initialCars,
    searchQuery,
    selectedSegment,
    selectedChannel,
    selectedFuel,
    selectedTransmission,
    sortBy,
  ]);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* STICKY FILTER BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs transition-all">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Filter Pills Row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Channel Filter (Arena / Nexa) */}
            <div className="flex items-center border border-gray-200 bg-gray-50 p-0.5">
              {[
                { label: "All Channels", value: "ALL" },
                { label: "ARENA", value: "ARENA" },
                { label: "N E X A", value: "NEXA" },
              ].map((ch) => (
                <button
                  key={ch.value}
                  onClick={() => setSelectedChannel(ch.value)}
                  className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider transition-colors ${
                    selectedChannel === ch.value
                      ? "bg-[#111827] text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-200/60"
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>

            {/* Segment / BodyType Dropdown / Pills */}
            <div className="flex items-center border border-gray-200 bg-gray-50 p-0.5">
              <span className="px-2 text-[10px] font-black text-gray-400 uppercase tracking-wider hidden sm:inline">
                BODY
              </span>
              {[
                { label: "All", value: "ALL" },
                { label: "Hatchback", value: "HATCHBACK" },
                { label: "SUV", value: "SUV" },
                { label: "Sedan", value: "SEDAN" },
              ].map((seg) => (
                <button
                  key={seg.value}
                  onClick={() => setSelectedSegment(seg.value)}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
                    selectedSegment === seg.value
                      ? "bg-[#E31837] text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-200/60"
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>

            {/* Fuel Type Filter */}
            <div className="flex items-center border border-gray-200 bg-gray-50 p-0.5">
              <span className="px-2 text-[10px] font-black text-gray-400 uppercase tracking-wider hidden sm:inline">
                FUEL
              </span>
              {[
                { label: "All", value: "ALL" },
                { label: "Petrol", value: "PETROL" },
                { label: "S-CNG", value: "CNG" },
                { label: "Hybrid", value: "HYBRID" },
              ].map((fuel) => (
                <button
                  key={fuel.value}
                  onClick={() => setSelectedFuel(fuel.value)}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
                    selectedFuel === fuel.value
                      ? "bg-emerald-600 text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-200/60"
                  }`}
                >
                  {fuel.label}
                </button>
              ))}
            </div>

            {/* Transmission Filter */}
            <div className="flex items-center border border-gray-200 bg-gray-50 p-0.5">
              <span className="px-2 text-[10px] font-black text-gray-400 uppercase tracking-wider hidden sm:inline">
                GEAR
              </span>
              {[
                { label: "All", value: "ALL" },
                { label: "MT", value: "MANUAL" },
                { label: "Auto / AGS", value: "AUTOMATIC" },
              ].map((trans) => (
                <button
                  key={trans.value}
                  onClick={() => setSelectedTransmission(trans.value)}
                  className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
                    selectedTransmission === trans.value
                      ? "bg-[#1B365D] text-white"
                      : "text-gray-600 hover:text-black hover:bg-gray-200/60"
                  }`}
                >
                  {trans.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 md:w-52">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search model, Swift, Vitara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 bg-white pl-8 pr-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-black"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-black"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Model Name (A-Z)</option>
            </select>

            {/* Reset Filters CTA */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                title="Reset all filters"
                className="flex items-center gap-1 bg-red-50 border border-red-200 px-2.5 py-1.5 text-xs font-bold text-[#E31837] hover:bg-red-100 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="hidden sm:inline">RESET</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FILTER RESULTS SUMMARY */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-black">{filteredCars.length}</strong> of{" "}
            <strong>{initialCars.length}</strong> Maruti Suzuki Models
          </span>
          {hasActiveFilters && (
            <span className="bg-red-100 text-[#E31837] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Filters Applied
            </span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-700 font-bold text-[11px] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            100% Genuine Maruti Suzuki Factory Warranty
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CAR CARDS GRID */}
      {/* ------------------------------------------------------------- */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCars.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center bg-white border border-gray-200 text-gray-500 mb-3">
            <Car className="h-6 w-6" />
          </div>
          <h3 className="text-base font-black uppercase text-gray-900">
            No matching car models found
          </h3>
          <p className="mt-1 text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your segment, fuel type, or gearbox filters to explore our full Maruti Suzuki Arena and Nexa catalog.
          </p>
          <div className="mt-4">
            <button
              onClick={resetFilters}
              className="bg-[#E31837] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#C8102E] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
