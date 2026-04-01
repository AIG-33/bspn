import { createClient } from "@/lib/supabase/server";
import type { EventItem } from "@/lib/supabase/types";

export async function getEvents(filter?: string, type?: string): Promise<EventItem[]> {
  const supabase = await createClient();

  let query = supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: true });

  if (type && type !== "all") {
    query = query.eq("type", type);
  }

  const { data, error } = await query;
  if (error) throw error;

  let items = (data ?? []) as EventItem[];

  if (filter === "upcoming") {
    items = items.filter((e) => new Date(e.date) >= new Date());
  } else if (filter === "free") {
    items = items.filter((e) => e.price?.toLowerCase().includes("бесплатно"));
  } else if (filter === "online") {
    items = items.filter((e) => e.is_online);
  }

  return items;
}

export async function getEventById(id: string): Promise<EventItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
  if (error) return null;
  return data as EventItem;
}

export async function getAllEvents(): Promise<EventItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as EventItem[];
}
