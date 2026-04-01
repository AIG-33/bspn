"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadDocument(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("file") as File;
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const docType = formData.get("type") as string;

  if (!file || !name) {
    return { success: false, error: "Файл и название обязательны" };
  }

  const ext = file.name.split(".").pop();
  const storagePath = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(storagePath, file);

  if (uploadError) {
    return { success: false, error: uploadError.message };
  }

  const fileSizeKB = Math.round(file.size / 1024);
  const size = fileSizeKB > 1024
    ? `${(fileSizeKB / 1024).toFixed(1)} МБ`
    : `${fileSizeKB} КБ`;

  const { error: dbError } = await supabase.from("documents").insert({
    name,
    category: category || "other",
    type: docType || ext || "pdf",
    size,
    storage_path: storagePath,
    is_new: true,
  });

  if (dbError) {
    return { success: false, error: dbError.message };
  }

  return { success: true };
}

export async function getDocumentDownloadUrl(storagePath: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("documents")
    .createSignedUrl(storagePath, 3600);

  if (error) {
    return { success: false, error: error.message, url: null };
  }

  return { success: true, url: data.signedUrl };
}

export async function deleteDocumentFile(storagePath: string) {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from("documents")
    .remove([storagePath]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
