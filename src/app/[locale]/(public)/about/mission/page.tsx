import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Shield, BookOpen, Handshake, Heart, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mission" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `/${locale}/about/mission`,
      languages: {
        ru: "/ru/about/mission",
        en: "/en/about/mission",
        zh: "/zh/about/mission",
      },
    },
  };
}

const VALUES: { key: number; icon: LucideIcon }[] = [
  { key: 1, icon: Handshake },
  { key: 2, icon: Shield },
  { key: 3, icon: Heart },
  { key: 4, icon: BookOpen },
];

export default function MissionPage() {
  const t = useTranslations("mission");
  const tc = useTranslations("common");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <GlassCard className="p-8 sm:p-10">
            <blockquote className="text-center">
              <p className="font-heading text-xl font-semibold leading-relaxed sm:text-2xl">
                {t("quote")}
              </p>
              <footer className="mt-4 text-sm text-muted-foreground">
                {t("quoteAuthor")}
              </footer>
            </blockquote>
          </GlassCard>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
            {t("valuesTitle")}
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {VALUES.map(({ key, icon: Icon }) => (
              <GlassCard key={key} className="p-7 sm:p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--aurora-1)] text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold">
                  {t(`value${key}Title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`value${key}Desc`)}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--aurora-1)] via-primary to-[var(--cta)] shadow-lg">
            <Image
              src="/images/bspn-logo-mark@2x.png"
              alt="«Вялес» — символ БСПН"
              width={72}
              height={72}
              className="h-[78%] w-[78%] object-contain"
            />
          </div>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {t("symbolTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {t("symbolDesc")}
          </p>
          <Link
            href="/about/symbolika"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-6 rounded-full"
            )}
          >
            {tc("readMore")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
