import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Trophy, Medal } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "awards" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `/${locale}/awards`,
      languages: {
        ru: "/ru/awards",
        en: "/en/awards",
        zh: "/zh/awards",
      },
    },
    openGraph: { title: t("pageTitle"), description: t("pageDescription") },
  };
}

const AWARDS = [
  { key: "veles", icon: Trophy, criteriaKey: "velesCriteria" },
  { key: "taler", icon: Medal, criteriaKey: "talerCriteria" },
];

const RULES = ["rule1", "rule2", "rule3", "rule4"];

export default function AwardsPage() {
  const t = useTranslations("awards");

  return (
    <>
      <PageHeader title={t("pageTitle")} description={t("pageDescription")} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {AWARDS.map(({ key, icon: Icon, criteriaKey }) => (
            <GlassCard key={key} className="p-7">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[var(--cta)] text-white shadow-lg glow-gold">
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="font-heading text-2xl font-bold">{t(key)}</h2>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {t(`${key}Year`)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t(`${key}Desc`)}
              </p>
              <p className="mt-4 rounded-xl bg-foreground/[0.04] p-4 text-xs leading-relaxed text-muted-foreground">
                {t(criteriaKey)}
              </p>
            </GlassCard>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("rulesTitle")}
          </h2>
          <ol className="mx-auto mt-8 max-w-2xl space-y-3">
            {RULES.map((k, i) => (
              <li
                key={k}
                className="flex items-start gap-4 rounded-2xl border border-foreground/5 bg-foreground/[0.02] p-4"
              >
                <span className="font-mono text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed">{t(k)}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
