"use client";

import Link from "next/link";
import { useState } from "react";
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
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Authentic Suzuki S-Mark SVG Logo */}
          <div className="flex items-center gap-2.5">
            <svg
              className="h-8 w-8 text-[#1B365D] transition-transform group-hover:scale-105"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Geometric Suzuki S Symbol */}
              <polygon points="12,12 88,12 55,46 12,46" fill="#1B365D" />
              <polygon points="88,88 12,88 45,54 88,54" fill="#C8102E" />
              <polygon points="12,46 45,54 12,88" fill="#1B365D" />
              <polygon points="88,54 55,46 88,12" fill="#C8102E" />
            </svg>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#1B365D] leading-none uppercase">
                MARUTI SUZUKI
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#4B5563] uppercase mt-0.5">
                DEV MOTORS • AUTHORIZED DEALER
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
              <div className="absolute left-0 top-full w-56 bg-white border border-gray-200 shadow-lg py-2 z-50">
                <Link
                  href="/sales?channel=ARENA"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  Maruti Suzuki ARENA
                </Link>
                <Link
                  href="/sales?channel=NEXA"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  NEXA Experience
                </Link>
                <Link
                  href="/sales/grand-vitara"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  Grand Vitara (3D Showcase)
                </Link>
                <Link
                  href="/sales"
                  className="block px-4 py-2 text-xs font-bold text-[#1B365D] border-t border-gray-100 hover:bg-gray-50"
                >
                  Explore All Models &rarr;
                </Link>
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
              <div className="absolute left-0 top-full w-60 bg-white border border-gray-200 shadow-lg py-2 z-50">
                <Link
                  href="/after-sales/book-service"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] font-medium"
                >
                  Book Service Appointment
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
                  Doorstep Pickup & Drop
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

        {/* Contact Us Dropdown Button */}
        <div
          className="relative hidden sm:block"
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

              <Link
                href="/sales#test-drive"
                className="block w-full text-center bg-[#C8102E] text-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#A80D26] transition-colors"
              >
                Book a Test Drive
              </Link>
            </div>
          )}
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
            Service & Maintenance
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
    </header>
  );
}
