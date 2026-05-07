import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Sparkles, Scroll, PenTool, BookOpen, Trophy } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "symbolika" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `/${locale}/about/symbolika`,
      languages: {
        ru: "/ru/about/symbolika",
        en: "/en/about/symbolika",
        zh: "/zh/about/symbolika",
      },
    },
    openGraph: {
      title: t("pageTitle"),
      description: t("pageDescription"),
      images: [
        {
          url: "/images/bspn-logo-512.png",
          width: 512,
          height: 512,
          alt: t("altLogo"),
        },
      ],
    },
  };
}

const SECTIONS = [
  { key: "section1", icon: Sparkles },
  { key: "section2", icon: Scroll },
  { key: "section3", icon: PenTool },
  { key: "section4", icon: BookOpen },
  { key: "section5", icon: Trophy },
];

export default function SymbolikaPage() {
  const t = useTranslations("symbolika");

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("intro")}
        variant="aurora"
        align="center"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-3xl bg-gradient-to-br from-[var(--aurora-1)] via-primary to-[var(--cta)] shadow-2xl glow-primary">
              <Image
                src="/images/bspn-logo-mark@2x.png"
                alt={t("altLogo")}
                width={120}
                height={120}
                priority
                className="h-[78%] w-[78%] object-contain"
              />
            </div>
            <p className="font-heading text-xl italic text-muted-foreground sm:text-2xl">
              {t("tagline")}
            </p>
          </div>

          <div className="mt-14 space-y-12">
            {SECTIONS.map(({ key, icon: Icon }) => (
              <section key={key}>
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                      {t(`${key}Title`)}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {t(`${key}Body`)}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <GlassCard className="mt-16 p-8 sm:p-10">
            <p className="text-center font-heading text-lg italic text-muted-foreground sm:text-xl">
              {t("tagline")}
            </p>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
