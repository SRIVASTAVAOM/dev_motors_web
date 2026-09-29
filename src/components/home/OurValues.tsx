"use client";

import Link from "next/link";
import {
  Users,
  Lightbulb,
  Globe,
  Zap,
  BookOpen,
  ArrowRight,
} from "lucide-react";

interface ValueItem {
  id: string;
  title: string;
  icon: typeof Users;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    id: "customer-obsession",
    title: "CUSTOMER OBSESSION",
    icon: Users,
    description: "Placing customer satisfaction and joy at the heart of every vehicle and service experience.",
  },
  {
    id: "openness-learning",
    title: "OPENNESS & LEARNING",
    icon: BookOpen,
    description: "Constantly embracing fresh ideas, customer feedback, and cutting-edge engineering.",
  },
  {
    id: "networking-partnership",
    title: "NETWORKING & PARTNERSHIP",
    icon: Globe,
    description: "Building trusted, long-term bonds across dealerships, partners, and 2.5 crore+ families.",
  },
  {
    id: "fast-flexible",
    title: "FAST, FLEXIBLE FIRST MOVER",
    icon: Zap,
    description: "Agile adoption of hybrid technologies, green S-CNG mobility, and seamless digital service.",
  },
  {
    id: "innovation-creativity",
    title: "INNOVATION & CREATIVITY",
    icon: Lightbulb,
    description: "Pioneering intelligent hybrid powertrains, smart connected telemetry, and top safety.",
  },
];

export default function OurValues() {
  return (
    <section className="relative py-20 bg-white overflow-hidden border-t border-gray-100">
      {/* Background Graphic: Angular Corporate Deep-Blue Geometry matching Screenshot 1 */}
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#162A56] transform -rotate-12 pointer-events-none hidden md:block opacity-95" />
      <div className="absolute -bottom-24 -left-8 w-96 h-96 bg-[#1F3A70] transform -rotate-24 pointer-events-none hidden md:block opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Red Dash matching Screenshot 1 */}
        <div className="text-center space-y-2">
          <div className="w-12 h-1 bg-[#E31837] mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-black text-[#111827] uppercase tracking-wide">
            OUR VALUES
          </h2>
        </div>

        {/* 5 Values Horizontal Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-start">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.id}
                className="group flex flex-col items-center text-center space-y-3 p-3 transition-transform duration-200 hover:-translate-y-1.5"
              >
                {/* 2-Tone Circle Icon Frame */}
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-2 border-dashed border-[#1B365D]/30 group-hover:border-[#E31837] transition-colors p-3 bg-gray-50 group-hover:bg-red-50/40">
                  <Icon className="h-8 w-8 text-[#1B365D] group-hover:text-[#E31837] transition-colors stroke-[1.5]" />
                </div>

                <h3 className="text-xs font-black text-[#111827] uppercase tracking-wider leading-snug">
                  {val.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed hidden sm:block">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two Crisp Red Rectangular Action Buttons matching Screenshot 1 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/sales"
            className="w-full sm:w-auto bg-[#C8102E] hover:bg-[#A80D26] text-white py-3 px-8 text-xs font-black uppercase tracking-wider text-center transition-colors rounded-none shadow-xs"
          >
            WORK WITH US
          </Link>

          <Link
            href="/after-sales/book-service"
            className="w-full sm:w-auto bg-[#C8102E] hover:bg-[#A80D26] text-white py-3 px-8 text-xs font-black uppercase tracking-wider text-center transition-colors rounded-none shadow-xs"
          >
            TRAIN WITH US
          </Link>
        </div>
      </div>
    </section>
  );
}
