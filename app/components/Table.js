import React from "react";
import TrendChart from "./TrendChart";
import { fetchMarketData } from "@/utils/getMandiPrice";

// --- FAKE API FUNCTION ---
// Simulates a 2-second network request and returns 1 week of trend data
const fetchMandiPrices = async (crop, location) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          market: "Ludhiana APMC",
          price: "2,450",
          change: "+2.1%",
          isPositive: true,
          trend: [
            { value: 2350 },
            { value: 2320 },
            { value: 2400 },
            { value: 2380 },
            { value: 2420 },
            { value: 2410 },
            { value: 2450 },
          ],
        },
        {
          id: 2,
          market: "Phagwara Mandi",
          price: "2,430",
          change: "+1.8%",
          isPositive: true,
          trend: [
            { value: 2340 },
            { value: 2350 },
            { value: 2330 },
            { value: 2390 },
            { value: 2370 },
            { value: 2400 },
            { value: 2430 },
          ],
        },
        {
          id: 3,
          market: "Jalandhar Mandi",
          price: "2,410",
          change: "+0.9%",
          isPositive: true,
          trend: [
            { value: 2380 },
            { value: 2400 },
            { value: 2370 },
            { value: 2410 },
            { value: 2390 },
            { value: 2400 },
            { value: 2410 },
          ],
        },
        {
          id: 4,
          market: "Ferozepur Mandi",
          price: "2,380",
          change: "-0.4%",
          isPositive: false,
          trend: [
            { value: 2430 },
            { value: 2410 },
            { value: 2440 },
            { value: 2390 },
            { value: 2410 },
            { value: 2390 },
            { value: 2380 },
          ],
        },
      ]);
    }, 2000);
  });
};

// --- REUSABLE ROW COMPONENT ---
const TableRow = ({ row }) => {
  return (
    <tr className="border-b  border-gray-400 last:border-0 hover:bg-gray-100 transition-colors">
      <td className="py-2 px-6 text-sm font-medium text-gray-800">
        {row.market}
      </td>
      <td className="py-2 px-6 text-sm font-medium text-gray-800">
        ₹ {row.price}
      </td>
      <td
        className={`py-2 px-6 text-sm font-semibold ${row.isPositive ? "text-green-600" : "text-red-500"}`}
      >
        {row.change}
      </td>
      <td className="py-2 px-6 w-32">
        <TrendChart data={row.trend} isPositive={row.isPositive} />
      </td>
    </tr>
  );
};

// --- MAIN SERVER COMPONENT ---
// In Next.js App Router, layout/page components receive searchParams natively.
// If importing this into page.js, pass searchParams down: <MandiPriceTable searchParams={searchParams} />
export default async function MandiPriceTable({ searchParams }) {
  const params = await searchParams;
  // Extract parameters with fallbacks
  const crop = params?.crop || "Wheat";
  const location = params?.location || "*";
  // api => 579b464db66ec23bdd0000016f43b2564d494a0d4e4077f1caf22ba1

  const priceData = await fetchMarketData("Punjab", crop, location);

  return (
    <div className="bg-white rounded-2xl border border-gray-400 overflow-hidden shadow-sm mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-400 gap-2">
        <h3 className="text-lg font-bold text-gray-900">
          Current Mandi Prices ({location})
        </h3>
        <span className="text-xs font-medium text-gray-400">
          Last Updated: 15 Nov 2025, 10:30 AM
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto max-h-[300px] custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-gray-400">
              <th className="py-3 px-6 text-md font-semibold text-gray-800  tracking-wide">
                Market
              </th>
              <th className="py-3 px-6 text-md font-semibold text-gray-800 tracking-wide">
                Price (₹/quintal)
              </th>
              <th className="py-3 px-6 text-md font-semibold text-gray-800 tracking-wide">
                Change (1d)
              </th>
              <th className="py-3 px-6 text-md font-semibold text-gray-800 tracking-wide">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {priceData.map((row) => (
              <TableRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
