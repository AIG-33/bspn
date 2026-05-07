import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Building2, Landmark, CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "councils" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "councils",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("about"),
  });
}

const VALUES = ["value1", "value2", "value3", "value4"];

export default function CouncilsPage() {
  const t = useTranslations("councils");

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
          <GlassCard className="p-6">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-xl font-semibold">
              {t("groupOwnTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("groupOwnDesc")}
            </p>
            <div className="mt-5 rounded-2xl bg-foreground/[0.04] p-5">
              <h3 className="font-heading text-base font-semibold">
                {t("ownEconTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("ownEconBody")}
              </p>
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--aurora-1)] to-primary text-white shadow-lg">
              <Landmark className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-xl font-semibold">
              {t("groupGovTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("groupGovDesc")}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {t("govList")}
            </p>
          </GlassCard>
        </div>

        <section className="mt-16">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("valueTitle")}
          </h2>
          <ul className="mx-auto mt-8 max-w-3xl space-y-3">
            {VALUES.map((k) => (
              <li
                key={k}
                className="flex items-start gap-3 rounded-2xl border border-foreground/5 bg-foreground/[0.02] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span className="text-sm leading-relaxed">{t(k)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
