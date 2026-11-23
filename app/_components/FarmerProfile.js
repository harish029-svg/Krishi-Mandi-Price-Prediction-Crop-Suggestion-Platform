"use client";

import { HiOutlineArrowPath } from "react-icons/hi2";
import useFetchFarmer from "@/app/_hooks/useFetchFarmer";

export default function FarmerProfile({ farmerId }) {
  const { data: farmer, isLoading, error } = useFetchFarmer({ id: farmerId });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <HiOutlineArrowPath className="h-5 w-5 animate-spin text-green-800" />
        <span className="ml-2.5 text-sm font-medium text-gray-600">
          Loading profile...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Failed to load profile: {error.message || "Please try again later."}
      </div>
    );
  }

  const location = [farmer?.district, farmer?.state].filter(Boolean).join(", ");

  return (
    <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
      {/* Top Section: Circular Avatar + Name & Email */}
      <div className="flex items-center gap-5">
        <img
          src={farmer?.image || "https://via.placeholder.com/150"}
          alt={farmer?.name || "Farmer Avatar"}
          className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-gray-100"
        />
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-gray-900">
            {farmer?.name || "Farmer"}
          </h2>
          <p className="mt-0.5 truncate text-sm text-gray-500">
            {farmer?.email || "No email available"}
          </p>
        </div>
      </div>

      {/* Inner Divided Key-Value Card (matching reference layout) */}
      <div className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/40 px-5">
        <div className="grid grid-cols-3 items-center py-4 text-sm">
          <span className="font-medium text-gray-500">Email</span>
          <span className="col-span-2 font-medium text-gray-900">
            {farmer?.email || "Not set"}
          </span>
        </div>

        <div className="grid grid-cols-3 items-center py-4 text-sm">
          <span className="font-medium text-gray-500">Location</span>
          <span className="col-span-2 font-medium text-gray-900">
            {location || "Not set"}
          </span>
        </div>

        <div className="grid grid-cols-3 items-center py-4 text-sm">
          <span className="font-medium text-gray-500">Role</span>
          <span className="col-span-2 font-medium text-gray-900">Farmer</span>
        </div>
      </div>
    </div>
  );
}
