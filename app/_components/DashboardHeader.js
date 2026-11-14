"use client";

import useFetchFarmer from "../_hooks/useFetchFarmer";

function DashboardHeader({ id }) {
  const { data: farmer, isLoading } = useFetchFarmer({ id });
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Good Morning, {isLoading ? "Loading..." : farmer?.name} ji
      </h1>
      <p className="text-gray-500 text-sm">
        Here's what's happening in your area today.
      </p>
    </div>
  );
}

export default DashboardHeader;
