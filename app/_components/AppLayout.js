import React, { cloneElement, Suspense } from "react";
import Sidebar from "./Sidebar";
import NavImage from "./NavImage";
import Logout from "./Logout";
import { auth } from "../_lib/auth";
import { Toaster } from "react-hot-toast";

export default async function AppLayout({ children, session }) {
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
            <NavImage id={session?.user?.farmerId} />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </div>
  );
}
