import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "@/app/components/LoginForm";
import { signInAction } from "../_lib/actions";
export default function LoginPage() {
  // Example Next.js 14 Server Action for Google Auth
  async function signInWithGoogle() {
    "use server";
    // Add your NextAuth or Supabase auth logic here
    console.log("Initiating Google Sign-In on the server");
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/Gemini_Generated_Image_umhnn9umhnn9umhn.png')`,
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Top Header Label */}
      <div className="absolute top-6 left-8 z-10 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-lg shadow-sm">
        <span className="text-gray-800 font-semibold">Login / Signup</span>
      </div>

      {/* Glassmorphism Container (Now Server-Side) */}
      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-8 max-w-[420px] w-full mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-[28px] font-bold text-gray-900 mb-1 drop-shadow-sm">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-800 font-medium">
            Login to your account
          </p>
        </div>

        {/* The Client Component handling only the mobile/password state */}
        <LoginForm />

        {/* Divider */}
        <div className="mt-6 flex items-center justify-between">
          <hr className="w-full border-gray-400/30" />
          <span className="px-3 text-sm text-gray-700 font-medium">Or</span>
          <hr className="w-full border-gray-400/30" />
        </div>

        {/* Server-Side Form for Google Sign In */}
        <form action={signInAction} className="mt-6">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-white/50 border border-white/60 hover:bg-white/70 text-gray-800 font-bold py-2.5 rounded-lg transition-all shadow-sm"
          >
            <FcGoogle size={22} />
            Sign in with Google
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-8 text-center text-sm text-gray-800 font-medium">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#0d4734] font-extrabold hover:underline drop-shadow-sm"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
