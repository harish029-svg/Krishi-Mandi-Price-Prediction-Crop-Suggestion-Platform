"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "./Modal";
import LandForm from "./LandForm";
import { useUpdateLand } from "@/app/_hooks/useUpdateLand";
import { useDeleteLand } from "@/app/_hooks/useDeleteLand";
import { getCurrentSeason } from "@/app/_lib/season";

function Field({ label, value, sub }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value}</p>
      {sub && <p className="text-xs text-green-700">{sub}</p>}
    </div>
  );
}

export default function LandCard({ land }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState(null); // "edit" | "delete" | null
  const menuRef = useRef(null);

  const updateLand = useUpdateLand(land.farmerId);
  const deleteLand = useDeleteLand(land.farmerId);
  const season = getCurrentSeason();

  const { data: crop } = useQuery({
    queryKey: ["seasonCrop", land.location, season.name],
    queryFn: () =>
      fetch(
        `/api/season-crop?location=${encodeURIComponent(land.location)}`,
      ).then((r) => r.json()),
    staleTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    const close = (e) =>
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      setMenuOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const closeModal = () => setMode(null);

  return (
    <div className="relative rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
      {/* three dots */}
      <div ref={menuRef} className="absolute right-3 top-3">
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Land options"
          className="rounded-full px-2 py-1 text-lg leading-none text-gray-500 hover:bg-gray-100"
        >
          ⋮
        </button>
        {menuOpen && (
          <div className="absolute right-0 z-10 mt-1 w-28 rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-gray-200">
            <button
              className="block w-full px-3 py-2 text-left hover:bg-gray-50"
              onClick={() => {
                setMode("edit");
                setMenuOpen(false);
              }}
            >
              Edit
            </button>
            <button
              className="block w-full px-3 py-2 text-left text-red-600 hover:bg-gray-50"
              onClick={() => {
                setMode("delete");
                setMenuOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4 pr-6">
        <Field label="Location" value={`${land.district}, ${land.state}`} />
        <Field label="Land Size" value={`${land.landSize} acres`} />
        <Field label="Soil Type" value={land.soilType} />
        <Field label="Irrigation" value={land.irrigation} />
        <Field label="Previous Crop" value={land.previousCrop} />
        <Field
          label="Current Season"
          value={season.label}
          sub={crop?.cropName}
        />
      </div>

      {/* edit: same Modal + LandForm, pre-filled */}
      <Modal isOpen={mode === "edit"} onClose={closeModal} title="Edit Land">
        <LandForm
          farmerId={land.farmerId}
          initialValues={land}
          submitLabel="Update"
          isSubmitting={updateLand.isPending}
          error={updateLand.error?.message}
          onCancel={closeModal}
          onSubmit={({
            location,
            landSize,
            soilType,
            irrigation,
            previousCrop,
          }) =>
            updateLand.mutate(
              {
                id: land.id,
                updates: {
                  location,
                  landSize,
                  soilType,
                  irrigation,
                  previousCrop,
                },
              },
              { onSuccess: closeModal },
            )
          }
        />
      </Modal>

      {/* delete: same Modal, used as a confirmation */}
      <Modal
        isOpen={mode === "delete"}
        onClose={closeModal}
        title="Delete land?"
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to delete the land at <b>{land.location}</b>?
          This can&apos;t be undone.
        </p>
        {deleteLand.error && (
          <p className="mt-2 text-sm text-red-600">
            {deleteLand.error.message}
          </p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={deleteLand.isPending}
            onClick={() =>
              deleteLand.mutate(land.id, { onSuccess: closeModal })
            }
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            {deleteLand.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
