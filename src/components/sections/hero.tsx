"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/sections/animated-counter";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("hero");

  const stats = [
    { value: STATS.members, suffix: "+", label: t("statMembers") },
    { value: STATS.councils, suffix: "+", label: t("statCouncils") },
    { value: STATS.years, suffix: "+", label: t("statYears") },
    { value: STATS.associations, suffix: "", label: t("statAssociations") },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-aurora text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-1/4 size-[28rem] rounded-full bg-[var(--aurora-1)] opacity-40 blur-3xl animate-orb-a" />
        <div className="absolute -right-32 -bottom-20 size-[32rem] rounded-full bg-[var(--aurora-2)] opacity-35 blur-3xl animate-orb-b" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 dot-pattern text-white/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,1fr] lg:gap-12">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
              {t("badge")}
            </div>

            <h1 className="mt-4 font-heading text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("title")}
              <span className="mt-1 block bg-gradient-to-r from-[var(--gold)] via-[var(--cta)] to-[var(--gold)] bg-clip-text text-transparent">
                {t("titleAccent")}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {t("subtitle")}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Link
                href="/membership/join"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-xl bg-cta px-6 text-sm text-cta-foreground shadow-xl glow-cta hover:bg-cta/90"
                )}
              >
                {t("joinButton")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/membership/benefits"
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                {t("learnMore")}
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-[var(--gold)]/30 via-[var(--cta)]/20 to-[var(--aurora-2)]/30 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl ring-1 ring-white/10 backdrop-blur">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4]">
                <Image
                  src="/images/hero-meeting.jpg"
                  alt={t("imageAlt")}
                  fill
                  priority
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/90 sm:text-sm">
                    {t("imageCaption")}
                  </p>
                  <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--cta)] shadow-[0_0_12px_var(--cta)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-10 sm:mt-12">
          <div className="glass-strong rounded-2xl p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "rounded-xl px-3 py-2.5 sm:px-4 sm:py-3",
                    i !== 0 && "sm:border-l sm:border-foreground/10"
                  )}
                >
                  <div className="font-mono text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-gradient">{stat.suffix}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
