import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/supabase/types";

export async function getBlogPosts(search?: string, category?: string): Promise<BlogPost[]> {
  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
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
  return (data ?? []) as BlogPost[];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}
