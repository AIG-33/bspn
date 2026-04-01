"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitApplication(formData: {
  companyName: string;
  companyUnp: string;
  companyAddress: string;
  companyActivity: string;
  companyEmployees: string;
  companyYear: string;
  contactName: string;
  contactPosition: string;
  contactEmail: string;
  contactPhone: string;
  membershipType: string;
  goals: string[];
  additionalInfo: string;
  documentsConsent: boolean;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("member_applications").insert({
    company_name: formData.companyName,
    company_unp: formData.companyUnp,
    company_address: formData.companyAddress,
    company_activity: formData.companyActivity,
    company_employees: formData.companyEmployees,
    company_year: formData.companyYear,
    contact_name: formData.contactName,
    contact_position: formData.contactPosition,
    contact_email: formData.contactEmail,
    contact_phone: formData.contactPhone,
    membership_type: formData.membershipType,
    goals: formData.goals,
    additional_info: formData.additionalInfo,
    documents_consent: formData.documentsConsent,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function approveApplication(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("member_applications")
    .update({ status: "approved", reviewed_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function rejectApplication(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("member_applications")
    .update({ status: "rejected", reviewed_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
