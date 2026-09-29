import HomeHero from "@/components/home/HomeHero";
import DiscoverCars from "@/components/home/DiscoverCars";
import BusinessChannels from "@/components/home/BusinessChannels";
import MoreFromMaruti from "@/components/home/MoreFromMaruti";
import OurValues from "@/components/home/OurValues";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. OEM HERO SLIDER SHOWCASE */}
      <HomeHero />

      {/* 2. DISCOVER MARUTI SUZUKI CARS (ARENA & NEXA 3D SLIDERS) - Screenshot 5 */}
      <DiscoverCars />

      {/* 3. BUSINESS CHANNELS (NEXA, ARENA, TRUE VALUE, COMMERCIAL) - Screenshot 4 */}
      <BusinessChannels />

      {/* 4. MORE FROM MARUTI SUZUKI (5 SERVICES WITH 3D HOVER) - Screenshot 3 */}
      <MoreFromMaruti />

      {/* 5. OUR VALUES & WORK WITH US / TRAIN WITH US - Screenshot 1 */}
      <OurValues />
    </div>
  );
}
