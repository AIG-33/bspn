"use client";

import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/glass-card";
import { Hourglass } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  titleKey: string;
}

export function AdminStub({ icon: Icon, titleKey }: Props) {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
          <Icon className="h-6 w-6" />
        </div>
        <h1 className="font-heading text-2xl font-bold sm:text-3xl">
          {t(titleKey)}
        </h1>
      </div>

      <GlassCard className="p-8 text-center sm:p-12">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Hourglass className="h-6 w-6 animate-pulse-soft" />
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {t("comingSoon")}
        </p>
      </GlassCard>
    </div>
  );
}
