import { getFarmerById } from "../_services/apiFarmers.mjs";
import { useQuery } from "@tanstack/react-query";

function useFetchFarmer({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["farmer", id],
    queryFn: () => getFarmerById(id),
  });
  return {
    data,
    isLoading,
    error,
  };
}

export default useFetchFarmer;
