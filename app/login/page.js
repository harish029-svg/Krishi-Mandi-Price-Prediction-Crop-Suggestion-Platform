import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiFeather, FiArrowLeft } from "react-icons/fi";
import LoginForm from "@/app/_components/LoginForm";
import AgriLivingEnvironment from "@/app/_components/AgriLivingEnvironment";
import { loginAction, signInAction } from "../_lib/actions";

export const metadata = {
  title: "Login",
  description: "Log in to your AgriSaathi account to explore real-time mandi prices, AI crop recommendations, and market analysis.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden p-4 sm:p-6">
      {/* Living animated agricultural environment background */}
      <AgriLivingEnvironment
        mode="fullscreen"
        showAtmosphere={true}
        showParticles={true}
        showCrops={true}
        interactive={true}
      />

      {/* Atmospheric depth overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25 pointer-events-none z-0" />

      {/* Top Navigation Bar / Brand Link */}
      <header className="absolute top-6 left-6 sm:left-8 right-6 sm:right-8 z-20 flex items-center justify-between pointer-events-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 bg-white/75 hover:bg-white backdrop-blur-md px-3.5 py-2 rounded-xl shadow-sm hover:shadow transition-all text-gray-900 font-bold text-sm border border-white/60"
          aria-label="Back to AgriSaathi Home"
        >
          <span className="w-6 h-6 rounded-lg bg-[#126b43] text-white flex items-center justify-center text-xs shadow-sm">
            <FiFeather />
          </span>
          <span>AgriSaathi</span>
        </Link>

        <div className="hidden sm:inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-800 border border-white/50 shadow-sm">
          <span>Login / Signup</span>
        </div>
      </header>

      {/* Glassmorphism Container with Entrance Animation */}
      <div className="agri-glassmorphic-card animate-card-entrance p-7 sm:p-9 max-w-[420px] w-full mx-auto relative z-10 my-16">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#126b43]/15 text-[#126b43] text-2xl mb-3 shadow-inner">
            <FiFeather />
          </div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-gray-900 tracking-tight mb-1 drop-shadow-sm">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-700 font-medium">
            Login to your farming dashboard
          </p>
        </div>

        {/* Client Component handling email/password state and submit */}
        <LoginForm action={loginAction} />

        {/* Divider */}
        <div className="my-6 flex items-center justify-between">
          <hr className="w-full border-gray-400/35" />
          <span className="px-3 text-xs uppercase tracking-wider text-gray-700 font-bold">Or</span>
          <hr className="w-full border-gray-400/35" />
        </div>

        {/* Server-Side Form for Google Sign In */}
        <form action={signInAction}>
          <button
            type="submit"
            className="agri-btn-google"
          >
            <FcGoogle size={22} />
            <span>Sign in with Google</span>
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-7 text-center text-sm text-gray-800 font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#0d4734] font-extrabold hover:underline drop-shadow-sm underline-offset-2"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
