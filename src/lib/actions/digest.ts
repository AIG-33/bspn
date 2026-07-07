"use server";

import { createClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeDigest(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!EMAIL_RE.test(normalized)) {
    return { success: false as const, error: "invalid_email" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("digest_subscribers")
    .insert({ email: normalized });

  // 23505 = unique_violation: адрес уже подписан, для посетителя это успех.
  if (error && error.code !== "23505") {
    console.error("digest subscribe failed:", error.message);
    return { success: false as const, error: error.message };
  }

  return { success: true as const };
}
