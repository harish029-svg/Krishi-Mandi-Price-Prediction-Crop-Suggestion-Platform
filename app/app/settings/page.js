import UpdateUser from "@/app/_components/UpdateUser.mjs";
import { auth } from "@/app/_lib/auth";
async function Page() {
  const session = await auth();
  return <UpdateUser id={session?.user?.farmerId} />;
}

export default Page;
