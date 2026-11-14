import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateFarmerById } from "../_services/apiFarmers.mjs";
import { toast } from "react-hot-toast";
import { refreshDashboard } from "../_lib/actions";
import { useContext } from "react";
import { useGlobalTransition } from "../_components/QueryProvider";
function useUpdateFarmer() {
  const queryClient = useQueryClient();
  const { startTransition } = useGlobalTransition();
  const { isPending: isUpdating, mutate } = useMutation({
    mutationFn: (obj) => updateFarmerById(obj.id, obj.val),
    onSuccess: async (updatedData, variables) => {
      const { id, val } = variables;
      queryClient.invalidateQueries({ queryKey: ["farmer", id] });
      startTransition(async () => {
        await refreshDashboard();
      });
      toast.success("successfully updated data");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message || "failed to update data");
    },
  });
  return {
    isUpdating,
    mutate,
  };
}

export default useUpdateFarmer;
