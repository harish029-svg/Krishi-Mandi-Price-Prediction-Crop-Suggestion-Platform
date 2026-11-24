"use client";
import { useEffect, useRef, useState } from "react";
import { useFetchDistricts } from "@/app/_hooks/useFetchDistricts"; // adjust import path as needed

const EMPTY = {
  district: "",
  state: "",
  landSize: "",
  soilType: "Loamy",
  irrigation: "Tube Well",
  previousCrop: "",
};
const SOILS = ["Loamy", "Sandy", "Clay", "Silt", "Black", "Red"];
const IRRIGATION = ["Tube Well", "Canal", "Rainfed", "Drip", "Sprinkler"];

const input =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-700 focus:outline-none";

function DistrictDropdown({ districts = [], value, onChange, loading, error }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (loading) {
    return (
      <div
        aria-label="Loading districts"
        className="h-11 w-full animate-pulse rounded-xl border border-gray-200 bg-white px-4 shadow-md flex items-center"
      >
        <div className="h-3.5 w-36 rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden native input to preserve HTML `required` validation */}
      <input
        type="text"
        name="district"
        value={value}
        onChange={() => {}}
        required
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-2.5 text-left text-sm transition-colors focus:outline-none ${
          open
            ? "border-emerald-900 ring-1 ring-emerald-900"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Select district"}
        </span>
        <svg
          className="h-4 w-4 shrink-0 text-gray-500"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          {open ? (
            <path
              d="M5 12.5L10 7.5L15 12.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M5 7.5L10 12.5L15 7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg"
        >
          {districts.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-400">
              No districts available
            </li>
          ) : (
            districts.map((district) => {
              const name =
                typeof district === "string" ? district : district.name;
              const isSelected = value === name;

              return (
                <li
                  key={name}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-3 text-sm transition-colors ${
                    isSelected
                      ? "bg-emerald-50/80 text-gray-900 font-medium"
                      : "text-gray-700 hover:bg-emerald-50/50"
                  }`}
                >
                  {name}
                </li>
              );
            })
          )}
        </ul>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// Re-usable for add (no initialValues) and edit (pass initialValues)
export default function LandForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Save",
  error,
  farmerId,
}) {
  const {
    districts,
    stateName,
    loading: loadingDistricts,
    error: districtsError,
  } = useFetchDistricts({ farmerId });

  const [values, setValues] = useState(() => ({
    ...EMPTY,
    ...initialValues,
    state: initialValues?.state || stateName || "",
  }));

  const [prevPropState, setPrevPropState] = useState(stateName);
  if (stateName && stateName !== prevPropState) {
    setPrevPropState(stateName);
    if (!values.state) {
      setValues((v) => ({ ...v, state: stateName }));
    }
  }

  const set = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...values,
      state: stateName || values.state,
      landSize: Number(values.landSize),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="hidden"
        name="state"
        value={values.state || stateName || ""}
      />

      <div className="block text-sm">
        <span className="mb-1 block text-gray-600">District</span>
        <DistrictDropdown
          districts={districts}
          value={values.district}
          onChange={(district) => setValues((v) => ({ ...v, district }))}
          loading={loadingDistricts}
          error={districtsError}
        />
      </div>

      <label className="block text-sm">
        <span className="mb-1 block text-gray-600">Land size (acres)</span>
        <input
          name="landSize"
          type="number"
          min="0"
          step="0.1"
          required
          value={values.landSize}
          onChange={set}
          className={input}
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Soil type</span>
          <select
            name="soilType"
            value={values.soilType}
            onChange={set}
            className={input}
          >
            {SOILS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Irrigation</span>
          <select
            name="irrigation"
            value={values.irrigation}
            onChange={set}
            className={input}
          >
            {IRRIGATION.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block text-gray-600">Previous crop</span>
        <input
          name="previousCrop"
          required
          value={values.previousCrop}
          onChange={set}
          placeholder="Wheat"
          className={input}
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-green-800 px-4 py-2 text-sm text-white disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
