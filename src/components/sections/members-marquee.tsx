"use client";

import { useTranslations } from "next-intl";

const SECTOR_KEYS = [
  "s1", "s2", "s3", "s4", "s5", "s6", "s7",
  "s8", "s9", "s10", "s11", "s12", "s13", "s14",
] as const;

export function MembersMarquee() {
  const t = useTranslations("members");
  const sectors = SECTOR_KEYS.map((key) => t(key));

  return (
    <section className="relative overflow-hidden border-y border-foreground/[0.06] bg-background/40 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="flex animate-marquee gap-4">
          {[...sectors, ...sectors].map((sector, i) => (
            <div
              key={i}
              className="glass flex shrink-0 items-center justify-center rounded-2xl px-6 py-3"
            >
              <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
                {sector}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
