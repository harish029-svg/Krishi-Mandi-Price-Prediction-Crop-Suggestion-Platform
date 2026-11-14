import React from "react";

const ROW_WIDTHS = ["w-28", "w-52", "w-32", "w-36", "w-32"];

export default function TableChartSkeleton() {
  return (
    <div
      className="w-full space-y-5"
      aria-busy="true"
      aria-label="Loading mandi prices"
    >
      {/* Top Card: Current Mandi Prices Skeleton */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/80">
          <div className="h-5 w-44 bg-slate-200 rounded-md animate-pulse" />
          <div className="h-3.5 w-48 bg-slate-100 rounded animate-pulse" />
        </div>

        {/* Sub-header spacer bar */}
        <div className="h-3 bg-slate-50/70 border-b border-slate-200/70" />

        {/* Table Rows */}
        <div className="divide-y divide-slate-200/70">
          {ROW_WIDTHS.map((nameWidth, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 items-center px-5 py-3.5 hover:bg-slate-50/40 transition-colors"
            >
              {/* APMC Location Name */}
              <div className="col-span-5">
                <div
                  className={`h-4 ${nameWidth} bg-slate-200/90 rounded animate-pulse`}
                />
              </div>

              {/* Current Price */}
              <div className="col-span-3">
                <div className="h-4 w-16 bg-slate-200/80 rounded animate-pulse" />
              </div>

              {/* Percentage Change */}
              <div className="col-span-2">
                <div className="h-4 w-14 bg-slate-200/80 rounded animate-pulse" />
              </div>

              {/* Mini Sparkline Placeholder */}
              <div className="col-span-2 flex justify-end">
                <div className="h-6 w-20 bg-slate-100 rounded-md flex items-end justify-between px-1.5 py-1 animate-pulse">
                  <span className="w-1.5 h-2 bg-slate-200 rounded-full" />
                  <span className="w-1.5 h-3.5 bg-slate-200 rounded-full" />
                  <span className="w-1.5 h-2.5 bg-slate-200 rounded-full" />
                  <span className="w-1.5 h-4 bg-slate-200 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Card: Historical Price Trend Skeleton */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5">
        {/* Card Header & Timeframe Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="h-5 w-64 bg-slate-200 rounded-md animate-pulse" />

          {/* 7D, 1M, 3M, 6M, 1Y Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-full border border-slate-100">
            {[0, 1, 2, 3, 4].map((pill) => (
              <div
                key={pill}
                className={`h-6 w-9 rounded-full animate-pulse ${
                  pill === 1 ? "bg-slate-300/90" : "bg-slate-200/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Chart Area Placeholder */}
        <div className="relative h-64 w-full rounded-xl border border-slate-100 bg-slate-50/50 p-6 flex flex-col justify-between overflow-hidden">
          {/* Subtle Horizontal Chart Gridlines */}
          {[0, 1, 2, 3].map((line) => (
            <div key={line} className="w-full border-b border-slate-200/60" />
          ))}

          {/* Centered Loading Shimmer Bar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3.5 w-48 bg-slate-200/80 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
