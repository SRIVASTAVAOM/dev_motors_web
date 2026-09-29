"use client";

import { useState, useMemo } from "react";
import { Search, RotateCcw, ShieldCheck, Car } from "lucide-react";
import { TrueValueCarItem } from "@/lib/types/true-value";
import TrueValueCarCard from "./TrueValueCarCard";
import InspectionReportModal from "./InspectionReportModal";

interface BuyCarsCatalogProps {
  initialCars: TrueValueCarItem[];
}

export default function BuyCarsCatalog({ initialCars }: BuyCarsCatalogProps) {
  // Filters State
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedBudget, setSelectedBudget] = useState<string>("ALL");
  const [selectedFuel, setSelectedFuel] = useState<string>("ALL");
  const [selectedKm, setSelectedKm] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("FEATURED");

  // Inspection Report Modal State
  const [activeCarReport, setActiveCarReport] = useState<TrueValueCarItem | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const handleOpenReport = (car: TrueValueCarItem) => {
    setActiveCarReport(car);
    setIsReportOpen(true);
  };

  const handleCloseReport = () => {
    setIsReportOpen(false);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedYear("ALL");
    setSelectedBudget("ALL");
    setSelectedFuel("ALL");
    setSelectedKm("ALL");
    setSearchQuery("");
    setSortBy("FEATURED");
  };

  // Filtered and Sorted Cars
  const filteredCars = useMemo(() => {
    return initialCars.filter((car) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = `${car.make} ${car.model} ${car.variant}`.toLowerCase();
        const matchReg = car.registrationNumber.toLowerCase();
        if (!matchTitle.includes(query) && !matchReg.includes(query)) {
          return false;
        }
      }

      // 2. Year Filter
      if (selectedYear !== "ALL") {
        if (selectedYear === "2020_OLDER") {
          if (car.yearOfManufacture > 2020) return false;
        } else {
          if (car.yearOfManufacture !== parseInt(selectedYear, 10)) return false;
        }
      }

      // 3. Budget Filter
      if (selectedBudget !== "ALL") {
        if (selectedBudget === "UNDER_6L" && car.sellingPrice > 600000) return false;
        if (selectedBudget === "6L_TO_9L" && (car.sellingPrice < 600000 || car.sellingPrice > 900000)) return false;
        if (selectedBudget === "ABOVE_9L" && car.sellingPrice < 900000) return false;
      }

      // 4. Fuel Type Filter
      if (selectedFuel !== "ALL") {
        if (car.fuelType !== selectedFuel) return false;
      }

      // 5. KM Driven Filter
      if (selectedKm !== "ALL") {
        const kmLimit = parseInt(selectedKm, 10);
        if (car.odometerReadingKm > kmLimit) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "PRICE_ASC") return a.sellingPrice - b.sellingPrice;
      if (sortBy === "PRICE_DESC") return b.sellingPrice - a.sellingPrice;
      if (sortBy === "KM_ASC") return a.odometerReadingKm - b.odometerReadingKm;
      if (sortBy === "YEAR_DESC") return b.yearOfManufacture - a.yearOfManufacture;
      return 0; // FEATURED
    });
  }, [
    initialCars,
    searchQuery,
    selectedYear,
    selectedBudget,
    selectedFuel,
    selectedKm,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedYear !== "ALL" ? 1 : 0) +
    (selectedBudget !== "ALL" ? 1 : 0) +
    (selectedFuel !== "ALL" ? 1 : 0) +
    (selectedKm !== "ALL" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="space-y-8">
      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 sm:p-5 shadow-lg transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certified cars (e.g. Swift, Baleno, UP 32...)"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 pl-10 pr-4 py-2.5 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
            >
              <option value="ALL">Year: All</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020_OLDER">2020 or Older</option>
            </select>

            {/* Budget Filter */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
            >
              <option value="ALL">Budget: All</option>
              <option value="UNDER_6L">Under ₹6 Lakh</option>
              <option value="6L_TO_9L">₹6 - ₹9 Lakh</option>
              <option value="ABOVE_9L">Above ₹9 Lakh</option>
            </select>

            {/* Fuel Type */}
            <select
              value={selectedFuel}
              onChange={(e) => setSelectedFuel(e.target.value)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
            >
              <option value="ALL">Fuel: All</option>
              <option value="PETROL">Petrol</option>
              <option value="CNG">S-CNG</option>
              <option value="HYBRID">Hybrid</option>
            </select>

            {/* KM Driven */}
            <select
              value={selectedKm}
              onChange={(e) => setSelectedKm(e.target.value)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
            >
              <option value="ALL">KM: Any</option>
              <option value="20000">Under 20,000 km</option>
              <option value="40000">Under 40,000 km</option>
              <option value="60000">Under 60,000 km</option>
            </select>
          </div>

          {/* Sort & Reset Actions */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
            >
              <option value="FEATURED">Sort: Featured</option>
              <option value="PRICE_ASC">Price: Low to High</option>
              <option value="PRICE_DESC">Price: High to Low</option>
              <option value="KM_ASC">KM: Low to High</option>
              <option value="YEAR_DESC">Year: Newest First</option>
            </select>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>
              Showing <strong className="text-zinc-900 dark:text-white">{filteredCars.length}</strong> certified cars with 1-Year Warranty & 3 Free Services
            </span>
          </div>

          <span className="hidden sm:inline text-[11px] text-zinc-400">
            Updated daily from Dev Motors Lucknow & Indore Hubs
          </span>
        </div>
      </div>

      {/* Certified Used Car Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <TrueValueCarCard
              key={car.id}
              car={car}
              onViewReport={handleOpenReport}
            />
          ))}
        </div>
      ) : (
        /* Zero Results Empty State */
        <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/60 max-w-xl mx-auto space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 mx-auto">
            <Car className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            No matching True Value cars found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            We couldn&apos;t find any certified pre-owned cars matching your current filters. Try relaxing your budget or KM criteria.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* 376-Point Digital Inspection Modal */}
      <InspectionReportModal
        car={activeCarReport}
        isOpen={isReportOpen}
        onClose={handleCloseReport}
      />
    </div>
  );
}
