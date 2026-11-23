// Indian cropping seasons (matches the "Rabi (Nov - Mar)" label in the design)
export function getCurrentSeason(date = new Date()) {
  const m = date.getMonth() + 1;
  if (m >= 6 && m <= 10) return { name: "Kharif", label: "Kharif (Jun - Oct)" };
  if (m >= 11 || m <= 3) return { name: "Rabi", label: "Rabi (Nov - Mar)" };
  return { name: "Zaid", label: "Zaid (Apr - May)" };
}
