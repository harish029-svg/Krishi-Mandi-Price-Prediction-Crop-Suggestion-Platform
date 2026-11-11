export function extractDashboardData(apiResponse) {
  // Extract the records array from the JSON response
  const records = apiResponse.records;

  // Handle edge case where data might be empty
  if (!records || records.length === 0) {
    return {
      bestPriceObject: null,
      totalDistinctMarkets: 0,
      suggestedCrop: "N/A",
    };
  }

  // 1. Extract the object with the maximum max_price
  const bestPriceObject = records.reduce((maxItem, currentItem) => {
    return currentItem.max_price > maxItem.max_price ? currentItem : maxItem;
  }, records[0]);

  // 2. Get the total number of distinct markets
  // We map over the records to get an array of market names,
  // then pass it into a Set to automatically remove duplicates.
  const uniqueMarkets = new Set(records.map((record) => record.market));
  const totalDistinctMarkets = uniqueMarkets.size;

  // 3. Suggest a crop
  // For a simple metric, we suggest the commodity that yields the highest market price
  const suggestedCrop = bestPriceObject.commodity;

  return {
    bestPriceObject,
    totalDistinctMarkets,
    suggestedCrop,
  };
}

// --- Testing the function with your provided data ---
// const myData = {
//   /* ... paste your JSON here ... */
// };
// const dashboardInsights = extractDashboardData(myData);

// console.log(dashboardInsights);
