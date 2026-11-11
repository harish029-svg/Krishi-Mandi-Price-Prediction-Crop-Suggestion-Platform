import { ApifyClient } from "apify-client";

// Initialize the ApifyClient with your Apify API token
// Replace the '<YOUR_API_TOKEN>' with your token
const client = new ApifyClient({
  token: "apify_api_eGbnpVJYjwynAeAwPcLZpcCAQWHfH20PuPcd",
});

// Prepare Actor input
const input = {
  resourceId: "9ef84268-d588-465a-a308-a864a43d0070",
  filters: [
    "state=Punjab",
    "commodity=Onion",
    "district=Ludhiana",
    "arrival_date=09/11/2026",
  ],
  maxResults: 10,
  apiKey: "579b464db66ec23bdd0000016f43b2564d494a0d4e4077f1caf22ba1",
};

// Run the Actor and wait for it to finish
const run = await client
  .actor("themineworks/india-data-gov-scraper")
  .call(input);

// Fetch and print Actor results from the run's dataset (if any)
console.log("Results from dataset");
console.log(
  `💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`,
);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
  console.dir(item);
});

// 📚 Want to learn more 📖? Go to → https://docs.apify.com/api/client/js/docs
