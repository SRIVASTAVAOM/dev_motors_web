"use client";

import { useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import QuickBookingForm from "@/components/common/QuickBookingForm";

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "sales" | "service";
}

export default function QuickBookingModal({
  isOpen,
  onClose,
  initialMode = "sales",
}: QuickBookingModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-[#0E131F] text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E31837]" />
            <div>
              <div className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-gray-300">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>DEV MOTORS LUCKNOW</span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight uppercase text-white leading-tight">
                Quick Sales &amp; Service Portal
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <QuickBookingForm initialMode={initialMode} isCompact={false} />
      </div>
    </div>
  );
}
