"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchFarmerLand } from "@/app/_services/apiLands";

export const landKey = (farmerId) => ["farmerLand", farmerId];

// initialData comes from the server component so there is no loading flash
export function useFetchLand(farmerId, initialData) {
  return useQuery({
    queryKey: landKey(farmerId),
    queryFn: () => fetchFarmerLand(farmerId),
    initialData,
    enabled: !!farmerId,
  });
}
