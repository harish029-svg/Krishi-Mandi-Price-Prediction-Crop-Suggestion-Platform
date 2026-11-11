"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { extractGraphData } from "@/utils/getMandiPrice";

export default function TrendChart({ rawApiData }) {
  const searchParams = useSearchParams();
  const crop = searchParams.get("crop") || "Wheat";
  const location = searchParams.get("location") || "Ludhiana";

  const [activeRange, setActiveRange] = useState("1M");
  const ranges = ["7D", "1M", "3M", "6M", "1Y"];

  const chartData = useMemo(() => {
    return extractGraphData(rawApiData, crop, location);
  }, [rawApiData, crop, location]);

  const formatYAxis = (tickItem) => tickItem.toLocaleString("en-IN");

  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm">
      {/* Header matching image_862376.png layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Historical Price Trend{" "}
          <span className="text-gray-500 font-semibold">
            ({crop} - {location === "*" ? "All Locations" : location})
          </span>
        </h2>

        {/* Time filters in Light Mode */}
        <div className="flex bg-gray-50 rounded-full p-1 border border-gray-200/70">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeRange === range
                  ? "bg-[#0f5132] text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Graph Area */}
      {chartData.length === 0 ? (
        <div className="h-[300px] w-full flex items-center justify-center text-gray-400 border border-dashed border-gray-200 rounded-xl">
          <p className="text-sm font-medium">
            No price data found for "{crop}" in "{location}"
          </p>
        </div>
      ) : (
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="lightGreenGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="0"
                stroke="#f1f5f9"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />

              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                domain={["dataMin - 100", "dataMax + 100"]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2e8f0",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#0f5132", fontWeight: 600 }}
                labelStyle={{
                  color: "#64748b",
                  marginBottom: "2px",
                  fontSize: "12px",
                }}
                formatter={(value) => [
                  `₹${value.toLocaleString("en-IN")}`,
                  "Price",
                ]}
              />

              {/* Spiky line configuration */}
              <Area
                type="linear"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#lightGreenGradient)"
                dot={{ r: 3, fill: "#10b981", stroke: "#10b981" }}
                activeDot={{
                  r: 5,
                  fill: "#0f5132",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
