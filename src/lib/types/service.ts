import { z } from "zod";

export type ServiceTypeKey = 
  | "PERIODIC_MAINTENANCE"
  | "ACCIDENTAL_REPAIR"
  | "WHEEL_ALIGNMENT"
  | "AC_DISINFECTION";

export interface ServicePackage {
  id: ServiceTypeKey;
  title: string;
  subtitle: string;
  badge: string;
  basePrice: number;
  estimatedDuration: string;
  features: string[];
  popular?: boolean;
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "PERIODIC_MAINTENANCE",
    title: "Periodic Maintenance Service (PMS)",
    subtitle: "Complete scheduled inspection & mechanical service for peak performance",
    badge: "Most Popular",
    basePrice: 3499,
    estimatedDuration: "3 - 4 Hours",
    features: [
      "Engine oil replacement (Synthetic MGP grade)",
      "Oil filter & air filter replacement/cleaning",
      "Comprehensive 60-point computerized vehicle scan",
      "Front & rear brake cleaning and pad inspection",
      "Coolant, brake fluid & windshield fluid top-up",
      "Full exterior high-pressure foam wash & interior vacuuming",
    ],
    popular: true,
  },
  {
    id: "ACCIDENTAL_REPAIR",
    title: "Accidental & Body Repair",
    subtitle: "Cashless insurance claim processing with certified paint booth matching",
    badge: "Cashless Available",
    basePrice: 1499,
    estimatedDuration: "1 - 3 Days",
    features: [
      "Dedicated surveyor support for cashless Maruti Insurance claims",
      "Digital computerized paint-matching with baked paint booth finish",
      "Precision dent pulling & structural chassis alignment",
      "Original Maruti Genuine Body Panels & glass replacement",
      "Comprehensive pre-delivery anti-corrosion inspection",
    ],
  },
  {
    id: "WHEEL_ALIGNMENT",
    title: "Wheel Alignment & Dynamic Balancing",
    subtitle: "Laser-guided 3D computerized alignment to eliminate tyre wear & pull",
    badge: "Safety Essential",
    basePrice: 899,
    estimatedDuration: "45 Minutes",
    features: [
      "High-precision 3D computerized laser four-wheel alignment",
      "Computerized dynamic wheel balancing with certified clip-on weights",
      "Four-wheel tyre rotation as per Maruti service schedule",
      "Suspension bush & steering linkage play inspection",
      "Nitrogen tyre inflation for enhanced fuel economy",
    ],
  },
  {
    id: "AC_DISINFECTION",
    title: "AC Disinfection & Climate Care",
    subtitle: "Ultrasonic misting & evaporator cleaning to eliminate bacteria & odour",
    badge: "Health & Comfort",
    basePrice: 1399,
    estimatedDuration: "1 Hour",
    features: [
      "Ultrasonic misting treatment for evaporator core & air ducts",
      "Cabin air PM2.5 pollen filter inspection and cleaning",
      "AC condenser coil pressure cleaning & heat-sink check",
      "Refrigerant gas pressure & compressor clutch diagnostic check",
      "Eliminates 99.9% of cabin mould, pollen, and airborne bacteria",
    ],
  },
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: "roadside_assistance",
    name: "24x7 Roadside Assistance (1 Year Cover)",
    price: 499,
    description: "Towing, flat tyre, jumpstart, and emergency fuel support across India.",
  },
  {
    id: "engine_bay_dressing",
    name: "Engine Bay Dressing & Anti-Rust Coating",
    price: 399,
    description: "Degreasing and high-temperature protective silicone coating for hoses & wiring.",
  },
  {
    id: "interior_sanitization",
    name: "Interior Deep Foam Shampoo & Leather Conditioning",
    price: 799,
    description: "Stain extraction from upholstery, roof lining cleaning, and dashboard UV protection.",
  },
  {
    id: "wax_polishing",
    name: "Teflon Body Paint Sealant & High-Gloss Wax",
    price: 699,
    description: "Mirrored shine with hydrophobic rain repel and swirl protection.",
  },
];

export const DEALERSHIP_WORKSHOPS = [
  {
    id: "indore-bypass",
    name: "Dev Motors Central Workshop & Megastore",
    address: "Plot 14-16, Automobile Hub, AB Bypass Road, Indore",
    phone: "+91 98765 43210",
    timing: "08:00 AM - 08:00 PM",
  },
  {
    id: "vijay-nagar",
    name: "Dev Motors Vijay Nagar Authorized Service Centre",
    address: "Scheme 54, Near Meghdoot Garden, Vijay Nagar, Indore",
    phone: "+91 98765 43211",
    timing: "08:30 AM - 07:30 PM",
  },
  {
    id: "hazratganj-kanpur",
    name: "Dev Motors Arena Campus & Body Shop",
    address: "Kanpur Road / Hazratganj Link, Lucknow",
    phone: "+91 98765 43212",
    timing: "08:30 AM - 07:30 PM",
  },
  {
    id: "gomti-nagar",
    name: "Nexa Dev Motors Luxury Service Lounge",
    address: "Vibhuti Khand, Gomti Nagar, Lucknow",
    phone: "+91 98765 43213",
    timing: "09:00 AM - 08:00 PM",
  },
];

export const TIME_SLOTS = [
  { id: "slot-1", label: "Early Morning (08:30 AM - 10:30 AM)", badge: "Quick In-Out" },
  { id: "slot-2", label: "Morning (10:30 AM - 12:30 PM)", badge: "Most Popular" },
  { id: "slot-3", label: "Afternoon (01:30 PM - 03:30 PM)", badge: "Express Bay" },
  { id: "slot-4", label: "Evening (03:30 PM - 05:30 PM)", badge: "Next Day Return" },
];

export const POPULAR_CAR_MODELS = [
  "Swift",
  "Baleno",
  "Grand Vitara",
  "Brezza",
  "Fronx",
  "Dzire",
  "Ertiga",
  "Jimny",
  "XL6",
  "Invicto",
  "Ciaz",
  "Alto K10",
  "WagonR",
  "Celerio",
  "Ignis",
  "S-Presso",
  "Eeco",
];

export const FUEL_TYPES = [
  { id: "PETROL", label: "Petrol" },
  { id: "CNG", label: "S-CNG" },
  { id: "HYBRID", label: "Strong Hybrid" },
  { id: "DIESEL", label: "Diesel (DDiS)" },
];

// Zod Validation Schema for Service Booking
export const serviceBookingSchema = z.object({
  regMode: z.enum(["registration", "model"]),
  vehicleRegNumber: z.string().trim().optional(),
  carModel: z.string().trim().optional(),
  fuelType: z.string().trim().default("PETROL"),
  odometerKm: z.coerce.number().optional().nullable(),
  
  serviceType: z.enum([
    "PERIODIC_MAINTENANCE",
    "ACCIDENTAL_REPAIR",
    "WHEEL_ALIGNMENT",
    "AC_DISINFECTION",
  ]),
  additionalServices: z.array(z.string()).default([]),
  estimatedPrice: z.coerce.number().min(0),

  serviceMode: z.enum(["DOORSTEP_PICKUP", "WORKSHOP_SELF_DROP"]),
  pickupAddress: z.string().trim().optional().nullable(),
  workshopLocation: z.string().trim().default("Dev Motors Central Workshop & Megastore"),

  preferredDate: z.string().min(1, "Please choose a preferred appointment date"),
  preferredTimeSlot: z.string().min(1, "Please select an appointment time slot"),

  customerName: z.string().trim().min(2, "Customer name must be at least 2 characters long"),
  customerPhone: z
    .string()
    .trim()
    .refine((val) => val.replace(/\D/g, "").length === 10, {
      message: "Please enter a valid 10-digit mobile number",
    }),
  customerEmail: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  serviceNotes: z.string().trim().max(500, "Notes cannot exceed 500 characters").optional().or(z.literal("")),
}).refine(
  (data) => {
    if (data.regMode === "registration") {
      const reg = data.vehicleRegNumber?.replace(/\s+/g, "").toUpperCase();
      return !!reg && reg.length >= 6;
    }
    return !!data.carModel && data.carModel.length > 0;
  },
  {
    message: "Please provide either a valid registration number or select your car model.",
    path: ["vehicleRegNumber"],
  }
).refine(
  (data) => {
    if (data.serviceMode === "DOORSTEP_PICKUP") {
      return !!data.pickupAddress && data.pickupAddress.trim().length >= 5;
    }
    return true;
  },
  {
    message: "Please enter complete doorstep pickup address (House/Flat, Street, Landmark).",
    path: ["pickupAddress"],
  }
);

export type ServiceBookingInput = z.infer<typeof serviceBookingSchema>;

export interface ServiceBookingResult {
  success: boolean;
  bookingNumber?: string;
  trackingId?: string;
  status?: string;
  message: string;
  details?: {
    customerName: string;
    customerPhone: string;
    vehicleIdentifier: string;
    serviceTitle: string;
    serviceMode: string;
    preferredDate: string;
    preferredTimeSlot: string;
    estimatedPrice: number;
    workshopLocation: string;
  };
  errors?: Record<string, string[]>;
}
