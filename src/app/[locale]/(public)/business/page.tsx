import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import {
  ScrollText,
  TrendingUp,
  Users2,
  BarChart3,
  Newspaper,
  ArrowRight,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "business" });
  return {
    title: t("sectionTitle"),
    description: t("sectionDescription"),
    alternates: {
      canonical: `/${locale}/business`,
      languages: {
        ru: "/ru/business",
        en: "/en/business",
        zh: "/zh/business",
      },
    },
    openGraph: {
      title: t("sectionTitle"),
      description: t("sectionDescription"),
    },
  };
}

const SUBSECTIONS = [
  {
    href: "/business/legislation-review",
    key: "legislationReview",
    icon: ScrollText,
  },
  { href: "/business/economy", key: "economy", icon: TrendingUp },
  { href: "/business/social-labor", key: "socialLabor", icon: Users2 },
  { href: "/business/research", key: "research", icon: BarChart3 },
  { href: "/business/press", key: "press", icon: Newspaper },
];

export default function BusinessIndexPage() {
  const t = useTranslations("business");
  const tc = useTranslations("common");

  return (
    <>
      <PageHeader
        title={t("sectionTitle")}
        description={t("sectionDescription")}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUBSECTIONS.map(({ href, key, icon: Icon }) => (
            <Link key={href} href={href} className="group">
              <GlassCard hoverable className="h-full p-6 sm:p-7">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-lg font-semibold">
                  {t(`${key}.pageTitle`)}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}.intro`)}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  {tc("readMore")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
