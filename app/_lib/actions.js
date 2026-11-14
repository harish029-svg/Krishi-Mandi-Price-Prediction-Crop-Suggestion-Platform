"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";

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
