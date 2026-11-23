import { useState, useEffect } from "react";
// Import your existing getFarmerById function here
import { getFarmerById } from "@/app/_services/apiFarmers.mjs";

export function useFetchDistricts({ farmerId }) {
  const [districts, setDistricts] = useState([]);
  const [stateName, setStateName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // console.log("INSIDE FETCH DISTRICTS", farmerId);

  useEffect(() => {
    // Do not run if no farmerId is provided
    if (!farmerId) return;

    let isMounted = true;

    async function fetchDistricts() {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Fetch farmer details and extract the state
        const farmer = await getFarmerById(farmerId);
        console.log(farmer);
        const farmerState = farmer?.state;

        if (!farmerState) {
          throw new Error("State not found for this farmer.");
        }

        if (isMounted) setStateName(farmerState);

        // Step 2: Fetch states data from JSON Server
        // Option A: Fetch all states and filter in JS (matches your exact requirement)
        const response = await fetch("http://localhost:5000/states");

        // Option B (Faster): Let JSON Server filter by state directly:
        // const response = await fetch(`http://localhost:3000?state=${encodeURIComponent(farmerState)}`);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Failed to fetch states data: ${response.status}`);
        }

        const statesData = await response.json();

        // console.log(statesData);

        // Step 3: Find the matching state (case-insensitive) and extract districts
        const matchedState = statesData.find(
          (item) => item.state.toLowerCase() === farmerState.toLowerCase(),
        );

        if (isMounted) {
          setDistricts(matchedState ? matchedState.districts : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
          setDistricts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDistricts();

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, [farmerId]);

  return { districts, stateName, loading, error };
}
