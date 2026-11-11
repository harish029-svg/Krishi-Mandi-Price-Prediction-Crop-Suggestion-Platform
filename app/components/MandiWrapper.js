"use client";

import React, { useTransition } from "react";
import MandiSearch from "./MandiSearch";

export default function MandiWrapper({ children }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2">
      <MandiSearch isPending={isPending} startTransition={startTransition} />

      <div
        className={`transition-opacity duration-300 ${isPending ? "opacity-40 pointer-events-none" : "opacity-100"}`}
      >
        {children}
      </div>
    </div>
  );
}
