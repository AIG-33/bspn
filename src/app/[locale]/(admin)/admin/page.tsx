"use client";

import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Users,
  TrendingUp,
  CreditCard,
  CalendarDays,
  MessageSquare,
  Shield,
  Eye,
  LayoutDashboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Kpi {
  labelKey: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
}

const KPIS: Kpi[] = [
  { labelKey: "members", value: "347", change: "+12", trend: "up", icon: Users },
  { labelKey: "applications", value: "5", change: "+2", trend: "up", icon: Shield },
  { labelKey: "billing", value: "128K BYN", change: "+8%", trend: "up", icon: CreditCard },
  { labelKey: "events", value: "6", change: "0", trend: "neutral", icon: CalendarDays },
  { labelKey: "consultations", value: "89", change: "+15%", trend: "up", icon: MessageSquare },
  { labelKey: "analytics", value: "24.5K", change: "+22%", trend: "up", icon: Eye },
];

export default function AdminDashboardPage() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
          <LayoutDashboard className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KPIS.map(({ labelKey, value, change, trend, icon: Icon }) => (
          <GlassCard key={labelKey} className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t(labelKey)}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="font-mono text-xl font-bold">{value}</p>
                  <span
                    className={
                      trend === "up"
                        ? "text-xs font-medium text-success"
                        : trend === "down"
                          ? "text-xs font-medium text-destructive"
                          : "text-xs text-muted-foreground"
                    }
                  >
                    {trend === "up" && <TrendingUp className="inline h-3 w-3" />}{" "}
                    {change}
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <p className="text-sm text-muted-foreground">{t("comingSoon")}</p>
      </GlassCard>
    </div>
  );
}
