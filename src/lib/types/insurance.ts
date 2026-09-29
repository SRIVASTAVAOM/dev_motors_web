import { z } from "zod";

export interface InsuranceAddon {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  price: number;
  description: string;
  recommendedFor: string;
  keyBenefits: string[];
  popular?: boolean;
}

export const INSURANCE_ADDONS: InsuranceAddon[] = [
  {
    id: "zero-dep",
    name: "Zero Depreciation Cover (Bumper-to-Bumper)",
    shortName: "Zero Dep",
    slug: "zero-depreciation",
    price: 2499,
    description: "100% claim settlement without any depreciation deduction on metal, plastic, rubber, fiber, or nylon parts.",
    recommendedFor: "Vehicles up to 5 years old",
    keyBenefits: [
      "Zero deduction on fiber, plastic, rubber and metal parts",
      "Maximum 2 claims per policy year",
      "Instant cashless settlement across Dev Motors workshops",
    ],
    popular: true,
  },
  {
    id: "engine-protect",
    name: "Engine & Gearbox Protection Cover",
    shortName: "Engine Protect",
    slug: "engine-protect",
    price: 1899,
    description: "Shields against exorbitant repair bills from hydrostatic lock (water ingression in rains/floods) and oil leakage.",
    recommendedFor: "Monsoon seasons and flood-prone roads",
    keyBenefits: [
      "Overhauls engine components damaged by water entry",
      "Covers gearbox damage caused by lubricant leakage",
      "Covers replacement of pistons, crankshaft & connecting rods",
    ],
    popular: true,
  },
  {
    id: "consumables",
    name: "Consumables Cover (Nuts, Bolts, Oils, AC Gas)",
    shortName: "Consumables",
    slug: "consumables-cover",
    price: 1299,
    description: "Reimburses the cost of non-reusable service items like engine oil, washers, clips, grease, brake fluid, and AC refrigerant.",
    recommendedFor: "Full zero out-of-pocket claim expenses",
    keyBenefits: [
      "Covers lubricants, brake oil, coolant and washer fluids",
      "Covers nuts, bolts, screws, bearings and split pins",
      "Reimburses AC gas recharge after collision repairs",
    ],
  },
  {
    id: "return-to-invoice",
    name: "Return-to-Invoice (RTI) Cover",
    shortName: "Return-to-Invoice",
    slug: "return-to-invoice",
    price: 3199,
    description: "In the event of total loss or theft, pays the complete original invoice on-road price plus road tax and registration levies.",
    recommendedFor: "New cars up to 3 years old",
    keyBenefits: [
      "Bridges the gap between market IDV and original on-road purchase price",
      "Reimburses road tax and regional transport registration fees paid",
      "Complete financial indemnity against total loss and vehicle theft",
    ],
  },
  {
    id: "roadside-assistance",
    name: "24x7 Roadside Assistance & Key Replacement",
    shortName: "24x7 RSA",
    slug: "roadside-assistance",
    price: 899,
    description: "Round-the-clock towing, puncture assistance, emergency fuel supply, battery jumpstart, and lost key replacement.",
    recommendedFor: "Frequent commuters & highway travelers",
    keyBenefits: [
      "Free flatbed towing to nearest Dev Motors center up to 50 km",
      "On-spot battery jumpstart & emergency fuel up to 5 Litres",
      "Lost / locked-in car key reimbursement assistance",
    ],
  },
];

export interface PremiumBreakdown {
  idv: number; // Insured Declared Value in INR
  baseOdPremium: number; // Own Damage base
  ncbDiscountPercentage: number; // e.g. 20%, 35%, 50%
  ncbDiscountAmount: number;
  netOdPremium: number;
  tpMandatedPremium: number; // Third Party IRDAI rate (e.g. 2,094)
  addonsPremium: number;
  subtotal: number;
  gstAmount: number; // 18% GST
  totalPayable: number;
}

// Zod Validation Schema for Quick Insurance Renewal Inquiry
export const insuranceInquirySchema = z.object({
  vehicleRegNumber: z
    .string()
    .trim()
    .min(5, "Please enter a valid registration number (e.g., UP 32 AB 1234)"),
  carMakeAndModel: z.string().trim().min(2, "Car make and model is required"),
  policyExpiryDate: z.string().min(1, "Please choose your previous policy expiry date"),
  previousPolicyNumber: z.string().trim().optional().or(z.literal("")),
  previousInsurer: z.string().trim().default("Maruti Insurance Broking"),
  claimedNcbPercentage: z.coerce.number().min(0).max(50).default(20),
  hasExistingClaim: z.boolean().default(false),

  selectedAddons: z.array(z.string()).default([]),
  idv: z.coerce.number().min(50000),
  quotedAmount: z.coerce.number().min(1000),

  customerName: z.string().trim().min(2, "Please enter policyholder's name"),
  customerPhone: z
    .string()
    .trim()
    .refine((val) => val.replace(/\D/g, "").length === 10, {
      message: "Please enter a valid 10-digit mobile number",
    }),
  customerEmail: z.string().trim().email("Please enter a valid email address").optional().or(z.literal("")),
  communicationChannel: z.enum(["WHATSAPP", "PHONE_CALL", "EMAIL"]).default("WHATSAPP"),
  agentNotes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type InsuranceInquiryInput = z.infer<typeof insuranceInquirySchema>;

export interface InsuranceInquiryResult {
  success: boolean;
  inquiryNumber?: string;
  status?: string;
  message: string;
  details?: {
    inquiryNumber: string;
    customerName: string;
    customerPhone: string;
    vehicleRegNumber: string;
    carMakeAndModel: string;
    policyExpiryDate: string;
    idv: number;
    quotedAmount: number;
    ncbPercentage: number;
    selectedAddonTitles: string[];
  };
  errors?: Record<string, string[]>;
}
