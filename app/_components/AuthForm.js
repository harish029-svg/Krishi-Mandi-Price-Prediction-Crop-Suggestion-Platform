"use client";

import { useActionState } from "react";

// Use for both pages:
//   <AuthForm action={loginAction} />
//   <AuthForm action={signUpAction} withName />
export default function AuthForm({ action, withName = false }) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      {withName && (
        <input
          name="name"
          placeholder="Full name"
          required
          className="rounded border p-2"
        />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        autoComplete="email"
        className="rounded border p-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        minLength={8}
        autoComplete={withName ? "new-password" : "current-password"}
        className="rounded border p-2"
      />

      {state?.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-black p-2 text-white disabled:opacity-60"
      >
        {pending ? "Please wait..." : withName ? "Sign up" : "Log in"}
      </button>
    </form>
  );
}
