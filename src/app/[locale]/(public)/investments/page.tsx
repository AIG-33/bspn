import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  TrendingUp,
  Users2,
  Truck,
  Sparkles,
  FileText,
  ShieldCheck,
  Handshake,
  Mountain,
  Banknote,
  CheckCircle2,
  Target,
} from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "investments" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    path: "investments",
    title: t("pageTitle"),
    description: t("pageDescription"),
    eyebrow: tNav("investments"),
    keywords: tMeta("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  });
}

const WHY = [
  { key: "why1", icon: TrendingUp },
  { key: "why2", icon: Users2 },
  { key: "why3", icon: Truck },
  { key: "why4", icon: Sparkles },
];

const INSTRUMENTS = [
  { key: "instr1", icon: FileText },
  { key: "instr2", icon: ShieldCheck },
  { key: "instr3", icon: Handshake },
  { key: "instr4", icon: Mountain },
  { key: "instr5", icon: Banknote },
];

const REGIMES = ["regime1", "regime2", "regime3", "regime4"];
const SUPPORT = ["support1", "support2", "support3", "support4", "support5", "support6"];

export default function InvestmentsPage() {
  const t = useTranslations("investments");

  return (
    <>
      <PageHeader
        title={t("hero.title")}
        description={t("hero.subtitle")}
        variant="aurora"
        align="center"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-white/80 ring-1 ring-white/20">
            <Target className="h-3.5 w-3.5" />
            {t("hero.tag")}
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Link
              href="/contacts"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-cta text-cta-foreground hover:bg-cta/90"
              )}
            >
              {t("hero.cta1")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href="#regimes"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {t("hero.cta2")}
            </a>
          </div>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <section>
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
            {t("whyTitle")}
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ key, icon: Icon }) => (
              <GlassCard key={key} hoverable className="p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-semibold">
                  {t(`${key}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}Body`)}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
            {t("instrumentsTitle")}
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {INSTRUMENTS.map(({ key, icon: Icon }) => (
              <GlassCard key={key} hoverable className="p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--aurora-1)] to-primary text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold">
                  {t(`${key}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}Body`)}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="regimes" className="mt-20 scroll-mt-24">
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
            {t("regimesTitle")}
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {REGIMES.map((key) => (
              <GlassCard key={key} className="p-6">
                <h3 className="font-heading text-base font-semibold">
                  {t(`${key}Name`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}Body`)}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
            {t("supportTitle")}
          </h2>
          <ul className="mx-auto mt-10 max-w-3xl space-y-3">
            {SUPPORT.map((key) => (
              <li
                key={key}
                className="flex items-start gap-3 rounded-2xl border border-foreground/5 bg-foreground/[0.02] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <span className="text-sm leading-relaxed">{t(key)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 overflow-hidden rounded-3xl bg-aurora p-8 text-white sm:p-12 relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 dot-pattern text-white/[0.06]"
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              {t("ctaBody")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/contacts"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-cta text-cta-foreground hover:bg-cta/90"
                )}
              >
                {t("ctaPrimary")}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/foreign-business"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
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
