"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  ShieldCheck,
  Percent,
  ArrowRight,
  CalendarCheck,
  FileText,
  MessagesSquare,
} from "lucide-react";

const CASES = [
  { key: "c1", icon: Megaphone },
  { key: "c2", icon: ShieldCheck },
  { key: "c3", icon: Percent },
] as const;

const QUARTER_STATS = [
  { valueKey: "statMeetings", labelKey: "statMeetingsLabel", icon: CalendarCheck },
  { valueKey: "statLetters", labelKey: "statLettersLabel", icon: FileText },
  { valueKey: "statConsult", labelKey: "statConsultLabel", icon: MessagesSquare },
] as const;

export function QuarterResults({ showMoreLink = true }: { showMoreLink?: boolean }) {
  const t = useTranslations("quarter");

  return (
    <section className="relative overflow-hidden border-y border-foreground/[0.06] bg-background/40 py-16 backdrop-blur-sm sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-[var(--cta)]/25 bg-cta/5 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-cta">
            {t("tag")}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {CASES.map(({ key, icon: Icon }) => (
            <GlassCard key={key} className="flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cta/10 text-cta">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] font-semibold uppercase tracking-wider"
                >
                  {t(`${key}Status`)}
                </Badge>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold leading-snug">
                {t(`${key}Title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`${key}Body`)}
              </p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {QUARTER_STATS.map(({ valueKey, labelKey, icon: Icon }) => (
            <div
              key={valueKey}
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/60 px-5 py-4"
            >
              <Icon className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <span className="font-mono text-xl font-bold">{t(valueKey)}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {t(labelKey)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {showMoreLink && (
          <div className="mt-10 text-center">
            <Link
              href="/about/achievements"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-xl")}
            >
              {t("more")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
