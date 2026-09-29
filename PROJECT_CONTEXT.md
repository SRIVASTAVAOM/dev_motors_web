# Project Context: Dev Motors Web Portal

> **Verified State & Architecture Specification**  
> **Last Inspected:** September 2026  
> **Repository:** `/Users/omsrivastava/dev-motors-web`

---

## 1. Executive Summary & Vision

**Dev Motors Web** is a full-stack digital automotive platform designed for **Dev Motors**, an authorized multi-channel automobile dealership network. The web portal serves four core customer and operational pillars:

1. **New Car Sales (Arena & Nexa)**: Digital showcase for vehicle models, variant comparisons, on-road price estimates, brochure downloads, and test-drive inquiries.
2. **After-Sales & Workshop Services**: Online appointment booking for periodic maintenance, running repairs, doorstep pickup/drop service, and live status tracking.
3. **True Value (Certified Pre-Owned Cars)**: Pre-owned car inventory with 376-point digital inspection reports, warranty verification, and customer trade-in evaluations.
4. **Motor Insurance Broking**: Insurance renewals, new policy issuance, No Claim Bonus (NCB) transfers, and claim assistance workflows.

---

## 2. Technology Stack Audit

| Layer | Configured Package | Version in Project | Status / Finding |
| :--- | :--- | :--- | :--- |
| **Framework** | `next` | `16.3.6` |  Active (App Router, Turbopack support) |
| **Runtime UI** | `react`, `react-dom` | `19.2.8` |  Active |
| **Styling** | `tailwindcss`, `@tailwindcss/postcss` | `^4.0.0` |  Active (v4 CSS `@import "tailwindcss";` and `@theme inline`) |
| **Icons** | `lucide-react` | `^1.48.0` |  Active |
| **Validation & Utils** | `zod`, `clsx`, `tailwind-merge` | `^4.6.5`, `^2.1.1`, `^3.7.0` |  Active |
| **Database ORM** | `@prisma/client` | `^7.10.0` | ⚠️ **Version Discrepancy** (Client is v7) |
| **Prisma CLI** | `prisma` | `^8.0.0-rc.17` | ❌ **Incompatible CLI RC** (See Critical Findings) |
| **Backend as a Service**| `@supabase/supabase-js` | *Not Installed* | ❌ **Missing Dependency** |
| **Supabase SSR** | `@supabase/ssr` | *Not Installed* | ❌ **Missing Dependency** |

---

## 3. Critical Findings & Resolution Analysis

### A. Prisma CLI Version Mismatch (v8 RC vs v7 Client)
* **Observed Issue**: `package.json` had `"prisma": "^8.0.0-rc.17"` in `devDependencies` while `"@prisma/client": "^7.10.0"` in `dependencies`.
* **Impact**:
  * In Prisma 8 RC (the new Prisma Platform/Composer CLI), classic ORM commands (`npx prisma validate`, `npx prisma db push`, `npx prisma migrate dev`) are deprecated or removed in favor of platform commands (`prisma contract emit`, `prisma db update`).
  * Running `npx prisma validate` resulted in:
    ```bash
    ✘ [CLI.UNKNOWN_COMMAND] No command registered for `validate`
    ```
* **Recommended Action**: Pin both `@prisma/client` and `prisma` to matching stable releases. For maximum compatibility with standard Next.js / Supabase workflows, use either:
  * **Option 1 (Recommended)**: Stable Prisma 6.x (`prisma@^6.4.1` and `@prisma/client@^6.4.1`), OR
  * **Option 2**: Aligned Prisma 7 (`prisma@7.10.0` and `@prisma/client@7.10.0`).

### B. Missing Supabase Dependencies
* Neither `@supabase/supabase-js` nor `@supabase/ssr` were installed in `package.json`.
* **Action Required**: Install `@supabase/supabase-js` and `@supabase/ssr` to support client/server data fetching, Supabase Auth, and Storage buckets for car images/brochures.

---

## 4. Prisma Database Schema (`prisma/schema.prisma`)

The database schema is structured into 4 business domains with PostgreSQL as the underlying provider on Supabase:

### Datasource Configuration
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### Models Overview
1. **Sales Domain**:
   * **`CarModel`**: Model catalog (Swift, Brezza, Baleno, Grand Vitara), dealership channel (`ARENA`, `NEXA`), body type (`HATCHBACK`, `SEDAN`, `SUV`), starting price, media, and brochure URL.
   * **`CarVariant`**: Granular trim levels (LXi, VXi, ZXi+, Alpha), transmission (`MANUAL`, `AUTOMATIC`, `AMT`), fuel type (`PETROL`, `CNG`, `HYBRID`), engine capacity, mileage, ex-showroom price, and color options.
   * **Relation**: `CarModel (1) <---> (N) CarVariant` (Cascade on delete).
2. **After-Sales Domain**:
   * **`Booking`**: Service and test-drive appointments with unique human-readable tracking numbers (`bookingNumber`), vehicle registration, preferred date/time slot, pickup & drop preference, and lifecycle statuses (`PENDING`, `CONFIRMED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`).
   * **Relation**: Optional foreign keys to `CarModel` and `CarVariant`.
3. **True Value Domain**:
   * **`UsedCar`**: Certified pre-owned inventory with registration number, year of manufacture, ownership count, odometer reading, fuel type, price, 376-point certification badge, warranty duration, RTO state, condition notes, and city/branch location.
4. **Insurance Domain**:
   * **`InsurancePlan`**: Catalog of motor insurance plans and add-on covers (Zero Depreciation, Engine & Gearbox Protection, 24x7 Roadside Assistance, Return to Invoice).
   * **`InsuranceInquiry`**: Policy inquiry records for new policies, renewals, and claim assistance, capturing registration number, previous insurer, policy expiry date, No Claim Bonus (NCB %), and quoted premium.
5. **Database Seeding (`prisma/seed.ts`)**:
   * Automated, idempotent seed script populating 4 flagship Maruti models (Grand Vitara, Baleno, Swift, Brezza) across Hatchback and SUV segments with 12 distinct variants (Petrol, S-CNG, Strong Hybrid), 4 True Value certified cars (2021-2024 with RTO status and 376-point checklist), and 4 comprehensive insurance add-on covers.

---

## 5. Supabase Connectivity Architecture: Pooler vs Direct URL

Supabase requires a two-tier connection approach when running inside serverless environments (Next.js App Router):

```
+-------------------------------------------------------------+
|                     Next.js Application                     |
|                                                             |
|  [Runtime Queries]                       [CLI / Migrations] |
+---------+-----------------------------------------+---------+
          | (DATABASE_URL)                          | (DIRECT_URL)
          | Port 6543 (Transaction Pooler)          | Port 5432 (Session Mode)
          v                                         v
+-----------------------+                 +-------------------+
|  Supavisor /          |                 | Supabase Direct   |
|  PgBouncer Pooler     |                 | Postgres Engine   |
+-----------+-----------+                 +---------+---------+
            |                                       |
            +------------------> [ Database ] <----+
```

1. **`DATABASE_URL` (Transaction Connection Pooler - Port 6543)**:
   * **Purpose**: Used for runtime application queries in Server Components, Server Actions, and Route Handlers.
   * **Behavior**: Uses Supavisor/PgBouncer with `?pgbouncer=true`. Reuses database connections across stateless serverless invocations, preventing PostgreSQL connection exhaustion (`too many clients already`).
2. **`DIRECT_URL` (Direct Session Mode - Port 5432)**:
   * **Purpose**: Used exclusively by Prisma CLI for migrations (`prisma migrate dev`, `prisma db push`).
   * **Behavior**: Transaction poolers do not support PostgreSQL prepared statements or transactional DDL locks. Prisma CLI must bypass the pooler and communicate directly with PostgreSQL on port `5432`.

A `.env.example` has been generated at the project root with the appropriate connection templates.

---

## 6. Codebase Integrity & Import Paths

* **Path Aliases**: Confirmed `"@/*": ["./src/*"]` in `tsconfig.json`.
* **Prisma Client Singleton**: Created at `src/lib/prisma.ts` to prevent multiple PrismaClient instances during Next.js Hot Module Replacement (HMR).
* **Typecheck Status**: `npx tsc --noEmit` passes with 0 errors.
* **ESLint Status**: `npm run lint` passes with 0 warnings/errors.

---

## 7. Terminal Action Checklist

Run the following commands in sequence from the project root (`/Users/omsrivastava/dev-motors-web`):

### Step 1: Align Prisma & Install Supabase
```bash
# 1. Install Supabase client dependencies
npm install @supabase/supabase-js @supabase/ssr

# 2. Align Prisma CLI to match @prisma/client (or install stable v6)
npm install -D prisma@^7.10.0
# Or for Prisma 6:
# npm install @prisma/client@^6.4.1 && npm install -D prisma@^6.4.1
```

### Step 2: Configure Environment Variables
```bash
# Copy template to .env.local
cp .env.example .env.local

# Edit .env.local with your real Supabase credentials and database password
```

### Step 3: Validate and Push Database Schema
```bash
# Generate the Prisma Client types
npx prisma generate

# Validate schema syntax
npx prisma validate

# Push schema directly to your Supabase PostgreSQL database
npx prisma db push

# (Optional) Open Prisma Studio to inspect database records
npx prisma studio
```

### Step 4: Verify Next.js Development Server
```bash
# Start Next.js local server
npm run dev
```

---

## 8. Sales Section Implementation

### Implemented Routes & Components:
* **`/sales` (Catalog Page - Server Component)**:
  * Hero banner with official Maruti Suzuki Arena & Nexa dealership branding.
  * Sticky filter bar with real-time segment (`HATCHBACK`, `SUV`, `SEDAN`), fuel type (`PETROL`, `CNG`, `HYBRID`), gearbox (`MT`, `AT`), channel (`NEXA`, `ARENA`), live search, and sorting.
  * Car cards with ex-showroom prices in Lakhs, mileage badges, and dual CTAs ("Explore Specs" and "Book Test Drive").
* **`/sales/[slug]` (Car Details Page - Server Component + Client Interactivity)**:
  * Interactive image gallery with thumbnail preview.
  * Side-by-side **Variant Comparison Matrix** comparing trims (LXi vs VXi vs ZXi+, Delta vs Zeta vs Alpha), transmission, fuel, mileage, and features.
  * **Live EMI & Downpayment Calculator** with sliders for Downpayment %, Loan Tenure (1-7 years), and Interest Rate (7.5%-14% p.a.), generating monthly EMI and visual principal vs. interest breakdown.
  * **Sticky & Modal "Book a Test Drive" Sheet** with validation for Name, 10-digit Phone, Preferred Date, Time Slot, and Dealership Branch.
  * Handled via Next.js Server Action (`submitTestDriveBooking`) with simulated or database persistence.

---

## 9. After-Sales & Workshop Booking Module (`/after-sales/book-service`)

### Implemented Architecture & User Flow:
* **Route**: `/after-sales/book-service` (Server Component with metadata & SEO optimization).
* **Multi-Step Booking Wizard (`ServiceBookingWizard`)**:
  * **Visual Stepper (`StepIndicator`)**: 4-step progress indicator with interactive completion checkmarks, percentage tracking, and responsive desktop/mobile layouts.
  * **Step 1: Vehicle Identification (`StepVehicleDetails`)**:
    * Dual input modes:
      * **By Registration Number**: Interactive Indian High Security Registration Plate (HSRP) mockup with blue `IND` strip and state RTO auto-formatting (e.g. `UP 32 AB 1234`).
      * **By Model & Powertrain**: Model selector across Maruti Suzuki lineup (Swift, Baleno, Brezza, Grand Vitara, Fronx, Dzire, Ertiga, etc.) + Fuel type pills (Petrol, S-CNG, Strong Hybrid, Diesel) + optional odometer reading.
  * **Step 2: Service Type & Instant Pricing (`StepServiceType`)**:
    * 4 factory service packages with badge, estimated turnaround, and features:
      1. **Periodic Maintenance Service (PMS)** (₹3,499 base)
      2. **Accidental & Body Repair** (₹1,499 preliminary estimate, cashless claims)
      3. **Wheel Alignment & Dynamic Balancing** (₹899 base)
      4. **AC Disinfection & Climate Care** (₹1,399 base)
    * Optional value add-ons (24x7 Roadside Assistance, Engine Bay Dressing, Interior Deep Foam Sanitization, Teflon Wax Polishing).
    * **Instant Tentative Cost Calculator**: Live recalculation of Base Price + Add-ons + 18% GST with transparent MGP parts guarantee.
  * **Step 3: Service Mode & Schedule (`StepServiceMode`)**:
    * **Doorstep Pickup & Drop**: Verified driver, complete address input with society & landmark, complimentary pickup badge.
    * **Self-Drop to Workshop**: Authorized Dev Motors workshop hub selection (Indore Megastore, Vijay Nagar, Kanpur Road Hub, Gomti Nagar Lounge).
    * **Date & Time Picker**: Quick selection pills for next 7 days (Today, Tomorrow, Weekdays) or full calendar date picker + 4 categorized time slots.
  * **Step 4: Customer Details & Review (`StepContactReview`)**:
    * Customer Name, 10-digit mobile number, optional email, and service symptom notes.
    * Full booking summary review card displaying vehicle, package, tentative total, pickup mode, and scheduled slot.
  * **Booking Confirmation Card (`BookingConfirmationCard`)**:
    * Unique tracking confirmation ID (e.g., `DM-SRV-2026-XXXX`) with one-click copy.
    * Status pill: `STATUS: NEW (Under Workshop Assignment)`.
    * Digital Job Card printable pass and step-by-step next actions roadmap (Advisor call within 30 mins, WhatsApp photo estimate, door delivery).
* **Server Action (`submitServiceBooking`)**:
  * Input validation using **Zod** (`serviceBookingSchema`).
  * Inserts booking record into Prisma with `type: BookingType.SERVICE_APPOINTMENT` and `status: BookingStatus.NEW`.
  * Generates tracking ID `DM-SRV-${year}-${randomSuffix}` and structured service notes.
  * Fallback resiliency for uninitialized database environments.

---

## 10. True Value Pre-Owned Module (`/true-value`)

### Implemented Architecture & User Flow:
* **Shared Tab Navigation (`TrueValueNavTabs`)**:
  * Dual tab switcher between **Buy Certified Cars** (`/true-value/buy`) and **Sell / Instant Valuation** (`/true-value/sell`).
  * Root route `/true-value` automatically redirects to `/true-value/buy`.

* **1. `/true-value/buy` (Certified Cars Catalog)**:
  * **Server Component Data Fetching**: Server-side loader `getCertifiedUsedCars()` querying `prisma.usedCar` with graceful static fallback when database is uninitialized.
  * **Sticky Filter Bar**:
    * **Year**: All, 2024, 2023, 2022, 2021, 2020 or Older.
    * **Budget**: All, Under ₹6 Lakh, ₹6 - ₹9 Lakh, Above ₹9 Lakh.
    * **Fuel**: Petrol, S-CNG, Hybrid.
    * **KM Driven**: Any, Under 20,000 km, Under 40,000 km, Under 60,000 km.
    * **Live Search**: Instant keyword search by car model or registration plate.
    * **Sort**: Featured, Price Low-High, Price High-Low, KM Low-High, Year Newest.
  * **Certified Used Car Cards (`TrueValueCarCard`)**:
    * **"376 Quality Checks Verified"** shield badge.
    * Selling price in INR / Lakhs.
    * Odometer reading, ownership count (1st/2nd Owner), fuel type, and transmission.
    * 1-Year Warranty & 3 Free Services indicator.
    * Dual CTAs: **"Inspection Report"** (opens digital 376-point audit modal) and **"Test Drive / Hold"**.
  * **376-Point Digital Inspection Modal (`InspectionReportModal`)**:
    * Complete certificate with audit score (e.g. 98/100), inspector credentials, date, and 5 structured parameter groups:
      1. Engine, Fuel & Transmission (92/92 passed)
      2. Chassis, Frame & Structural Integrity (74/74 passed, non-accidental)
      3. Braking, Suspension & Steering (68/68 passed)
      4. Electricals, Battery & Air Conditioning (82/82 passed)
      5. Documentation, RTO & Title Verification (60/60 passed)
    * Printable as a formal inspection certificate.

* **2. `/true-value/sell` (Instant Valuation & Free Doorstep Inspection)**:
  * **Instant Valuation Engine (`calculateInstantValuation`)**:
    * Inputs: Make, Model, Manufacturing Year (2014-2025), KM Driven (5k-150k km), Fuel Type, Transmission, Ownership (1st/2nd/3rd+), and Accidental History (Zero / Minor Cosmetic / Major Claim).
    * Calculates fair market resale range, depreciation %, and market demand index.
    * Spot payment guarantee (60 minutes) + Free digital RC transfer.
  * **Lead Capture & Free Doorstep Inspection Form**:
    * Captures Customer Name, 10-digit Phone, Preferred Date, Time Slot, and Doorstep Address.
    * Wired to Next.js Server Action (`submitTrueValueInspectionLead`) validating via Zod (`doorstepInspectionLeadSchema`).
    * Inserts record into Prisma `Booking` with `type: BookingType.DOORSTEP_SERVICE` and `status: BookingStatus.NEW`.
    * Generates lead confirmation ID `DM-TV-SELL-${year}-${randomSuffix}` and next-steps card.

---

## 11. Motor Insurance Module (`/insurance`)

### Implemented Architecture & User Flow:
* **1. Quick Renewal Form (`QuickRenewalForm`)**:
  * Vehicle Registration Plate input with auto-formatting (`IND` plate styling, uppercase formatting, e.g. `UP 32 AB 1234`).
  * Car Make & Model quick-selector pills across flagship Maruti models (`Grand Vitara`, `Brezza`, `Baleno`, `Swift`, `Fronx`, `Ertiga`, `Dzire`, `Jimny`) or custom entry.
  * Previous Policy Expiry Date picker with quick presets (`Expired 5 Days Ago`, `Expires in 7 Days`, `Expires in 30 Days`).
  * Previous Insurer selector with seamless transfer from all IRDAI recognized insurers.
  * Claimed No Claim Bonus (NCB %) selector with 6 IRDAI slabs (`0%`, `20%`, `25%`, `35%`, `45%`, `50%`).
  * Existing Claim toggle: Accurately resets NCB to 0% per statutory regulations if a claim was made in the previous cycle.

* **2. Add-on Customizer & Real-Time Calculation (`AddonCustomizer`)**:
  * **Interactive Add-On Covers**:
    1. **Zero Depreciation Cover (Bumper-to-Bumper)** (₹2,499) - 100% claim settlement with zero depreciation deductions on metal, plastic, rubber, fiber, and nylon parts.
    2. **Engine & Gearbox Protection** (₹1,899) - Safeguards against hydrostatic lock (rain/water ingression) and oil sump puncture repairs.
    3. **Consumables Cover** (₹1,299) - Reimburses nuts, bolts, engine oil, coolant, washer fluids, and AC refrigerant.
    4. **Return-to-Invoice (RTI)** (₹3,199) - Pays complete original invoice on-road price plus road tax & registration fees in case of total loss or theft.
    5. **24x7 Roadside Assistance & Key Replacement** (₹899) - 50 km flatbed towing, battery jumpstart, emergency fuel, and key assistance.
  * **Insured Declared Value (IDV) Fine-Tuning Slider**: Allows user adjustment within ±10% of vehicle baseline value.
  * **Sticky Live Premium Breakdown**:
    * Computes Base Own Damage (OD) (~2.45% of IDV).
    * Deducts No Claim Bonus (NCB) discount up to 50%.
    * Adds IRDAI mandated statutory Third-Party (TP) rate (₹2,094 for <1000cc, ₹3,416 for 1000-1500cc).
    * Sums selected add-ons.
    * Adds 18% GST (CGST 9% + SGST 9%) and outputs **Total Payable Annual Premium** in real time.

* **3. Submission Flow & Policyholder Lead Capture (`InsuranceLeadForm`)**:
  * Captures Policyholder Name, 10-digit Phone, Optional Email, Existing Policy Number, and Communication Channel (`WHATSAPP`, `PHONE_CALL`, `EMAIL`).
  * Server Action `submitInsuranceRenewal`:
    * Validates input with Zod schema `insuranceInquirySchema`.
    * Persists to Prisma `InsuranceInquiry` with `type: InsuranceInquiryType.RENEWAL` and `status: InsuranceStatus.NEW`.
    * Generates official inquiry reference ID `DM-INS-${year}-${randomSuffix}` with resilient fallback.

* **4. Confirmation Card & Next Steps (`InsuranceConfirmationCard`)**:
  * Locked quote reference banner with one-click copy.
  * **Option 1: Initiate Payment Callback**:
    * "Send WhatsApp Payment Link" action simulating secure instant UPI/Card link dispatch to customer's mobile number.
    * "Request Advisor Callback" button for immediate advisor assistance.
  * **Option 2: Download Policy Summary (`PolicySummaryModal`)**:
    * High-fidelity printable / downloadable official quotation schedule with Dev Motors header, Maruti Insurance Broking seal, itemized tax table, and vehicle risk specs.
  * Direct hotline to Dev Motors Insurance Desk (`+91 98765 43210`).

---

## 12. Daylight OEM 3D Showroom & Grand Vitara Detail (`/sales/grand-vitara`)

### Implemented Architecture & Design Mandate:
* **OEM Arena Daylight Aesthetic**:
  * Pure White (`#FFFFFF`), Arena Light Gray (`#F4F5F7` / `#E5E7EB`), Slate Charcoal (`#111827`), Arena Red (`#E31837`), and Brushed Aluminum.
  * Sharp architectural geometry (`rounded-none` / `max rounded-sm`).
* **1. High-Key Daylight 3D Studio Canvas (`src/components/3d/CarStage.tsx`)**:
  * **Engine**: Three.js WebGL with `ACESFilmicToneMapping` (1.08 exposure) and `PCFSoftShadowMap`.
  * **Atmosphere**: Pure daylight infinity cove with linear fog (`#F5F6F8`, 14m to 38m) and clear color `#F5F6F8`.
  * **Lighting Rig**: Overhead sky/ground hemisphere light (1.4 int), directional daylight softbox (2.4 int, 2048x2048 soft PCF shadows), warm key fill (front-left, 0.85 int), and cool rim fill (rear-right, 1.1 int).
  * **Studio Floor**: Off-white matte plane (`#F2F4F7`, roughness 0.88), brushed aluminum turntable stage rings (3.9m and 2.7m radii with radial tick markers), and contact shadow ambient occlusion disc.
  * **Paint Shaders**: `MeshPhysicalMaterial` with metallic clearcoat (metalness 0.82, roughness 0.22, clearcoat 1.0, clearcoatRoughness 0.08) calibrated for 5 Maruti Suzuki shades:
    * Arctic White (`#F4F5F7`)
    * Splendid Silver (`#C2C6CC`)
    * Metallic Magma Grey (`#4B5056`)
    * Phoenix Red (`#C8102E`)
    * Prime Oxford Blue (`#102A54`)
  * **Procedural SUV Hull**: Sculpted Grand Vitara monocoque, bonnet, floating roof with contrast gloss black pillars, chrome winged grille with Suzuki emblem, triple-LED projector DRL clusters, edge-to-edge connected LED tail-lamp bar, satin skid plates, and 4 diamond-cut multi-spoke alloy wheels.
  * **Interaction & Lifecycle**: Smooth 360° horizontal drag with lerp damping (`0.09`), toggleable luxury showroom turntable auto-rotation, live azimuth HUD degree counter, and full resource disposal (`renderer.dispose()`, geometries, materials, animation frames).
* **2. Commercial Pricing & Spec Bar**:
  * Fixed-on-scroll bar featuring active variant price, fuel badge (`PETROL | STRONG HYBRID`), ARAI certified mileage, and sharp Arena Red rectangular CTA (`Book Test Drive`).
* **3. 4-Column Engineering Blueprint Spec Matrix**:
  * Border-separated grid:
    1. Powertrain & Motor (1.5L Atkinson Cycle + AC Synchronous Motor, 115.56 PS combined, e-CVT)
    2. Efficiency & Range (27.97 km/l ARAI*, 1,200 km range, EV Drive Mode, regenerative braking)
    3. Dimensions & Chassis (4,345 x 1,795 x 1,645 mm, 210 mm ground clearance, 5.4m turning radius)
    4. Safety Shield (Suzuki TECT body, 6 airbags, 360° HD camera, all-4 disc brakes, ESP with Hill Hold)
* **4. Smart Finance EMI Calculator (`ArenaEmiCalculator.tsx`)**:
  * Live Downpayment and Tenure sliders (1 to 7 years) with Arena Red tracks.
  * Structured dealer quotation card calculating monthly installment, principal, interest, and partner financer notes.



