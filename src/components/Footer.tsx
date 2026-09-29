import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#0B132B] text-gray-300">
      {/* Top Hotline Bar */}
      <div className="border-b border-white/10 bg-[#070D1F] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#E31837]" />
            <span className="font-bold uppercase tracking-wider text-white">
              Maruti Suzuki Authorized Dealership & Service Network
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#E31837]" />
              <span className="text-gray-400">Sales Hotline:</span>
              <a href="tel:+919876543210" className="font-bold text-white hover:text-[#E31837] transition-colors">
                +91 98765 43210
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-gray-300">Open 7 Days (9:30 AM - 7:30 PM)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Official Status */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-white" viewBox="0 0 100 100" fill="currentColor">
                <polygon points="12,12 88,12 55,46 12,46" fill="#FFFFFF" />
                <polygon points="88,88 12,88 45,54 88,54" fill="#E31837" />
                <polygon points="12,46 45,54 12,88" fill="#FFFFFF" />
                <polygon points="88,54 55,46 88,12" fill="#E31837" />
              </svg>
              <div>
                <span className="text-lg font-black tracking-tight text-white uppercase block leading-none">
                  DEV MOTORS
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  MARUTI SUZUKI DEALERSHIP
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Premier authorized Maruti Suzuki dealer network in Lucknow. Serving over 15,000 satisfied families across Arena, Nexa, True Value, and Commercial channels with transparent on-road pricing and factory-certified workshops.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>100% Genuine MGP Parts & Authorized Care</span>
            </div>
          </div>

          {/* Column 2: Vehicle Showrooms */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-0.5 bg-[#E31837]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Showroom Range
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/sales/grand-vitara" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>Grand Vitara Intelligent Hybrid</span>
                </Link>
              </li>
              <li>
                <Link href="/sales/fronx" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>Fronx Turbo & S-CNG</span>
                </Link>
              </li>
              <li>
                <Link href="/sales/swift" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>All-New Swift Z-Series</span>
                </Link>
              </li>
              <li>
                <Link href="/sales/brezza" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>Brezza Hot & Techy SUV</span>
                </Link>
              </li>
              <li>
                <Link href="/sales/dzire" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>All-New Dzire 5-Star GNCAP</span>
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/sales" className="text-xs font-bold text-[#E31837] hover:underline flex items-center gap-1">
                  <span>Explore Full Showroom ({">"} 14 Models)</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Services */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-0.5 bg-[#E31837]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                After-Sales & Ownership
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/after-sales/book-service" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>Book Periodic Maintenance</span>
                </Link>
              </li>
              <li>
                <Link href="/after-sales/book-service" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>Doorstep Pickup & Drop</span>
                </Link>
              </li>
              <li>
                <Link href="/true-value/buy" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>True Value 376-Check Certified Cars</span>
                </Link>
              </li>
              <li>
                <Link href="/true-value/sell" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>Instant Car Valuation & Free Inspection</span>
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3 text-gray-600" />
                  <span>Maruti Insurance Zero-Dep Renewal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Dealership Facilities & Hours */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-0.5 bg-[#E31837]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Dealership Hubs
              </h4>
            </div>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#E31837] shrink-0 mt-0.5" />
                <span>Dev Motors Arena Campus, Hazratganj & Kanpur Road, Lucknow</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Nexa Dev Motors Luxury Lounge, Gomti Nagar, Lucknow</span>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href="mailto:support@devmotors.in" className="hover:text-white transition-colors">
                  sales@devmotors.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 border-t border-white/10 pt-6 text-[11px] text-gray-500 space-y-2">
          <p className="leading-relaxed">
            *Disclaimer: All ex-showroom prices mentioned are indicative for New Delhi/Lucknow and subject to change without prior notice. Final on-road prices depend on state road tax, insurance options, and vehicle registration fees. Features and specifications are subject to variant availability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-gray-400">
            <div>
              &copy; {new Date().getFullYear()} Dev Motors Authorized Dealership Network. All Rights Reserved.
            </div>
            <div className="flex gap-4">
              <Link href="/#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/#terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/#disclaimer" className="hover:text-white transition-colors">ARAI Compliance</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
