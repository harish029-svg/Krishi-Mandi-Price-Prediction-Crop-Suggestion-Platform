import { auth } from "@/app/_lib/auth";
import { getFarmerByEmail } from "@/app/_services/apiFarmers";
import { fetchFarmerLand } from "@/app/_services/apiLands";
import LandGrid from "@/app/_components/LandGrid";

export const metadata = {
  title: "My Land",
  description: "Manage your registered agricultural land parcels and soil profiles.",
};

export default async function FarmerLandPage() {
  const session = await auth();
  const farmer = await getFarmerByEmail(session.user.email);
  const lands = await fetchFarmerLand(farmer?.id);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <LandGrid farmerId={farmer?.id} initialLands={lands} />
    </main>
  );
}
