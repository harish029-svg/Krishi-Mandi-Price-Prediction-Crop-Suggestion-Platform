"use client";

import React, { useState, useMemo } from "react";
import {
  FiUser,
  FiMapPin,
  FiGlobe,
  FiImage,
  FiX,
  FiCheck,
  FiBell,
  FiShield,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import {
  HiCheckBadge,
  HiOutlineArrowPath,
  HiOutlineCheck,
} from "react-icons/hi2";
import { TbPlant, TbTractor, TbBuildingStore } from "react-icons/tb";
import useFetchFarmer from "@/app/_hooks/useFetchFarmer";
import useUpdateFarmer from "../_hooks/useUpdateFarmer";

/**
 * ProfileUpdateForm Component
 * Enhanced settings experience matching AgriSaathi's modern dashboard aesthetic:
 * 1. Full-width responsive 12-col layout (4 cols sticky preview, 8 cols structured form)
 * 2. Real-time live profile preview card with agricultural header banner
 * 3. Structured personal & region fields with clear icons and quick-clear URL button
 * 4. Mandi & Notification Preferences card with interactive toggle controls
 * 5. Active dirty-state indicator, smooth animations, and tactile feedback
 */
export default function ProfileUpdateForm({ id, userSession }) {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    district: "",
    profilePic: "",
  });

  const [imgError, setImgError] = useState(false);

  // App & Mandi Preferences state (UI Enhancement)
  const [preferences, setPreferences] = useState({
    priceAlerts: true,
    weatherAdvisory: true,
    priceUnit: "quintal", // "quintal" | "kg"
  });

  const { data: initialData, isLoading, error } = useFetchFarmer({ id });
  const { mutate: updateFarmerById, isUpdating: isSubmitting } = useUpdateFarmer();

  // Adjust state during render without cascading useEffect renders
  const [prevData, setPrevData] = useState(null);
  if (initialData && initialData !== prevData) {
    setPrevData(initialData);
    setFormData({
      name: initialData.name || userSession?.name || "",
      state: initialData.state || "Punjab",
      district: initialData.district || "Kapurthala",
      profilePic: initialData.image || userSession?.image || "",
    });
    setImgError(false);
  }

  // Compare against initialData to determine dirty state
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
    if (name === "profilePic") {
      setImgError(false);
    }
  };

  const handleClearAvatar = () => {
    setFormData((prev) => ({ ...prev, profilePic: "" }));
    setImgError(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        state: initialData.state || "",
        district: initialData.district || "",
        profilePic: initialData.image || "",
      });
      setImgError(false);
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
      <div className="flex h-72 w-full flex-col items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm animate-pulse">
        <HiOutlineArrowPath className="h-6 w-6 animate-spin text-[#14532d]" />
        <span className="mt-3 text-sm font-semibold text-gray-600">
          Loading profile settings...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
        <h3 className="font-bold text-base text-red-800 mb-1">Failed to load profile</h3>
        <p>{error.message || "Please refresh the page or try logging in again."}</p>
      </div>
    );
  }

  // Live computed preview values
  const previewName = formData.name.trim() || initialData?.name || "Farmer";
  const previewState = formData.state.trim() || "Punjab";
  const previewDistrict = formData.district.trim() || "Kapurthala";
  const previewLocation = [previewDistrict, previewState].filter(Boolean).join(", ");
  const initialLetter = (previewName.charAt(0) || "H").toUpperCase();

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

      {/* ========================================================
          LEFT COLUMN: Live Profile Preview Card (4 cols)
         ======================================================== */}
      <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-4 animate-fade-in-up delay-75">
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200">
          {/* Top Agricultural Green Banner */}
          <div className="relative h-28 sm:h-32 w-full bg-gradient-to-r from-emerald-950 via-[#14532d] to-green-700 px-4 py-3 flex items-start justify-between overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(85,223,139,0.22),transparent_70%)] pointer-events-none" />
            <TbPlant className="absolute -bottom-4 -right-2 text-white/10 text-8xl pointer-events-none select-none" />

            {/* Live Indicator Tag */}
            <span className="relative z-10 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-md border border-white/15 text-emerald-200 text-xs font-semibold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Preview
            </span>

            {/* Kisan ID */}
            <span className="relative z-10 text-[11px] font-semibold text-emerald-200/80 bg-black/20 px-2 py-0.5 rounded-md">
              #AGRI-{(id || 1024).toString().padStart(5, "0")}
            </span>
          </div>

          {/* Overlapping Avatar & Live Identity Details */}
          <div className="relative px-6 pb-6 pt-0 text-center">
            {/* Avatar Ring */}
            <div className="relative mx-auto -mt-12 sm:-mt-14 mb-3.5 w-22 h-22 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-1 ring-4 ring-white shadow-md overflow-hidden flex items-center justify-center">
              {formData.profilePic && !imgError ? (
                <img
                  src={formData.profilePic}
                  alt={previewName}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-3xl sm:text-4xl font-black text-white tracking-wider drop-shadow-sm">
                  {initialLetter}
                </span>
              )}
              {/* Online indicator */}
              <span
                className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs"
                title="Active Farmer"
              />
            </div>

            {/* Name & Location (Real-time updates) */}
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight truncate">
              {previewName}
            </h2>
            <p className="mt-0.5 text-xs font-medium text-gray-500 flex items-center justify-center gap-1">
              <FiMapPin className="text-[#14532d]" />
              {previewLocation}
            </p>

            {/* Region Pill Badge */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#14532d] border border-emerald-200 shadow-xs">
                <HiCheckBadge className="text-emerald-600 text-sm" />
                {previewState} Mandi Hub
              </span>
            </div>

            <hr className="my-5 border-gray-100" />

            {/* Account Metadata List */}
            <div className="space-y-2.5 text-left text-xs">
              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <FiShield className="text-[#14532d]" /> Account Status
                </span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  Verified
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <TbTractor className="text-[#14532d]" /> Platform Role
                </span>
                <span className="font-semibold text-gray-900">
                  Farmer Producer
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <TbBuildingStore className="text-[#14532d]" /> Market Sync
                </span>
                <span className="font-semibold text-emerald-700">
                  {previewDistrict} APMC
                </span>
              </div>
            </div>

            {/* Helpful Helper Note */}
            <div className="mt-5 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100/90 text-left">
              <p className="text-[11px] text-emerald-900 leading-relaxed flex items-start gap-1.5">
                <FiInfo className="text-emerald-700 text-sm shrink-0 mt-0.5" />
                <span>
                  Your <strong>State</strong> and <strong>District</strong> dynamically customize real-time Mandi Prices, nearby market radius, and seasonal AI Crop Suggestions across AgriSaathi.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          RIGHT COLUMN: Structured Settings Sections (8 cols)
         ======================================================== */}
      <div className="lg:col-span-8 space-y-6">

        {/* Section 1: Personal & Region Information Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 sm:p-7 hover:shadow-md transition-all duration-200 animate-fade-in-up delay-150">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <FiUser className="text-[#14532d]" />
                  Personal & Region Information
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  Configure your legal farmer name and assigned geographic mandi coordinates.
                </p>
              </div>
              <span className="hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100">
                Core Identity
              </span>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5" htmlFor="name">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <FiUser className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 font-medium transition focus:border-[#14532d] focus:outline-none focus:ring-2 focus:ring-[#14532d]/20 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Profile Picture URL with Quick Clear */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700" htmlFor="profilePic">
                    Profile Picture URL
                  </label>
                  {formData.profilePic && (
                    <button
                      type="button"
                      onClick={handleClearAvatar}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <FiX className="text-xs" /> Clear / Reset Avatar
                    </button>
                  )}
                </div>

                <div className="relative flex items-center">
                  <FiImage className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
                  <input
                    id="profilePic"
                    type="url"
                    name="profilePic"
                    value={formData.profilePic}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 font-medium transition focus:border-[#14532d] focus:outline-none focus:ring-2 focus:ring-[#14532d]/20 placeholder:text-gray-400"
                  />
                  {formData.profilePic && (
                    <button
                      type="button"
                      onClick={handleClearAvatar}
                      className="absolute right-3 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      title="Clear URL"
                    >
                      <FiX size={15} />
                    </button>
                  )}
                </div>
                <p className="mt-1.5 text-[11px] text-gray-400">
                  Paste a direct image link (Google, Cloudinary, etc.) or leave blank to display the warm initial avatar.
                </p>
              </div>

              {/* State & District Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-1">
                {/* State */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5" htmlFor="state">
                    State
                  </label>
                  <div className="relative flex items-center">
                    <FiGlobe className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
                    <input
                      id="state"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Punjab"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 font-medium transition focus:border-[#14532d] focus:outline-none focus:ring-2 focus:ring-[#14532d]/20 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* District / Mandi Hub */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5" htmlFor="district">
                    District / Mandi Hub
                  </label>
                  <div className="relative flex items-center">
                    <FiMapPin className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />
                    <input
                      id="district"
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="e.g. Kapurthala"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-gray-900 font-medium transition focus:border-[#14532d] focus:outline-none focus:ring-2 focus:ring-[#14532d]/20 placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Mandi & Notification Preferences Card (UI Enhancement) */}
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 sm:p-7 hover:shadow-md transition-all duration-200 animate-fade-in-up delay-225">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <FiBell className="text-[#14532d]" />
                  Mandi & Notification Preferences
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  Customize market price alerts, advisory delivery, and pricing units.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-[#14532d] border border-emerald-100">
                Preferences
              </span>
            </div>

            <div className="space-y-4">
              {/* Toggle 1: Daily Mandi Price Alerts */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/70 border border-gray-100 transition-colors">
                <div className="pr-4">
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                    Morning Mandi Price Bulletins
                  </span>
                  <span className="text-xs text-gray-500 block mt-0.5">
                    Receive daily morning price updates for your local {previewDistrict} commodities.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setPreferences((p) => ({ ...p, priceAlerts: !p.priceAlerts }))
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    preferences.priceAlerts ? "bg-[#14532d]" : "bg-gray-300"
                  }`}
                  role="switch"
                  aria-checked={preferences.priceAlerts}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      preferences.priceAlerts ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: Weather & Crop Advisory */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50/70 border border-gray-100 transition-colors">
                <div className="pr-4">
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                    Weather & Agro-Climatic Advisory
                  </span>
                  <span className="text-xs text-gray-500 block mt-0.5">
                    Smart alerts for rainfall, soil readiness, and seasonal crop recommendations.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setPreferences((p) => ({ ...p, weatherAdvisory: !p.weatherAdvisory }))
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    preferences.weatherAdvisory ? "bg-[#14532d]" : "bg-gray-300"
                  }`}
                  role="switch"
                  aria-checked={preferences.weatherAdvisory}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      preferences.weatherAdvisory ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Selector: Preferred Price Unit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-gray-50/70 border border-gray-100">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block">
                    Preferred Commodity Price Unit
                  </span>
                  <span className="text-xs text-gray-500 block mt-0.5">
                    Default rate display unit across market trends and prediction tables.
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 bg-white p-1 rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setPreferences((p) => ({ ...p, priceUnit: "quintal" }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      preferences.priceUnit === "quintal"
                        ? "bg-[#14532d] text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    ₹ / Quintal (APMC)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferences((p) => ({ ...p, priceUnit: "kg" }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      preferences.priceUnit === "kg"
                        ? "bg-[#14532d] text-white shadow-xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    ₹ / Kilogram
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer Bar */}
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up delay-300">
            {/* Dirty State Indicator */}
            <div>
              {!isUnchanged ? (
                <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Unsaved changes ready to save
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl">
                  <FiCheck className="text-emerald-600" />
                  All settings up to date
                </span>
              )}
            </div>

            {/* Cancel & Save Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isUnchanged || isSubmitting}
                className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUnchanged || isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#14532d] hover:bg-[#0d3f22] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? (
                  <HiOutlineArrowPath className="h-4 w-4 animate-spin" />
                ) : (
                  <HiOutlineCheck className="h-4 w-4" />
                )}
                <span>Save Changes</span>
              </button>
            </div>
          </div>

        </form>

      </div>

    </div>
  );
}
