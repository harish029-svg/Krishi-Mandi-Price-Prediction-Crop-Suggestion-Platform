// api key =>  579b464db66ec23bdd0000016f43b2564d494a0d4e4077f1caf22ba1

import fs from "fs/promises";
import path from "path";

// Utility to delay execution
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch helper with automatic retries on 429 rate limit errors
async function fetchWithRetry(url, maxRetries = 5, initialDelay = 2000) {
  let delay = initialDelay;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const res = await fetch(url.toString());

    if (res.status === 429) {
      console.warn(
        `[429 Rate Limit] Retrying attempt ${attempt}/${maxRetries} in ${delay / 1000}s...`,
      );
      await sleep(delay);
      delay *= 2; // Exponential backoff (2s, 4s, 8s...)
      continue;
    }

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    return res;
  }

  throw new Error(`API request failed: Exceeded maximum rate-limit retries.`);
}

// 35985678-0d79-46b4-9ed6-6f13308a1d24

// free api key 579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b
export async function fetchAndSaveHistoricalMandiData({
  apiKey = "579b464db66ec23bdd0000016f43b2564d494a0d4e4077f1caf22ba1",
  resourceId = "35985678-0d79-46b4-9ed6-6f13308a1d24",
  crop = "Apple",
  state = "Punjab",
  district = "all",
  monthsBack = 1,
  outputPath = path.join(process.cwd(), "data", "mandi-history-apple.json"),
}) {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - monthsBack);

  let allRecords = [];
  let offset = 0;
  const limit = 1000;
  let hasMore = true;

  const cleanCrop = (crop || "").trim();
  const cleanState = (state || "").trim();
  const cleanDistrict = (district || "").trim();

  const isAllStates =
    !cleanState || cleanState.toLowerCase() === "all" || cleanState === "*";
  const isAllDistricts =
    !cleanDistrict ||
    cleanDistrict.toLowerCase() === "all" ||
    cleanDistrict === "*";

  while (hasMore) {
    const url = new URL(`https://api.data.gov.in/resource/${resourceId}`);
    url.searchParams.append("api-key", apiKey);
    url.searchParams.append("format", "json");
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("offset", offset.toString());

    // API-level filters
    if (cleanCrop && cleanCrop.toLowerCase() !== "all" && cleanCrop !== "*") {
      url.searchParams.append("filters[commodity]", cleanCrop);
    }
    if (!isAllStates) {
      url.searchParams.append("filters[state]", cleanState);
    }
    if (!isAllDistricts) {
      url.searchParams.append("filters[district]", cleanDistrict);
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    const records = data.records || [];

    // console.log(records);

    if (records.length === 0) break;

    // Filter in-memory for the 12-month date cutoff
    const validRecords = records.filter((item) => {
      if (!item.Arrival_Date) return false;
      const [day, month, year] = item.Arrival_Date.split("/");
      const itemDate = new Date(`${year}-${month}-${day}`);
      return !isNaN(itemDate.getTime()) && itemDate >= cutoffDate;
    });

    console.log(validRecords);

    allRecords.push(...validRecords);

    if (records.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
      await sleep(8000);
    }
  }

  // Save to JSON file
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(allRecords, null, 2), "utf-8");

  return allRecords;
}

await fetchAndSaveHistoricalMandiData({});

// 9ef84268-d588-465a-a308-a864a43d0070

// export async function fetchAndSaveHistoricalMandiData({
//   apiKey = "579b464db66ec23bdd0000016f43b2564d494a0d4e4077f1caf22ba1",
//   resourceId = "9ef84268-d588-465a-a308-a864a43d0070",
//   crop = "Onion",
//   location = "Ludhiana",
//   monthsBack = 12,
//   outputPath = path.join(process.cwd(), "data", "mandi-history.json"),
// }) {
//   const cutoffDate = new Date();
//   cutoffDate.setMonth(cutoffDate.getMonth() - monthsBack);

//   let allRecords = [];
//   let offset = 0;
//   const limit = 1000;
//   let hasMore = true;

//   while (hasMore) {
//     const url = new URL(`https://api.data.gov.in/resource/${resourceId}`);
//     url.searchParams.append("api-key", apiKey);
//     url.searchParams.append("format", "json");
//     url.searchParams.append("limit", limit.toString());
//     url.searchParams.append("offset", offset.toString());

//     if (crop) url.searchParams.append("filters[commodity]", crop);
//     if (location && location !== "*" && location !== "all") {
//       url.searchParams.append("filters[state]", location);
//     }

//     const res = await fetch(url.toString());
//     if (!res.ok) {
//       throw new Error(`API request failed with status ${res.status}`);
//     }

//     const data = await res.json();
//     const records = data.records || [];

//     if (records.length === 0) break;

//     const validRecords = records.filter((item) => {
//       if (!item.arrival_date) return false;
//       const [day, month, year] = item.arrival_date.split("/");
//       const itemDate = new Date(`${year}-${month}-${day}`);
//       return !isNaN(itemDate) && itemDate >= cutoffDate;
//     });

//     allRecords.push(...validRecords);

//     if (records.length < limit) {
//       hasMore = false;
//     } else {
//       offset += limit;
//     }
//   }

//   // Ensure the directory exists and write the JSON file
//   await fs.mkdir(path.dirname(outputPath), { recursive: true });
//   await fs.writeFile(outputPath, JSON.stringify(allRecords, null, 2), "utf-8");

//   return allRecords;
// }
