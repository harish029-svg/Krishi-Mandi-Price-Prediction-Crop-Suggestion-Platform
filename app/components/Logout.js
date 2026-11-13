import { FiLogOut } from "react-icons/fi";
import { signOutAction } from "../_lib/actions";

function Logout() {
  return (
    <div className="p-4 border-t border-gray-100">
      <form action={signOutAction}>
        <button className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          <FiLogOut className="text-lg" />
          Log Out
        </button>
      </form>
    </div>
  );
}

export default Logout;
