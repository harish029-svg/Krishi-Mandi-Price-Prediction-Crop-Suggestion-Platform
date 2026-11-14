"use client";

import React from "react";
import { Area, Tooltip, YAxis, createHorizontalChart } from "recharts";

const Typed = createHorizontalChart()({ YAxis, Area });

export default function TrendChart({ data, isPositive }) {
  const color = isPositive ? "#22c55e" : "#ef4444";

  return (
    <div className="h-10 w-24">
      <Typed.AreaChart
        responsive
        data={data}
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient
            id={`gradient-${isPositive}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Typed.YAxis domain={["dataMin", "dataMax"]} hide />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            borderColor: "#e2e8f0",
            borderRadius: "10px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
          itemStyle={{
            color: "#0f5132",
            fontWeight: 600,
            fontSize: "12px",
          }}
          labelStyle={{
            color: "#64748b",
            margin: "0px",
            fontSize: "0px",
          }}
          position={{ y: 40 }}
          formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Price"]}
        />
        <Typed.Area
          type="linear" // Changed from "monotone" to "linear" for the spiky look
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(#gradient-${isPositive})`}
          isAnimationActive={false}
          dot={{ r: 2, fill: color, strokeWidth: 0 }} // Adds the dots on each data point
          activeDot={{ r: 4 }} // Slightly larger dot when hovering
        />
      </Typed.AreaChart>
    </div>
  );
}
