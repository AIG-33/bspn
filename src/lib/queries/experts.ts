import { createClient } from "@/lib/supabase/server";
import type { Expert } from "@/lib/supabase/types";

export async function getExperts(search?: string, specialization?: string): Promise<Expert[]> {
  const supabase = await createClient();

  let query = supabase.from("experts").select("*").order("rating", { ascending: false });

  if (specialization && specialization !== "all") {
    query = query.contains("specializations", [specialization]);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,bio.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Expert[];
}

export async function getExpertById(id: string): Promise<Expert | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("experts").select("*").eq("id", id).single();
  if (error) return null;
  return data as Expert;
}
