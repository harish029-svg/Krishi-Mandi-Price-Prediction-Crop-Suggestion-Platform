import supabase from "./supabase"; // same client you use in apiFarmers.mjs

const TABLE = "FarmerLand";

export async function fetchFarmerLand(farmerId) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("farmerId", farmerId)
    .order("id", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function createFarmerLand(land) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert([land])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateFarmerLand(id, updates) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteFarmerLand(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
  return id;
}
