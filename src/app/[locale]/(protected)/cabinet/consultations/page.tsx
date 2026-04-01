import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getConsultations } from "@/lib/queries/consultations";
import { getExperts } from "@/lib/queries/experts";
import { ConsultationsClient } from "./consultations-client";

export default async function ConsultationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const [consultations, experts] = await Promise.all([
    getConsultations(user.id),
    getExperts(),
  ]);

  return <ConsultationsClient initialData={consultations} experts={experts} />;
}
