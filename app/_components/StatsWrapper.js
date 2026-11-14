"use client";

import { cloneElement } from "react";
import useFetchFarmer from "../_hooks/useFetchFarmer";
import Stats from "./Stats";

function StatsWrapper({ children, id }) {
  const { data: farmerData, isLoading } = useFetchFarmer({ id });
  if (isLoading) return <p>loading ...</p>;
  return cloneElement(children, { farmerData });
}

export default StatsWrapper;
