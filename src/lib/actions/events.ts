"use server";

import { createClient } from "@/lib/supabase/server";

export async function registerForEvent(eventId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Необходимо войти в аккаунт" };

  const { error } = await supabase.from("event_registrations").insert({
    event_id: eventId,
    user_id: user.id,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, error: "Вы уже зарегистрированы на это мероприятие" };
    }
    return { success: false, error: error.message };
  }

  try {
    await supabase.rpc("decrement_seats", { event_id: eventId });
  } catch {
    // optional: seats counter may not exist
  }

  return { success: true };
}

export async function cancelEventRegistration(eventId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Необходимо войти в аккаунт" };

  const { error } = await supabase
    .from("event_registrations")
    .delete()
    .eq("event_id", eventId)
    .eq("user_id", user.id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
