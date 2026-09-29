import { Metadata } from "next";
import SellCarValuator from "@/components/true-value/SellCarValuator";

export const metadata: Metadata = {
  title: "Sell Your Car & Instant Valuation | True Value Dev Motors",
  description:
    "Calculate instant market valuation for your car and schedule a free doorstep inspection. 1-hour spot payment, free RC transfer, and maximum value guarantee at Dev Motors True Value.",
};

export default function SellCarPage() {
  return (
    <div className="space-y-6">
      <SellCarValuator />
    </div>
  );
}
