import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { MessageSquare, Sparkles, BarChart3, Mail } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `/${locale}/media`,
      languages: {
        ru: "/ru/media",
        en: "/en/media",
        zh: "/zh/media",
      },
    },
    openGraph: { title: t("pageTitle"), description: t("pageDescription") },
  };
}

const GROUPS = [
  { key: "groupInterview", icon: MessageSquare },
  { key: "groupExpert", icon: Sparkles },
  { key: "groupAnalytics", icon: BarChart3 },
];

export default function MediaPage() {
  const t = useTranslations("media");

  return (
    <>
      <PageHeader title={t("pageTitle")} description={t("pageDescription")} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map(({ key, icon: Icon }) => (
            <GlassCard key={key} hoverable className="p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-semibold">
                {t(`${key}Title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`${key}Desc`)}
              </p>
            </GlassCard>
          ))}
        </div>

        <section className="mt-16 mx-auto max-w-3xl">
          <GlassCard className="p-7 text-center">
            <Mail className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-heading text-xl font-semibold sm:text-2xl">
              {t("subscribe")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("subscribeDesc")}
            </p>
          </GlassCard>
        </section>
      </div>
    </>
  );
}
