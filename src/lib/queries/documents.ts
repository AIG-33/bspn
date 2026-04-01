import { createClient } from "@/lib/supabase/server";
import type { Document } from "@/lib/supabase/types";

export async function getDocuments(search?: string, category?: string): Promise<Document[]> {
  const supabase = await createClient();

  let query = supabase
    .from("documents")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Document[];
}

export async function getAllDocuments(): Promise<Document[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Document[];
}
