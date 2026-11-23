"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  HiOutlineUser,
  HiOutlineMapPin,
  HiOutlinePhoto,
  HiOutlineArrowPath,
  HiOutlineCheck,
} from "react-icons/hi2";
import useFetchFarmer from "@/app/_hooks/useFetchFarmer";
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

  // Fixed: compare profilePic against initialData.image
  const isUnchanged = useMemo(() => {
    if (!initialData) return true;
    return (
      formData.name === (initialData.name || "") &&
      formData.state === (initialData.state || "") &&
      formData.district === (initialData.district || "") &&
      formData.profilePic === (initialData.image || "")
    );
  }, [formData, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fixed: reset profilePic back to initialData.image
  const handleCancel = (e) => {
    e.preventDefault();
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        state: initialData.state || "",
        district: initialData.district || "",
        profilePic: initialData.image || "",
      });
    }
  };

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
      <div className="flex h-64 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <HiOutlineArrowPath className="h-5 w-5 animate-spin text-green-800" />
        <span className="ml-2.5 text-sm font-medium text-gray-600">
          Loading profile settings...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Failed to load profile: {error.message || "Please try again later."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column: Profile Overview Card */}
      <div className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100 lg:self-start">
        <img
          src={formData.profilePic || "https://via.placeholder.com/150"}
          alt={formData.name || "Farmer profile"}
          className="h-24 w-24 rounded-full object-cover ring-4 ring-green-50"
        />
        <h2 className="mt-4 text-lg font-bold text-gray-900">
          {formData.name || "Farmer"}
        </h2>
        <p className="mt-0.5 text-sm text-gray-500">
          {[formData.district, formData.state].filter(Boolean).join(", ") ||
            "Location not set"}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
          <HiOutlineMapPin className="h-3.5 w-3.5" />
          {formData.state || "Region not set"}
        </span>
      </div>

      {/* Right Column: Editable Details Card */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:col-span-2"
      >
        <div className="border-b border-gray-100 pb-4">
          <h3 className="text-base font-semibold text-gray-900">
            Personal & Region Information
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Your state and district determine default local mandi prices and
            crop suggestions.
          </p>
        </div>

        {/* Full Name */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative flex items-center">
            <HiOutlineUser className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 transition focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/15"
            />
          </div>
        </div>

        {/* Profile Picture URL */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Profile Picture URL
          </label>
          <div className="relative flex items-center">
            <HiOutlinePhoto className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
            <input
              type="url"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 transition focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/15"
            />
          </div>
        </div>

        {/* State & District */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              State
            </label>
            <div className="relative flex items-center">
              <HiOutlineMapPin className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Uttar Pradesh"
                required
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 transition focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/15"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-700">
              District / Mandi Hub
            </label>
            <div className="relative flex items-center">
              <HiOutlineMapPin className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g. Mirzapur"
                required
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 transition focus:border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800/15"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isUnchanged || isSubmitting}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isUnchanged || isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-green-800 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? (
              <HiOutlineArrowPath className="h-4 w-4 animate-spin" />
            ) : (
              <HiOutlineCheck className="h-4 w-4" />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
