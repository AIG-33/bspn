"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

const TIERS = [
  { key: "associated", popular: false },
  { key: "solidary", popular: false },
  { key: "active", popular: true },
  { key: "full", popular: false },
] as const;

const INCLUDED = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export function MembershipTeaser() {
  const t = useTranslations("teaser");
  const tTypes = useTranslations("memberTypes");
  const tMembership = useTranslations("membership");

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            {t("tag")}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map(({ key, popular }) => (
            <GlassCard
              key={key}
              className={cn(
                "relative flex h-full flex-col p-6",
                popular && "ring-2 ring-[var(--cta)]/60"
              )}
            >
              {popular && (
                <Badge className="absolute -top-2.5 left-6 bg-cta text-cta-foreground">
                  {tTypes("popular")}
                </Badge>
              )}
              <h3 className="font-heading text-base font-semibold">
                {tTypes(`${key}Name`)}
              </h3>
              <p className="mt-1 min-h-10 text-xs leading-relaxed text-muted-foreground">
                {tTypes(`${key}Desc`)}
              </p>
              <div className="mt-4">
                <span className="font-mono text-2xl font-bold">
                  {tTypes(`${key}Price`)}
                </span>
                <span className="ml-1.5 text-xs text-muted-foreground">
                  {t("perYear")}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-center">
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground/70">
              {t("includedTitle")}
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {INCLUDED.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm leading-snug">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {tMembership(h)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/60 p-6 text-center">
            <p className="text-sm font-medium leading-relaxed">{t("note")}</p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href="/membership/join"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full justify-center rounded-xl bg-cta text-cta-foreground hover:bg-cta/90 glow-cta"
                )}
              >
                {t("ctaJoin")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/membership/types"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full justify-center rounded-xl"
                )}
              >
                {t("ctaTypes")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
