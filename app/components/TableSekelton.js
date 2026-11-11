import React from "react";

// --- REUSABLE SKELETON ROW ---
const SkeletonRow = () => {
  return (
    <tr className="border-b border-gray-100 last:border-0">
      <td className="py-4 px-6">
        {/* Using a custom 1.2s pulse for a faster animation speed, with slightly darker grays and inner shadows */}
        <div className="h-4 w-32 bg-gray-300 rounded-md shadow-inner animate-[pulse_1.2s_ease-in-out_infinite]"></div>
      </td>
      <td className="py-4 px-6">
        <div className="h-4 w-24 bg-gray-200 rounded-md shadow-sm animate-[pulse_1.2s_ease-in-out_infinite] delay-75"></div>
      </td>
      <td className="py-4 px-6">
        <div className="h-4 w-16 bg-gray-200 rounded-md shadow-sm animate-[pulse_1.2s_ease-in-out_infinite] delay-150"></div>
      </td>
      <td className="py-4 px-6">
        {/* Larger block for the trend chart skeleton */}
        <div className="h-10 w-24 bg-gray-200 rounded-lg shadow-inner animate-[pulse_1.2s_ease-in-out_infinite] delay-200"></div>
      </td>
    </tr>
  );
};

export default function TableSkeleton() {
  // Generate 4 rows to match the typical view state without line-wrapping issues
  const skeletonRows = Array.from({ length: 4 });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md mt-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 border-b border-gray-100 gap-4">
        <div className="h-6 w-64 bg-gray-300 rounded-md shadow-inner animate-[pulse_1.2s_ease-in-out_infinite]"></div>
        <div className="h-4 w-40 bg-gray-200 rounded-md shadow-sm animate-[pulse_1.2s_ease-in-out_infinite] delay-75"></div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px] whitespace-nowrap">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-gray-100">
              <th className="py-3 px-6">
                <div className="h-3 w-16 bg-gray-300 rounded shadow-sm animate-[pulse_1.2s_ease-in-out_infinite]"></div>
              </th>
              <th className="py-3 px-6">
                <div className="h-3 w-24 bg-gray-300 rounded shadow-sm animate-[pulse_1.2s_ease-in-out_infinite]"></div>
              </th>
              <th className="py-3 px-6">
                <div className="h-3 w-20 bg-gray-300 rounded shadow-sm animate-[pulse_1.2s_ease-in-out_infinite]"></div>
              </th>
              <th className="py-3 px-6">
                <div className="h-3 w-12 bg-gray-300 rounded shadow-sm animate-[pulse_1.2s_ease-in-out_infinite]"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
