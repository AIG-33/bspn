import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Factory,
  Truck,
  Building2,
  Cpu,
  ShoppingBag,
  Wheat,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ASSOCIATIONS: { key: string; icon: LucideIcon; members: number }[] = [
  { key: "industry", icon: Factory, members: 18 },
  { key: "logistics", icon: Truck, members: 12 },
  { key: "construction", icon: Building2, members: 15 },
  { key: "it", icon: Cpu, members: 10 },
  { key: "trade", icon: ShoppingBag, members: 20 },
  { key: "agro", icon: Wheat, members: 11 },
  { key: "msb", icon: Wrench, members: 8 },
];

export default function AssociationsPage() {
  const t = useTranslations("associations");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ASSOCIATIONS.map(({ key, icon: Icon, members }) => (
            <GlassCard key={key} hoverable className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-base font-semibold leading-snug">
                {t(key)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(`${key}Desc`)}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-sm">
                <span className="font-mono font-bold text-primary">
                  {members}
                </span>
                <span className="text-muted-foreground">
                  {t("membersLabel")}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
}
