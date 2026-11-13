import React, { Suspense } from "react";
import Sidebar from "./Sidebar";
import NavImage from "./NavImage";
import Logout from "./Logout";

export default async function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar Client Component */}
      <Sidebar>
        <Logout />
      </Sidebar>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fafcfa]">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-end px-8 flex-shrink-0">
          <div className="flex items-center gap-6">
            <Suspense fallback={<p>Loading...</p>}>
              <NavImage />
            </Suspense>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
