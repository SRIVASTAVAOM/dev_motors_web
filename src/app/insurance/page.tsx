import { Metadata } from "next";
import InsurancePortalClient from "@/components/insurance/InsurancePortalClient";
import {
  ShieldCheck,
  Zap,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Clock,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Motor Insurance Renewal | Maruti Insurance Broking - Dev Motors",
  description:
    "Renew your Maruti Suzuki car insurance online in 2 minutes. Instant quotes, Zero Depreciation, Engine Protect, up to 50% NCB transfer, and 100% cashless claims at Dev Motors workshops.",
  keywords: [
    "Maruti Suzuki Insurance",
    "Car Insurance Renewal Lucknow",
    "Dev Motors Motor Insurance",
    "Zero Depreciation Cover",
    "Engine Protection Insurance",
    "Maruti Insurance Broking",
    "NCB Transfer",
  ],
};

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    title: "100% Cashless Claims",
    description:
      "Instant cashless claim settlement across all Dev Motors facilities and 4,500+ Maruti Suzuki authorized workshops nationwide.",
  },
  {
    icon: Zap,
    title: "Zero Paperwork Renewal",
    description:
      "Instant policy generation in under 2 minutes without tedious inspections or physical documentation for active policies.",
  },
  {
    icon: Sparkles,
    title: "Up to 50% NCB Transfer",
    description:
      "Easily retain and transfer your accumulated No Claim Bonus (NCB) discount from any previous IRDAI registered insurer.",
  },
  {
    icon: Clock,
    title: "24x7 Roadside & Towing",
    description:
      "Round-the-clock emergency flatbed towing assistance, on-spot puncture fixes, battery jumpstart, and accidental recovery.",
  },
];

const FAQS = [
  {
    question: "What is the difference between Comprehensive Insurance and Zero Depreciation Cover?",
    answer:
      "A standard comprehensive policy deducts substantial depreciation on parts during an accident claim (up to 50% on plastic, nylon and rubber parts, and 30% on fiber glass). With a Zero Depreciation add-on cover, 100% of the replacement cost of all parts is paid by the insurer, requiring you to only pay a nominal mandatory excess fee.",
  },
  {
    question: "Can I transfer my existing No Claim Bonus (NCB) from another insurer?",
    answer:
      "Yes, absolutely. Under IRDAI guidelines, your accumulated No Claim Bonus (up to 50%) is earned by the vehicle owner, not the insurer. You can seamlessly port your full discount percentage when renewing through Maruti Insurance Broking by providing your previous policy details.",
  },
  {
    question: "Why should I renew through Maruti Insurance Broking at Dev Motors?",
    answer:
      "Policies issued through Maruti Insurance Broking guarantee near 100% cashless approvals at authorized dealer workshops, mandatory use of original Maruti Suzuki Genuine Parts (MSGP), and factory-standard repairs executed by trained technicians.",
  },
  {
    question: "What happens if my policy has already expired?",
    answer:
      "If your policy has lapsed within 90 days, you can still retain your No Claim Bonus. However, a quick digital doorstep photo inspection may be requested. Enter your registration details to check immediate renewal eligibility.",
  },
];

export default function InsurancePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ------------------------------------------------------------- */}
      {/* DAYTIME OEM INSURANCE HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative border-b border-gray-200 bg-[#F9FAFB] pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="w-12 h-1 bg-[#E31837] mx-auto" />

            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1B365D]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#E31837]" />
              <span>OFFICIAL MARUTI SUZUKI INSURANCE BROKING DESK</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#111827] uppercase">
              Instant Motor Insurance Renewal &amp; <br />
              <span className="text-[#E31837]">CASHLESS PROTECTION</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Calculate official renewal quotes in real-time, customize Zero Depreciation and Engine Protection add-ons, and secure 100% cashless claims backed by Dev Motors authorized workshop network.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 text-left">
              <div className="bg-white border border-gray-200 p-4 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-[#111827]">Near 100%</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Settlement Ratio</div>
              </div>
              <div className="bg-white border border-gray-200 p-4 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-[#111827]">4,500+</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Cashless Garages</div>
              </div>
              <div className="bg-white border border-gray-200 p-4 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-[#111827]">Up to 50%</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">NCB Retention</div>
              </div>
              <div className="bg-white border border-gray-200 p-4 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-[#111827]">2 Minutes</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Instant Policy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* INTERACTIVE INSURANCE PORTAL CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 z-20 mb-16">
        <div className="border border-gray-200 bg-white p-6 sm:p-10 shadow-lg">
          <InsurancePortalClient />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* WHY MARUTI INSURANCE BROKING (4 VALUE PROPS) */}
      {/* ------------------------------------------------------------- */}
      <section className="border-t border-gray-200 bg-[#F9FAFB] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="text-center space-y-2">
            <div className="w-10 h-1 bg-[#E31837] mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#111827]">
              Why Insure With Dev Motors Maruti Insurance?
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Hassle-Free Direct Settlement • Zero Out-Of-Pocket Expenses At Authorized Workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUE_PROPS.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 p-6 shadow-xs hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-200 text-[#E31837]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-black uppercase text-gray-900">{prop.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">{prop.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FREQUENTLY ASKED QUESTIONS */}
      {/* ------------------------------------------------------------- */}
      <section className="border-t border-gray-200 bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <div className="w-10 h-1 bg-[#1B365D] mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#111827]">
              Motor Insurance FAQs
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Clear answers to your car insurance and claims questions
            </p>
          </div>

          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="py-5 space-y-2">
                <h4 className="text-sm font-bold text-gray-900 flex items-start gap-2">
                  <span className="text-[#E31837] font-black">Q:</span>
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed pl-5 font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Help Banner */}
          <div className="p-6 bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <PhoneCall className="h-6 w-6 text-[#E31837] shrink-0" />
              <div>
                <h5 className="text-xs font-black uppercase text-gray-900">
                  Need Help Choosing The Right Add-Ons?
                </h5>
                <p className="text-[11px] text-gray-600">
                  Our certified insurance advisors can help you compare plans and maximize NCB discounts.
                </p>
              </div>
            </div>
            <a
              href="tel:+919876543210"
              className="bg-[#111827] hover:bg-black text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-colors shrink-0"
            >
              Call +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
