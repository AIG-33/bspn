"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  BookOpen,
  Users,
  Globe,
  ArrowRight,
  CheckCircle2,
  Calculator,
  FileText,
  Scale,
  Headphones,
  Award,
  Percent,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PILLARS: {
  key: number;
  icon: LucideIcon;
  accent: string;
}[] = [
  { key: 1, icon: Shield, accent: "from-[var(--cta)] to-[var(--cta)]/60" },
  { key: 2, icon: BookOpen, accent: "from-[var(--gold)] to-[var(--gold)]/60" },
  { key: 3, icon: Users, accent: "from-[var(--success)] to-[var(--success)]/60" },
  { key: 4, icon: Globe, accent: "from-primary to-primary/60" },
];

const ADDITIONAL: { key: number; icon: LucideIcon }[] = [
  { key: 1, icon: FileText },
  { key: 2, icon: Scale },
  { key: 3, icon: Headphones },
  { key: 4, icon: Award },
  { key: 5, icon: Percent },
  { key: 6, icon: Calculator },
];

const ROWS = [1, 2, 3, 4, 5, 6, 7] as const;

function RoiCalculator() {
  const t = useTranslations("benefits");
  const [consultations, setConsultations] = useState(3);
  const [documents, setDocuments] = useState(2);

  const consultCost = 250;
  const docCost = 400;
  const dues = 500;
  const without = consultations * consultCost + documents * docCost;
  const savings = without - dues;

  return (
    <GlassCard className="p-7 sm:p-9">
      <h3 className="flex items-center gap-2 font-heading text-xl font-bold">
        <Calculator className="h-5 w-5 text-primary" />
        {t("calcTitle")}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{t("calcSubtitle")}</p>

      <div className="mt-6 space-y-6">
        <div>
          <label className="text-sm font-medium">
            {t("calcConsult")}: <span className="text-primary">{consultations}</span>
          </label>
          <input
            type="range"
            min={0}
            max={12}
            value={consultations}
            onChange={(e) => setConsultations(Number(e.target.value))}
            className="mt-2 w-full accent-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            {t("calcDocs")}: <span className="text-primary">{documents}</span>
          </label>
          <input
            type="range"
            min={0}
            max={10}
            value={documents}
            onChange={(e) => setDocuments(Number(e.target.value))}
            className="mt-2 w-full accent-primary"
          />
        </div>

        <div className="rounded-2xl bg-background/60 p-5 sm:p-6 backdrop-blur-sm">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">{t("calcWithout")}</p>
              <p className="mt-1 font-mono text-lg font-bold">
                {without.toLocaleString()} BYN
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("calcDues")}</p>
              <p className="mt-1 font-mono text-lg font-bold">{dues} BYN</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("calcSavings")}</p>
              <p
                className={cn(
                  "mt-1 font-mono text-lg font-bold",
                  savings > 0 ? "text-success" : "text-muted-foreground"
                )}
              >
                {savings > 0 ? "+" : ""}
                {savings.toLocaleString()} BYN
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default function BenefitsPage() {
  const t = useTranslations("benefits");
  const tNav = useTranslations("nav");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {PILLARS.map(({ key, icon: Icon, accent }) => (
            <GlassCard key={key} className="p-7 sm:p-8">
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-xl font-bold">
                {t(`pillar${key}Title`)}
              </h2>
              <ul className="mt-4 space-y-3">
                {[1, 2, 3, 4].map((n) => (
                  <li
                    key={n}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {t(`pillar${key}Item${n}`)}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
            {t("additionalTitle")}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADDITIONAL.map(({ key, icon: Icon }) => (
              <GlassCard key={key} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-semibold">
                      {t(`add${key}Title`)}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t(`add${key}Desc`)}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <RoiCalculator />
        </div>

        <div className="mt-20">
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
            {t("compareTitle")}
          </h2>
          <GlassCard className="mt-10 overflow-x-auto p-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground/10">
                  <th className="py-3 px-4 text-left font-heading font-semibold">
                    {t("compareCol1")}
                  </th>
                  <th className="px-4 py-3 text-center font-heading font-semibold">
                    <Badge className="bg-success text-success-foreground">
                      {t("compareWith")}
                    </Badge>
                  </th>
                  <th className="px-4 py-3 text-center font-heading font-semibold">
                    <Badge variant="secondary">{t("compareWithout")}</Badge>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((n) => (
                  <tr key={n} className="border-b border-foreground/5 last:border-0">
                    <td className="py-3 px-4 text-muted-foreground">
                      {t(`row${n}`)}
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-success">
                      {t(`row${n}With`)}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {t(`row${n}Without`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </div>

        <div className="relative mt-20 overflow-hidden rounded-3xl bg-aurora p-8 text-center text-white sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
          />
          <h2 className="relative font-heading text-3xl font-bold sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-base text-white/80">
            {t("ctaDesc")}
          </p>
          <Link
            href="/membership/join"
            className={cn(
              buttonVariants({ size: "lg" }),
              "relative mt-6 h-12 rounded-2xl bg-cta px-8 text-base text-cta-foreground hover:bg-cta/90 glow-cta"
            )}
          >
            {tNav("joinCta")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
