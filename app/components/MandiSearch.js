"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Dropdown from "./Dropdown";
// --- REUSABLE DROPDOWN COMPONENT ---

// --- FAKE DATA ARRAYS ---
const CROP_DATA = [
  "Apple",
  "CauliFlower",
  "Tomato",
  "Potato",
  "Maize",
  "Onion",
];
const LOCATION_DATA = [
  "*",
  "Ludhiana",
  "Amritsar",
  "Patiala",
  "Jalandhar",
  "Bathinda",
];

// --- MAIN SEARCH COMPONENT ---
export default function MandiSearch({ isPending, startTransition }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCrop, setSelectedCrop] = useState(
    searchParams.get("crop") || CROP_DATA[0],
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") || LOCATION_DATA[0],
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("crop", selectedCrop);
    params.set("location", selectedLocation);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="w-full bg-white">
      <h2 className="text-[22px] font-bold text-gray-900 mb-6">Mandi Prices</h2>

      <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-6">
        <Dropdown
          label="Select Crop"
          options={CROP_DATA}
          value={selectedCrop}
          onChange={setSelectedCrop}
        />

        <Dropdown
          label="Select Location"
          options={LOCATION_DATA}
          value={selectedLocation}
          onChange={setSelectedLocation}
        />

        <button
          onClick={handleSearch}
          disabled={isPending} // 4. Disable when pending
          className={`w-full md:w-auto px-8 py-2.5 text-white text-sm font-medium rounded-xl transition-all h-[42px] flex items-center justify-center min-w-[120px] ${
            isPending
              ? "bg-gray-400 cursor-not-allowed" // Disabled styles
              : "bg-[#0d5c38] hover:bg-[#0a462a]" // Active styles
          }`}
        >
          {/* 5. Optional: Show a loading state in the button */}
          {isPending ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Searching...
            </div>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </div>
  );
}
