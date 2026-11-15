import { auth } from "../_lib/auth";
import { getFarmerById } from "../_services/apiFarmers.mjs";
import PriceChart from "./PriceChart";
import { readMandiRecords } from "@/utils/extractGraphData";

async function MandiChart({ searchParams }) {
  const params = await searchParams;
  const {
    user: { farmerId },
  } = await auth();
  const { state } = await getFarmerById(farmerId);
  // console.log("SEARCH PARAMS ***", params);
  console.log(state);
  const data = await readMandiRecords(
    params?.crop?.toLowerCase() || "apple",
    state.toLowerCase().includes("pradesh")
      ? "uttar pradesh"
      : state.toLowerCase(),
  );
  return <PriceChart rawApiData={data} />;
}

export default MandiChart;
