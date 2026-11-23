"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFarmerLand } from "@/app/_services/apiLands";
import { landKey } from "./useFetchLand";
import toast from "react-hot-toast";

export function useUpdateLand(farmerId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateFarmerLand(id, updates),
    onSuccess: (updated) => {
      queryClient.setQueryData(landKey(farmerId), (old = []) =>
        old.map((l) => (l.id === updated.id ? updated : l)),
      );
      queryClient.invalidateQueries({ queryKey: landKey(farmerId) });
      toast.success("successfully updated land");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "failed to update data");
    },
  });
}
