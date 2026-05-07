import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { FileSearch, Lightbulb, Quote, CalendarDays } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

const NS = "business.press" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: NS });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "business/press",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("businessSection"),
  });
}

const FEATURES = [
  { key: "feature1", icon: FileSearch },
  { key: "feature2", icon: Lightbulb },
  { key: "feature3", icon: Quote },
  { key: "feature4", icon: CalendarDays },
];

export default function PressPage() {
  const t = useTranslations(NS);
  return (
    <>
      <PageHeader title={t("pageTitle")} description={t("pageDescription")} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {FEATURES.map(({ key, icon: Icon }) => (
            <GlassCard key={key} hoverable className="p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold">
                {t(`${key}Title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`${key}Body`)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
}
