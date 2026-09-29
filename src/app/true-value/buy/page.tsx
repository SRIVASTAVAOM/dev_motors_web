import { Metadata } from "next";
import { getCertifiedUsedCars } from "@/data/true-value";
import BuyCarsCatalog from "@/components/true-value/BuyCarsCatalog";

export const metadata: Metadata = {
  title: "Buy Certified Used Cars | Maruti Suzuki True Value Dev Motors",
  description:
    "Explore certified pre-owned Maruti Suzuki Swift, Baleno, Brezza, Grand Vitara, and Ertiga. 376-point quality checks, verified odometer, 1-year warranty, and instant inspection reports.",
};

export default async function BuyCertifiedCarsPage() {
  const cars = await getCertifiedUsedCars();

  return (
    <div className="space-y-6">
      <BuyCarsCatalog initialCars={cars} />
    </div>
  );
}
