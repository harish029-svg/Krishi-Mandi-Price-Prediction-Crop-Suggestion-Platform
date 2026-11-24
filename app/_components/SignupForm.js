"use client";

import { useActionState, useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";

export default function SignupForm({ action }) {
  const [state, formAction, pending] = useActionState(action, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-900 text-xs font-semibold backdrop-blur-sm"
        >
          {state.error}
        </div>
      )}

      <div>
        <label
          className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5"
          htmlFor="signup-name"
        >
          Full Name
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <FiUser size={16} />
          </span>
          <input
            id="signup-name"
            name="name"
            placeholder="Farmer or Business Name"
            required
            autoComplete="name"
            className="agri-input-field pl-10"
          />
        </div>
      </div>

      <div>
        <label
          className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5"
          htmlFor="signup-email"
        >
          Email Address
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <FiMail size={16} />
          </span>
          <input
            id="signup-email"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            autoComplete="email"
            className="agri-input-field pl-10"
          />
        </div>
      </div>

      <div>
        <label
          className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5"
          htmlFor="signup-password"
        >
          Password (min 8 characters)
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <FiLock size={16} />
          </span>
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            required
            minLength={8}
            autoComplete="new-password"
            className="agri-input-field pl-10 pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none p-1 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="agri-btn-submit mt-5"
      >
        {pending ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}
