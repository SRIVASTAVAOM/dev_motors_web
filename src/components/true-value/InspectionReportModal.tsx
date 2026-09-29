"use client";

import { X, ShieldCheck, Award, Calendar, UserCheck, Printer } from "lucide-react";
import { TrueValueCarItem } from "@/lib/types/true-value";
import { generateSampleInspectionReport } from "@/lib/valuation";

interface InspectionReportModalProps {
  car: TrueValueCarItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InspectionReportModal({
  car,
  isOpen,
  onClose,
}: InspectionReportModalProps) {
  if (!isOpen || !car) return null;

  const report = generateSampleInspectionReport(car);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10 print:border-none print:shadow-none print:max-h-none">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors print:hidden"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Certificate Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Dev Motors True Value • Digital Inspection Certificate</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            376-Point Digital Quality Inspection Report
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Certified pre-owned vehicle verification authenticated by authorized Maruti Suzuki diagnostic equipment.
          </p>
        </div>

        {/* Summary Card */}
        <div className="mt-5 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Vehicle Under Assessment
            </span>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
              {report.carTitle}
            </h3>
            <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
              Registration: {report.carRegNumber}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                Audit Score
              </span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {report.overallScore}/100
              </span>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300">
              <Award className="h-7 w-7" />
            </div>
          </div>
        </div>

        {/* Auditor Metadata */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500 px-1">
          <div className="flex items-center gap-1.5">
            <UserCheck className="h-3.5 w-3.5 text-blue-600" />
            <span>Certified Inspector: {report.inspectorName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-blue-600" />
            <span>Audited: {report.inspectionDate}</span>
          </div>
        </div>

        {/* 5 Checkpoint Sections */}
        <div className="mt-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Inspection Checkpoint Breakdown (376 Parameters)
          </h4>

          <div className="space-y-3">
            {report.sections.map((section, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                      ✓
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                      {section.title}
                    </h5>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800">
                    {section.passedCount} / {section.checkpointCount} Passed
                  </span>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 pl-7">
                  {section.highlights.map((item, hIdx) => (
                    <li
                      key={hIdx}
                      className="text-[11px] text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5"
                    >
                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Warranty Assurance Box */}
        <div className="mt-6 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
            <div>
              <h5 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                1-Year True Value Warranty & 3 Free Services Included
              </h5>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300/80">
                Engine & transmission covered nationwide at any authorized Maruti Suzuki dealership.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Close Report
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save PDF Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
