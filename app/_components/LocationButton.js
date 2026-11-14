"use client";
import React, { useState } from "react";
import { updateFarmerById } from "../_services/apiFarmers.mjs";
import useUpdateFarmer from "../_hooks/useUpdateFarmer";

export default function LocationButton({ id }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { mutate, isUpdating } = useUpdateFarmer();

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Using OpenStreetMap Nominatim API for reverse geocoding (no API key required)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          if (!response.ok) {
            throw new Error("Failed to fetch address from coordinates.");
          }
          // console.log(id);
          const data = await response.json();
          // console.log(data);
          mutate({
            id,
            val: {
              state: data?.address?.state,
              district: data?.address?.state_district,
              // district: "Ludhiana",
            },
          });
          // console.log(updateFamer);
        } catch (err) {
          setError(err.message || "Error fetching address.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(
          err.message || "Permission denied or unable to retrieve location.",
        );
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

  return (
    <>
      <button
        onClick={handleGetLocation}
        disabled={loading}
        style={{
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Fetching Location..." : "Get My Address"}
      </button>
    </>
  );
}
