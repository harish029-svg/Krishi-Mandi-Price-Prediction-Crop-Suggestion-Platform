import fs from "fs/promises";
import path from "path";

// Safely parses DD/MM/YYYY, DD-MM-YYYY, or YYYY-MM-DD
function parseMandiDate(dateStr) {
  if (!dateStr) return null;
  const clean = String(dateStr).trim();

  // Handle DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = clean.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (dmyMatch) {
    const [, day, month, year] = dmyMatch;
    return new Date(
      `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
    );
  }

  // Fallback for ISO format (YYYY-MM-DD)
  const parsed = new Date(clean);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeRecord(item) {
  const rawDate = item.Arrival_Date ?? item.arrival_date ?? "";
  const parsedDate = parseMandiDate(rawDate);

  return {
    state: item.State ?? item.state ?? "",
    district: item.District ?? item.district ?? "",
    market: item.Market ?? item.market ?? "",
    commodity: item.Commodity ?? item.commodity ?? "",
    variety: item.Variety ?? item.variety ?? "",
    arrival_date: parsedDate ? parsedDate.toISOString().split("T")[0] : rawDate,
    min_price: Number(item.Min_Price ?? item.min_price ?? 0),
    max_price: Number(item.Max_Price ?? item.max_price ?? 0),
    modal_price: Number(item.Modal_Price ?? item.modal_price ?? 0),
  };
}

export async function readMandiRecords(crop) {
  const filePath = path.join(
    process.cwd(),
    "utils",
    "data",
    `mandi-history-${crop}.json`,
  );
  try {
    // console.log(filePath);
    const resolvedPath = path.resolve(filePath);
    const rawData = await fs.readFile(resolvedPath, "utf-8");
    const records = JSON.parse(rawData);

    if (!Array.isArray(records)) return [];

    return records.map(normalizeRecord);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`Mandi data file not found at: ${filePath}`);
      return [];
    }
    throw new Error(`Failed to read mandi records: ${error.message}`);
  }
}
