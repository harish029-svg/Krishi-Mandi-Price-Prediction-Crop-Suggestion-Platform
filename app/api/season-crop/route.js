import { NextResponse } from "next/server";
import { getCurrentSeason } from "@/app/_lib/season";

// Used only if the API gives nothing back
const FALLBACK = { Rabi: "Wheat", Kharif: "Rice", Zaid: "Moong" };

export async function GET(request) {
  const location = request.nextUrl.searchParams.get("location") || "";
  const state = location.split(",").pop().trim(); // "Ludhiana, Punjab" -> "Punjab"
  const season = getCurrentSeason().name;

  try {
    const resource = process.env.DATA_GOV_CROP_RESOURCE_ID; // season-wise crop production dataset
    const key = process.env.DATA_GOV_API_KEY;
    if (resource && key && state) {
      const url =
        `https://api.data.gov.in/resource/${resource}?api-key=${key}&format=json&limit=200` +
        `&filters[state_name]=${encodeURIComponent(state)}` +
        `&filters[season]=${encodeURIComponent(season)}`;
      const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
      const json = await res.json();
      // pick the crop with the largest area in that state + season
      // (field names depend on the dataset -- check yours)
      const top = (json.records || []).sort(
        (a, b) => Number(b.area_ || 0) - Number(a.area_ || 0)
      )[0];
      if (top?.crop) return NextResponse.json({ cropName: top.crop.trim() });
    }
  } catch (e) {
    // fall through to the fallback
  }
  return NextResponse.json({ cropName: FALLBACK[season] });
}
