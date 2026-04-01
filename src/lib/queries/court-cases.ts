import { createClient } from "@/lib/supabase/server";
import type { CourtCase } from "@/lib/supabase/types";

export async function getCourtCases(
  search?: string,
  category?: string,
  status?: string
): Promise<CourtCase[]> {
  const supabase = await createClient();

  let query = supabase
    .from("court_cases")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as CourtCase[];
}
