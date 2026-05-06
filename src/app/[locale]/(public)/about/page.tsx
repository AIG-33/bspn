import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import {
  Target,
  Clock,
  Users,
  Trophy,
  Building2,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SECTIONS: { key: number; href: string; icon: LucideIcon }[] = [
  { key: 1, href: "/about/mission", icon: Target },
  { key: 2, href: "/about/history", icon: Clock },
  { key: 3, href: "/about/leadership", icon: Users },
  { key: 4, href: "/about/achievements", icon: Trophy },
  { key: 5, href: "/about/associations", icon: Building2 },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const tc = useTranslations("common");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
        align="center"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map(({ key, href, icon: Icon }) => (
            <Link key={href} href={href} className="group">
              <GlassCard hoverable className="h-full p-6 sm:p-7">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-lg font-semibold">
                  {t(`section${key}Title`)}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`section${key}Desc`)}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  {tc("readMore")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12 relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
          />
          <h2 className="relative font-heading text-2xl font-bold sm:text-3xl">
            {t("factsTitle")}
          </h2>
          <div className="relative mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "1990", label: t("factFounded") },
              { value: "94+", label: t("factMembers") },
              { value: "20+", label: t("factCouncils") },
              { value: "7", label: t("factAssociations") },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-mono text-4xl font-bold sm:text-5xl">
                  {value}
                </div>
                <p className="mt-1 text-sm text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
