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
  Building2,
  CheckCircle2,
  CircleDot,
  FileText,
  Megaphone,
  PenLine,
  Scale,
  Sparkles,
  TrendingDown,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "advocacyPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "advocacy",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("forBusiness"),
  });
}

const DIRECTION_ICONS: Record<string, LucideIcon> = {
  TrendingDown,
  FileText,
  Scale,
  Building2,
  Users,
  Megaphone,
};

type InitiativeStatus = "active" | "discussion" | "completed";

interface Direction {
  icon: string;
  title: string;
  description: string;
  results: string[];
}

interface Initiative {
  title: string;
  status: InitiativeStatus;
  deadline: string;
  description: string;
}

const STATUS_STYLES: Record<InitiativeStatus, string> = {
  active:
    "border-primary/30 bg-primary/10 text-primary",
  discussion:
    "border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-300",
  completed:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
};

const STATUS_ICON: Record<InitiativeStatus, LucideIcon> = {
  active: CircleDot,
  discussion: Megaphone,
  completed: CheckCircle2,
};

export default function AdvocacyPage() {
  const t = useTranslations("advocacyPage");
  const directions = t.raw("directions") as Direction[];
  const initiatives = t.raw("initiatives") as Initiative[];

  const flow = [
    { icon: PenLine, title: t("flowProposed"), body: t("flowProposedDesc") },
    {
      icon: Megaphone,
      title: t("flowDiscussion"),
      body: t("flowDiscussionDesc"),
    },
    {
      icon: CheckCircle2,
      title: t("flowAccepted"),
      body: t("flowAcceptedDesc"),
    },
  ];

  const statusLabel: Record<InitiativeStatus, string> = {
    active: t("statusActive"),
    discussion: t("statusDiscussion"),
    completed: t("statusCompleted"),
  };

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-white/80 ring-1 ring-white/20">
          <Sparkles className="h-3.5 w-3.5" />
          {t("tag")}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        {/* Flow: proposed -> discussion -> adopted */}
        <section className="mt-14">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("flowTitle")}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {flow.map((step, i) => (
              <div key={i} className="relative">
                <GlassCard className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-heading text-base font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </GlassCard>
                {i < flow.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground/40 sm:block"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Directions */}
        <section className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("directionsTitle")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("directionsSubtitle")}
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {directions.map((d, i) => {
              const Icon = DIRECTION_ICONS[d.icon] ?? FileText;
              return (
                <GlassCard key={i} hoverable className="flex flex-col p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-semibold leading-snug">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {d.description}
                  </p>
                  <div className="mt-4 border-t border-border/50 pt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                      {t("resultsLabel")}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {d.results.map((r, ri) => (
                        <li
                          key={ri}
                          className="flex items-start gap-2 text-sm text-foreground/85"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Case of the month */}
        <section className="mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--gold)] opacity-20 blur-3xl"
            />
            <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wide ring-1 ring-white/20">
                  <Trophy className="h-3.5 w-3.5 text-[var(--gold)]" />
                  {t("caseTag")}
                </span>
                <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
                  {t("caseTitle")}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85">
                  {t("caseBody")}
                </p>
                <p className="mt-2 text-xs text-white/50">{t("caseNote")}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-center backdrop-blur-md">
                <p className="font-mono text-3xl font-bold text-[var(--gold)]">
                  {t("caseMetricValue")}
                </p>
                <p className="mt-1 text-sm text-white/70">{t("caseMetricLabel")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Current initiatives */}
        <section className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("initiativesTitle")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("initiativesSubtitle")}
            </p>
          </div>
          <div className="mt-10 space-y-4">
            {initiatives.map((it, i) => {
              const StatusIcon = STATUS_ICON[it.status];
              return (
                <GlassCard
                  key={i}
                  className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                          STATUS_STYLES[it.status]
                        )}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusLabel[it.status]}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {t("deadlineLabel")}: {it.deadline}
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading text-base font-semibold leading-snug">
                      {it.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {it.description}
                    </p>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <GlassCard className="p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {t("ctaBody")}
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/membership/join"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-xl bg-cta px-8 text-cta-foreground hover:bg-cta/90 glow-cta"
                )}
              >
                {t("ctaButton")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/councils"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-xl px-8"
                )}
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </GlassCard>
        </section>
      </div>
    </>
  );
}
