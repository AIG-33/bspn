import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile, getMemberByUserId, getNotifications } from "@/lib/queries/members";
import { CabinetClient } from "./cabinet-client";

export default async function CabinetPage({
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

  const [profile, member, notifications] = await Promise.all([
    getProfile(user.id),
    getMemberByUserId(user.id),
    getNotifications(user.id),
  ]);

  return <CabinetClient profile={profile} member={member} notifications={notifications} />;
}
