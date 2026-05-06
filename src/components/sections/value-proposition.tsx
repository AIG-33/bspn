"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Shield, BookOpen, Users, Globe } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const pillars = [
  { key: "protection", icon: Shield, accent: "from-[var(--cta)] to-[var(--cta)]/60" },
  { key: "knowledge", icon: BookOpen, accent: "from-[var(--gold)] to-[var(--gold)]/60" },
  { key: "community", icon: Users, accent: "from-[var(--success)] to-[var(--success)]/60" },
  { key: "connections", icon: Globe, accent: "from-primary to-primary/60" },
] as const;

export function ValueProposition() {
  const t = useTranslations("values");

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-1/4 size-[28rem] rounded-full bg-[var(--aurora-1)] opacity-15 blur-3xl" />
        <div className="absolute -right-32 bottom-0 size-[32rem] rounded-full bg-[var(--aurora-3)] opacity-15 blur-3xl" />
      </div>

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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ key, icon: Icon, accent }) => (
            <Link key={key} href="/membership/benefits" className="group">
              <GlassCard hoverable className="h-full p-6 sm:p-7">
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}.description`)}
                </p>
                <p className="mt-4 text-sm font-medium text-foreground">
                  {t(`${key}.message`)}
                </p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
