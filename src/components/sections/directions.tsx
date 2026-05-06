"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import {
  ShieldAlert,
  Landmark,
  Scale,
  UserSearch,
  Lock,
  HelpCircle,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const directions = [
  { key: "consumerProtection", href: "/consumer-protection", icon: ShieldAlert, membersOnly: true },
  { key: "advocacy", href: "/advocacy", icon: Landmark, membersOnly: false },
  { key: "courtPractice", href: "/court-practice", icon: Scale, membersOnly: false },
  { key: "experts", href: "/experts", icon: UserSearch, membersOnly: false },
  { key: "dataProtection", href: "/data-protection", icon: Lock, membersOnly: true },
  { key: "faq", href: "/faq", icon: HelpCircle, membersOnly: false },
  { key: "international", href: "/international", icon: Globe, membersOnly: false },
] as const;

export function DirectionsSection() {
  const t = useTranslations("directions");

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {directions.map(({ key, href, icon: Icon, membersOnly }) => (
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
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {t(`${key}Desc`)}
                </p>
                <Badge
                  variant={membersOnly ? "secondary" : "outline"}
                  className="mt-4 text-[10px] font-medium uppercase tracking-wider"
                >
                  {membersOnly ? (
                    <>
                      <Lock className="mr-1 h-3 w-3" />
                      {t("membersOnly")}
                    </>
                  ) : (
                    t("openAccess")
                  )}
                </Badge>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
