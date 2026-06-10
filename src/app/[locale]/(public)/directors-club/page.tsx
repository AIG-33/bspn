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
  Coffee,
  Crown,
  GraduationCap,
  Handshake,
  Lightbulb,
  Network,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "directorsClubPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "directors-club",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("membership"),
  });
}

interface TextBlock {
  title: string;
  desc: string;
}

const FORMAT_ICONS: LucideIcon[] = [Coffee, Users, Plane, GraduationCap];
const BENEFIT_ICONS: LucideIcon[] = [
  Network,
  Lightbulb,
  Handshake,
  ShieldCheck,
];

export default function DirectorsClubPage() {
  const t = useTranslations("directorsClubPage");
  const formats = t.raw("formats") as TextBlock[];
  const benefits = t.raw("benefits") as TextBlock[];

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-white/80 ring-1 ring-white/20">
          <Crown className="h-3.5 w-3.5 text-[var(--gold)]" />
          {t("tag")}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        {/* Formats */}
        <section className="mt-14">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("formatsTitle")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((f, i) => {
              const Icon = FORMAT_ICONS[i] ?? Users;
              return (
                <GlassCard key={i} hoverable className="p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-base font-semibold">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Benefits */}
        <section className="mt-20">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("benefitsTitle")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Network;
              return (
                <GlassCard key={i} className="p-6">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-foreground/5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.desc}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12 relative">
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
                href="/membership/benefits"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-white/30 bg-white/10 px-8 text-white hover:bg-white/20"
                )}
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
