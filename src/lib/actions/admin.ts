"use server";

import { createClient } from "@/lib/supabase/server";

export async function createNews(data: {
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  featured?: boolean;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("news").insert({
    ...data,
    date: new Date().toISOString().split("T")[0],
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateNews(id: string, data: Record<string, unknown>) {
  const supabase = await createClient();
  const { error } = await supabase.from("news").update(data).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteNews(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function createEvent(data: {
  title: string;
  type: string;
  date: string;
  time?: string;
  location?: string;
  is_online?: boolean;
  seats?: number;
  price?: string;
  description?: string;
  tags?: string[];
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("events").insert({
    ...data,
    seats_left: data.seats,
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateEvent(id: string, data: Record<string, unknown>) {
  const supabase = await createClient();
  const { error } = await supabase.from("events").update(data).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function createBlogPost(data: {
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  author_role?: string;
  category: string;
  read_time?: string;
  featured?: boolean;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").insert({
    ...data,
    date: new Date().toISOString().split("T")[0],
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function createDocument(data: {
  name: string;
  category: string;
  type: string;
  size?: string;
  file_url?: string;
  storage_path?: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("documents").insert({
    ...data,
    is_new: true,
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteDocument(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("documents").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateMemberStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("members").update({ status }).eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function createFaqItem(data: { question: string; answer: string; category: string }) {
  const supabase = await createClient();
  const { error } = await supabase.from("faq_items").insert(data);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteFaqItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faq_items").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
