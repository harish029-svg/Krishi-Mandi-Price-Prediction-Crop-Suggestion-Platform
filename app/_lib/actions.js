"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import supabase from "./../_services/supabase.mjs";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/app/dashboard",
  });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function refreshDashboard() {
  revalidatePath("/app/dashboard");
}

const REDIRECT_TO = "/app";

export async function signUpAction(prevState, formData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password)
    return { error: "All fields are required." };
  if (password.length < 8)
    return { error: "Password must be at least 8 characters." };

  const { data: existing } = await supabase
    .from("Farmers")
    .select("id, password_hash")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    // Don't let a password signup take over an existing Google account
    return {
      error: existing.password_hash
        ? "An account with this email already exists. Please log in."
        : "This email is registered with Google. Please continue with Google.",
    };
  }

  const password_hash = await bcrypt.hash(password, 12);
  const { error } = await supabase
    .from("Farmers")
    .insert({ name, email, password_hash });

  if (error) return { error: "Could not create your account. Try again." };

  // Sign the new user in. This throws a redirect, so don't wrap it in try/catch.
  // await signIn("credentials", { email, password, redirectTo: REDIRECT_TO });
  try {
    await signIn("credentials", { email, password, redirectTo: REDIRECT_TO });
  } catch (err) {
    if (err instanceof AuthError) {
      return {
        error: "Account created, but automatic login failed. Please log in.",
      };
    }
    throw err; // lets the success redirect through
  }
}

export async function loginAction(prevState, formData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", { email, password, redirectTo: REDIRECT_TO });
  } catch (err) {
    if (err instanceof AuthError) {
      console.log("INSIDE LOGIN ACTION ERROR", err);
      return { error: "Invalid email or password." };
    }
    throw err; // the success redirect is thrown as an error, so rethrow it
  }
}
