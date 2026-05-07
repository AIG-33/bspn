import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Calculator,
  Scale,
  Users2,
  ShoppingBag,
  Lock,
  Globe2,
  Mail,
} from "lucide-react";
import { pageMetadata } from "@/lib/seo";

const NS = "business.legislationReview" as const;

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
    path: "business/legislation-review",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("businessSection"),
  });
}

const BLOCKS = [
  { key: "block1", icon: Calculator },
  { key: "block2", icon: Scale },
  { key: "block3", icon: Users2 },
  { key: "block4", icon: ShoppingBag },
  { key: "block5", icon: Lock },
  { key: "block6", icon: Globe2 },
];

export default function LegislationReviewPage() {
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map(({ key, icon: Icon }) => (
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

        <section className="mt-16 mx-auto max-w-3xl">
          <GlassCard className="p-7 text-center">
            <Mail className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-heading text-xl font-semibold sm:text-2xl">
              {t("subscribe")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("subscribeBody")}
            </p>
          </GlassCard>
        </section>
      </div>
    </>
  );
}
