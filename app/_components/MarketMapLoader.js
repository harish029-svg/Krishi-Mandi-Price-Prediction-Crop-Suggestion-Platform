"use client";

import dynamic from "next/dynamic";

// Leaflet touches `window` on import, so it must never render on the server.
// `ssr: false` is only allowed inside a Client Component, hence this wrapper.
const MarketMapLoader = dynamic(() => import("./MarketMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse" />,
});

export default MarketMapLoader;
