import { createClient } from "@/lib/supabase/server";
import type { FaqItem } from "@/lib/supabase/types";

export async function getFaqItems(search?: string, category?: string): Promise<FaqItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("faq_items")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.or(`question.ilike.%${search}%,answer.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as FaqItem[];
}
