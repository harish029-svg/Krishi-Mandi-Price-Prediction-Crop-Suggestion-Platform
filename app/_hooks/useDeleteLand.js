"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFarmerLand } from "@/app/_services/apiLands";
import { landKey } from "./useFetchLand";
import toast from "react-hot-toast";

export function useDeleteLand(farmerId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFarmerLand,
    onSuccess: (id) => {
      queryClient.setQueryData(landKey(farmerId), (old = []) =>
        old.filter((l) => l.id !== id),
      );
      queryClient.invalidateQueries({ queryKey: landKey(farmerId) });
      toast.success("Successfully Deleted!");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "failed to delete data");
    },
  });
}
