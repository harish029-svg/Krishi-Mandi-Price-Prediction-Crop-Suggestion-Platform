/**
 * Generates synthetic multi-day market data matching the data.gov.in API schema.
 */
export function generateMockMarketData(days = 30) {
  const commodities = [
    { name: "Onion", basePrice: 3800, volatility: 80 },
    { name: "Tomato", basePrice: 2400, volatility: 120 },
    { name: "Potato", basePrice: 1100, volatility: 40 },
    { name: "Apple", basePrice: 7500, volatility: 250 },
    { name: "Cauliflower", basePrice: 2800, volatility: 90 },
  ];

  const markets = [
    { district: "Patiala", market: "Patiala APMC" },
    { district: "Ludhiana", market: "Ludhiana APMC" },
    { district: "Jalandhar", market: "Jalandhar City APMC" },
    { district: "Mohali", market: "Banur APMC" },
    { district: "Sangrur", market: "Bhawanigarh APMC" },
  ];

  const dummyData = [];
  let idCounter = 100000;

  const endDate = new Date("2026-10-16");

  // Track daily price drift for each crop/market pair to create smooth trend lines
  const currentPrices = {};
  commodities.forEach((c) => {
    markets.forEach((m) => {
      currentPrices[`${c.name}_${m.market}`] = c.basePrice;
    });
  });

  for (let i = days - 1; i >= 0; i--) {
    const dateObj = new Date(endDate);
    dateObj.setDate(endDate.getDate() - i);
    const dateStr = dateObj.toISOString().split("T")[0];

    commodities.forEach((crop) => {
      markets.forEach((loc) => {
        const key = `${crop.name}_${loc.market}`;

        // Random walk for price movement (+/- volatility)
        const change = (Math.random() - 0.48) * crop.volatility;
        currentPrices[key] = Math.max(
          500,
          Math.round(currentPrices[key] + change),
        );

        const modalPrice = currentPrices[key];
        const minPrice = Math.round(modalPrice * 0.95);
        const maxPrice = Math.round(modalPrice * 1.05);

        dummyData.push({
          id: idCounter++,
          state: "Punjab",
          district: loc.district,
          market: loc.market,
          commodity: crop.name,
          variety: crop.name,
          grade: "Grade A",
          arrival_date: dateStr,
          min_price: minPrice,
          max_price: maxPrice,
          modal_price: modalPrice,
          fetched_at: `${dateStr}T18:30:00.000+00:00`,
        });
      });
    });
  }

  return {
    success: true,
    data: dummyData,
    meta: {
      count: dummyData.length,
      state: "Punjab",
      commodity: "ALL",
      market: "ALL",
      date: "HISTORICAL_RANGE",
    },
  };
}

// Pre-generated static dataset ready to import
// export const DUMMY_API_DATA = generateMockMarketData(30);
