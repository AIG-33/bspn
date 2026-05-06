import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";

const TIMELINE_YEARS = [
  "1990",
  "1992",
  "1998",
  "2000",
  "2005",
  "2010",
  "2015",
  "2020",
  "2025",
  "2026",
];

export default function HistoryPage() {
  const t = useTranslations("history");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <GlassCard className="p-8 sm:p-10">
            <h2 className="font-heading text-xl font-bold sm:text-2xl">
              {t("memorialName")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {t("memorialDesc")}
            </p>
          </GlassCard>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[var(--aurora-1)] via-primary to-[var(--aurora-2)] sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-12">
            {TIMELINE_YEARS.map((year, i) => (
              <div
                key={year}
                className={`relative flex flex-col sm:flex-row ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="absolute left-4 top-0 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-[var(--cta)] shadow-lg sm:left-1/2">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>

                <div
                  className={`ml-12 sm:ml-0 sm:w-1/2 ${
                    i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                  }`}
                >
                  <span className="font-mono text-sm font-bold text-primary">
                    {year}
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-semibold">
                    {t(`${year}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`${year}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
