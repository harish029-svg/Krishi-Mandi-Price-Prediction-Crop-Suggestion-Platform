import supabase from "./supabase.mjs";

export async function getFarmers() {}

export async function getFarmerByEmail(email) {
  let { data, error } = await supabase
    .from("Farmers")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to fetch farmer", error);
  }
  return data;
}

export async function createFarmer(newFarmer) {
  const { data, error } = await supabase
    .from("Farmers")
    .insert([newFarmer])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Failed to create farmer", error);
  }
  return data;
}

export async function updateFarmerById(id, val) {
  const { data, error } = await supabase
    .from("Farmers")
    .update(val)
    .eq("id", id)
    .select();
  if (error) {
    throw new Error("Failed to update farmer");
  }
  return data;
}

export async function getFarmerById(id) {
  let { data, error } = await supabase
    .from("Farmers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to fetch farmer", error);
  }
  return data;
}
