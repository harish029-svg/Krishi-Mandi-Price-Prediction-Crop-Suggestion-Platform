import MarketList from "@/app/_components/MarketList";
import MarketMapLoader from "@/app/_components/MarketMapLoader";
import { extractMarketData, fetchMandiRecords } from "@/utils/market";
import { auth } from "../_lib/auth";
import { getFarmerById } from "../_services/apiFarmers.mjs";

// Usage: /market-analysis?state=Punjab&district=Amritsar
export default async function MarketAnalysisPage({ farmerId, searchParams }) {
  // Next.js 15+/16: searchParams is a Promise
  const params = await searchParams;

  //   const state = params?.state || "Punjab";
  const district = params?.location || "Ludhiana";
  const crop = params?.crop || "Apple";

  const { state } = await getFarmerById(farmerId);

  let data = extractMarketData([]);
  let error = null;

  try {
    const records = await fetchMandiRecords({ crop, state, district });
    data = extractMarketData(records);
  } catch {
    error = "Couldn't load market data. Please try again.";
  }

  console.log("MAP MARKERS : ", data);

  return (
    <main className="h-[400px] bg-[#f4f7f5]">
      <div className="h-full mx-auto max-w-6xl rounded-2xl bg-white shadow-sm">
        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="h-full grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="h-[400px] overflow-hidden rounded-2xl border border-gray-100">
            <MarketMapLoader markers={data.mapMarkers} user={data.user} />
          </div>

          <MarketList items={data.listItems} />
        </div>
      </div>
    </main>
  );
}
