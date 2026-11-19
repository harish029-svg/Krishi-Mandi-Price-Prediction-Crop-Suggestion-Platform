"use client";

import { useActionState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginForm({ action }) {
  const [state, formAction, pending] = useActionState(action, null);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log("Login attempt:", { mobileNumber, password });
  // };
  console.log(state);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          className="block text-sm font-bold text-gray-800 mb-1.5 drop-shadow-sm"
          htmlFor="mobile"
        >
          Email
        </label>
        <input
          id="mobile"
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2.5 bg-white/50 border border-white/60 rounded-lg focus:ring-2 focus:ring-[#0d4734] focus:bg-white/70 focus:border-transparent outline-none transition-all placeholder:text-gray-600 text-gray-900 font-medium"
          name="email"
          required
        />
      </div>

      <div>
        <label
          className="block text-sm font-bold text-gray-800 mb-1.5 drop-shadow-sm"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2.5 bg-white/50 border border-white/60 rounded-lg focus:ring-2 focus:ring-[#0d4734] focus:bg-white/70 focus:border-transparent outline-none transition-all placeholder:text-gray-600 text-gray-900 font-medium"
            name="password"
            required
          />
          {/* <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button> */}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#0d4734]/90 hover:bg-[#0d4734] backdrop-blur-sm text-white font-semibold py-3 rounded-lg transition-colors mt-4 shadow-md"
      >
        Login
      </button>
    </form>
  );
}
