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
  Award,
  BadgeCheck,
  Building2,
  ExternalLink,
  FlaskConical,
  Globe2,
  Handshake,
  Landmark,
  Mail,
  Megaphone,
  ScrollText,
  Sparkles,
  Stethoscope,
  Unlock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experts" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "experts",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("forBusiness"),
  });
}

interface Expert {
  id: string;
  initials: string;
  /** lucide icon shown next to specialisation tag in the hero strip */
  specialtyIcon: LucideIcon;
  roleIcons: LucideIcon[];
  topicIcons: LucideIcon[];
  siteLabel: string;
  /** External anchor href (for "Site" button), pulled from i18n */
  siteUrlKey: string;
  tracksUrlKey: string;
}

const EXPERTS: Expert[] = [
  {
    id: "g1",
    initials: "МГ",
    specialtyIcon: FlaskConical,
    roleIcons: [Globe2, Award, ScrollText, BadgeCheck, Megaphone, Handshake],
    topicIcons: [
      Building2,
      Stethoscope,
      ScrollText,
      Sparkles,
      Unlock,
      Handshake,
      BadgeCheck,
      Landmark,
      Award,
      Globe2,
    ],
    siteLabel: "viena.by",
    siteUrlKey: "siteUrl",
    tracksUrlKey: "tracksUrl",
  },
];

const ROLE_KEYS = ["role1", "role2", "role3", "role4", "role5", "role6"] as const;
const TOPIC_KEYS = [
  "topic1",
  "topic2",
  "topic3",
  "topic4",
  "topic5",
  "topic6",
  "topic7",
  "topic8",
  "topic9",
  "topic10",
] as const;

export default function ExpertsPage() {
  const t = useTranslations("experts");

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-white/80 ring-1 ring-white/20">
          <Unlock className="h-3.5 w-3.5" />
          {t("openTag")}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Open access callout */}
        <GlassCard
          variant="strong"
          className="relative overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[var(--gold)] opacity-20 blur-3xl"
          />
          <div className="relative grid gap-6 lg:grid-cols-[auto,1fr] lg:items-center lg:gap-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--aurora-1)] via-primary to-[var(--cta)] text-white shadow-lg glow-primary">
              <Unlock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold sm:text-2xl">
                {t("openTitle")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("openBody")}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Experts list */}
        <div className="mt-12 space-y-10">
          {EXPERTS.map((expert) => (
            <article
              key={expert.id}
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--aurora-1)] via-primary via-[var(--cta)] to-[var(--gold)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[var(--cta)] opacity-[0.07] blur-3xl"
              />

              {/* Header row */}
              <div className="relative grid gap-6 lg:grid-cols-[auto,1fr] lg:items-start lg:gap-8">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-[var(--aurora-1)] via-primary to-[var(--cta)] font-heading text-3xl font-bold text-white shadow-xl glow-primary sm:h-28 sm:w-28">
                  {expert.initials}
                </div>

                <div className="min-w-0">
                  <h3 className="font-heading text-2xl font-bold leading-tight sm:text-3xl">
                    {t(`${expert.id}.name`)}
                  </h3>
                  <p className="mt-1 text-base font-medium text-primary">
                    {t(`${expert.id}.role`)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.05] px-3 py-1.5 font-mono">
                      <expert.specialtyIcon className="h-3.5 w-3.5 text-primary" />
                      {t(`${expert.id}.specialty`)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5">
                      {t(`${expert.id}.since`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="relative mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t(`${expert.id}.bio`)}
              </p>

              {/* Philosophy */}
              <figure className="relative mt-6 rounded-2xl border-l-4 border-l-[var(--gold)] bg-gradient-to-r from-amber-50/50 to-transparent p-5 dark:from-amber-950/15 dark:to-transparent">
                <blockquote className="font-heading text-base italic leading-relaxed text-foreground/85 sm:text-lg">
                  {t(`${expert.id}.philosophy`)}
                </blockquote>
                <figcaption className="mt-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                  {t("philosophyTitle")}
                </figcaption>
              </figure>

              {/* Roles + topics grid */}
              <div className="relative mt-8 grid gap-6 lg:grid-cols-2">
                {/* Expert roles */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-foreground/85">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Award className="h-4 w-4" />
                    </span>
                    {t("rolesTitle")}
                  </h4>
                  <ul className="space-y-2.5">
                    {ROLE_KEYS.map((rk, i) => {
                      const Icon = expert.roleIcons[i] || BadgeCheck;
                      return (
                        <li
                          key={rk}
                          className="flex gap-3 rounded-xl border border-border/40 bg-background/60 p-3 text-sm leading-relaxed text-foreground/85"
                        >
                          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-[var(--cta)]/10 text-primary">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span>{t(`${expert.id}.${rk}`)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Government topics */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-foreground/85">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--cta)]/10 text-[var(--cta)]">
                      <Landmark className="h-4 w-4" />
                    </span>
                    {t("topicsTitle")}
                  </h4>
                  <ul className="grid gap-2">
                    {TOPIC_KEYS.map((tk, i) => {
                      const Icon = expert.topicIcons[i] || ScrollText;
                      return (
                        <li
                          key={tk}
                          className="flex items-start gap-2.5 rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-sm leading-snug text-foreground/85"
                        >
                          <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cta)]" />
                          <span>{t(`${expert.id}.${tk}`)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Track record */}
              <div className="relative mt-8 rounded-2xl bg-gradient-to-br from-primary/8 via-[var(--cta)]/6 to-[var(--gold)]/8 p-5 sm:p-6">
                <h4 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-foreground/85">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--gold)]/20 text-[var(--gold)]">
                    <ScrollText className="h-4 w-4" />
                  </span>
                  {t("trackTitle")}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
                  {t(`${expert.id}.track`)}
                </p>
              </div>

              {/* Actions */}
              <div className="relative mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contacts"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-xl bg-cta text-cta-foreground hover:bg-cta/90"
                  )}
                >
                  <Mail className="mr-1 h-4 w-4" />
                  {t("contactBtn")}
                </Link>
                <a
                  href={t(`${expert.id}.${expert.siteUrlKey}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-xl"
                  )}
                >
                  <Building2 className="mr-1 h-4 w-4" />
                  {t("siteBtn")} · {expert.siteLabel}
                  <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
                </a>
                <a
                  href={t(`${expert.id}.${expert.tracksUrlKey}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "rounded-xl"
                  )}
                >
                  <ScrollText className="mr-1 h-4 w-4" />
                  {t("tracksBtn")}
                  <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* "Become an expert" callout */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12 relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("futureTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              {t("futureBody")}
            </p>
            <div className="mt-6">
              <Link
                href="/contacts"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-cta text-cta-foreground hover:bg-cta/90"
                )}
              >
                {t("futureCta")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
