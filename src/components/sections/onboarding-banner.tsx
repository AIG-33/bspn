"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Sparkles, ArrowRight, MessageCircle, ClipboardList, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function OnboardingBanner() {
  const t = useTranslations("onboarding");

  const steps = [
    { icon: ClipboardList, title: t("step1Title"), desc: t("step1Desc") },
    { icon: MessageCircle, title: t("step2Title"), desc: t("step2Desc") },
    { icon: TrendingUp, title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <section className="relative px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <GlassCard
          variant="strong"
          className="relative overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[var(--cta)] opacity-20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[var(--gold)] opacity-15 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr,2fr] lg:gap-12">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cta/10 px-3 py-1 text-xs font-medium text-cta">
                <Sparkles className="h-3.5 w-3.5" />
                {t("tag")}
              </div>
              <h2 className="mt-4 font-heading text-2xl font-bold leading-tight sm:text-3xl">
                {t("title")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("subtitle")}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/membership/join"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-xl bg-cta text-cta-foreground hover:bg-cta/90 glow-cta"
                  )}
                >
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-xl"
                  )}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>

            <ol className="grid gap-4 sm:grid-cols-3">
              {steps.map(({ icon: Icon, title, desc }, i) => (
                <li
                  key={title}
                  className="relative rounded-2xl border border-foreground/8 bg-background/40 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-heading text-sm font-semibold">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mt-6 flex items-center gap-2 border-t border-foreground/8 pt-4 text-xs text-muted-foreground">
            <span className="inline-flex h-2 w-2 rounded-full bg-success animate-pulse-soft" />
            {t("trust")}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
