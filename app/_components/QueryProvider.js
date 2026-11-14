"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState, useTransition } from "react";

// 1. Create a context for the transition
const TransitionContext = createContext(null);

export function useGlobalTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useGlobalTransition must be used within a QueryProvider");
  }
  return context;
}

function QueryProvider({ children }) {
  // 2. Initialize QueryClient safely using useState so it doesn't recreate on re-renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
          },
        },
      }),
  );

  const [isPending, startTransition] = useTransition();

  return (
    <QueryClientProvider client={queryClient}>
      <TransitionContext.Provider value={{ isPending, startTransition }}>
        {children}

        {/* Global Full-Screen Loading Overlay */}
        {isPending && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex flex-col items-center justify-center">
            <div className="bg-white px-6 py-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-100">
              <div className="animate-spin rounded-full h-7 w-7 border-3 border-emerald-600 border-t-transparent"></div>
              <div>
                <p className="text-gray-900 font-semibold text-sm">
                  Updating & Refreshing...
                </p>
                <p className="text-gray-500 text-xs">Please wait a moment.</p>
              </div>
            </div>
          </div>
        )}
      </TransitionContext.Provider>
    </QueryClientProvider>
  );
}

export default QueryProvider;
