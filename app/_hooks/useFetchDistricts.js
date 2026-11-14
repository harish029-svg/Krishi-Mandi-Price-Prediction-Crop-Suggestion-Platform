import { useEffect, useState } from "react";
import useFetchFarmer from "./useFetchFarmer";

function useFetchDistricts() {
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoadinng] = useState(false);
  const { data, isLoading: isFetching } = useFetchFarmer();
  useEffect(function () {});
}

export default useFetchDistricts;
