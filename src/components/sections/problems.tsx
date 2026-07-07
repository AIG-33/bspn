"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Landmark,
  ShieldAlert,
  ScrollText,
  Scale,
  UserSearch,
  Globe,
  ArrowUpRight,
  MessageCircleQuestion,
  ArrowRight,
} from "lucide-react";

const PROBLEMS = [
  { key: "p1", href: "/advocacy", icon: Landmark },
  { key: "p2", href: "/court-practice", icon: ShieldAlert },
  { key: "p3", href: "/business/legislation-review", icon: ScrollText },
  { key: "p4", href: "/arbitration", icon: Scale },
  { key: "p5", href: "/experts", icon: UserSearch },
  { key: "p6", href: "/international", icon: Globe },
] as const;

export function ProblemsSection() {
  const t = useTranslations("problems");

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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map(({ key, href, icon: Icon }) => (
            <Link key={key} href={href} className="group">
              <GlassCard hoverable className="h-full p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold leading-snug">
                  {t(key)}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {t(`${key}Desc`)}
                </p>
              </GlassCard>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/80 px-6 py-5 text-center sm:flex-row sm:gap-3">
          <MessageCircleQuestion className="h-5 w-5 shrink-0 text-primary" />
          <span className="text-sm font-medium">{t("hint")}</span>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {t("hintCta")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
