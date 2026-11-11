export function getFormattedPrice(amount) {
  const formattedRupees = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2, // optional: control decimal places
  }).format(amount);
  return formattedRupees;
}
