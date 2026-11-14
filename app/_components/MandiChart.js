import PriceChart from "./PriceChart";
import { readMandiRecords } from "@/utils/extractGraphData";

async function MandiChart({ searchParams }) {
  const params = await searchParams;
  // console.log("SEARCH PARAMS ***", params);
  const data = await readMandiRecords(params?.crop?.toLowerCase() || "apple");
  return <PriceChart rawApiData={data} />;
}

export default MandiChart;
