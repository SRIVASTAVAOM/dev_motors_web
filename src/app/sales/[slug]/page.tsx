import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCarModelBySlug, getCarModels } from "@/data/sales-catalog";
import CarDetailsClient from "@/components/sales/CarDetailsClient";
import { ChevronRight, Home } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarModelBySlug(slug);

  if (!car) {
    return {
      title: "Car Not Found | Dev Motors",
    };
  }

  return {
    title: `${car.name} On-Road Price, Specs & EMI | Dev Motors Lucknow`,
    description: `Explore the all-new Maruti Suzuki ${car.name}. Check ex-showroom price, ARAI certified mileage, compare ${car.variants.length} variants, and book a doorstep test drive with Dev Motors.`,
  };
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  const cars = await getCarModels();
  return cars.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CarDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarModelBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ------------------------------------------------------------- */}
      {/* BREADCRUMB HEADER */}
      {/* ------------------------------------------------------------- */}
      <div className="border-b border-gray-200 bg-[#F9FAFB] px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs text-gray-500 font-medium">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-black transition-colors"
          >
            <Home className="h-3.5 w-3.5 text-gray-400" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <Link
            href="/sales"
            className="hover:text-black transition-colors"
          >
            Showroom
          </Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="font-bold text-[#111827] uppercase tracking-wider">
            {car.name}
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CAR DETAILS CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <CarDetailsClient car={car} />
      </div>
    </div>
  );
}
