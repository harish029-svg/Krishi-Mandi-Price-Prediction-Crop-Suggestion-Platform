import {
  MdOutlineMoney,
  MdOutlineStorefront,
  MdOutlineEco,
  MdOutlineDateRange,
  MdLocationOn,
} from "react-icons/md";

import StatCard from "./StatsCard";
import { extractDashboardData } from "@/utils/extractDashboardData";
import { getFormattedPrice } from "@/utils/priceFormat";
const waitTwoSeconds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Resolved after 2 seconds!");
    }, 2000);
  });
};
async function Stats() {
  let statsData = [
    {
      id: 1,
      title: "Best Price (Today)",
      value: "₹ 2,450",
      unit: "/quintal",
      subtitle: "Wheat",
      icon: MdOutlineMoney,
      colorText: "text-green-600",
      colorBg: "bg-green-50",
      colorBorder: "border-green-200",
      iconBg: "bg-white",
    },
    {
      id: 2,
      title: "Market Nearby",
      value: "3",
      unit: "",
      subtitle: "Within 20 km",
      icon: MdOutlineStorefront,
      colorText: "text-blue-600",
      colorBg: "bg-blue-50",
      colorBorder: "border-blue-200",
      iconBg: "bg-white",
    },
    {
      id: 3,
      title: "Suggested Crop",
      value: "Moong",
      unit: "",
      subtitle: "(High Profit)",
      icon: MdOutlineEco,
      colorText: "text-purple-600",
      colorBg: "bg-purple-50",
      colorBorder: "border-purple-200",
      iconBg: "bg-white",
    },
    {
      id: 4,
      title: "Best Selling Period",
      value: "15 Nov - 10 Dec",
      unit: "",
      subtitle: "(for Wheat)",
      icon: MdOutlineDateRange,
      colorText: "text-orange-600",
      colorBg: "bg-orange-50",
      colorBorder: "border-orange-200",
      iconBg: "bg-white",
    },
  ];
  const res = await fetch(
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000016f43b2564d494a0d4e4077f1caf22ba1&format=json&filters%5Bstate.keyword%5D=Punjab&filters%5Bdistrict%5D=Ludhiana",
    { next: { revalidate: 60 } },
  );
  await waitTwoSeconds();
  const data = await res.json();
  const { bestPriceObject, suggestedCrop, totalDistinctMarkets } =
    extractDashboardData(data);
  statsData[0]["subtitle"] = bestPriceObject["commodity"];
  statsData[0]["value"] = `${getFormattedPrice(bestPriceObject["max_price"])}`;
  statsData[1]["value"] = totalDistinctMarkets;
  statsData[2]["value"] = suggestedCrop;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {statsData.map((stat) => (
        <StatCard key={stat.id} data={stat} />
      ))}
    </div>
  );
}

export default Stats;
