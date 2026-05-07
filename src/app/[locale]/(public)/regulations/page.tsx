import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { FileText, Vote, Crown, Eye, Scale, Download } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regulations" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: {
      canonical: `/${locale}/regulations`,
      languages: {
        ru: "/ru/regulations",
        en: "/en/regulations",
        zh: "/zh/regulations",
      },
    },
    openGraph: { title: t("pageTitle"), description: t("pageDescription") },
  };
}

const BLOCKS = [
  { key: "block1", icon: FileText },
  { key: "block2", icon: Crown },
  { key: "block3", icon: Vote },
  { key: "block4", icon: Eye },
  { key: "block5", icon: Scale },
];

const DOWNLOADS = ["download1", "download2", "download3", "download4", "download5"];

export default function RegulationsPage() {
  const t = useTranslations("regulations");

  return (
    <>
      <PageHeader title={t("pageTitle")} description={t("pageDescription")} />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-8">
          {BLOCKS.map(({ key, icon: Icon }) => (
            <section key={key}>
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-heading text-xl font-semibold sm:text-2xl">
                    {t(`${key}Title`)}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {t(`${key}Body`)}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-heading text-xl font-semibold sm:text-2xl">
            {t("downloadsTitle")}
          </h2>
          <ul className="mt-6 space-y-2.5">
            {DOWNLOADS.map((k) => (
              <li
                key={k}
                className="flex items-center justify-between gap-3 rounded-xl border border-foreground/5 bg-foreground/[0.02] px-4 py-3"
              >
                <span className="text-sm font-medium">{t(k)}</span>
                <Download className="h-4 w-4 text-muted-foreground" />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            {t("downloadsHint")}
          </p>
        </section>
      </div>
    </>
  );
}
