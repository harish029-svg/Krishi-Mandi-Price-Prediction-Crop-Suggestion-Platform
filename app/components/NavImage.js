import { auth } from "../_lib/auth";
import { MdLocationOn } from "react-icons/md";

async function NavImage() {
  const session = await auth();

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
        <MdLocationOn className="text-gray-500 text-lg" />
        <span className="text-sm font-medium text-gray-700">
          Ludhiana, Punjab
        </span>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200 flex items-center justify-center">
        <img
          src={
            session?.user?.image
              ? session?.user?.image
              : "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh"
          }
          alt={session?.user?.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
}

export default NavImage;
