export default function MarketList({ items }) {
  return (
    <aside className="h-[400px] flex flex-col">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Markets Near You</h2>

      {items.length === 0 ? (
        <p className="rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-500">
          No markets found. Try a different state or district.
        </p>
      ) : (
        <ul className="max-h-[480px] space-y-3 overflow-y-auto pr-1">
          {items.map((m) => (
            <li
              key={m.id}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg width="14" height="18" viewBox="0 0 24 32" aria-hidden>
                    <path
                      d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z"
                      fill="#0f5132"
                    />
                    <circle cx="12" cy="12" r="4.5" fill="#fff" />
                  </svg>
                  <span className="font-semibold text-gray-900">{m.name}</span>
                </div>
                <span className="text-gray-400" aria-hidden>
                  ›
                </span>
              </div>

              <p className="mt-2 text-sm text-emerald-600">
                {m.distanceKm} km · ₹{m.modalPrice.toLocaleString("en-IN")}
                <span className="text-xs">/quintal</span>
              </p>
              <p className="text-xs text-gray-500">
                {m.commodity}
                {m.commodityCount > 1 &&
                  ` +${m.commodityCount - 1} more`} · {m.district}
              </p>
              <p className="mt-1 text-xs text-gray-600">Open: {m.openHours}</p>

              {/* Fake for now: wire this to /market-analysis/[id] later */}
              <button
                type="button"
                className="mt-3 rounded-lg bg-gradient-to-b from-emerald-700 to-emerald-900 px-5 py-2 text-sm font-semibold text-white shadow hover:from-emerald-600 hover:to-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
