"use client";

import { useState } from "react";
import { submitTestDriveBooking, BookingResponse } from "@/app/actions/booking";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Car,
  CheckCircle2,
  Loader2,
  Home,
  Building2,
} from "lucide-react";

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  carModelName: string;
  variantName?: string;
  availableVariants?: string[];
}

const DEALERSHIP_LOCATIONS = [
  "Dev Motors Main Arena Campus - Kanpur Road, Lucknow",
  "Dev Motors Nexa Lounge - Gomti Nagar, Lucknow",
  "Dev Motors Hazratganj Premium Branch, Lucknow",
  "Dev Motors True Value Hub - Transport Nagar, Lucknow",
];

const TIME_SLOTS = [
  "Morning (10:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 03:00 PM)",
  "Evening (03:00 PM - 06:00 PM)",
];

export default function TestDriveModal({
  isOpen,
  onClose,
  carModelName,
  variantName,
  availableVariants = [],
}: TestDriveModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(variantName || availableVariants[0] || "");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState(TIME_SLOTS[0]);
  const [dealershipLocation, setDealershipLocation] = useState(DEALERSHIP_LOCATIONS[0]);
  const [doorstepPickup, setDoorstepPickup] = useState(false);
  const [pickupAddress, setPickupAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await submitTestDriveBooking({
        carModelName,
        variantName: selectedVariant,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        preferredDate,
        preferredTimeSlot,
        dealershipLocation,
        doorstepPickup,
        pickupAddress,
      });

      setResult(response);
      if (!response.success) {
        setErrorMessage(response.message);
      }
    } catch {
      setErrorMessage("Unable to schedule booking. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setResult(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl border border-gray-300 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-[#F9FAFB]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-[#E31837] text-white">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#1B365D]">
                MARUTI SUZUKI TEST DRIVE
              </div>
              <h3 id="modal-title" className="text-base font-black text-[#111827] uppercase">
                Experience {carModelName}
              </h3>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs">
          {result && result.success ? (
            /* Success Confirmation View */
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center bg-emerald-50 border border-emerald-300 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black uppercase text-gray-900">
                  Test Drive Confirmed!
                </h4>
                <p className="text-xs text-gray-600 max-w-xs mx-auto">
                  Thank you, <strong>{name}</strong>. Your test drive appointment for the{" "}
                  <strong>{carModelName}</strong> has been registered.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-gray-50 border border-gray-200 p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-semibold uppercase text-[10px]">Booking Reference:</span>
                  <span className="font-mono font-black text-[#E31837]">{result.bookingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date &amp; Slot:</span>
                  <span className="font-bold text-gray-900">
                    {preferredDate} &bull; {preferredTimeSlot.split(" ")[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mode:</span>
                  <span className="font-bold text-gray-900">
                    {doorstepPickup ? "Doorstep Test Drive" : "Showroom Visit"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full bg-[#111827] hover:bg-black text-white py-3 text-xs font-black uppercase tracking-wider transition-colors"
              >
                Return to Showroom
              </button>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Variant Selection */}
              {availableVariants.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block">
                    Preferred Variant / Trim
                  </label>
                  <select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:border-black"
                  >
                    {availableVariants.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Test Drive Mode: Doorstep vs Showroom */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block">
                  Test Drive Location Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDoorstepPickup(false)}
                    className={`flex items-center justify-center gap-2 p-3 border text-xs font-bold uppercase transition-all ${
                      !doorstepPickup
                        ? "border-[#E31837] bg-red-50/30 text-[#E31837]"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Showroom Visit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDoorstepPickup(true)}
                    className={`flex items-center justify-center gap-2 p-3 border text-xs font-bold uppercase transition-all ${
                      doorstepPickup
                        ? "border-[#E31837] bg-red-50/30 text-[#E31837]"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    <span>Doorstep Visit</span>
                  </button>
                </div>
              </div>

              {doorstepPickup ? (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block">
                    Your Complete Address in Lucknow
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 42/B, Gomti Nagar / Aliganj, Lucknow"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block">
                    Preferred Dealership Branch
                  </label>
                  <select
                    value={dealershipLocation}
                    onChange={(e) => setDealershipLocation(e.target.value)}
                    className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:border-black"
                  >
                    {DEALERSHIP_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-[#E31837]" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#1B365D]" />
                    <span>Time Slot</span>
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3 pt-2 border-t border-gray-200">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block flex items-center gap-1">
                    <User className="h-3 w-3 text-gray-500" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block flex items-center gap-1">
                      <Phone className="h-3 w-3 text-gray-500" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 bg-white p-2.5 text-xs text-gray-900 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E31837] hover:bg-[#C8102E] disabled:bg-gray-300 text-white py-3.5 text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Scheduling Appointment...</span>
                  </>
                ) : (
                  <span>Confirm Test Drive Appointment</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
