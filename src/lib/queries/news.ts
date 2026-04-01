import { createClient } from "@/lib/supabase/server";
import type { NewsItem } from "@/lib/supabase/types";

export async function getNews(search?: string, category?: string): Promise<NewsItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as NewsItem[];
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("news").select("*").eq("id", id).single();
  if (error) return null;
  return data as NewsItem;
}

export async function getAllNews(): Promise<NewsItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("news").select("*").order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as NewsItem[];
}
