"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArrowRight, ClipboardList, MessageCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function CtaBanner() {
  const t = useTranslations("cta");

  const steps = [
    { icon: ClipboardList, title: t("step1"), desc: t("step1Desc") },
    { icon: MessageCircle, title: t("step2"), desc: t("step2Desc") },
    { icon: TrendingUp, title: t("step3"), desc: t("step3Desc") },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-aurora py-24 sm:py-32 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-1/4 size-[36rem] rounded-full bg-[var(--aurora-1)] opacity-50 blur-3xl animate-orb-a" />
        <div className="absolute -right-32 bottom-0 size-[40rem] rounded-full bg-[var(--aurora-2)] opacity-40 blur-3xl animate-orb-b" />
        <div className="absolute inset-0 dot-pattern text-white/5" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md">
          {t("tag")}
        </span>
        <h2 className="mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
          {t("subtitle")}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 text-left backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cta text-cta-foreground glow-cta">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-white/60">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold">
                {title}
              </h3>
              <p className="mt-1 text-xs text-white/70">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/membership/join"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-13 rounded-2xl bg-cta px-10 text-base text-cta-foreground hover:bg-cta/90 glow-cta shadow-2xl"
            )}
          >
            {t("button")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <p className="mt-6 text-sm text-white/60">{t("memberCount")}</p>
      </div>
    </section>
  );
}
