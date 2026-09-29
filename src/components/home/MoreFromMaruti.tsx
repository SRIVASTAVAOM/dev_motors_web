"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Car, Compass, Wrench, ShieldCheck, Fuel } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: typeof Car;
  iconColor: string;
  accentBorder: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "driving-school",
    title: "Driving School",
    description: "Master the skill of driving at Maruti Suzuki Driving School.",
    link: "/#driving-school",
    icon: Car,
    iconColor: "#F59E0B", // Orange
    accentBorder: "border-b-[#F59E0B]",
  },
  {
    id: "genuine-accessories",
    title: "Genuine Accessories",
    description: "Enhance your drive with Maruti Suzuki Genuine Accessories.",
    link: "/sales",
    icon: Compass,
    iconColor: "#3B82F6", // Blue
    accentBorder: "border-b-[#3B82F6]",
  },
  {
    id: "genuine-parts",
    title: "Genuine Parts",
    description: "Buy original and reliable Maruti Suzuki Genuine Parts (MSGP).",
    link: "/after-sales/book-service",
    icon: ShieldCheck,
    iconColor: "#14B8A6", // Teal
    accentBorder: "border-b-[#14B8A6]",
  },
  {
    id: "car-service",
    title: "Car Service",
    description: "Keep your car healthy. Book an authorized service nearby.",
    link: "/after-sales/book-service",
    icon: Wrench,
    iconColor: "#EF4444", // Red
    accentBorder: "border-b-[#EF4444]",
  },
  {
    id: "nearest-cng",
    title: "Nearest CNG Pump",
    description: "Find the nearest authorized S-CNG fuel dispensing station.",
    link: "/sales?fuel=CNG",
    icon: Fuel,
    iconColor: "#EAB308", // Yellow
    accentBorder: "border-b-[#EAB308]",
  },
];

function ServiceCard({ item }: { item: ServiceItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const Icon = item.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(
      `perspective(700px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px)");
  };

  return (
    <Link href={item.link} className="block group">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transformStyle,
          transition: "transform 0.16s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease",
        }}
        className={`relative h-[320px] bg-white border border-gray-200 p-6 flex flex-col justify-between border-b-4 ${item.accentBorder} shadow-xs group-hover:shadow-xl transition-all duration-200 select-none will-change-transform`}
      >
        {/* Top: Icon & Description */}
        <div className="space-y-6">
          <div
            className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ color: item.iconColor }}
          >
            <Icon className="h-9 w-9 stroke-[1.5]" />
          </div>

          <p className="text-xs text-gray-600 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        {/* Bottom: Title & Arrow ↗ matching Screenshot 3 */}
        <div className="pt-4 flex items-end justify-between border-t border-gray-100">
          <h3 className="text-lg font-bold text-[#111827] leading-tight group-hover:text-black">
            {item.title}
          </h3>

          <div className="p-2 text-gray-800 group-hover:text-black transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight className="h-6 w-6 stroke-[1.75]" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function MoreFromMaruti() {
  return (
    <section className="py-16 bg-[#F9FAFB] border-y border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading matching Screenshot 3 */}
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
            More from Maruti Suzuki
          </h2>
        </div>

        {/* 5 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SERVICES.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
