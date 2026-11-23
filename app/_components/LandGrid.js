"use client";
import { useState } from "react";
import {
  HiOutlinePlus,
  HiOutlineMap,
  HiOutlineSparkles,
  HiOutlineChartPie,
} from "react-icons/hi2";
import { LuSprout } from "react-icons/lu";
import Modal from "./Modal";
import LandForm from "./LandForm";
import LandCard from "./LandCard";
import { useFetchLand } from "@/app/_hooks/useFetchLand";
import { useCreateLand } from "@/app/_hooks/useCreateLand";

export default function LandGrid({ farmerId, initialLands }) {
  const [addOpen, setAddOpen] = useState(false);
  const {
    data: lands = [],
    isError,
    error,
  } = useFetchLand(farmerId, initialLands);
  const createLand = useCreateLand(farmerId);

  // Quick summary metrics from existing lands
  const totalAcres = lands.reduce(
    (sum, land) => sum + (Number(land.landSize || land.area) || 0),
    0,
  );
  const uniqueSoils = new Set(lands.map((l) => l.soilType).filter(Boolean))
    .size;

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div className="flex flex-col gap-3 border-b border-gray-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            My Land Details
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your registered farm parcels, soil profiles, and seasonal
            crops.
          </p>
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-green-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-900 sm:self-auto"
        >
          <HiOutlinePlus className="h-4 w-4 stroke-2" />
          Add Land
        </button>
      </div>

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </div>
      )}

      {/* Compact Dashboard Stats Strip */}
      {lands.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-800">
              <HiOutlineMap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Total Parcels</p>
              <p className="text-lg font-bold text-gray-900">
                {lands.length} {lands.length === 1 ? "Plot" : "Plots"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <HiOutlineChartPie className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Total Area</p>
              <p className="text-lg font-bold text-gray-900">
                {totalAcres} acres
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <LuSprout className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Soil Profiles</p>
              <p className="text-lg font-bold text-gray-900">
                {uniqueSoils} {uniqueSoils === 1 ? "Type" : "Types"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Land Cards Grid */}
      {lands.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lands.map((land) => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
            <HiOutlineMap className="h-6 w-6" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-gray-900">
            No land parcels added yet
          </h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            Add your first plot to get tailored crop suggestions and mandi price
            insights.
          </p>
          <button
            onClick={() => setAddOpen(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-green-900"
          >
            <HiOutlinePlus className="h-4 w-4" />
            Add Your First Land
          </button>
        </div>
      )}

      {/* Soil Health Insights Callout */}
      <div className="flex items-start gap-4 rounded-2xl border border-green-200/70 bg-green-50/60 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-800 text-white shadow-sm">
          <HiOutlineSparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-green-950">
            Soil Health Insights
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-green-900/80">
            Your soil is suitable for a variety of crops. Maintain organic
            matter and use balanced fertilizers for better yield.
          </p>
        </div>
      </div>

      <Modal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Land"
      >
        <LandForm
          farmerId={farmerId}
          submitLabel="Add Land"
          isSubmitting={createLand.isPending}
          error={createLand.error?.message}
          onCancel={() => setAddOpen(false)}
          onSubmit={(values) =>
            createLand.mutate(
              { ...values, farmerId },
              { onSuccess: () => setAddOpen(false) },
            )
          }
        />
      </Modal>
    </div>
  );
}
