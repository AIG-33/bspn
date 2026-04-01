import { createClient } from "@/lib/supabase/server";
import type { Member, MemberApplication, Profile, Notification, Invoice } from "@/lib/supabase/types";

export async function getMemberByUserId(userId: string): Promise<Member | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) return null;
  return data as Member;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data as Profile;
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return (data ?? []) as Notification[];
}

export async function getInvoices(memberId: string): Promise<Invoice[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("member_id", memberId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Invoice[];
}

export async function getAllMembers(): Promise<Member[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("members").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Member[];
}

export async function getMemberApplications(): Promise<MemberApplication[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("member_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as MemberApplication[];
}
