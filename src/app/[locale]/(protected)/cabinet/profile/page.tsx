import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile, getMemberByUserId } from "@/lib/queries/members";
import { ProfileClient } from "./profile-client";

export default async function ProfilePage({
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

  const [profile, member] = await Promise.all([
    getProfile(user.id),
    getMemberByUserId(user.id),
  ]);

  return (
    <ProfileClient
      profile={profile}
      member={member}
      userEmail={user.email ?? ""}
    />
  );
}
