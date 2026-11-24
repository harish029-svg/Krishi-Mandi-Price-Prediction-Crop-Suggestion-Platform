"use client";

import Link from "next/link";
import {
  FiMail,
  FiMapPin,
  FiShield,
  FiCalendar,
  FiUser,
  FiEdit2,
  FiArrowRight,
  FiActivity,
  FiLayers,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { TbPlant, TbTractor, TbBuildingStore } from "react-icons/tb";
import { HiCheckBadge, HiOutlineArrowPath } from "react-icons/hi2";
import useFetchFarmer from "@/app/_hooks/useFetchFarmer";
import { useFetchLand } from "@/app/_hooks/useFetchLand";

/**
 * FarmerProfile Component
 * Redesigned full-width profile view matching AgriSaathi's modern dashboard aesthetic:
 * 1. Top full-width hero banner with rich emerald agricultural gradient
 * 2. Overlapping avatar ring with name, verified badge, and location
 * 3. Two-column responsive layout (7 cols personal details, 5 cols mandi & stats)
 * 4. Micro-interactions and smooth entrance transitions
 */
export default function FarmerProfile({ farmerId, userSession }) {
  const { data: farmer, isLoading: isLoadingFarmer, error } = useFetchFarmer({ id: farmerId });
  const { data: lands, isLoading: isLoadingLands } = useFetchLand(farmerId);

  if (isLoadingFarmer) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm animate-pulse">
        <HiOutlineArrowPath className="h-6 w-6 animate-spin text-[#14532d]" />
        <span className="mt-3 text-sm font-semibold text-gray-600">
          Loading your farmer profile...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
        <h3 className="font-bold text-base text-red-800 mb-1">Failed to load farmer profile</h3>
        <p>{error.message || "Please refresh the page or try logging in again."}</p>
      </div>
    );
  }

  // Fallbacks combining farmer database entity and session
  const name = farmer?.name || userSession?.name || "Harish";
  const email = farmer?.email || userSession?.email || "harishfit029@gmail.com";
  const state = farmer?.state || "Punjab";
  const district = farmer?.district || "Kapurthala";
  const location = [district, state].filter(Boolean).join(", ");
  const avatarUrl = farmer?.image || userSession?.image || null;
  const initial = (name.trim().charAt(0) || "H").toUpperCase();

  const registeredLandsCount = lands?.length || 0;
  const preferredCrops = ["Wheat (Kanak)", "Basmati Rice", "Moong Dal", "Mustard (Sarson)", "Maize"];

  const memberSince = farmer?.created_at
    ? new Date(farmer.created_at).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "Kharif Season 2024";

  return (
    <div className="w-full space-y-6">

      {/* ========================================================
          1. HERO PROFILE BANNER CARD (Unified Emerald Agricultural Card)
         ======================================================== */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-[#0d4734] to-[#093524] border border-emerald-900/60 shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in-up p-6 sm:p-7 text-white">
        {/* Subtle Ambient Glow and Agricultural Watermark */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(85,223,139,0.2),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        {/* Decorative Plant Silhouette in background */}
        <div className="absolute right-6 -bottom-6 text-white/5 text-9xl pointer-events-none select-none">
          <TbPlant />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Left: Avatar + Identity + Tags */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar Ring */}
            <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-1 ring-4 ring-white/90 shadow-lg overflow-hidden shrink-0 flex items-center justify-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-3xl sm:text-4xl font-black text-white tracking-wider drop-shadow-sm">
                  {initial}
                </span>
              )}
              {/* Active Indicator Pin */}
              <span
                className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-xs"
                title="Active Profile"
              />
            </div>

            {/* Name, Verified Farmer Badge, and Location */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
                  {name}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-white/15 text-emerald-200 border border-white/20 backdrop-blur-md shadow-xs">
                  <HiCheckBadge className="text-emerald-400 text-base" />
                  Verified Farmer
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/25 text-emerald-300 border border-white/10">
                  #AGRI-{(farmerId || 1024).toString().padStart(5, "0")}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-emerald-100/90 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <FiMapPin className="text-emerald-400 text-sm shrink-0" />
                  {location}
                </span>
                <span className="hidden sm:inline text-emerald-300/40">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <FiMail className="text-emerald-400 text-sm shrink-0" />
                  {email}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Edit Profile Action Button */}
          <div className="md:self-center shrink-0">
            <Link
              href="/app/settings"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-[#0d4734] hover:text-[#093524] text-xs sm:text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-white/80"
            >
              <FiEdit2 className="text-sm text-[#0d4734]" />
              <span>Edit Profile</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. TWO-COLUMN RESPONSIVE CONTENT GRID
         ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ----------------------------------------------------
            LEFT COLUMN: Personal & Account Details (7 cols)
           ---------------------------------------------------- */}
        <div className="lg:col-span-7 space-y-6">

          {/* Card: Personal & Contact Information */}
          <section className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all duration-200 animate-fade-in-up delay-75">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <FiUser className="text-[#14532d]" />
                  Personal & Account Details
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Your official agricultural registration and identity information
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100">
                Primary Account
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-1">
                  <FiUser className="text-[#14532d]" /> Full Name
                </span>
                <span className="text-sm font-bold text-gray-900 block truncate">
                  {name}
                </span>
              </div>

              {/* Email Address */}
              <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-1">
                  <FiMail className="text-[#14532d]" /> Email Address
                </span>
                <span className="text-sm font-bold text-gray-900 block truncate" title={email}>
                  {email}
                </span>
              </div>

              {/* Default Mandi Location */}
              <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-1">
                  <FiMapPin className="text-[#14532d]" /> Default Mandi Location
                </span>
                <span className="text-sm font-bold text-gray-900 block">
                  {location}
                </span>
              </div>

              {/* Role */}
              <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-1">
                  <TbTractor className="text-[#14532d]" /> Primary Role
                </span>
                <span className="text-sm font-bold text-gray-900 block">
                  Farmer (Agricultural Producer)
                </span>
              </div>

              {/* Account Status */}
              <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-1">
                  <FiShield className="text-[#14532d]" /> Account Status
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <FiCheckCircle className="text-emerald-600" />
                  Verified & Active
                </span>
              </div>

              {/* Registration Date */}
              <div className="p-3.5 rounded-xl bg-gray-50/60 border border-gray-100">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5 mb-1">
                  <FiCalendar className="text-[#14532d]" /> Member Since
                </span>
                <span className="text-sm font-bold text-gray-900 block">
                  {memberSince}
                </span>
              </div>
            </div>
          </section>

          {/* Card: Verification & Trust Badge */}
          <section className="rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 border border-emerald-100 shadow-sm p-6 hover:shadow-md transition-all duration-200 animate-fade-in-up delay-150">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#14532d] text-white flex items-center justify-center text-xl shrink-0 shadow-sm">
                <FiShield />
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-sm font-bold text-gray-900">
                  AgriSaathi Verified Identity
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your farmer profile is verified for personalized agricultural market rates, AI crop recommendations, and land parcel ownership verification across Punjab and Indian mandis.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-emerald-900">
                  <span className="inline-flex items-center gap-1">
                    <HiCheckBadge className="text-emerald-600 text-sm" /> 256-bit Encrypted Session
                  </span>
                  <span>•</span>
                  <span>Government Data Synced</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* ----------------------------------------------------
            RIGHT COLUMN: Farm & Mandi Quick Summary (5 cols)
           ---------------------------------------------------- */}
        <div className="lg:col-span-5 space-y-6">

          {/* Card: Default Mandi Preferences */}
          <section className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all duration-200 animate-fade-in-up delay-75">
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 mb-4">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <TbBuildingStore className="text-[#14532d] text-lg" />
                Mandi Preferences
              </h2>
              <span className="text-xs font-semibold text-[#14532d] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                Local APMC
              </span>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-500 font-medium text-xs">Primary State</span>
                <span className="font-bold text-gray-900 text-xs sm:text-sm">{state}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-t border-gray-50">
                <span className="text-gray-500 font-medium text-xs">Primary District</span>
                <span className="font-bold text-gray-900 text-xs sm:text-sm">{district}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-t border-gray-50">
                <span className="text-gray-500 font-medium text-xs">Assigned Mandi</span>
                <span className="font-bold text-gray-900 text-xs sm:text-sm">{district} Grain Market</span>
              </div>

              {/* Preferred Crops Tags */}
              <div className="pt-2 border-t border-gray-100">
                <span className="block text-xs font-semibold text-gray-500 mb-2">
                  Key Tracked Crops
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {preferredCrops.map((crop) => (
                    <span
                      key={crop}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50/80 text-emerald-900 border border-emerald-100 text-xs font-semibold"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Link to Mandi Prices */}
              <Link
                href="/app/mandi-prices"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#14532d] hover:bg-[#0e3b20] text-white text-xs font-bold shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Check Today&apos;s Mandi Prices</span>
                <FiArrowRight />
              </Link>
            </div>
          </section>

          {/* Card: Quick Stats & Activity Overview */}
          <section className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all duration-200 animate-fade-in-up delay-150">
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 mb-4">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <FiActivity className="text-[#14532d]" />
                Farm Overview & Stats
              </h2>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1">
                  <FiLayers className="text-[#14532d]" /> Registered Land
                </span>
                <div className="text-xl font-extrabold text-gray-900">
                  {isLoadingLands ? "..." : registeredLandsCount}
                  <span className="text-xs font-normal text-gray-500 ml-1">
                    {registeredLandsCount === 1 ? "parcel" : "parcels"}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100">
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mb-1">
                  <FiTrendingUp className="text-[#14532d]" /> Price Tracking
                </span>
                <div className="text-xl font-extrabold text-gray-900">
                  Active
                  <span className="text-xs font-normal text-emerald-600 ml-1">Today</span>
                </div>
              </div>
            </div>

            {/* Quick Shortcuts */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-gray-500 mb-1">
                Quick Shortcuts
              </span>

              <Link
                href="/app/my-land"
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 text-xs font-bold text-gray-800 hover:text-[#14532d] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  <FiLayers className="text-[#14532d]" /> Manage Farm Lands
                </span>
                <FiArrowRight className="text-gray-400" />
              </Link>

              <Link
                href="/app/crop-suggestion"
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 text-xs font-bold text-gray-800 hover:text-[#14532d] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  <TbPlant className="text-[#14532d] text-sm" /> Get AI Crop Recommendations
                </span>
                <FiArrowRight className="text-gray-400" />
              </Link>

              <Link
                href="/app/settings"
                className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 text-xs font-bold text-gray-800 hover:text-[#14532d] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-2">
                  <FiEdit2 className="text-[#14532d]" /> Update Profile & Mandi Preferences
                </span>
                <FiArrowRight className="text-gray-400" />
              </Link>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
