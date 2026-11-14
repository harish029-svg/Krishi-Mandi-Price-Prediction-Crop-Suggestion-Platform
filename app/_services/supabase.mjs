import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://luelyjtffmqkskxatjef.supabase.co";
const supabaseKey = "sb_publishable_QMMgP0KsIsq7vP1phH6wpA_lSQjGlUk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
