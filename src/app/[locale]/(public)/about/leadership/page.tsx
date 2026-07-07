import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Users2 } from "lucide-react";

export default function LeadershipPage() {
  const t = useTranslations("leadership");
  const tSite = useTranslations("site");

  const leaders = [1, 2] as const;

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          {t("coChairs")}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {leaders.map((n) => (
            <GlassCard key={n} className="overflow-hidden p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-[var(--aurora-1)] text-white text-xl font-heading">
                    {t(`leader${n}Name`).split(" ").map((s) => s[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    {t(`leader${n}Name`)}
                  </h3>
                  <p className="text-sm font-medium text-primary">
                    {t(`leader${n}Role`)}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t(`leader${n}Desc`)}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {tSite("email")}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  {tSite("phone")}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        <h2 className="mt-20 font-heading text-3xl font-bold sm:text-4xl">
          {t("boardTitle")}
        </h2>
        <GlassCard className="mt-8 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users2 className="h-5 w-5" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("boardDesc")}
            </p>
          </div>
        </GlassCard>

        <GlassCard className="mt-20 p-8 sm:p-10">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("structureTitle")}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n}>
                <h3 className="font-heading text-lg font-semibold">
                  {t(`structure${n}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`structure${n}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
