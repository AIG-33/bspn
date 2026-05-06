"use client";

import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Hourglass, ArrowRight } from "lucide-react";

interface Props {
  pageKey:
    | "advocacy"
    | "courtPractice"
    | "experts"
    | "faq"
    | "blog"
    | "news"
    | "events"
    | "consumerProtection"
    | "dataProtection"
    | "international"
    | "arbitration"
    | "directorsClub"
    | "legislation";
  variant?: "aurora" | "default";
}

export function ComingSoonPage({ pageKey, variant = "default" }: Props) {
  const t = useTranslations(`page.${pageKey}`);
  const tNav = useTranslations("nav");

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("description")}
        variant={variant}
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <GlassCard className="p-8 text-center sm:p-12">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg glow-primary">
            <Hourglass className="h-7 w-7 animate-pulse-soft" />
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("comingSoon")}
          </p>
          <Link
            href="/membership/join"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 rounded-xl bg-cta text-cta-foreground hover:bg-cta/90 glow-cta"
            )}
          >
            {tNav("joinCta")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </GlassCard>
      </div>
    </>
  );
}
