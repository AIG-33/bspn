import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { GlassCard } from "@/components/ui/glass-card";
import { SITE } from "@/lib/constants";
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  CalendarDays,
  MessageSquare,
  Send,
  ArrowRight,
} from "lucide-react";

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

  const t = await getTranslations("cabinet");

  const stats = [
    { icon: MessageSquare, label: t("menuConsultations"), value: "3/5" },
    { icon: FileText, label: t("menuDocuments"), value: "12" },
    { icon: CalendarDays, label: t("menuEvents"), value: "2" },
    { icon: TrendingUp, label: t("menuBilling"), value: "~8 500" },
  ];

  const greeting = (user.user_metadata as { name?: string } | null)?.name ?? user.email ?? "";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
          <LayoutDashboard className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("welcome")}
            {greeting && (
              <span className="ml-1 text-gradient">, {greeting}</span>
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <GlassCard key={label} className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
                <p className="font-mono text-xl font-bold">{value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <a
        href={SITE.socialLinks.telegramGroup}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform hover:-translate-y-0.5"
      >
        <GlassCard hoverable className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#229ED9] text-white shadow-lg">
              <Send className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-base font-semibold sm:text-lg">
                {t("telegramGroupTitle")}
              </h2>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                {t("telegramGroupDesc")}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" />
          </div>
        </GlassCard>
      </a>

      <GlassCard className="p-6">
        <p className="text-sm text-muted-foreground">{t("comingSoon")}</p>
      </GlassCard>
    </div>
  );
}
