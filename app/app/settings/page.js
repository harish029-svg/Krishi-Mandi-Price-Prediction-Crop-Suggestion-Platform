import UpdateUser from "@/app/_components/UpdateUser.mjs";
import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Settings",
  description:
    "Manage your personal details, default mandi region, and profile preferences.",
};

export default async function Page() {
  const session = await auth();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Profile Settings
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
            Manage your personal credentials, default mandi region, and platform preferences.
          </p>
        </div>
      </div>

      <UpdateUser id={session?.user?.farmerId} userSession={session?.user} />
    </main>
  );
}
