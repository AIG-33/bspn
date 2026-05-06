import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedCounter } from "@/components/sections/animated-counter";
import {
  Scale,
  FileText,
  Users,
  Globe,
  Award,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STATS: { key: number; value: number; suffix: string; icon: LucideIcon }[] = [
  { key: 1, value: 150, suffix: "+", icon: FileText },
  { key: 2, value: 500, suffix: "+", icon: Scale },
  { key: 3, value: 94, suffix: "", icon: Users },
  { key: 4, value: 15, suffix: "+", icon: Globe },
  { key: 5, value: 20, suffix: "+", icon: Award },
  { key: 6, value: 35, suffix: "+", icon: TrendingUp },
];

export default function AchievementsPage() {
  const t = useTranslations("achievements");
  const ACHS = [1, 2, 3, 4, 5] as const;

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map(({ key, value, suffix, icon: Icon }) => (
            <GlassCard key={key} className="text-center p-7 sm:p-8">
              <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--aurora-1)] text-white shadow-lg">
                <Icon className="h-6 w-6" />
              </div>
              <div className="font-mono text-3xl font-bold sm:text-4xl">
                <AnimatedCounter value={value} />
                <span className="text-gradient">{suffix}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`stat${key}`)}
              </p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("title")}
          </h2>
          <div className="mt-8 space-y-4">
            {ACHS.map((n) => (
              <GlassCard key={n} className="p-6 sm:flex sm:items-start sm:gap-6 sm:p-8">
                <span className="mb-2 block shrink-0 font-mono text-sm font-bold text-primary sm:mb-0 sm:pt-0.5">
                  {t(`ach${n}Year`)}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    {t(`ach${n}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`ach${n}Desc`)}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
