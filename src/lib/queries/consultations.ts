import { createClient } from "@/lib/supabase/server";
import type { Consultation } from "@/lib/supabase/types";

export async function getConsultations(userId: string): Promise<Consultation[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Consultation[];
}
