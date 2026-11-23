import UpdateUser from "@/app/_components/UpdateUser.mjs";
import { auth } from "@/app/_lib/auth";

export default async function Page() {
  const session = await auth();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 border-b border-gray-200/80 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal details, default mandi region, and profile photo.
        </p>
      </div>

      <UpdateUser id={session?.user?.farmerId} />
    </main>
  );
}
