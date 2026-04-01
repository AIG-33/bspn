"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-base text-white/80 sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/membership/join"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-cta text-cta-foreground hover:bg-cta/90 text-base px-8 h-12 rounded-xl shadow-lg"
              )}
            >
              {t("joinButton")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/membership/benefits"
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/30 bg-transparent px-8 h-12 text-base font-medium text-white transition-all hover:bg-white/10 focus-visible:ring-3 focus-visible:ring-white/30"
            >
              {t("learnMore")}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div className="font-mono text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                <AnimatedCounter value={stat.value} />
                {stat.suffix}
              </div>
              <p className="mt-1 text-sm text-white/60 sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
