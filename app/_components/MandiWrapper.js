"use client";

import React, { useTransition } from "react";
import MandiSearch from "./MandiSearch";
import useFetchFarmer from "../_hooks/useFetchFarmer";
import useFetchDistricts from "../_hooks/useFetchDistricts";

export default function MandiWrapper({ id, children }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2">
      <MandiSearch
        id={id}
        isPending={isPending}
        startTransition={startTransition}
      />

      <div
        className={`flex flex-col gap-4 transition-opacity duration-300 ${isPending ? "opacity-40 pointer-events-none" : "opacity-100"}`}
      >
        {children}
      </div>
    </div>
  );
}
