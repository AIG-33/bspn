import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { GraduationCap, Building2, Lightbulb, Award } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "kunyavsky" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `/${locale}/about/kunyavsky`,
      languages: {
        ru: "/ru/about/kunyavsky",
        en: "/en/about/kunyavsky",
        zh: "/zh/about/kunyavsky",
      },
    },
    openGraph: {
      title: t("pageTitle"),
      description: t("pageDescription"),
    },
  };
}

const SECTIONS = [
  { key: "section1", icon: GraduationCap },
  { key: "section2", icon: Building2 },
  { key: "section3", icon: Lightbulb },
  { key: "section4", icon: Award },
];

const FACTS = ["fact1", "fact2", "fact3", "fact4"];

export default function KunyavskyPage() {
  const t = useTranslations("kunyavsky");

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("intro")}
        variant="aurora"
        align="center"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-white/80 ring-1 ring-white/20">
          {t("lifespan")}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((k) => (
              <GlassCard key={k} className="p-4 text-center">
                <p className="text-sm font-medium leading-snug">{t(k)}</p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 space-y-10">
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
        </div>
      </div>
    </>
  );
}
