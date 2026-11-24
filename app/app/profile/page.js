import FarmerProfile from "@/app/_components/FarmerProfile";
import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Farmer Profile",
  description: "View your farmer profile and account details.",
};

export default async function ProfilePage() {
  const session = await auth();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Farmer Profile
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
            Manage your personal credentials, registered agricultural lands, and default mandi preferences.
          </p>
        </div>
      </div>

      <FarmerProfile
        farmerId={session?.user?.farmerId}
        userSession={session?.user}
      />
    </main>
  );
}
