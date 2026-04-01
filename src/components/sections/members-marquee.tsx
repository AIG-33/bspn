"use client";

import { useTranslations } from "next-intl";

const memberCompanies = [
  "Белинтертранс",
  "МАЗ",
  "Горизонт",
  "Атлант",
  "Пеленг",
  "БелАЗ",
  "Интеграл",
  "Белмедпрепараты",
  "Амкодор",
  "Белкоммунмаш",
  "Керамин",
  "Белшина",
];

export function MembersMarquee() {
  const t = useTranslations("cta");

  return (
    <section className="border-y border-border bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {t("memberCount")}
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-marquee gap-8">
          {[...memberCompanies, ...memberCompanies].map((company, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center rounded-lg border border-border bg-card px-6 py-3"
            >
              <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
                {company}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
