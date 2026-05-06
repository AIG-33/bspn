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
    <section className="relative isolate overflow-hidden bg-[#0a1628] text-white">
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-meeting.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#0a1628]/85 via-[#0a1628]/65 to-[#0a1628]/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#0a1628]/80 via-transparent to-[#0a1628]/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 dot-pattern text-white/5"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-14 sm:px-6 sm:pb-8 sm:pt-16 lg:px-8 lg:pb-10 lg:pt-24">
        <div className="max-w-2xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
            {t("badge")}
            <span className="ml-1 inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--cta)]" />
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
            {t("title")}
            <span className="mt-1 block bg-gradient-to-r from-[var(--gold)] via-[var(--cta)] to-[var(--gold)] bg-clip-text text-transparent">
              {t("titleAccent")}
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
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

        <div className="relative mt-10 sm:mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "rounded-xl px-3 py-2.5 sm:px-4 sm:py-3",
                    i !== 0 && "sm:border-l sm:border-white/10"
                  )}
                >
                  <div className="font-mono text-xl font-bold text-white drop-shadow sm:text-2xl lg:text-3xl">
                    <AnimatedCounter value={stat.value} />
                    <span className="bg-gradient-to-r from-[var(--gold)] to-[var(--cta)] bg-clip-text text-transparent">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/70 sm:text-xs">
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
