export async function fetchMarketData(state, commodity, location) {
  try {
    const response = await fetch(
      `https://mandi-api.onrender.com/v1/prices?state=${state}&commodity=${commodity}`,
    );
    const json = await response.json();

    if (!json.success || !Array.isArray(json.data)) {
      throw new Error("Invalid data format received");
    }

    // Group by market
    const marketGroups = {};
    json.data.forEach((item) => {
      if (!marketGroups[item.market]) {
        marketGroups[item.market] = [];
      }
      marketGroups[item.market].push(item);
    });

    const transformedData = [];
    let idCounter = 1;

    for (const [market, records] of Object.entries(marketGroups)) {
      // Sort chronologically to ensure accurate trend line
      records.sort(
        (a, b) => new Date(a.arrival_date) - new Date(b.arrival_date),
      );

      const trend = records.map((record) => ({ value: record.modal_price }));

      const currentPrice = trend[trend.length - 1].value;
      const startPrice = trend[0].value;

      let changePercent = 0;
      if (startPrice > 0 && trend.length > 1) {
        changePercent = ((currentPrice - startPrice) / startPrice) * 100;
      }

      const isPositive = changePercent >= 0;
      const changeFormatted = `${isPositive && changePercent > 0 ? "+" : ""}${changePercent.toFixed(1)}%`;

      transformedData.push({
        id: idCounter++,
        district: records[0].district, // Extracted district from the grouped records
        market: market,
        price: currentPrice.toLocaleString("en-IN"),
        change: changeFormatted,
        isPositive: isPositive,
        trend: trend,
      });

      // Stop once we have 10 distinct markets
      if (transformedData.length === 10) break;
    }

    console.log(location);

    console.log(transformedData);

    console.log(transformedData.filter((obj) => obj.district === location));
    if (location !== "*") {
      return transformedData.filter((obj) => obj.district === location);
    }

    return transformedData;
  } catch (error) {
    console.error("Error fetching or transforming market data:", error);
    return [];
  }
}
export function extractGraphData(apiData, crop, location) {
  if (!apiData || !Array.isArray(apiData)) return [];

  const cleanCrop = (crop || "").toLowerCase().trim();
  const cleanLocation = (location || "").toLowerCase().trim();
  const isAllLocations =
    cleanLocation === "*" || cleanLocation === "all" || !cleanLocation;

  // Filter with flexible string inclusion
  const filtered = apiData.filter((item) => {
    const itemCommodity = item.commodity.toLowerCase();
    const itemMarket = item.market.toLowerCase();
    const itemDistrict = item.district.toLowerCase();

    const matchesCrop =
      itemCommodity.includes(cleanCrop) || cleanCrop.includes(itemCommodity);
    const matchesLocation =
      isAllLocations ||
      itemMarket.includes(cleanLocation) ||
      itemDistrict.includes(cleanLocation);

    return matchesCrop && matchesLocation;
  });

  if (filtered.length === 0) return [];

  // Group by arrival_date to handle duplicate dates within the same filter
  const dateMap = {};
  filtered.forEach((item) => {
    const dateStr = item.arrival_date;
    if (!dateMap[dateStr]) {
      dateMap[dateStr] = { totalPrice: 0, count: 0 };
    }
    dateMap[dateStr].totalPrice += item.modal_price;
    dateMap[dateStr].count += 1;
  });

  const aggregated = Object.keys(dateMap).map((dateStr) => ({
    arrival_date: dateStr,
    modal_price: Math.round(
      dateMap[dateStr].totalPrice / dateMap[dateStr].count,
    ),
  }));

  aggregated.sort(
    (a, b) => new Date(a.arrival_date) - new Date(b.arrival_date),
  );

  return aggregated.map((item) => {
    const date = new Date(item.arrival_date);
    return {
      date: date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      price: item.modal_price,
      fullDate: item.arrival_date,
    };
  });
}
