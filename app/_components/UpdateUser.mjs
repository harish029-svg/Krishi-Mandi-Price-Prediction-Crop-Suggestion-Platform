"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaImage,
  FaCheckCircle,
  FaUndo,
  FaSpinner,
} from "react-icons/fa";
import useFetchFarmer from "@/app/_hooks/useFetchFarmer"; // Adjust path based on your project structure
import useUpdateFarmer from "../_hooks/useUpdateFarmer";

export default function ProfileUpdateForm({ id }) {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    district: "",
    profilePic: "",
  });

  const { data: initialData, isLoading, error } = useFetchFarmer({ id });
  const { mutate: updateFarmerById, isUpdating: isSubmitting } =
    useUpdateFarmer();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        state: initialData.state || "",
        district: initialData.district || "",
        profilePic: initialData.image || "",
      });
    }
  }, [initialData]);

  // Check if current form data matches initial fetched data
  const isUnchanged = useMemo(() => {
    if (!initialData) return true;
    return (
      formData.name === (initialData.name || "") &&
      formData.state === (initialData.state || "") &&
      formData.district === (initialData.district || "") &&
      formData.profilePic === (initialData.profilePic || "")
    );
  }, [formData, initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset back to initial data
  const handleCancel = (e) => {
    e.preventDefault();
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        state: initialData.state || "",
        district: initialData.district || "",
        profilePic: initialData.profilePic || "",
      });
    }
  };

  // Handle form submission and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUnchanged) return;

    const updatedFields = {};
    if (formData.name !== (initialData.name || "")) {
      updatedFields.name = formData.name;
    }
    if (formData.state !== (initialData.state || "")) {
      updatedFields.state = formData.state;
    }
    if (formData.district !== (initialData.district || "")) {
      updatedFields.district = formData.district;
    }
    if (formData.profilePic !== (initialData.image || "")) {
      updatedFields.image = formData.profilePic;
    }

    updateFarmerById({ id, val: updatedFields });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-emerald-50/50 rounded-2xl border border-emerald-100">
        <FaSpinner className="w-6 h-6 text-emerald-600 animate-spin" />
        <span className="ml-2 text-emerald-800 font-medium">
          Loading farmer profile...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-center text-sm">
        Failed to load profile: {error.message || "Please try again later."}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-emerald-800 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Mandi Trader Profile
        </h2>
        <span className="text-xs bg-emerald-700 text-emerald-100 px-2.5 py-1 rounded-full font-medium">
          Region: {formData.state || "Not set"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="flex items-center gap-4 p-4 bg-emerald-50/40 rounded-xl border border-emerald-100">
          <img
            src={formData.profilePic || "https://via.placeholder.com/150"}
            alt="Profile Preview"
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
          />
          <div className="flex-1">
            <label className="block text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-1">
              Profile Picture URL
            </label>
            <div className="relative flex items-center">
              <FaImage className="absolute left-3 text-emerald-500" />
              <input
                type="url"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-900"
              />
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <div className="relative flex items-center">
            <FaUser className="absolute left-3 text-emerald-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-900"
            />
          </div>
        </div>

        {/* State & District Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-1">
              State
            </label>
            <div className="relative flex items-center">
              <FaMapMarkerAlt className="absolute left-3 text-emerald-500" />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Punjab"
                required
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-1">
              District / Mandi Hub
            </label>
            <div className="relative flex items-center">
              <FaMapMarkerAlt className="absolute left-3 text-emerald-500" />
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g. Ludhiana"
                required
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-emerald-900"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-emerald-100">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isUnchanged || isSubmitting}
            className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaUndo className="text-xs" />
            Cancel
          </button>

          <button
            type="submit"
            disabled={isUnchanged || isSubmitting}
            className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting && <FaSpinner className="animate-spin" />}
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
