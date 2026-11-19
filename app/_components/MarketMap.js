"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const escapeHtml = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

const pinSvg = (w, h, fill) => `
  <svg width="${w}" height="${h}" viewBox="0 0 24 32" style="display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="${fill}"/>
    <circle cx="12" cy="12" r="4.5" fill="#fff"/>
  </svg>`;

const labelStyle =
  "position:absolute;left:30px;top:-2px;white-space:nowrap;background:#fff;border-radius:10px;" +
  "padding:6px 10px;box-shadow:0 4px 14px rgba(0,0,0,.18);font:600 12px/1.3 system-ui,sans-serif;color:#1f2937;";

function marketIcon(name, km) {
  return L.divIcon({
    className: "",
    iconSize: [0, 0],
    html: `
      <div style="position:relative;transform:translate(-50%,-100%)">
        ${pinSvg(28, 38, "#0f5132")}
        <div style="${labelStyle}">${escapeHtml(name)}<div style="font-weight:500;color:#4b5563">${km} km</div></div>
      </div>`,
  });
}

const userIcon = L.divIcon({
  className: "",
  iconSize: [0, 0],
  html: `
    <div style="position:relative;transform:translate(-50%,-100%)">
      <div style="position:absolute;left:50%;bottom:58px;transform:translateX(-50%);background:#fff;color:#2563eb;
        font:700 12px system-ui,sans-serif;padding:3px 14px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.18)">You</div>
      ${pinSvg(38, 52, "#064e3b")}
    </div>`,
});

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    map.fitBounds(L.latLngBounds(points), { padding: [60, 60], maxZoom: 12 });
  }, [map, points]);
  return null;
}

export default function MarketMap({ markers, user }) {
  const points = useMemo(
    () => [[user.lat, user.lng], ...markers.map((m) => [m.lat, m.lng])],
    [markers, user],
  );

  return (
    <MapContainer
      center={[user.lat, user.lng]}
      zoom={10}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds points={points} />

      {markers.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={marketIcon(m.name, m.distanceKm)}
        />
      ))}

      <Marker
        position={[user.lat, user.lng]}
        icon={userIcon}
        zIndexOffset={1000}
      />
    </MapContainer>
  );
}
