"use client";

import React from "react";
import { Area, YAxis, createHorizontalChart } from "recharts";

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
