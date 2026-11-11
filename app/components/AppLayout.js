import React from "react";
import Sidebar from "./Sidebar";
import { MdLocationOn } from "react-icons/md";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar Client Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fafcfa]">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-end px-8 flex-shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
              <MdLocationOn className="text-gray-500 text-lg" />
              <span className="text-sm font-medium text-gray-700">
                Ludhiana, Punjab
              </span>
            </div>

            {/* Fake Profile Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200 flex items-center justify-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
