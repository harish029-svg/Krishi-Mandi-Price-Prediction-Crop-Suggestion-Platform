"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiTrendingUp,
  FiMap,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { TbPlant } from "react-icons/tb";
import { BiLineChart } from "react-icons/bi";
import { signOut } from "../_lib/auth";

const navItems = [
  { name: "Dashboard", href: "/app/dashboard", icon: FiHome },
  { name: "Mandi Prices", href: "/app/mandi-prices", icon: FiTrendingUp },
  { name: "Crop Suggestion", href: "/app/crop-suggestion", icon: TbPlant },
  { name: "Market Analysis", href: "/app/market-analysis", icon: BiLineChart },
  { name: "My Land", href: "/app/my-land", icon: FiMap },
  { name: "Profile", href: "/app/profile", icon: FiUser },
  { name: "Settings", href: "/app/settings", icon: FiSettings },
];

export default function Sidebar({ children }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r hidden md:block border-gray-100 flex flex-col justify-between flex-shrink-0 bg-white">
      <div>
        {/* Logo */}
        <div className="h-20 flex items-center px-6 gap-2 text-[#0d5c38]">
          <TbPlant className="text-3xl" />
          <span className="text-xl font-bold tracking-tight">AgriSaathi</span>
        </div>

        {/* Nav Links */}
        <nav className="px-4 mt-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Highlight if the current URL exactly matches the link's href
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out ${
                  isActive
                    ? "bg-[#0d5c38] text-white shadow-sm" // Added a subtle shadow for a polished look
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="text-lg" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      {/* <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut({ redirectTo: "/login" })}
          className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <FiLogOut className="text-lg" />
          Log Out
        </button>
      </div> */}
      {children}
    </aside>
  );
}
