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
  Briefcase,
  Building2,
  Globe2,
  Handshake,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "internationalPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return pageMetadata({
    locale,
    path: "international",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("forBusiness"),
  });
}

interface Org {
  name: string;
  role: string;
  desc: string;
}

interface Benefit {
  title: string;
  desc: string;
}

const ORG_ICONS: LucideIcon[] = [Globe2, Handshake, Network, Building2];
const BENEFIT_ICONS: LucideIcon[] = [
  Sparkles,
  Briefcase,
  TrendingUp,
  ShieldCheck,
];

export default function InternationalPage() {
  const t = useTranslations("internationalPage");
  const orgs = t.raw("orgs") as Org[];
  const benefits = t.raw("benefits") as Benefit[];

  return (
    <>
      <PageHeader
        title={t("pageTitle")}
        description={t("pageDescription")}
        variant="aurora"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-white/80 ring-1 ring-white/20">
          <Globe2 className="h-3.5 w-3.5" />
          {t("tag")}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("intro")}
          </p>
        </div>

        {/* Organizations */}
        <section className="mt-14">
          <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">
            {t("orgsTitle")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {orgs.map((o, i) => {
              const Icon = ORG_ICONS[i] ?? Globe2;
              return (
                <GlassCard key={i} hoverable className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-base font-semibold leading-snug">
                        {o.name}
                      </h3>
                      <p className="text-xs font-medium text-primary">
                        {o.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {o.desc}
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
              const Icon = BENEFIT_ICONS[i] ?? Sparkles;
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
                href="/foreign-business"
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
