"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ChannelItem {
  id: string;
  title: string;
  tagline: string;
  link: string;
  image: string;
  logoStyle: "nexa" | "arena" | "truevalue" | "commercial";
}

const CHANNELS: ChannelItem[] = [
  {
    id: "nexa",
    title: "N E X A",
    tagline: "Create. Inspire. Premium Automotive Lineup.",
    link: "/sales?channel=NEXA",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
    logoStyle: "nexa",
  },
  {
    id: "arena",
    title: "ARENA",
    tagline: "Find Your Match. India's Favourite Cars.",
    link: "/sales?channel=ARENA",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    logoStyle: "arena",
  },
  {
    id: "true-value",
    title: "TRUE VALUE",
    tagline: "376 Checkpoints Certified Pre-Owned Cars.",
    link: "/true-value/buy",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80",
    logoStyle: "truevalue",
  },
  {
    id: "commercial",
    title: "COMMERCIAL",
    tagline: "Powerful, Reliable Goods & Passenger Carriers.",
    link: "/sales",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80",
    logoStyle: "commercial",
  },
];

function ChannelCard({ item }: { item: ChannelItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate 3D tilt angles (max +/- 10 degrees)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
    );

    // Dynamic light sheen glare position
    setGlareStyle({
      opacity: 0.25,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <Link
      href={item.link}
      className="group block relative w-full h-[460px] sm:h-[540px] overflow-hidden bg-black select-none"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transformStyle,
          transition: "transform 0.18s cubic-bezier(0.2, 0, 0, 1)",
        }}
        className="relative w-full h-full will-change-transform"
      >
        {/* Background Vehicle Image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 group-hover:from-black/75 transition-colors duration-300" />

        {/* Interactive Dynamic 3D Glare Sheen */}
        <div
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
            transition: "opacity 0.25s ease-out",
          }}
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
        />

        {/* Top Header Channel Brand Logo */}
        <div className="absolute top-8 left-0 right-0 text-center z-10">
          {item.logoStyle === "nexa" && (
            <span className="text-xl sm:text-2xl font-light tracking-[0.35em] text-white uppercase drop-shadow-md">
              N E X A
            </span>
          )}
          {item.logoStyle === "arena" && (
            <span className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase drop-shadow-md font-sans">
              ARENA
            </span>
          )}
          {item.logoStyle === "truevalue" && (
            <span className="text-xl sm:text-2xl font-black italic tracking-wider text-white uppercase drop-shadow-md">
              TRUE VALUE
            </span>
          )}
          {item.logoStyle === "commercial" && (
            <span className="text-xl sm:text-2xl font-black tracking-wider text-[#E31837] uppercase drop-shadow-md">
              COMMERCIAL
            </span>
          )}
        </div>

        {/* Bottom Floating Details on Hover */}
        <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-xs text-gray-200 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">
            {item.tagline}
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white border-b-2 border-white/60 pb-0.5 group-hover:border-[#E31837] group-hover:text-[#E31837] transition-colors">
              <span>Explore Channel</span>
              <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BusinessChannels() {
  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Title matching Screenshot 4 */}
        <div className="border-b border-gray-200 pb-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">
            Maruti Suzuki India Business Channels
          </h2>
        </div>

        {/* 4 Vertical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNELS.map((item) => (
            <ChannelCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
