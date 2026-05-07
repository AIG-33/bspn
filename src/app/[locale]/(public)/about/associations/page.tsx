import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import {
  ArrowUpToLine,
  Stethoscope,
  Package,
  Plane,
  Trees,
  HardHat,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

const ASSOCIATIONS: { key: string; icon: LucideIcon; members: number }[] = [
  { key: "lift", icon: ArrowUpToLine, members: 22 },
  { key: "dental", icon: Stethoscope, members: 18 },
  { key: "nonfood", icon: Package, members: 24 },
  { key: "tourism", icon: Plane, members: 16 },
  { key: "wood", icon: Trees, members: 14 },
  { key: "construction", icon: HardHat, members: 28 },
  { key: "smesupport", icon: Wrench, members: 12 },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "associations" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "about/associations",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("about"),
  });
}

export default function AssociationsPage() {
  const t = useTranslations("associations");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ASSOCIATIONS.map(({ key, icon: Icon, members }) => (
            <GlassCard key={key} hoverable className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-semibold leading-snug">
                {t(key)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(`${key}Desc`)}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-sm">
                <span className="font-mono font-bold text-primary">
                  {members}
                </span>
                <span className="text-muted-foreground">
                  {t("membersLabel")}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
}
