import { createClient } from "@/lib/supabase/server";
import type { AdvocacyDirection, AdvocacyInitiative } from "@/lib/supabase/types";

export async function getAdvocacyDirections(): Promise<AdvocacyDirection[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("advocacy_directions")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as AdvocacyDirection[];
}

export async function getAllAdvocacyDirections(): Promise<AdvocacyDirection[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("advocacy_directions")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as AdvocacyDirection[];
}

export async function getAdvocacyInitiatives(): Promise<AdvocacyInitiative[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("advocacy_initiatives")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as AdvocacyInitiative[];
}

export async function getAllAdvocacyInitiatives(): Promise<AdvocacyInitiative[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("advocacy_initiatives")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as AdvocacyInitiative[];
}
