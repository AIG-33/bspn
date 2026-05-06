"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Sparkles, MoveDown } from "lucide-react";
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
      {/* Animated orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-1/3 size-[36rem] rounded-full bg-[var(--aurora-1)] opacity-50 blur-3xl animate-orb-a" />
        <div className="absolute -right-40 bottom-0 size-[40rem] rounded-full bg-[var(--aurora-2)] opacity-40 blur-3xl animate-orb-b" />
        <div className="absolute right-1/4 top-0 size-[26rem] rounded-full bg-[var(--aurora-3)] opacity-25 blur-3xl" />
      </div>

      {/* Dot pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 dot-pattern text-white/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-24 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8 lg:pb-40 lg:pt-36">
        <div className="max-w-3xl animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
            {t("badge")}
          </div>

          {/* Title */}
          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")}
            <span className="mt-2 block bg-gradient-to-r from-[var(--gold)] via-[var(--cta)] to-[var(--gold)] bg-clip-text text-transparent">
              {t("titleAccent")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/membership/join"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-13 rounded-2xl bg-cta px-8 text-base text-cta-foreground shadow-2xl glow-cta hover:bg-cta/90"
              )}
            >
              {t("joinButton")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/membership/benefits"
              className="inline-flex h-13 shrink-0 items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-8 text-base font-medium text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              {t("learnMore")}
            </Link>
          </div>
        </div>

        {/* Stats glass card */}
        <div className="relative mt-14 sm:mt-20">
          <div className="glass-strong rounded-3xl p-5 sm:p-7">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "rounded-2xl px-4 py-4 sm:px-5 sm:py-5",
                    i !== 0 && "lg:border-l lg:border-foreground/10"
                  )}
                >
                  <div className="font-mono text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-gradient">{stat.suffix}</span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-10 hidden items-center justify-center gap-2 text-xs uppercase tracking-widest text-white/50 sm:flex">
          <MoveDown className="h-3.5 w-3.5 animate-bounce-slow" />
          {t("scrollHint")}
        </div>
      </div>
    </section>
  );
}
