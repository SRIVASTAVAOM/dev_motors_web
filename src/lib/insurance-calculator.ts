import { INSURANCE_ADDONS, PremiumBreakdown } from "./types/insurance";

const MODEL_IDV_BASE: Record<string, number> = {
  swift: 680000,
  baleno: 740000,
  brezza: 950000,
  dzire: 710000,
  ertiga: 980000,
  "grand vitara": 1380000,
  wagonr: 540000,
  "alto k10": 420000,
  fronx: 840000,
  jimny: 1200000,
  xl6: 1100000,
  ciaz: 900000,
  ignis: 590000,
  celerio: 510000,
};

export function calculateInsurancePremium(
  carModel: string,
  ncbPercentage: number,
  selectedAddonIds: string[],
  customIdv?: number
): PremiumBreakdown {
  const modelKey = carModel.toLowerCase().trim();
  const defaultIdv = MODEL_IDV_BASE[modelKey] || 650000;
  const idv = customIdv && customIdv > 0 ? customIdv : defaultIdv;

  // 1. Base Own Damage (OD) Premium (~2.5% of IDV)
  const baseOdPremium = Math.round(idv * 0.0245);

  // 2. No Claim Bonus (NCB) Discount on OD
  const clampedNcb = Math.min(50, Math.max(0, ncbPercentage));
  const ncbDiscountAmount = Math.round((baseOdPremium * clampedNcb) / 100);
  const netOdPremium = Math.max(1200, baseOdPremium - ncbDiscountAmount);

  // 3. Mandated Third-Party (TP) Cover (IRDAI Standard Tariff)
  // For private cars up to 1000cc: ~₹2,094, 1000-1500cc: ~₹3,416
  const tpMandatedPremium = modelKey.includes("vitara") || modelKey.includes("brezza") || modelKey.includes("ertiga")
    ? 3416
    : 2094;

  // 4. Add-ons Premium
  const addonsPremium = selectedAddonIds.reduce((sum, addonId) => {
    const match = INSURANCE_ADDONS.find((a) => a.id === addonId);
    return sum + (match ? match.price : 0);
  }, 0);

  // 5. Subtotal & GST
  const subtotal = netOdPremium + tpMandatedPremium + addonsPremium;
  const gstAmount = Math.round(subtotal * 0.18);
  const totalPayable = subtotal + gstAmount;

  return {
    idv,
    baseOdPremium,
    ncbDiscountPercentage: clampedNcb,
    ncbDiscountAmount,
    netOdPremium,
    tpMandatedPremium,
    addonsPremium,
    subtotal,
    gstAmount,
    totalPayable,
  };
}
