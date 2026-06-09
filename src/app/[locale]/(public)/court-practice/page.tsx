import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Gavel,
  Handshake,
  Info,
  Scale,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "courtPracticePage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "court-practice",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("forBusiness"),
  });
}

type CaseStatus = "won" | "settled" | "inProgress";

interface CourtCase {
  area: string;
  title: string;
  summary: string;
  amount: string;
  status: CaseStatus;
  outcome: string;
}

const STATUS_STYLES: Record<CaseStatus, string> = {
  won: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  settled: "border-primary/30 bg-primary/10 text-primary",
  inProgress:
    "border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-300",
};

const STATUS_ICON: Record<CaseStatus, LucideIcon> = {
  won: CheckCircle2,
  settled: Handshake,
  inProgress: Clock,
};

export default function CourtPracticePage() {
  const t = useTranslations("courtPracticePage");
  const cases = t.raw("cases") as CourtCase[];

  const stats = [
    { icon: Scale, value: t("statCasesValue"), label: t("statCasesLabel") },
    { icon: ShieldCheck, value: t("statWinValue"), label: t("statWinLabel") },
    { icon: Wallet, value: t("statSavedValue"), label: t("statSavedLabel") },
  ];

  const statusLabel: Record<CaseStatus, string> = {
    won: t("statusWon"),
    settled: t("statusSettled"),
    inProgress: t("statusInProgress"),
  };

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-white/80 ring-1 ring-white/20">
          <Gavel className="h-3.5 w-3.5" />
          {t("tag")}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <GlassCard key={i} className="p-6 text-center">
              <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-mono text-3xl font-bold">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Cases */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">
            {t("casesTitle")}
          </h2>
          <div className="mt-8 space-y-5">
            {cases.map((c, i) => {
              const StatusIcon = STATUS_ICON[c.status];
              return (
                <GlassCard key={i} className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.05] px-2.5 py-1 font-mono text-xs text-muted-foreground">
                      {c.area}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                        STATUS_STYLES[c.status]
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {statusLabel[c.status]}
                    </span>
                  </div>

                  <h3 className="mt-3 font-heading text-lg font-semibold leading-snug">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.summary}
                  </p>

                  <div className="mt-4 grid gap-3 border-t border-border/50 pt-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                        {t("amountLabel")}
                      </p>
                      <p className="mt-1 font-mono text-sm font-semibold">
                        {c.amount}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                        {t("outcomeLabel")}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground/90">
                        {c.outcome}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-border/50 bg-foreground/[0.02] p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" />
            <p>{t("disclaimer")}</p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
            />
            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                {t("ctaTitle")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85">
                {t("ctaBody")}
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/membership/join"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full bg-cta px-8 text-cta-foreground hover:bg-cta/90"
                  )}
                >
                  {t("ctaButton")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/arbitration"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-white/30 bg-white/10 px-8 text-white hover:bg-white/20"
                  )}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
