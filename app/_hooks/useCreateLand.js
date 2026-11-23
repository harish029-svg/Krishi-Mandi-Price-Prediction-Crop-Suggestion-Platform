"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFarmerLand } from "@/app/_services/apiLands";
import { landKey } from "./useFetchLand";

export function useCreateLand(farmerId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFarmerLand,
    onSuccess: (newLand) => {
      // show it instantly, then re-sync with the database
      queryClient.setQueryData(landKey(farmerId), (old = []) => [newLand, ...old]);
      queryClient.invalidateQueries({ queryKey: landKey(farmerId) });
    },
  });
}
