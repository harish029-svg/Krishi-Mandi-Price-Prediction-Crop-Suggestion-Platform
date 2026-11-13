import {
  MdOutlineMoney,
  MdOutlineStorefront,
  MdOutlineEco,
  MdOutlineDateRange,
  MdLocationOn,
} from "react-icons/md";
import { FiTrendingUp, FiClipboard, FiMapPin } from "react-icons/fi";
import StatCard from "../../components/StatsCard";
import ActionCard from "../../components/ActionCard";
import { TbPlant } from "react-icons/tb";
import { extractDashboardData } from "@/utils/extractDashboardData";
import { auth } from "../../_lib/auth";
// --- FAKE DATA ARRAYS ---
// let statsData = [
//   {
//     id: 1,
//     title: "Best Price (Today)",
//     value: "₹ 2,450",
//     unit: "/quintal",
//     subtitle: "Wheat",
//     icon: MdOutlineMoney,
//     colorText: "text-green-600",
//     colorBg: "bg-green-50",
//     colorBorder: "border-green-200",
//     iconBg: "bg-white",
//   },
//   {
//     id: 2,
//     title: "Market Nearby",
//     value: "3",
//     unit: "",
//     subtitle: "Within 20 km",
//     icon: MdOutlineStorefront,
//     colorText: "text-blue-600",
//     colorBg: "bg-blue-50",
//     colorBorder: "border-blue-200",
//     iconBg: "bg-white",
//   },
//   {
//     id: 3,
//     title: "Suggested Crop",
//     value: "Moong",
//     unit: "",
//     subtitle: "(High Profit)",
//     icon: MdOutlineEco,
//     colorText: "text-purple-600",
//     colorBg: "bg-purple-50",
//     colorBorder: "border-purple-200",
//     iconBg: "bg-white",
//   },
//   {
//     id: 4,
//     title: "Best Selling Period",
//     value: "15 Nov - 10 Dec",
//     unit: "",
//     subtitle: "(for Wheat)",
//     icon: MdOutlineDateRange,
//     colorText: "text-orange-600",
//     colorBg: "bg-orange-50",
//     colorBorder: "border-orange-200",
//     iconBg: "bg-white",
//   },
// ];

const quickActionsData = [
  {
    id: 1,
    title: "Check Mandi Prices",
    subtitle: "View current prices & trends",
    icon: TbPlant,
  },
  {
    id: 2,
    title: "Get Crop Suggestion",
    subtitle: "AI based recommendation",
    icon: FiClipboard,
  },
  {
    id: 3,
    title: "Find Nearby Markets",
    subtitle: "See markets near you",
    icon: FiMapPin,
  },
  {
    id: 4,
    title: "View Historical Trends",
    subtitle: "Compare past data",
    icon: FiTrendingUp,
  },
];

// --- MAIN DASHBOARD VIEW ---
export default async function Dashboard() {
  const session = await auth();
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
  return (
    <div className="p-8 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Good Morning, {session?.user?.name} ji
        </h1>
        <p className="text-gray-500 text-sm">
          Here's what's happening in your area today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statsData.map((stat) => (
          <StatCard key={stat.id} data={stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionsData.map((action) => (
            <ActionCard key={action.id} data={action} />
          ))}
        </div>
      </div>

      {/* Promo Banner Placeholder */}
      <div className="bg-gradient-to-r from-[#0d5c38] to-[#168a54] rounded-2xl p-8 flex justify-between items-center text-white relative overflow-hidden">
        <div className="relative z-10 max-w-md">
          <h2 className="text-xl font-bold mb-2">
            Smart Farming, Better Tomorrow.
          </h2>
          <p className="text-sm text-green-100 mb-6">
            Use data, AI and market insights to get the best value for your
            crops.
          </p>
          <button className="bg-green-100 text-[#0d5c38] px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
}
