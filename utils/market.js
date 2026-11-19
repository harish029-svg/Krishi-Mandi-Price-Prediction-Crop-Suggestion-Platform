// lib/mandi.js
// Fetching + extracting data for the Market Analysis page.

const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";

/* ---------- Dummy data (not available in the API) ---------- */

// Replace with the real user location (browser geolocation) later.
export const DUMMY_USER_LOCATION = { lat: 31.634, lng: 74.872 }; // Amritsar

// Approximate coordinates. The API has no lat/lng, so replace this with
// geocoding or your own markets table later.
const DUMMY_COORDS = {
  "attari apmc": [31.604, 74.607],
  "rayya apmc": [31.553, 75.283],
  "majitha apmc": [31.76, 74.958],
};

const DUMMY_OPEN_HOURS = "8:00 AM – 5:00 PM";

/* ---------- Fetch ---------- */

export async function fetchMandiRecords({ state, district }) {
  const url = new URL(
    `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000016f43b2564d494a0d4e4077f1caf22ba1&format=json&filters%5Bstate.keyword%5D=${state}&filters%5Bdistrict%5D=${district}`,
  );
  //   url.searchParams.set("api-key", process.env.DATA_GOV_API_KEY ?? "");
  //   url.searchParams.set("format", "json");
  //   url.searchParams.set("limit", "500");
  //   url.searchParams.set("filters[state.keyword]", state);
  //   if (district) {
  //     url.searchParams.set("filters[district]", district);
  //   }

  const res = await fetch(url, { next: { revalidate: 60 * 60 } });
  if (!res.ok) throw new Error(`Mandi API failed with status ${res.status}`);

  const json = await res.json();
  return json.records ?? [];
}

/* ---------- Helpers ---------- */

function haversineKm(a, b) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Stable pseudo-random offset so unknown markets still get a fixed spot.
function fallbackCoords(name, origin) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  const a = ((h & 0xff) / 255 - 0.5) * 0.6;
  const b = (((h >> 8) & 0xff) / 255 - 0.5) * 0.6;
  return { lat: origin.lat + a, lng: origin.lng + b };
}

/* ---------- Extraction ---------- */

/**
 * Turns raw API records into exactly what the two components need:
 *  - mapMarkers -> the Leaflet map
 *  - listItems  -> the side list
 * Records are grouped by market, so each market appears once.
 */
export function extractMarketData(records, user = DUMMY_USER_LOCATION) {
  const byMarket = new Map();
  for (const r of records) {
    const list = byMarket.get(r.market) ?? [];
    list.push(r);
    byMarket.set(r.market, list);
  }

  const mapMarkers = [];
  const listItems = [];

  for (const [name, rows] of byMarket) {
    const known = DUMMY_COORDS[name.toLowerCase()];
    const coords = known
      ? { lat: known[0], lng: known[1] }
      : fallbackCoords(name, user);

    const distanceKm = Math.round(haversineKm(user, coords) * 10) / 10;
    const first = rows[0];
    const id = `${first.district}-${name}`.toLowerCase().replace(/\s+/g, "-");

    mapMarkers.push({ id, name, lat: coords.lat, lng: coords.lng, distanceKm });
    listItems.push({
      id,
      name,
      district: first.district,
      distanceKm, // dummy (derived from dummy coordinates)
      commodity: first.commodity, // first commodity listed for this market
      modalPrice: Number(first.modal_price) || 0, // Rs / quintal
      commodityCount: rows.length,
      openHours: DUMMY_OPEN_HOURS, // dummy
    });
  }

  mapMarkers.sort((a, b) => a.distanceKm - b.distanceKm);
  listItems.sort((a, b) => a.distanceKm - b.distanceKm);

  return { mapMarkers, listItems, user };
}
