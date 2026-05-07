import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  ChevronDown,
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
  photo: string;
  photoAlt: string;
  specialtyIcon: LucideIcon;
  roleIcons: LucideIcon[];
  topicIcons: LucideIcon[];
  siteLabel: string;
  siteUrlKey: string;
  tracksUrlKey: string;
}

const EXPERTS: Expert[] = [
  {
    id: "g1",
    photo: "/images/experts/gorbatsevich.jpg",
    photoAlt: "Максим Сергеевич Горбацевич",
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

interface DetailsBlockProps {
  icon: LucideIcon;
  iconClassName: string;
  title: string;
  count?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function DetailsBlock({
  icon: Icon,
  iconClassName,
  title,
  count,
  children,
  defaultOpen = false,
}: DetailsBlockProps) {
  return (
    <details
      className="group rounded-2xl border border-border/60 bg-background/40 transition-colors open:bg-background/60 open:shadow-sm"
      open={defaultOpen}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-3.5 select-none",
          "hover:bg-foreground/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        )}
      >
        <span
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            iconClassName
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <span className="font-heading text-sm font-bold uppercase tracking-wide text-foreground/85">
          {title}
        </span>
        {typeof count === "number" && (
          <span className="rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[11px] font-semibold tabular-nums text-muted-foreground">
            {count}
          </span>
        )}
        <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4 pt-1">{children}</div>
    </details>
  );
}

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
        {/* Experts list */}
        <div className="space-y-10">
          {EXPERTS.map((expert) => (
            <article
              key={expert.id}
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--aurora-1)] via-primary via-[var(--cta)] to-[var(--gold)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[var(--cta)] opacity-[0.07] blur-3xl"
              />

              <div className="relative p-6 sm:p-8 lg:p-10">
                {/* Header: small photo + name/role inline */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border/60 sm:h-24 sm:w-24">
                    <Image
                      src={expert.photo}
                      alt={expert.photoAlt}
                      fill
                      sizes="96px"
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-xl font-bold leading-tight sm:text-2xl">
                      {t(`${expert.id}.name`)}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary sm:text-base">
                      {t(`${expert.id}.role`)}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.05] px-2.5 py-1 font-mono">
                        <expert.specialtyIcon className="h-3 w-3 text-primary" />
                        {t(`${expert.id}.specialty`)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1">
                        {t(`${expert.id}.since`)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="mt-6">

                  {/* Bio */}
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t(`${expert.id}.bio`)}
                  </p>

                  {/* Philosophy quote */}
                  <figure className="mt-6 rounded-2xl border-l-4 border-l-[var(--gold)] bg-gradient-to-r from-amber-50/50 to-transparent p-4 dark:from-amber-950/15 dark:to-transparent sm:p-5">
                    <blockquote className="font-heading text-sm italic leading-relaxed text-foreground/85 sm:text-base">
                      {t(`${expert.id}.philosophy`)}
                    </blockquote>
                    <figcaption className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      {t("philosophyTitle")}
                    </figcaption>
                  </figure>

                  {/* Collapsible details */}
                  <div className="mt-6 space-y-2.5">
                    <DetailsBlock
                      icon={Award}
                      iconClassName="bg-primary/10 text-primary"
                      title={t("rolesTitle")}
                      count={ROLE_KEYS.length}
                    >
                      <ul className="mt-2 space-y-2.5">
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
                    </DetailsBlock>

                    <DetailsBlock
                      icon={Landmark}
                      iconClassName="bg-[var(--cta)]/10 text-[var(--cta)]"
                      title={t("topicsTitle")}
                      count={TOPIC_KEYS.length}
                    >
                      <ul className="mt-2 grid gap-2 sm:grid-cols-2">
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
                    </DetailsBlock>

                    <DetailsBlock
                      icon={ScrollText}
                      iconClassName="bg-[var(--gold)]/20 text-[var(--gold)]"
                      title={t("trackTitle")}
                    >
                      <p className="mt-2 rounded-2xl bg-gradient-to-br from-primary/8 via-[var(--cta)]/6 to-[var(--gold)]/8 p-5 text-sm leading-relaxed text-foreground/85 sm:text-base">
                        {t(`${expert.id}.track`)}
                      </p>
                    </DetailsBlock>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <Link
                      href="/contacts"
                      className={cn(
                        buttonVariants({ size: "default" }),
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
                        buttonVariants({ variant: "outline", size: "default" }),
                        "rounded-xl"
                      )}
                    >
                      <Building2 className="mr-1 h-4 w-4" />
                      {expert.siteLabel}
                      <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
                    </a>
                    <a
                      href={t(`${expert.id}.${expert.tracksUrlKey}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "default" }),
                        "rounded-xl"
                      )}
                    >
                      <ScrollText className="mr-1 h-4 w-4" />
                      {t("tracksBtn")}
                      <ExternalLink className="ml-1 h-3.5 w-3.5 opacity-70" />
                    </a>
                  </div>
                </div>
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
