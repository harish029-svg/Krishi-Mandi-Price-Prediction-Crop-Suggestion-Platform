import PriceChart from "./PriceChart";
import { generateMockMarketData } from "@/utils/fakeMarketData";

async function MandiChart() {
  //   const res = await fetch(
  //     "https://mandi-api.onrender.com/v1/prices?state=Punjab",
  //     { next: { revalidate: 10 } },
  //   );
  //   const data = await res.json();
  const data = await generateMockMarketData();
  // console.log("MANDI DATA*********");
  // console.log(data);
  return <PriceChart rawApiData={data.data} />;
}

export default MandiChart;
