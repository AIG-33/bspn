"use server";

import { createClient } from "@/lib/supabase/server";

export async function bookConsultation(data: {
  expertId: string;
  expertName: string;
  expertTitle: string;
  topic: string;
  date: string;
  time: string;
  type: "online" | "phone" | "office";
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Необходимо войти в аккаунт" };

  const { error } = await supabase.from("consultations").insert({
    user_id: user.id,
    expert_id: data.expertId,
    expert_name: data.expertName,
    expert_title: data.expertTitle,
    topic: data.topic,
    date: data.date,
    time: data.time,
    type: data.type,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function cancelConsultation(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("consultations")
    .update({ status: "cancelled" })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
