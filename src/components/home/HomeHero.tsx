"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";

interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  mileage: string;
  slug: string;
  image: string;
  ctaText: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "grand-vitara",
    badge: "MARUTI SUZUKI NEXA",
    title: "GRAND VITARA",
    subtitle: "A BREED SUPREME • INTELLIGENT ELECTRIC HYBRID",
    price: "₹ 10.99 Lakh*",
    mileage: "27.97 km/l ARAI*",
    slug: "grand-vitara",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85",
    ctaText: "EXPLORE 3D SHOWROOM",
  },
  {
    id: "brezza",
    badge: "MARUTI SUZUKI ARENA",
    title: "ALL-NEW BREZZA",
    subtitle: "HOT & TECHY COMPACT SUV • ELECTRIC SUNROOF & 360 CAMERA",
    price: "₹ 8.34 Lakh*",
    mileage: "19.89 km/l ARAI*",
    slug: "brezza",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
    ctaText: "VIEW SPECIFICATIONS",
  },
  {
    id: "swift",
    badge: "MARUTI SUZUKI ARENA",
    title: "ALL-NEW SWIFT",
    subtitle: "TIME TO PLAY • NEW-GEN Z-SERIES ENGINE & 6 AIRBAGS STANDARD",
    price: "₹ 6.49 Lakh*",
    mileage: "25.75 km/l ARAI*",
    slug: "swift",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    ctaText: "TEST DRIVE NOW",
  },
];

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] bg-[#0E131F] text-white overflow-hidden select-none">
      {/* Background Image Carousel with Ken Burns subtle pan */}
      {HERO_SLIDES.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center transform scale-102 transition-transform duration-7000 ease-out"
          />
          {/* Authentic OEM Lighting Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 z-10 space-y-4">
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-[#E31837]" />
            <span>{slide.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-tight text-white">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-sm font-semibold tracking-wider text-gray-300 uppercase">
            {slide.subtitle}
          </p>

          <div className="flex items-center gap-4 pt-1 font-mono">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                Starting At
              </span>
              <span className="text-xl sm:text-2xl font-black text-white">
                {slide.price}
              </span>
            </div>
            <div className="border-l border-gray-600 pl-4">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                Certified Mileage
              </span>
              <span className="text-sm sm:text-base font-bold text-emerald-400">
                {slide.mileage}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link
              href={`/sales/${slide.slug}`}
              className="bg-[#C8102E] hover:bg-[#A80D26] text-white px-7 py-3.5 text-xs font-black uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/sales#test-drive"
              className="bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md px-7 py-3.5 text-xs font-black uppercase tracking-wider transition-colors"
            >
              BOOK TEST DRIVE
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
        }
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 transition-all ${
              i === currentSlide ? "w-8 bg-[#E31837]" : "w-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
