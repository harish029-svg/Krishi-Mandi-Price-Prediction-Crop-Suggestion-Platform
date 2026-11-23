import FarmerProfile from "@/app/_components/FarmerProfile";
import { auth } from "@/app/_lib/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 border-b border-gray-200/80 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View your registered account details and default mandi location.
        </p>
      </div>

      <FarmerProfile farmerId={session?.user?.farmerId} />
    </main>
  );
}
