"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import QuickBookingModal from "@/components/common/QuickBookingModal";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Car,
  Wrench,
  ShieldCheck,
  FileText,
  Sparkles,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [quickModalOpen, setQuickModalOpen] = useState(false);
  const [quickModalMode, setQuickModalMode] = useState<"sales" | "service">("sales");

  const openQuickModal = (mode: "sales" | "service") => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setQuickModalMode(mode);
    setQuickModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Authentic Suzuki S-Mark SVG Logo */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/devmotors.png"
              alt="Dev Motors Logo"
              width={44}
              height={44}
              className="h-10 w-10 sm:h-11 sm:w-11 object-contain transition-transform group-hover:scale-105"
              priority
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#1B365D] leading-none uppercase">
                DEV MOTORS
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#4B5563] uppercase mt-0.5">
                MARUTI SUZUKI • AUTHORIZED DEALER
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-[#1F2937]">
          <Link
            href="/"
            className="hover:text-[#C8102E] transition-colors py-2 font-semibold"
          >
            Home
          </Link>

          <Link
            href="/#about"
            className="hover:text-[#C8102E] transition-colors py-2"
          >
            Corporate
          </Link>

          {/* Sales Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("sales")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/sales"
              className="flex items-center gap-1 hover:text-[#C8102E] transition-colors py-2"
            >
              <span>Sales</span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </Link>

            {activeDropdown === "sales" && (
              <div className="absolute -left-12 top-full w-[540px] bg-white border border-gray-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="grid grid-cols-2 divide-x divide-gray-100 p-4">
                  {/* ARENA CHANNEL */}
                  <div className="pr-4 space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#E31837]" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#111827]">
                          ARENA RANGE
                        </span>
                      </div>
                      <Link
                        href="/sales?channel=ARENA"
                        className="text-[10px] font-bold text-[#E31837] hover:underline uppercase"
                      >
                        All Arena &rarr;
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {[
                        { name: "Victoris", slug: "victoris", price: "₹ 7.89 Lakh*" },
                        { name: "Swift", slug: "swift", price: "₹ 6.49 Lakh*" },
                        { name: "Brezza", slug: "brezza", price: "₹ 8.34 Lakh*" },
                        { name: "Dzire", slug: "dzire", price: "₹ 6.57 Lakh*" },
                        { name: "Ertiga", slug: "ertiga", price: "₹ 8.69 Lakh*" },
                        { name: "S-Presso", slug: "s-presso", price: "₹ 4.26 Lakh*" },
                      ].map((car) => (
                        <Link
                          key={car.slug}
                          href={`/sales/${car.slug}`}
                          className="flex items-center justify-between px-2.5 py-1.5 hover:bg-gray-50 rounded-xs transition-colors group"
                        >
                          <span className="text-xs font-bold text-gray-800 group-hover:text-[#E31837]">
                            {car.name}
                          </span>
                          <span className="text-[10px] font-medium text-gray-500">
                            {car.price}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* NEXA CHANNEL */}
                  <div className="pl-4 space-y-2.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#1B365D]" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#111827]">
                          NEXA RANGE
                        </span>
                      </div>
                      <Link
                        href="/sales?channel=NEXA"
                        className="text-[10px] font-bold text-[#1B365D] hover:underline uppercase"
                      >
                        All Nexa &rarr;
                      </Link>
                    </div>

                    <div className="space-y-1">
                      {[
                        { name: "Grand Vitara", slug: "grand-vitara", price: "₹ 10.99 Lakh*" },
                        { name: "Fronx", slug: "fronx", price: "₹ 7.52 Lakh*" },
                        { name: "Jimny (4x4)", slug: "jimny", price: "₹ 12.74 Lakh*" },
                        { name: "XL6", slug: "xl6", price: "₹ 11.61 Lakh*" },
                        { name: "Baleno", slug: "baleno", price: "₹ 6.66 Lakh*" },
                        { name: "Invicto", slug: "invicto", price: "₹ 25.30 Lakh*" },
                        { name: "e-Vitara", slug: "e-vitara", price: "₹ 19.99 Lakh*" },
                      ].map((car) => (
                        <Link
                          key={car.slug}
                          href={`/sales/${car.slug}`}
                          className="flex items-center justify-between px-2.5 py-1.5 hover:bg-gray-50 rounded-xs transition-colors group"
                        >
                          <span className="text-xs font-bold text-gray-800 group-hover:text-[#1B365D]">
                            {car.name}
                          </span>
                          <span className="text-[10px] font-medium text-gray-500">
                            {car.price}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Showroom Action Bar */}
                <div className="bg-[#F9FAFB] px-4 py-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                  <Link
                    href="/sales"
                    className="font-bold text-[#111827] hover:text-[#E31837] transition-colors flex items-center gap-1"
                  >
                    <span>View Complete Showroom Catalog</span>
                    <span>&rarr;</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => openQuickModal("sales")}
                    className="text-[11px] font-bold text-[#E31837] hover:underline uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <span>⚡ Quick Test Drive / Price</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Service Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("service")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/after-sales/book-service"
              className="flex items-center gap-1 hover:text-[#C8102E] transition-colors py-2"
            >
              <span>Service</span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </Link>

            {activeDropdown === "service" && (
              <div className="absolute left-0 top-full w-64 bg-white border border-gray-200 shadow-xl py-2 z-50">
                <button
                  type="button"
                  onClick={() => openQuickModal("service")}
                  className="w-full text-left px-4 py-2.5 text-xs bg-red-50/70 hover:bg-red-50 text-[#C8102E] font-bold flex items-center justify-between border-b border-gray-100 cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
                    Book Service Appointment
                  </span>
                  <span className="text-[9px] bg-[#C8102E] text-white font-bold px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                    Instant
                  </span>
                </button>
                <Link
                  href="/after-sales/book-service"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  Service Overview &amp; Booking
                </Link>
                <Link
                  href="/after-sales/book-service#packages"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  Periodic Maintenance Packages
                </Link>
                <Link
                  href="/after-sales/book-service#doorstep"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  Doorstep Pickup &amp; Drop
                </Link>
              </div>
            )}
          </div>

          {/* More From Us Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("more")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="flex items-center gap-1 hover:text-[#C8102E] transition-colors py-2 cursor-pointer">
              <span>More From us</span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </div>

            {activeDropdown === "more" && (
              <div className="absolute left-0 top-full w-56 bg-white border border-gray-200 shadow-lg py-2 z-50">
                <Link
                  href="/true-value/buy"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  True Value Pre-Owned
                </Link>
                <Link
                  href="/true-value/sell"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  Sell / Instant Car Valuation
                </Link>
                <Link
                  href="/insurance"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  Maruti Insurance Broking
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/#customer-info"
            className="hover:text-[#C8102E] transition-colors py-2"
          >
            Important Customer Info
          </Link>
        </nav>

        {/* Quick Online Booking CTA & Contact Us Dropdown Button */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => openQuickModal("sales")}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#C8102E] hover:bg-[#A80D26] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>⚡ Book Online</span>
          </button>

          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("contact")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#1F2937] border border-gray-300 hover:border-black transition-colors"
            >
              <span>Contact Us</span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </button>

            {activeDropdown === "contact" && (
              <div className="absolute right-0 top-full w-72 bg-white border border-gray-200 shadow-xl p-4 z-50 text-xs space-y-3">
                <div className="border-b border-gray-100 pb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    DEALERSHIP HOTLINE
                  </span>
                  <a
                    href="tel:+919876543210"
                    className="text-sm font-bold text-[#1B365D] hover:text-[#C8102E] flex items-center gap-2 mt-1"
                  >
                    <Phone className="h-4 w-4 text-[#C8102E]" />
                    <span>+91 98765 43210</span>
                  </a>
                </div>

                <div className="space-y-1.5 text-gray-600 text-[11px]">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" />
                    <span>Dev Motors Arena Campus, Hazratganj & Kanpur Road, Lucknow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span>Open All 7 Days: 9:30 AM - 7:30 PM</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openQuickModal("sales")}
                  className="block w-full text-center bg-[#C8102E] text-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#A80D26] transition-colors cursor-pointer"
                >
                  ⚡ Book a Test Drive
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-black"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-5 shadow-xl text-sm font-medium space-y-3">
          {/* Quick Action Buttons for Mobile */}
          <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
            <button
              type="button"
              onClick={() => openQuickModal("sales")}
              className="py-2.5 px-2 bg-[#C8102E] text-white text-[11px] font-bold uppercase tracking-wider text-center"
            >
              🚗 Sales Enquiry
            </button>
            <button
              type="button"
              onClick={() => openQuickModal("service")}
              className="py-2.5 px-2 bg-[#1B365D] text-white text-[11px] font-bold uppercase tracking-wider text-center"
            >
              🔧 Book Service
            </button>
          </div>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-gray-800 hover:text-[#C8102E]"
          >
            Home
          </Link>
          <Link
            href="/sales"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-gray-800 hover:text-[#C8102E]"
          >
            Sales (All Cars)
          </Link>
          <Link
            href="/sales?channel=ARENA"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-gray-600 hover:text-[#C8102E] pl-3"
          >
            • Maruti Suzuki ARENA
          </Link>
          <Link
            href="/sales?channel=NEXA"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-gray-600 hover:text-[#C8102E] pl-3"
          >
            • NEXA Experience
          </Link>
          <Link
            href="/after-sales/book-service"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-gray-800 hover:text-[#C8102E]"
          >
            Service &amp; Maintenance
          </Link>
          <Link
            href="/true-value/buy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-gray-800 hover:text-[#C8102E]"
          >
            True Value Pre-Owned
          </Link>
          <Link
            href="/insurance"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-gray-800 hover:text-[#C8102E]"
          >
            Maruti Insurance Broking
          </Link>
          <div className="pt-3 border-t border-gray-100">
            <a
              href="tel:+919876543210"
              className="block w-full text-center bg-[#C8102E] text-white py-2.5 text-xs font-bold uppercase tracking-wider"
            >
              Call Dealership: +91 98765 43210
            </a>
          </div>
        </div>
      )}

      {/* Quick Booking Modal for Sales & Service */}
      <QuickBookingModal
        isOpen={quickModalOpen}
        onClose={() => setQuickModalOpen(false)}
        initialMode={quickModalMode}
      />
    </header>
  );
}
